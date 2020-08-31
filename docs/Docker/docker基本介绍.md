#	docker 基本介绍

##	docker是什么？

​	docker 是一个虚拟环境容器，可以讲你的开发环境，代码，配置文件等一并打包到这个容器中，并发布和应用到任何平台上。

##	docker的三个概念

###	镜像（Image）

​	类似于虚拟机上的镜像，是一个包含有文件系统的面向docker引擎的**只读**模板。任何应用程序运行都需要环境，而镜像就是用来提供这种运行环境的。例如一个Ubuntu镜像就是一个包含Ubuntu操作系统环境的模板，同理在该镜像上装上Apache软件，就可以称为Apache镜像

###	容器（Container）	

​	类似于一个轻量级的沙盒，可以将其看作一个极简的Linux系统环境（包括root权限、进程空间、用户空间和网络空间等），以及运行在其中的应用程序。Docker引擎利用容器来运行，隔离各个应用。容器是镜像创建的应用实例，可以创建、启动、停止、删除容器，各个容器之间是相互隔离的，互不影响。

​	注意：镜像本身是只读的，容器从镜像启动时，Docker在镜像的上层创建一个可写层，镜像本身不变。

###	仓库（Repository）

​	类似于代码仓库，这里是镜像仓库，是Docker用来集中存放镜像文件的地方。

​	注意与注册服务器（Registry）的区别：注册服务器是存放仓库的地方，一般会有多个仓库；而仓库是存放镜像的地方，一般每个仓库存放一类镜像，每个镜像利用tag进行区分，比如Ubuntu仓库存放有多个版本（12.04、14.04等）的Ubuntu镜像



传统的虚拟机与容器的架构图

![虚拟机和容器](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\虚拟机和容器.jpg)

可以看出，传统的虚拟机是每开一个虚拟机，相当于运行一个系统，这种是非常占用系统资源的，但容器（以docker为例）。也起到了应用之间的隔离效果

它的底层是通过namespace（命名空间）和control groups来实现



无非就是将重复的东西公共化，让资源分配更合理。

这样做除了资源分配合理外，还能做到应用程序的环境统一化



![repository、image和container](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\repository、image和container.png)

整个过程：

开发者通过 dockerfile 生成（build）一个镜像（image），通过 docker run -t -p ... 生成一个容器（constainer），也可以把这个镜像推送至远程仓库上，既可以供别人下载，也可以用于你在自己的服务器上通过docker pull 拉取代码，再 run 生成容器。因为去服务上拉代码和 run 是个重复的话，可以通过钩子来实现cicd





docker 的整个生命周期由三部分组成：镜像（image）+ 容器（constainer）+ 仓库（repository）

每台宿主机（电脑），他下载好了 `Docker` 后，可以生成多个镜像，每个镜像，可以创建多个容器。发布到仓库时，以镜像为单位。可以理解成：一个容器就是一个独立的虚拟操作系统，互不影响，而镜像就是这个操作系统的安装包。想要生成一个容器，就要安装包（镜像）生成一次，这就是 `Docker` 的核心概念







### 什么是docker-compose

通过 docker-compose 用户可以很容器地用一个配置文件定义一个多容器的应用

docker-compose 解决了容器与容器之间如何管理编排的问题





dockerfile：类似于“package.json”

Image：类似于”Win7纯净版.rar“

Container:  一个网站的操作系统







dockerfile 生成镜像（image），push 到远程仓库，你要使用，就先pull 到本地，再run项目

