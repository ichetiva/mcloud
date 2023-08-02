from dao import DAOFactory
from .user import UserService
from .auth import AuthSerivce


class ServicesFactory:
    def __init__(self, daos: DAOFactory) -> None:
        self.daos = daos

    @property
    def user_service(self) -> UserService:
        return UserService(self.daos, self)

    @property
    def auth_service(self) -> AuthSerivce:
        return AuthSerivce(self.daos, self)
