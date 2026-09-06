from sqlmodel import Session, select

from app.core.exceptions import AuthorizationError, CreatorNotFoundError
from app.models.creator import BrandPresenterScore, CreatorProfile
from app.models.enums import AuditAction, ContactVisibility, UserRole
from app.models.user import User
from app.repositories import creators as creators_repo
from app.repositories import social as social_repo
from app.schemas.creator import (
    BrandPresenterScoreRead,
    CreatorContactRead,
    CreatorProfileCreate,
    CreatorProfileDetail,
    CreatorProfileUpdate,
)
from app.services.audit_service import record_audit


def create_profile(session: Session, user: User, payload: CreatorProfileCreate) -> CreatorProfile:
    existing = creators_repo.get_by_user_id(session, user.id)
    if existing:
        raise AuthorizationError("A creator profile already exists for this account")
    profile = CreatorProfile(user_id=user.id, **payload.model_dump())
    return creators_repo.create(session, profile)


def get_profile_or_404(session: Session, creator_id: str) -> CreatorProfile:
    profile = creators_repo.get_by_id(session, creator_id)
    if profile is None:
        raise CreatorNotFoundError()
    return profile


def get_profile_detail(session: Session, creator_id: str) -> CreatorProfileDetail:
    profile = get_profile_or_404(session, creator_id)
    user = session.get(User, profile.user_id)
    score = session.exec(
        select(BrandPresenterScore).where(BrandPresenterScore.creator_id == profile.id)
    ).first()
    accounts = social_repo.list_for_user(session, profile.user_id)

    followers_total = 0
    has_followers = False
    for account in accounts:
        snapshot = social_repo.latest_snapshot(session, account.id)
        if snapshot and snapshot.followers is not None:
            followers_total += snapshot.followers
            has_followers = True

    return CreatorProfileDetail(
        **profile.model_dump(),
        username=user.username if user else "",
        avatar_url=user.avatar_url if user else None,
        brand_presenter_score=BrandPresenterScoreRead.model_validate(score) if score else None,
        followers_total=followers_total if has_followers else None,
        platforms=[a.platform.value for a in accounts],
    )


def update_profile(
    session: Session, user: User, creator_id: str, payload: CreatorProfileUpdate
) -> CreatorProfile:
    profile = get_profile_or_404(session, creator_id)
    _assert_owns_or_admin(user, profile.user_id)
    fields = payload.model_dump(exclude_unset=True)
    return creators_repo.update(session, profile, fields)


def delete_profile(session: Session, user: User, creator_id: str) -> None:
    profile = get_profile_or_404(session, creator_id)
    _assert_owns_or_admin(user, profile.user_id)
    creators_repo.delete(session, profile)


def get_contact_info(session: Session, requester: User, creator_id: str) -> CreatorContactRead:
    """Enforces the creator's contact_visibility preference before exposing email/phone.

    Every access is written to the audit log per the platform's contact-information
    security requirements, regardless of whether access was granted or denied.
    """
    profile = get_profile_or_404(session, creator_id)
    creator_user = session.get(User, profile.user_id)
    if creator_user is None:
        raise CreatorNotFoundError()

    visibility = ContactVisibility(profile.contact_visibility)
    is_owner = requester.id == creator_user.id
    is_admin = requester.role == UserRole.ADMIN
    is_verified_brand = requester.role == UserRole.BRAND and requester.is_verified

    granted_email = False
    granted_phone = False

    grants_full_access = visibility == ContactVisibility.EMAIL_AND_PHONE and is_verified_brand
    if is_owner or is_admin or grants_full_access:
        granted_email = granted_phone = True
    elif visibility == ContactVisibility.EMAIL_FOR_VERIFIED_BRANDS and is_verified_brand:
        granted_email = True
    elif visibility == ContactVisibility.PHONE_FOR_VERIFIED_BRANDS and is_verified_brand:
        granted_phone = True
    # MESSAGE_ONLY and PRIVATE never grant direct contact details.

    record_audit(
        session,
        actor_user_id=requester.id,
        action=AuditAction.CONTACT_ACCESSED,
        entity_type="creator_profile",
        entity_id=creator_id,
        metadata={"granted_email": granted_email, "granted_phone": granted_phone},
    )

    return CreatorContactRead(
        email=creator_user.email if granted_email else None,
        phone=creator_user.phone if granted_phone else None,
        message_only=not (granted_email or granted_phone),
    )


def _assert_owns_or_admin(user: User, owner_user_id: str) -> None:
    if user.id != owner_user_id and user.role != UserRole.ADMIN:
        raise AuthorizationError("You do not have permission to modify this profile")
