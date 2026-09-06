from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class FacebookAdapter(MockAdapterBase):
    platform = Platform.FACEBOOK
    capabilities = PlatformCapabilities(platform=Platform.FACEBOOK, supports_story_views=True)
    content_type = "POST"
    base_url = "https://facebook.com"
    follower_field = "followers"
