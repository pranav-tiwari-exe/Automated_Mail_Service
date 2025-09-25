import base64
import mimetypes
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from googleapiclient.errors import HttpError

def send_email(
    service,
    to_address: str,
    subject: str,
    html_body: str,
    attachments_data: list = None 
):
    try:
        message = MIMEMultipart()
        message["To"] = to_address
        message["Subject"] = subject
        message.attach(MIMEText(html_body, "html"))

        if attachments_data:
            for attachment in attachments_data:
                filename = attachment["filename"]
                content = attachment["content"]
                
                content_type, _ = mimetypes.guess_type(filename)
                if content_type is None:
                    content_type = 'application/octet-stream'
                main_type, sub_type = content_type.split('/', 1)

                part = MIMEBase(main_type, sub_type)
                part.set_payload(content)
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', 'attachment', filename=filename)
                message.attach(part)

        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
        create_message_body = {'raw': encoded_message}

        sent_message = service.users().messages().send(userId='me', body=create_message_body).execute()
        return sent_message

    except HttpError as error:
        raise error