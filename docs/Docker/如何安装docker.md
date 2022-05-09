# 如何安装以及镜像加速

## 如何安装

菜鸟教程上有所有系统的[安装教程](https://www.runoob.com/docker/windows-docker-install.html)

也可看这篇文章——[Win10 专业版安装 Docker](https://zhuanlan.zhihu.com/p/85048683) ，19 年 10 月份写的，在未来几年里，够用。

就我而言，因为是Window系统，所以就是去官网[下载](https://download.docker.com)，镜像加速，打开 **Hyper-V**，再启动docker 即可

2022年时，安装 Docker 最新版客户端

- Windows 需要 10 以上版本，且[**开启 WSL2 功能**](https://docs.microsoft.com/zh-cn/windows/wsl/install)

- macOS 需要 10.15 以上版本，且不能安装 VirtualBox，见[官网教程](https://docs.docker.com/desktop/mac/install/)

- Linux 需要 3.10 以上版本的内核，以及[其他要求](https://docs.docker.com/engine/install/binaries/)

运行 Docker Desktop ，右下角会出现小鲸鱼的 logo，打开终端

```shell
docker version
```

![docker_version](https://s2.loli.net/2022/05/08/7EiQ9GCRsxpOgjc.png)

从打印出的信息中我们可以看出，它的 Server 里的 OS（操作系统）是 linux，也正式我们想要的，如果是 window，需要切换小鲸鱼图标

看到 Switch to Window containers ... 说明是 Liunx 版本

![set_linux环境](https://s2.loli.net/2022/05/08/hPtfkq4O3LS5lsj.png)

如下是 Docker 切换成 window 后的样子（看 OS/Arch）

![docker_version_window](https://s2.loli.net/2022/05/08/wbTdvSmEsoZaOkQ.png)

点击小鲸鱼，登录账号，以后发布自己的 docker 镜像就可以命令行直接推送至 docker hub，原理跟 git 一样

## 镜像加速

在网上搜索「Docker 加速」得到[教程](https://www.runoob.com/docker/docker-mirror-acceleration.html)

找到合适自己系统的教程，照做即可，如果失败，就换个教程
