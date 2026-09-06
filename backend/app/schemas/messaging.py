from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import MessageType


class ConversationCreate(BaseModel):
    participant_user_ids: list[str]
    campaign_id: str | None = None


class ConversationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    type: str
    campaign_id: str | None
    created_at: datetime
    updated_at: datetime
    participant_user_ids: list[str] = []
    last_message: "MessageRead | None" = None
    unread_count: int = 0


class MessageCreate(BaseModel):
    content: str
    message_type: MessageType = MessageType.TEXT


class MessageRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    conversation_id: str
    sender_id: str
    message_type: MessageType
    content: str
    created_at: datetime
    read_at: datetime | None


ConversationRead.model_rebuild()
