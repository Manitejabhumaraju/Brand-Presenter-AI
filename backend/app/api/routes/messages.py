from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.core.rate_limit import rate_limit
from app.models.messaging import Message
from app.models.user import User
from app.schemas.common import Page
from app.schemas.messaging import ConversationCreate, ConversationRead, MessageCreate, MessageRead
from app.services import messaging_service

router = APIRouter(prefix="/conversations", tags=["messaging"])


@router.get("", response_model=list[ConversationRead], summary="List the current user's conversations")
def list_conversations(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> list[ConversationRead]:
    return messaging_service.list_conversations(session, user)


@router.post("", response_model=ConversationRead, status_code=201, summary="Start a conversation")
def create_conversation(
    payload: ConversationCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> ConversationRead:
    conversation = messaging_service.create_conversation(session, user, payload)
    return next(c for c in messaging_service.list_conversations(session, user) if c.id == conversation.id)


@router.get(
    "/{conversation_id}/messages", response_model=Page[MessageRead], summary="List messages in a conversation"
)
def list_messages(
    conversation_id: str,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=100),
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Page[MessageRead]:
    items, total = messaging_service.list_messages(
        session, user, conversation_id, page=page, page_size=page_size
    )
    return Page.create(items, page=page, page_size=page_size, total=total)


@router.post(
    "/{conversation_id}/messages",
    response_model=MessageRead,
    status_code=201,
    summary="Send a message in a conversation",
    dependencies=[Depends(rate_limit("messaging", limit=60, window_seconds=60))],
)
def send_message(
    conversation_id: str,
    payload: MessageCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Message:
    return messaging_service.send_message(session, user, conversation_id, payload)
