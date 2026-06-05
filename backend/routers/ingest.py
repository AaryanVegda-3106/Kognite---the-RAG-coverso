from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from database.crud import create_document, get_space
from services.youtube_extractor import get_youtube_transcript
from services.website_extractor import crawl_website
from services.pdf_extractor import extract_pdf_text
from services.chunking import split_text_into_chunks
from services.vector_store import store_chunks_in_qdrant

router = APIRouter(prefix="/api/ingest", tags=["Ingestion"])

def verify_space(db: Session, space_id: int):
    space = get_space(db, space_id)
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    return space

@router.post("/youtube")
async def ingest_youtube(url: str = Form(...), space_id: int = Form(...), db: Session = Depends(get_db)):
    verify_space(db, space_id)
    try:
        transcript = get_youtube_transcript(url)
        full_text = " ".join([segment["text"] for segment in transcript])
        chunks = split_text_into_chunks(full_text)
        
        metadata = {"source": url, "type": "youtube", "space_id": space_id}
        count = store_chunks_in_qdrant(chunks, metadata)
        create_document(db, filename=url, doc_type="youtube", space_id=space_id)
        
        return {"status": "success", "message": f"Extracted and stored {count} chunks.", "data": transcript[:2]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/website")
async def ingest_website(url: str = Form(...), space_id: int = Form(...), db: Session = Depends(get_db)):
    verify_space(db, space_id)
    try:
        text = crawl_website(url)
        chunks = split_text_into_chunks(text)
        
        metadata = {"source": url, "type": "website", "space_id": space_id}
        count = store_chunks_in_qdrant(chunks, metadata)
        create_document(db, filename=url, doc_type="website", space_id=space_id)
        
        return {"status": "success", "message": f"Extracted and stored {count} chunks.", "data": text[:200]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/pdf")
async def ingest_pdf(space_id: int = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    verify_space(db, space_id)
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    try:
        text = await extract_pdf_text(file)
        chunks = split_text_into_chunks(text)
        
        metadata = {"source": file.filename, "type": "pdf", "space_id": space_id}
        count = store_chunks_in_qdrant(chunks, metadata)
        create_document(db, filename=file.filename, doc_type="pdf", space_id=space_id)
        
        return {"status": "success", "message": f"Extracted and stored {count} chunks.", "filename": file.filename, "data": text[:200]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
