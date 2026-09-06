from datetime import datetime

from pydantic import BaseModel


class ProfileViewCreate(BaseModel):
    source: str | None = None


class ProfileViewStats(BaseModel):
    total_views: int
    unique_viewers: int
    views_by_day: dict[str, int]
    views_by_week: dict[str, int]
    views_by_month: dict[str, int]
    last_viewed_at: datetime | None
