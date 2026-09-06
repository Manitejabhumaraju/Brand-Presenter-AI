from pydantic import BaseModel, EmailStr, Field, field_validator

from app.models.enums import UserRole
from app.schemas.user import UserRead

REGISTERABLE_ROLES = {UserRole.CREATOR, UserRole.INFLUENCER, UserRole.FREELANCER, UserRole.BRAND}


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    full_name: str = Field(min_length=1, max_length=200)
    username: str = Field(min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_.]+$")
    role: UserRole

    @field_validator("role")
    @classmethod
    def validate_registerable_role(cls, value: UserRole) -> UserRole:
        if value not in REGISTERABLE_ROLES:
            raise ValueError(f"role must be one of {sorted(r.value for r in REGISTERABLE_ROLES)}")
        return value


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class LogoutRequest(BaseModel):
    refresh_token: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserRead
