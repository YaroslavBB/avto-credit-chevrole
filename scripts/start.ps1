# Run backend and frontend in separate windows
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

Write-Host "Starting Backend and Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; npm run develop"
Start-Sleep -Seconds 3
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"
Write-Host "Backend: http://localhost:1337/admin" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
