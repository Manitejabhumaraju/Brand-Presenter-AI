import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("AI_PROVIDER", "mock")

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402
from sqlmodel import Session, SQLModel, create_engine  # noqa: E402

from app.core.dependencies import get_session  # noqa: E402
from app.db import base as _  # noqa: E402, F401
from app.main import app  # noqa: E402
from app.models.enums import UserRole  # noqa: E402
from app.schemas.auth import RegisterRequest  # noqa: E402


@pytest.fixture(name="engine")
def engine_fixture(tmp_path):
    db_path = tmp_path / "test.db"
    engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})
    SQLModel.metadata.create_all(engine)
    yield engine
    SQLModel.metadata.drop_all(engine)


@pytest.fixture(name="session")
def session_fixture(engine):
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(engine):
    from app.core.rate_limit import _limiter

    def get_session_override():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[get_session] = get_session_override
    _limiter.reset()
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()


def register_user(
    session: Session, *, email: str, username: str, role: UserRole, password: str = "TestPass123!"
):
    from app.services import auth_service

    return auth_service.register_user(
        session,
        RegisterRequest(
            email=email, password=password, full_name=username.title(), username=username, role=role
        ),
    )


def auth_headers(token: str) -> dict:
    return {"Authorization": f"Bearer {token}"}
