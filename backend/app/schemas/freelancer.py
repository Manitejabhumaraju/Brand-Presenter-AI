from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import VerificationStatus


class FreelancerProfileCreate(BaseModel):
    headline: str | None = None
    bio: str | None = None
    services: list[str] = []
    categories: list[str] = []
    country: str | None = None
    state: str | None = None
    city: str | None = None
    languages: list[str] = []
    hourly_rate: float | None = None
    project_rate: float | None = None
    availability: bool = True
    experience_years: int | None = None


class FreelancerProfileRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    headline: str | None
    bio: str | None
    services: list[str]
    categories: list[str]
    country: str | None
    state: str | None
    city: str | None
    languages: list[str]
    hourly_rate: float | None
    project_rate: float | None
    availability: bool
    experience_years: int | None
    verification_status: VerificationStatus
    created_at: datetime
    updated_at: datetime
