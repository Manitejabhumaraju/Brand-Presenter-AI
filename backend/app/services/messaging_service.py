from datetime import UTC, datetime

from sqlmodel import Session

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.messaging import Conversation, ConversationParticipant, Message
from app.models.user import User
from app.repositories import messages as messages_repo
from app.schemas.messaging import ConversationCreate, ConversationRead, MessageCreate, MessageRead
from app.services.notification_service import notify


def create_conversation(session: Session, user: User, payload: ConversationCreate) -> Conversation:
    participant_ids = set(payload.participant_user_ids) | {user.id}
    conversation = Conversation(campaign_id=payload.campaign_id)
    conversation = messages_repo.create_conversation(session, conversation)
    for uid in participant_ids:
        messages_repo.add_participant(
            session, ConversationParticipant(conversation_id=conversation.id, user_id=uid)
        )
    return conversation


def _assert_participant(session: Session, user: User, conversation_id: str) -> None:
    if not messages_repo.is_participant(session, conversation_id, user.id):
        raise AuthorizationError("You are not a participant in this conversation")


def list_conversations(session: Session, user: User) -> list[ConversationRead]:
    conversations = messages_repo.list_conversations_for_user(session, user.id)
    results = []
    for conv in conversations:
        participants = messages_repo.list_participants(session, conv.id)
        last = messages_repo.last_message(session, conv.id)
        results.append(
            ConversationRead(
                **conv.model_dump(),
                participant_user_ids=[p.user_id for p in participants],
                last_message=MessageRead.model_validate(last) if last else None,
            )
        )
    return results


def send_message(session: Session, user: User, conversation_id: str, payload: MessageCreate) -> Message:
    conversation = messages_repo.get_conversation(session, conversation_id)
    if conversation is None:
        raise NotFoundError("Conversation was not found")
    _assert_participant(session, user, conversation_id)

    message = Message(
        conversation_id=conversation_id,
        sender_id=user.id,
        message_type=payload.message_type,
        content=payload.content,
    )
    message = messages_repo.add_message(session, message)

    conversation.updated_at = datetime.now(UTC)
    session.add(conversation)
    session.commit()

    for participant in messages_repo.list_participants(session, conversation_id):
        if participant.user_id != user.id:
            notify(
                session,
                user_id=participant.user_id,
                type_="MESSAGE",
                title="New message",
                body=payload.content[:140],
                data={"conversation_id": conversation_id},
            )
    return message


def list_messages(session: Session, user: User, conversation_id: str, *, page: int, page_size: int):
    conversation = messages_repo.get_conversation(session, conversation_id)
    if conversation is None:
        raise NotFoundError("Conversation was not found")
    _assert_participant(session, user, conversation_id)
    return messages_repo.list_messages(
        session, conversation_id, offset=(page - 1) * page_size, limit=page_size
    )
