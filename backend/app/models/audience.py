"""Normalized audience demographic tables.

Every row carries its own `source`/`captured_at`/`confidence` because platforms differ wildly in
what they expose - never assume every platform reports gender, age brackets, or country splits.
"""

from datetime import datetime

from sqlmodel import Field, SQLModel

from app.utils.datetime import utcnow
from app.utils.ids import new_id


class AudienceSnapshot(SQLModel, table=True):
    __tablename__ = "audience_snapshots"

    id: str = Field(default_factory=new_id, primary_key=True)
    social_account_id: str = Field(foreign_key="social_accounts.id", index=True)
    captured_at: datetime = Field(default_factory=utcnow, index=True)
    source: str = "mock"


class AudienceCountry(SQLModel, table=True):
    __tablename__ = "audience_countries"

    id: str = Field(default_factory=new_id, primary_key=True)
    snapshot_id: str = Field(foreign_key="audience_snapshots.id", index=True)
    country: str
    percentage: float
    confidence: float | None = None


class AudienceCity(SQLModel, table=True):
    __tablename__ = "audience_cities"

    id: str = Field(default_factory=new_id, primary_key=True)
    snapshot_id: str = Field(foreign_key="audience_snapshots.id", index=True)
    city: str
    percentage: float
    confidence: float | None = None


class AudienceAge(SQLModel, table=True):
    __tablename__ = "audience_ages"

    id: str = Field(default_factory=new_id, primary_key=True)
    snapshot_id: str = Field(foreign_key="audience_snapshots.id", index=True)
    age_range: str  # e.g. "18-24"
    percentage: float
    confidence: float | None = None


class AudienceGender(SQLModel, table=True):
    __tablename__ = "audience_genders"

    id: str = Field(default_factory=new_id, primary_key=True)
    snapshot_id: str = Field(foreign_key="audience_snapshots.id", index=True)
    gender: str
    percentage: float
    confidence: float | None = None


class AudienceLanguage(SQLModel, table=True):
    __tablename__ = "audience_languages"

    id: str = Field(default_factory=new_id, primary_key=True)
    snapshot_id: str = Field(foreign_key="audience_snapshots.id", index=True)
    language: str
    percentage: float
    confidence: float | None = None


class AudienceInterest(SQLModel, table=True):
    __tablename__ = "audience_interests"

    id: str = Field(default_factory=new_id, primary_key=True)
    snapshot_id: str = Field(foreign_key="audience_snapshots.id", index=True)
    interest: str
    percentage: float
    confidence: float | None = None
