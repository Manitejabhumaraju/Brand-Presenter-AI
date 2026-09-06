from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import VerificationStatus, VerificationType


class VerificationCreate(BaseModel):
    type: VerificationType


class VerificationReviewRequest(BaseModel):
    status: VerificationStatus
    reason: str | None = None


class VerificationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    user_id: str
    type: VerificationType
    status: VerificationStatus
    submitted_at: datetime
    reviewed_at: datetime | None
    reason: str | None
