echo Restarting Strapi Backend...

start "Strapi Backend" cmd /k "cd /d %~dp0..\backend && npm run develop"
echo Backend restarted: http://localhost:1337/admin
pause
