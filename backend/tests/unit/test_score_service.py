from app.repositories import creators as creators_repo
from app.repositories import users as users_repo
from app.schemas.auth import RegisterRequest
from app.services import auth_service, score_service


def test_score_is_within_bounds(session):
    result = auth_service.register_user(
        session,
        RegisterRequest(
            email="scored@test.com",
            password="TestPass123!",
            full_name="Scored Creator",
            username="scoredcreator",
            role="CREATOR",
        ),
    )
    user = users_repo.get_by_id(session, result.user.id)
    profile = creators_repo.get_by_user_id(session, user.id)

    score = score_service.calculate_score(session, profile)

    for value in [
        score.score,
        score.audience_quality,
        score.engagement_quality,
        score.content_performance,
        score.consistency,
        score.brand_fit,
        score.professional_reliability,
        score.commercial_value,
    ]:
        assert 0 <= value <= 100


def test_recalculating_score_updates_existing_row(session):
    result = auth_service.register_user(
        session,
        RegisterRequest(
            email="rescored@test.com",
            password="TestPass123!",
            full_name="Rescored",
            username="rescored",
            role="CREATOR",
        ),
    )
    user = users_repo.get_by_id(session, result.user.id)
    profile = creators_repo.get_by_user_id(session, user.id)

    first = score_service.calculate_score(session, profile)
    second = score_service.calculate_score(session, profile)
    assert first.id == second.id
