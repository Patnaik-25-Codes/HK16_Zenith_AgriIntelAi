from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import logging

from app.schemas.requests import DecisionRequest
from app.schemas.responses import DecisionResponse
from app.services.decision_engine import evaluate_decision
from app.database import get_db

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/decision", response_model=DecisionResponse)
def get_decision(request: DecisionRequest, db: Session = Depends(get_db)):
    """
    Evaluates whether to SELL or WAIT based on the expected future value of the crop.
    """
    try:
        return evaluate_decision(request, db)
    except ValueError as e:
        logger.error(f"Validation Error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Internal Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during decision evaluation.")
