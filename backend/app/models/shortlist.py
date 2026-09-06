from datetime import datetime

from sqlmodel import Field, SQLModel

from app.utils.datetime import utcnow
from app.utils.ids import new_id


class Shortlist(SQLModel, table=True):
    __tablename__ = "shortlists"

    id: str = Field(default_factory=new_id, primary_key=True)
    brand_id: str = Field(foreign_key="brand_profiles.id", index=True)
    name: str
    description: str | None = None
    created_at: datetime = Field(default_factory=utcnow)


class ShortlistItem(SQLModel, table=True):
    __tablename__ = "shortlist_items"

    id: str = Field(default_factory=new_id, primary_key=True)
    shortlist_id: str = Field(foreign_key="shortlists.id", index=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True)
    notes: str | None = None
    created_at: datetime = Field(default_factory=utcnow)
