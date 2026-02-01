@echo off
chcp 65001 >nul
cd /d "%~dp0.."
echo Installing dependencies...
echo.
echo [1/3] Backend...
cd backend
call npm install
if errorlevel 1 (echo Backend install failed. & pause & exit /b 1)
cd ..
echo.
echo [2/3] Frontend...
cd frontend
call npm install
if errorlevel 1 (echo Frontend install failed. & pause & exit /b 1)
cd ..
echo.
echo [3/3] Root (concurrently)...
call npm install
if errorlevel 1 (echo Root install failed. & pause & exit /b 1)
echo.
echo Done. Run scripts\start.bat or "npm run dev" to start.
pause
