import pandas as pd
import re
from io import BytesIO
from fastapi import UploadFile

async def read_csv_file(file_data: UploadFile):
    try:
        contents = await file_data.read()
        buffer = BytesIO(contents)
        df = pd.read_csv(buffer, dtype=str, header=None)
        return df
    except Exception as e:
        raise ValueError("Error reading CSV file: " + str(e))

async def read_excel_file(file_data: UploadFile):
    try:
        contents = await file_data.read()
        buffer = BytesIO(contents)
        df = pd.read_excel(buffer, dtype=str, header=None)
        return df
    except Exception as e:
        raise ValueError("Error reading Excel file: " + str(e))

def extract_emails(df):
    emails = set()
    email_regex = r'(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)'

    for column in df.columns:
        if pd.api.types.is_string_dtype(df[column]):
            found_emails = df[column].dropna().str.extractall(email_regex, flags=re.IGNORECASE)
            
            if not found_emails.empty:
                emails.update(found_emails[0].tolist())

    return emails