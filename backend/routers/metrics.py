from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from database.crud import get_dashboard_metrics

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):
    return get_dashboard_metrics(db)
