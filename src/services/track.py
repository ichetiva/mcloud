from dao import DAOFactory
from dto import UserDTO, TrackDTO
from models import Track
from services import ServicesFactory


class TrackService:
    def __init__(self, daos: DAOFactory, services: ServicesFactory) -> None:
        self.daos = daos
        self.services = services

    def convert(self, track: Track) -> TrackDTO:
        return TrackDTO(
            id=track.id,
            user_id=track.user_id,
            title=track.title,
            poster_path=track.poster_path,
            is_published=track.is_published,
            created_at=track.created_at,
            updated_at=track.updated_at,
        )

    def convert_multiple(self, tracks: list[Track]) -> list[TrackDTO]:
        return [self.convert(track) for track in tracks]

    async def create(self, user: UserDTO, title: str, poster: str):
        poster_path = await self.services.file_service.save(
            "poster", poster, user.id, title
        )
        track_path = await self.services.file_service.save(
            "track", track, user.id, title
        )
        track = await self.daos.track_dao.create(user.id, title, path)
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
