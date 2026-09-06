"""A minimal in-memory rate limiter.

This is intentionally simple (a per-process sliding window keyed by client IP + route) so the
MVP doesn't require Redis. It is NOT distributed - running multiple API processes/instances means
each enforces its own limit independently. Swap `_InMemoryLimiter` for a Redis-backed
implementation behind the same `RateLimiter` interface before scaling horizontally.
"""

import time
from collections import defaultdict
from threading import Lock

from fastapi import Request

from app.core.exceptions import RateLimitedError


class RateLimiter:
    def check(self, key: str, *, limit: int, window_seconds: int) -> None:
        raise NotImplementedError


class InMemoryRateLimiter(RateLimiter):
    def __init__(self) -> None:
        self._hits: dict[str, list[float]] = defaultdict(list)
        self._lock = Lock()

    def check(self, key: str, *, limit: int, window_seconds: int) -> None:
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            cutoff = now - window_seconds
            while hits and hits[0] < cutoff:
                hits.pop(0)
            if len(hits) >= limit:
                raise RateLimitedError("Too many requests. Please try again shortly.")
            hits.append(now)

    def reset(self) -> None:
        """Test-only hook: clears all tracked hit counters."""
        with self._lock:
            self._hits.clear()


_limiter = InMemoryRateLimiter()


def rate_limit(name: str, *, limit: int, window_seconds: int):
    """FastAPI dependency factory: `Depends(rate_limit("login", limit=5, window_seconds=60))`."""

    def dependency(request: Request) -> None:
        client_ip = request.client.host if request.client else "unknown"
        key = f"{name}:{client_ip}"
        _limiter.check(key, limit=limit, window_seconds=window_seconds)

    return dependency
