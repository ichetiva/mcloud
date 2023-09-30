from typing import Annotated

from fastapi import APIRouter, UploadFile, Depends, Body, File, HTTPException

from schemes import OkResp
from schemes.album import AlbumResp, CreateAlbum, UpdateAlbum
from dto import UserDTO, AlbumDTO, TrackDTO
from dependencies import (
    get_current_user,
    get_services,
    valid_author_album_id,
    valid_author_track_id,
    valid_author_or_published_album_id,
)
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


@router.get("/{album_id}", response_model=AlbumResp)
async def get_album(
    album: Annotated[AlbumDTO, Depends(valid_author_or_published_album_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    tracks = await services.track_service.get_by_album_id(album.id)
    album.tracks = tracks
    return album


@router.put("/{album_id}", response_model=AlbumResp)
async def update_album(
    album: Annotated[AlbumDTO, Depends(valid_author_album_id)],
    data: Annotated[UpdateAlbum, Body()],
    poster_file: Annotated[UploadFile | None, File()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    album = await services.album_service.update(album, data.title, poster_file)
    return album


@router.put("/{album_id}/remove/{track_id}", response_model=OkResp)
async def remove_track_from_album(
    album: Annotated[AlbumDTO, Depends(valid_author_album_id)],
    track: Annotated[TrackDTO, Depends(valid_author_track_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    await services.album_track_service.remove(album.id, track.id)
    return {"ok": True}


@router.put("/{album_id}/add/{track_id}", response_model=OkResp)
async def add_track_from_album(
    album: Annotated[AlbumDTO, Depends(valid_author_album_id)],
    track: Annotated[TrackDTO, Depends(valid_author_track_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    await services.album_track_service.add(album.id, track.id)
    return {"ok": True}


@router.delete("/{album_id}", response_model=OkResp)
async def delete_album(
    album: Annotated[AlbumDTO, Depends(valid_author_album_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.album_service.delete(album)
    return {"ok": ok}
