from sqlmodel import Session, select

from app.models.analytics import ContentMetric, MetricSnapshot
from app.models.social import SocialAccount


def get_by_id(session: Session, social_account_id: str) -> SocialAccount | None:
    return session.get(SocialAccount, social_account_id)


def list_for_user(session: Session, user_id: str) -> list[SocialAccount]:
    return list(session.exec(select(SocialAccount).where(SocialAccount.user_id == user_id)).all())


def create(session: Session, account: SocialAccount) -> SocialAccount:
    session.add(account)
    session.commit()
    session.refresh(account)
    return account


def update(session: Session, account: SocialAccount, fields: dict) -> SocialAccount:
    for key, value in fields.items():
        setattr(account, key, value)
    session.add(account)
    session.commit()
    session.refresh(account)
    return account


def delete(session: Session, account: SocialAccount) -> None:
    session.delete(account)
    session.commit()


def latest_snapshot(session: Session, social_account_id: str) -> MetricSnapshot | None:
    return session.exec(
        select(MetricSnapshot)
        .where(MetricSnapshot.social_account_id == social_account_id)
        .order_by(MetricSnapshot.captured_at.desc())
    ).first()


def add_snapshot(session: Session, snapshot: MetricSnapshot) -> MetricSnapshot:
    session.add(snapshot)
    session.commit()
    session.refresh(snapshot)
    return snapshot


def list_content(session: Session, social_account_id: str, *, limit: int = 10) -> list[ContentMetric]:
    return list(
        session.exec(
            select(ContentMetric)
            .where(ContentMetric.social_account_id == social_account_id)
            .order_by(ContentMetric.published_at.desc())
            .limit(limit)
        ).all()
    )
