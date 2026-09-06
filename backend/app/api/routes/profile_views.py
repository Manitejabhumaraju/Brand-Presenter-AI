from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_optional_user, get_session
from app.core.exceptions import NotFoundError
from app.core.rate_limit import rate_limit
from app.models.user import User
from app.repositories import creators as creators_repo
from app.schemas.profile_view import ProfileViewStats
from app.services import profile_view_service

router = APIRouter(prefix="/creators", tags=["profile-views"])


@router.get(
    "/me/profile-views",
    response_model=ProfileViewStats,
    summary="Get profile view statistics for the current user's creator profile",
)
def my_profile_views(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> ProfileViewStats:
    profile = creators_repo.get_by_user_id(session, user.id)
    if profile is None:
        raise NotFoundError("No creator profile found for this account")
    return profile_view_service.get_stats(session, profile.id)


@router.post(
    "/{creator_id}/view",
    status_code=204,
    summary="Record a profile view",
    dependencies=[Depends(rate_limit("profile_view", limit=60, window_seconds=60))],
)
def record_view(
    creator_id: str,
    session: Session = Depends(get_session),
    viewer: User | None = Depends(get_optional_user),
) -> None:
    profile_view_service.record_view(session, creator_id, viewer, source="api")
