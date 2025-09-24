from google.oauth2.credentials import Credentials
from starlette.config import Config
from google.auth.transport.requests import Request as GoogleRequest
from utils.database_operations import get_token



config=Config(".env")

def get_credentials_from_session(session) -> Credentials:
    try:
        creds = Credentials(
            token=session.get('access_token'),
            refresh_token=get_token(session.get('userinfo').get('email')),
            id_token=session.get('id_token'),
            token_uri='https://oauth2.googleapis.com/token',
            client_id=config('GOOGLE_CLIENT_ID'),
            client_secret=config('GOOGLE_CLIENT_SECRET'),
            scopes=session.get('scope', '').split() if session.get('scope') else []
        )
        
        return creds
    
    except Exception as e:
        raise e

def refresh_session_token(session, credentials: Credentials):
    """
    Refresh expired token and update session with new token data
    Args:
        session: Session dictionary to update
        credentials: Credentials object with refresh_token
    """
    try:
        credentials.refresh(GoogleRequest())
        
        session.update({
            'access_token': credentials.token,
            'expires_at': credentials.expiry.timestamp() if credentials.expiry else None
        })
        
    except Exception as e:
        raise e

