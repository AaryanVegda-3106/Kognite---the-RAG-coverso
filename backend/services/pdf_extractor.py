import fitz  # PyMuPDF
from fastapi import UploadFile
import io

async def extract_pdf_text(file: UploadFile) -> str:
    try:
        content = await file.read()
        # Open PDF from bytes
        doc = fitz.open(stream=content, filetype="pdf")
        text = ""
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text() + "\n"
        return text
    except Exception as e:
        raise ValueError(f"Could not parse PDF: {str(e)}")
