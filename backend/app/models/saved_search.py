from datetime import datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.utils.datetime import utcnow
from app.utils.ids import new_id


class SavedSearch(SQLModel, table=True):
    __tablename__ = "saved_searches"

    id: str = Field(default_factory=new_id, primary_key=True)
    brand_id: str = Field(foreign_key="brand_profiles.id", index=True)
    name: str
    filters_json: dict = Field(default_factory=dict, sa_column=Column(JSON))
    notification_enabled: bool = False
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)
