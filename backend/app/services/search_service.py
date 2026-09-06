from sqlmodel import Session

from app.repositories import creators as creators_repo
from app.schemas.common import Page
from app.schemas.creator import CreatorProfileDetail
from app.schemas.search import CreatorSearchFilters
from app.services.creator_service import get_profile_detail

# Fetch a wider candidate window than requested so follower/price filters (computed in Python,
# since they depend on the latest metric snapshot / pricing rows rather than a plain column) can
# still fill a full page. Fine at MVP/demo scale; a Postgres-backed materialized "creator search
# index" table is the natural next step if the catalog grows large - see README limitations.
_CANDIDATE_MULTIPLIER = 5
_MAX_CANDIDATES = 500


def search_creators(session: Session, filters: CreatorSearchFilters) -> Page[CreatorProfileDetail]:
    candidate_limit = min(filters.page * filters.page_size * _CANDIDATE_MULTIPLIER, _MAX_CANDIDATES)

    rows, _ = creators_repo.search(
        session,
        query=filters.query,
        country=filters.country,
        city=filters.city,
        category=filters.category,
        niche=filters.niche,
        creator_type=filters.creator_type,
        verification=filters.verification,
        availability=filters.availability,
        platform=filters.platform.value if filters.platform else None,
        offset=0,
        limit=candidate_limit,
    )

    details = [get_profile_detail(session, row.id) for row in rows]

    if filters.min_followers is not None:
        details = [d for d in details if (d.followers_total or 0) >= filters.min_followers]
    if filters.max_followers is not None:
        details = [d for d in details if (d.followers_total or 0) <= filters.max_followers]

    if filters.max_price is not None:
        from app.services.pricing_service import list_pricing_for_viewer

        # A creator with no public pricing at all is kept in (we simply don't know their rate),
        # rather than assumed unaffordable and dropped.
        filtered = []
        for d in details:
            pricing_rows = list_pricing_for_viewer(session, None, d.id)
            if not pricing_rows or any(p.min_price <= filters.max_price for p in pricing_rows):
                filtered.append(d)
        details = filtered

    total = len(details)
    start = (filters.page - 1) * filters.page_size
    page_items = details[start : start + filters.page_size]
    return Page.create(page_items, page=filters.page, page_size=filters.page_size, total=total)


def keyword_search(
    session: Session, query: str, *, page: int = 1, page_size: int = 20
) -> Page[CreatorProfileDetail]:
    filters = CreatorSearchFilters(query=query, page=page, page_size=page_size)
    return search_creators(session, filters)
