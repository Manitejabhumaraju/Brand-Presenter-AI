export type UserRole = 'brand' | 'creator' | 'admin' | 'public';

export type PlatformType = 
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'linkedin'
  | 'twitter'
  | 'pinterest'
  | 'twitch'
  | 'snapchat'
  | 'threads';

export type PlatformSyncStatus = 
  | 'connected'
  | 'syncing'
  | 'needs_reauth'
  | 'disconnected'
  | 'limited_data'
  | 'unsupported'
  | 'error';

export interface PlatformAccount {
  id: string;
  platform: PlatformType;
  username: string;
  profileUrl: string;
  accountType: 'Creator' | 'Business' | 'Personal' | 'Partner';
  followers: number;
  subscribers?: number;
  engagementRate: number; // e.g., 4.8 for 4.8%
  avgViews: number;
  avgReach: number;
  impressions?: number;
  contentCount: number;
  verifiedOnPlatform: boolean;
  syncStatus: PlatformSyncStatus;
  lastSynced: string;
  syncFreshness: 'updated_hours_ago' | 'updated_today' | 'stale' | 'unavailable';
  topContentFormat: string;
}

export interface AIScoreBreakdown {
  overall: number; // 0-100
  audienceQuality: number;
  engagementQuality: number;
  contentQuality: number;
  reliability: number;
  brandFit: number;
  commercialValue: number;
  summary: string;
  reasons: string[];
}

export interface DemographicDistribution {
  label: string;
  percentage: number;
}

export interface AudienceInsights {
  primaryGender: string;
  genderDistribution: DemographicDistribution[];
  ageDistribution: DemographicDistribution[];
  topCountries: { country: string; percentage: number }[];
  topCities: { city: string; percentage: number }[];
  languages: string[];
  topInterests: string[];
  audienceQualityScore: number; // 0-100
  suspiciousFollowerPercent: number;
  growth30d: number; // e.g. +4.2%
}

export interface PricingPackage {
  id: string;
  deliverableName: string;
  platform: PlatformType;
  priceMin: number; // in INR ₹
  priceMax: number;
  turnaroundDays: number;
  typicalRevisions: number;
  negotiable: boolean;
  description: string;
  benchmarkMin: number;
  benchmarkMax: number;
  benchmarkStatus: 'below_market' | 'within_market' | 'premium';
}

export interface PortfolioProject {
  id: string;
  brandName: string;
  brandLogo?: string;
  campaignName: string;
  category: string;
  platforms: PlatformType[];
  contentFormat: string;
  campaignObjective: string;
  creatorRole: string;
  contentUrl: string;
  publishedDate: string;
  reach: number;
  views: number;
  engagementRate: number;
  leads?: number;
  conversions?: number;
  roi?: string;
  creatorCommentary: string;
  verifiedByBrand: boolean;
}

export interface ClientReview {
  id: string;
  brandName: string;
  brandContact: string;
  rating: number; // 1-5
  date: string;
  campaignName: string;
  comment: string;
  verifiedClient: boolean;
}

export type CreatorType = 
  | 'Influencer' 
  | 'Content Creator' 
  | 'Freelancer' 
  | 'Creator + Freelancer' 
  | 'Agency Represented'
  | 'UGC Creator'
  | 'Educator'
  | 'Podcaster'
  | 'Freelance Creative'
  | 'Consultant';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage?: string;
  creatorType: CreatorType;
  location: {
    city: string;
    state?: string;
    country: string;
  };
  languages: string[];
  categories: string[];
  niches: string[];
  bio: string;
  freelanceServices?: string[];
  availabilityStatus: 'Available Now' | 'Limited Availability' | 'Booking Next Month' | 'Unavailable';
  responseTime: string;
  profileCompletion: number; // 0-100
  identityVerified: boolean;
  professionalVerified: boolean;
  platforms: PlatformAccount[];
  aiScore: AIScoreBreakdown;
  audience: AudienceInsights;
  pricing: PricingPackage[];
  portfolio: PortfolioProject[];
  reviews: ClientReview[];
  stats: {
    totalFollowers: number;
    avgEngagementRate: number;
    avgMonthlyReach: number;
    completedCampaigns: number;
    brandsWorkedWith: number;
    repeatClientRate: number;
    onTimeDeliveryRate: number;
  };
  contactSettings: {
    visibility: 'marketplace_only' | 'email_verified_brands' | 'phone_verified_brands' | 'request_only';
    publicEmail?: string;
    phone?: string;
  };
}

export interface Deliverable {
  id: string;
  campaignId: string;
  creatorId?: string;
  creatorName?: string;
  payoutAmount?: number;
  title: string;
  platform: PlatformType;
  format: string;
  dueDate: string;
  status: 'draft' | 'pending_submission' | 'in_review' | 'changes_requested' | 'approved' | 'published';
  creatorNotes?: string;
  brandFeedback?: string;
  mediaUrl?: string;
}

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  objective: string;
  status: 'draft' | 'invited' | 'negotiating' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  totalBudget: number; // ₹
  spentBudget: number;
  startDate: string;
  endDate: string;
  targetPlatforms: PlatformType[];
  targetCategories: string[];
  creatorIds: string[];
  deliverables: Deliverable[];
  usageRights: {
    organicUsage: boolean;
    paidWhitelisting: boolean;
    durationMonths: number;
    territory: string;
    exclusivityDays: number;
  };
  results?: {
    totalReach: number;
    totalViews: number;
    totalEngagements: number;
    totalClicks: number;
    conversions: number;
    calculatedRoi: string;
  };
}

export interface Shortlist {
  id: string;
  name: string;
  category: string;
  targetBudget: number;
  creatorIds: string[];
  notes: string;
  createdAt: string;
  status: 'researching' | 'contacted' | 'negotiating' | 'finalized';
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: {
    categories?: string[];
    platforms?: PlatformType[];
    minFollowers?: number;
    maxFollowers?: number;
    maxBudget?: number;
    location?: string;
  };
  matchCount: number;
  lastUpdated: string;
  notifyOnNewMatches: boolean;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'brand' | 'creator';
  text: string;
  timestamp: string;
  attachment?: {
    type: 'brief' | 'proposal' | 'contract' | 'media';
    title: string;
    budget?: number;
    deliverables?: string[];
  };
}

export interface Conversation {
  id: string;
  creatorId: string;
  brandId: string;
  brandName: string;
  creatorName: string;
  creatorHandle: string;
  campaignTitle?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  status: 'inquiry' | 'negotiating' | 'contracted' | 'archived';
  messages: MessageItem[];
}

export interface PlatformHealth {
  platform: PlatformType;
  status: 'operational' | 'degraded' | 'rate_limited' | 'maintenance';
  apiHealth: number; // percentage e.g. 99.8
  syncSuccessRate: number;
  failedAccountsCount: number;
  rateLimitStatus: string;
  lastIncident: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress: string;
}

export interface ModerationReport {
  id: string;
  reportedEntityName: string;
  reportedEntityType: 'creator' | 'brand';
  reason: 'Fake profile' | 'Metric anomaly' | 'Spam' | 'Copyright' | 'Fraud' | 'Inappropriate content';
  reporterName: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'pending' | 'in_review' | 'resolved' | 'dismissed';
  evidenceSummary: string;
  timestamp: string;
}
