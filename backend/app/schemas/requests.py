from pydantic import BaseModel, Field

class SpoilageRequest(BaseModel):
    crop: str = Field(..., description="Crop type (e.g., Potato, Rice, Tomato, Wheat)")
    temperature: float = Field(..., description="Current temperature in Celsius")
    humidity: float = Field(..., description="Relative humidity percentage")
    days_after_harvest: int = Field(..., description="Number of days since harvest")
    price_drop_percent: float = Field(..., description="Percentage drop in price")

class ForecastRequest(BaseModel):
    # Depending on requirements, we might need state/commodity to fetch data
    # Or just rely on the latest data for all. Let's make it configurable.
    state: str = Field(default="National", description="State for price forecast")
    commodity: str = Field(default="All", description="Commodity name")

class DecisionRequest(BaseModel):
    crop: str = Field(..., description="Crop type (e.g., Potato, Rice, Tomato, Wheat)")
    region: str = Field(..., description="State or Region for price forecasting")
    days_after_harvest: int = Field(..., description="Number of days since harvest")
    temperature: float = Field(..., description="Current temperature in Celsius")
    humidity: float = Field(..., description="Relative humidity percentage")
    current_market_price: float = Field(..., description="Current market price per quintal")
