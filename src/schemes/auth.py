from pydantic import BaseModel


class AuthResp(BaseModel):
    access_token: str
    token_type: str
