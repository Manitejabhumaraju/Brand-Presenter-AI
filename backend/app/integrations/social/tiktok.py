from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class TiktokAdapter(MockAdapterBase):
    platform = Platform.TIKTOK
    capabilities = PlatformCapabilities(
        platform=Platform.TIKTOK,
        supports_story_views=False,
        supports_watch_time=True,
    )
    content_type = "SHORT"
    base_url = "https://tiktok.com"
    follower_field = "followers"
    supports_watch_time = True
