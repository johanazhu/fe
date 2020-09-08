# 如何安装docker

具体可看 [这篇文章](https://zhuanlan.zhihu.com/p/85048683) ,19年10月份写的，在未来几年里，够用。

也可以直接去官网的[下载地址](https://download.docker.com)下载

值得注意的是，必须要开启 **Hyper-V** 

下载安装好docker后，运行 Docker Desktop ，右下角会出现小鲸鱼的logo，打开终端

```shell
docker version
```

![docker_version](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_version.png)

从打印出的信息中我们可以看出，它的Server里的OS（操作系统）是linux，也正式我们想要的，如果是window，需要切换小鲸鱼图标

看到 Switch to Window containers ... 说明是 Liunx 版本

看到 Switch to Linux containers ... 说明是 window 版本

![set_linux环境](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\set_linux环境.png)

如下是Docker切换成window后的样子（看OS/Arch）

![docker_version_window](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_version_window.png)

点击小鲸鱼，登录账号，以后发布自己的docker 镜像就可以命令行直接推送至docker hub，原理跟git一样