from sqlmodel import Session, select

from app.core.exceptions import AuthorizationError, NotFoundError
from app.models.enums import UserRole
from app.models.freelancer import FreelancerProfile
from app.models.user import User
from app.schemas.freelancer import FreelancerProfileCreate


def get_by_user_id(session: Session, user_id: str) -> FreelancerProfile | None:
    return session.exec(select(FreelancerProfile).where(FreelancerProfile.user_id == user_id)).first()


def create_profile(session: Session, user: User, payload: FreelancerProfileCreate) -> FreelancerProfile:
    if get_by_user_id(session, user.id):
        raise AuthorizationError("A freelancer profile already exists for this account")
    profile = FreelancerProfile(user_id=user.id, **payload.model_dump())
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


def get_or_404(session: Session, freelancer_id: str) -> FreelancerProfile:
    profile = session.get(FreelancerProfile, freelancer_id)
    if profile is None:
        raise NotFoundError("Freelancer profile was not found")
    return profile


def update_profile(session: Session, user: User, freelancer_id: str, fields: dict) -> FreelancerProfile:
    profile = get_or_404(session, freelancer_id)
    if user.id != profile.user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to modify this profile")
    for key, value in fields.items():
        setattr(profile, key, value)
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile
