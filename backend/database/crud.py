from sqlalchemy.orm import Session
from database.models import Space, Document, Metric

def create_space(db: Session, name: str):
    db_space = Space(name=name)
    db.add(db_space)
    db.commit()
    db.refresh(db_space)
    return db_space

def get_spaces(db: Session):
    # Return spaces with document count
    return db.query(Space).order_by(Space.created_at.desc()).all()

def get_space(db: Session, space_id: int):
    return db.query(Space).filter(Space.id == space_id).first()

def create_document(db: Session, filename: str, doc_type: str, space_id: int):
    db_document = Document(filename=filename, type=doc_type, space_id=space_id)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def increment_queries(db: Session):
    metric = db.query(Metric).filter(Metric.name == "queries_answered").first()
    if not metric:
        metric = Metric(name="queries_answered", value=1)
        db.add(metric)
    else:
        metric.value += 1
    db.commit()

def get_dashboard_metrics(db: Session):
    total_spaces = db.query(Space).count()
    total_docs = db.query(Document).count()
    queries_metric = db.query(Metric).filter(Metric.name == "queries_answered").first()
    total_queries = queries_metric.value if queries_metric else 0
    
    return {
        "total_spaces": total_spaces,
        "documents_indexed": total_docs,
        "queries_answered": total_queries
    }
