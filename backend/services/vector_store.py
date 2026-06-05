from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
from core.config import settings
import uuid
from services.embeddings import get_embedding_model

COLLECTION_NAME = "kognite_knowledge"

def get_qdrant_client() -> QdrantClient:
    if settings.QDRANT_URL == ":memory:":
        return QdrantClient(":memory:")
    elif not settings.QDRANT_URL.startswith("http"):
        # Local path
        return QdrantClient(path=settings.QDRANT_URL)
    else:
        # Cloud URL
        return QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY,
        )

def store_chunks_in_qdrant(chunks: list[str], metadata: dict):
    client = get_qdrant_client()
    embedding_model = get_embedding_model()
    
    # Check if collection exists
    try:
        client.get_collection(collection_name=COLLECTION_NAME)
    except Exception:
        # Create collection (BGE-M3 outputs 1024 dims)
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1024, distance=Distance.COSINE),
        )
    
    # Generate embeddings
    embeddings = embedding_model.embed_documents(chunks)
    
    # Prepare points
    points = []
    for i, (chunk, emb) in enumerate(zip(chunks, embeddings)):
        point_id = str(uuid.uuid4())
        point_metadata = metadata.copy()
        point_metadata["text"] = chunk
        point_metadata["chunk_index"] = i
        
        points.append(PointStruct(id=point_id, vector=emb, payload=point_metadata))
        
    # Upload
    client.upsert(
        collection_name=COLLECTION_NAME,
        wait=True,
        points=points
    )
    return len(points)
