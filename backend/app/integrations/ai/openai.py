"""OpenAI-compatible chat completions provider via plain httpx (no `openai` SDK dependency)."""

import json
from collections.abc import Iterator

import httpx

from app.core.config import get_settings
from app.integrations.ai.base import AIMessage, AIProvider, AIProviderError

_URL = "https://api.openai.com/v1/chat/completions"
_MODEL = "gpt-4o-mini"


class OpenAIProvider(AIProvider):
    name = "openai"

    def __init__(self) -> None:
        settings = get_settings()
        if not settings.openai_api_key:
            raise AIProviderError("OPENAI_API_KEY is not configured")
        self._api_key = settings.openai_api_key
        self._timeout = settings.ai_request_timeout_seconds

    def _headers(self) -> dict:
        return {"Authorization": f"Bearer {self._api_key}", "Content-Type": "application/json"}

    def _payload(self, messages: list[AIMessage], max_output_tokens: int, stream: bool) -> dict:
        return {
            "model": _MODEL,
            "messages": [{"role": m.role, "content": m.content} for m in messages],
            "max_tokens": max_output_tokens,
            "temperature": 0.4,
            "stream": stream,
        }

    def generate(self, messages: list[AIMessage], *, max_output_tokens: int) -> str:
        try:
            response = httpx.post(
                _URL,
                headers=self._headers(),
                json=self._payload(messages, max_output_tokens, stream=False),
                timeout=self._timeout,
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except (httpx.HTTPError, KeyError, IndexError) as exc:
            raise AIProviderError(f"OpenAI request failed: {exc}") from exc

    def stream(self, messages: list[AIMessage], *, max_output_tokens: int) -> Iterator[str]:
        try:
            with httpx.stream(
                "POST",
                _URL,
                headers=self._headers(),
                json=self._payload(messages, max_output_tokens, stream=True),
                timeout=self._timeout,
            ) as response:
                response.raise_for_status()
                for line in response.iter_lines():
                    if not line or not line.startswith("data:"):
                        continue
                    chunk = line[len("data:") :].strip()
                    if chunk == "[DONE]":
                        break
                    try:
                        data = json.loads(chunk)
                        delta = data["choices"][0]["delta"].get("content")
                        if delta:
                            yield delta
                    except (json.JSONDecodeError, KeyError, IndexError):
                        continue
        except httpx.HTTPError as exc:
            raise AIProviderError(f"OpenAI streaming request failed: {exc}") from exc
