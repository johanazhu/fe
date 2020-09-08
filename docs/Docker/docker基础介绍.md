#	docker 基本介绍

### 一句话总结

dockerfile：类似于“package.json”

Image：类似于”Win7纯净版.rar“

Container:  一个完整的操作系统



### docker是什么？

​	docker是用Go语言实现的开源项目，可以让我们方便的创建和使用容器，docker将程序以及程序所有的依赖都打包到docker container，这样你的程序可以在任何环节都会有一致的表现，这里程序运行的依赖也就是容器就好比集装箱，容器所处的操作系统环境就好比货船或港口，**程序的表现只和集装箱有关系（容器），和集装箱放在哪个货船或者哪个港口（操作系统）没有关系**

​	容器技术**只隔离应用程序的运行时环境但容器之间可以共享一个操作系统**，这里的运行时环境指的是程序运行依赖的各种库以及配置

注意，容器是一种通用技术，docker只是其中的一种实现



### docker的优点

1. 环境隔离
   - docker 实现了资源隔离，实现一台机器运行多个容器互不影响。基于容器来开发、部署、运行应用程序
2. 更快速的交付部署
   - 使用 docker ，开发者可以利用镜像快速构建一套标准的研发环境，开发完成后，测试和运维人员可以直接通过使用此镜像部署代码
3. 更高效的资源利用
   - docker 的运行不需要额外的虚拟化管理程序的支持，它是内核级的虚拟化，可以实现更高的性能，同时对资源的额外需求很低
4. 更易迁移扩展
   - docker 几乎可以在任意平台上运行
5. 更简单的更新管理
   - 使用 dockerfile，只需要小小的配置修改，就可以代替意外大量的更新工作，并且所有修改都是以增量的方式进行分发和更新，从而实现自动化和搞笑的容器管理
6. 重启更快
   - docker 的启动只需要几秒，虚拟机要几分钟



###	docker的三个概念

docker 的整个生命周期由三部分组成：镜像（image）+ 容器（constainer）+ 仓库（repository）

每台宿主机（电脑），下载好了 docker 后，可以生成多个镜像，每个镜像，可以创建多个容器。发布到仓库时，以镜像为单位。可以理解成：一个容器就是一个独立的虚拟操作系统，互不影响，而镜像就是这个操作系统的安装包。想要生成一个容器，就要安装包（镜像）生成一次，这就是 Docker 的核心概念



####	镜像（Image）

​	类似于虚拟机上的镜像，是一个包含有文件系统的面向 docker 引擎的**只读**模板。任何应用程序运行都需要环境，而镜像就是用来提供这种运行环境的。例如一个 Ubuntu 镜像就是一个包含 Ubuntu 操作系统环境的模板（安装包），同理在该镜像上装上 Apache 软件，就可以称为 Apache 镜像

####	容器（Container）	

​	类似于一个轻量级的沙盒，可以将其看作一个极简的 Linux 系统环境（包括 root 权限、进程空间、用户空间和网络空间等），以及运行在其中的应用程序。Docker 引擎利用容器来运行，隔离各个应用。容器是镜像创建的应用实例，可以创建、启动、停止、删除容器，各个容器之间是相互隔离的，互不影响。

​	注意：镜像本身是只读的，容器从镜像启动时，Docker 在镜像的上层创建一个可写层，镜像本身不变。

####	仓库（Repository）

​	类似于代码仓库，这里是镜像仓库，是 Docker 用来集中存放镜像文件的地方。

​	注意与注册服务器（Registry）的区别：注册服务器是存放仓库的地方，一般会有多个仓库；而仓库是存放镜像的地方，一般每个仓库存放一类镜像，每个镜像利用tag进行区分，比如Ubuntu仓库存放有多个版本（12.04、14.04等）的Ubuntu镜像



### 传统的虚拟机与容器对比

![虚拟机和容器](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\虚拟机和容器.jpg)

可以看出，传统的虚拟机是每开一个虚拟机，相当于运行一个系统，这种是非常占用系统资源的，但容器（以docker为例）。也起到了应用之间的隔离效果

它的底层是通过namespace（命名空间）和control groups来实现

其本质就是将重复的资源公有化，让资源分配更加合理

这样做除了资源分配合理外，还能做到应用程序的环境统一化



![repository、image和container](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\repository、image和container.png)



### 基于docker的开发过程

开发者通过 dockerfile 生成（build）一个镜像（image），通过 `docker run ... ` 生成一个容器（constainer），可以把这个镜像推送至远程仓库上（`docker push`），既可以供别人下载（`docker pull`）再 run 生成容器。而一些环境变量可以写进 dockerfile 中，这样就保持了环境的一致性，可移植到任何服务器上



### docker的技术实现

namespace 解决的问题是环境隔离问题

cgroup 解决计算机资源使用上的隔离



### docker架构图

![docker架构图](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker架构图.jpg)



### docker是如何工作的

docker使用的是常见的CS架构，也就是client-server模式，docker client负责处理用户输入的各种命令，比如docker build、docker run，真正工作的其实是server，也就是docker daemon（守护进程），值得注意的是，docker client和docker daemon可以运行在同一台机器上

我们用几个命令来解释下docker工作流程：

#### docker build

当我们写完dockerfile交给docker“编译”时使用这个命令，那么client在接收到请求后转发给docker daemon，接着docker daemon根据dockerfile创建出“可执行程序”image

![docker_build](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_build.png)

#### docker run

有了“可执行程序”image后就可以运行程序了，接下来使用命令docker run，docker daemon接收到该命令后找到具体的image，然后加载到内存可以执行，image执行起来就是所谓的container

![docker_run](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_run.png)

#### docker pull

其实docker build和docker run是两个最核心的命令，会用这两个命令基本上docker就可以用起来，剩下的就是一些补充。

docker pull是什么意思，学过git的同学都知道有git pull，从远端仓库拉数据，你可以将你的image放到docker hub上，我们使用docker pull，就是从docker hub上下载image

这个命令的实现很简单，用户通过docker client发送命令，docker daemon接受到命令后向docker registry发送image下载请求，下载后存放在本地，这样我们就可以使用image了

![docker_pull](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_pull.png)

