from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    HUGGINGFACE_API_KEY: str = ""
    QDRANT_URL: str = "./qdrant_storage" # Default to local persistent storage
    QDRANT_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    NVIDIA_API_KEY: str = ""
    NVIDIA_MODEL_NAME: str = "nvidia/nemotron-mini-4b-instruct"
    # Database — set to a PostgreSQL URL on Render, falls back to SQLite locally
    DATABASE_URL: str = "sqlite:///./kognite.db"
    # Frontend URL for CORS — set to your deployed frontend URL on Render
    FRONTEND_URL: str = "http://localhost:3000"
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
