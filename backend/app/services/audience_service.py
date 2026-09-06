from sqlmodel import Session, select

from app.core.exceptions import NotFoundError
from app.models.audience import (
    AudienceAge,
    AudienceCity,
    AudienceCountry,
    AudienceGender,
    AudienceInterest,
    AudienceLanguage,
    AudienceSnapshot,
)
from app.repositories import social as social_repo
from app.schemas.audience import AudienceInsightsRead, AudienceSplitItem


def get_audience_insights(session: Session, social_account_id: str) -> AudienceInsightsRead:
    account = social_repo.get_by_id(session, social_account_id)
    if account is None:
        raise NotFoundError("Social account was not found")

    snapshot = session.exec(
        select(AudienceSnapshot)
        .where(AudienceSnapshot.social_account_id == social_account_id)
        .order_by(AudienceSnapshot.captured_at.desc())
    ).first()

    empty = AudienceInsightsRead(
        social_account_id=social_account_id,
        platform=account.platform.value,
        captured_at=None,
        countries=[],
        cities=[],
        ages=[],
        genders=[],
        languages=[],
        interests=[],
    )
    if snapshot is None:
        return empty

    def load(model: type, label_field: str) -> list[AudienceSplitItem]:
        rows: list = session.exec(select(model).where(model.snapshot_id == snapshot.id)).all()
        return [
            AudienceSplitItem(label=getattr(r, label_field), percentage=r.percentage, confidence=r.confidence)
            for r in rows
        ]

    return AudienceInsightsRead(
        social_account_id=social_account_id,
        platform=account.platform.value,
        captured_at=snapshot.captured_at,
        countries=load(AudienceCountry, "country"),
        cities=load(AudienceCity, "city"),
        ages=load(AudienceAge, "age_range"),
        genders=load(AudienceGender, "gender"),
        languages=load(AudienceLanguage, "language"),
        interests=load(AudienceInterest, "interest"),
    )
