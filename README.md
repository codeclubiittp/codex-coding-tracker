# Codex

Backend API built with FastAPI + SQLAlchemy (async) and MySQL.

## Backend Setup

1. Go to the backend project directory

2. Create and activate a virtual environment (skip creation if `venv` already exists):

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## MySQL Prerequisites

This project expects a MySQL database named `auth_db` and currently uses this URL in `database.py`:

```python
mysql+aiomysql://root@127.0.0.1:3306/auth_db
```

Create database:

```sql
CREATE DATABASE auth_db;
```

If your MySQL user needs a password (common case), update `Database_URL` in `database.py` accordingly:

```python
Database_URL = "mysql+aiomysql://root:YOUR_PASSWORD@127.0.0.1:3306/auth_db"
```

## Run Backend

```bash
source venv/bin/activate
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

API docs:

- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc


## Frontend

From your frontend folder:

```bash
npm install
npm run dev
```
