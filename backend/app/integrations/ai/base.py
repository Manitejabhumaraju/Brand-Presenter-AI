"""Provider-independent AI interface.

Nothing outside this module (and the concrete provider modules) should know which AI vendor is
in use - `ai_service.py` only ever talks to `AIProvider`. Selection happens once, in
`get_ai_provider()`, based on `AI_PROVIDER`.
"""

from abc import ABC, abstractmethod
from collections.abc import Iterator
from dataclasses import dataclass


@dataclass
class AIMessage:
    role: str  # "system" | "user" | "assistant"
    content: str


class AIProviderError(Exception):
    """Raised on provider timeouts, HTTP errors, or malformed responses."""


class AIProvider(ABC):
    name: str

    @abstractmethod
    def generate(self, messages: list[AIMessage], *, max_output_tokens: int) -> str:
        """Non-streaming completion. Raises AIProviderError on failure."""

    @abstractmethod
    def stream(self, messages: list[AIMessage], *, max_output_tokens: int) -> Iterator[str]:
        """Yields text chunks as they become available. Raises AIProviderError on failure."""

    def embed(self, text: str) -> list[float]:
        raise NotImplementedError(f"{self.name} does not implement embeddings yet")
