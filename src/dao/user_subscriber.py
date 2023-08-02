from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import UserSubscriber, User


class UserSubscriberDAO(BaseDAO[UserSubscriber]):
    def __init__(self, session: AsyncSession):
        super().__init__(UserSubscriber, session)

    async def get_subscribers(self, username: str) -> list[User]:
        stmt = select(User).where(
            (User.username == username) & (UserSubscriber.user_id == User.id)
        )
        result = await self.session.scalars(stmt)
        return result.all()

    async def get_subscribing(self, username: str) -> list[User]:
        stmt = select(User).where(
            (User.username == username) & (UserSubscriber.subscriber_id == User.id)
        )
        result = await self.session.scalars(stmt)
        return result.all()
