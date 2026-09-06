from datetime import datetime

from pydantic import BaseModel


class AudienceSplitItem(BaseModel):
    label: str
    percentage: float
    confidence: float | None = None


class AudienceInsightsRead(BaseModel):
    social_account_id: str
    platform: str
    captured_at: datetime | None
    countries: list[AudienceSplitItem]
    cities: list[AudienceSplitItem]
    ages: list[AudienceSplitItem]
    genders: list[AudienceSplitItem]
    languages: list[AudienceSplitItem]
    interests: list[AudienceSplitItem]
