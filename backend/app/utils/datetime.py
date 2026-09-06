from datetime import UTC, datetime


def utcnow() -> datetime:
    return datetime.now(UTC)


def ensure_aware(value: datetime) -> datetime:
    """SQLite (unlike Postgres) drops tzinfo on round-trip, so a datetime read back from the DB
    is naive even though it was always stored as UTC. Treat naive datetimes as UTC rather than
    comparing/subtracting them against an aware `utcnow()` and raising a TypeError."""
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value
