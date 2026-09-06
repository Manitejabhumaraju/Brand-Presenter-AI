from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.core.exceptions import AppError
from app.models.campaign import Campaign, CampaignCreator, CampaignDeliverable
from app.models.enums import UserRole
from app.models.user import User
from app.repositories import brands as brands_repo
from app.repositories import campaigns as campaigns_repo
from app.repositories import creators as creators_repo
from app.schemas.campaign import (
    CampaignCreate,
    CampaignCreatorRead,
    CampaignDeliverableCreate,
    CampaignDeliverableRead,
    CampaignDeliverableUpdate,
    CampaignInviteRequest,
    CampaignRead,
    CampaignUpdate,
)
from app.schemas.common import Page
from app.services import campaign_service

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get(
    "", response_model=Page[CampaignRead], summary="List campaigns for the current user (brand or creator)"
)
def list_campaigns(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Page[Campaign]:
    if user.role == UserRole.BRAND:
        brand = brands_repo.get_by_user_id(session, user.id)
        if brand is None:
            return Page.create([], page=page, page_size=page_size, total=0)
        items, total = campaign_service.list_campaigns_for_brand(
            session, brand.id, page=page, page_size=page_size
        )
    else:
        creator = creators_repo.get_by_user_id(session, user.id)
        if creator is None:
            return Page.create([], page=page, page_size=page_size, total=0)
        items, total = campaign_service.list_campaigns_for_creator(
            session, creator.id, page=page, page_size=page_size
        )
    return Page.create(items, page=page, page_size=page_size, total=total)


@router.post("", response_model=CampaignRead, status_code=201, summary="Create a campaign")
def create_campaign(
    payload: CampaignCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Campaign:
    brand = brands_repo.get_by_user_id(session, user.id)
    if brand is None:
        raise AppError("Only brand accounts can create campaigns", details={"role": user.role.value})
    return campaign_service.create_campaign(session, user, brand.id, payload)


@router.get("/{campaign_id}", response_model=CampaignRead, summary="Get a campaign")
def get_campaign(campaign_id: str, session: Session = Depends(get_session)) -> Campaign:
    return campaign_service.get_campaign_or_404(session, campaign_id)


@router.patch("/{campaign_id}", response_model=CampaignRead, summary="Update a campaign")
def update_campaign(
    campaign_id: str,
    payload: CampaignUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Campaign:
    from app.models.enums import AuditAction
    from app.services.audit_service import record_audit

    result = campaign_service.update_campaign(session, user, campaign_id, payload)
    record_audit(
        session,
        actor_user_id=user.id,
        action=AuditAction.CAMPAIGN_CHANGED,
        entity_type="campaign",
        entity_id=campaign_id,
    )
    return result


@router.post(
    "/{campaign_id}/invite",
    response_model=CampaignCreatorRead,
    status_code=201,
    summary="Invite a creator to a campaign",
)
def invite_creator(
    campaign_id: str,
    payload: CampaignInviteRequest,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CampaignCreator:
    return campaign_service.invite_creator(session, user, campaign_id, payload)


@router.post(
    "/{campaign_id}/accept",
    response_model=CampaignCreatorRead,
    summary="Accept a campaign invitation as a creator",
)
def accept_invitation(
    campaign_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CampaignCreator:
    return campaign_service.accept_invitation(session, user, campaign_id)


@router.get(
    "/{campaign_id}/participants",
    response_model=list[CampaignCreatorRead],
    summary="List campaign participants",
)
def list_participants(campaign_id: str, session: Session = Depends(get_session)) -> list[CampaignCreator]:
    return campaigns_repo.list_participants(session, campaign_id)


@router.post(
    "/{campaign_id}/deliverables",
    response_model=CampaignDeliverableRead,
    status_code=201,
    summary="Add a deliverable to a campaign",
)
def add_deliverable(
    campaign_id: str,
    payload: CampaignDeliverableCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CampaignDeliverable:
    return campaign_service.add_deliverable(session, user, campaign_id, payload)


@router.get(
    "/{campaign_id}/deliverables",
    response_model=list[CampaignDeliverableRead],
    summary="List a campaign's deliverables",
)
def list_deliverables(
    campaign_id: str, session: Session = Depends(get_session)
) -> list[CampaignDeliverable]:
    return campaigns_repo.list_deliverables(session, campaign_id)


@router.patch(
    "/deliverables/{deliverable_id}",
    response_model=CampaignDeliverableRead,
    summary="Update a deliverable (status, submitted content, etc.)",
)
def update_deliverable(
    deliverable_id: str,
    payload: CampaignDeliverableUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> CampaignDeliverable:
    return campaign_service.update_deliverable(session, user, deliverable_id, payload)
