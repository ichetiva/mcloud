from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import User


class UserDAO(BaseDAO[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def find(self, pattern: str) -> list[User]:
        query = "%{}%".format(pattern)
        stmt = select(self.model).where(self.model.username.ilike(query))
        result = await self.session.scalars(stmt)
        return result.all()
