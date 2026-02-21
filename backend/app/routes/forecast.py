from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import logging

from app.schemas.requests import ForecastRequest
from app.schemas.responses import ForecastResponse
from app.services.forecast_service import get_forecast
from app.database import get_db

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/forecast", response_model=ForecastResponse)
def get_price_forecast(request: ForecastRequest, db: Session = Depends(get_db)):
    """
    Forecasts the price for the next 3 days based on historical data.
    """
    try:
        return get_forecast(request, db)
    except ValueError as e:
        logger.error(f"Validation Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Internal Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during forecast generation.")
