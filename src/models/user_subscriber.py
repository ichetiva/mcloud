from sqlalchemy import Column, Integer, ForeignKey
from .base import Base


class UserSubscriber(Base):
    __tablename__ = "user_subscribers"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    subscriber_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
