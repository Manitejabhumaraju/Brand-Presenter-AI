from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_session
from app.schemas.audience import AudienceInsightsRead
from app.services import analytics_service, audience_service

router = APIRouter(prefix="/creators", tags=["audience"])


@router.get(
    "/{creator_id}/audience",
    response_model=list[AudienceInsightsRead],
    summary="Get audience demographic insights for each of a creator's connected platforms",
)
def get_audience(creator_id: str, session: Session = Depends(get_session)) -> list[AudienceInsightsRead]:
    accounts = analytics_service.get_creator_platforms(session, creator_id)
    return [audience_service.get_audience_insights(session, a.id) for a in accounts]
