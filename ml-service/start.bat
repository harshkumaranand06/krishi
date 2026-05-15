@echo off
echo.
echo  ============================================
echo   Krishi ML Service Starter
echo  ============================================
echo.

REM Check if model exists
if not exist "model\plant_model.h5" (
    echo  [WARNING] model\plant_model.h5 not found! Running in DEMO MODE.
    echo.
)

REM Install dependencies if needed
echo  [1/2] Installing Python dependencies...
pip install -r requirements.txt -q

echo.
echo  [2/2] Starting FastAPI ML Server on http://localhost:8000
echo.
echo  API Docs: http://localhost:8000/docs
echo  Health:   http://localhost:8000/health
echo.

uvicorn main:app --reload --port 8000 --host 0.0.0.0
