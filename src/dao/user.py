from sqlalchemy.ext.asyncio import AsyncSession

from .base import BaseDAO
from models import User


class UserDAO(BaseDAO[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(User, session)
