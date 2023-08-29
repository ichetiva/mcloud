import pytest
from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.models import User


@pytest.mark.asyncio
async def test_sign_up(async_client: AsyncClient, async_session: AsyncSession):
    resp = await async_client.post(
        "/api/users/",
        json={"username": "admin", "password": "admin", "email": "admin@gmail.com"},
    )
    assert resp.status_code == 200

    users = (await async_session.scalars(select(User))).all()
    assert len(users) == 1
    assert users[0].username == "admin"
    assert users[0].email == "admin@gmail.com"
