"""The Brand Presenter Score: a proprietary composite score, not an official platform metric.

Computed entirely from data already stored for a creator (metric snapshots, content metrics,
verification status, pricing). Never fabricated, never described to users as coming from a
social platform.
"""

from datetime import UTC, datetime
from statistics import mean

from sqlmodel import Session, select

from app.models.creator import BrandPresenterScore, CreatorProfile
from app.models.enums import VerificationStatus
from app.repositories import social as social_repo

METHODOLOGY_VERSION = "1.0"


def _clamp(value: float, lo: int = 0, hi: int = 100) -> int:
    return max(lo, min(hi, round(value)))


def calculate_score(session: Session, creator: CreatorProfile) -> BrandPresenterScore:
    accounts = social_repo.list_for_user(session, creator.user_id)

    engagement_rates: list[float] = []
    follower_counts: list[int] = []
    content_engagement: list[float] = []

    for account in accounts:
        snapshot = social_repo.latest_snapshot(session, account.id)
        if snapshot:
            if snapshot.engagement_rate is not None:
                engagement_rates.append(snapshot.engagement_rate)
            if snapshot.followers is not None:
                follower_counts.append(snapshot.followers)
        for content in social_repo.list_content(session, account.id, limit=10):
            if content.engagement_rate is not None:
                content_engagement.append(content.engagement_rate)

    audience_quality = _clamp(50 + (sum(follower_counts) / 5_000) if follower_counts else 40)
    engagement_quality = _clamp(mean(engagement_rates) * 10) if engagement_rates else 40
    content_performance = _clamp(mean(content_engagement) * 9) if content_engagement else 40
    consistency = _clamp(60 + min(len(accounts), 4) * 5)
    brand_fit = _clamp(55 + (10 if creator.categories else 0) + (10 if creator.niches else 0))
    professional_reliability = _clamp(
        70
        if creator.verification_status == VerificationStatus.VERIFIED
        else 45
        if creator.verification_status == VerificationStatus.PENDING
        else 35
    )
    commercial_value = _clamp((audience_quality + engagement_quality) / 2)

    overall = _clamp(
        audience_quality * 0.2
        + engagement_quality * 0.25
        + content_performance * 0.15
        + consistency * 0.1
        + brand_fit * 0.1
        + professional_reliability * 0.1
        + commercial_value * 0.1
    )

    existing = session.exec(
        select(BrandPresenterScore).where(BrandPresenterScore.creator_id == creator.id)
    ).first()

    values = {
        "score": overall,
        "audience_quality": audience_quality,
        "engagement_quality": engagement_quality,
        "content_performance": content_performance,
        "consistency": consistency,
        "brand_fit": brand_fit,
        "professional_reliability": professional_reliability,
        "commercial_value": commercial_value,
        "methodology_version": METHODOLOGY_VERSION,
        "calculated_at": datetime.now(UTC),
    }

    if existing:
        for key, value in values.items():
            setattr(existing, key, value)
        session.add(existing)
        session.commit()
        session.refresh(existing)
        return existing

    record = BrandPresenterScore(creator_id=creator.id, **values)
    session.add(record)
    session.commit()
    session.refresh(record)
    return record
