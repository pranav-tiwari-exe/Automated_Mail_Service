from sqlalchemy.orm import Session
from database.modal import Token
from cryptography.fernet import Fernet, InvalidToken

from database.database import load_key, SessionLocal

cipher_suite = Fernet(load_key())

def save_token(email: str, refresh_token: str):
    db: Session = SessionLocal()
    try:
        encrypted_token = cipher_suite.encrypt(refresh_token.encode()).decode()
        existing = db.query(Token).filter(Token.email == email).first()
        if existing:
            existing.refresh_token = encrypted_token
        else:
            new = Token(email=email, refresh_token=encrypted_token)
            db.add(new)
        db.commit()
        print(f"Saved token for {email}")
    finally:
        db.close()

def get_token(email: str) -> str | None:
    db: Session = SessionLocal()
    try:
        rec = db.query(Token).filter(Token.email == email).first()
        if rec:
            try:
                return cipher_suite.decrypt(rec.refresh_token.encode()).decode()
            except InvalidToken:
                print(f"Decryption failed for {email}")
                return None
        return None
    finally:
        db.close()

def delete_token(email: str):
    db: Session = SessionLocal()
    try:
        rec = db.query(Token).filter(Token.email == email).first()
        if rec:
            db.delete(rec)
            db.commit()
            print(f"Deleted token for {email}")
    finally:
        db.close()