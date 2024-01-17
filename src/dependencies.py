from typing import AsyncGenerator, Annotated

from fastapi import HTTPException, Depends, status, Path
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError

import config
from database import async_session
from services import ServicesFactory
from dao import DAOFactory
from dto import TrackDTO, UserDTO, AlbumDTO

oauth2_scheme = HTTPBearer()


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
    auth: Annotated[HTTPAuthorizationCredentials, Depends(oauth2_scheme)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            auth.credentials, config.SECRET_KEY, algorithms=[config.ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await services.user_service.get(username=username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_user_or_none(
    auth: Annotated[HTTPAuthorizationCredentials, Depends(oauth2_scheme)],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    try:
        user = await get_current_user(auth, services)
        return user
    except:
        return None


async def valid_track_id(
    track_id: Annotated[int, Path()],
    services: Annotated[ServicesFactory, Depends(get_services)],
) -> TrackDTO:
    track_not_found = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Track not found",
    )
    track = await services.track_service.get(track_id)
    if not track:
        raise track_not_found
    if not track.is_published:
        raise track_not_found
    return track


async def valid_author_track_id(
    track_id: Annotated[int, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
) -> TrackDTO:
    track = await services.track_service.get(track_id)
    if not track:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Track not found",
        )
    if track.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You have no permissions to delete this track",
        )
    return track


async def valid_author_album_id(
    album_id: Annotated[int, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
) -> AlbumDTO:
    album = await services.album_service.get(album_id)
    if not album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Album not found",
        )
    if album.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You have no permissions to delete this album",
        )
    return album


async def valid_author_or_published_album_id(
    album_id: Annotated[int, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
) -> AlbumDTO:
    album = await services.album_service.get(album_id)
    if not album or (album.is_published is False and album.user_id != user.id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Album not found",
        )
    if album.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You have no permissions to delete this album",
        )
    return album


async def valid_author_playlist_id(
    playlist_id: Annotated[int, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
) -> AlbumDTO:
    playlist = await services.playlist_service.get(playlist_id)
    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Playlist not found",
        )
    if playlist.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You have no permissions to delete this playlist",
        )
    return playlist


async def valid_author_or_published_playlist_id(
    playlist_id: Annotated[int, Path()],
    user: Annotated[UserDTO, Depends(get_current_user)],
    services: Annotated[ServicesFactory, Depends(get_services)],
) -> AlbumDTO:
    playlist = await services.playlist_service.get(playlist_id)
    if not playlist or (playlist.is_private is True and playlist.user_id != user.id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Playlist not found",
        )
    if playlist.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You have no permissions to delete this playlist",
        )
    return playlist
