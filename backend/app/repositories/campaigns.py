from sqlmodel import Session, func, select

from app.models.campaign import Campaign, CampaignCreator, CampaignDeliverable


def get_by_id(session: Session, campaign_id: str) -> Campaign | None:
    return session.get(Campaign, campaign_id)


def create(session: Session, campaign: Campaign) -> Campaign:
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign


def update(session: Session, campaign: Campaign, fields: dict) -> Campaign:
    for key, value in fields.items():
        setattr(campaign, key, value)
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign


def list_for_brand(
    session: Session, brand_id: str, *, offset: int = 0, limit: int = 20
) -> tuple[list[Campaign], int]:
    stmt = select(Campaign).where(Campaign.brand_id == brand_id)
    total = session.exec(select(func.count()).select_from(stmt.subquery())).one()
    items = session.exec(stmt.order_by(Campaign.created_at.desc()).offset(offset).limit(limit)).all()
    return list(items), total


def list_for_creator(
    session: Session, creator_id: str, *, offset: int = 0, limit: int = 20
) -> tuple[list[Campaign], int]:
    stmt = (
        select(Campaign)
        .join(CampaignCreator, CampaignCreator.campaign_id == Campaign.id)
        .where(CampaignCreator.creator_id == creator_id)
    )
    total = session.exec(select(func.count()).select_from(stmt.subquery())).one()
    items = session.exec(stmt.order_by(Campaign.created_at.desc()).offset(offset).limit(limit)).all()
    return list(items), total


def add_participant(session: Session, participant: CampaignCreator) -> CampaignCreator:
    session.add(participant)
    session.commit()
    session.refresh(participant)
    return participant


def get_participant(session: Session, campaign_id: str, creator_id: str) -> CampaignCreator | None:
    return session.exec(
        select(CampaignCreator).where(
            CampaignCreator.campaign_id == campaign_id,
            CampaignCreator.creator_id == creator_id,
        )
    ).first()


def list_participants(session: Session, campaign_id: str) -> list[CampaignCreator]:
    return list(session.exec(select(CampaignCreator).where(CampaignCreator.campaign_id == campaign_id)).all())


def add_deliverable(session: Session, deliverable: CampaignDeliverable) -> CampaignDeliverable:
    session.add(deliverable)
    session.commit()
    session.refresh(deliverable)
    return deliverable


def list_deliverables(session: Session, campaign_id: str) -> list[CampaignDeliverable]:
    return list(
        session.exec(select(CampaignDeliverable).where(CampaignDeliverable.campaign_id == campaign_id)).all()
    )


def get_deliverable(session: Session, deliverable_id: str) -> CampaignDeliverable | None:
    return session.get(CampaignDeliverable, deliverable_id)
