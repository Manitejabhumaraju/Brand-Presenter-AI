from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.dependencies import get_current_user, get_session
from app.models.portfolio import PortfolioItem
from app.models.user import User
from app.schemas.portfolio import PortfolioItemCreate, PortfolioItemRead, PortfolioItemUpdate
from app.services import portfolio_service

router = APIRouter(tags=["portfolio"])


class PortfolioItemCreateRequest(PortfolioItemCreate):
    creator_id: str


@router.get(
    "/creators/{creator_id}/portfolio",
    response_model=list[PortfolioItemRead],
    summary="List a creator's portfolio",
)
def list_portfolio(creator_id: str, session: Session = Depends(get_session)) -> list[PortfolioItem]:
    return portfolio_service.list_items(session, creator_id)


@router.post("/portfolio", response_model=PortfolioItemRead, status_code=201, summary="Add a portfolio item")
def create_portfolio_item(
    payload: PortfolioItemCreateRequest,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> PortfolioItem:
    creator_id = payload.creator_id
    item_payload = PortfolioItemCreate(**payload.model_dump(exclude={"creator_id"}))
    return portfolio_service.create_item(session, user, creator_id, item_payload)


@router.patch("/portfolio/{item_id}", response_model=PortfolioItemRead, summary="Update a portfolio item")
def update_portfolio_item(
    item_id: str,
    payload: PortfolioItemUpdate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> PortfolioItem:
    return portfolio_service.update_item(session, user, item_id, payload)


@router.delete("/portfolio/{item_id}", status_code=204, summary="Delete a portfolio item")
def delete_portfolio_item(
    item_id: str,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> None:
    portfolio_service.delete_item(session, user, item_id)
