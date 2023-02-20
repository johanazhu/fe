# 实战：docker-jenkins

上篇，我们讲到了 [dockerfile 的最小实现](./实战：dockerfile最小实践.md)，但也抛出了一个问题，即使 docker 解决了环境和部署问题，但 CICD 还是让人感到心累，本章通过 docker 生成 jenkins 容器，并将 jenkins 与 github 结合，实现 一定程度上的 CI

## 希望达到的效果

我希望我在 git push 后，代码推送至 jenkins ，在 jenkins 点击 发布，就能将我的代码推送至 服务器，我浏览页面，马上就能看到效果

git push 到仓库，在 jenkins 上点击发布就能发布。

jenkins 绑定 远端仓库 和 服务器

git push 到 仓库后，jenkins 监听到，执行脚本

删除原来的容器，并生成一个新的容器 映射出端口

## jenkins 快速入门

它是 java 语言写的 cicd，

它是一套用 java 写的 cicd 系统，通过 ssh 可以与服务器打交道

## 实现思路

jenkins

## 实现步骤

第一步：拉取 jenkins 镜像，以此为镜像生成容器

第二步：安装配置 jenkins

第三步：准备 node 服务

第四步：jenkins 部署 node 服务

## 第一步：生成 jenkins 容器

先从 dockerhub 上拉取 jenkins

```bash
docker pull jenkins/jenkins:lts
```

创建一个 jenkins 目录

```bash
mkdir /home/johan/www/jenkins
```

提高此文件的权限

```bash
sudo chmod -R 777 /home/johan/www/jenkins
```

以 jenkins/jenkins:lts 为镜像生成一容器

```bash
docker run --name jenkins -p 8080:8080 -p 50000:50000 -d -v /home/johan/www/jenkins:/var/jenkins_home jenkins/jenkins:lts
```

`-d`： 后台运行

`-v`： 数据卷，将容器中的内容映射到本机上

查看容器内部日志

```bash
docker logs jenkins
```

输入域名网址查看 `jenkins` 是否安装成功

看到 解锁 jenkins，输入 logs 中的密码，即能解锁

## 第二步：安装配置 jenkins

按照安装推荐插件安装 jenkins 的插件

### 配合 jenkins

![docker_jenkins安装推荐的插件](https://s2.loli.net/2022/04/25/ZAP7h9KdLGYF5EO.png)

需要等一段时间，下载这些插件

![docker_jenkins新手](https://s2.loli.net/2022/04/25/j3JUkLx5TctPYub.png)

**报错就重试，咔咔就是干**

### 创建管理员账号

![docker_jenkins创建账号](https://s2.loli.net/2022/04/25/PI1vk6nUzNybFoj.png)

保存成功，开始使用 jenkins

### 换源

`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

前往 系统管理 ——> 插件管理 ——> 高级 ——> 拉到最下面

![docker_jenkins换源](https://s2.loli.net/2022/04/25/inAJ68CsFcfvQP4.png)

### 下载 ssh 插件

前往 系统管理 ——> 插件管理 ——> 可选插件

搜索 "Publish over SSH"，并安装

![docker_jenkins下载ssh插件](https://s2.loli.net/2022/04/25/3BWNFyp8JqdZztY.png)

### 配置 ssh

前往 系统管理 ——> 系统配置——> 拉到最下面（Publish over SSH）

![docker_jenkins配置ssh2](https://s2.loli.net/2022/04/25/9OXJgE1MLa2SFhw.png)

使用密码

![docker_jenkins设置服务器上的ssh](https://s2.loli.net/2022/04/25/tSAblr4fsK9au2Y.png)

点击 Test Configuration，已经和服务器接通

### 安装 nodejs 插件

node 插件在跑 node 项目时需要使用，这里先安装好

前往 系统管理 ——> 插件管理 ——> 可选插件

搜索 node，并安装

### 全局配置 node

前往 系统管理 ——> 全局工具配置 ——> NodeJS

![docker_jenkins安装node插件1](https://s2.loli.net/2022/04/25/1LbaU872FEdBGoe.png)

应用并保存它

关于 jenkins 的搭建到此告一段落

## 第三步：准备 node 服务

我们拿上一章讲的 koa 为例子讲解

生成 `.gitignore` 文件，并写入 `node_modules`

将 dockerfile_koa_demo 上传至 github

```bash
git init
git add .
git commit -m 'first_commit'
git remote add origin https://github.com/johanazhu/dockerfile_koa_server.git
git push -u origin master
```

## 第四步： jenkins 部署 node 服务

### 创建一个任务

![jenkins新建任务](https://s2.loli.net/2022/04/25/Fihea7EWtySL48l.png)

### 起任务名

![jenkins起任务名字](https://s2.loli.net/2022/04/25/FjS2EtdcJC9Zhw5.png)

### 任务描述

![jenkins任务描述1](https://s2.loli.net/2022/04/25/JkIsXdMNFDm1CQp.png)

![jenkins任务描述2](https://s2.loli.net/2022/04/25/3J2vBIXWrfECmLg.png)

![jenkins任务描述3](https://s2.loli.net/2022/04/25/3ny8Xafrt5whNvC.png)

![jenkins任务描述5](https://s2.loli.net/2022/04/25/t1r6Ed8hP3zaxSC.png)

代码如下：

```bash
docker stop koa_server_container
docker rm koa_server_container
docker rmi johanbo/koa_server:v.1.0.0
cd /home/johan/www/jenkins/workspace/dockerfile_koa_server
docker build . -t johanbo/koa_server:v1.0.0
docker run -d --name koa_server_container -p 3011:3010  johanbo/koa_server:v1.0.0
```

解读以上代码：

第一行：停止 koa_server_container 容器

第二行：删除此容器

第三行：删除生成此容器的镜像

第四行：进入服务器中的 jenkins 数据卷相对于的目录

注意：`dockerfile_koa_server`为你一开始创建该项目时的名字

第五行：生成一个名叫 johanbo/koa_server:v1.0.0 的镜像

第六行：生成一个以 johanbo/koa_server:v1.0.0 为镜像的名字叫做 koa_server_container 的容器，并将本机的 3011 端口与容器的 3010 做映射

应用并保存

### 立即构建服务

![jenkins控制台输出](https://s2.loli.net/2022/04/25/koaEIWOrUL9Ruqc.png)

发现成功，并且能看到“hello，docker“

在本地更改原文件 app.js

```javascript
app.use(async (ctx) => {
    ctx.body = 'hello, docker, jenkins';
});
```

提交代码至 github

通过 jenkins 再次部署 node 服务

![jenkins立即构建](https://s2.loli.net/2022/04/25/seUBLPV5wdaNAcF.png)

构建完成，刷新浏览器，发现内容已经更换

![jenkins部署成功](https://s2.loli.net/2022/04/25/x1myqfR4VeKJAEU.png)

> PS：此服务现已下架

## 总结

在实际开发中其实踩了很多坑，虽然有很好的别人写过的教程，但自己动手做时却有各种限制，比如操作系统不同，秘钥，jenkins 的 SSH 插件，jenkins 里支持 docker 命令的插件集成问题等等

网上关于两种的教程也有很多，但大多数是默认：jenkins 和应用部署在同一台服务器上，这样就能在相对应的文件中构建镜像，

但如果 jenkins 和应用程序是部署在两台服务器上该如何操作呢？留给下一个挑战者

## 参考文章

-   [怎样用 Jenkins、Docker 和 CI/CD 构建无服务器应用程序？](https://www.infoq.cn/article/0sueQNsY9tLDVi79UZms)
-   [【手把手系列之】Jenkins+Docker 自动化部署 vue 项目](https://juejin.im/post/6844903984419831815)
-   [Failed to add SSH key. Message “invalid privatekey” 问题](http://www.wallcopper.com/linux/3689.html)
-   [jenkins 配置 publish over ssh 遇到的问题](https://zhuanlan.zhihu.com/p/39549204)
-   [Build, Publish, Deploy and Test Docker images and containers with Jenkins Workflow](https://www.slideshare.net/Docker/build-publish-deploy-and-test-docker-images-and-containers-with-jenkins-workflow)
-   [Building Docker Images using Jenkins step by step | Devops Integration Live Demo | JavaTechie](https://www.youtube.com/watch?v=mszE-OCI2V4)
