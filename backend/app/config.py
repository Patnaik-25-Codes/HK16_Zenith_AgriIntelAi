import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriIntel AI Backend"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/dbname")
    
    # Model Paths
    SPOILAGE_MODEL_PATH: str = os.getenv("SPOILAGE_MODEL_PATH", "../models/spoilage_model.pkl")
    FORECAST_MODEL_PATH: str = os.getenv("FORECAST_MODEL_PATH", "../models/Price-Forecast.joblib")
    FEATURE_COLUMNS_PATH: str = os.getenv("FEATURE_COLUMNS_PATH", "../models/feature_columns-Price-forecast.joblib")

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
