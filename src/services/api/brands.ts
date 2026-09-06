import { api } from './client';
import type { ApiPage } from './creators';

export interface ApiBrandProfile {
  id: string;
  user_id: string;
  company_name: string;
  company_slug: string;
  logo_url: string | null;
  website: string | null;
  industry: string | null;
  country: string | null;
  city: string | null;
  description: string | null;
  verification_status: string;
}

export function listBrands(page = 1, pageSize = 20): Promise<ApiPage<ApiBrandProfile>> {
  return api.get<ApiPage<ApiBrandProfile>>(`/brands?page=${page}&page_size=${pageSize}`, { auth: false });
}

export function getBrand(brandId: string): Promise<ApiBrandProfile> {
  return api.get<ApiBrandProfile>(`/brands/${brandId}`, { auth: false });
}

export function createBrand(payload: {
  company_name: string;
  website?: string;
  industry?: string;
  country?: string;
  city?: string;
  description?: string;
}): Promise<ApiBrandProfile> {
  return api.post<ApiBrandProfile>('/brands', payload);
}
