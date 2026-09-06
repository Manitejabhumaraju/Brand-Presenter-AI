"""Database engine creation.

Deliberately thin: the only SQLite-specific bit is `connect_args`, gated on the URL scheme, so
switching `DATABASE_URL` to a `postgresql+psycopg://...` URL later needs no application code
changes elsewhere (see README's PostgreSQL migration notes).
"""

from functools import lru_cache

from sqlalchemy.engine import Engine
from sqlmodel import create_engine

from app.core.config import get_settings


def _build_engine(database_url: str, *, echo: bool = False) -> Engine:
    connect_args: dict[str, object] = {}
    if database_url.startswith("sqlite"):
        connect_args["check_same_thread"] = False
    return create_engine(database_url, echo=echo, connect_args=connect_args)


@lru_cache
def get_engine() -> Engine:
    settings = get_settings()
    return _build_engine(settings.database_url, echo=False)
