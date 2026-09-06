import { api } from './client';
import type { ApiPage } from './creators';

export interface ApiCampaign {
  id: string;
  brand_id: string;
  name: string;
  description: string | null;
  objective: string | null;
  budget: number | null;
  currency: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
}

export interface ApiCampaignCreator {
  id: string;
  campaign_id: string;
  creator_id: string;
  status: string;
  agreed_price: number | null;
  currency: string;
}

export function listCampaigns(page = 1, pageSize = 20): Promise<ApiPage<ApiCampaign>> {
  return api.get<ApiPage<ApiCampaign>>(`/campaigns?page=${page}&page_size=${pageSize}`);
}

export function getCampaign(campaignId: string): Promise<ApiCampaign> {
  return api.get<ApiCampaign>(`/campaigns/${campaignId}`);
}

export function createCampaign(payload: {
  name: string;
  description?: string;
  objective?: string;
  budget?: number;
  currency?: string;
}): Promise<ApiCampaign> {
  return api.post<ApiCampaign>('/campaigns', payload);
}

export function inviteCreator(
  campaignId: string,
  creatorId: string,
  agreedPrice?: number
): Promise<ApiCampaignCreator> {
  return api.post<ApiCampaignCreator>(`/campaigns/${campaignId}/invite`, {
    creator_id: creatorId,
    agreed_price: agreedPrice,
  });
}

export function acceptCampaignInvite(campaignId: string): Promise<ApiCampaignCreator> {
  return api.post<ApiCampaignCreator>(`/campaigns/${campaignId}/accept`);
}
