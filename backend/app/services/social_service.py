from datetime import UTC, datetime

from sqlmodel import Session

from app.core.exceptions import AppError, AuthorizationError, NotFoundError
from app.core.security import encrypt_secret
from app.integrations.social.base import PlatformCapabilities, SocialPlatformAdapter
from app.integrations.social.facebook import FacebookAdapter
from app.integrations.social.instagram import InstagramAdapter
from app.integrations.social.linkedin import LinkedinAdapter
from app.integrations.social.pinterest import PinterestAdapter
from app.integrations.social.tiktok import TiktokAdapter
from app.integrations.social.twitch import TwitchAdapter
from app.integrations.social.twitter import TwitterAdapter
from app.integrations.social.youtube import YoutubeAdapter
from app.models.analytics import ContentMetric, MetricSnapshot
from app.models.audience import (
    AudienceAge,
    AudienceCity,
    AudienceCountry,
    AudienceGender,
    AudienceInterest,
    AudienceLanguage,
    AudienceSnapshot,
)
from app.models.enums import ContentType, Platform, SyncStatus
from app.models.social import SocialAccount
from app.models.user import User
from app.repositories import social as social_repo
from app.schemas.social import SocialAccountConnect

_ADAPTERS: dict[Platform, type[SocialPlatformAdapter]] = {
    Platform.INSTAGRAM: InstagramAdapter,
    Platform.YOUTUBE: YoutubeAdapter,
    Platform.TIKTOK: TiktokAdapter,
    Platform.FACEBOOK: FacebookAdapter,
    Platform.LINKEDIN: LinkedinAdapter,
    Platform.X: TwitterAdapter,
    Platform.PINTEREST: PinterestAdapter,
    Platform.TWITCH: TwitchAdapter,
}


def get_adapter(platform: Platform) -> SocialPlatformAdapter:
    adapter_cls = _ADAPTERS.get(platform)
    if adapter_cls is None:
        raise AppError(
            f"Platform '{platform.value}' does not have an integration yet",
            details={"platform": platform.value},
        )
    return adapter_cls()


def list_platform_capabilities() -> list[PlatformCapabilities]:
    return [adapter_cls().capabilities for adapter_cls in _ADAPTERS.values()]


def connect_account(session: Session, user: User, payload: SocialAccountConnect) -> SocialAccount:
    adapter = get_adapter(payload.platform)
    result = adapter.connect(username=payload.username)

    account = SocialAccount(
        user_id=user.id,
        platform=payload.platform,
        username=payload.username,
        profile_url=payload.profile_url or result.get("profile_url"),
        account_type=result.get("account_type"),
        platform_user_id=result.get("platform_user_id"),
        is_connected=True,
        access_token_encrypted=encrypt_secret("mock-access-token"),
        refresh_token_encrypted=encrypt_secret("mock-refresh-token"),
        sync_status=SyncStatus.NEVER_SYNCED,
    )
    return social_repo.create(session, account)


def _assert_owner(user: User, account: SocialAccount) -> None:
    if account.user_id != user.id and user.role.value != "ADMIN":
        raise AuthorizationError("You do not have permission to manage this social account")


def disconnect_account(session: Session, user: User, social_account_id: str) -> None:
    account = social_repo.get_by_id(session, social_account_id)
    if account is None:
        raise NotFoundError("Social account was not found")
    _assert_owner(user, account)
    social_repo.delete(session, account)


def sync_account(session: Session, user: User, social_account_id: str) -> SocialAccount:
    account = social_repo.get_by_id(session, social_account_id)
    if account is None:
        raise NotFoundError("Social account was not found")
    _assert_owner(user, account)

    try:
        adapter = get_adapter(account.platform)
        metrics = adapter.get_metrics(username=account.username)
        content_items = adapter.get_content(username=account.username, limit=10)
        audience = adapter.get_audience(username=account.username)

        snapshot = MetricSnapshot(social_account_id=account.id, **metrics)
        social_repo.add_snapshot(session, snapshot)

        for item in content_items:
            session.add(
                ContentMetric(
                    social_account_id=account.id,
                    content_type=ContentType(item["content_type"]),
                    **{k: v for k, v in item.items() if k != "content_type"},
                )
            )

        audience_snapshot = AudienceSnapshot(social_account_id=account.id)
        session.add(audience_snapshot)
        session.flush()

        _persist_audience_split(
            session, audience_snapshot.id, AudienceCountry, "country", audience["countries"]
        )
        _persist_audience_split(session, audience_snapshot.id, AudienceCity, "city", audience["cities"])
        _persist_audience_split(session, audience_snapshot.id, AudienceAge, "age_range", audience["ages"])
        _persist_audience_split(session, audience_snapshot.id, AudienceGender, "gender", audience["genders"])
        _persist_audience_split(
            session, audience_snapshot.id, AudienceLanguage, "language", audience["languages"]
        )
        _persist_audience_split(
            session, audience_snapshot.id, AudienceInterest, "interest", audience["interests"]
        )

        account.sync_status = SyncStatus.SYNCED
        account.sync_error = None
        account.last_synced_at = datetime.now(UTC)
        account.is_verified = True
        session.add(account)
        session.commit()
        session.refresh(account)
        return account
    except Exception as exc:  # noqa: BLE001 - a sync failure is a normal, reportable outcome
        session.rollback()
        account.sync_status = SyncStatus.FAILED
        account.sync_error = str(exc)
        session.add(account)
        session.commit()
        session.refresh(account)
        return account


def _persist_audience_split(
    session: Session, snapshot_id: str, model: type, field: str, items: list[dict]
) -> None:
    for item in items:
        session.add(
            model(snapshot_id=snapshot_id, **{field: item["label"], "percentage": item["percentage"]})
        )
