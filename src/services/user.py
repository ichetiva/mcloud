from typing import TYPE_CHECKING

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

from dao import DAOFactory
from models import User
from dto import UserDTO

if TYPE_CHECKING:
    from services import ServicesFactory


class UserService:
    def __init__(self, daos: DAOFactory, services: "ServicesFactory") -> None:
        self.daos = daos
        self.services = services

    def convert(self, user: User) -> UserDTO:
        return UserDTO(
            id=user.id,
            username=user.usernmae,
            password=user.password,
            email=user.email,
            is_admin=user.is_admin,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )

    async def get(self, username: str) -> UserDTO | None:
        user = await self.daos.user_dao.get(username=username)
        return self.convert(user)

    async def create(self, username: str, email: str, password: str) -> UserDTO:
        user_already_exists = HTTPException(
            status_code=409,
            detail="User already exists",
        )
        try:
            user, created = await self.daos.user_dao.get_or_create(
                defaults={
                    "email": email,
                    "password": self.services.auth_service.hash_password(password),
                },
                username=username,
            )
        except IntegrityError:
            raise user_already_exists
        if not created:
            raise user_already_exists
        return self.convert(user)
