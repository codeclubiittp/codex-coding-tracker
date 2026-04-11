from pydantic import BaseModel, ConfigDict
from typing import Optional

class UserBase(BaseModel):
    username: str
    name: str
    role: Optional[str] = "user" 

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int 
    role: str 
    daymode: bool
    leetcode_handle: Optional[str] = None
    codeforces_handle: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)
    

class UserLogin(BaseModel):
    username: str
    password: str

class HandleUpdate(BaseModel):
    leetcode_handle: Optional[str] = None
    codeforces_handle: Optional[str] = None

class ThemeUpdate(BaseModel):
    daymode: bool