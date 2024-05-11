from typing import TYPE_CHECKING

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError

from dao import DAOFactory
from models import User, Playlist
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
            username=user.username,
            password=user.password,
            email=user.email,
            is_admin=user.is_admin,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )

    def convert_multiple(self, users: list[User]) -> list[UserDTO]:
        return [self.convert(user) for user in users]

    async def get_by_id(self, id) -> UserDTO | None:
        user = await self.daos.user_dao.get(id=id)
        return self.convert(user)

    async def get(self, username) -> UserDTO | None:
        user = await self.daos.user_dao.get(username=username)
        return self.convert(user)

    async def get_to_authenticate(self, login_type: str, login: str) -> UserDTO | None:
        if login_type == "username":
            user = await self.daos.user_dao.get(username=login)
        elif login_type == "email":
            user = await self.daos.user_dao.get(email=login)
        if not user:
            return None
        return self.convert(user)

    async def create(self, username: str, email: str, password: str) -> UserDTO:
        user_already_exists = HTTPException(
            status_code=409,
            detail="User already exists",
        )
        user, created = await self.daos.user_dao.get_or_create(
            defaults={
                "email": email,
                "password": self.services.auth_service.hash_password(password),
            },
            username=username,
        )
        if not created:
            raise user_already_exists
        try:
            await self.daos.session.commit()
        except IntegrityError:
            raise user_already_exists
        await self.daos.session.refresh(user)
        return self.convert(user)

    async def delete(self, user_id: int) -> bool:
        try:
            await self.daos.user_dao.delete(user_id)
            await self.daos.session.commit()
        except:
            return False
        return True

    async def change_password(
        self,
        user: UserDTO,
        old_password: str,
        new_password1: str,
        new_password2: str,
    ) -> bool:
        if not self.services.auth_service.verify_password(old_password, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect old password",
            )
        elif new_password1 != new_password2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password mismatch",
            )
        try:
            user = await self.services.daos.user_dao.get(for_update=True, id=user.id)
            user.password = self.services.auth_service.hash_password(new_password2)
            await self.services.daos.session.commit()
        except:
            return False
        return True

    async def find(self, pattern: str) -> list[UserDTO]:
        users = await self.daos.user_dao.find(pattern)
        return self.convert_multiple(users)
