from services.vector_store import get_qdrant_client, COLLECTION_NAME
from services.embeddings import get_embedding_model

from qdrant_client.http.models import Filter, FieldCondition, MatchValue

def retrieve_context(query: str, top_k: int = 5, space_id: int = None) -> list[dict]:
    client = get_qdrant_client()
    embedding_model = get_embedding_model()
    
    # Check if collection exists first
    try:
        client.get_collection(collection_name=COLLECTION_NAME)
    except Exception:
        # If it doesn't exist, we can't retrieve anything
        return []

    query_vector = embedding_model.embed_query(query)
    
    
    query_filter = None
    if space_id is not None:
        query_filter = Filter(
            must=[
                FieldCondition(
                    key="space_id",
                    match=MatchValue(value=space_id)
                )
            ]
        )

    search_result = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        query_filter=query_filter,
        limit=top_k
    ).points
    
    results = []
    for hit in search_result:
        results.append({
            "id": hit.id,
            "score": hit.score,
            "text": hit.payload.get("text", ""),
            "source": hit.payload.get("source", "Unknown"),
            "type": hit.payload.get("type", "Unknown")
        })
    return results
