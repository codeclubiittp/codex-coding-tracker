from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
import dotenv, os


dotenv.load_dotenv()

Database_URL = f"postgresql+asyncpg://postgres:{os.environ['DB_PASSWORD']}@db.aqkqzcnojcpshtyrrjbi.supabase.co:5432/postgres"
engine = create_async_engine(Database_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)
class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
