from typing import TYPE_CHECKING

from dao import DAOFactory
from dto import AlbumDTO

if TYPE_CHECKING:
    from services import ServicesFactory


class AlbumTrackService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    async def add_multiple(
        self, album: AlbumDTO, track_ids: list[int], publish_after_creation: bool
    ) -> AlbumDTO:
        tracks_dto = await self.services.track_service.get_by_ids(track_ids)
        for track in tracks_dto:
            await self.daos.album_track_dao.create(album.id, track.id)
            await self.daos.track_dao.update(
                track.id, is_published=publish_after_creation
            )
        await self.daos.session.commit()
        return self.services.album_service.convert(album, tracks_dto)

    async def add(self, album_id: int, track_id: int):
        await self.daos.album_track_dao.create(album_id=album_id, track_id=track_id)
        await self.daos.session.commit()

    async def remove(self, album_id: int, track_id: int):
        await self.daos.album_track_dao.delete(album_id=album_id, track_id=track_id)
        await self.daos.session.commit()
