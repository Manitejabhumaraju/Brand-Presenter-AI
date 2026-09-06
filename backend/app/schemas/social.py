from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import Platform, SyncStatus


class PlatformCapability(BaseModel):
    platform: Platform
    supports_followers: bool
    supports_reach: bool
    supports_impressions: bool
    supports_story_views: bool
    supports_watch_time: bool
    supports_audience_gender: bool
    supports_audience_age: bool
    supports_audience_country: bool


class SocialAccountConnect(BaseModel):
    platform: Platform
    username: str
    profile_url: str | None = None


class SocialAccountRead(BaseModel):
    """Deliberately excludes access_token_encrypted / refresh_token_encrypted - never returned."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    platform: Platform
    username: str
    profile_url: str | None
    account_type: str | None
    is_connected: bool
    is_verified: bool
    token_expires_at: datetime | None
    last_synced_at: datetime | None
    sync_status: SyncStatus
    sync_error: str | None
    created_at: datetime
    updated_at: datetime


class SyncResult(BaseModel):
    status: str
    social_account_id: str
    message: str
