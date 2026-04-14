@echo off
cd /d "%~dp0"
echo Starting Gogo Backend in development mode...
npm run dev
if errorlevel 1 (
  echo.
  echo The dev server stopped with an error.
  pause
)
