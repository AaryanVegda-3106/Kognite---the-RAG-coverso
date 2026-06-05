from services.vector_store import get_qdrant_client, COLLECTION_NAME
from services.embeddings import get_embedding_model

def retrieve_context(query: str, top_k: int = 5) -> list[dict]:
    client = get_qdrant_client()
    embedding_model = get_embedding_model()
    
    # Check if collection exists first
    try:
        client.get_collection(collection_name=COLLECTION_NAME)
    except Exception:
        # If it doesn't exist, we can't retrieve anything
        return []

    query_vector = embedding_model.embed_query(query)
    
    search_result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=top_k
    )
    
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
