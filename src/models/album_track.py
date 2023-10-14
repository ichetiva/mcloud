from sqlalchemy import Column, Integer, ForeignKey

from .base import Base


class AlbumTrack(Base):
    __tablename__ = "album_tracks"

    id = Column(Integer, primary_key=True)
    album_id = Column(Integer, ForeignKey("albums.id", ondelete="CASCADE"))
    track_id = Column(Integer, ForeignKey("tracks.id", ondelete="CASCADE"))
