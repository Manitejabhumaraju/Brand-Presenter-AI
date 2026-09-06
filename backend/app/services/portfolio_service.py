from datetime import UTC, datetime

from sqlmodel import Session, select

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.enums import UserRole
from app.models.portfolio import PortfolioItem
from app.models.user import User
from app.schemas.portfolio import PortfolioItemCreate, PortfolioItemUpdate
from app.services.creator_service import get_profile_or_404


def create_item(session: Session, user: User, creator_id: str, payload: PortfolioItemCreate) -> PortfolioItem:
    profile = get_profile_or_404(session, creator_id)
    _assert_owns_or_admin(user, profile.user_id)
    item = PortfolioItem(creator_id=creator_id, **payload.model_dump())
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


def list_items(session: Session, creator_id: str) -> list[PortfolioItem]:
    get_profile_or_404(session, creator_id)
    return list(session.exec(select(PortfolioItem).where(PortfolioItem.creator_id == creator_id)).all())


def update_item(session: Session, user: User, item_id: str, payload: PortfolioItemUpdate) -> PortfolioItem:
    item = session.get(PortfolioItem, item_id)
    if item is None:
        raise NotFoundError("Portfolio item was not found")
    profile = get_profile_or_404(session, item.creator_id)
    _assert_owns_or_admin(user, profile.user_id)

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    item.updated_at = datetime.now(UTC)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


def delete_item(session: Session, user: User, item_id: str) -> None:
    item = session.get(PortfolioItem, item_id)
    if item is None:
        raise NotFoundError("Portfolio item was not found")
    profile = get_profile_or_404(session, item.creator_id)
    _assert_owns_or_admin(user, profile.user_id)
    session.delete(item)
    session.commit()


def _assert_owns_or_admin(user: User, owner_user_id: str) -> None:
    if user.id != owner_user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to manage this portfolio item")
