@echo off
chcp 65001 >nul
echo 正在启动网易云音乐 API 代理（端口 3000）...
echo 启动成功后，在网站「音乐」面板中将 API 地址设为 http://127.0.0.1:3000
echo.
cd /d "%~dp0netease-api"
if not exist node_modules (
  echo 首次运行，正在安装依赖...
  call npm install
)
node server.js
pause
