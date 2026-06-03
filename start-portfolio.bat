@echo off
cd /d "%~dp0"
echo.
echo ========================================
echo   Pavithra Portfolio - Local Server
echo ========================================
echo.
echo   OPEN THIS IN YOUR BROWSER:
echo   http://127.0.0.1:5500
echo.
echo   Do NOT use http://[::]:5500
echo.
echo   Keep this window OPEN.
echo   Press Ctrl+C to stop the server.
echo.
py -m http.server 5500 --bind 127.0.0.1
pause
