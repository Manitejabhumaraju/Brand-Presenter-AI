"""Social platform adapter interface.

Every real integration (OAuth connect, metrics pull, audience pull) implements this interface.
For this MVP every adapter is a mock: no real OAuth is implemented anywhere in this codebase.
Mock responses are deterministic (seeded by account id) and clearly framed as demo data via
`source="mock"` on every returned record - see app/models/analytics.py and app/models/audience.py.

When real credentials become available, a new adapter class implementing the same interface
replaces the mock without touching `social_service.py` or any route.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any

from app.models.enums import Platform


@dataclass(frozen=True)
class PlatformCapabilities:
    platform: Platform
    supports_followers: bool = True
    supports_reach: bool = True
    supports_impressions: bool = True
    supports_story_views: bool = False
    supports_watch_time: bool = False
    supports_audience_gender: bool = True
    supports_audience_age: bool = True
    supports_audience_country: bool = True


class ConnectionResult(dict):
    """Shape: {is_connected, platform_user_id, profile_url, account_type}."""


class SocialPlatformAdapter(ABC):
    capabilities: PlatformCapabilities

    @abstractmethod
    def connect(self, *, username: str) -> dict[str, Any]:
        """Establish a (mock) connection and return normalized account attributes."""

    @abstractmethod
    def disconnect(self, *, platform_user_id: str) -> None: ...

    @abstractmethod
    def refresh_token(self, *, refresh_token: str) -> dict[str, Any]:
        """Returns {access_token, refresh_token, expires_in} - mock values only."""

    @abstractmethod
    def get_profile(self, *, username: str) -> dict[str, Any]: ...

    @abstractmethod
    def get_metrics(self, *, username: str) -> dict[str, Any]:
        """Returns a dict matching a subset of MetricSnapshot fields. Unsupported fields are
        omitted entirely (never coerced to 0)."""

    @abstractmethod
    def get_content(self, *, username: str, limit: int = 10) -> list[dict[str, Any]]: ...

    @abstractmethod
    def get_audience(self, *, username: str) -> dict[str, list[dict[str, Any]]]:
        """Returns {"countries": [...], "cities": [...], "ages": [...], "genders": [...],
        "languages": [...], "interests": [...]}, each item {label, percentage}. Any dimension the
        platform doesn't expose (per `capabilities`) is an empty list, never fabricated."""


class MockAdapterBase(SocialPlatformAdapter):
    """Shared mock implementation. Each concrete platform module sets the class attributes
    below to reflect that platform's real capabilities and content shape - the generation logic
    itself is identical, only the parameters differ.
    """

    platform: Platform
    capabilities: PlatformCapabilities
    content_type: str = "POST"
    base_url: str = "https://example.com"
    follower_field: str = "followers"
    supports_watch_time: bool = False

    def connect(self, *, username: str) -> dict[str, Any]:
        from app.integrations.social._mock_utils import seeded_random

        rng = seeded_random(username, "connect")
        return {
            "is_connected": True,
            "platform_user_id": f"{self.platform.value}_{rng.randint(10**8, 10**9)}",
            "profile_url": f"{self.base_url}/{username}",
            "account_type": "creator",
        }

    def disconnect(self, *, platform_user_id: str) -> None:
        return None

    def refresh_token(self, *, refresh_token: str) -> dict[str, Any]:
        return {
            "access_token": "mock-access-token",
            "refresh_token": "mock-refresh-token",
            "expires_in": 3600,
        }

    def get_profile(self, *, username: str) -> dict[str, Any]:
        result = self.connect(username=username)
        result["username"] = username
        return result

    def get_metrics(self, *, username: str) -> dict[str, Any]:
        from app.integrations.social._mock_utils import seeded_random

        rng = seeded_random(username, "metrics")
        followers = rng.randint(8_000, 900_000)
        engagement_rate = round(rng.uniform(1.2, 8.5), 2)
        metrics: dict[str, Any] = {
            self.follower_field: followers,
            "posts_count": rng.randint(30, 1200),
            "engagement_rate": engagement_rate,
            "growth_percentage": round(rng.uniform(-1.5, 6.0), 2),
        }
        if self.capabilities.supports_reach:
            metrics["reach"] = int(followers * rng.uniform(0.4, 1.3))
        if self.capabilities.supports_impressions:
            metrics["impressions"] = int(followers * rng.uniform(0.6, 2.0))
        metrics["average_views"] = int(followers * rng.uniform(0.1, 0.6))
        metrics["likes"] = int(followers * (engagement_rate / 100) * rng.uniform(5, 15))
        metrics["comments"] = int(followers * (engagement_rate / 100) * rng.uniform(0.2, 1.0))
        if self.supports_watch_time:
            metrics["average_reach"] = metrics.get("reach")
        return metrics

    def get_content(self, *, username: str, limit: int = 10) -> list[dict[str, Any]]:
        from app.integrations.social._mock_utils import demo_content_items

        return demo_content_items(
            username, self.platform.value, self.content_type, limit, base_url=self.base_url
        )

    def get_audience(self, *, username: str) -> dict[str, list[dict[str, Any]]]:
        from app.integrations.social._mock_utils import demo_audience

        return demo_audience(
            username,
            self.platform.value,
            countries=self.capabilities.supports_audience_country,
            ages=self.capabilities.supports_audience_age,
            genders=self.capabilities.supports_audience_gender,
        )
