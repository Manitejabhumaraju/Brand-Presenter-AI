from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_optional_user, get_session
from app.models.pricing import CreatorPricing
from app.models.user import User
from app.schemas.pricing import (
    CreatorPricingCreate,
    CreatorPricingRead,
    CreatorPricingUpdate,
    PricingBenchmarkRead,
    PricingBenchmarkRequest,
)
from app.services import pricing_service

router = APIRouter(tags=["pricing"])


@router.get(
    "/creators/{creator_id}/pricing",
    response_model=list[CreatorPricingRead],
    summary="List a creator's pricing (visibility-filtered for the current viewer)",
)
def list_pricing(
    creator_id: str,
    session: Session = Depends(get_session),
    viewer: User | None = Depends(get_optional_user),
) -> list[CreatorPricing]:
    from app.models.enums import AuditAction
    from app.services.audit_service import record_audit

    result = pricing_service.list_pricing_for_viewer(session, viewer, creator_id)
    record_audit(
        session,
        actor_user_id=viewer.id if viewer else None,
        action=AuditAction.PRICING_ACCESSED,
        entity_type="creator_profile",
        entity_id=creator_id,
    )
    return result


@router.post(
    "/creators/{creator_id}/pricing",
    response_model=CreatorPricingRead,
    status_code=201,
    summary="Add a pricing entry to a creator's profile",
)
def create_pricing(
    creator_id: str,
    payload: CreatorPricingCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CreatorPricing:
    return pricing_service.create_pricing(session, user, creator_id, payload)


@router.patch("/pricing/{pricing_id}", response_model=CreatorPricingRead, summary="Update a pricing entry")
def update_pricing(
    pricing_id: str,
    payload: CreatorPricingUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CreatorPricing:
    return pricing_service.update_pricing(session, user, pricing_id, payload)


@router.delete("/pricing/{pricing_id}", status_code=204, summary="Delete a pricing entry")
def delete_pricing(
    pricing_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> None:
    pricing_service.delete_pricing(session, user, pricing_id)


@router.post(
    "/pricing/benchmark",
    response_model=PricingBenchmarkRead,
    summary="Get an anonymized market pricing benchmark (never exposes individual pricing)",
)
def pricing_benchmark(
    payload: PricingBenchmarkRequest, session: Session = Depends(get_session)
) -> PricingBenchmarkRead:
    return pricing_service.compute_benchmark(session, payload)
