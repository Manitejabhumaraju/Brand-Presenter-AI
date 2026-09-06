"""Deterministic creator-to-brief matching.

Scores and reasons are computed entirely from database facts (category, country, followers,
engagement, pricing) - never invented by an LLM. `ai_service` may use an AI provider to phrase
the final natural-language explanation, but it is only allowed to rephrase these structured,
already-verified reasons - see app/services/ai_service.py and the "AI safety" notes there.
"""

from sqlmodel import Session

from app.schemas.ai import AIMatchRequest, CreatorMatchResult
from app.schemas.creator import CreatorProfileDetail
from app.schemas.search import CreatorSearchFilters
from app.services.pricing_service import list_pricing_for_viewer
from app.services.search_service import search_creators


def find_candidates(session: Session, request: AIMatchRequest) -> list[CreatorProfileDetail]:
    if request.candidate_creator_ids:
        from app.services.creator_service import get_profile_detail

        return [get_profile_detail(session, cid) for cid in request.candidate_creator_ids]

    filters = CreatorSearchFilters(
        category=request.category,
        country=request.country,
        platform=request.platform,
        max_price=request.budget,
        page=1,
        page_size=request.limit,
    )
    return search_creators(session, filters).items


def score_candidate(
    session: Session, candidate: CreatorProfileDetail, request: AIMatchRequest
) -> CreatorMatchResult:
    reasons: list[str] = []
    matched_constraints: list[str] = []
    warnings: list[str] = []
    score = 50  # neutral baseline

    if request.category:
        if candidate.categories and any(request.category.lower() in c.lower() for c in candidate.categories):
            score += 15
            reasons.append(f"Creates content in the '{request.category}' category")
            matched_constraints.append("category")
        else:
            warnings.append(f"Category '{request.category}' is not confirmed on this profile")

    if request.country:
        if candidate.country and candidate.country.lower() == request.country.lower():
            score += 10
            reasons.append(f"Audience geography matches ({request.country})")
            matched_constraints.append("country")
        else:
            warnings.append(f"Creator's listed country does not match '{request.country}'")

    if candidate.followers_total is not None:
        if candidate.followers_total >= 50_000:
            score += 10
            reasons.append(f"Strong reach with {candidate.followers_total:,} total followers")
        elif candidate.followers_total >= 10_000:
            score += 5
            reasons.append(f"Solid micro-influencer reach ({candidate.followers_total:,} followers)")
    else:
        warnings.append("No verified follower data available yet")

    if candidate.brand_presenter_score is not None:
        bp = candidate.brand_presenter_score
        score += round(bp.score / 10)
        reasons.append(f"Brand Presenter Score of {bp.score}/100")
        if bp.engagement_quality >= 75:
            reasons.append("High engagement quality component")

    if request.budget is not None:
        pricing_rows = list_pricing_for_viewer(session, None, candidate.id)
        affordable = [p for p in pricing_rows if p.min_price <= request.budget]
        if pricing_rows and affordable:
            score += 10
            reasons.append("Pricing is within budget")
            matched_constraints.append("budget")
        elif pricing_rows and not affordable:
            score -= 15
            warnings.append("Listed pricing exceeds the stated budget")
        else:
            warnings.append("No public pricing available to confirm budget fit")

    score = max(0, min(100, score))
    if not reasons:
        reasons.append("Matches the general discovery filters for this brief")

    return CreatorMatchResult(
        creator_id=candidate.id,
        display_name=candidate.display_name,
        match_score=score,
        reasons=reasons,
        matched_constraints=matched_constraints,
        warnings=warnings,
    )


def match_creators(session: Session, request: AIMatchRequest) -> list[CreatorMatchResult]:
    candidates = find_candidates(session, request)
    results = [score_candidate(session, c, request) for c in candidates]
    results.sort(key=lambda r: r.match_score, reverse=True)
    return results[: request.limit]
