from sqlalchemy import Column, Integer, ForeignKey, String, Boolean

from .base import Base
from ._mixins import TimestampMixin


class Album(Base, TimestampMixin):
    __tablename__ = "albums"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String(256), nullable=False)
    poster_url = Column(String(512), nullable=False)
    is_published = Column(Boolean, default=False)
