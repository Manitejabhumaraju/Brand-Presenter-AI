from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import UserRole, UserStatus


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    full_name: str
    username: str
    role: UserRole
    status: UserStatus
    avatar_url: str | None
    phone: str | None
    phone_verified: bool
    email_verified: bool
    is_active: bool
    is_verified: bool
    created_at: datetime
    last_login_at: datetime | None
