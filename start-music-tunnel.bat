@echo off
chcp 65001 >nul
echo.
echo ==========================================
echo   网易云 API - 内网穿透（不用 Vercel）
echo ==========================================
echo.
echo 适合：GitHub Pages 在线网页 + 本机有 Node.js
echo 原理：本地启动 API，再用 Cloudflare 生成 HTTPS 公网地址
echo.

cd /d "%~dp0netease-api"
if not exist node_modules (
  echo 首次运行，正在安装依赖...
  call npm install
  if errorlevel 1 (
    echo 安装失败，请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
  )
)

echo [1/2] 启动本地 API（端口 3000）...
start "NeteaseAPI" /min cmd /c "cd /d "%~dp0netease-api" && node server.js"
timeout /t 4 /nobreak >nul

echo [2/2] 启动 Cloudflare 隧道...
echo.
echo 请在下方的输出里找到类似下面的地址：
echo   https://xxxx-xxxx.trycloudflare.com
echo.
echo 复制该地址，粘贴到复习网站：
echo   音乐 - 设置 - API 服务地址 - 保存
echo.
echo 注意：关闭本窗口后公网地址会失效，下次需重新运行本脚本
echo ==========================================
echo.

npx --yes cloudflared@latest tunnel --url http://127.0.0.1:3000

pause
