# 实战：docker-jenkins

上篇，我们讲到了dockerfile 的最小实现，但也抛出了一个问题，即使 docker 解决了环境和部署问题，但CICD还是让人感到心累，本章通过 docker 生成 jenkins 容器，并将 jenkins 与 github 结合，实现 一定程度上的 CI

### 希望达到的效果

我希望我再 git push 后，代码推送至 jenkins ，在jenkins 点击 发布，就能将我的代码推送至 服务器，我浏览页面，马上就能看到效果

git push 到仓库，在 jenkins 上点击发布就能发布。

jenkins 绑定 远端仓库 和 服务器

git push 到 仓库后，jenkins 监听到，执行脚本

删除原来的容器，并生成一个新的容器 映射出端口





### jenkins 快速入门

它是java语言写的cicd，

他是一套用java写的cicd 系统，通过 ssh可以与服务器打交道



### 实现思路

jenkins



### 实现步骤

第一步：拉取 jenkins 镜像，以此为镜像生成容器

第二步：安装配置 jenkins 

第三步：准备 node 服务

第四步：jenkins 部署 node 服务



### 第一步：生成jenkins容器

先从dockerhub上拉取jenkins

```shell
docker pull jenkins/jenkins:lts
```

创建一个 jenkins 目录

```shell
mkdir /home/johan/www/jenkins
```

提高此文件的权限

```shell
sudo chmod -R 777 /home/johan/www/jenkins
```

以 jenkins/jenkins:lts 为镜像生成一容器

```shell
docker run --name jenkins -p 8080:8080 -p 50000:50000 -d -v /home/johan/www/jenkins:/var/jenkins_home jenkins/jenkins:lts
```

`-d`： 后台运行

`-v`： 数据卷，将容器中的内容映射到本机上

查看容器内部日志

```shell
docker logs jenkins
```

输入域名网址查看 `jenkins` 是否安装成功

看到 解锁 jenkins，输入logs 中的密码，即能解锁



### 第二步：安装配置jenkins

按照安装推荐插件安装jenkins 的插件

#### 配合 jenkins

![docker_jenkins安装推荐的插件](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins安装推荐的插件.png)



需要等一段时间，下载这些插件

![docker_jenkins新手](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_jenkins新手.png)

**报错就重试，咔咔就是干**



#### 创建管理员账号

![docker_jenkins创建账号](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins创建账号.png)

保存成功，开始使用 jenkins

#### 换源

`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

前往 系统管理 ——> 插件管理 ——> 高级 ——> 拉到最下面

![docker_jenkins换源](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins换源.png)





#### 下载 ssh 插件

前往 系统管理 ——> 插件管理 ——> 可选插件

搜索 "Publish over SSH"，并安装

![docker_jenkins下载ssh插件](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins下载ssh插件.png)

#### 配置ssh

前往 系统管理 ——> 系统配置——> 拉到最下面（Publish over SSH）

![docker_jenkins配置ssh2](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins配置ssh2.png)

使用密码

![docker_jenkins设置服务器上的ssh](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins设置服务器上的ssh.png)

点击 Test Configuration，已经和服务器接通

#### 安装 nodejs 插件

node插件在跑node项目时需要使用，这里先安装好

前往 系统管理 ——> 插件管理 ——> 可选插件

搜索node，并安装

#### 全局配置node 

前往 系统管理 ——> 全局工具配置 ——> NodeJS

![docker_jenkins安装node插件1](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\docker_jenkins安装node插件1.png)

应用并保存它

关于jenkins 的搭建到此告一段落



### 第三步：准备 node 服务

我们拿上一章讲的koa为例子讲解

生成 `.gitignore` 文件，并写入 `node_modules`

将 dockerfile_koa_demo 上传至 github

```shell
git init
git add .
git commit -m 'first_commit'
git remote add origin https://github.com/johanazhu/dockerfile_koa_server.git
git push -u origin master
```



### 第四步： jenkins 部署 node 服务

#### 创建一个任务

![jenkins新建任务](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins新建任务.png)

#### 起任务名

![jenkins起任务名字](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins起任务名字.png)

#### 任务描述

![jenkins任务描述1](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins任务描述1.png)

![jenkins任务描述2](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins任务描述2.png)

![jenkins任务描述3](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins任务描述3.png)

![jenkins任务描述5](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins任务描述5.png)

代码如下：

```shell
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

第四行：进入服务器中的jenkins数据卷相对于的目录

注意：`dockerfile_koa_server`为你一开始创建该项目时的名字

第五行：生成一个名叫johanbo/koa_server:v1.0.0 的镜像

第六行：生成一个以johanbo/koa_server:v1.0.0为镜像的名字叫做 koa_server_container 的容器，并将本机的3011端口与容器的3010做映射

应用并保存

#### 立即构建服务

![jenkins控制台输出](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins控制台输出.png)

发现成功，并且能看到“hello，docker“

在本地更改原文件app.js

```javascript
app.use(async ctx => {
    ctx.body = 'hello, docker, jenkins'
})
```

提交代码至github

通过jenkins 再次部署 node 服务

![jenkins立即构建](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins立即构建.png)

构建完成，刷新浏览器，发现内容已经更换

![jenkins部署成功](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\jenkins\jenkins部署成功.png)

### 总结

在实际开发中其实踩了很多坑，虽然有很好的别人写过的教程，但自己动手做时却有各种限制，比如操作系统不同，秘钥，jenkins的SSH插件，jenkins里支持docker命令的插件集成问题等等

网上关于两种的教程也有很多，但大多数是默认：jenkins 和应用部署在同一台服务器上，这样就能在相对应的文件中构建镜像，

但如果 jenkins 和应用程序是部署在两台服务器上该如何操作呢？留给下一个挑战者







参考文章：

1. 怎样用 Jenkins、Docker 和 CI/CD 构建无服务器应用程序？

https://www.infoq.cn/article/0sueQNsY9tLDVi79UZms

2. 【手把手系列之】Jenkins+Docker自动化部署vue项目

https://juejin.im/post/6844903984419831815

3. Failed to add SSH key. Message [invalid privatekey 问题

http://www.wallcopper.com/linux/3689.html

4. jenkins配置publish over ssh遇到的问题

https://zhuanlan.zhihu.com/p/39549204

5. Build, Publish, Deploy and Test Docker images and containers with Jenkins Workflow

https://www.slideshare.net/Docker/build-publish-deploy-and-test-docker-images-and-containers-with-jenkins-workflow



参考视频：

Building Docker Images using Jenkins step by step | Devops Integration Live Demo | JavaTechie

https://www.youtube.com/watch?v=mszE-OCI2V4





