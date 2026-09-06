from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class InstagramAdapter(MockAdapterBase):
    platform = Platform.INSTAGRAM
    capabilities = PlatformCapabilities(
        platform=Platform.INSTAGRAM,
        supports_story_views=True,
        supports_watch_time=False,
    )
    content_type = "REEL"
    base_url = "https://instagram.com"
    follower_field = "followers"
