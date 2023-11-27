from typing import Annotated

from fastapi import (
    APIRouter,
    Body,
    UploadFile,
    Depends,
    File,
    Path,
    HTTPException,
    Query,
)
from pydantic import Json

from schemes import OkResp
from schemes.track import TrackResp, CreateTrack, UpdateTrack
from dependencies import (
    get_services,
    get_current_user,
    valid_track_id,
    valid_author_track_id,
)
from services import ServicesFactory
from dto import UserDTO, TrackDTO

router = APIRouter(
    prefix="/api/tracks",
    tags=["tracks"],
)


@router.post("/", response_model=TrackResp)
async def create_track(
    user: Annotated[UserDTO, Depends(get_current_user)],
    data: Annotated[Json[CreateTrack], Body()],
    poster_file: Annotated[UploadFile, File()],
    track_file: Annotated[UploadFile, File()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    if poster_file.content_type != "image/jpeg":
        raise HTTPException(
            status_code=400,
            detail="The poster requires \"jpeg\" or \"jpg\" format",
        )
    if track_file.content_type != "audio/mpeg":
        raise HTTPException(status_code=400, detail="The track requires \"mp3\" format")
    track = await services.track_service.create(
        user, data.title, data.publish_after_creation, poster_file, track_file
    )
    return track


@router.put("/{track_id}", response_model=TrackResp)
async def update_track(
    track: Annotated[TrackDTO, Depends(valid_author_track_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
    data: Annotated[UpdateTrack, Body()],
    poster_file: Annotated[UploadFile | None, File()],
    track_file: Annotated[UploadFile | None, File()],
):
    track = await services.track_service.update(
        track.id, data.title, poster_file, track_file
    )
    return track


@router.delete("/{track_id}", response_model=OkResp)
async def delete_track(
    track: Annotated[TrackDTO, Depends(valid_author_track_id)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    ok = await services.track_service.delete(track)
    return {"ok": ok}


@router.get("/", response_model=list[TrackResp])
async def get_current_user_tracks(
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    tracks = await services.track_service.get_current_user_tracks(user)
    return tracks


@router.get("/search", response_model=list[TrackResp])
async def search_track(
    services: Annotated[ServicesFactory, Depends(get_services)],
    q: Annotated[str, Query()] = "",
    offset: Annotated[int | None, Query()] = None,
    limit: Annotated[int | None, Query()] = None,
):
    tracks = await services.track_service.search(q, offset, limit)
    return tracks


@router.get("/{username}", response_model=list[TrackResp])
async def get_any_user_published_tracks(
    username: Annotated[str, Path()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    tracks = await services.track_service.get_by_username(username)
    return tracks


@router.get("/{track_id}", response_model=TrackResp)
async def get_track(
    track: Annotated[TrackDTO, Depends(valid_track_id)],
):
    return track
