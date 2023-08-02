from typing import Literal

from pydantic import BaseModel


class AuthReq(BaseModel):
    login: str
    password: str
    login_type: Literal["username", "email"]


class AuthResp(BaseModel):
    access_token: str
    token_type: str
