from pydantic import BaseModel


class OkResp(BaseModel):
    ok: bool
