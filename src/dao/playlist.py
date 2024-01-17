from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import Playlist


class PlaylistDAO(BaseDAO[Playlist]):
    def __init__(self, session: AsyncSession):
        super().__init__(Playlist, session)

    async def create(
        self,
        user_id: int,
        title: str,
        description: str = None,
        poster_url: str = None,
        is_private: bool = True,
    ) -> Playlist:
        playlist = Playlist(
            user_id=user_id,
            title=title,
            description=description,
            poster_url=poster_url,
            is_private=is_private,
        )
        self.session.add(playlist)
        return playlist

    async def get_by_title(self, user_id: int, title: str, limit: int = None, offset: int = None):
        stmt = select(self.model).where(
            self.model.title.ilike(f"%{title}%")
            & ((self.model.is_private == False) | (self.model.is_private == True & self.model.user_id == user_id))
        )
        if limit:
            stmt = stmt.limit(limit)
        if offset:
            stmt = stmt.offset(offset)
        result = await self.session.scalars(stmt)
        return result.all()
