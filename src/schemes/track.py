from datetime import datetime

from pydantic import BaseModel


class CreateTrack(BaseModel):
    title: str
    publish_after_creation: bool


class UpdateTrack(BaseModel):
    title: str | None


class TrackResp(BaseModel):
    id: int
    user_id: int
    title: str
    poster_path: str | None
    is_published: bool
    created_at: datetime
    updated_at: datetime | None

    class Config:
        orm_mode = True
