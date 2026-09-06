from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import VerificationStatus


class BrandProfileCreate(BaseModel):
    company_name: str
    website: str | None = None
    industry: str | None = None
    company_size: str | None = None
    country: str | None = None
    state: str | None = None
    city: str | None = None
    description: str | None = None


class BrandProfileUpdate(BaseModel):
    company_name: str | None = None
    logo_url: str | None = None
    website: str | None = None
    industry: str | None = None
    company_size: str | None = None
    country: str | None = None
    state: str | None = None
    city: str | None = None
    description: str | None = None


class BrandProfileRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    company_name: str
    company_slug: str
    logo_url: str | None
    website: str | None
    industry: str | None
    company_size: str | None
    country: str | None
    state: str | None
    city: str | None
    description: str | None
    verification_status: VerificationStatus
    created_at: datetime
    updated_at: datetime
