from typing import Annotated, List

from fastapi import APIRouter, Body, Query, Path, Depends

from schemes.user import UserResp, CreateUser
from services import ServicesFactory
from dependencies import get_services, get_current_user
from dto import UserDTO

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
)


@router.post("/sign_up", response_model=UserResp)
async def sign_up_user(
    data: Annotated[CreateUser, Body()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    return await services.user_service.create(data.username, data.email, data.password)


@router.get("/me", response_model=UserResp)
async def get_me(user: Annotated[UserDTO, Depends(get_current_user)]):
    return user


@router.get("/find", response_model=List[UserResp])
async def find_users(
    q: Annotated[str, Query()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    return await services.user_service.find(q)
