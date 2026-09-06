from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import ContentType, Platform, PricingModel, PricingVisibility
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class CreatorPricing(SQLModel, table=True):
    __tablename__ = "creator_pricing"

    id: str = Field(default_factory=new_id, primary_key=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True)
    platform: Platform = Field(index=True)
    content_type: ContentType
    service_type: str | None = None
    min_price: float
    max_price: float | None = None
    currency: str = "INR"
    pricing_model: PricingModel = Field(default=PricingModel.RANGE)
    is_negotiable: bool = False
    visibility: PricingVisibility = Field(default=PricingVisibility.PUBLIC, index=True)
    updated_at: datetime = Field(default_factory=utcnow)
