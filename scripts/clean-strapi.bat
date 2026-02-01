@echo off
chcp 65001 >nul
cd /d "%~dp0.."
echo Cleaning Strapi cache and generated files...
if exist "backend\.strapi" rmdir /s /q "backend\.strapi"
if exist "backend\.cache" rmdir /s /q "backend\.cache"
if exist "backend\types\generated" rmdir /s /q "backend\types\generated"
if exist "backend\dist" rmdir /s /q "backend\dist"
echo Done.
pause
