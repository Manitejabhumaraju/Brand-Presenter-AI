"""Shared enums used across models, schemas, and services."""

from enum import Enum


class UserRole(str, Enum):
    CREATOR = "CREATOR"
    INFLUENCER = "INFLUENCER"
    FREELANCER = "FREELANCER"
    CREATOR_MANAGER = "CREATOR_MANAGER"
    AGENCY = "AGENCY"
    BRAND = "BRAND"
    BRAND_MEMBER = "BRAND_MEMBER"
    ADMIN = "ADMIN"


class UserStatus(str, Enum):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    PENDING = "PENDING"
    DEACTIVATED = "DEACTIVATED"


class CreatorType(str, Enum):
    INFLUENCER = "INFLUENCER"
    CONTENT_CREATOR = "CONTENT_CREATOR"
    UGC_CREATOR = "UGC_CREATOR"
    FREELANCER = "FREELANCER"
    CREATOR_FREELANCER = "CREATOR_FREELANCER"
    OTHER = "OTHER"


class VerificationStatus(str, Enum):
    NOT_STARTED = "NOT_STARTED"
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    NEEDS_ATTENTION = "NEEDS_ATTENTION"


class Platform(str, Enum):
    INSTAGRAM = "instagram"
    YOUTUBE = "youtube"
    TIKTOK = "tiktok"
    FACEBOOK = "facebook"
    LINKEDIN = "linkedin"
    X = "x"
    PINTEREST = "pinterest"
    TWITCH = "twitch"
    SNAPCHAT = "snapchat"
    THREADS = "threads"


class SyncStatus(str, Enum):
    NEVER_SYNCED = "NEVER_SYNCED"
    SYNCING = "SYNCING"
    SYNCED = "SYNCED"
    FAILED = "FAILED"


class FreshnessStatus(str, Enum):
    FRESH = "FRESH"
    RECENT = "RECENT"
    STALE = "STALE"
    VERY_STALE = "VERY_STALE"
    UNKNOWN = "UNKNOWN"


class ContentType(str, Enum):
    POST = "POST"
    REEL = "REEL"
    SHORT = "SHORT"
    VIDEO = "VIDEO"
    STORY = "STORY"
    LIVE = "LIVE"
    ARTICLE = "ARTICLE"
    THREAD = "THREAD"
    OTHER = "OTHER"


class PricingModel(str, Enum):
    FIXED = "FIXED"
    RANGE = "RANGE"
    STARTING_FROM = "STARTING_FROM"
    NEGOTIABLE = "NEGOTIABLE"


class PricingVisibility(str, Enum):
    PUBLIC = "PUBLIC"
    VERIFIED_BRANDS = "VERIFIED_BRANDS"
    PRIVATE = "PRIVATE"


class ContactVisibility(str, Enum):
    MESSAGE_ONLY = "message_only"
    EMAIL_FOR_VERIFIED_BRANDS = "email_for_verified_brands"
    PHONE_FOR_VERIFIED_BRANDS = "phone_for_verified_brands"
    EMAIL_AND_PHONE = "email_and_phone"
    PRIVATE = "private"


class CampaignStatus(str, Enum):
    DRAFT = "DRAFT"
    INVITED = "INVITED"
    NEGOTIATING = "NEGOTIATING"
    ACCEPTED = "ACCEPTED"
    IN_PROGRESS = "IN_PROGRESS"
    CONTENT_SUBMITTED = "CONTENT_SUBMITTED"
    REVIEW = "REVIEW"
    APPROVED = "APPROVED"
    PUBLISHED = "PUBLISHED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    DISPUTED = "DISPUTED"


class CampaignCreatorStatus(str, Enum):
    INVITED = "INVITED"
    NEGOTIATING = "NEGOTIATING"
    ACCEPTED = "ACCEPTED"
    DECLINED = "DECLINED"
    COMPLETED = "COMPLETED"


class DeliverableStatus(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    SUBMITTED = "SUBMITTED"
    CHANGES_REQUESTED = "CHANGES_REQUESTED"
    APPROVED = "APPROVED"
    PUBLISHED = "PUBLISHED"
    COMPLETED = "COMPLETED"


class UsageType(str, Enum):
    ORGANIC = "ORGANIC"
    PAID = "PAID"
    WHITELISTING = "WHITELISTING"
    SPARK_ADS = "SPARK_ADS"
    EXCLUSIVITY = "EXCLUSIVITY"


class MessageType(str, Enum):
    TEXT = "TEXT"
    SYSTEM = "SYSTEM"
    CAMPAIGN = "CAMPAIGN"
    PROPOSAL = "PROPOSAL"
    FILE = "FILE"
    AI_ASSISTED = "AI_ASSISTED"


class NotificationType(str, Enum):
    MESSAGE = "MESSAGE"
    CAMPAIGN = "CAMPAIGN"
    PROFILE_VIEW = "PROFILE_VIEW"
    OPPORTUNITY = "OPPORTUNITY"
    VERIFICATION = "VERIFICATION"
    SOCIAL_SYNC = "SOCIAL_SYNC"
    SAVED_SEARCH = "SAVED_SEARCH"
    SYSTEM = "SYSTEM"


class VerificationType(str, Enum):
    EMAIL = "EMAIL"
    PHONE = "PHONE"
    IDENTITY = "IDENTITY"
    SOCIAL_OWNERSHIP = "SOCIAL_OWNERSHIP"
    BUSINESS = "BUSINESS"
    PROFESSIONAL = "PROFESSIONAL"


class ChatRole(str, Enum):
    USER = "USER"
    ASSISTANT = "ASSISTANT"
    SYSTEM = "SYSTEM"


class AuditAction(str, Enum):
    PRICING_ACCESSED = "PRICING_ACCESSED"
    CONTACT_ACCESSED = "CONTACT_ACCESSED"
    VERIFICATION_CHANGED = "VERIFICATION_CHANGED"
    CAMPAIGN_CHANGED = "CAMPAIGN_CHANGED"
    ACCOUNT_DISCONNECTED = "ACCOUNT_DISCONNECTED"
    ADMIN_ACTION = "ADMIN_ACTION"
    LOGIN = "LOGIN"
    LOGOUT = "LOGOUT"
