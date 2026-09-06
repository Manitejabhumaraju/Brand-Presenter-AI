import { api } from './client';
import type { ApiPage } from './creators';

export interface ApiMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_type: string;
  content: string;
  created_at: string;
  read_at: string | null;
}

export interface ApiConversation {
  id: string;
  type: string;
  campaign_id: string | null;
  participant_user_ids: string[];
  last_message: ApiMessage | null;
  updated_at: string;
}

export function listConversations(): Promise<ApiConversation[]> {
  return api.get<ApiConversation[]>('/conversations');
}

export function createConversation(participantUserIds: string[], campaignId?: string): Promise<ApiConversation> {
  return api.post<ApiConversation>('/conversations', {
    participant_user_ids: participantUserIds,
    campaign_id: campaignId,
  });
}

export function listMessages(conversationId: string, page = 1, pageSize = 50): Promise<ApiPage<ApiMessage>> {
  return api.get<ApiPage<ApiMessage>>(`/conversations/${conversationId}/messages?page=${page}&page_size=${pageSize}`);
}

export function sendMessage(conversationId: string, content: string): Promise<ApiMessage> {
  return api.post<ApiMessage>(`/conversations/${conversationId}/messages`, { content, message_type: 'TEXT' });
}
