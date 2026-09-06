from datetime import UTC, datetime

from sqlmodel import Session, select

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.enums import UserRole
from app.models.saved_search import SavedSearch
from app.models.user import User
from app.schemas.saved_search import SavedSearchCreate, SavedSearchUpdate
from app.services.brand_service import get_profile_or_404 as get_brand_or_404


def create_saved_search(
    session: Session, user: User, brand_id: str, payload: SavedSearchCreate
) -> SavedSearch:
    brand = get_brand_or_404(session, brand_id)
    _assert_owner(user, brand.user_id)
    saved = SavedSearch(brand_id=brand_id, **payload.model_dump())
    session.add(saved)
    session.commit()
    session.refresh(saved)
    return saved


def list_saved_searches(session: Session, brand_id: str) -> list[SavedSearch]:
    return list(session.exec(select(SavedSearch).where(SavedSearch.brand_id == brand_id)).all())


def update_saved_search(
    session: Session, user: User, saved_search_id: str, payload: SavedSearchUpdate
) -> SavedSearch:
    saved = session.get(SavedSearch, saved_search_id)
    if saved is None:
        raise NotFoundError("Saved search was not found")
    brand = get_brand_or_404(session, saved.brand_id)
    _assert_owner(user, brand.user_id)

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(saved, key, value)
    saved.updated_at = datetime.now(UTC)
    session.add(saved)
    session.commit()
    session.refresh(saved)
    return saved


def delete_saved_search(session: Session, user: User, saved_search_id: str) -> None:
    saved = session.get(SavedSearch, saved_search_id)
    if saved is None:
        raise NotFoundError("Saved search was not found")
    brand = get_brand_or_404(session, saved.brand_id)
    _assert_owner(user, brand.user_id)
    session.delete(saved)
    session.commit()


def _assert_owner(user: User, brand_owner_user_id: str) -> None:
    if user.id != brand_owner_user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to manage this saved search")
