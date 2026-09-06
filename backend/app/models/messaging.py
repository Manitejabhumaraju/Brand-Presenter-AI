from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import MessageType
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class Conversation(SQLModel, table=True):
    __tablename__ = "conversations"

    id: str = Field(default_factory=new_id, primary_key=True)
    type: str = "direct"
    campaign_id: str | None = Field(default=None, foreign_key="campaigns.id", index=True)
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow, index=True)


class ConversationParticipant(SQLModel, table=True):
    __tablename__ = "conversation_participants"

    id: str = Field(default_factory=new_id, primary_key=True)
    conversation_id: str = Field(foreign_key="conversations.id", index=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    joined_at: datetime = Field(default_factory=utcnow)
    last_read_at: datetime | None = None


class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: str = Field(default_factory=new_id, primary_key=True)
    conversation_id: str = Field(foreign_key="conversations.id", index=True)
    sender_id: str = Field(foreign_key="users.id", index=True)
    message_type: MessageType = Field(default=MessageType.TEXT)
    content: str
    created_at: datetime = Field(default_factory=utcnow, index=True)
    read_at: datetime | None = None
