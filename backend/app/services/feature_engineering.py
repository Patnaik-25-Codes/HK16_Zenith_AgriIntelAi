import pandas as pd
import numpy as np
from app.schemas.requests import SpoilageRequest

def construct_spoilage_features(req: SpoilageRequest) -> pd.DataFrame:
    """
    Constructs the exact 12-feature array expected by the XGBoost Spoilage model.
    Expected Features:
    ['Temperature', 'Relative_Humidity', 'Temp_Humidity', 'Days_after_harvest',
     'Days_Squared', 'Price_drop_percent', 'Days_Temp', 'Days_Humidity',
     'Crop_Potato', 'Crop_Rice', 'Crop_Tomato', 'Crop_Wheat']
    """
    
    data = {
        'Days_after_harvest': [req.days_after_harvest],
        'Temperature': [req.temperature],
        'Relative_Humidity': [req.humidity],
        'Price_drop_percent': [req.price_drop_percent],
        'Days_Temp': [req.days_after_harvest * req.temperature],
        'Days_Humidity': [req.days_after_harvest * req.humidity],
        'Temp_Humidity': [req.temperature * req.humidity],
        'Days_Squared': [req.days_after_harvest ** 2],
        
        # Initialize one-hot encoded crops to 0
        'Crop_Potato': [0],
        'Crop_Rice': [0],
        'Crop_Tomato': [0],
        'Crop_Wheat': [0]
    }
    
    # Set the specific crop to 1
    crop_col = f"Crop_{req.crop.capitalize()}"
    if crop_col in data:
        data[crop_col] = [1]
    
    # Create DataFrame with exact column order
    df = pd.DataFrame(data)
    
    # Ensure exact column order as specified by the model's actual signature
    expected_cols = [
        'Days_after_harvest', 'Temperature', 'Relative_Humidity', 'Price_drop_percent',
        'Days_Temp', 'Days_Humidity', 'Temp_Humidity', 'Days_Squared', 
        'Crop_Potato', 'Crop_Rice', 'Crop_Tomato', 'Crop_Wheat'
    ]
    
    return df[expected_cols]
