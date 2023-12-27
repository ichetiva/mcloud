from typing import TYPE_CHECKING

from fastapi import UploadFile

from dao import DAOFactory
from dto import PlaylistDTO, TrackDTO
from models import Playlist

if TYPE_CHECKING:
    from services import ServicesFactory


class PlaylistService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    def convert(
        self, playlist: Playlist | PlaylistDTO, tracks: list[TrackDTO] = None
    ) -> PlaylistDTO:
        playlist_dto = PlaylistDTO(
            id=playlist.id,
            user_id=playlist.user_id,
            title=playlist.title,
            description=playlist.description,
            poster_url=playlist.poster_url,
            is_private=playlist.is_private,
            tracks=tracks or [],
        )
        return playlist_dto

    def convert_multiple(self, playlists: list[Playlist]) -> list[PlaylistDTO]:
        return [self.convert(playlist) for playlist in playlists]

    async def get(self, playlist_id: int) -> PlaylistDTO:
        playlist = await self.daos.playlist_dao.get(id=playlist_id)
        return self.convert(playlist)

    async def create(
        self,
        user_id: int,
        title: str,
        description: str | None,
        poster: UploadFile | None,
        is_private: bool = False,
    ) -> PlaylistDTO:
        poster_url = (
            await self.services.storage_service.save_poster(
                poster, user_id, title, "playlist"
            )
            if poster
            else ""
        )
        playlist = await self.daos.playlist_dao.create(
            user_id, title, description, poster_url, is_private
        )
        await self.daos.session.commit()
        await self.daos.session.refresh(playlist)
        return self.convert(playlist)

    async def delete(self, playlist: PlaylistDTO) -> bool:
        try:
            await self.daos.playlist_dao.delete(playlist.id)
            await self.daos.session.commit()
            return True
        except:
            return False

    async def update(
        self,
        playlist: PlaylistDTO,
        title: str | None,
        description: str | None,
        poster: UploadFile | None,
    ):
        playlist = await self.daos.playlist_dao.get(for_update=True, id=playlist.id)
        if title:
            playlist.title = title
        if description:
            playlist.description = description
        if poster:
            poster_url = await self.services.storage_service.save_poster(
                poster, playlist.user_id, playlist.title, "playlist"
            )
            playlist.poster_url = poster_url
        await self.daos.session.commit()
        return self.convert(playlist)

    async def get_by_user_id(self, user_id: int) -> list[PlaylistDTO]:
        playlists = await self.services.playlist_service.get_by_user_id(user_id)
        return self.convert_multiple(playlists)

    async def get_by_title(
        self, title: str, limit: int = None, offset: int = None
    ) -> list[PlaylistDTO]:
        playlists = await self.daos.playlist_dao.get_by_title(title, limit, offset)
        return self.convert_multiple(playlists)
