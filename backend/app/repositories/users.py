from sqlmodel import Session, func, select

from app.models.user import User


def get_by_id(session: Session, user_id: str) -> User | None:
    return session.get(User, user_id)


def get_by_email(session: Session, email: str) -> User | None:
    return session.exec(select(User).where(User.email == email.lower())).first()


def get_by_username(session: Session, username: str) -> User | None:
    return session.exec(select(User).where(User.username == username)).first()


def create(session: Session, user: User) -> User:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def list_all(session: Session, *, offset: int = 0, limit: int = 20) -> tuple[list[User], int]:
    total = session.exec(select(func.count()).select_from(User)).one()
    items = session.exec(select(User).order_by(User.created_at.desc()).offset(offset).limit(limit)).all()
    return list(items), total
