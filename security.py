import bcrypt

def get_password_hash(password: str) -> str:
    # 1. Convert password string to bytes
    password_bytes = password.encode('utf-8')
    
    # 2. Generate a salt and hash it
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    
    # 3. Return as a string so it can be saved in MySQL
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 1. Convert both to bytes for comparison
    password_bytes = plain_password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')
    
    # 2. checkpw handles the salt extraction and comparison automatically
    return bcrypt.checkpw(password_bytes, hashed_bytes)