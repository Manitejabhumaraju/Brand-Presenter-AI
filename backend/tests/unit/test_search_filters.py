from app.models.enums import ContentType, Platform
from app.services.ai_service import interpret_query


def test_extracts_country():
    filters = interpret_query("Find fitness creators in India")
    assert filters.country == "India"


def test_extracts_category():
    filters = interpret_query("Show me tech creators with high engagement")
    assert filters.category == "Technology"


def test_extracts_platform():
    filters = interpret_query("Find youtube creators for a campaign")
    assert filters.platform == Platform.YOUTUBE


def test_extracts_content_type():
    filters = interpret_query("Creators known for great reel content")
    assert filters.content_type == ContentType.REEL


def test_extracts_budget_in_thousands():
    filters = interpret_query("Indian fitness creators under 50k")
    assert filters.max_price == 50_000


def test_extracts_budget_with_rupee_symbol():
    filters = interpret_query("creators under ₹40000")
    assert filters.max_price == 40_000


def test_no_match_leaves_filters_empty():
    filters = interpret_query("hello there")
    assert filters.country is None
    assert filters.category is None
    assert filters.platform is None
