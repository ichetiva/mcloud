from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from schemes.auth import AuthResp
from services import ServicesFactory
from dependencies import get_services

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)


@router.post("/token", response_model=AuthResp)
async def get_access_token(
    data: Annotated[OAuth2PasswordRequestForm, Depends()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    user = await services.auth_service.authenticate(data.username, data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = services.auth_service.create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}
