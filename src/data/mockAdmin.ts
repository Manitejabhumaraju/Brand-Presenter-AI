import { PlatformHealth, AuditLog, ModerationReport } from '../types';

export const mockPlatformHealth: PlatformHealth[] = [
  {
    platform: 'instagram',
    status: 'operational',
    apiHealth: 99.8,
    syncSuccessRate: 98.4,
    failedAccountsCount: 14,
    rateLimitStatus: '1,240 / 5,000 reqs/hr',
    lastIncident: 'No incidents in last 30 days'
  },
  {
    platform: 'youtube',
    status: 'operational',
    apiHealth: 99.9,
    syncSuccessRate: 99.2,
    failedAccountsCount: 6,
    rateLimitStatus: '4,100 / 10,000 quota units/day',
    lastIncident: 'Minor latency spike 14 days ago (Resolved)'
  },
  {
    platform: 'tiktok',
    status: 'degraded',
    apiHealth: 94.2,
    syncSuccessRate: 91.5,
    failedAccountsCount: 42,
    rateLimitStatus: '890 / 1,000 reqs/hr (Approaching Threshold)',
    lastIncident: 'Webhooks delay detected on region ap-southeast-1'
  },
  {
    platform: 'linkedin',
    status: 'operational',
    apiHealth: 99.4,
    syncSuccessRate: 97.8,
    failedAccountsCount: 11,
    rateLimitStatus: '2,800 / 8,000 reqs/day',
    lastIncident: 'Maintenance scheduled for Sep 12'
  },
  {
    platform: 'twitter',
    status: 'rate_limited',
    apiHealth: 91.0,
    syncSuccessRate: 88.0,
    failedAccountsCount: 38,
    rateLimitStatus: 'Rate limit capped by platform provider',
    lastIncident: 'V2 API endpoint tier throttle triggered'
  },
  {
    platform: 'twitch',
    status: 'operational',
    apiHealth: 99.7,
    syncSuccessRate: 99.0,
    failedAccountsCount: 3,
    rateLimitStatus: 'Normal capacity',
    lastIncident: 'No incidents recorded'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log_1',
    timestamp: '2026-09-05T18:42:10Z',
    actor: 'system_sync_worker',
    actorRole: 'Automated Job',
    action: 'METRIC_SYNCHRONIZATION_BATCH',
    entityType: 'CreatorPlatformAccount',
    entityId: 'p1_yt',
    details: 'Synced 320,000 subscribers, 412 videos for creator c1 (Aarav Sharma)',
    ipAddress: '10.142.0.8 (GCP Internal)'
  },
  {
    id: 'log_2',
    timestamp: '2026-09-05T17:15:30Z',
    actor: 'vikram.admin@vouchmark.ai',
    actorRole: 'Super Admin',
    action: 'VERIFICATION_BADGE_GRANTED',
    entityType: 'Creator',
    entityId: 'c2',
    details: 'Government ID and Instagram OAuth ownership verified for Priya Nambiar',
    ipAddress: '103.21.144.92 (Mumbai, IN)'
  },
  {
    id: 'log_3',
    timestamp: '2026-09-05T15:20:00Z',
    actor: 'brand_boat_procurement',
    actorRole: 'Verified Brand',
    action: 'COMMERCIAL_PRICING_ACCESSED',
    entityType: 'CreatorPricing',
    entityId: 'c3',
    details: 'Unlocked rate cards for creator Rohan Mehta under NDA permissions',
    ipAddress: '49.36.128.14 (Gurugram, IN)'
  },
  {
    id: 'log_4',
    timestamp: '2026-09-05T12:05:44Z',
    actor: 'automated_anomaly_detector',
    actorRole: 'Security Bot',
    action: 'FOLLOWER_SPIKE_AUDIT_PASSED',
    entityType: 'CreatorPlatformAccount',
    entityId: 'p2_ig',
    details: 'Verified +12,400 organic follower influx driven by viral Reel #NewYearFitness',
    ipAddress: 'Internal ML Pipeline'
  }
];

export const mockModerationReports: ModerationReport[] = [
  {
    id: 'rep_1',
    reportedEntityName: 'Shady Deals Hub',
    reportedEntityType: 'brand',
    reason: 'Spam',
    reporterName: 'Aarav Sharma',
    riskLevel: 'Medium',
    status: 'in_review',
    evidenceSummary: 'Sending mass unsolicited low-ball bulk DM inquiries without verifiable company domain or campaign details.',
    timestamp: '2026-09-05T14:10:00Z'
  },
  {
    id: 'rep_2',
    reportedEntityName: 'FakeCryptoWhale',
    reportedEntityType: 'creator',
    reason: 'Metric anomaly',
    reporterName: 'Brand Safety Engine',
    riskLevel: 'High',
    status: 'pending',
    evidenceSummary: 'Abrupt 300% spike in followers within 4 hours with 98% non-organic low quality accounts flagged.',
    timestamp: '2026-09-05T11:30:00Z'
  },
  {
    id: 'rep_3',
    reportedEntityName: 'DesignCloner_99',
    reportedEntityType: 'creator',
    reason: 'Copyright',
    reporterName: 'Vikram Joshi',
    riskLevel: 'High',
    status: 'pending',
    evidenceSummary: 'Portfolio includes verbatim renders of Razorpay Turbo UPI animation with altered watermarks.',
    timestamp: '2026-09-04T16:45:00Z'
  }
];
