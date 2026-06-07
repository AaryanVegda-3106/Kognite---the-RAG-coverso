<p align="center">
  <img src="https://img.shields.io/badge/RAG-Pipeline-blueviolet?style=for-the-badge" alt="RAG Pipeline" />
  <img src="https://img.shields.io/badge/LangGraph-Agent-purple?style=for-the-badge" alt="LangGraph Agent" />
  <img src="https://img.shields.io/badge/Qdrant-Vector%20DB-red?style=for-the-badge" alt="Qdrant" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
</p>

# 🧠 Kognite — Turn Any Source Into Searchable Intelligence

**Kognite** is a full-stack Retrieval-Augmented Generation (RAG) platform that transforms PDFs, websites, and YouTube videos into queryable knowledge. Upload your documents into isolated **Knowledge Spaces**, then ask questions — Kognite retrieves semantically relevant chunks and synthesizes precise, cited answers using LLMs.

### 🌐 [Live Demo →](https://kognite-the-rag-coverso-1.onrender.com)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **Multi-Source Ingestion** | Upload PDFs, scrape websites, or extract YouTube transcripts |
| 🗂️ **Knowledge Spaces** | Organize documents into isolated, queryable workspaces |
| 🤖 **RAG Chat** | Ask questions and get cited, context-aware answers from your data |
| 🔍 **Semantic Search** | BGE-M3 embeddings + Qdrant vector search for precise retrieval |
| 🧩 **LangGraph Agent** | Multi-step Retrieve → Generate pipeline built with LangGraph |
| 📊 **Dashboard Analytics** | Track spaces, documents indexed, and queries answered |
| 🔐 **Authentication** | Clerk-powered auth with sign-in/sign-up flows |
| 🎨 **Premium UI** | Dark glassmorphism design with Framer Motion animations |

---

## 🏗️ Architecture

```
┌──────────────────────────────────┐
│         Next.js Frontend         │
│  (React 19 · Tailwind · Clerk)   │
└──────────────┬───────────────────┘
               │ REST API
┌──────────────▼───────────────────┐
│         FastAPI Backend          │
│  ┌─────────┐  ┌───────────────┐  │
│  │ Ingest  │  │  LangGraph    │  │
│  │ Router  │  │  RAG Agent    │  │
│  └────┬────┘  └───────┬───────┘  │
│       │               │          │
│  ┌────▼────┐  ┌───────▼───────┐  │
│  │Chunking │  │  Retriever    │  │
│  │+ Embed  │  │  (Semantic)   │  │
│  └────┬────┘  └───────┬───────┘  │
│       │               │          │
│  ┌────▼───────────────▼───────┐  │
│  │     Qdrant Vector Store    │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │  PostgreSQL (Metadata DB)  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework |
| **LangGraph** | Agentic RAG workflow (Retrieve → Generate) |
| **LangChain** | LLM orchestration & chain management |
| **NVIDIA NIM (Nemotron)** | LLM inference via NVIDIA AI Endpoints |
| **BGE-M3** | Embedding model (1024-dim, via HuggingFace API) |
| **Qdrant** | Vector database for semantic search |
| **PostgreSQL** | Relational DB for spaces, documents, metrics |
| **SQLAlchemy** | ORM for database operations |

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework (App Router, Turbopack) |
| **React 19** | UI library |
| **Tailwind CSS 4** | Styling |
| **Framer Motion** | Animations & transitions |
| **Clerk** | Authentication (sign-in, sign-up, user management) |
| **Lucide React** | Icon library |

### Infrastructure
| Technology | Purpose |
|---|---|
| **Render** | Hosting (backend + frontend + PostgreSQL) |
| **Qdrant Cloud** | Managed vector database |

---

## 📁 Project Structure

```
Kognite/
├── backend/
│   ├── main.py                  # FastAPI app entry point
│   ├── core/
│   │   └── config.py            # Environment settings (Pydantic)
│   ├── database/
│   │   ├── models.py            # SQLAlchemy models (Space, Document, Metric)
│   │   ├── session.py           # DB engine & session factory
│   │   └── crud.py              # CRUD operations
│   ├── routers/
│   │   ├── ingest.py            # PDF / Website / YouTube ingestion endpoints
│   │   ├── chat.py              # RAG chat endpoint
│   │   ├── spaces.py            # Knowledge space CRUD endpoints
│   │   └── metrics.py           # Dashboard metrics endpoint
│   ├── services/
│   │   ├── agent.py             # LangGraph RAG agent (Retrieve → Generate)
│   │   ├── retriever.py         # Qdrant semantic search
│   │   ├── vector_store.py      # Qdrant client & chunk storage
│   │   ├── embeddings.py        # BGE-M3 embedding model
│   │   ├── chunking.py          # Text chunking logic
│   │   ├── pdf_extractor.py     # PDF text extraction (PyMuPDF)
│   │   ├── website_extractor.py # Website scraping (BeautifulSoup)
│   │   └── youtube_extractor.py # YouTube transcript extraction
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── layout.tsx            # Root layout (ClerkProvider)
│   │   │   ├── sign-in/              # Clerk sign-in page
│   │   │   ├── sign-up/              # Clerk sign-up page
│   │   │   └── dashboard/
│   │   │       ├── page.tsx          # Dashboard overview
│   │   │       ├── layout.tsx        # Dashboard sidebar layout
│   │   │       ├── spaces/           # Knowledge spaces management
│   │   │       ├── upload/           # Document upload page
│   │   │       ├── chats/            # RAG chat interface
│   │   │       ├── analytics/        # Analytics page
│   │   │       └── settings/         # Settings page
│   │   ├── components/
│   │   │   ├── sidebar.tsx           # Dashboard navigation sidebar
│   │   │   ├── logo.tsx              # Kognite branding
│   │   │   ├── ambient-background.tsx # Animated canvas background
│   │   │   └── loading-screen.tsx    # Loading state component
│   │   └── middleware.ts             # Clerk auth middleware
│   └── package.json
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Qdrant** (local or [Qdrant Cloud](https://cloud.qdrant.io))
- API keys for: **HuggingFace**, **NVIDIA NIM**, **Clerk**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Kognite---the-RAG-coverso.git
cd Kognite---the-RAG-coverso
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
```

Create a `.env` file (see `.env.example`):

```env
HUGGINGFACE_API_KEY=hf_...
GEMINI_API_KEY=...
NVIDIA_API_KEY=nvapi-...
QDRANT_URL=./qdrant_storage
QDRANT_API_KEY=...
DATABASE_URL=sqlite:///./kognite.db
FRONTEND_URL=http://localhost:3000
```

Start the backend:

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file (see `.env.example`):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the App

Visit **[http://localhost:3000](http://localhost:3000)** — the landing page loads. Click **Launch App** to enter the dashboard.

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Root — returns welcome message |
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Interactive Swagger UI |
| `POST` | `/api/ingest/pdf` | Upload and ingest a PDF |
| `POST` | `/api/ingest/website` | Scrape and ingest a website |
| `POST` | `/api/ingest/youtube` | Extract and ingest YouTube transcript |
| `POST` | `/api/chat/` | Send a query to the RAG agent |
| `GET` | `/api/spaces/` | List all knowledge spaces |
| `POST` | `/api/spaces/` | Create a new knowledge space |
| `GET` | `/api/spaces/{id}` | Get space details with documents |
| `GET` | `/api/dashboard/metrics` | Get dashboard metrics |

---

## 🌍 Deployment

The app is deployed on **Render** as two services:

| Service | Type | URL |
|---|---|---|
| **Frontend** | Web Service (Node) | [kognite-the-rag-coverso-1.onrender.com](https://kognite-the-rag-coverso-1.onrender.com) |
| **Backend** | Web Service (Python) | [kognite-the-rag-coverso.onrender.com](https://kognite-the-rag-coverso.onrender.com) |
| **Database** | PostgreSQL | Render Managed PostgreSQL |
| **Vectors** | Qdrant Cloud | Managed Vector DB |

### Deploy Your Own

1. Fork this repo and connect it to [Render](https://render.com)
2. Create a **PostgreSQL** database on Render
3. Create two **Web Services**:
   - **Backend**: Root Dir = `backend`, Build = `pip install -r requirements.txt`, Start = `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Frontend**: Root Dir = `frontend`, Build = `npm install && npm run build`, Start = `npm run start`
4. Set environment variables in each service (see `.env.example` files)

---

## 🔄 How the RAG Pipeline Works

```
User Question
      │
      ▼
┌─────────────┐
│  Retrieve    │  → Embeds query with BGE-M3
│  Node        │  → Searches Qdrant (filtered by space_id)
│              │  → Returns top-5 relevant chunks
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Generate    │  → Builds system prompt with retrieved context
│  Node        │  → Sends to NVIDIA Nemotron LLM
│              │  → Returns cited, grounded answer
└─────────────┘
```

---

## 📄 License

This project is for educational and demonstration purposes.

---

<p align="center">
  Built with ❤️ using <strong>LangGraph</strong>, <strong>FastAPI</strong>, <strong>Next.js</strong>, and <strong>Qdrant</strong>
</p>
