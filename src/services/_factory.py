from dao import DAOFactory
from .auth import AuthSerivce
from .album import AlbumService
from .album_track import AlbumTrackService
from .user import UserService
from .user_subscriber import UserSubscriberSerivce
from .track import TrackService
from .storage import StorageService
from .playlist import PlaylistService
from .playlist_track import PlaylistTrackService


class ServicesFactory:
    def __init__(self, daos: DAOFactory) -> None:
        self.daos = daos

    @property
    def auth_service(self) -> AuthSerivce:
        return AuthSerivce(self.daos, self)

    @property
    def user_service(self) -> UserService:
        return UserService(self.daos, self)

    @property
    def user_subscriber_service(self) -> UserSubscriberSerivce:
        return UserSubscriberSerivce(self.daos, self)

    @property
    def track_service(self) -> TrackService:
        return TrackService(self.daos, self)

    @property
    def album_service(self) -> AlbumService:
        return AlbumService(self.daos)

    @property
    def album_track_service(self) -> AlbumTrackService:
        return AlbumTrackService(self.daos)

    @property
    def storage_service(self) -> StorageService:
        return StorageService()

    @property
    def playlist_service(self) -> PlaylistService:
        return PlaylistService(self.daos, self)

    @property
    def playlist_track_service(self) -> PlaylistTrackService:
        return PlaylistTrackService(self.daos, self)
