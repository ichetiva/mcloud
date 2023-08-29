from pydantic import BaseModel

from .track import TrackDTO


class AlbumDTO(BaseModel):
    id: int
    title: str
    is_published: bool
    tracks: list[TrackDTO] = []

    class Config:
        orm_mode = True
