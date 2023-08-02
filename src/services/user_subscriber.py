from typing import TYPE_CHECKING

from dao import DAOFactory
from dto import UserDTO

if TYPE_CHECKING:
    from services import ServicesFactory


class UserSubscriberSerivce:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    async def subscribe(self, user_id: int, subscribe_to: str) -> bool:
        user_to_subscribe = await self.services.user_service.get(subscribe_to)
        if not user_to_subscribe:
            return False
        _, created = await self.daos.user_subscriber_dao.get_or_create(
            user_id=user_to_subscribe.id, subscriber_id=user_id
        )
        if not created:
            return False
        await self.daos.session.commit()
        return True

    async def unsubscribe(self, user_id: int, unsubscribe_from: str) -> bool:
        user_to_unsubscribe = await self.services.user_service.get(unsubscribe_from)
        if not user_to_unsubscribe:
            return False
        user_subscriber = await self.daos.user_subscriber_dao.get(
            user_id=user_to_unsubscribe.id, subscriber_id=user_id
        )
        if not user_subscriber:
            return False
        await self.daos.session.delete(user_subscriber)
        await self.daos.session.commit()
        return True

    async def get_subscribers(self, username: str) -> list[UserDTO]:
        users = await self.daos.user_subscriber_dao.get_subscribers(username)
        return self.services.user_service.convert_multiple(users)

    async def get_subscribing(self, username: str) -> list[UserDTO]:
        users = await self.daos.user_subscriber_dao.get_subscribing(username)
        return self.services.user_service.convert_multiple(users)
