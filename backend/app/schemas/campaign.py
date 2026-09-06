from datetime import date, datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import (
    CampaignCreatorStatus,
    CampaignStatus,
    ContentType,
    DeliverableStatus,
    Platform,
)


class CampaignCreate(BaseModel):
    name: str
    description: str | None = None
    objective: str | None = None
    budget: float | None = None
    currency: str = "INR"
    start_date: date | None = None
    end_date: date | None = None


class CampaignUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    objective: str | None = None
    budget: float | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: CampaignStatus | None = None


class CampaignRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    brand_id: str
    name: str
    description: str | None
    objective: str | None
    budget: float | None
    currency: str
    start_date: date | None
    end_date: date | None
    status: CampaignStatus
    created_at: datetime
    updated_at: datetime


class CampaignInviteRequest(BaseModel):
    creator_id: str
    agreed_price: float | None = None
    currency: str = "INR"


class CampaignCreatorRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    campaign_id: str
    creator_id: str
    status: CampaignCreatorStatus
    agreed_price: float | None
    currency: str
    invited_at: datetime
    accepted_at: datetime | None
    completed_at: datetime | None


class CampaignDeliverableCreate(BaseModel):
    creator_id: str
    title: str
    description: str | None = None
    platform: Platform | None = None
    content_type: ContentType = ContentType.OTHER
    due_date: date | None = None


class CampaignDeliverableUpdate(BaseModel):
    status: DeliverableStatus | None = None
    content_url: str | None = None
    description: str | None = None


class CampaignDeliverableRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    campaign_id: str
    creator_id: str
    title: str
    description: str | None
    platform: Platform | None
    content_type: ContentType
    due_date: date | None
    submitted_at: datetime | None
    approved_at: datetime | None
    status: DeliverableStatus
    content_url: str | None
    revision_count: int
