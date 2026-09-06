from datetime import UTC, datetime
from statistics import median

from sqlmodel import Session, select

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.enums import PricingVisibility, UserRole
from app.models.pricing import CreatorPricing
from app.models.user import User
from app.schemas.pricing import (
    CreatorPricingCreate,
    CreatorPricingUpdate,
    PricingBenchmarkRead,
    PricingBenchmarkRequest,
)
from app.services.creator_service import get_profile_or_404


def create_pricing(
    session: Session, user: User, creator_id: str, payload: CreatorPricingCreate
) -> CreatorPricing:
    profile = get_profile_or_404(session, creator_id)
    _assert_owns_or_admin(user, profile.user_id)

    pricing = CreatorPricing(creator_id=creator_id, **payload.model_dump())
    session.add(pricing)
    session.commit()
    session.refresh(pricing)
    return pricing


def list_pricing_for_viewer(session: Session, viewer: User | None, creator_id: str) -> list[CreatorPricing]:
    """Pricing permissions are enforced server-side - never rely on the frontend to hide rows."""
    profile = get_profile_or_404(session, creator_id)
    rows = session.exec(select(CreatorPricing).where(CreatorPricing.creator_id == creator_id)).all()

    is_owner = viewer is not None and viewer.id == profile.user_id
    is_admin = viewer is not None and viewer.role == UserRole.ADMIN
    is_verified_brand = viewer is not None and viewer.role == UserRole.BRAND and viewer.is_verified

    if is_owner or is_admin:
        return list(rows)

    visible = []
    for row in rows:
        is_public = row.visibility == PricingVisibility.PUBLIC
        is_visible_to_verified_brand = (
            row.visibility == PricingVisibility.VERIFIED_BRANDS and is_verified_brand
        )
        if is_public or is_visible_to_verified_brand:
            visible.append(row)
        # PRIVATE is never returned to anyone but the owner/admin.
    return visible


def update_pricing(
    session: Session, user: User, pricing_id: str, payload: CreatorPricingUpdate
) -> CreatorPricing:
    pricing = session.get(CreatorPricing, pricing_id)
    if pricing is None:
        raise NotFoundError("Pricing entry was not found")
    profile = get_profile_or_404(session, pricing.creator_id)
    _assert_owns_or_admin(user, profile.user_id)

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(pricing, key, value)
    pricing.updated_at = datetime.now(UTC)
    session.add(pricing)
    session.commit()
    session.refresh(pricing)
    return pricing


def delete_pricing(session: Session, user: User, pricing_id: str) -> None:
    pricing = session.get(CreatorPricing, pricing_id)
    if pricing is None:
        raise NotFoundError("Pricing entry was not found")
    profile = get_profile_or_404(session, pricing.creator_id)
    _assert_owns_or_admin(user, profile.user_id)
    session.delete(pricing)
    session.commit()


def _assert_owns_or_admin(user: User, owner_user_id: str) -> None:
    if user.id != owner_user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to manage this pricing entry")


def compute_benchmark(session: Session, request: PricingBenchmarkRequest) -> PricingBenchmarkRead:
    """Anonymized market benchmark - never exposes any individual creator's private pricing."""
    stmt = select(CreatorPricing).where(CreatorPricing.visibility != PricingVisibility.PRIVATE)
    if request.platform:
        stmt = stmt.where(CreatorPricing.platform == request.platform)
    if request.content_type:
        stmt = stmt.where(CreatorPricing.content_type == request.content_type)

    rows = session.exec(stmt).all()
    prices = [r.min_price for r in rows if r.min_price is not None]

    if not prices:
        return PricingBenchmarkRead(
            market_min=None,
            market_median=None,
            market_max=None,
            currency="INR",
            sample_size=0,
            benchmark_updated_at=datetime.now(UTC),
        )

    return PricingBenchmarkRead(
        market_min=min(prices),
        market_median=median(prices),
        market_max=max(prices),
        currency=rows[0].currency,
        sample_size=len(prices),
        benchmark_updated_at=datetime.now(UTC),
    )
