from typing import TYPE_CHECKING
from datetime import datetime, timedelta

from passlib.context import CryptContext
from jose import jwt

import config
from dao import DAOFactory

if TYPE_CHECKING:
    from services import ServicesFactory


class AuthSerivce:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def verify_password(self, plain_password, hashed_password) -> bool:
        return self.pwd_context.verify(plain_password, hashed_password)

    def hash_password(self, password) -> str:
        return self.pwd_context.hash(password)

    def create_access_token(self, data: dict) -> str:
        to_encode = data.copy()
        to_encode.update(
            {
                "exp": datetime.now()
                + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
            }
        )
        encoded_jwt = jwt.encode(
            to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM
        )
        return encoded_jwt

    async def authenticate(self, login_type: str, login: str, password: str):
        user = await self.services.user_service.get_to_authenticate(login_type, login)
        if not user:
            return False
        if not self.verify_password(password, user.password):
            return False
        return user
