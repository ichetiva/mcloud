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
        description: str | None,
        poster_url: str | None,
        is_private: bool,
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
