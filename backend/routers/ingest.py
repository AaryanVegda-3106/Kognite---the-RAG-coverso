from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.youtube_extractor import get_youtube_transcript
from services.website_extractor import crawl_website
from services.pdf_extractor import extract_pdf_text
from services.chunking import split_text_into_chunks
from services.vector_store import store_chunks_in_qdrant

router = APIRouter(prefix="/api/ingest", tags=["Ingestion"])

@router.post("/youtube")
async def ingest_youtube(url: str = Form(...)):
    try:
        transcript = get_youtube_transcript(url)
        # Transcript is a list of dicts. Let's combine into text.
        full_text = " ".join([segment["text"] for segment in transcript])
        chunks = split_text_into_chunks(full_text)
        
        metadata = {"source": url, "type": "youtube"}
        count = store_chunks_in_qdrant(chunks, metadata)
        
        return {"status": "success", "message": f"Extracted and stored {count} chunks.", "data": transcript[:2]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/website")
async def ingest_website(url: str = Form(...)):
    try:
        text = crawl_website(url)
        chunks = split_text_into_chunks(text)
        
        metadata = {"source": url, "type": "website"}
        count = store_chunks_in_qdrant(chunks, metadata)
        
        return {"status": "success", "message": f"Extracted and stored {count} chunks.", "data": text[:200]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/pdf")
async def ingest_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        text = await extract_pdf_text(file)
        chunks = split_text_into_chunks(text)
        
        metadata = {"source": file.filename, "type": "pdf"}
        count = store_chunks_in_qdrant(chunks, metadata)
        
        return {"status": "success", "message": f"Extracted and stored {count} chunks.", "filename": file.filename, "data": text[:200]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

