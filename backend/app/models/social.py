from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import Platform, SyncStatus
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class SocialAccount(SQLModel, table=True):
    """A creator's connected social platform account.

    IMPORTANT: access_token_encrypted / refresh_token_encrypted are encrypted at rest
    (app.core.security.encrypt_secret) and must never be serialized in an API response -
    see app/schemas/social.py, which deliberately omits them from every response schema.
    """

    __tablename__ = "social_accounts"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    platform: Platform = Field(index=True)
    username: str
    profile_url: str | None = None
    account_type: str | None = None
    platform_user_id: str | None = None
    is_connected: bool = True
    is_verified: bool = False
    access_token_encrypted: str | None = None
    refresh_token_encrypted: str | None = None
    token_expires_at: datetime | None = None
    last_synced_at: datetime | None = None
    sync_status: SyncStatus = Field(default=SyncStatus.NEVER_SYNCED, index=True)
    sync_error: str | None = None
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
