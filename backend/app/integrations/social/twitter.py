from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class TwitterAdapter(MockAdapterBase):
    """Adapter for X (formerly Twitter)."""

    platform = Platform.X
    capabilities = PlatformCapabilities(platform=Platform.X, supports_story_views=False)
    content_type = "THREAD"
    base_url = "https://x.com"
    follower_field = "followers"
