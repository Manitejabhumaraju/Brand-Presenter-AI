from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.core.config import get_settings
from app.db.session import get_session

router = APIRouter(tags=["health"])


@router.get("/health", summary="Liveness check")
def health() -> dict:
    settings = get_settings()
    return {"status": "ok", "service": "brand-presenter-api", "version": settings.api_version}


@router.get("/health/db", summary="Database connectivity check")
def health_db(session: Session = Depends(get_session)) -> dict:
    try:
        session.exec(select(1))
        return {"status": "ok", "database": "reachable"}
    except Exception as exc:  # noqa: BLE001
        return {"status": "error", "database": "unreachable", "detail": str(exc)}


@router.get("/health/ready", summary="Readiness check")
def health_ready(session: Session = Depends(get_session)) -> dict:
    db_status = health_db(session)
    ready = db_status["status"] == "ok"
    return {"status": "ready" if ready else "not_ready", "checks": {"database": db_status["status"]}}
