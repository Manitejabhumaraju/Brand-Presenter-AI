from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import ContentType, Platform, PricingModel, PricingVisibility


class CreatorPricingCreate(BaseModel):
    platform: Platform
    content_type: ContentType
    service_type: str | None = None
    min_price: float
    max_price: float | None = None
    currency: str = "INR"
    pricing_model: PricingModel = PricingModel.RANGE
    is_negotiable: bool = False
    visibility: PricingVisibility = PricingVisibility.PUBLIC


class CreatorPricingUpdate(BaseModel):
    min_price: float | None = None
    max_price: float | None = None
    currency: str | None = None
    pricing_model: PricingModel | None = None
    is_negotiable: bool | None = None
    visibility: PricingVisibility | None = None


class CreatorPricingRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    creator_id: str
    platform: Platform
    content_type: ContentType
    service_type: str | None
    min_price: float
    max_price: float | None
    currency: str
    pricing_model: PricingModel
    is_negotiable: bool
    visibility: PricingVisibility
    updated_at: datetime


class PricingBenchmarkRequest(BaseModel):
    platform: Platform | None = None
    category: str | None = None
    creator_type: str | None = None
    content_type: ContentType | None = None
    country: str | None = None
    min_followers: int | None = None
    max_followers: int | None = None


class PricingBenchmarkRead(BaseModel):
    market_min: float | None
    market_median: float | None
    market_max: float | None
    currency: str
    sample_size: int
    benchmark_updated_at: datetime
