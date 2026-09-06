from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class PinterestAdapter(MockAdapterBase):
    platform = Platform.PINTEREST
    capabilities = PlatformCapabilities(
        platform=Platform.PINTEREST,
        supports_story_views=False,
        supports_audience_gender=True,
        supports_audience_age=True,
    )
    content_type = "POST"
    base_url = "https://pinterest.com"
    follower_field = "followers"
