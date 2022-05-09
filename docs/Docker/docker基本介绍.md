# docker 基本介绍

## 简介

Docker 是一种虚拟机技术，比传统虚拟机（如 vmware、virtualbox）要更加简单、轻量

- 启动快
- 资源占用少
- 体积小

## 一句话总结

dockerfile：类似于“package.json”

Image：类似于”Win7 纯净版.rar“

Container: 一个完整的操作系统



## 基本概念

之前使用虚拟机（vmware、virtualbox）时，步骤如下

- 下载一个 `centos.iso` 文件

- 使用 vmware 安装一个系统 A
- 使用 vmware 安装一个系统 B
- ...

此处的 `centos.ios` 文件就是一个 image 镜像，安装出来的系统就是一个一个 container 容器

docker 的所有 image 都可以在 https://hub.docker.com/ 搜索并下载，还可以自定义 image 上传到这个仓库

![一图概述docker](https://i.loli.net/2021/09/12/LoxTrBCjHymvEia.png)



### 为什么要用 docker

![虚拟机VSDocker](https://i.loli.net/2021/08/18/UwI9zfLo7pmKHJO.png)

![虚拟机和容器](https://s2.loli.net/2022/04/23/LvHYhegzBnAOoDJ.jpg)

如上两图所示，容器技术将常见的技术封装到容器中，并通过 namespace 和 control groups 对每个容器进行分离，将重复的资源公有化，除此之外，还能做到应用程序的环境统一化

> 容器是一种通用技术，docker 只是其中的一种实现

### docker 是什么

docker 是用 Go 语言实现的开源项目，可以让我们方便的创建和使用容器，docker 将程序以及程序所有的依赖都打包到 docker container，这样你的程序可以在任何环节都会有一致的表现

### docker 的优点

环境隔离、更快速地交付部署、更高效的资源利用、更易迁移扩展、更简单的更新管理、重启更快

## 启动一个Docker 容器

如果没有安装，可以再 [play with docker](https://labs.play-with-docker.com/) 或者 [freeaihub](https://www.freeaihub.com/kubernetes/setup.html) 体验一下

## docker 的三个概念

docker 的整个生命周期由三部分组成：镜像（image）+ 容器（constainer）+ 仓库（repository）

每台宿主机（电脑），下载好了 docker 后，可以生成多个镜像，每个镜像，可以创建多个容器。发布到仓库时，以镜像为单位。可以理解成：一个容器就是一个独立的虚拟操作系统，互不影响，而镜像就是这个操作系统的安装包。想要生成一个容器，就要安装包（镜像）生成一次，这就是 Docker 的核心概念

### 镜像（Image）

类似于虚拟机上的镜像，是一个包含有文件系统的面向 docker 引擎的**只读**模板。任何应用程序运行都需要环境，而镜像就是用来提供这种运行环境的。例如一个 Ubuntu 镜像就是一个包含 Ubuntu 操作系统环境的模板（安装包），同理在该镜像上装上 Apache 软件，就可以称为 Apache 镜像

### 容器（Container）

类似于一个轻量级的沙盒，可以将其看作一个极简的 Linux 系统环境（包括 root 权限、进程空间、用户空间和网络空间等），以及运行在其中的应用程序。Docker 引擎利用容器来运行，隔离各个应用。容器是镜像创建的应用实例，可以创建、启动、停止、删除容器，各个容器之间是相互隔离的，互不影响。

注意：镜像本身是只读的，容器从镜像启动时，Docker 在镜像的上层创建一个可写层，镜像本身不变。

### 仓库（Repository）

类似于代码仓库，这里是镜像仓库，是 Docker 用来集中存放镜像文件的地方。

注意与注册服务器（Registry）的区别：注册服务器是存放仓库的地方，一般会有多个仓库；而仓库是存放镜像的地方，一般每个仓库存放一类镜像，每个镜像利用 tag 进行区分，比如 Ubuntu 仓库存放有多个版本（12.04、14.04 等）的 Ubuntu 镜像



## 基于 docker 的开发过程

开发者通过 dockerfile 生成（build）一个镜像（image），通过 `docker run ...` 生成一个容器（constainer），可以把这个镜像推送至远程仓库上（`docker push`），既可以供别人下载（`docker pull`）再 run 生成容器。而一些环境变量可以写进 dockerfile 中，这样就保持了环境的一致性，可移植到任何服务器上



## docker 架构图

![docker架构图](https://s2.loli.net/2022/04/23/uYm2lQ5oEVb4Csw.jpg)







