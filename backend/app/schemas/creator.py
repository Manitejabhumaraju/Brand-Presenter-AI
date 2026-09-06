from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import ContactVisibility, CreatorType, VerificationStatus


class CreatorProfileCreate(BaseModel):
    display_name: str
    bio: str | None = None
    creator_type: CreatorType = CreatorType.CONTENT_CREATOR
    categories: list[str] = []
    niches: list[str] = []
    country: str | None = None
    state: str | None = None
    city: str | None = None
    languages: list[str] = []
    website: str | None = None
    availability: bool = True
    response_time: str | None = None
    contact_visibility: ContactVisibility = ContactVisibility.MESSAGE_ONLY


class CreatorProfileUpdate(BaseModel):
    display_name: str | None = None
    bio: str | None = None
    creator_type: CreatorType | None = None
    categories: list[str] | None = None
    niches: list[str] | None = None
    country: str | None = None
    state: str | None = None
    city: str | None = None
    languages: list[str] | None = None
    website: str | None = None
    availability: bool | None = None
    response_time: str | None = None
    contact_visibility: ContactVisibility | None = None


class BrandPresenterScoreRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    score: int
    audience_quality: int
    engagement_quality: int
    content_performance: int
    consistency: int
    brand_fit: int
    professional_reliability: int
    commercial_value: int
    methodology_version: str
    calculated_at: datetime


class CreatorProfileRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    display_name: str
    bio: str | None
    creator_type: CreatorType
    categories: list[str]
    niches: list[str]
    country: str | None
    state: str | None
    city: str | None
    languages: list[str]
    website: str | None
    availability: bool
    response_time: str | None
    profile_completion: int
    verification_status: VerificationStatus
    created_at: datetime
    updated_at: datetime


class CreatorProfileDetail(CreatorProfileRead):
    username: str
    avatar_url: str | None = None
    brand_presenter_score: BrandPresenterScoreRead | None = None
    followers_total: int | None = None
    platforms: list[str] = []


class CreatorContactRead(BaseModel):
    email: str | None = None
    phone: str | None = None
    message_only: bool = False
