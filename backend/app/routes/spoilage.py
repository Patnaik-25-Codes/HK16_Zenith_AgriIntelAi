from fastapi import APIRouter, HTTPException
import logging
from app.schemas.requests import SpoilageRequest
from app.schemas.responses import SpoilageResponse
from app.services.spoilage_service import predict_spoilage

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/spoilage", response_model=SpoilageResponse)
def get_spoilage_prediction(request: SpoilageRequest):
    """
    Predicts the spoilage risk for a given crop batch based on current conditions.
    """
    try:
        return predict_spoilage(request)
    except ValueError as e:
        logger.error(f"Validation Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Internal Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during prediction.")
