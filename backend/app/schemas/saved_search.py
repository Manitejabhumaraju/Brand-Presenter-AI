from datetime import datetime

from pydantic import BaseModel, ConfigDict


class SavedSearchCreate(BaseModel):
    name: str
    filters_json: dict
    notification_enabled: bool = False


class SavedSearchUpdate(BaseModel):
    name: str | None = None
    filters_json: dict | None = None
    notification_enabled: bool | None = None


class SavedSearchRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    brand_id: str
    name: str
    filters_json: dict
    notification_enabled: bool
    created_at: datetime
    updated_at: datetime
