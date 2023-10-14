from typing import TYPE_CHECKING

from fastapi import UploadFile

from dao import DAOFactory
from dto import UserDTO, TrackDTO
from models import Track

if TYPE_CHECKING:
    from services import ServicesFactory


class TrackService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    def convert(self, track: Track) -> TrackDTO:
        return TrackDTO(
            id=track.id,
            user_id=track.user_id,
            title=track.title,
            poster_url=track.poster_url,
            track_url=track.track_url,
            is_published=track.is_published,
            created_at=track.created_at,
            updated_at=track.updated_at,
        )

    def convert_multiple(self, tracks: list[Track]) -> list[TrackDTO]:
        return [self.convert(track) for track in tracks]

    async def create(
        self,
        user: UserDTO,
        title: str,
        publish_after_creation: bool,
        poster: UploadFile,
        track: UploadFile,
    ) -> TrackDTO:
        poster_url = await self.services.storage_service.save_poster(
            poster, user.id, title, "track"
        )
        track_url = await self.services.storage_service.save_track(
            track, user.id, title
        )
        track = await self.daos.track_dao.create(
            user.id, title, publish_after_creation, poster_url, track_url
        )
        await self.daos.session.commit()
        await self.daos.session.refresh(track)
        return self.convert(track)

    async def get_by_username(self, username: str) -> list[TrackDTO]:
        tracks = await self.daos.track_dao.get_by_username(username)
        return self.convert_multiple(tracks)

    async def get_current_user_tracks(self, user: UserDTO) -> list[TrackDTO]:
        tracks = await self.daos.track_dao.get_current_user_tracks(user.id)
        return self.convert_multiple(tracks)

    async def get(self, track_id: int) -> TrackDTO:
        track = await self.daos.track_dao.get(id=track_id)
        if not track:
            return None
        return self.convert(track)

    async def delete(self, track: TrackDTO) -> bool:
        try:
            await self.daos.track_dao.delete(track.id)
            await self.daos.session.commit()
            return True
        except:
            return False

    async def update(
        self,
        track_id: int,
        title: str | None,
        poster: UploadFile | None,
        track: UploadFile | None,
    ) -> TrackDTO:
        track = self.daos.track_dao.get(for_update=True, id=track_id)
        if title:
            track.title = title
        if poster:
            poster_url = await self.services.storage_service.save_poster(
                poster, track.user_id, track.title, "track"
            )
            track.poster_url = poster_url
        if track:
            track_url = await self.services.storage_service.save_track(
                track, track.user_id, track.title
            )
            track.track_url = track_url
        await self.daos.session.commit()
        await self.daos.session.refresh(track)
        return self.convert(track)

    async def get_by_ids(self, track_ids: list[int]) -> list[TrackDTO]:
        tracks = await self.daos.track_dao.get_by_ids(track_ids)
        return self.convert_multiple(tracks)

    async def get_by_album_id(self, album_id: int) -> list[TrackDTO]:
        tracks = await self.daos.album_track_dao.get_by_album_id(album_id)
        return self.convert_multiple(tracks)

    async def get_by_playlist_id(self, playlist_id: int) -> list[TrackDTO]:
        tracks = await self.daos.playlist_track_dao.get_by_playlist_id(playlist_id)
        return self.convert_multiple(tracks)
