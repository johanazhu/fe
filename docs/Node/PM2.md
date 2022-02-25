# PM2



## 是什么

- 进程守护，系统奔溃自动重启
- 启动多进程，充分利用CPU和内存
- 自带日志记录功能



## 下载安装

- `npm install pm2 -g`
- `pm2 --version` 



## 常用命令

`pm2 start [app.js]` 启动

`pm2 restart [app.js]` 重启

`pm2 stop [app.js]` 停止

`pm2 list` 查看启动列表

`pm2 info <AppName>/<id> `查看基本信息

`pm2 log <AppName>/<id>` 查看日志打印

`pm2 monit <AppName>/<id> `监控这个进程的CPU和内存信息

`pm2 delete <AppName>/<id>` 删掉

