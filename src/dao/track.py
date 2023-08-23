from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import Track, User


class TrackDAO(BaseDAO[Track]):
    def __init__(self, session: AsyncSession):
        super().__init__(Track, session)

    async def create(
        self,
        user_id: int,
        title: str,
        poster_url: str,
        track_url: str,
    ) -> Track:
        track = Track(
            user_id=user_id,
            title=title,
            poster_url=poster_url,
            track_url=track_url,
        )
        self.session.add(track)
        return track

    async def get_by_username(self, username: str) -> list[Track]:
        stmt = select(Track).where(
            (Track.user_id == User.id)
            & (User.username == username)
            & (Track.is_published == True)
        )
        result = await self.session.scalars(stmt)
        return result.all()

    async def get_current_user_tracks(self, user_id: int) -> list[Track]:
        stmt = select(Track).where(Track.user_id == user_id)
        result = await self.session.scalars(stmt)
        return result.all()

    async def delete(self, track_id: int):
        stmt = delete(Track).where(Track.id == track_id)
        await self.session.execute(stmt)
