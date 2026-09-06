from datetime import UTC, datetime

from sqlmodel import Session

from app.core.exceptions import AuthorizationError, ConflictError, NotFoundError
from app.models.campaign import Campaign, CampaignCreator, CampaignDeliverable
from app.models.enums import CampaignCreatorStatus, UserRole
from app.models.user import User
from app.repositories import campaigns as campaigns_repo
from app.schemas.campaign import (
    CampaignCreate,
    CampaignDeliverableCreate,
    CampaignDeliverableUpdate,
    CampaignInviteRequest,
    CampaignUpdate,
)
from app.services.brand_service import get_profile_or_404 as get_brand_or_404
from app.services.creator_service import get_profile_or_404 as get_creator_or_404
from app.services.notification_service import notify


def create_campaign(session: Session, user: User, brand_id: str, payload: CampaignCreate) -> Campaign:
    brand = get_brand_or_404(session, brand_id)
    _assert_brand_owner(user, brand.user_id)
    campaign = Campaign(brand_id=brand_id, **payload.model_dump())
    return campaigns_repo.create(session, campaign)


def get_campaign_or_404(session: Session, campaign_id: str) -> Campaign:
    campaign = campaigns_repo.get_by_id(session, campaign_id)
    if campaign is None:
        raise NotFoundError("Campaign was not found")
    return campaign


def update_campaign(session: Session, user: User, campaign_id: str, payload: CampaignUpdate) -> Campaign:
    campaign = get_campaign_or_404(session, campaign_id)
    brand = get_brand_or_404(session, campaign.brand_id)
    _assert_brand_owner(user, brand.user_id)

    fields = payload.model_dump(exclude_unset=True)
    fields["updated_at"] = datetime.now(UTC)
    return campaigns_repo.update(session, campaign, fields)


def invite_creator(
    session: Session, user: User, campaign_id: str, payload: CampaignInviteRequest
) -> CampaignCreator:
    campaign = get_campaign_or_404(session, campaign_id)
    brand = get_brand_or_404(session, campaign.brand_id)
    _assert_brand_owner(user, brand.user_id)
    creator = get_creator_or_404(session, payload.creator_id)

    if campaigns_repo.get_participant(session, campaign_id, creator.id):
        raise ConflictError("This creator has already been invited to the campaign")

    participant = CampaignCreator(
        campaign_id=campaign_id,
        creator_id=creator.id,
        agreed_price=payload.agreed_price,
        currency=payload.currency,
    )
    result = campaigns_repo.add_participant(session, participant)

    notify(
        session,
        user_id=creator.user_id,
        type_="CAMPAIGN",
        title="New campaign invitation",
        body=f"You've been invited to join the campaign '{campaign.name}'",
        data={"campaign_id": campaign_id},
    )
    return result


def accept_invitation(session: Session, user: User, campaign_id: str) -> CampaignCreator:
    creator = get_creator_or_404_by_user(session, user)
    participant = campaigns_repo.get_participant(session, campaign_id, creator.id)
    if participant is None:
        raise NotFoundError("You have not been invited to this campaign")

    participant.status = CampaignCreatorStatus.ACCEPTED
    participant.accepted_at = datetime.now(UTC)
    session.add(participant)
    session.commit()
    session.refresh(participant)
    return participant


def add_deliverable(
    session: Session, user: User, campaign_id: str, payload: CampaignDeliverableCreate
) -> CampaignDeliverable:
    campaign = get_campaign_or_404(session, campaign_id)
    brand = get_brand_or_404(session, campaign.brand_id)
    _assert_brand_owner(user, brand.user_id)

    deliverable = CampaignDeliverable(campaign_id=campaign_id, **payload.model_dump())
    return campaigns_repo.add_deliverable(session, deliverable)


def update_deliverable(
    session: Session, user: User, deliverable_id: str, payload: CampaignDeliverableUpdate
) -> CampaignDeliverable:
    deliverable = campaigns_repo.get_deliverable(session, deliverable_id)
    if deliverable is None:
        raise NotFoundError("Deliverable was not found")

    campaign = get_campaign_or_404(session, deliverable.campaign_id)
    brand = get_brand_or_404(session, campaign.brand_id)
    creator = get_creator_or_404(session, deliverable.creator_id)

    is_brand_owner = user.id == brand.user_id
    is_creator_owner = user.id == creator.user_id
    if not (is_brand_owner or is_creator_owner or user.role == UserRole.ADMIN):
        raise AuthorizationError("You do not have permission to update this deliverable")

    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(deliverable, key, value)
    deliverable.updated_at = datetime.now(UTC)
    session.add(deliverable)
    session.commit()
    session.refresh(deliverable)
    return deliverable


def list_campaigns_for_brand(
    session: Session, brand_id: str, *, page: int, page_size: int
) -> tuple[list[Campaign], int]:
    return campaigns_repo.list_for_brand(session, brand_id, offset=(page - 1) * page_size, limit=page_size)


def list_campaigns_for_creator(
    session: Session, creator_id: str, *, page: int, page_size: int
) -> tuple[list[Campaign], int]:
    return campaigns_repo.list_for_creator(
        session, creator_id, offset=(page - 1) * page_size, limit=page_size
    )


def get_creator_or_404_by_user(session: Session, user: User):
    from app.repositories import creators as creators_repo

    profile = creators_repo.get_by_user_id(session, user.id)
    if profile is None:
        raise NotFoundError("No creator profile found for this account")
    return profile


def _assert_brand_owner(user: User, brand_owner_user_id: str) -> None:
    if user.id != brand_owner_user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to manage this campaign")
