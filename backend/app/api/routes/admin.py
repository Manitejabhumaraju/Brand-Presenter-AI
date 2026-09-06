from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select

from app.core.dependencies import get_session, require_admin
from app.models.audit import AuditLog
from app.models.user import User
from app.models.verification import VerificationRecord
from app.repositories import users as users_repo
from app.schemas.admin import AuditLogRead, SystemHealthRead
from app.schemas.common import Page
from app.schemas.user import UserRead
from app.schemas.verification import VerificationRead, VerificationReviewRequest
from app.services import verification_service
from app.services.audit_service import list_audit_logs
from app.services.social_service import list_platform_capabilities

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/users", response_model=Page[UserRead], summary="List all users (admin only)")
def list_users(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    session: Session = Depends(get_session),
    _: User = Depends(require_admin),
) -> Page[User]:
    items, total = users_repo.list_all(session, offset=(page - 1) * page_size, limit=page_size)
    return Page.create(items, page=page, page_size=page_size, total=total)


@router.get(
    "/verification",
    response_model=list[VerificationRead],
    summary="List pending verification submissions (admin only)",
)
def list_verification(
    session: Session = Depends(get_session), _: User = Depends(require_admin)
) -> list[VerificationRecord]:
    from app.models.enums import VerificationStatus

    return list(
        session.exec(
            select(VerificationRecord).where(VerificationRecord.status == VerificationStatus.PENDING)
        ).all()
    )


@router.patch(
    "/verification/{verification_id}",
    response_model=VerificationRead,
    summary="Review a verification submission (admin only)",
)
def review_verification(
    verification_id: str,
    payload: VerificationReviewRequest,
    session: Session = Depends(get_session),
    admin: User = Depends(require_admin),
) -> VerificationRecord:
    return verification_service.review_verification(session, admin, verification_id, payload)


@router.get("/audit-logs", response_model=Page[AuditLogRead], summary="List audit log entries (admin only)")
def audit_logs(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=100),
    session: Session = Depends(get_session),
    _: User = Depends(require_admin),
) -> Page[AuditLog]:
    items, total = list_audit_logs(session, offset=(page - 1) * page_size, limit=page_size)
    return Page.create(items, page=page, page_size=page_size, total=total)


@router.get(
    "/system-health", response_model=SystemHealthRead, summary="Platform health snapshot (admin only)"
)
def system_health(
    session: Session = Depends(get_session), _: User = Depends(require_admin)
) -> SystemHealthRead:
    from app.models.enums import SyncStatus
    from app.models.social import SocialAccount

    failed_syncs = session.exec(
        select(SocialAccount).where(SocialAccount.sync_status == SyncStatus.FAILED)
    ).all()
    total_users = session.exec(select(User)).all()
    return SystemHealthRead(
        total_users=len(total_users),
        supported_platforms=len(list_platform_capabilities()),
        social_accounts_with_failed_sync=len(failed_syncs),
    )
