# docker 入门（介绍篇）

docker 是什么？

有什么用？





本质是对资源的更合理的运用

一个虚拟机技术中它关操作系统就有好几个G，但多数操作系统都是相同的，那么我们能不能将他们提取出来，公有化呢？

容器技术**只隔离应用程序的运行时环境但容器之间可以共享一个操作系统**，这里的运行时环境指的是程序运行依赖的各种库以及配置

如何使用容器呢？这就要讲到docker了

注意，容器是一种通用技术，docker只是其中的一种实现。



### 什么是docker？

docker是用Go语言实现的开源项目，可以让我们方便的创建和使用容器，docker将程序以及程序所有的依赖都打包到docker container，这样你的程序可以在任何环节都会有一致的表现，这里程序运行的依赖也就是容器就好比集装箱，容器所处的操作系统环境就好比货船或港口，**程序的表现只和集装箱有关系（容器），和集装箱放在哪个货船或者哪个港口（操作系统）没有关系**

### 如何使用docker

docker中有这样几个概念：

- dockerfile
- image
- container

image可以理解为可执行程序，conainer就是运行起来的进程

写程序需要源代码，那么“写”image就需要dockerfile，dockerfile就是image的源代码，docker就是“编译器”

因此我们只需要在dockerfile中执行需要哪些程序、依赖什么样的配置，之后把dockerfile交给“编译器”docker进行“编译”，也就是docker build命令，生成的可执行程序image，之后运行这个image，就是docker run命令，image运行起来后就是docker container

### docker是如何工作的

docker使用的是常见的CS架构，也就是client-server模式，docker client负责处理用户输入的各种命令，比如docker build、docker run，真正工作的其实是server，也就是docker daemon（守护进程），值得注意的是，docker client和docker daemon可以运行在同一台机器上

我们用几个命令来解释下docker工作流程：

#### 1.docker build

当我们写完dockerfile交给docker“编译”时使用这个命令，那么client在接收到请求后转发给docker daemon，接着docker daemon根据dockerfile创建出“可执行程序”image

![docker_build](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_build.png)

#### 2.docker run

有了“可执行程序”image后就可以运行程序了，接下来使用命令docker run，docker daemon接收到该命令后找到具体的image，然后加载到内存可以执行，image执行起来就是所谓的container

![docker_run](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_run.png)

#### 3.docker pull

其实docker build和docker run是两个最核心的命令，会用这两个命令基本上docker就可以用起来，剩下的就是一些补充。

docker pull是什么意思，学过git的同学都知道有git pull，从远端仓库拉数据，你可以将你的image放到docker hub上，我们使用docker pull，就是从docker hub上下载image

这个命令的实现很简单，用户通过docker client发送命令，docker daemon接受到命令后向docker registry发送image下载请求，下载后存放在本地，这样我们就可以使用image了

![docker_pull](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_pull.png)

### docker的底层实现

docker基于Linux内核提供这样几项功能实现的：

- #### NameSpce

  - 我们知道Linux中的PID、IPC、网络等资源都是原句的，而NameSpace机制是一种资源隔离方案，在该机制下这些资源就不再是全局的了，而是数据某个特定的NameSpace，各个NameSpace下的资源互不干扰，这就使得每个NameSpace看起来像个独立的操作系统一样，但只有NameSpace是不够的

- #### Control groups

  - 虽然有了NameSpace技术可以实现资源隔离，但进程还是可以不受控的访问系统资源，比如CPU、内存、磁盘、网络等，为了控制容器中进程对资源的访问，Dokcer蔡勇control groups（也就是cgroup），有了cgroup就可以控制容器中进程对系统资源的消耗，比如你可以限制某个容器使用内存的上限、可以在哪些CPU上运行等等





写给前端工程师的 Docker 入门

https://mp.weixin.qq.com/s?__biz=MzA5ODQyNzk3MQ==&mid=2451546466&idx=1&sn=a5f9c494da20070ab0ec94ffd52d0502&chksm=877ab44eb00d3d5822deeafb0f55d3fe38855aa8b00c17300158976b9b0693304e61d9c58180&scene=21#wechat_redirect





这可能是最为详细的 docker 入门吐血总结

https://mp.weixin.qq.com/s?__biz=MzU0OTE4MzYzMw==&mid=2247485835&idx=1&sn=77f2d1fd55431fcf957915fd4b60e56f&chksm=fbb28075ccc509633073cab07d5a3876ffbde2431fa786ff5aea1e6ce692a419b5dccec27b6e&mpshare=1&scene=1&srcid=0117ZnOKg0j4XPZVSuSrlWcF&sharer_sharetime=1579618549576&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



面试官：你简历中写用过docker，能说说容器和镜像的区别吗？

https://mp.weixin.qq.com/s?__biz=MzU0OTE4MzYzMw==&mid=2247485835&idx=1&sn=77f2d1fd55431fcf957915fd4b60e56f&chksm=fbb28075ccc509633073cab07d5a3876ffbde2431fa786ff5aea1e6ce692a419b5dccec27b6e&mpshare=1&scene=1&srcid=0117ZnOKg0j4XPZVSuSrlWcF&sharer_sharetime=1579618549576&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



前端工程师学 docker？ 看这篇就够了

https://mp.weixin.qq.com/s?__biz=MzI2NTk2NzUxNg==&mid=2247484402&idx=1&sn=0b2ba80bf872b2c4281236469aa83cc6&chksm=ea940101dde38817db7842b7f8a0e94c0210fc29d324fb35e17807b7e13015abc62473b1e70e&mpshare=1&scene=1&srcid=&sharer_sharetime=1584318796408&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



docker 入门看这篇就够了

https://mp.weixin.qq.com/s/CClZ9xRMN9mEgEXMm9MuGw

https://www.cnblogs.com/clsn/p/8410309.html