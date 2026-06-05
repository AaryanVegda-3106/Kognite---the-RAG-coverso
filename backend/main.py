from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import ingest, chat

app = FastAPI(
    title="Kognite API",
    description="Backend API for Kognite RAG Platform",
    version="1.0.0",
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router)
app.include_router(chat.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Kognite API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}


