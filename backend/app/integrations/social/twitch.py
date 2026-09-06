from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class TwitchAdapter(MockAdapterBase):
    platform = Platform.TWITCH
    capabilities = PlatformCapabilities(
        platform=Platform.TWITCH,
        supports_story_views=False,
        supports_watch_time=True,
    )
    content_type = "LIVE"
    base_url = "https://twitch.tv"
    follower_field = "followers"
    supports_watch_time = True
