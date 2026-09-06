"""Google Gemini provider via the REST Generative Language API (no google SDK dependency).

Used when AI_PROVIDER=gemini and GEMINI_API_KEY is set. Network errors, timeouts, and malformed
responses all surface as AIProviderError so the caller (ai_service) can respond safely instead of
leaking a raw stack trace.
"""

import json
from collections.abc import Iterator

import httpx

from app.core.config import get_settings
from app.integrations.ai.base import AIMessage, AIProvider, AIProviderError

_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
_MODEL = "gemini-1.5-flash"


class GeminiProvider(AIProvider):
    name = "gemini"

    def __init__(self) -> None:
        settings = get_settings()
        if not settings.gemini_api_key:
            raise AIProviderError("GEMINI_API_KEY is not configured")
        self._api_key = settings.gemini_api_key
        self._timeout = settings.ai_request_timeout_seconds

    def _build_payload(self, messages: list[AIMessage], max_output_tokens: int) -> dict:
        system_instruction = next((m.content for m in messages if m.role == "system"), None)
        contents = [
            {"role": "user" if m.role == "user" else "model", "parts": [{"text": m.content}]}
            for m in messages
            if m.role != "system"
        ]
        payload: dict = {
            "contents": contents,
            "generationConfig": {"maxOutputTokens": max_output_tokens, "temperature": 0.4},
        }
        if system_instruction:
            payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}
        return payload

    def generate(self, messages: list[AIMessage], *, max_output_tokens: int) -> str:
        url = f"{_BASE_URL}/{_MODEL}:generateContent"
        payload = self._build_payload(messages, max_output_tokens)
        try:
            response = httpx.post(url, params={"key": self._api_key}, json=payload, timeout=self._timeout)
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]
        except (httpx.HTTPError, KeyError, IndexError) as exc:
            raise AIProviderError(f"Gemini request failed: {exc}") from exc

    def stream(self, messages: list[AIMessage], *, max_output_tokens: int) -> Iterator[str]:
        url = f"{_BASE_URL}/{_MODEL}:streamGenerateContent"
        payload = self._build_payload(messages, max_output_tokens)
        try:
            with httpx.stream(
                "POST",
                url,
                params={"key": self._api_key, "alt": "sse"},
                json=payload,
                timeout=self._timeout,
            ) as response:
                response.raise_for_status()
                for line in response.iter_lines():
                    if not line or not line.startswith("data:"):
                        continue
                    chunk = line[len("data:") :].strip()
                    if not chunk or chunk == "[DONE]":
                        continue
                    try:
                        data = json.loads(chunk)
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        yield text
                    except (json.JSONDecodeError, KeyError, IndexError):
                        continue
        except httpx.HTTPError as exc:
            raise AIProviderError(f"Gemini streaming request failed: {exc}") from exc
