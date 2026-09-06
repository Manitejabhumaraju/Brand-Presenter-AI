from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import ContentType, Platform, VerificationStatus
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class PortfolioItem(SQLModel, table=True):
    __tablename__ = "portfolio_items"

    id: str = Field(default_factory=new_id, primary_key=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True)
    title: str
    description: str | None = None
    brand_name: str | None = None
    campaign_name: str | None = None
    platform: Platform | None = None
    content_type: ContentType = Field(default=ContentType.OTHER)
    content_url: str | None = None
    thumbnail_url: str | None = None
    published_at: datetime | None = None

    # Performance figures. Only populate from a verified/sourced number - see verification_status.
    reach: int | None = None
    views: int | None = None
    engagement: int | None = None
    leads: int | None = None
    conversions: int | None = None
    revenue: float | None = None

    verification_status: VerificationStatus = Field(default=VerificationStatus.NOT_STARTED)
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
