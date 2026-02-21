import logging
import numpy as np
from app.schemas.requests import SpoilageRequest
from app.schemas.responses import SpoilageResponse
from app.services.feature_engineering import construct_spoilage_features
from app.main import models

logger = logging.getLogger(__name__)

def predict_spoilage(req: SpoilageRequest) -> SpoilageResponse:
    try:
        from app.main import models
        spoilage_model = models.get('spoilage_model')
        if not spoilage_model:
            raise ValueError("Spoilage model not loaded.")
        
        # 1. Construct Features
        features_df = construct_spoilage_features(req)
        
        # 2. Predict Probabilities using the loaded XGBClassifier
        # predict_proba returns array shape (n_samples, n_classes)
        probabilities = spoilage_model.predict_proba(features_df)[0]
        
        # Determine the predicted class (0, 1, or 2)
        predicted_class_idx = int(np.argmax(probabilities))
        
        # 3. Decision Logic Mapping
        class_mapping = {
            0: "No spoilage",
            1: "Moderate spoilage",
            2: "Severe spoilage"
        }
        class_label = class_mapping.get(predicted_class_idx, "Unknown")
        
        # Probability of the predicted class
        prob_predicted = float(probabilities[predicted_class_idx])
        
        # For the overall spoilage probability (for the pie chart/gauge),
        # we can sum moderate + severe probabilities, or just use the severity weight.
        # Let's say risk = prob(Moderate) * 0.5 + prob(Severe) * 1.0
        # If classes are 0, 1, 2:
        risk_probability = float(probabilities[1]) * 0.5 + float(probabilities[2]) * 1.0
        # Clamp to 1.0 just in case
        risk_probability = min(1.0, risk_probability)
        
        confidence = prob_predicted
        
        return SpoilageResponse(
            class_label=class_label, # Mapped to 'class' in response schema
            probability=round(risk_probability, 4),
            confidence=round(confidence, 4)
        )
        
    except Exception as e:
        logger.error(f"Error predicting spoilage: {e}")
        raise e
