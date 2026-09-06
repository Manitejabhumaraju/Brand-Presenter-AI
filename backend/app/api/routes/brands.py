from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.brand import BrandProfile
from app.models.user import User
from app.schemas.brand import BrandProfileCreate, BrandProfileRead, BrandProfileUpdate
from app.schemas.common import Page
from app.services import brand_service

router = APIRouter(prefix="/brands", tags=["brands"])


@router.get("", response_model=Page[BrandProfileRead], summary="List brands")
def list_brands(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    session: Session = Depends(get_session),
) -> Page[BrandProfile]:
    items, total = brand_service.list_brands(session, page=page, page_size=page_size)
    return Page.create(items, page=page, page_size=page_size, total=total)


@router.post(
    "", response_model=BrandProfileRead, status_code=201, summary="Create the current user's brand profile"
)
def create_brand(
    payload: BrandProfileCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> BrandProfile:
    return brand_service.create_profile(session, user, payload)


@router.get("/{brand_id}", response_model=BrandProfileRead, summary="Get a brand profile")
def get_brand(brand_id: str, session: Session = Depends(get_session)) -> BrandProfile:
    return brand_service.get_profile_or_404(session, brand_id)


@router.patch("/{brand_id}", response_model=BrandProfileRead, summary="Update a brand profile")
def update_brand(
    brand_id: str,
    payload: BrandProfileUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> BrandProfile:
    return brand_service.update_profile(session, user, brand_id, payload)
