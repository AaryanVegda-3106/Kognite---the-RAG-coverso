@echo off
echo Starting Kognite Backend...
start cmd /k "cd backend && .\venv\Scripts\python.exe -m uvicorn main:app --port 8000 --reload"

echo Starting Kognite Frontend...
start cmd /k "cd frontend && npm run dev"

echo Kognite is running!
