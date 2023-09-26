from pydantic import BaseModel


class PlaylistDTO(BaseModel):
    id: int
    user_id: int
    title: str
    description: str | None
    poster_url: str | None
    is_private: bool
