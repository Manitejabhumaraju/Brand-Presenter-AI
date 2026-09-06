from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import UserRole, UserStatus
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class User(SQLModel, table=True):
    """The single identity table. Role-specific data lives in *Profile tables, never here."""

    __tablename__ = "users"

    id: str = Field(default_factory=new_id, primary_key=True)
    email: str = Field(index=True, unique=True, nullable=False)
    password_hash: str
    full_name: str
    username: str = Field(index=True, unique=True, nullable=False)
    role: UserRole = Field(index=True)
    status: UserStatus = Field(default=UserStatus.ACTIVE)
    avatar_url: str | None = None
    phone: str | None = None
    phone_verified: bool = False
    email_verified: bool = False
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
    last_login_at: datetime | None = None


class RefreshToken(SQLModel, table=True):
    """Persisted refresh-token metadata so tokens can be revoked (logout, reuse detection)."""

    __tablename__ = "refresh_tokens"

    id: str = Field(default_factory=new_id, primary_key=True)
    jti: str = Field(index=True, unique=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    expires_at: datetime
    revoked_at: datetime | None = None
    created_at: datetime = Field(default_factory=utcnow)
