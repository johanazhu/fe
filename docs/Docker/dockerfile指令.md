# dockerfile 指令



`FROM` 	基于什么

`ADD . xx`  	复制文件至容器

`WORKDIR xx`	进入工作目录

`RUN npm install`	安装依赖包

`EXPOSE` 端口

`CMD` 命令 	





```dockerfile
# base image
FROM johanbo/ubuntu_node:v1

# 复制文件到容器
ADD . /var/www

# 进入工作目录
WORKDIR /var/www

# 安装项目依赖包
RUN npm install --registry=https://registry.npm.taobao.org

# 暴露 端口
EXPOSE 3010

# 开始命令
CMD ["pm2", "start", "app.js", "--no-daemon"]

```

