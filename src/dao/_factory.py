from sqlalchemy.ext.asyncio import AsyncSession

from .user import UserDAO
from .user_subscriber import UserSubscriberDAO
from .track import TrackDAO
from .album import AlbumDAO
from .album_track import AlbumTrackDAO
from .playlist import PlaylistDAO
from .playlist_track import PlaylistTrackDAO


class DAOFactory:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    @property
    def user_dao(self) -> UserDAO:
        return UserDAO(self.session)

    @property
    def user_subscriber_dao(self) -> UserSubscriberDAO:
        return UserSubscriberDAO(self.session)

    @property
    def track_dao(self) -> TrackDAO:
        return TrackDAO(self.session)

    @property
    def album_dao(self) -> AlbumDAO:
        return AlbumDAO(self.session)

    @property
    def album_track_dao(self) -> AlbumTrackDAO:
        return AlbumTrackDAO(self.session)

    @property
    def playlist_dao(self) -> PlaylistDAO:
        return PlaylistDAO(self.session)

    @property
    def playlist_track_dao(self) -> PlaylistTrackDAO:
        return PlaylistTrackDAO(self.session)
