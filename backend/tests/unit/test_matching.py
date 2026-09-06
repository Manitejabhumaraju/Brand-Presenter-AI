from app.schemas.ai import AIMatchRequest
from app.schemas.creator import CreatorProfileDetail
from app.services.matching_service import score_candidate


def _candidate(**overrides) -> CreatorProfileDetail:
    base = {
        "id": "c1",
        "user_id": "u1",
        "username": "creator1",
        "display_name": "Test Creator",
        "bio": None,
        "creator_type": "CONTENT_CREATOR",
        "categories": ["Fitness"],
        "niches": [],
        "country": "India",
        "state": None,
        "city": "Mumbai",
        "languages": [],
        "website": None,
        "availability": True,
        "response_time": None,
        "profile_completion": 80,
        "verification_status": "VERIFIED",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "avatar_url": None,
        "brand_presenter_score": None,
        "followers_total": 100_000,
        "platforms": ["instagram"],
    }
    base.update(overrides)
    return CreatorProfileDetail(**base)


def test_matching_category_and_country_boost_score(session):
    candidate = _candidate()
    request = AIMatchRequest(brief="Need fitness creators in India", category="Fitness", country="India")
    result = score_candidate(session, candidate, request)
    assert "category" in result.matched_constraints
    assert "country" in result.matched_constraints
    assert result.match_score > 50


def test_matching_mismatched_category_produces_warning(session):
    candidate = _candidate(categories=["Technology"])
    request = AIMatchRequest(brief="Need fitness creators", category="Fitness")
    result = score_candidate(session, candidate, request)
    assert "category" not in result.matched_constraints
    assert any("category" in w.lower() for w in result.warnings)


def test_matching_no_follower_data_warns(session):
    candidate = _candidate(followers_total=None)
    request = AIMatchRequest(brief="Need creators")
    result = score_candidate(session, candidate, request)
    assert any("follower" in w.lower() for w in result.warnings)


def test_matching_over_budget_lowers_score_and_warns(session):
    from app.models.enums import ContentType, Platform, PricingModel, PricingVisibility
    from app.repositories import creators as creators_repo
    from app.schemas.auth import RegisterRequest
    from app.schemas.pricing import CreatorPricingCreate
    from app.services import auth_service, pricing_service

    creator_user = auth_service.register_user(
        session,
        RegisterRequest(
            email="pricey@test.com",
            password="TestPass123!",
            full_name="Pricey",
            username="pricey",
            role="CREATOR",
        ),
    )
    from app.repositories import users as users_repo

    user = users_repo.get_by_id(session, creator_user.user.id)
    profile = creators_repo.get_by_user_id(session, user.id)
    pricing_service.create_pricing(
        session,
        user,
        profile.id,
        CreatorPricingCreate(
            platform=Platform.INSTAGRAM,
            content_type=ContentType.REEL,
            min_price=100_000,
            visibility=PricingVisibility.PUBLIC,
            pricing_model=PricingModel.STARTING_FROM,
        ),
    )
    candidate = _candidate(id=profile.id, followers_total=None)
    request = AIMatchRequest(brief="Need creators", budget=20_000)
    result = score_candidate(session, candidate, request)
    assert any("budget" in w.lower() or "pricing" in w.lower() for w in result.warnings)
