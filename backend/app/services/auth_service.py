from datetime import UTC, datetime

from sqlmodel import Session, select

from app.core.exceptions import AuthenticationError, ConflictError
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.models.enums import UserRole, UserStatus
from app.models.user import RefreshToken, User
from app.repositories import brands as brands_repo
from app.repositories import creators as creators_repo
from app.repositories import users as users_repo
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.schemas.user import UserRead


def register_user(session: Session, payload: RegisterRequest) -> TokenResponse:
    email = payload.email.lower()
    if users_repo.get_by_email(session, email):
        raise ConflictError("An account with this email already exists")
    if users_repo.get_by_username(session, payload.username):
        raise ConflictError("This username is already taken")

    user = User(
        email=email,
        password_hash=hash_password(payload.password),
        full_name=payload.full_name,
        username=payload.username,
        role=payload.role,
        status=UserStatus.ACTIVE,
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    _create_default_profile(session, user)

    return _issue_tokens(session, user)


def _create_default_profile(session: Session, user: User) -> None:
    from app.models.brand import BrandProfile
    from app.models.creator import CreatorProfile
    from app.utils.ids import new_id

    if user.role == UserRole.BRAND:
        slug_base = user.username.lower()
        slug = slug_base
        suffix = 1
        while brands_repo.get_by_slug(session, slug):
            suffix += 1
            slug = f"{slug_base}-{suffix}"
        brands_repo.create(
            session,
            BrandProfile(user_id=user.id, company_name=user.full_name, company_slug=slug),
        )
    elif user.role in (UserRole.CREATOR, UserRole.INFLUENCER, UserRole.FREELANCER):
        creators_repo.create(
            session,
            CreatorProfile(id=new_id(), user_id=user.id, display_name=user.full_name),
        )


def login(session: Session, payload: LoginRequest) -> TokenResponse:
    user = users_repo.get_by_email(session, payload.email.lower())
    if user is None or not verify_password(payload.password, user.password_hash):
        raise AuthenticationError("Invalid email or password")
    if not user.is_active:
        raise AuthenticationError("This account has been deactivated")

    user.last_login_at = datetime.now(UTC)
    session.add(user)
    session.commit()
    session.refresh(user)

    return _issue_tokens(session, user)


def refresh_access_token(session: Session, refresh_token: str) -> TokenResponse:
    try:
        payload = decode_token(refresh_token)
    except Exception as exc:  # noqa: BLE001 - any decode failure is an auth failure
        raise AuthenticationError("Invalid refresh token") from exc

    if payload.get("type") != "refresh":
        raise AuthenticationError("Invalid token type")

    jti = payload.get("jti")
    record = session.exec(select(RefreshToken).where(RefreshToken.jti == jti)).first()
    if record is None or record.revoked_at is not None:
        raise AuthenticationError("Refresh token has been revoked")
    from app.utils.datetime import ensure_aware

    if ensure_aware(record.expires_at) < datetime.now(UTC):
        raise AuthenticationError("Refresh token has expired")

    user = users_repo.get_by_id(session, payload["sub"])
    if user is None or not user.is_active:
        raise AuthenticationError("User not found or inactive")

    # Rotate: revoke the old refresh token and issue a new pair.
    record.revoked_at = datetime.now(UTC)
    session.add(record)
    session.commit()

    return _issue_tokens(session, user)


def logout(session: Session, refresh_token: str) -> None:
    try:
        payload = decode_token(refresh_token)
    except Exception:  # noqa: BLE001 - logout is best-effort
        return
    jti = payload.get("jti")
    record = session.exec(select(RefreshToken).where(RefreshToken.jti == jti)).first()
    if record and record.revoked_at is None:
        record.revoked_at = datetime.now(UTC)
        session.add(record)
        session.commit()


def _issue_tokens(session: Session, user: User) -> TokenResponse:
    access_token = create_access_token(user.id, user.role.value)
    refresh_token, jti, expires_at = create_refresh_token(user.id)

    session.add(RefreshToken(jti=jti, user_id=user.id, expires_at=expires_at))
    session.commit()

    from app.core.config import get_settings

    settings = get_settings()
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.access_token_expire_minutes * 60,
        user=UserRead.model_validate(user),
    )
