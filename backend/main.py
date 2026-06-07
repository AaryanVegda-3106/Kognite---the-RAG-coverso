from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import ingest, chat, spaces, metrics
from core.config import settings

app = FastAPI(
    title="Kognite API",
    description="Backend API for Kognite RAG Platform",
    version="1.0.0",
)

# Build CORS origins — always allow local dev, plus the deployed frontend URL
allowed_origins = ["http://localhost:3000"]
if settings.FRONTEND_URL and settings.FRONTEND_URL not in allowed_origins:
    allowed_origins.append(settings.FRONTEND_URL)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router)
app.include_router(chat.router)
app.include_router(spaces.router)
app.include_router(metrics.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Kognite API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}


