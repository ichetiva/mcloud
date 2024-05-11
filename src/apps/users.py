from typing import Annotated, List

from fastapi import APIRouter, Body, Query, Depends, Path

from schemes import OkResp
from schemes.user import UserResp, CreateUser, ChangePassword
from services import ServicesFactory
from dependencies import get_services, get_current_user
from dto import UserDTO

router = APIRouter(
    prefix="/api/users",
    tags=["users"],
)


@router.post("/", response_model=UserResp)
async def sign_up_user(
    data: Annotated[CreateUser, Body()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    user = await services.user_service.create(data.username, data.email, data.password)
    playlist = await services.playlist_service.create(
        user.id, "Favourite", "The tracks you liked", None, True
    )


@router.get("/me", response_model=UserResp)
async def get_me(user: Annotated[UserDTO, Depends(get_current_user)]):
    return user


@router.get("/{id}", response_model=UserResp)
async def get_user_by_id(id: Annotated[int, Path()], services: Annotated[ServicesFactory, Depends(get_services)]):
    user = await services.user_service.get_by_id(id)
    return user


@router.delete("/me", response_model=OkResp)
async def delete_me(
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.user_service.delete(user.id)
    return {"ok": ok}


@router.put("/change/password", response_model=OkResp)
async def change_current_user_password(
    data: Annotated[ChangePassword, Body()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.user_service.change_password(
        user, data.old_password, data.new_password1, data.new_password2
    )
    return {"ok": ok}


@router.get("/find", response_model=List[UserResp])
async def find_users(
    q: Annotated[str, Query()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    return await services.user_service.find(q)
