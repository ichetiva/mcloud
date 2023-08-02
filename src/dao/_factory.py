from sqlalchemy.ext.asyncio import AsyncSession

from .user import UserDAO
from .user_subscriber import UserSubscriberDAO


class DAOFactory:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    @property
    def user_dao(self) -> UserDAO:
        return UserDAO(self.session)

    @property
    def user_subscriber_dao(self) -> UserSubscriberDAO:
        return UserSubscriberDAO(self.session)
