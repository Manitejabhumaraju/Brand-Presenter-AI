import { api } from './client';

export interface ApiPage<T> {
  items: T[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface ApiBrandPresenterScore {
  score: number;
  audience_quality: number;
  engagement_quality: number;
  content_performance: number;
  consistency: number;
  brand_fit: number;
  professional_reliability: number;
  commercial_value: number;
  methodology_version: string;
  calculated_at: string;
}

export interface ApiCreatorProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  creator_type: string;
  categories: string[];
  niches: string[];
  country: string | null;
  state: string | null;
  city: string | null;
  languages: string[];
  website: string | null;
  availability: boolean;
  verification_status: string;
  avatar_url: string | null;
  followers_total: number | null;
  platforms: string[];
  brand_presenter_score: ApiBrandPresenterScore | null;
}

export interface CreatorSearchParams {
  query?: string;
  platform?: string;
  category?: string;
  niche?: string;
  country?: string;
  city?: string;
  min_followers?: number;
  max_followers?: number;
  max_price?: number;
  creator_type?: string;
  availability?: boolean;
  page?: number;
  page_size?: number;
}

function toQueryString(params: Record<string, unknown> | CreatorSearchParams): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

export function searchCreators(params: CreatorSearchParams = {}): Promise<ApiPage<ApiCreatorProfile>> {
  return api.get<ApiPage<ApiCreatorProfile>>(`/creators${toQueryString(params)}`, { auth: false });
}

export function getCreator(creatorId: string): Promise<ApiCreatorProfile> {
  return api.get<ApiCreatorProfile>(`/creators/${creatorId}`, { auth: false });
}

export function getCreatorContact(creatorId: string): Promise<{ email: string | null; phone: string | null; message_only: boolean }> {
  return api.get(`/creators/${creatorId}/contact`);
}

export function recordProfileView(creatorId: string): Promise<void> {
  return api.post(`/creators/${creatorId}/view`, undefined, { auth: false });
}
