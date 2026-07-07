/**
 * 本地启动：npm install && npm start
 * 默认端口 3000，可通过环境变量 PORT 修改
 */
process.env.PORT = process.env.PORT || 3000;
require('NeteaseCloudMusicApi/app.js');
