from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import ChatRole
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class ChatSession(SQLModel, table=True):
    __tablename__ = "chat_sessions"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    title: str = "New chat"
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow, index=True)


class ChatMessage(SQLModel, table=True):
    __tablename__ = "chat_messages"

    id: str = Field(default_factory=new_id, primary_key=True)
    session_id: str = Field(foreign_key="chat_sessions.id", index=True)
    role: ChatRole
    content: str
    created_at: datetime = Field(default_factory=utcnow, index=True)
