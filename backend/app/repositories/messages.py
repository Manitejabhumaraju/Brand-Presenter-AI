from sqlmodel import Session, func, select

from app.models.messaging import Conversation, ConversationParticipant, Message


def create_conversation(session: Session, conversation: Conversation) -> Conversation:
    session.add(conversation)
    session.commit()
    session.refresh(conversation)
    return conversation


def add_participant(session: Session, participant: ConversationParticipant) -> ConversationParticipant:
    session.add(participant)
    session.commit()
    session.refresh(participant)
    return participant


def get_conversation(session: Session, conversation_id: str) -> Conversation | None:
    return session.get(Conversation, conversation_id)


def list_participants(session: Session, conversation_id: str) -> list[ConversationParticipant]:
    return list(
        session.exec(
            select(ConversationParticipant).where(ConversationParticipant.conversation_id == conversation_id)
        ).all()
    )


def is_participant(session: Session, conversation_id: str, user_id: str) -> bool:
    return (
        session.exec(
            select(ConversationParticipant).where(
                ConversationParticipant.conversation_id == conversation_id,
                ConversationParticipant.user_id == user_id,
            )
        ).first()
        is not None
    )


def list_conversations_for_user(session: Session, user_id: str) -> list[Conversation]:
    stmt = (
        select(Conversation)
        .join(ConversationParticipant, ConversationParticipant.conversation_id == Conversation.id)
        .where(ConversationParticipant.user_id == user_id)
        .order_by(Conversation.updated_at.desc())
    )
    return list(session.exec(stmt).all())


def add_message(session: Session, message: Message) -> Message:
    session.add(message)
    session.commit()
    session.refresh(message)
    return message


def list_messages(
    session: Session, conversation_id: str, *, offset: int = 0, limit: int = 50
) -> tuple[list[Message], int]:
    stmt = select(Message).where(Message.conversation_id == conversation_id)
    total = session.exec(select(func.count()).select_from(stmt.subquery())).one()
    items = session.exec(stmt.order_by(Message.created_at.asc()).offset(offset).limit(limit)).all()
    return list(items), total


def last_message(session: Session, conversation_id: str) -> Message | None:
    return session.exec(
        select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at.desc())
    ).first()
