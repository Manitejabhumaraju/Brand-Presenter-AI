from datetime import datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import AuditAction
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class AuditLog(SQLModel, table=True):
    __tablename__ = "audit_logs"

    id: str = Field(default_factory=new_id, primary_key=True)
    actor_user_id: str | None = Field(default=None, foreign_key="users.id", index=True)
    action: AuditAction = Field(index=True)
    entity_type: str
    entity_id: str
    metadata_json: dict = Field(default_factory=dict, sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=utcnow, index=True)
