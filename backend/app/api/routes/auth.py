from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.core.rate_limit import rate_limit
from app.models.user import User
from app.schemas.auth import LoginRequest, LogoutRequest, RefreshRequest, RegisterRequest, TokenResponse
from app.schemas.common import MessageResponse
from app.schemas.user import UserRead
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=201,
    summary="Register a new creator, influencer, freelancer, or brand account",
    dependencies=[Depends(rate_limit("register", limit=10, window_seconds=60))],
)
def register(payload: RegisterRequest, session: Session = Depends(get_session)) -> TokenResponse:
    return auth_service.register_user(session, payload)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Exchange email/password for an access + refresh token pair",
    dependencies=[Depends(rate_limit("login", limit=10, window_seconds=60))],
)
def login(payload: LoginRequest, session: Session = Depends(get_session)) -> TokenResponse:
    return auth_service.login(session, payload)


@router.post("/refresh", response_model=TokenResponse, summary="Rotate an access token using a refresh token")
def refresh(payload: RefreshRequest, session: Session = Depends(get_session)) -> TokenResponse:
    return auth_service.refresh_access_token(session, payload.refresh_token)


@router.post("/logout", response_model=MessageResponse, summary="Revoke a refresh token")
def logout(payload: LogoutRequest, session: Session = Depends(get_session)) -> MessageResponse:
    auth_service.logout(session, payload.refresh_token)
    return MessageResponse(message="Logged out")


@router.get("/me", response_model=UserRead, summary="Get the current authenticated user")
def me(user: User = Depends(get_current_user)) -> User:
    return user
