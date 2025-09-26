from fastapi import (
    APIRouter, Request, UploadFile, File, Form,
    HTTPException, status, BackgroundTasks  # BackgroundTasks already imported
)
from googleapiclient.discovery import build
from utils.extract_emails import read_csv_file, read_excel_file, extract_emails
from utils.send_email import send_email
from utils.o_auth_helper import get_credentials_from_session, refresh_session_token

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Hello, World!"}

def send_bulk_emails(creds_data: dict, email_list: set, subject: str, body: str, attachments_data: list):
    """This function runs in the background to send emails."""
    try:
        # Recreate credentials from serializable data
        from google.oauth2.credentials import Credentials
        
        creds = Credentials(
            token=creds_data['token'],
            refresh_token=creds_data.get('refresh_token'),
            token_uri=creds_data.get('token_uri'),
            client_id=creds_data.get('client_id'),
            client_secret=creds_data.get('client_secret'),
            scopes=creds_data.get('scopes')
        )
        
        # Build service fresh in background task
        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        
        for email in email_list:
            try:
                send_email(
                    service=service, 
                    to_address=email, 
                    subject=subject,
                    html_body=body, 
                    attachments_data=attachments_data
                )
                print(f"Email sent successfully to {email}")
            except Exception as e:
                print(f"Failed to send email to {email}: {str(e)}")
                
    except Exception as e:
        print(f"Background task error: {str(e)}")

@router.post("/api/initiate")
async def initiate(
    request: Request,
    background_tasks: BackgroundTasks,  # Add this parameter
    recipient_list: UploadFile = File(...),
    subject: str = Form(...),
    body: str = Form(...),
    attachments: list[UploadFile] = File(default=None)
):
    session = request.session.get('token')
    if not session:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not authenticated.")
    
    try:
        creds = get_credentials_from_session(session)
        if creds and not creds.valid and creds.expired and creds.refresh_token:
            try:
                refresh_session_token(session, creds)
                print("Token refreshed proactively in /user endpoint")
            except Exception as e:
                request.session.clear()
                raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Token refresh failed")
                
        # Test service build to ensure credentials work
        service = build("gmail", "v1", credentials=creds, cache_discovery=False)
        
    except Exception as e:
        raise HTTPException(status.HTTP_403_FORBIDDEN, f"Could not validate credentials: {e}")

    # File processing (improved error handling)
    try:
        content_type = recipient_list.content_type or ""
        filename = recipient_list.filename or ""
        
        if "csv" in content_type.lower() or filename.lower().endswith('.csv'):
            df = await read_csv_file(recipient_list)
        elif ("spreadsheet" in content_type.lower() or 
              "excel" in content_type.lower() or 
              filename.lower().endswith(('.xlsx', '.xls'))):
            df = await read_excel_file(recipient_list)
        else:
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, 
                f'Invalid file type: {content_type}. Please upload CSV or Excel files.'
            )
        
        email_set = extract_emails(df)
        if not email_set:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "No valid emails found in file.")
            
    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        print(f"File processing error: {str(e)}")
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, 
            f"Error processing file: Please check file format and try again"
        )

    # Attachment processing
    try:
        attachments_data = []
        if attachments:
            for file in attachments:
                content = await file.read()
                attachments_data.append({
                    "filename": file.filename, 
                    "content": content
                })

        # Serialize credentials for background task
        creds_data = {
            'token': creds.token,
            'refresh_token': creds.refresh_token,
            'token_uri': creds.token_uri,
            'client_id': creds.client_id,
            'client_secret': creds.client_secret,
            'scopes': creds.scopes
        }

        # Add background task with serializable data
        background_tasks.add_task(
            send_bulk_emails, 
            creds_data,  # Pass serializable credentials
            email_set, 
            subject, 
            body, 
            attachments_data
        )

        return {"emails_identified": len(email_set), "status": "processing_started"}
        
    except Exception as e:
        print(f"Background task setup error: {str(e)}")
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, 
            f"Error setting up email sending: {str(e)}"
        )
