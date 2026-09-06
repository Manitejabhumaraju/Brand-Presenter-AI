"""Import every SQLModel model so Alembic autogenerate and SQLModel.metadata see them all."""

from app.models.analytics import ContentMetric, MetricSnapshot  # noqa: F401
from app.models.audience import (  # noqa: F401
    AudienceAge,
    AudienceCity,
    AudienceCountry,
    AudienceGender,
    AudienceInterest,
    AudienceLanguage,
    AudienceSnapshot,
)
from app.models.audit import AuditLog  # noqa: F401
from app.models.brand import BrandProfile  # noqa: F401
from app.models.campaign import (  # noqa: F401
    Campaign,
    CampaignCreator,
    CampaignDeliverable,
    CampaignUsageRights,
)
from app.models.chat import ChatMessage, ChatSession  # noqa: F401
from app.models.creator import BrandPresenterScore, CreatorProfile  # noqa: F401
from app.models.freelancer import FreelancerProfile  # noqa: F401
from app.models.messaging import Conversation, ConversationParticipant, Message  # noqa: F401
from app.models.notification import Notification  # noqa: F401
from app.models.portfolio import PortfolioItem  # noqa: F401
from app.models.pricing import CreatorPricing  # noqa: F401
from app.models.profile_view import ProfileView  # noqa: F401
from app.models.saved_search import SavedSearch  # noqa: F401
from app.models.shortlist import Shortlist, ShortlistItem  # noqa: F401
from app.models.social import SocialAccount  # noqa: F401
from app.models.user import RefreshToken, User  # noqa: F401
from app.models.verification import VerificationRecord  # noqa: F401
