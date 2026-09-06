from fastapi import APIRouter

from app.api.routes import (
    admin,
    ai,
    analytics,
    audience,
    auth,
    brands,
    campaigns,
    creators,
    freelancers,
    health,
    messages,
    notifications,
    portfolio,
    pricing,
    profile_views,
    saved_searches,
    search,
    shortlists,
    social_accounts,
    users,
    verification,
)

api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(creators.router)
api_router.include_router(profile_views.router)
api_router.include_router(brands.router)
api_router.include_router(freelancers.router)
api_router.include_router(social_accounts.router)
api_router.include_router(analytics.router)
api_router.include_router(audience.router)
api_router.include_router(pricing.router)
api_router.include_router(portfolio.router)
api_router.include_router(search.router)
api_router.include_router(campaigns.router)
api_router.include_router(messages.router)
api_router.include_router(ai.router)
api_router.include_router(shortlists.router)
api_router.include_router(saved_searches.router)
api_router.include_router(notifications.router)
api_router.include_router(verification.router)
api_router.include_router(admin.router)
