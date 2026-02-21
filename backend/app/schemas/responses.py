from pydantic import BaseModel
from typing import List

class SpoilageResponse(BaseModel):
    class_label: str = BaseModel.model_fields.get("class", "class_label") # Workaround for reserved keyword 'class'
    probability: float
    confidence: float
    
    # We will alias 'class_label' to 'class' when serializing
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "class": "At Risk",
                "probability": 0.62,
                "confidence": 0.92
            }
        }

class ForecastResponse(BaseModel):
    forecast: List[float]
    trend_percent: float

class DecisionResponse(BaseModel):
    decision: str
    wait_days: int
    expected_value: float
    profit_index: int
    forecast: List[float]
    trend_percent: float
    spoilage_probability: float
    spoilage_class: str
    model_confidence: float
