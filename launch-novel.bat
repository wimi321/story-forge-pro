@echo off
cd /d %~dp0
if not exist node_modules (
  call npm install || exit /b 1
)
if not exist .env.local (
  call npm run setup || exit /b 1
)
call npm run novel
