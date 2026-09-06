from datetime import datetime

from pydantic import BaseModel, Field

from app.models.enums import ContentType, Platform
from app.schemas.search import CreatorSearchFilters


class AISearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=2000)


class AISearchResponse(BaseModel):
    query: str
    interpreted_filters: CreatorSearchFilters
    summary: str
    result_count: int
    creator_ids: list[str]


class AIMatchRequest(BaseModel):
    brief: str = Field(min_length=1, max_length=4000)
    budget: float | None = None
    platform: Platform | None = None
    category: str | None = None
    country: str | None = None
    content_type: ContentType | None = None
    campaign_id: str | None = None
    candidate_creator_ids: list[str] | None = Field(
        default=None,
        description="Optional explicit candidate pool. Defaults to a filtered discovery search.",
    )
    limit: int = Field(default=10, ge=1, le=50)


class CreatorMatchResult(BaseModel):
    creator_id: str
    display_name: str
    match_score: int
    reasons: list[str]
    matched_constraints: list[str]
    warnings: list[str]


class AIMatchResponse(BaseModel):
    matches: list[CreatorMatchResult]
    prompt_version: str
    provider: str
    created_at: datetime


class AIChatRequest(BaseModel):
    session_id: str | None = None
    message: str = Field(min_length=1, max_length=4000)


class AIChatResponse(BaseModel):
    session_id: str
    reply: str
    structured_result: dict | None = None
    provider: str


class AICampaignBriefRequest(BaseModel):
    goal: str = Field(min_length=1, max_length=2000)
    budget: float | None = None
    platform: Platform | None = None
    category: str | None = None
    country: str | None = None


class AICampaignBriefResponse(BaseModel):
    brief_text: str
    suggested_filters: CreatorSearchFilters
