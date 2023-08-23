from datetime import datetime

from pydantic import BaseModel


class ChangePassword(BaseModel):
    old_password: str
    new_password1: str
    new_password2: str


class CreateUser(BaseModel):
    username: str
    email: str
    password: str


class UserResp(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True
