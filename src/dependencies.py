from typing import AsyncGenerator, Annotated

from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError

import config
from database import async_session
from services import ServicesFactory
from dao import DAOFactory

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
        except:
            await session.rollback()


async def get_services(
    session: Annotated[AsyncSession, Depends(get_session)]
) -> ServicesFactory:
    daos = DAOFactory(session)
    services = ServicesFactory(daos)
    return services


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await services.user_service.get(username=username)
    if user is None:
        raise credentials_exception
    return user
