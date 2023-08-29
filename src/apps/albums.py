from typing import Annotated

from fastapi import APIRouter, UploadFile, Depends, Body, File, HTTPException
from pydantic import Json

from schemes.album import AlbumResp, CreateAlbum
from dto import UserDTO
from dependencies import get_current_user, get_services
from services import ServicesFactory

router = APIRouter(
    prefix="/api/albums",
    tags=["albums"],
)


@router.post("/", response_model=AlbumResp)
async def create_album(
    user: Annotated[UserDTO, Depends(get_current_user)],
    data: Annotated[CreateAlbum, Body()],
    poster_file: Annotated[UploadFile, File()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    if poster_file.content_type != "image/jpeg":
        raise HTTPException(
            status_code=400,
            detail="The poster requires \"jpeg\" or \"jpg\" format",
        )
    album = await services.album_service.create(
        user, data.title, data.publish_after_creation, poster_file
    )
    album = await services.album_track_service.add_multiple(album, data.tracks)
    return album
