from collections import defaultdict
from datetime import UTC, datetime

from sqlmodel import Session, select

from app.models.profile_view import ProfileView
from app.models.user import User
from app.schemas.profile_view import ProfileViewStats
from app.services.creator_service import get_profile_or_404


def record_view(session: Session, creator_id: str, viewer: User | None, source: str | None) -> ProfileView:
    profile = get_profile_or_404(session, creator_id)
    # Creators viewing their own profile don't count as a "view".
    if viewer and viewer.id == profile.user_id:
        return ProfileView(viewer_user_id=viewer.id, creator_id=creator_id, source=source)

    view = ProfileView(
        viewer_user_id=viewer.id if viewer else None,
        creator_id=creator_id,
        source=source,
    )
    session.add(view)
    session.commit()
    session.refresh(view)
    return view


def get_stats(session: Session, creator_id: str) -> ProfileViewStats:
    views = list(session.exec(select(ProfileView).where(ProfileView.creator_id == creator_id)).all())
    unique_viewers = {v.viewer_user_id for v in views if v.viewer_user_id}

    by_day: dict[str, int] = defaultdict(int)
    by_week: dict[str, int] = defaultdict(int)
    by_month: dict[str, int] = defaultdict(int)
    last_viewed_at: datetime | None = None

    for v in views:
        viewed = v.viewed_at
        if viewed.tzinfo is None:
            viewed = viewed.replace(tzinfo=UTC)
        by_day[viewed.strftime("%Y-%m-%d")] += 1
        by_week[viewed.strftime("%Y-W%W")] += 1
        by_month[viewed.strftime("%Y-%m")] += 1
        if last_viewed_at is None or viewed > last_viewed_at:
            last_viewed_at = viewed

    return ProfileViewStats(
        total_views=len(views),
        unique_viewers=len(unique_viewers),
        views_by_day=dict(by_day),
        views_by_week=dict(by_week),
        views_by_month=dict(by_month),
        last_viewed_at=last_viewed_at,
    )
