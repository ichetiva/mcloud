from typing import Tuple, TypeVar, Type, Generic

from sqlalchemy import update, select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from models import Base

Model = TypeVar("Model", bound=Base)


class BaseDAO(Generic[Model]):
    def __init__(self, model: Type[Model], session: AsyncSession):
        self.model = model
        self.session = session

    async def get_all(self) -> list[Model]:
        result = await self.session.execute(select(self.model))
        return result.scalars().all()

    async def get(self, for_update: bool = False, **kwargs) -> Model | None:
        sql = select(self.model).filter_by(**kwargs)
        if for_update:
            sql = sql.with_for_update()
        result = await self.session.scalar(sql)
        return result

    async def get_or_create(
        self, defaults: dict = {}, for_update: bool = False, **kwargs
    ) -> Tuple[Model, bool]:
        instance = await self.get(for_update=for_update, **kwargs)
        if instance:
            return instance, False
        kwargs.update(defaults)
        instance = self.model(**kwargs)
        self.session.add(instance)
        return instance, True

    async def update(self, id: int, **kwargs):
        await self.session.execute(
            update(self.model).where(self.model.id == id).values(**kwargs)
        )

    async def delete(self, **kwargs):
        await self.session.execute(delete(self.model).filter_by(**kwargs))
