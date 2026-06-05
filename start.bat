@echo off
echo ===================================================
echo             Starting Kognite Platform
echo ===================================================

echo.
echo [1] Starting FastAPI Backend on port 8000...
start cmd /k "title Kognite Backend && cd backend && call venv\Scripts\activate && uvicorn main:app --reload --port 8000"

echo [2] Starting Next.js Frontend on port 3000...
start cmd /k "title Kognite Frontend && cd frontend && npm run dev"

echo.
echo Both servers are starting up in separate terminal windows.
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:8000/docs
echo.
pause
