from datetime import datetime

from pydantic import BaseModel


class TrackDTO(BaseModel):
    id: int
    user_id: int
    title: str
    poster_url: str | None
    track_url: str | None
    is_published: bool
    created_at: datetime
    updated_at: datetime | None
