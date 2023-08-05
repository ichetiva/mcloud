from typing import Annotated

from fastapi import APIRouter, Body, UploadFile, Depends, File, Path

from schemes.track import TrackResp, CreateTrack
from dependencies import get_services, get_current_user, valid_track_id
from services import ServicesFactory
from dto import UserDTO, TrackDTO

router = APIRouter(
    prefix="/api/tracks",
    tags=["tracks"],
)


@router.post("/", response_model=TrackResp)
async def create_track(
    user: Annotated[UserDTO, Depends(get_current_user)],
    data: Annotated[CreateTrack, Body()],
    poster: Annotated[UploadFile, File()],
    track: Annotated[UploadFile, File()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    track = await services.track_service.create(user, data.title, poster)
    return track


@router.get("/", response_model=list[TrackResp])
async def get_current_user_tracks(
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    tracks = await services.track_service.get_current_user_tracks(user)
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
