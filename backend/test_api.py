import sys
import os
import traceback
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()
os.environ['DATABASE_URL'] = os.getenv('DATABASE_URL')

from app.schemas.requests import ForecastRequest
from app.services.forecast_service import get_forecast

# Load models
from app.config import settings
from app.main import models
import joblib

print('Loading models...')
try:
    models['forecast_model'] = joblib.load(settings.FORECAST_MODEL_PATH)
    models['feature_columns'] = joblib.load(settings.FEATURE_COLUMNS_PATH)
    print('Models loaded.')
except Exception as e:
    print('Model load error:', e)
    sys.exit(1)

engine = create_engine(os.getenv('DATABASE_URL'))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

req = ForecastRequest(state='National', commodity='Potato')
try:
    print('Running forecast...')
    res = get_forecast(req, db)
    print(res)
except Exception as e:
    with open('traceback.txt', 'w') as f:
        traceback.print_exc(file=f)
    print("Traceback written to traceback.txt")
