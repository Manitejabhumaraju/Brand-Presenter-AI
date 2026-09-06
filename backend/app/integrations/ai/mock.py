"""A deterministic, offline AI provider. This is the default (AI_PROVIDER=mock) so the app is
fully functional with zero external dependencies or API keys.

It does not call any language model - it produces short, clearly-labeled canned responses that
reflect the last user message, so the chat/search/match pipeline is exercisable end-to-end
without a real provider.
"""

from collections.abc import Iterator

from app.integrations.ai.base import AIMessage, AIProvider


class MockAIProvider(AIProvider):
    name = "mock"

    def generate(self, messages: list[AIMessage], *, max_output_tokens: int) -> str:
        return "".join(self.stream(messages, max_output_tokens=max_output_tokens))

    def stream(self, messages: list[AIMessage], *, max_output_tokens: int) -> Iterator[str]:
        last_user = next((m.content for m in reversed(messages) if m.role == "user"), "")
        text = self._reply_for(last_user)
        for word in text.split(" "):
            yield word + " "

    def _reply_for(self, user_text: str) -> str:
        lowered = user_text.lower()
        if "search" in lowered or "find" in lowered:
            return (
                "[mock AI] I've interpreted your request into structured filters and queried "
                "the creator database directly - no numbers here are invented."
            )
        if "match" in lowered or "campaign" in lowered:
            return (
                "[mock AI] Based on verified profile data (category, location, followers, "
                "pricing), here is how each candidate scores against your brief."
            )
        return (
            "[mock AI] This is a demo response from the mock AI provider (AI_PROVIDER=mock). "
            "Configure GEMINI_API_KEY or OPENAI_API_KEY and set AI_PROVIDER to use a real model."
        )
