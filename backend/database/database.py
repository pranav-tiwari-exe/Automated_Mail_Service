import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from cryptography.fernet import Fernet
from .modal import Base  

def load_key():
    key = os.environ.get("ENCRYPTION_KEY")
    if key:
        return key.encode()
    try:
        with open("database/secret.key", "rb") as f:
            return f.read()
    except FileNotFoundError:
        print("ERROR: Encryption key not found. Please generate one.")
        generate_key()
        with open("database/secret.key", "rb") as f:
           return f.read()

def generate_key():
    if os.path.exists("database/secret.key"):
        return
    key = Fernet.generate_key()
    with open("database/secret.key", "wb") as f:
        f.write(key)
    print("Generated new encryption key and saved to 'secret.key'.")

DATABASE_URL = "sqlite:///database/tokens.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(engine)  