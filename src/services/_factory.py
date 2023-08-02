from dao import DAOFactory
from .auth import AuthSerivce
from .user import UserService
from .user_subscriber import UserSubscriberSerivce


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
