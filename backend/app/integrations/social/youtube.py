from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class YoutubeAdapter(MockAdapterBase):
    platform = Platform.YOUTUBE
    capabilities = PlatformCapabilities(
        platform=Platform.YOUTUBE,
        supports_story_views=False,
        supports_watch_time=True,
        supports_audience_gender=True,
        supports_audience_age=True,
    )
    content_type = "VIDEO"
    base_url = "https://youtube.com"
    follower_field = "subscribers"
    supports_watch_time = True
