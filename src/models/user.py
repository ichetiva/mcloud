from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from .base import Base
from ._mixins import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(256))
    email = Column(String(256), unique=True)
    is_admin = Column(Boolean, default=False)
    favourite_playlist_id = Column(Integer, ForeignKey("playlists.id"))
