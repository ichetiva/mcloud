from dao import DAOFactory
from .auth import AuthSerivce
from .user import UserService
from .user_subscriber import UserSubscriberSerivce
from .track import TrackService
from .file import FileService


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
        return TrackService(self.daos)

    @property
    def file_service(self) -> FileService:
        return FileService()
