from typing import Annotated

from fastapi import APIRouter, Path, Depends

from dto import UserDTO
from services import ServicesFactory
from dependencies import get_current_user, get_services
from schemes import OkResp
from schemes.user import UserResp

router = APIRouter(
    prefix="/api/subscribers",
    tags=["subscribers"],
)


@router.post("/{username}/subscribe", response_model=OkResp)
async def subscribe_to_user(
    username: Annotated[str, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.user_subscriber_service.subscribe(user.id, username)
    return {"ok": ok}


@router.post("/{username}/unsubscribe", response_model=OkResp)
async def unsubscribe_from_user(
    username: Annotated[str, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.user_subscriber_service.unsubscribe(user.id, username)
    return {"ok": ok}


@router.get("/{username}", response_model=list[UserResp])
async def user_subscribers(
    username: Annotated[str, Path()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    subscribers = await services.user_subscriber_service.get_subscribers(username)
    return subscribers


@router.get("/{username}/subscribing", response_model=list[UserResp])
async def user_subscribing(
    username: Annotated[str, Path()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    subscribing = await services.user_subscriber_service.get_subscribing(username)
    return subscribing
