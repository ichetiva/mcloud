from typing import TYPE_CHECKING

from fastapi import UploadFile

from dao import DAOFactory
from dto import UserDTO, AlbumDTO, TrackDTO
from models import Album

if TYPE_CHECKING:
    from services import ServicesFactory


class AlbumService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    def convert(self, album: Album, tracks: list[TrackDTO] = []) -> AlbumDTO:
        return AlbumDTO(
            id=album.id,
            user_id=album.user_id,
            title=album.title,
            is_published=album.is_published,
            tracks=tracks,
        )

    async def get(self, album_id: int) -> AlbumDTO:
        album = await self.daos.album_dao.get(id=album_id)
        if not album:
            return None
        return self.convert(album)

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

    async def delete(self, album: AlbumDTO) -> bool:
        try:
            await self.daos.album_dao.delete(album.id)
            await self.daos.session.commit()
            return True
        except:
            return False

    async def update(self, album: AlbumDTO, title: str | None, poster: UploadFile):
        album = await self.daos.album_dao.get(for_update=True, id=album.id)
        if title:
            album.title = title
        if poster:
            poster_url = await self.services.storage_service.save_poster(
                poster, album.user_id, album.title, "album"
            )
            album.poster_url = poster_url
        await self.daos.session.commit()
        return self.convert(album)
