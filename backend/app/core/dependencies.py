"""Shared FastAPI dependencies: DB session re-export, current user, role guards."""

from collections.abc import Callable

import jwt
from fastapi import Depends, Header
from sqlmodel import Session, select

from app.core.exceptions import AuthenticationError, AuthorizationError
from app.core.security import decode_token
from app.db.session import get_session
from app.models.enums import UserRole
from app.models.user import User

__all__ = ["get_session"]


def get_current_user(
    authorization: str | None = Header(default=None),
    session: Session = Depends(get_session),
) -> User:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise AuthenticationError("Missing or invalid Authorization header")

    token = authorization.split(" ", 1)[1].strip()
    try:
        payload = decode_token(token)
    except jwt.ExpiredSignatureError as exc:
        raise AuthenticationError("Access token has expired") from exc
    except jwt.PyJWTError as exc:
        raise AuthenticationError("Invalid access token") from exc

    if payload.get("type") != "access":
        raise AuthenticationError("Invalid token type")

    user = session.get(User, payload.get("sub"))
    if user is None or not user.is_active:
        raise AuthenticationError("User not found or inactive")
    return user


def get_optional_user(
    authorization: str | None = Header(default=None),
    session: Session = Depends(get_session),
) -> User | None:
    if not authorization:
        return None
    try:
        return get_current_user(authorization=authorization, session=session)
    except AuthenticationError:
        return None


def require_roles(*roles: UserRole) -> Callable[[User], User]:
    def dependency(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise AuthorizationError("You do not have permission to perform this action")
        return user

    return dependency


def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != UserRole.ADMIN:
        raise AuthorizationError("Admin access required")
    return user


def get_creator_profile_id_for_user(session: Session, user: User) -> str | None:
    from app.models.creator import CreatorProfile

    profile = session.exec(select(CreatorProfile).where(CreatorProfile.user_id == user.id)).first()
    return profile.id if profile else None


def get_brand_profile_id_for_user(session: Session, user: User) -> str | None:
    from app.models.brand import BrandProfile

    profile = session.exec(select(BrandProfile).where(BrandProfile.user_id == user.id)).first()
    return profile.id if profile else None
