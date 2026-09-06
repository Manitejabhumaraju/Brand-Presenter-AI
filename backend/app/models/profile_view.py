from datetime import datetime

from sqlmodel import Field, SQLModel

from app.utils.datetime import utcnow
from app.utils.ids import new_id


class ProfileView(SQLModel, table=True):
    __tablename__ = "profile_views"

    id: str = Field(default_factory=new_id, primary_key=True)
    viewer_user_id: str | None = Field(default=None, foreign_key="users.id", index=True)
    creator_id: str = Field(foreign_key="creator_profiles.id", index=True)
    viewed_at: datetime = Field(default_factory=utcnow, index=True)
    source: str | None = None
