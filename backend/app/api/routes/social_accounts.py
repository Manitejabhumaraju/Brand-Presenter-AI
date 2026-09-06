from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.social import SocialAccount
from app.models.user import User
from app.repositories import social as social_repo
from app.schemas.social import PlatformCapability, SocialAccountConnect, SocialAccountRead, SyncResult
from app.services import social_service

router = APIRouter(tags=["social"])


@router.get(
    "/social-platforms",
    response_model=list[PlatformCapability],
    summary="List supported platforms and their capabilities",
)
def list_platforms() -> list[PlatformCapability]:
    return [
        PlatformCapability(
            platform=c.platform,
            supports_followers=c.supports_followers,
            supports_reach=c.supports_reach,
            supports_impressions=c.supports_impressions,
            supports_story_views=c.supports_story_views,
            supports_watch_time=c.supports_watch_time,
            supports_audience_gender=c.supports_audience_gender,
            supports_audience_age=c.supports_audience_age,
            supports_audience_country=c.supports_audience_country,
        )
        for c in social_service.list_platform_capabilities()
    ]


@router.get(
    "/social-accounts",
    response_model=list[SocialAccountRead],
    summary="List the current user's connected social accounts",
)
def list_accounts(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> list[SocialAccount]:
    return social_repo.list_for_user(session, user.id)


@router.post(
    "/social-accounts",
    response_model=SocialAccountRead,
    status_code=201,
    summary="Connect a social account (mock connection flow - no real OAuth is implemented)",
)
def connect_account(
    payload: SocialAccountConnect,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> SocialAccount:
    return social_service.connect_account(session, user, payload)


@router.post(
    "/social-accounts/{social_account_id}/sync",
    response_model=SyncResult,
    summary="Trigger a (mock) metrics sync",
)
def sync_account(
    social_account_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> SyncResult:
    # NotFoundError/AuthorizationError raise normally (404/403); a downstream sync failure is
    # instead reported as a normal SyncResult with status=FAILED - see social_service.sync_account.
    account = social_service.sync_account(session, user, social_account_id)
    message = (
        "Sync completed" if account.sync_status.value == "SYNCED" else (account.sync_error or "Sync failed")
    )
    return SyncResult(status=account.sync_status.value, social_account_id=account.id, message=message)


@router.delete("/social-accounts/{social_account_id}", status_code=204, summary="Disconnect a social account")
def disconnect_account(
    social_account_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> None:
    from app.models.enums import AuditAction
    from app.services.audit_service import record_audit

    social_service.disconnect_account(session, user, social_account_id)
    record_audit(
        session,
        actor_user_id=user.id,
        action=AuditAction.ACCOUNT_DISCONNECTED,
        entity_type="social_account",
        entity_id=social_account_id,
    )
