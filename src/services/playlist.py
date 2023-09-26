from typing import TYPE_CHECKING

from fastapi import UploadFile

from dao import DAOFactory
from dto import PlaylistDTO
from models import Playlist

if TYPE_CHECKING:
    from services import ServicesFactory


class PlaylistService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    def convert(self, playlist: Playlist) -> PlaylistDTO:
        playlist_dto = PlaylistDTO(
            id=playlist.id,
            user_id=playlist.user_id,
            title=playlist.title,
            description=playlist.description,
            poster_url=playlist.poster_url,
            is_private=playlist.is_private,
        )
        return playlist_dto

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
