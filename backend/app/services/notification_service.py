from sqlmodel import Session, func, select

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.enums import NotificationType
from app.models.notification import Notification
from app.models.user import User


def notify(
    session: Session,
    *,
    user_id: str,
    type_: str,
    title: str,
    body: str,
    data: dict | None = None,
) -> Notification:
    notification = Notification(
        user_id=user_id,
        type=NotificationType(type_),
        title=title,
        body=body,
        data_json=data or {},
    )
    session.add(notification)
    session.commit()
    session.refresh(notification)
    return notification


def list_for_user(
    session: Session, user_id: str, *, offset: int = 0, limit: int = 20
) -> tuple[list[Notification], int]:
    stmt = select(Notification).where(Notification.user_id == user_id)
    total = session.exec(select(func.count()).select_from(stmt.subquery())).one()
    items = session.exec(stmt.order_by(Notification.created_at.desc()).offset(offset).limit(limit)).all()
    return list(items), total


def mark_read(session: Session, user: User, notification_id: str) -> Notification:
    notification = session.get(Notification, notification_id)
    if notification is None:
        raise NotFoundError("Notification was not found")
    if notification.user_id != user.id:
        raise AuthorizationError("You do not have permission to modify this notification")
    notification.is_read = True
    session.add(notification)
    session.commit()
    session.refresh(notification)
    return notification
