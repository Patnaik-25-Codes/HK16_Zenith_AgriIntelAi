from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import joblib
import logging

from app.config import settings

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables to hold models
models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load Models on Startup
    try:
        logger.info(f"Loading Spoilage Model from {settings.SPOILAGE_MODEL_PATH}")
        models['spoilage_model'] = joblib.load(settings.SPOILAGE_MODEL_PATH)
        
        logger.info(f"Loading Forecast Model from {settings.FORECAST_MODEL_PATH}")
        models['forecast_model'] = joblib.load(settings.FORECAST_MODEL_PATH)
        
        logger.info(f"Loading Feature Columns from {settings.FEATURE_COLUMNS_PATH}")
        models['feature_columns'] = joblib.load(settings.FEATURE_COLUMNS_PATH)
        
        logger.info("All models loaded successfully.")
    except Exception as e:
        logger.error(f"Error loading models: {e}")
        # Depending on requirements, we might want to raise here to prevent startup
        # But for development, letting it start with a broken model state might be okay temporarily.
    
    yield
    
    # Cleanup on Shutdown
    models.clear()
    logger.info("Application shutdown, models cleared.")

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# CORS Middleware (Enable for frontend port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"], # Allow * for render deployment, restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriIntel AI API", "models_loaded": len(models) == 3}

from app.routes import spoilage, forecast, decision

app.include_router(spoilage.router, prefix="/api", tags=["Spoilage"])
app.include_router(forecast.router, prefix="/api", tags=["Forecast"])
app.include_router(decision.router, prefix="/api", tags=["Decision"])
