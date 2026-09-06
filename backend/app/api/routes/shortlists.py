from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.core.exceptions import AppError
from app.models.shortlist import ShortlistItem
from app.models.user import User
from app.repositories import brands as brands_repo
from app.schemas.shortlist import ShortlistCreate, ShortlistItemCreate, ShortlistItemRead, ShortlistRead
from app.services import shortlist_service

router = APIRouter(prefix="/shortlists", tags=["shortlists"])


def _brand_id_for(session: Session, user: User) -> str:
    brand = brands_repo.get_by_user_id(session, user.id)
    if brand is None:
        raise AppError("Only brand accounts have shortlists", details={"role": user.role.value})
    return brand.id


@router.get("", response_model=list[ShortlistRead], summary="List the current brand's shortlists")
def list_shortlists(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> list[ShortlistRead]:
    brand_id = _brand_id_for(session, user)
    return [
        ShortlistRead(**s.model_dump(), creator_count=count)
        for s, count in shortlist_service.list_shortlists(session, brand_id)
    ]


@router.post("", response_model=ShortlistRead, status_code=201, summary="Create a shortlist")
def create_shortlist(
    payload: ShortlistCreate, session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> ShortlistRead:
    brand_id = _brand_id_for(session, user)
    shortlist = shortlist_service.create_shortlist(session, user, brand_id, payload)
    return ShortlistRead(**shortlist.model_dump(), creator_count=0)


@router.delete("/{shortlist_id}", status_code=204, summary="Delete a shortlist")
def delete_shortlist(
    shortlist_id: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> None:
    shortlist_service.delete_shortlist(session, user, shortlist_id)


@router.post(
    "/{shortlist_id}/creators/{creator_id}",
    response_model=ShortlistItemRead,
    status_code=201,
    summary="Add a creator to a shortlist",
)
def add_creator(
    shortlist_id: str,
    creator_id: str,
    payload: ShortlistItemCreate = ShortlistItemCreate(),
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> ShortlistItem:
    return shortlist_service.add_creator(session, user, shortlist_id, creator_id, payload)


@router.delete(
    "/{shortlist_id}/creators/{creator_id}", status_code=204, summary="Remove a creator from a shortlist"
)
def remove_creator(
    shortlist_id: str,
    creator_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> None:
    shortlist_service.remove_creator(session, user, shortlist_id, creator_id)
