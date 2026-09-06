from datetime import datetime

from sqlmodel import Field, SQLModel

from app.models.enums import VerificationStatus, VerificationType
from app.utils.datetime import utcnow
from app.utils.ids import new_id


class VerificationRecord(SQLModel, table=True):
    __tablename__ = "verification_records"

    id: str = Field(default_factory=new_id, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    type: VerificationType = Field(index=True)
    status: VerificationStatus = Field(default=VerificationStatus.PENDING, index=True)
    submitted_at: datetime = Field(default_factory=utcnow)
    reviewed_at: datetime | None = None
    reviewed_by: str | None = Field(default=None, foreign_key="users.id")
    reason: str | None = None
