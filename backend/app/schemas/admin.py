from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import AuditAction


class AuditLogRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    actor_user_id: str | None
    action: AuditAction
    entity_type: str
    entity_id: str
    metadata_json: dict
    created_at: datetime


class SystemHealthRead(BaseModel):
    total_users: int
    supported_platforms: int
    social_accounts_with_failed_sync: int
