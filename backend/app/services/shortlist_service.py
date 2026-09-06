from sqlmodel import Session, func, select

from app.core.exceptions import AuthorizationError, ConflictError, NotFoundError
from app.models.enums import UserRole
from app.models.shortlist import Shortlist, ShortlistItem
from app.models.user import User
from app.schemas.shortlist import ShortlistCreate, ShortlistItemCreate
from app.services.brand_service import get_profile_or_404 as get_brand_or_404
from app.services.creator_service import get_profile_or_404 as get_creator_or_404


def create_shortlist(session: Session, user: User, brand_id: str, payload: ShortlistCreate) -> Shortlist:
    brand = get_brand_or_404(session, brand_id)
    _assert_owner(user, brand.user_id)
    shortlist = Shortlist(brand_id=brand_id, **payload.model_dump())
    session.add(shortlist)
    session.commit()
    session.refresh(shortlist)
    return shortlist


def list_shortlists(session: Session, brand_id: str) -> list[tuple[Shortlist, int]]:
    shortlists = session.exec(select(Shortlist).where(Shortlist.brand_id == brand_id)).all()
    results = []
    for s in shortlists:
        count = session.exec(
            select(func.count()).select_from(ShortlistItem).where(ShortlistItem.shortlist_id == s.id)
        ).one()
        results.append((s, count))
    return results


def get_shortlist_or_404(session: Session, shortlist_id: str) -> Shortlist:
    shortlist = session.get(Shortlist, shortlist_id)
    if shortlist is None:
        raise NotFoundError("Shortlist was not found")
    return shortlist


def add_creator(
    session: Session, user: User, shortlist_id: str, creator_id: str, payload: ShortlistItemCreate
) -> ShortlistItem:
    shortlist = get_shortlist_or_404(session, shortlist_id)
    brand = get_brand_or_404(session, shortlist.brand_id)
    _assert_owner(user, brand.user_id)
    get_creator_or_404(session, creator_id)

    existing = session.exec(
        select(ShortlistItem).where(
            ShortlistItem.shortlist_id == shortlist_id, ShortlistItem.creator_id == creator_id
        )
    ).first()
    if existing:
        raise ConflictError("Creator is already in this shortlist")

    item = ShortlistItem(shortlist_id=shortlist_id, creator_id=creator_id, notes=payload.notes)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


def remove_creator(session: Session, user: User, shortlist_id: str, creator_id: str) -> None:
    shortlist = get_shortlist_or_404(session, shortlist_id)
    brand = get_brand_or_404(session, shortlist.brand_id)
    _assert_owner(user, brand.user_id)

    item = session.exec(
        select(ShortlistItem).where(
            ShortlistItem.shortlist_id == shortlist_id, ShortlistItem.creator_id == creator_id
        )
    ).first()
    if item is None:
        raise NotFoundError("Creator is not in this shortlist")
    session.delete(item)
    session.commit()


def delete_shortlist(session: Session, user: User, shortlist_id: str) -> None:
    shortlist = get_shortlist_or_404(session, shortlist_id)
    brand = get_brand_or_404(session, shortlist.brand_id)
    _assert_owner(user, brand.user_id)
    for item in session.exec(select(ShortlistItem).where(ShortlistItem.shortlist_id == shortlist_id)).all():
        session.delete(item)
    session.delete(shortlist)
    session.commit()


def _assert_owner(user: User, brand_owner_user_id: str) -> None:
    if user.id != brand_owner_user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to manage this shortlist")
