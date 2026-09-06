from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.core.exceptions import NotFoundError
from app.models.user import User
from app.repositories import users as users_repo
from app.schemas.user import UserRead

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/{user_id}", response_model=UserRead, summary="Get a public user profile by id")
def get_user(
    user_id: str,
    session: Session = Depends(get_session),
    _: User = Depends(get_current_user),
) -> User:
    user = users_repo.get_by_id(session, user_id)
    if user is None:
        raise NotFoundError("User was not found")
    return user
