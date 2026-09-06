from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ShortlistCreate(BaseModel):
    name: str
    description: str | None = None


class ShortlistRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    brand_id: str
    name: str
    description: str | None
    created_at: datetime
    creator_count: int = 0


class ShortlistItemCreate(BaseModel):
    notes: str | None = None


class ShortlistItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    shortlist_id: str
    creator_id: str
    notes: str | None
    created_at: datetime
