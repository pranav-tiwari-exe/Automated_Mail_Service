import os
from fastapi import APIRouter, Depends
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from utils.o_auth_helper import get_credentials_from_session,refresh_session_token


auth_router = APIRouter()

config = Config('.env')
oauth = OAuth(config)

oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile https://www.googleapis.com/auth/gmail.send'
    }
)

@auth_router.get('/login')
async def login(request: Request):
    """
    Redirects the user to Google's authentication page.
    """
    redirect_uri = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, redirect_uri, access_type='offline')


@auth_router.get('/auth')
async def auth(request: Request):
    """
    This is the callback endpoint that Google redirects to after a successful login.
    It exchanges the authorization code for an access token and user info.
    """
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        return RedirectResponse(url=f'{config('FRONTEND_URL')}?status=error&message='+str(e))
    
    request.session.clear()
    user = token.get('userinfo')
    if user:
        request.session['user'] = dict(user)
        request.session['token'] = token
        
    return RedirectResponse(url=f"{config('FRONTEND_URL')}/?status=success")


@auth_router.get('/logout')
async def logout(request: Request):
    """
    Clears the user's session data.
    """
    request.session.clear()
    return RedirectResponse(url=f"{config('FRONTEND_URL')}")


@auth_router.get('/user')
async def get_user(request: Request):
    """
    Returns the authenticated user's information.
    """
    user = request.session.get('user')
    if not user:
        return {'user': None}
    
    # Check if token needs refresh
    session_token = request.session.get('token')
    if session_token:
        creds = get_credentials_from_session(session_token)
        if creds and not creds.valid and creds.expired and creds.refresh_token:
            try:
                refresh_session_token(session_token, creds)
                print("Token refreshed proactively in /user endpoint")
            except Exception as e:
                request.session.clear()
                return {'user': None}
    
    return {'user': user}