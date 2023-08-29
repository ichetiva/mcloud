from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import Album


class AlbumDAO(BaseDAO[Album]):
    def __init__(self, session: AsyncSession):
        super().__init__(Album, session)
    
    async def create(self, user_id: int, title: str, publish_after_creation: bool, poster_url: str) -> Album
        album = Album(
            user_id=user_id,
            title=title,
            is_published=publish_after_creation,
            poster_url=poster_url
        )
        self.session.add(album)
        return album
