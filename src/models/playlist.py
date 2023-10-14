from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from .base import Base


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title = Column(String(256), nullable=False)
    description = Column(String(1024), nullable=True)
    poster_url = Column(String(512), nullable=True)
    is_private = Column(Boolean, default=False)
