from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import ContentType, FreshnessStatus, Platform


class MetricSnapshotRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    platform: Platform
    captured_at: datetime
    followers: int | None
    subscribers: int | None
    following: int | None
    posts_count: int | None
    reach: int | None
    impressions: int | None
    views: int | None
    likes: int | None
    comments: int | None
    shares: int | None
    saves: int | None
    engagement_rate: float | None
    average_views: float | None
    average_reach: float | None
    growth_absolute: int | None
    growth_percentage: float | None
    source: str
    freshness: FreshnessStatus


class ContentMetricRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    content_type: ContentType
    content_url: str | None
    published_at: datetime | None
    views: int | None
    reach: int | None
    likes: int | None
    comments: int | None
    shares: int | None
    engagement_rate: float | None
    source: str


class CreatorAnalyticsRead(BaseModel):
    creator_id: str
    platforms: list[MetricSnapshotRead]
    top_content: list[ContentMetricRead]
