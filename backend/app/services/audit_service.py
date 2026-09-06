from sqlmodel import Session, func, select

from app.models.audit import AuditLog
from app.models.enums import AuditAction


def record_audit(
    session: Session,
    *,
    actor_user_id: str | None,
    action: AuditAction,
    entity_type: str,
    entity_id: str,
    metadata: dict | None = None,
) -> AuditLog:
    entry = AuditLog(
        actor_user_id=actor_user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        metadata_json=metadata or {},
    )
    session.add(entry)
    session.commit()
    session.refresh(entry)
    return entry


def list_audit_logs(session: Session, *, offset: int = 0, limit: int = 50) -> tuple[list[AuditLog], int]:
    total = session.exec(select(func.count()).select_from(AuditLog)).one()
    items = session.exec(
        select(AuditLog).order_by(AuditLog.created_at.desc()).offset(offset).limit(limit)
    ).all()
    return list(items), total
