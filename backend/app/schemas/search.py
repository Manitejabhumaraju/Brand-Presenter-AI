from pydantic import BaseModel, Field

from app.models.enums import ContentType, CreatorType, Platform, VerificationStatus


class CreatorSearchFilters(BaseModel):
    query: str | None = None
    platform: Platform | None = None
    category: str | None = None
    niche: str | None = None
    country: str | None = None
    city: str | None = None
    min_followers: int | None = None
    max_followers: int | None = None
    min_engagement: float | None = None
    max_price: float | None = None
    creator_type: CreatorType | None = None
    verification: VerificationStatus | None = None
    availability: bool | None = None
    content_type: ContentType | None = None

    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=20, ge=1, le=100)


class SearchRequest(BaseModel):
    query: str


class NaturalLanguageSearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=2000)
