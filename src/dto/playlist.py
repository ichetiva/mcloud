from pydantic import BaseModel

from dto import TrackDTO


class PlaylistDTO(BaseModel):
    id: int
    user_id: int
    title: str
    description: str | None
    poster_url: str | None
    is_private: bool
    tracks: list[TrackDTO] = []
