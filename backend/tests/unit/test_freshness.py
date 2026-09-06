from datetime import UTC, datetime, timedelta

from app.models.enums import FreshnessStatus
from app.services.analytics_service import compute_freshness


def test_none_is_unknown():
    assert compute_freshness(None) == FreshnessStatus.UNKNOWN


def test_recent_timestamp_is_fresh():
    assert compute_freshness(datetime.now(UTC) - timedelta(hours=1)) == FreshnessStatus.FRESH


def test_few_days_old_is_recent():
    assert compute_freshness(datetime.now(UTC) - timedelta(days=3)) == FreshnessStatus.RECENT


def test_couple_weeks_old_is_stale():
    assert compute_freshness(datetime.now(UTC) - timedelta(days=20)) == FreshnessStatus.STALE


def test_very_old_is_very_stale():
    assert compute_freshness(datetime.now(UTC) - timedelta(days=90)) == FreshnessStatus.VERY_STALE
