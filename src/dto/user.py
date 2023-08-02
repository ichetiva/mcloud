from datetime import datetime

from pydantic import BaseModel, EmailStr


class UserDTO(BaseModel):
    id: int
    username: str
    password: str
    email: EmailStr
    is_admin: bool
    created_at: datetime
    updated_at: datetime
