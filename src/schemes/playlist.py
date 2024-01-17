from pydantic import BaseModel

from schemes.track import TrackResp


class CreatePlaylist(BaseModel):
    title: str
    description: str
    tracks: list[int]


class UpdatePlaylist(BaseModel):
    title: str | None
    description: str | None


class PlaylistResp(BaseModel):
    id: int
    user_id: int
    title: str
    description: str
    poster_url: str
    tracks: list[TrackResp]
    is_private: bool

    class Config:
        orm_mode = True
