from datetime import UTC, datetime

from sqlmodel import Session

from app.core.config import get_settings
from app.models.enums import FreshnessStatus
from app.models.social import SocialAccount
from app.repositories import social as social_repo
from app.schemas.analytics import ContentMetricRead, CreatorAnalyticsRead, MetricSnapshotRead
from app.services.creator_service import get_profile_or_404


def compute_freshness(captured_at: datetime | None) -> FreshnessStatus:
    if captured_at is None:
        return FreshnessStatus.UNKNOWN
    settings = get_settings()
    if captured_at.tzinfo is None:
        captured_at = captured_at.replace(tzinfo=UTC)
    age_hours = (datetime.now(UTC) - captured_at).total_seconds() / 3600

    if age_hours < settings.freshness_fresh_hours:
        return FreshnessStatus.FRESH
    if age_hours < settings.freshness_recent_hours:
        return FreshnessStatus.RECENT
    if age_hours < settings.freshness_stale_hours:
        return FreshnessStatus.STALE
    return FreshnessStatus.VERY_STALE


def get_creator_analytics(session: Session, creator_id: str) -> CreatorAnalyticsRead:
    profile = get_profile_or_404(session, creator_id)
    accounts = social_repo.list_for_user(session, profile.user_id)

    platform_reads: list[MetricSnapshotRead] = []
    top_content: list[ContentMetricRead] = []

    for account in accounts:
        snapshot = social_repo.latest_snapshot(session, account.id)
        if snapshot:
            platform_reads.append(
                MetricSnapshotRead(
                    platform=account.platform,
                    freshness=compute_freshness(snapshot.captured_at),
                    **snapshot.model_dump(exclude={"id", "social_account_id"}),
                )
            )
        content = social_repo.list_content(session, account.id, limit=5)
        top_content.extend(ContentMetricRead.model_validate(c) for c in content)

    top_content.sort(key=lambda c: c.views or 0, reverse=True)
    return CreatorAnalyticsRead(creator_id=creator_id, platforms=platform_reads, top_content=top_content[:10])


def get_creator_platforms(session: Session, creator_id: str) -> list[SocialAccount]:
    profile = get_profile_or_404(session, creator_id)
    return social_repo.list_for_user(session, profile.user_id)
