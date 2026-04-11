from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), default="user", nullable=False)
    leetcode_handle: Mapped[str] = mapped_column(String(100), nullable=True)
    codeforces_handle: Mapped[str] = mapped_column(String(100), nullable=True)
    codechef_handle: Mapped[str] = mapped_column(String(100), nullable=True)
    gfg_handle: Mapped[str] = mapped_column(String(100), nullable=True)
    daymode: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
