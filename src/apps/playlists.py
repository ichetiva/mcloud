from typing import Annotated

from fastapi import APIRouter, Depends

from dto import UserDTO
from dependencies import get_current_user, get_services
from services import ServicesFactory

router = APIRouter(
    prefix="/api/playlists",
    tags=["playlists"],
)


@router.get("/")
async def get_user_playlists(
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    playlists = await services.playlist_service.get_by_user_id(user.id)
    return playlists
