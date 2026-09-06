from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_session
from app.schemas.common import Page
from app.schemas.creator import CreatorProfileDetail
from app.schemas.search import SearchRequest
from app.services import search_service

router = APIRouter(tags=["search"])


@router.post(
    "/search", response_model=Page[CreatorProfileDetail], summary="Plain keyword search across creators"
)
def search(payload: SearchRequest, session: Session = Depends(get_session)) -> Page[CreatorProfileDetail]:
    return search_service.keyword_search(session, payload.query)
