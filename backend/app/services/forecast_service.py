import pandas as pd
import numpy as np
import logging
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.schemas.requests import ForecastRequest
from app.schemas.responses import ForecastResponse

logger = logging.getLogger(__name__)

def fetch_historical_prices(db: Session, request: ForecastRequest) -> pd.DataFrame:
    """
    Fetches the last 30 days of historical prices from PostgreSQL.
    """
    # A basic implementation. In reality, you'd match the state/commodity.
    # Assuming 'market_prices' table has columns: id, state, commodity, price_date, modal_price
    query = text("""
        SELECT price_date, modal_price 
        FROM market_prices 
        WHERE state = :state AND commodity = :commodity 
        ORDER BY price_date DESC 
        LIMIT 30
    """)
    
    try:
        result = db.execute(query, {"state": request.state, "commodity": request.commodity}).fetchall()
    except Exception as e:
        logger.warning(f"Database connection failed: {e}. Using dummy historical data.")
        result = None
    
    # If no data is found, we might need a fallback or to raise an error
    if not result:
        # Fallback for demonstration/testing if DB is empty 
        # In production, raise ValueError("Not enough historical data")
        logger.info(f"Using generated historical data for {request.commodity} in {request.state} due to missing DB/data.")
        dates = pd.date_range(end=pd.Timestamp.today(), periods=30)
        prices = np.linspace(1500, 2000, 30) + np.random.normal(0, 50, 30)
        df = pd.DataFrame({'price_date': dates, 'modal_price': prices})
    else:
        df = pd.DataFrame(result, columns=['price_date', 'modal_price'])
    
    df['price_date'] = pd.to_datetime(df['price_date'])
    df = df.sort_values('price_date').reset_index(drop=True)
    return df

from scipy.stats import linregress

def calculate_slope(series):
    if len(series) < 2:
        return 0
    x = np.arange(len(series))
    y = series.values
    slope, _, _, _, _ = linregress(x, y)
    return slope

# (We don't need create_forecast_features anymore as we will do it within get_forecast loops like the notebook)

def get_forecast(req: ForecastRequest, db: Session) -> ForecastResponse:
    try:
        from app.main import models
        forecast_model = models.get('forecast_model')
        loaded_feature_columns = models.get('feature_columns', [])
        
        if not forecast_model or not loaded_feature_columns:
            raise ValueError("Forecast model or feature columns not loaded.")
        
        last_n_days_dataframe = fetch_historical_prices(db, req)
        
        # Renaissance the data setup from notebook
        last_n_days_dataframe = last_n_days_dataframe.rename(columns={'price_date': 'Price Date', 'modal_price': 'Modal_Price'})
        
        if len(last_n_days_dataframe) < 14:
            logger.warning("Minimum 14 days historical data required. Trying to proceed anyway with what we have.")
            # In production we might raise ValueError("Minimum 14 days historical data required.")
        
        history_df = last_n_days_dataframe.sort_values(by='Price Date').copy()
        
        # In the payload we use 'region' but the notebook uses 'STATE'
        # The notebook: history_df['STATE'] = state
        state = req.state
        commodity = req.commodity
        
        history_df['STATE'] = state
        history_df['Commodity'] = commodity
        
        forecasts = []
        forecast_horizon = 3
        
        for _ in range(forecast_horizon):
            next_date = history_df['Price Date'].max() + pd.Timedelta(days=1)
            
            new_row = pd.DataFrame([
                {
                    'STATE': state,
                    'Commodity': commodity,
                    'Price Date': next_date,
                    'Modal_Price': np.nan
                }
            ])
            
            # Using concat instead of append to avoid deprecation warnings
            history_df = pd.concat([history_df, new_row], ignore_index=True)
            history_df = history_df.sort_values(by='Price Date').reset_index(drop=True)
            
            df_temp = history_df.copy()
            
            # -------- LAG FEATURES --------
            df_temp['Modal_Price_lag_1'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price'].shift(1)
            df_temp['Modal_Price_lag_2'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price'].shift(2)
            df_temp['Modal_Price_lag_3'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price'].shift(3)
            df_temp['Modal_Price_lag_7'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price'].shift(7)

            # -------- ROLLING FEATURES --------
            df_temp['Modal_Price_rolling_mean_3'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=3, min_periods=1).mean().reset_index(level=[0,1], drop=True)

            df_temp['Modal_Price_rolling_mean_7'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=7, min_periods=1).mean().reset_index(level=[0,1], drop=True)

            df_temp['Modal_Price_rolling_std_7'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=7, min_periods=2).std().reset_index(level=[0,1], drop=True).fillna(0)

            df_temp['Modal_Price_rolling_min_7'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=7, min_periods=1).min().reset_index(level=[0,1], drop=True)

            df_temp['Modal_Price_rolling_max_7'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=7, min_periods=1).max().reset_index(level=[0,1], drop=True)

            # -------- MOMENTUM --------
            df_temp['price_change_1'] = df_temp['Modal_Price'] - df_temp['Modal_Price_lag_1']
            df_temp['price_change_3'] = df_temp['Modal_Price'] - df_temp['Modal_Price_lag_3']

            df_temp['percent_change_3'] = np.where(
                df_temp['Modal_Price_lag_3'] != 0,
                (df_temp['price_change_3'] / df_temp['Modal_Price_lag_3']) * 100,
                0
            )

            # -------- CALENDAR --------
            df_temp['day_of_week'] = df_temp['Price Date'].dt.dayofweek
            df_temp['month'] = df_temp['Price Date'].dt.month
            df_temp['week_of_year'] = df_temp['Price Date'].dt.isocalendar().week.astype(int)

            # -------- TREND --------
            df_temp['Modal_Price_trend_7D'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=7, min_periods=2).apply(calculate_slope)\
                .reset_index(level=[0,1], drop=True).fillna(0)

            df_temp['Modal_Price_trend_14D'] = df_temp.groupby(['STATE','Commodity'])['Modal_Price']\
                .rolling(window=14, min_periods=2).apply(calculate_slope)\
                .reset_index(level=[0,1], drop=True).fillna(0)

            # -------- FEATURE ROW --------
            # Ensure columns exist in df_temp before selecting to avoid KeyError if loaded_feature_columns has extras
            for col in loaded_feature_columns:
                if col not in df_temp.columns:
                    df_temp[col] = 0.0
            
            feature_row = df_temp.iloc[[-1]][loaded_feature_columns].fillna(0)

            # Predict
            # Depending on sklearn/xgboost version, predict might expect values if columns don't perfectly match dtype
            prediction = float(forecast_model.predict(feature_row)[0])
            forecasts.append(prediction)

            history_df.loc[history_df['Price Date'] == next_date, 'Modal_Price'] = prediction
            
        # Calculate trend percent (Day 3 vs Day 1 history or lag)
        current_price = last_n_days_dataframe['Modal_Price'].iloc[-1]
        trend_percent = ((forecasts[-1] - current_price) / current_price) * 100 if current_price else 0.0
        
        return ForecastResponse(
            forecast=[round(p, 2) for p in forecasts],
            trend_percent=round(trend_percent, 2)
        )
        
    except Exception as e:
        logger.error(f"Error generating forecast: {e}")
        raise e
