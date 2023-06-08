# docker 初步体验



先安装成功，其次再用命令行：

```bash
docker run -d -p 8081:80 docker/getting-started
```

没报错说明安装成功，输入命令行`docker ps` 查看正在启动的容器：

![docker ps](https://s2.loli.net/2022/09/10/g7UelOvsJWq3r9Y.png)

在浏览器中输入`http://localhost:8081`，能查看到启动的 docker 的教程页面

## 安装 mysql 

先去 [dockerhub](https://hub.docker.com/) 上搜索 mysql 镜像，输入命令行：

```bash
docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.39
```

没报错说明已启动，进入容器

```bash
docker exec -it mysql1 bash
```

![进入容器](https://s2.loli.net/2022/09/10/6LAu2PlMarS1YEg.png)

试一试 mysql 是否可以用，先登录 mysql

```bash
mysql -u root -p
```

输入密码123456

![查看容器中的mysql](https://s2.loli.net/2022/09/10/6PT8b2Xuel5wCoN.png)

成功登录

## 安装 nginx 

先去 [dockerhub](https://hub.docker.com/) 上搜索 nginx 镜像，输入命令行：

```bash
docker run --name nginx1 -d -p 8080:80 nginx:1.23.1
```

在浏览器中输入`http://localhost:8080`，如果能看到`Welcome to nginx!` 等字眼，说明容器已经启动





docker 是什么？

有什么用？

CentOS 7 使用 docker 安装 typecho 博客系统

https://mp.weixin.qq.com/s?__biz=MzA5ODQyNzk3MQ==&mid=2451546499&idx=1&sn=4a41aef60c1d068210a51a4a3c31691a&chksm=877ab4afb00d3db96fc0c18cee4b5b3520ce92683af0f8551cdeb84579dbd06115d5cf0a20d8&mpshare=1&scene=1&srcid=&sharer_sharetime=1576021529701&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd

有个好问题，多个网站是否应使用同一个 nginx 容器

利用 docker-compsoe 部署前后端分离的项目

https://juejin.im/post/5d6601496fb9a06acd4531ec

Docker 中使用 Nginx 代理多个应用站点

https://learnku.com/articles/38470

docker 里安装 nginx 容器、同时配置多个 nginx 容器

https://blog.csdn.net/zjh_746140129/article/details/89286079

前端领域的 docker 与 kubernetes

https://juejin.im/post/5dddd15b6fb9a071576dbd7a

使用 docker-compose 创建一个包含客户端与服务端的应用

https://mp.weixin.qq.com/s?__biz=MzA5OTAyNzQ2OA==&mid=2649703901&idx=1&sn=27da040c0bf57ded8455e63b52eb3ce3&chksm=88937abebfe4f3a8a23c6249cd7c11d904b9e050c8adb283764a851f8c68019a877571c0c2bf&mpshare=1&scene=1&srcid=&sharer_sharetime=1576328757579&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd

写给前端的 docker 实战教程

https://juejin.im/post/5d8440ebe51d4561eb0b2751

jenkins + docker +vue 项目的自动化部署环境

https://juejin.im/post/5d369d6e5188253a2e1b93ff

发布镜像到阿里云容器服务

https://www.bilibili.com/video/BV1og4y1q7M4?p=32

很简单
