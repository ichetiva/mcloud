from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends, Body, status

from schemes.auth import AuthResp, AuthReq
from services import ServicesFactory
from dependencies import get_services

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
)


@router.post("/token", response_model=AuthResp)
async def get_access_token(
    data: Annotated[AuthReq, Body()],
    services: Annotated[ServicesFactory, Depends(get_services)],
):
    user = await services.auth_service.authenticate(
        data.login_type, data.login, data.password
    )
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
