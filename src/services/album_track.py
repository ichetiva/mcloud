from dao import DAOFactory
from dto import AlbumDTO


class AlbumTrackService:
    def __init__(self, daos: DAOFactory) -> None:
        self.daos = daos

    async def add_multiple(
        self, album: AlbumDTO, tracks: list[int], publish_after_creation: bool
    ) -> AlbumDTO:
        for track_id in tracks:
            await self.daos.album_track_dao.create(album.id, track_id)
            await self.daos.track_dao.update(
                track_id, is_published=publish_after_creation
            )
        await self.daos.session.commit()
        return album
