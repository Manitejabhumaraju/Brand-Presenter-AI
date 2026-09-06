from sqlalchemy import String, cast
from sqlmodel import Session, func, select

from app.models.creator import CreatorProfile
from app.models.enums import CreatorType, VerificationStatus
from app.models.social import SocialAccount
from app.models.user import User


def get_by_id(session: Session, creator_id: str) -> CreatorProfile | None:
    return session.get(CreatorProfile, creator_id)


def get_by_user_id(session: Session, user_id: str) -> CreatorProfile | None:
    return session.exec(select(CreatorProfile).where(CreatorProfile.user_id == user_id)).first()


def create(session: Session, profile: CreatorProfile) -> CreatorProfile:
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


def update(session: Session, profile: CreatorProfile, fields: dict) -> CreatorProfile:
    for key, value in fields.items():
        setattr(profile, key, value)
    session.add(profile)
    session.commit()
    session.refresh(profile)
    return profile


def delete(session: Session, profile: CreatorProfile) -> None:
    session.delete(profile)
    session.commit()


def search(
    session: Session,
    *,
    query: str | None = None,
    country: str | None = None,
    city: str | None = None,
    category: str | None = None,
    niche: str | None = None,
    creator_type: CreatorType | None = None,
    verification: VerificationStatus | None = None,
    availability: bool | None = None,
    platform: str | None = None,
    offset: int = 0,
    limit: int = 20,
) -> tuple[list[CreatorProfile], int]:
    stmt = select(CreatorProfile)

    if query:
        like = f"%{query.lower()}%"
        stmt = stmt.join(User, User.id == CreatorProfile.user_id).where(
            func.lower(CreatorProfile.display_name).like(like)
            | func.lower(User.username).like(like)
            | func.lower(func.coalesce(CreatorProfile.bio, "")).like(like)
        )
    if country:
        stmt = stmt.where(CreatorProfile.country == country)
    if city:
        stmt = stmt.where(CreatorProfile.city == city)
    if creator_type:
        stmt = stmt.where(CreatorProfile.creator_type == creator_type)
    if verification:
        stmt = stmt.where(CreatorProfile.verification_status == verification)
    if availability is not None:
        stmt = stmt.where(CreatorProfile.availability == availability)

    # SQLite JSON columns are stored as text; a portable "contains" filter for JSON list
    # membership uses LIKE against the serialized value. Good enough for MVP scale/SQLite,
    # and trivially replaced by a Postgres JSONB `@>` operator later.
    if category:
        stmt = stmt.where(cast(CreatorProfile.categories, String).like(f'%"{category}"%'))
    if niche:
        stmt = stmt.where(cast(CreatorProfile.niches, String).like(f'%"{niche}"%'))

    if platform:
        stmt = stmt.join(SocialAccount, SocialAccount.user_id == CreatorProfile.user_id).where(
            SocialAccount.platform == platform
        )

    stmt = stmt.distinct()

    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = session.exec(count_stmt).one()

    items = session.exec(stmt.order_by(CreatorProfile.updated_at.desc()).offset(offset).limit(limit)).all()
    return list(items), total
