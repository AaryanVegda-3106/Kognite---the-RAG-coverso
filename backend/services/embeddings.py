from langchain_huggingface import HuggingFaceEndpointEmbeddings
from core.config import settings
import logging

logger = logging.getLogger(__name__)

def get_embedding_model():
    if not settings.HUGGINGFACE_API_KEY or settings.HUGGINGFACE_API_KEY == "hf_your_token_here":
        logger.warning("HUGGINGFACE_API_KEY not set. Please set it in .env to use BGE-M3 API.")
        # Fallback to local CPU embedding if needed, or raise Error. 
        # For serverless, we strongly prefer API.
        raise ValueError("Missing HuggingFace Token")
        
    embeddings = HuggingFaceEndpointEmbeddings(
        model="BAAI/bge-m3",
        task="feature-extraction",
        huggingfacehub_api_token=settings.HUGGINGFACE_API_KEY,
    )
    return embeddings
