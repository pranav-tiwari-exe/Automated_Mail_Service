import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv

from routers.app_router import router
from routers.o_auth_router import auth_router

load_dotenv()

app=FastAPI()

app.add_middleware(SessionMiddleware, secret_key=os.environ['SESSION_SECRET_KEY'])


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
app.include_router(router)
app.include_router(auth_router)