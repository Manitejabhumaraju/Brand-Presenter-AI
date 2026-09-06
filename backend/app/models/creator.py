from datetime import datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import CreatorType, VerificationStatus
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class CreatorProfile(SQLModel, table=True):
    __tablename__ = "creator_profiles"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, unique=True)
    display_name: str
    bio: str | None = None
    creator_type: CreatorType = Field(default=CreatorType.CONTENT_CREATOR, index=True)
    categories: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    niches: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    country: str | None = Field(default=None, index=True)
    state: str | None = None
    city: str | None = Field(default=None, index=True)
    languages: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    website: str | None = None
    availability: bool = True
    response_time: str | None = None
    profile_completion: int = 0
    verification_status: VerificationStatus = Field(default=VerificationStatus.NOT_STARTED, index=True)
    contact_visibility: str = Field(default="message_only")
    created_at: datetime = Field(default_factory=utcnow, index=True)
    updated_at: datetime = Field(default_factory=utcnow, index=True)


class BrandPresenterScore(SQLModel, table=True):
    """The platform's proprietary composite score - never presented as an official platform metric."""

    __tablename__ = "brand_presenter_scores"

    id: str = Field(default_factory=new_id, primary_key=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True, unique=True)
    score: int
    audience_quality: int
    engagement_quality: int
    content_performance: int
    consistency: int
    brand_fit: int
    professional_reliability: int
    commercial_value: int
    methodology_version: str = "1.0"
    calculated_at: datetime = Field(default_factory=utcnow)
