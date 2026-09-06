from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.enums import ContentType, CreatorType, Platform, VerificationStatus
from app.models.user import User
from app.schemas.common import Page
from app.schemas.creator import (
    CreatorContactRead,
    CreatorProfileCreate,
    CreatorProfileDetail,
    CreatorProfileUpdate,
)
from app.schemas.search import CreatorSearchFilters
from app.services import creator_service, search_service

router = APIRouter(prefix="/creators", tags=["creators"])


@router.get("", response_model=Page[CreatorProfileDetail], summary="Discover / search creators")
def list_creators(
    query: str | None = None,
    platform: Platform | None = None,
    category: str | None = None,
    niche: str | None = None,
    country: str | None = None,
    city: str | None = None,
    min_followers: int | None = None,
    max_followers: int | None = None,
    min_engagement: float | None = None,
    max_price: float | None = None,
    creator_type: CreatorType | None = None,
    verification: VerificationStatus | None = None,
    availability: bool | None = None,
    content_type: ContentType | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    session: Session = Depends(get_session),
) -> Page[CreatorProfileDetail]:
    filters = CreatorSearchFilters(
        query=query,
        platform=platform,
        category=category,
        niche=niche,
        country=country,
        city=city,
        min_followers=min_followers,
        max_followers=max_followers,
        min_engagement=min_engagement,
        max_price=max_price,
        creator_type=creator_type,
        verification=verification,
        availability=availability,
        content_type=content_type,
        page=page,
        page_size=page_size,
    )
    return search_service.search_creators(session, filters)


@router.post(
    "",
    response_model=CreatorProfileDetail,
    status_code=201,
    summary="Create the current user's creator profile",
)
def create_creator(
    payload: CreatorProfileCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CreatorProfileDetail:
    profile = creator_service.create_profile(session, user, payload)
    return creator_service.get_profile_detail(session, profile.id)


@router.get("/{creator_id}", response_model=CreatorProfileDetail, summary="Get a creator's public profile")
def get_creator(creator_id: str, session: Session = Depends(get_session)) -> CreatorProfileDetail:
    return creator_service.get_profile_detail(session, creator_id)


@router.patch("/{creator_id}", response_model=CreatorProfileDetail, summary="Update a creator profile")
def update_creator(
    creator_id: str,
    payload: CreatorProfileUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CreatorProfileDetail:
    creator_service.update_profile(session, user, creator_id, payload)
    return creator_service.get_profile_detail(session, creator_id)


@router.delete("/{creator_id}", status_code=204, summary="Delete a creator profile")
def delete_creator(
    creator_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> None:
    creator_service.delete_profile(session, user, creator_id)


@router.get(
    "/{creator_id}/contact",
    response_model=CreatorContactRead,
    summary="Get a creator's contact details, subject to their visibility preferences",
)
def get_contact(
    creator_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CreatorContactRead:
    return creator_service.get_contact_info(session, user, creator_id)
