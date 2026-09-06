import re

from sqlmodel import Session

from app.core.exceptions import AuthorizationError, BrandNotFoundError
from app.models.brand import BrandProfile
from app.models.enums import UserRole
from app.models.user import User
from app.repositories import brands as brands_repo
from app.schemas.brand import BrandProfileCreate, BrandProfileUpdate


def _slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "brand"


def create_profile(session: Session, user: User, payload: BrandProfileCreate) -> BrandProfile:
    existing = brands_repo.get_by_user_id(session, user.id)
    if existing:
        raise AuthorizationError("A brand profile already exists for this account")

    slug_base = _slugify(payload.company_name)
    slug = slug_base
    suffix = 1
    while brands_repo.get_by_slug(session, slug):
        suffix += 1
        slug = f"{slug_base}-{suffix}"

    profile = BrandProfile(user_id=user.id, company_slug=slug, **payload.model_dump())
    return brands_repo.create(session, profile)


def get_profile_or_404(session: Session, brand_id: str) -> BrandProfile:
    profile = brands_repo.get_by_id(session, brand_id)
    if profile is None:
        raise BrandNotFoundError()
    return profile


def update_profile(session: Session, user: User, brand_id: str, payload: BrandProfileUpdate) -> BrandProfile:
    profile = get_profile_or_404(session, brand_id)
    if user.id != profile.user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to modify this brand")
    fields = payload.model_dump(exclude_unset=True)
    return brands_repo.update(session, profile, fields)


def list_brands(session: Session, *, page: int, page_size: int) -> tuple[list[BrandProfile], int]:
    return brands_repo.list_all(session, offset=(page - 1) * page_size, limit=page_size)
