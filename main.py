from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

import models, schemas, security, leetcode_service, codeforces_service
from database import engine, get_db

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response
from fastapi import Request

import uuid

session = {}

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
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
    
async def create_user_logic(user_data, role, db):
    query = select(models.User).where(models.User.username == user_data.username)
    result = await db.execute(query)
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_pwd = security.get_password_hash(user_data.password)
    new_user = models.User(
        username=user_data.username,
        name=user_data.name,
        hashed_password=hashed_pwd,
        role=role  
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

@app.post("/signup/user", response_model=schemas.UserOut)
async def signup_user(user_data: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user_logic(user_data, role="user", db=db)

@app.post("/signup/admin", response_model=schemas.UserOut)
async def signup_admin(user_data: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user_logic(user_data, role="admin", db=db)


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
        "role": user.role  
    }

    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        samesite="lax",  
        secure=False     
    )   
    
    return {
        "message": "Login successful", 
        "name": user.name, 
        "role": user.role
    }


@app.get("/check-session")
async def check_session(request: Request):
    session_id = request.cookies.get("session_id")

    if not session_id or session_id not in session:
        raise HTTPException(status_code=401, detail="Not logged in")

    return session[session_id]

@app.get("/admin/all-users")
async def get_all_users(request: Request, db: AsyncSession = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    user_info = session.get(session_id)

    if not user_info or user_info.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return {"message": "Welcome, Admin"}

@app.patch("/update-theme")
async def update_theme(
    data: schemas.ThemeUpdate, 
    request: Request, 
    db: AsyncSession = Depends(get_db)
):
    session_id = request.cookies.get("session_id")
    if not session_id or session_id not in session:
        raise HTTPException(status_code=401, detail="Not logged in")

    current_username = session[session_id]["username"]
    query = select(models.User).where(models.User.username == current_username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if user:
        user.daymode = data.daymode
        await db.commit()
        return {"message": "Theme preference saved", "daymode": user.daymode}
    
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/update-handles")
async def update_handles(
    data: schemas.HandleUpdate, 
    request: Request, 
    db: AsyncSession = Depends(get_db)
):

    session_id = request.cookies.get("session_id")
    if not session_id or session_id not in session:
        raise HTTPException(status_code=401, detail="Not logged in")

    current_username = session[session_id]["username"]

    query = select(models.User).where(models.User.username == current_username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if data.leetcode_handle:
        user.leetcode_handle = data.leetcode_handle
    if data.codeforces_handle:
        user.codeforces_handle = data.codeforces_handle
    db.add(user)
    await db.commit()
    return {"message": "Handles updated successfully"}

#we can use this as a search feature to view the stats of other people
@app.get("/leetcode/{username}")
async def fetch_stats(username: str):
    stats = await leetcode_service.get_leetcode_stats(username)
    
    if not stats:
        raise HTTPException(status_code=404, detail="LeetCode user not found")
    return stats

@app.get("/dashboard-data")
async def get_dashboard_data(request: Request, db: AsyncSession = Depends(get_db)):

    session_id = request.cookies.get("session_id")
    if not session_id or session_id not in session:
        raise HTTPException(status_code=401, detail="Not logged in")

    current_username = session[session_id]["username"]
    query = select(models.User).where(models.User.username == current_username)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    all_stats = {
        "user_name": user.name,
        "daymode": user.daymode,
        "email": user.username,
        "leetcode": None,
        "codeforces": None
    }

    if user.leetcode_handle:
        try:
            # We use a timeout-safe call here
            all_stats["leetcode"] = await leetcode_service.get_leetcode_stats(user.leetcode_handle)
        except Exception as e:
            print(f"LeetCode Error: {e}")
            all_stats["leetcode"] = {"error": "LeetCode currently unreachable"}
    
    if user.codeforces_handle:
        try:
            all_stats["codeforces"] = await codeforces_service.get_codeforces_stats(user.codeforces_handle)
        except Exception as e:
            print(f"Codeforces Error: {e}")
            all_stats["codeforces"] = {"error": "Codeforces currently unreachable"}

    return all_stats


@app.post("/logout")
async def logout(request: Request, response: Response):

    session_id = request.cookies.get("session_id")

    if session_id in session:
        del session[session_id]

    response.delete_cookie("session_id")

    return {"message": "Logged out"}