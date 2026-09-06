from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.user import User
from app.models.verification import VerificationRecord
from app.schemas.verification import VerificationCreate, VerificationRead
from app.services import verification_service

router = APIRouter(prefix="/verification", tags=["verification"])


@router.get(
    "", response_model=list[VerificationRead], summary="List the current user's verification submissions"
)
def list_verification(
    session: Session = Depends(get_session), user: User = Depends(get_current_user)
) -> list[VerificationRecord]:
    return verification_service.list_for_user(session, user)


@router.post("", response_model=VerificationRead, status_code=201, summary="Submit a verification request")
def submit_verification(
    payload: VerificationCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> VerificationRecord:
    return verification_service.submit_verification(session, user, payload)


@router.get("/{verification_id}", response_model=VerificationRead, summary="Get a verification submission")
def get_verification(verification_id: str, session: Session = Depends(get_session)) -> VerificationRecord:
    return verification_service.get_or_404(session, verification_id)
