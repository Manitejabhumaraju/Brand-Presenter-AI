from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_session
from app.models.social import SocialAccount
from app.schemas.analytics import CreatorAnalyticsRead
from app.schemas.social import SocialAccountRead
from app.services import analytics_service

router = APIRouter(prefix="/creators", tags=["analytics"])


@router.get(
    "/{creator_id}/analytics",
    response_model=CreatorAnalyticsRead,
    summary="Get a creator's cross-platform analytics",
)
def get_analytics(creator_id: str, session: Session = Depends(get_session)) -> CreatorAnalyticsRead:
    return analytics_service.get_creator_analytics(session, creator_id)


@router.get(
    "/{creator_id}/platforms",
    response_model=list[SocialAccountRead],
    summary="List a creator's connected platforms",
)
def get_platforms(creator_id: str, session: Session = Depends(get_session)) -> list[SocialAccount]:
    return analytics_service.get_creator_platforms(session, creator_id)
