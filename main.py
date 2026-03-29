from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

import models, schemas, security, leetcode_service
from database import engine, get_db

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response
from fastapi import Request

import uuid

session = {}

app = FastAPI()


origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.post("/signup", response_model=schemas.UserOut)
async def signup(user_data: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    query = select(models.User).where(models.User.username == user_data.username)
    result = await db.execute(query)
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="Username already registered"
        )

    hashed_pwd = security.get_password_hash(user_data.password)

    new_user = models.User(
        username=user_data.username,
        name=user_data.name,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user) 
    return new_user

@app.post("/login")
async def login(user_data: schemas.UserLogin, response: Response, db: AsyncSession = Depends(get_db)):
    query = select(models.User).where(models.User.username == user_data.username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    if not user or not security.verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
     
     
    session_id = str(uuid.uuid4())
    session[session_id] = {
        "username": user.username,
    }

    # cookie sending 
    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        samesite="lax",  
        secure=False     
    )   
    
    return {"message": "Login successful", "name": user.name}


@app.get("/check-session")
async def check_session(request: Request):

    session_id = request.cookies.get("session_id")

    print("COOKIE RECEIVED:", session_id)
    print("SESSION DICT:", session)

    if not session_id or session_id not in session:
        raise HTTPException(status_code=401, detail="Not logged in")

    return session[session_id]

@app.get("/leetcode/{username}")
async def fetch_stats(username: str):
    # Notice the "leetcode_service." prefix here!
    stats = await leetcode_service.get_leetcode_stats(username)
    
    if not stats:
        raise HTTPException(status_code=404, detail="LeetCode user not found")
    return stats


@app.post("/logout")
async def logout(request: Request, response: Response):

    session_id = request.cookies.get("session_id")

    if session_id in session:
        del session[session_id]

    response.delete_cookie("session_id")

    return {"message": "Logged out"}