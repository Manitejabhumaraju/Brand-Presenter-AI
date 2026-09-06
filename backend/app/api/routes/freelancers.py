from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.freelancer import FreelancerProfile
from app.models.user import User
from app.schemas.freelancer import FreelancerProfileCreate, FreelancerProfileRead
from app.services import freelancer_service

router = APIRouter(prefix="/freelancers", tags=["freelancers"])


@router.post(
    "",
    response_model=FreelancerProfileRead,
    status_code=201,
    summary="Create the current user's freelancer profile",
)
def create_freelancer(
    payload: FreelancerProfileCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> FreelancerProfile:
    return freelancer_service.create_profile(session, user, payload)


@router.get("/{freelancer_id}", response_model=FreelancerProfileRead, summary="Get a freelancer profile")
def get_freelancer(freelancer_id: str, session: Session = Depends(get_session)) -> FreelancerProfile:
    return freelancer_service.get_or_404(session, freelancer_id)
