from datetime import datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import NotificationType
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class Notification(SQLModel, table=True):
    __tablename__ = "notifications"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    type: NotificationType = Field(index=True)
    title: str
    body: str
    data_json: dict = Field(default_factory=dict, sa_column=Column(JSON))
    is_read: bool = Field(default=False, index=True)
    created_at: datetime = Field(default_factory=utcnow, index=True)
