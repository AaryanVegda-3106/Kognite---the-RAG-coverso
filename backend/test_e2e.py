import os
import fitz # PyMuPDF
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def create_dummy_pdf():
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 50), "This is a test PDF document for Kognite RAG.")
    return doc.write()

def test_full_workflow():
    # 1. Create a space
    resp = client.post("/api/spaces/", json={"name": "Test Space"})
    assert resp.status_code == 200, f"Failed to create space: {resp.text}"
    space_id = resp.json()["id"]

    # 2. Ingest Website
    resp = client.post(
        "/api/ingest/website",
        data={"url": "https://example.com", "space_id": space_id}
    )
    assert resp.status_code == 200, f"Website ingest failed: {resp.text}"

    # 3. Ingest YouTube
    resp = client.post(
        "/api/ingest/youtube",
        data={"url": "https://www.youtube.com/watch?v=jNQXAC9IVRw", "space_id": space_id}
    )
    assert resp.status_code == 200, f"YouTube ingest failed: {resp.text}"

    # 4. Ingest PDF
    pdf_bytes = create_dummy_pdf()
    resp = client.post(
        "/api/ingest/pdf",
        data={"space_id": space_id},
        files={"file": ("test.pdf", pdf_bytes, "application/pdf")}
    )
    assert resp.status_code == 200, f"PDF ingest failed: {resp.text}"

    # 5. List Spaces
    resp = client.get("/api/spaces/")
    assert resp.status_code == 200
    spaces = resp.json()
    assert any(s["id"] == space_id for s in spaces)

    # 6. Read Space
    resp = client.get(f"/api/spaces/{space_id}")
    assert resp.status_code == 200
    space_details = resp.json()
    assert len(space_details["documents"]) >= 3

    # 7. Chat
    resp = client.post(
        "/api/chat/",
        json={
            "message": "What is the content of the test PDF?",
            "space_id": space_id,
            "history": []
        }
    )
    assert resp.status_code == 200, f"Chat failed: {resp.text}"
    chat_resp = resp.json()
    assert "response" in chat_resp
    assert "sources" in chat_resp

    # 8. Metrics
    resp = client.get("/api/dashboard/metrics")
    assert resp.status_code == 200
    metrics = resp.json()
    assert "total_spaces" in metrics
    assert "documents_indexed" in metrics
