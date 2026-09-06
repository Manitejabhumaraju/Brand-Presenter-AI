"""Application-level exceptions and the standard error envelope.

Every error response looks like:
{"error": {"code": "...", "message": "...", "details": null, "request_id": "..."}}
"""

from __future__ import annotations


class AppError(Exception):
    status_code: int = 400
    code: str = "APP_ERROR"

    def __init__(self, message: str, *, details: object | None = None) -> None:
        self.message = message
        self.details = details
        super().__init__(message)


class NotFoundError(AppError):
    status_code = 404
    code = "NOT_FOUND"


class ValidationAppError(AppError):
    status_code = 422
    code = "VALIDATION_ERROR"


class AuthenticationError(AppError):
    status_code = 401
    code = "AUTHENTICATION_ERROR"


class AuthorizationError(AppError):
    status_code = 403
    code = "AUTHORIZATION_ERROR"


class ConflictError(AppError):
    status_code = 409
    code = "CONFLICT"


class RateLimitedError(AppError):
    status_code = 429
    code = "RATE_LIMITED"


class CreatorNotFoundError(NotFoundError):
    code = "CREATOR_NOT_FOUND"

    def __init__(self) -> None:
        super().__init__("Creator was not found")


class BrandNotFoundError(NotFoundError):
    code = "BRAND_NOT_FOUND"

    def __init__(self) -> None:
        super().__init__("Brand was not found")
