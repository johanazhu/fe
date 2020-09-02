很多前端都不知道为什么要使用docker，觉得docker与自己关系不大，但是现在我要说，做梦吧，你





两种方法，使用dockerfile，你把命令写在dockerfile清单里，运行它的时候，它会执行

第二种，在ubuntu基础上自己打造，先说第二种

第一步：进入容器

```shell
docker run -it --name ubuntu_node_johanbo ubuntu:latest /bin/bash
```

第二步：安装 nodejs, npm 和 pm2

```shell
apt-get update && apt-get install -y nodejs npm && npm install pm2 -g
```

第三步：退出容器

```shell
按住 Ctrl + p + q
```

第四步： 将修改后的容器打包为镜像

```shell
docker ps 查看正在运行的容器，找到刚刚启动的容器Id
docker commit <容器ID> <自定义的镜像名>
docker images 查看镜像
```













第一种使用dockerfile

```shell
# 基于Ubuntu image
FROM daocloud.io/library/ubuntu:latest

# MAINTAINER
MAINTAINER johanbo <t511069160@qq.com>

# 设置时区
RUN sudo sh -c "echo 'Asia/Shanghai' > /etc/timezone" && \
    sudo dpkg-reconfigure -f noninteractive tzdata

# 更换 Ubuntu 镜像
RUN echo '\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n'\
> /etc/apt/sources.list

# 安装Node.js与NPM
RUN apt-get update && apt-get -y install nodejs npm

```

Depends: node-gyp (>= 0.10.9) but it is not  

所以不能直接下载node和npm

使用wget 来下载nodejs和npm最佳



基于自己的ubuntu_node镜像之上，

```shell
# base image
FROM johanbo/ubuntu_node:v1

# MAINTAINER
MAINTAINER johanbo <t511069160@qq.com>

# 复制文件到容器
ADD . /var/www

# 进入工作目录
WORKDIR /var/www

# 安装项目依赖包
RUN npm install

# 暴露 端口
EXPOSE 8080

# 开始命令
CMD ["pm2", "start", "app.js", "--no-daemon"]
```





按照我的理解，IMAGE 镜像就好比地基，可以说所有的

linux系统是一个大集合，按照分类分为了











一般将应用放在 `/var/www` 下

这只是一个文件，那么多个文件，就分类，所以一个弄归纳法的人写代码会将之写成艺术。

如果我有十个项目，其中5个有联系，其他五个是独立的项目，那么该如何放置呢，说实话，我也不知道。

我现在个人的项目比较少，等以后多起来再重组再迁移。

现在我的方法是将它放在总目录 `www` 下。

方案有很多，如何权衡，需要按照业务场景来制定



