import { api, clearTokens, getRefreshToken, setTokens } from './client';

export type ApiUserRole =
  | 'CREATOR'
  | 'INFLUENCER'
  | 'FREELANCER'
  | 'CREATOR_MANAGER'
  | 'AGENCY'
  | 'BRAND'
  | 'BRAND_MEMBER'
  | 'ADMIN';

export interface ApiUser {
  id: string;
  email: string;
  full_name: string;
  username: string;
  role: ApiUserRole;
  status: string;
  avatar_url: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: ApiUser;
}

export async function register(payload: {
  email: string;
  password: string;
  full_name: string;
  username: string;
  role: 'CREATOR' | 'INFLUENCER' | 'FREELANCER' | 'BRAND';
}): Promise<TokenResponse> {
  const result = await api.post<TokenResponse>('/auth/register', payload, { auth: false });
  setTokens(result.access_token, result.refresh_token);
  return result;
}

export async function login(email: string, password: string): Promise<TokenResponse> {
  const result = await api.post<TokenResponse>('/auth/login', { email, password }, { auth: false });
  setTokens(result.access_token, result.refresh_token);
  return result;
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    await api.post('/auth/logout', { refresh_token: refreshToken }).catch(() => undefined);
  }
  clearTokens();
}

export async function refreshSession(): Promise<TokenResponse | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  const result = await api.post<TokenResponse>('/auth/refresh', { refresh_token: refreshToken }, { auth: false });
  setTokens(result.access_token, result.refresh_token);
  return result;
}

export function getMe(): Promise<ApiUser> {
  return api.get<ApiUser>('/auth/me');
}
