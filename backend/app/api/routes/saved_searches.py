from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.core.exceptions import AppError
from app.models.saved_search import SavedSearch
from app.models.user import User
from app.repositories import brands as brands_repo
from app.schemas.saved_search import SavedSearchCreate, SavedSearchRead, SavedSearchUpdate
from app.services import saved_search_service

router = APIRouter(prefix="/saved-searches", tags=["saved-searches"])


def _brand_id_for(session: Session, user: User) -> str:
    brand = brands_repo.get_by_user_id(session, user.id)
    if brand is None:
        raise AppError("Only brand accounts have saved searches", details={"role": user.role.value})
    return brand.id


@router.get("", response_model=list[SavedSearchRead], summary="List the current brand's saved searches")
def list_saved_searches(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> list[SavedSearch]:
    return saved_search_service.list_saved_searches(session, _brand_id_for(session, user))


@router.post("", response_model=SavedSearchRead, status_code=201, summary="Save a discovery filter set")
def create_saved_search(
    payload: SavedSearchCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> SavedSearch:
    return saved_search_service.create_saved_search(session, user, _brand_id_for(session, user), payload)


@router.patch("/{saved_search_id}", response_model=SavedSearchRead, summary="Update a saved search")
def update_saved_search(
    saved_search_id: str,
    payload: SavedSearchUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> SavedSearch:
    return saved_search_service.update_saved_search(session, user, saved_search_id, payload)


@router.delete("/{saved_search_id}", status_code=204, summary="Delete a saved search")
def delete_saved_search(
    saved_search_id: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> None:
    saved_search_service.delete_saved_search(session, user, saved_search_id)
