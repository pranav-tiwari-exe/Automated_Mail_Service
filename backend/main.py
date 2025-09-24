import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
from database.database import init_db

from routers.app_router import router
from routers.o_auth_router import auth_router

load_dotenv()
init_db()

app=FastAPI()

app.add_middleware(
    SessionMiddleware, 
    secret_key=os.environ['SESSION_SECRET_KEY'],
    same_site='lax',  # Allow cross-origin session cookies
    https_only=False,  # Allow HTTP in development
    max_age=86400  # 24 hour session lifetime
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ['FRONTEND_URL'],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
app.include_router(router)
app.include_router(auth_router)