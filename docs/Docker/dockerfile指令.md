# dockerfile

## 介绍

一个简单的配置文件，描述如何构建一个新的 image 镜像

> PS：必须是 `Dockerfile` 这个文件名，必须在项目的根目录

## 语法

```dockerfile
FROM node:14
WORKDIR /app
COPY . /app

# 构建镜像时，一般用于做一些系统配置，安装必要的软件。可有多个 RUN
RUN XXX
RUN XXX
RUN XXX

# 启动容器时，只能由一个 CMD
CMD XXX

# 环境变量
ENV K1=V1
ENV K2=V2
```

-   `FROM`：基于什么
-   `WORKDIR xx` ：进入工作目录

-   `ADD . xx` ：复制文件至容器

-   `RUN xx ` ：构建镜像时的步骤

-   `EXPOSE` ：暴露的端口

-   `COPY` ：复制
-   `VOLUME` 定义匿名数据卷

> `RUN` 是构建镜像（images），CMD 是容器（container）启动
>
> RUN 是在 docker build
>
> CMD 在 docker run 时运行

`CMD` 类似于 RUN 指令，用于运行程序，它最后的语法是要阻塞后台的命令

## VOLUME

`VOLUME` ：数据卷

作用：

-   避免重要的数据，因容器重启而丢失，这是非常致命的
-   避免容器不断变大

可以理解为**文件映射**

格式：

```shell
VOLUME ["<路径1>", "路径2"...]
```

在启动容器 docker run 的时候，我们可以通过 -v 参数修改挂载点

![数据卷](https://i.loli.net/2021/09/13/QiMyCPFlIEjaq7p.png)

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
