from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import ContentType
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class MetricSnapshot(SQLModel, table=True):
    """A normalized point-in-time snapshot of account-level metrics.

    NULL means "unavailable from this platform" - it is never coerced to 0.
    """

    __tablename__ = "metric_snapshots"

    id: str = Field(default_factory=new_id, primary_key=True)
    social_account_id: str = Field(foreign_key="social_accounts.id", index=True)
    captured_at: datetime = Field(default_factory=utcnow, index=True)
    measurement_start: datetime | None = None
    measurement_end: datetime | None = None

    followers: int | None = Field(default=None, index=True)
    subscribers: int | None = None
    following: int | None = None
    posts_count: int | None = None

    reach: int | None = None
    impressions: int | None = None
    views: int | None = None

    likes: int | None = None
    comments: int | None = None
    shares: int | None = None
    saves: int | None = None

    engagement_rate: float | None = Field(default=None, index=True)
    average_views: float | None = None
    average_reach: float | None = None

    profile_visits: int | None = None
    website_clicks: int | None = None

    growth_absolute: int | None = None
    growth_percentage: float | None = None

    source: str = "mock"
    source_timestamp: datetime | None = None
    sync_timestamp: datetime = Field(default_factory=utcnow)


class ContentMetric(SQLModel, table=True):
    __tablename__ = "content_metrics"

    id: str = Field(default_factory=new_id, primary_key=True)
    social_account_id: str = Field(foreign_key="social_accounts.id", index=True)
    external_content_id: str | None = None
    content_url: str | None = None
    content_type: ContentType = Field(default=ContentType.OTHER)
    published_at: datetime | None = Field(default=None, index=True)

    views: int | None = None
    reach: int | None = None
    impressions: int | None = None
    likes: int | None = None
    comments: int | None = None
    shares: int | None = None
    saves: int | None = None
    engagement_rate: float | None = None
    watch_time: float | None = None

    source: str = "mock"
    created_at: datetime = Field(default_factory=utcnow)
