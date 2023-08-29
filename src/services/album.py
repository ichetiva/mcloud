from typing import TYPE_CHECKING

from fastapi import UploadFile

from dao import DAOFactory
from dto import UserDTO, AlbumDTO
from models import Album

if TYPE_CHECKING:
    from services import ServicesFactory


class AlbumService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    def convert(self, album: Album) -> AlbumDTO:
        return AlbumDTO(
            id=album.id,
            title=album.title,
            is_published=album.is_published,
            tracks=[],
        )

    async def create(
        self,
        user: UserDTO,
        title: str,
        publish_after_creation: bool,
        poster: UploadFile,
    ) -> AlbumDTO:
        poster_url = await self.services.storage_service.save_poster(
            poster, user.id, title, "album"
        )
        album = await self.daos.album_dao.create(
            user.id, title, publish_after_creation, poster_url
        )
        await self.daos.session.commit()
        await self.daos.session.refresh(album)
        return self.convert(album)
