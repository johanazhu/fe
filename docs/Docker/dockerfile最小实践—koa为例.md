# dockerfile 最小实践——koa为例



最小实践，意味着将链路打通，打通后站在全局看问题，问题能看的清晰，这一章，我将带你实现一个最简单的node服务，以koa为例

先决知识：对docker有一定的了解，但是不知道如何操作dockerfile



https://mp.weixin.qq.com/s?__biz=MzA5ODQyNzk3MQ==&mid=2451546466&idx=1&sn=a5f9c494da20070ab0ec94ffd52d0502&chksm=877ab44eb00d3d5822deeafb0f55d3fe38855aa8b00c17300158976b9b0693304e61d9c58180&scene=21#wechat_redirect





先生成一个dockerfile，就好比package.json，

docker build 它，就能哪找dockerfile上的指令生成一个镜像，接着按照镜像生成（run）一个容器，查看是否能通，如果通的话，就 push 到远端仓库。在你的服务器上 pull 该仓库，并生成一个容器

这就是最小实现 







dockerfile——>Image——>container



这样就解决了环境不统一的问题，所有的环境变量写进 dockerfile 中，都是基于镜像，环境变量没有问题

但是这个也有个问题，太繁琐，cicd不够自动化

可以使用 travis 来实现持续集成，通过



jenkins





这样我们与运维就没怎么打交道了

我们可以在开发目录下生成一个dockerfile，将npm build 生成的静态文件写进 dockerfile 中，





jenkins 是什么？

他是一套用java写的cicd 系统，通过 ssh可以与服务器打交道











那jenkins 怎么和服务器打交道呢？

```shell
docker stop vuenginxapp || true \
 && docker rm vuenginxapp || true \
 && cd /Users/isaacho/Documents/application/docker/jenkins_home/workspace/vueclidemoapp  \
 && docker build  -t vuenginxapp  . \
 && docker run -d -p 8083:80 --name vuenginxapp -v /Users/isaacho/Documents/application/docker/jenkins_home/workspace/vueclidemoapp/dist:/usr/share/nginx/html -v /Users/isaacho/Documents/application/docker/jenkins_home/workspace/vueclidemoapp/nginx.conf:/etc/nginx/nginx.conf vuenginxapp

```





docker +  jenkins

https://www.cnblogs.com/newAndHui/p/11298624.html

https://juejin.im/post/6844903984419831815#heading-9









我希望做成什么样

git push 到仓库，在 jenkins 上点击发布就能发布。

jenkins 绑定 远端仓库 和 服务器

git push 到 仓库后，jenkins 监听到，执行脚本

删除原来的容器，并生成一个新的容器 映射出端口





dockerfile 简化了操作，制定了标准

比如你完全可以通过 

docker run -it --name express_server -p 3000:3000 imageName /bin/bash

来启动

但也完全可以通过dockerfile 把一些标准写进docker













网上的很多关于jenkins 和 docker 的教程资料，他们的前提是：jenkins 和 应用部署在同一个服务器上，这样在jenkins中压缩服务，并在构建完成后解压它 build 新的镜像并 跑一个容器

但如果说





运行远程登录

https://jingyan.baidu.com/article/2fb0ba40982a2500f2ec5f37.html





jenkis 

Failed to add SSH key. Message [invalid privatekey 问题

http://www.wallcopper.com/linux/3689.html



秘钥垃圾

直接用密码登录

https://zhuanlan.zhihu.com/p/39549204



jenkins 与 docker 结合

在jenkins 中安装 docker 插件

https://cloud.tencent.com/developer/article/1415889

其中，他们的关系是：

- Docker commons Plugin为其他与Docker相关的插件提供了APIs
- CloudBees Docker Build and Publish plugin和Docker build step plugin都依赖了Docker commons Plugin
- Kubernetes Plugin依赖了Docker Plugin



docker jenkins 部署

https://www.slideshare.net/Docker/build-publish-deploy-and-test-docker-images-and-containers-with-jenkins-workflow





别人docker 化 jenkins

https://blog.csdn.net/qq_21767263/article/details/85930963



docker images using kenkins 

https://www.youtube.com/watch?v=mszE-OCI2V4