@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo   软件工程总复习 - 本地学习网站
echo ========================================
echo.
echo 本机访问:  http://localhost:8080
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
  for /f "tokens=1" %%b in ("%%a") do echo 局域网分享: http://%%b:8080
)
echo.
echo 同一 WiFi 下的同学可用「局域网分享」地址打开
echo 公网永久链接请参考 README.md 部署到 GitHub Pages
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
python -m http.server 8080 --bind 0.0.0.0
