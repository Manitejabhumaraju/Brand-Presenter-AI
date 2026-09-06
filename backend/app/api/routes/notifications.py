from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.notification import Notification
from app.models.user import User
from app.schemas.common import Page
from app.schemas.notification import NotificationRead
from app.services import notification_service

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=Page[NotificationRead], summary="List the current user's notifications")
def list_notifications(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Page[Notification]:
    items, total = notification_service.list_for_user(
        session, user.id, offset=(page - 1) * page_size, limit=page_size
    )
    return Page.create(items, page=page, page_size=page_size, total=total)


@router.post(
    "/{notification_id}/read", response_model=NotificationRead, summary="Mark a notification as read"
)
def mark_read(
    notification_id: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> Notification:
    return notification_service.mark_read(session, user, notification_id)
