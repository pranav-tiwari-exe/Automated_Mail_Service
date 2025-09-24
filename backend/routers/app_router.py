from fastapi import (
    APIRouter, Request, UploadFile, File, Form,
    HTTPException, status, BackgroundTasks
)
from googleapiclient.discovery import build
from utils.extract_emails import read_csv_file, read_excel_file, extract_emails
from utils.send_email import send_email
from utils.o_auth_helper import get_credentials_from_session

router = APIRouter()

async def send_bulk_emails(service, email_list: set, subject: str, body: str, attachments_data: list):
    """This function runs in the background to send emails."""
    for email in email_list:
        send_email(
            service=service, to_address=email, subject=subject,
            html_body=body, attachments_data=attachments_data
        )
    print(f"Background task finished for {len(email_list)} emails.")

@router.post("/api/initiate")
async def initiate(
    request: Request,
    background_tasks: BackgroundTasks,
    recipient_list: UploadFile = File(...),
    subject: str = Form(...),
    body: str = Form(...),
    attachments: list[UploadFile] = File(default=None)
):
    session = request.session.get('token')
    # print("TOKEN SCOPES:", session_token.get('scope'),  request.session.get('token') ) 
    if not session:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not authenticated.")

    try:
        creds = get_credentials_from_session(session)
        service = build("gmail", "v1", credentials=creds)
    except Exception as e:
        raise HTTPException(status.HTTP_403_FORBIDDEN, f"Could not validate credentials: {e}")

    try:
        if "csv" in recipient_list.content_type:
            df = await read_csv_file(recipient_list)
        elif "spreadsheet" in recipient_list.content_type or "excel" in recipient_list.content_type:
            df = await read_excel_file(recipient_list)
        else:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, 'Invalid file type.')
        
        email_set = extract_emails(df)
        if not email_set:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "No valid emails found in file.")
    except Exception as e:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, f"Error processing file: {e}")

    # Pre-read attachments ONCE before the background task
    attachments_data = []
    if attachments:
        for file in attachments:
            content = await file.read()
            attachments_data.append({"filename": file.filename, "content": content})

    background_tasks.add_task(send_bulk_emails, service, email_set, subject, body, attachments_data)

    return {"message": f"Campaign initiated. Emails are being sent to {len(email_set)} recipients in the background."}