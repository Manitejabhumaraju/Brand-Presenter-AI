from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import ContentType, Platform, VerificationStatus


class PortfolioItemCreate(BaseModel):
    title: str
    description: str | None = None
    brand_name: str | None = None
    campaign_name: str | None = None
    platform: Platform | None = None
    content_type: ContentType = ContentType.OTHER
    content_url: str | None = None
    thumbnail_url: str | None = None
    published_at: datetime | None = None
    reach: int | None = None
    views: int | None = None
    engagement: int | None = None
    leads: int | None = None
    conversions: int | None = None
    revenue: float | None = None


class PortfolioItemUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    brand_name: str | None = None
    campaign_name: str | None = None
    content_url: str | None = None
    thumbnail_url: str | None = None
    reach: int | None = None
    views: int | None = None
    engagement: int | None = None
    leads: int | None = None
    conversions: int | None = None
    revenue: float | None = None


class PortfolioItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    creator_id: str
    title: str
    description: str | None
    brand_name: str | None
    campaign_name: str | None
    platform: Platform | None
    content_type: ContentType
    content_url: str | None
    thumbnail_url: str | None
    published_at: datetime | None
    reach: int | None
    views: int | None
    engagement: int | None
    leads: int | None
    conversions: int | None
    revenue: float | None
    verification_status: VerificationStatus
    created_at: datetime
    updated_at: datetime
