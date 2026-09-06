from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import VerificationStatus
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class BrandProfile(SQLModel, table=True):
    __tablename__ = "brand_profiles"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True, unique=True)
    company_name: str
    company_slug: str = Field(index=True, unique=True)
    logo_url: str | None = None
    website: str | None = None
    industry: str | None = None
    company_size: str | None = None
    country: str | None = Field(default=None, index=True)
    state: str | None = None
    city: str | None = None
    description: str | None = None
    verification_status: VerificationStatus = Field(default=VerificationStatus.NOT_STARTED, index=True)
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
