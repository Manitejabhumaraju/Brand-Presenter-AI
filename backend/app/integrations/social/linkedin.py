from app.integrations.social.base import MockAdapterBase, PlatformCapabilities
from app.models.enums import Platform


class LinkedinAdapter(MockAdapterBase):
    platform = Platform.LINKEDIN
    capabilities = PlatformCapabilities(
        platform=Platform.LINKEDIN,
        supports_story_views=False,
        supports_audience_gender=False,
        supports_audience_age=False,
    )
    content_type = "ARTICLE"
    base_url = "https://linkedin.com"
    follower_field = "followers"
