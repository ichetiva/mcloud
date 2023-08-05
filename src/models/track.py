from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from ._mixins import TimestampMixin
from .base import Base


class Track(Base, TimestampMixin):
    __tablename__ = "tracks"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String(256), nullable=False)
    poster_path = Column(String(512), nullable=True)
    track_path = Column(String(512), nullable=True)
    is_published = Column(Boolean, default=False)
