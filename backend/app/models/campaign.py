from datetime import date, datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import (
    CampaignCreatorStatus,
    CampaignStatus,
    ContentType,
    DeliverableStatus,
    Platform,
    UsageType,
)
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class Campaign(SQLModel, table=True):
    __tablename__ = "campaigns"

    id: str = Field(default_factory=new_id, primary_key=True)
    brand_id: str = Field(foreign_key="brand_profiles.id", index=True)
    name: str
    description: str | None = None
    objective: str | None = None
    budget: float | None = None
    currency: str = "INR"
    start_date: date | None = None
    end_date: date | None = None
    status: CampaignStatus = Field(default=CampaignStatus.DRAFT, index=True)
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class CampaignCreator(SQLModel, table=True):
    __tablename__ = "campaign_creators"

    id: str = Field(default_factory=new_id, primary_key=True)
    campaign_id: str = Field(foreign_key="campaigns.id", index=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True)
    status: CampaignCreatorStatus = Field(default=CampaignCreatorStatus.INVITED, index=True)
    agreed_price: float | None = None
    currency: str = "INR"
    invited_at: datetime = Field(default_factory=utcnow)
    accepted_at: datetime | None = None
    completed_at: datetime | None = None


class CampaignDeliverable(SQLModel, table=True):
    __tablename__ = "campaign_deliverables"

    id: str = Field(default_factory=new_id, primary_key=True)
    campaign_id: str = Field(foreign_key="campaigns.id", index=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True)
    title: str
    description: str | None = None
    platform: Platform | None = None
    content_type: ContentType = Field(default=ContentType.OTHER)
    due_date: date | None = None
    submitted_at: datetime | None = None
    approved_at: datetime | None = None
    status: DeliverableStatus = Field(default=DeliverableStatus.TODO, index=True)
    content_url: str | None = None
    revision_count: int = 0
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class CampaignUsageRights(SQLModel, table=True):
    __tablename__ = "campaign_usage_rights"

    id: str = Field(default_factory=new_id, primary_key=True)
    campaign_id: str = Field(foreign_key="campaigns.id", index=True, unique=True)
    platforms: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    territory: str | None = None
    usage_type: UsageType = Field(default=UsageType.ORGANIC)
    start_date: date | None = None
    end_date: date | None = None
    paid_usage: bool = False
    whitelisting: bool = False
    exclusivity: bool = False
    ownership_type: str | None = None
