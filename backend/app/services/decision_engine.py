import logging
from sqlalchemy.orm import Session
from app.schemas.requests import DecisionRequest, ForecastRequest, SpoilageRequest
from app.schemas.responses import DecisionResponse
from app.services.forecast_service import get_forecast
from app.services.spoilage_service import predict_spoilage

logger = logging.getLogger(__name__)

def evaluate_decision(req: DecisionRequest, db: Session) -> DecisionResponse:
    """
    Orchestrates the ML pipeline and computes the Profit Index.
    """
    try:
        # 1. Run Price Forecast Model
        forecast_req = ForecastRequest(state=req.region, commodity=req.crop)
        forecast_resp = get_forecast(forecast_req, db)
        
        forecast_day1 = forecast_resp.forecast[0]
        forecast_day3 = forecast_resp.forecast[-1]
        
        # Calculate expected price drop percent
        # If forecast_day1 is lower than current, it's a drop.
        # Ensure we don't divide by zero
        if req.current_market_price > 0:
            price_drop_percent = ((req.current_market_price - forecast_day1) / req.current_market_price) * 100
        else:
            price_drop_percent = 0.0
            
        # Avoid negative drop (which means increase), Spoilage model might expect only drops or raw metric
        price_drop_percent = max(0.0, price_drop_percent) 
        
        # 2. Run Spoilage Model
        spoilage_req = SpoilageRequest(
            crop=req.crop,
            temperature=req.temperature,
            humidity=req.humidity,
            days_after_harvest=req.days_after_harvest,
            price_drop_percent=price_drop_percent
        )
        spoilage_resp = predict_spoilage(spoilage_req)
        
        Rs = spoilage_resp.probability
        Cm = spoilage_resp.confidence  # Or an average of both model confidences if available
        Pc = req.current_market_price
        Pf = forecast_day3

        # 3. Decision Engine & Profit Index Math (MANDATORY IMPLEMENTATION)
        
        # Step 1 — Compute Expected Future Value
        expected_future_value = Pf * (1.0 - Rs)
        
        # Decision Logic (Wait vs Sell)
        if expected_future_value > Pc:
            decision = "WAIT"
            wait_days = 3 # Based on the 3-day forecast window
        else:
            decision = "SELL"
            wait_days = 0
        
        # Step 2 — Compute Expected Gain Ratio
        # Avoid division by zero
        if Pc > 0:
            gain_ratio = (expected_future_value - Pc) / Pc
        else:
            gain_ratio = 0.0
            
        # Step 3 — Normalize Gain Component
        # Clamp between -0.10 and 0.10
        normalized_gain = max(-0.10, min(gain_ratio, 0.10))
        # Convert to 0–1 scale
        gain_score = (normalized_gain + 0.10) / 0.20
        
        # Step 4 — Risk Penalty Component
        risk_score = 1.0 - Rs
        
        # Step 5 — Combine Scores (Weighted Blend)
        raw_score = (0.6 * gain_score) + (0.4 * risk_score)
        
        # Step 6 — Confidence Adjustment
        adjusted_score = raw_score * Cm
        
        # Step 7 — Final Profit Index
        # Clamp final value between 0 and 100
        profit_index = int(round(adjusted_score * 100))
        profit_index = max(0, min(profit_index, 100))
        
        return DecisionResponse(
            decision=decision,
            wait_days=wait_days,
            expected_value=round(expected_future_value, 2),
            profit_index=profit_index,
            forecast=forecast_resp.forecast,
            trend_percent=round(forecast_resp.trend_percent, 2),
            spoilage_probability=round(Rs, 4),
            spoilage_class=spoilage_resp.class_label,
            model_confidence=round(Cm, 4)
        )
        
    except Exception as e:
        logger.error(f"Error evaluating orchestrated decision: {e}")
        raise e
