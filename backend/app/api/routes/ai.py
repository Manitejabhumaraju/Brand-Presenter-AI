from fastapi import APIRouter, Depends
from sqlmodel import Session
from sse_starlette.sse import EventSourceResponse

from app.core.dependencies import get_current_user, get_session
from app.core.rate_limit import rate_limit
from app.models.user import User
from app.schemas.ai import (
    AICampaignBriefRequest,
    AICampaignBriefResponse,
    AIChatRequest,
    AIChatResponse,
    AIMatchRequest,
    AIMatchResponse,
    AISearchRequest,
    AISearchResponse,
)
from app.services import ai_service

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post(
    "/search",
    response_model=AISearchResponse,
    summary="Natural language creator search - interprets the query into structured filters",
    dependencies=[Depends(rate_limit("ai_search", limit=20, window_seconds=60))],
)
def ai_search(payload: AISearchRequest, session: Session = Depends(get_session)) -> AISearchResponse:
    return ai_service.natural_language_search(session, payload.query)


@router.post(
    "/match-creators",
    response_model=AIMatchResponse,
    summary="Score and explain how well candidate creators fit a campaign brief",
    dependencies=[Depends(rate_limit("ai_match", limit=20, window_seconds=60))],
)
def ai_match_creators(payload: AIMatchRequest, session: Session = Depends(get_session)) -> AIMatchResponse:
    return ai_service.match_creators(session, payload)


@router.post(
    "/campaign-brief",
    response_model=AICampaignBriefResponse,
    summary="Generate a draft campaign brief and suggested discovery filters",
)
def ai_campaign_brief(payload: AICampaignBriefRequest) -> AICampaignBriefResponse:
    return ai_service.generate_campaign_brief(payload)


@router.post(
    "/chat",
    response_model=AIChatResponse,
    summary="Non-streaming AI assistant chat turn",
    dependencies=[Depends(rate_limit("ai_chat", limit=30, window_seconds=60))],
)
def ai_chat(
    payload: AIChatRequest, session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> AIChatResponse:
    return ai_service.chat(session, user, payload.session_id, payload.message)


@router.post(
    "/chat/stream",
    summary="Streaming AI assistant chat turn (Server-Sent Events)",
    dependencies=[Depends(rate_limit("ai_chat_stream", limit=30, window_seconds=60))],
)
def ai_chat_stream(
    payload: AIChatRequest, session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> EventSourceResponse:
    def event_generator():
        for event in ai_service.chat_stream(session, user, payload.session_id, payload.message):
            yield {"event": event["event"], "data": _to_json(event["data"])}

    return EventSourceResponse(event_generator())


def _to_json(data: dict) -> str:
    import json

    return json.dumps(data, default=str)
