from app.models.enums import ContentType, Platform, PricingVisibility
from app.schemas.auth import RegisterRequest
from app.schemas.pricing import CreatorPricingCreate
from app.services import auth_service, pricing_service


def _register(session, email, username, role):
    result = auth_service.register_user(
        session,
        RegisterRequest(
            email=email, password="TestPass123!", full_name=username, username=username, role=role
        ),
    )
    from app.repositories import users as users_repo

    return users_repo.get_by_id(session, result.user.id)


def _make_pricing(session, creator_user, creator_id, visibility):
    return pricing_service.create_pricing(
        session,
        creator_user,
        creator_id,
        CreatorPricingCreate(
            platform=Platform.INSTAGRAM,
            content_type=ContentType.REEL,
            min_price=10000,
            max_price=20000,
            visibility=visibility,
        ),
    )


def test_public_pricing_visible_to_anyone(session):
    from app.repositories import creators as creators_repo

    creator_user = _register(session, "creator1@test.com", "creator1", "CREATOR")
    creator_profile = creators_repo.get_by_user_id(session, creator_user.id)
    _make_pricing(session, creator_user, creator_profile.id, PricingVisibility.PUBLIC)

    visible = pricing_service.list_pricing_for_viewer(session, None, creator_profile.id)
    assert len(visible) == 1


def test_private_pricing_hidden_from_others(session):
    from app.repositories import creators as creators_repo

    creator_user = _register(session, "creator2@test.com", "creator2", "CREATOR")
    other_brand = _register(session, "brand1@test.com", "brand1", "BRAND")
    creator_profile = creators_repo.get_by_user_id(session, creator_user.id)
    _make_pricing(session, creator_user, creator_profile.id, PricingVisibility.PRIVATE)

    visible = pricing_service.list_pricing_for_viewer(session, other_brand, creator_profile.id)
    assert visible == []


def test_owner_always_sees_own_private_pricing(session):
    from app.repositories import creators as creators_repo

    creator_user = _register(session, "creator3@test.com", "creator3", "CREATOR")
    creator_profile = creators_repo.get_by_user_id(session, creator_user.id)
    _make_pricing(session, creator_user, creator_profile.id, PricingVisibility.PRIVATE)

    visible = pricing_service.list_pricing_for_viewer(session, creator_user, creator_profile.id)
    assert len(visible) == 1


def test_verified_brands_only_pricing_requires_verification(session):
    from app.repositories import creators as creators_repo

    creator_user = _register(session, "creator4@test.com", "creator4", "CREATOR")
    unverified_brand = _register(session, "brand2@test.com", "brand2", "BRAND")
    verified_brand = _register(session, "brand3@test.com", "brand3", "BRAND")
    verified_brand.is_verified = True
    session.add(verified_brand)
    session.commit()

    creator_profile = creators_repo.get_by_user_id(session, creator_user.id)
    _make_pricing(session, creator_user, creator_profile.id, PricingVisibility.VERIFIED_BRANDS)

    assert pricing_service.list_pricing_for_viewer(session, unverified_brand, creator_profile.id) == []
    assert len(pricing_service.list_pricing_for_viewer(session, verified_brand, creator_profile.id)) == 1
