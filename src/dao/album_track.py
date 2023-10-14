from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import AlbumTrack, Track


class AlbumTrackDAO(BaseDAO[AlbumTrack]):
    def __init__(self, session: AsyncSession):
        super().__init__(AlbumTrack, session)

    async def create(self, album_id: int, track_id: int) -> AlbumTrack:
        album_track = AlbumTrack(album_id=album_id, track_id=track_id)
        self.session.add(album_track)
        return album_track

    async def get_by_album_id(self, album_id: int) -> AlbumTrack:
        stmt = select(Track).where(AlbumTrack.album_id == album_id)
        result = await self.session.scalars(stmt)
        return result.all()
