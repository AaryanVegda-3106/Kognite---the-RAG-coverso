from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.session import get_db
from database.crud import create_space, get_spaces, get_space
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/spaces", tags=["Spaces"])

class SpaceCreate(BaseModel):
    name: str

@router.post("/")
def create_new_space(space: SpaceCreate, db: Session = Depends(get_db)):
    return create_space(db, name=space.name)

@router.get("/")
def list_spaces(db: Session = Depends(get_db)):
    spaces = get_spaces(db)
    # Return formatted space with count
    return [
        {
            "id": space.id,
            "name": space.name,
            "created_at": space.created_at,
            "document_count": len(space.documents)
        }
        for space in spaces
    ]

@router.get("/{space_id}")
def read_space(space_id: int, db: Session = Depends(get_db)):
    space = get_space(db, space_id)
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    return {
        "id": space.id,
        "name": space.name,
        "created_at": space.created_at,
        "documents": [
            {
                "id": doc.id,
                "filename": doc.filename,
                "type": doc.type,
                "uploaded_at": doc.uploaded_at
            }
            for doc in space.documents
        ]
    }
