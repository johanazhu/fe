# dockerfile 指令

## 指令速查

`FROM` 	基于什么

`LABEL` 	制作者的信息

`ADD . xx`  	复制文件至容器

`WORKDIR xx`	进入工作目录

`RUN npm install`	安装依赖包

`EXPOSE` 	端口

`COPY`		复制

`RUN`	后面跟着命令行命令

`CMD` 	类似于RUN 指令，用于运行程序

- CMD 在 docker run 时运行
- RUN 是在docker build

`VOLUME` 	定义匿名数据卷



## VOLUME

`VOLUME` 	定义匿名数据卷。在启动容器是

作用：

- 避免重要的数据，因容器重启而丢失，这是非常致命的
- 避免容器不断变大

格式：

```shell
VOLUME ["<路径1>", "路径2"...]
```

在启动容器 docker run 的时候，我们可以通过 -v 参数修改挂载点



## LABEL

```
LABEL version="1.0" description="这是一个Web服务器" by="IT笔录
```







## 例子

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

