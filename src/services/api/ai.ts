import { API_BASE_URL, api, getAccessToken } from './client';
import type { CreatorSearchParams } from './creators';

export interface ApiAiSearchResponse {
  query: string;
  interpreted_filters: CreatorSearchParams;
  summary: string;
  result_count: number;
  creator_ids: string[];
}

export function aiSearch(query: string): Promise<ApiAiSearchResponse> {
  return api.post<ApiAiSearchResponse>('/ai/search', { query }, { auth: false });
}

export interface ApiCreatorMatch {
  creator_id: string;
  display_name: string;
  match_score: number;
  reasons: string[];
  matched_constraints: string[];
  warnings: string[];
}

export function aiMatchCreators(payload: {
  brief: string;
  budget?: number;
  category?: string;
  country?: string;
  platform?: string;
  limit?: number;
}): Promise<{ matches: ApiCreatorMatch[]; provider: string }> {
  return api.post('/ai/match-creators', payload, { auth: false });
}

export function aiChat(message: string, sessionId?: string): Promise<{ session_id: string; reply: string; provider: string }> {
  return api.post('/ai/chat', { message, session_id: sessionId });
}

export interface ChatStreamHandlers {
  onStart?: (data: { session_id: string }) => void;
  onToken?: (data: { text: string }) => void;
  onMetadata?: (data: Record<string, unknown>) => void;
  onResult?: (data: { session_id: string; reply: string }) => void;
  onError?: (data: { message: string }) => void;
  onDone?: () => void;
}

/**
 * Consumes the backend's POST /ai/chat/stream Server-Sent Events endpoint.
 *
 * `EventSource` can't send a POST body or Authorization header, so this reads the streamed
 * response body directly and parses the `event:`/`data:` SSE framing by hand. Returns an
 * AbortController the caller can use to cancel the request (component unmount, user navigates
 * away, etc.) - the underlying fetch and the backend generator both stop cleanly.
 */
export function streamChat(message: string, sessionId: string | undefined, handlers: ChatStreamHandlers): AbortController {
  const controller = new AbortController();

  (async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_BASE_URL}/ai/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message, session_id: sessionId }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        handlers.onError?.({ message: `Stream request failed with status ${response.status}` });
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';

        for (const rawEvent of events) {
          let eventName = 'message';
          let dataLine = '';
          for (const line of rawEvent.split('\n')) {
            if (line.startsWith('event:')) eventName = line.slice(6).trim();
            else if (line.startsWith('data:')) dataLine += line.slice(5).trim();
          }
          if (!dataLine) continue;
          const data = JSON.parse(dataLine);

          if (eventName === 'start') handlers.onStart?.(data);
          else if (eventName === 'token') handlers.onToken?.(data);
          else if (eventName === 'metadata') handlers.onMetadata?.(data);
          else if (eventName === 'result') handlers.onResult?.(data);
          else if (eventName === 'error') handlers.onError?.(data);
          else if (eventName === 'done') handlers.onDone?.();
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        handlers.onError?.({ message: (err as Error).message });
      }
    }
  })();

  return controller;
}
