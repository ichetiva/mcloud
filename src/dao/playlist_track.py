from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import PlaylistTrack, Track


class PlaylistTrackDAO(BaseDAO[PlaylistTrack]):
    def __init__(self, session: AsyncSession):
        super().__init__(PlaylistTrack, session)

    async def create(self, playlist_id: int, track_id: int) -> PlaylistTrack:
        playlist_track = PlaylistTrack(playlist_id=playlist_id, track_id=track_id)
        self.session.add(playlist_track)
        return playlist_track

    async def get_by_playlist_id(self, playlist_id: int) -> PlaylistTrack:
        stmt = select(Track).where(PlaylistTrack.playlist_id == playlist_id)
        result = await self.session.scalars(stmt)
        return result.all()
