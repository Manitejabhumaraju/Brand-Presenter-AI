import { api } from './client';

export interface ApiMetricSnapshot {
  platform: string;
  captured_at: string;
  followers: number | null;
  engagement_rate: number | null;
  average_views: number | null;
  reach: number | null;
  freshness: 'FRESH' | 'RECENT' | 'STALE' | 'VERY_STALE' | 'UNKNOWN';
}

export interface ApiCreatorAnalytics {
  creator_id: string;
  platforms: ApiMetricSnapshot[];
  top_content: Array<{
    id: string;
    content_type: string;
    content_url: string | null;
    views: number | null;
    engagement_rate: number | null;
  }>;
}

export function getCreatorAnalytics(creatorId: string): Promise<ApiCreatorAnalytics> {
  return api.get<ApiCreatorAnalytics>(`/creators/${creatorId}/analytics`, { auth: false });
}

export interface ApiAudienceSplitItem {
  label: string;
  percentage: number;
}

export interface ApiAudienceInsights {
  social_account_id: string;
  platform: string;
  captured_at: string | null;
  countries: ApiAudienceSplitItem[];
  ages: ApiAudienceSplitItem[];
  genders: ApiAudienceSplitItem[];
}

export function getCreatorAudience(creatorId: string): Promise<ApiAudienceInsights[]> {
  return api.get<ApiAudienceInsights[]>(`/creators/${creatorId}/audience`, { auth: false });
}

export interface ApiPricingBenchmark {
  market_min: number | null;
  market_median: number | null;
  market_max: number | null;
  currency: string;
  sample_size: number;
}

export function getPricingBenchmark(params: {
  platform?: string;
  category?: string;
  content_type?: string;
}): Promise<ApiPricingBenchmark> {
  return api.post<ApiPricingBenchmark>('/pricing/benchmark', params, { auth: false });
}
