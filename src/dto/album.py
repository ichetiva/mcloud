from pydantic import BaseModel

from .track import TrackDTO


class AlbumDTO(BaseModel):
    id: int
    user_id: int
    title: str
    is_published: bool
    tracks: list[TrackDTO] = []

    class Config:
        orm_mode = True
