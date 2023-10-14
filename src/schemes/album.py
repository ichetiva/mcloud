from pydantic import BaseModel

from schemes.track import TrackResp


class CreateAlbum(BaseModel):
    title: str
    tracks: list[int]
    publish_after_creation: bool


class UpdateAlbum(BaseModel):
    title: str | None


class AlbumResp(BaseModel):
    id: int
    title: str
    tracks: list[TrackResp]

    class Config:
        orm_mode = True
