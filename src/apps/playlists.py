from typing import Annotated

from fastapi import (
    APIRouter,
    UploadFile,
    Depends,
    Body,
    File,
    HTTPException,
    Query,
    Path,
)

from schemes import OkResp
from schemes.playlist import PlaylistResp, CreatePlaylist, UpdatePlaylist
from dto import UserDTO, PlaylistDTO, TrackDTO
from dependencies import (
    get_current_user,
    get_current_user_or_none,
    get_services,
    valid_author_playlist_id,
    valid_author_track_id,
    valid_author_or_published_playlist_id,
)
from services import ServicesFactory

router = APIRouter(
    prefix="/api/playlists",
    tags=["playlists"],
)


@router.post("/", response_model=PlaylistResp)
async def create_playlist(
    user: Annotated[UserDTO, Depends(get_current_user)],
    data: Annotated[CreatePlaylist, Body()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    """
    if poster_file.content_type != "image/jpeg":
        raise HTTPException(
            status_code=400,
            detail='The poster requires "jpeg" or "jpg" format',
        )
        """
    playlist = await services.playlist_service.create(
        user.id, data.title, data.description, data.is_private, None
    )
    playlist = await services.playlist_track_service.add_multiple(playlist, data.tracks)
    return playlist


@router.get("/search", response_model=list[PlaylistResp])
async def search_playlists(
    services: Annotated[ServicesFactory, Depends(get_services)],
    user: Annotated[UserDTO | None, Depends(get_current_user_or_none)],
    q: Annotated[str, Query()] = "",
    limit: Annotated[int, Query()] = None,
    offset: Annotated[int, Query()] = None,
):
    user_id = user.id if user else 0
    playlists = await services.playlist_service.get_by_title(user_id, q, limit, offset)
    return playlists


@router.get("/user/{user_id}", response_model=list[PlaylistResp])
async def get_user_playlists(
    services: Annotated[ServicesFactory, Depends(get_services)],
    user_id: Annotated[int, Path()],
):
    playlists = await services.playlist_service.get_by_user_id(user_id)
    return playlists


@router.get("/{playlist_id}", response_model=PlaylistResp)
async def get_playlist(
    playlist: Annotated[PlaylistDTO, Depends(valid_author_or_published_playlist_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    tracks = await services.track_service.get_by_playlist_id(playlist.id)
    playlist.tracks = tracks
    return playlist


@router.put("/{playlist_id}", response_model=PlaylistResp)
async def update_playlist(
    playlist: Annotated[PlaylistDTO, Depends(valid_author_playlist_id)],
    data: Annotated[UpdatePlaylist, Body()],
    poster_file: Annotated[UploadFile | None, File()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    playlist = await services.playlist_service.update(
        playlist, data.title, data.description, data.is_private, poster_file
    )
    return playlist


@router.put("/{playlist_id}/remove/{track_id}", response_model=OkResp)
async def remove_track_from_playlist(
    playlist: Annotated[PlaylistDTO, Depends(valid_author_playlist_id)],
    track: Annotated[TrackDTO, Depends(valid_author_track_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    await services.playlist_track_service.remove(playlist.id, track.id)
    return {"ok": True}


@router.put("/{playlist_id}/add/{track_id}", response_model=OkResp)
async def add_track_from_playlist(
    playlist: Annotated[PlaylistDTO, Depends(valid_author_playlist_id)],
    track: Annotated[TrackDTO, Depends(valid_author_track_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    await services.playlist_track_service.add(playlist.id, track.id)
    return {"ok": True}


@router.delete("/{playlist_id}", response_model=OkResp)
async def delete_playlist(
    playlist: Annotated[PlaylistDTO, Depends(valid_author_playlist_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.playlist_service.delete(playlist)
    return {"ok": ok}
