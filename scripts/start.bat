@echo off
chcp 65001 >nul
cd /d "%~dp0.."
echo Starting Backend and Frontend...
start "Strapi Backend" cmd /k "cd /d %~dp0..\backend && npm run develop"
timeout /t 3 /nobreak >nul
start "Next.js Frontend" cmd /k "cd /d %~dp0..\frontend && npm run dev"
echo.
echo Backend: http://localhost:1337/admin
echo Frontend: http://localhost:3000
echo.
pause
