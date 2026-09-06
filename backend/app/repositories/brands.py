from sqlmodel import Session, func, select

from app.models.brand import BrandProfile


def get_by_id(session: Session, brand_id: str) -> BrandProfile | None:
    return session.get(BrandProfile, brand_id)


def get_by_user_id(session: Session, user_id: str) -> BrandProfile | None:
    return session.exec(select(BrandProfile).where(BrandProfile.user_id == user_id)).first()


def get_by_slug(session: Session, slug: str) -> BrandProfile | None:
    return session.exec(select(BrandProfile).where(BrandProfile.company_slug == slug)).first()


def create(session: Session, profile: BrandProfile) -> BrandProfile:
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


def update(session: Session, profile: BrandProfile, fields: dict) -> BrandProfile:
    for key, value in fields.items():
        setattr(profile, key, value)
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


def list_all(session: Session, *, offset: int = 0, limit: int = 20) -> tuple[list[BrandProfile], int]:
    total = session.exec(select(func.count()).select_from(BrandProfile)).one()
    items = session.exec(select(BrandProfile).offset(offset).limit(limit)).all()
    return list(items), total
