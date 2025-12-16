@echo off
echo Starting setup...

echo Installing dependencies...
set "PATH=%PATH%;C:\Program Files\nodejs;C:\Program Files\Git\cmd;C:\Users\%USERNAME%\AppData\Local\Programs\Git\cmd"
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed. Make sure Node.js is installed.
    pause
    exit /b %errorlevel%
)

echo Initializing Git repository...
if not exist .git (
    git init
) else (
    echo Git repository already initialized.
)

echo Adding files...
git add .

echo Committing changes...
git commit -m "Prepare for Vercel deployment with Neon DB"

echo Adding remote origin...
git remote add origin https://github.com/salehBaso/Malfa-V1.git
if %errorlevel% neq 0 (
    echo Remote 'origin' might already exist. Attempting to set URL...
    git remote set-url origin https://github.com/salehBaso/Malfa-V1.git
)

echo Pushing to GitHub...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo Error: git push failed. Check your internet connection or git credentials.
    pause
    exit /b %errorlevel%
)

echo Done! Run 'vercel' to deploy if you have the Vercel CLI installed.
pause
