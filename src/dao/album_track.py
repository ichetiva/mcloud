from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import AlbumTrack


class AlbumTrackDAO(BaseDAO[AlbumTrack]):
    def __init__(self, session: AsyncSession):
        super().__init__(AlbumTrack, session)

    async def create(self, album_id: int, track_id: int) -> AlbumTrack:
        album_track = AlbumTrack(album_id=album_id, track_id=track_id)
        self.session.add(album_track)
        return album_track
