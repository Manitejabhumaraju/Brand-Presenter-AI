from datetime import datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import VerificationStatus
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class FreelancerProfile(SQLModel, table=True):
    __tablename__ = "freelancer_profiles"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, unique=True)
    headline: str | None = None
    bio: str | None = None
    services: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    categories: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    country: str | None = Field(default=None, index=True)
    state: str | None = None
    city: str | None = None
    languages: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    hourly_rate: float | None = None
    project_rate: float | None = None
    availability: bool = True
    experience_years: int | None = None
    verification_status: VerificationStatus = Field(default=VerificationStatus.NOT_STARTED)
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
