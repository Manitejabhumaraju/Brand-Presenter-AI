"""Request-scoped database sessions (sync SQLModel/SQLAlchemy sessions)."""

from collections.abc import Generator

from sqlmodel import Session

from app.db.engine import get_engine


def get_session() -> Generator[Session, None, None]:
    with Session(get_engine()) as session:
        yield session
