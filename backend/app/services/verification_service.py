from datetime import UTC, datetime

from sqlmodel import Session, select

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.enums import AuditAction, UserRole, VerificationStatus
from app.models.user import User
from app.models.verification import VerificationRecord
from app.schemas.verification import VerificationCreate, VerificationReviewRequest
from app.services.audit_service import record_audit
from app.services.notification_service import notify


def submit_verification(session: Session, user: User, payload: VerificationCreate) -> VerificationRecord:
    record = VerificationRecord(user_id=user.id, type=payload.type, status=VerificationStatus.PENDING)
    session.add(record)
    session.commit()
    session.refresh(record)
    return record


def list_for_user(session: Session, user: User) -> list[VerificationRecord]:
    return list(session.exec(select(VerificationRecord).where(VerificationRecord.user_id == user.id)).all())


def get_or_404(session: Session, verification_id: str) -> VerificationRecord:
    record = session.get(VerificationRecord, verification_id)
    if record is None:
        raise NotFoundError("Verification record was not found")
    return record


def review_verification(
    session: Session, reviewer: User, verification_id: str, payload: VerificationReviewRequest
) -> VerificationRecord:
    if reviewer.role != UserRole.ADMIN:
        raise AuthorizationError("Only admins can review verification submissions")

    record = get_or_404(session, verification_id)
    record.status = payload.status
    record.reason = payload.reason
    record.reviewed_at = datetime.now(UTC)
    record.reviewed_by = reviewer.id
    session.add(record)
    session.commit()
    session.refresh(record)

    record_audit(
        session,
        actor_user_id=reviewer.id,
        action=AuditAction.VERIFICATION_CHANGED,
        entity_type="verification_record",
        entity_id=record.id,
        metadata={"status": payload.status.value},
    )
    notify(
        session,
        user_id=record.user_id,
        type_="VERIFICATION",
        title="Verification status updated",
        body=f"Your {record.type.value.lower()} verification is now {record.status.value.lower()}",
        data={"verification_id": record.id},
    )
    return record
