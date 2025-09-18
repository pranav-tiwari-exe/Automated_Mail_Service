import os
from fastapi import APIRouter, Depends
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import HTMLResponse, RedirectResponse
from authlib.integrations.starlette_client import OAuth


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
    return await oauth.google.authorize_redirect(request, redirect_uri)


@auth_router.get('/auth')
async def auth(request: Request):
    """
    This is the callback endpoint that Google redirects to after a successful login.
    It exchanges the authorization code for an access token and user info.
    """
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        return HTMLResponse(f'<h1>Authentication Error: {e}</h1>')
    user = token.get('userinfo')
    if user:
        request.session['user'] = dict(user)
        request.session['token'] = token

    return RedirectResponse(url='http://localhost:5173/')


@auth_router.get('/logout')
async def logout(request: Request):
    """
    Clears the user's session data.
    """
    request.session.pop('user', None)
    return RedirectResponse(url='http://localhost:5173/')