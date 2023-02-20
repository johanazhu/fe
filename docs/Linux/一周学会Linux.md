# 一周学会 Linux

学习资料：[2021韩顺平 一周学会Linux](https://www.bilibili.com/video/BV1Sv411r7vd)



Linux 命令大全（手册）：https://www.linuxcool.com/



Linux 基础篇

- linux 入门
- vm 和 linux 安装
- linux 目录结构

实际操作篇

- 远程登录（XShell XFtp）
- 使用指令
- 进程管理
- 用户管理
- Vi 和 Vim 编辑器
- 定时任务调度
- RPM 和 YUM
- 开机、重启和用户登录注销
- 磁盘分区、挂载
- 网络配置

高级篇

- 日志管理
- Linux 内核源码&内核升级
- Linux 可视化管理webmin 和 bt 运维工具
- 定制自己的 Linux

Shell 编程

- 概述
- ...



## linux 入门

### linux 介绍

#### Linux 之父

Linux Torvalds

Git传作者

查看最新版本的 Linux：https://kernel.org/

#### 主要发行版

Ubuntu、RedHat、CentOS、Detain、Fedora、SuSE、OpenSUSE

### Linux 和 Unix 的关系



![Linux 和 Unix 的关系](https://s2.loli.net/2022/12/26/F7tyJ98PMOu2NLV.png)



### 基于 docker 启动 Linux

基于 docker 启动 linux（Centos）

先拉取 centos 镜像

```bash
docker pull centos
```

基于 centos 创建容器

```bash
docker run -it --name="centor_test" centos /bin/bash
```

> PS：这行代码的意思是基于 centos 这个镜像创建一个名字叫 centos_test 的容器，运行并且进入这个容器

进入其中后，输入 `ls` ，就能看到 linux 根目录

![linux 根目录](https://s2.loli.net/2022/12/26/WoBuQ6H7af5jRgF.png)



### linux 目录结构

#### 基本介绍

linux 的文件系统时采用级层式的树状目录结构，在此结构上的最顶层是根目录“/”

在 Linux 世界里，一切皆文件



- /bin【常用】： bin（/usr/bin、/usr/local/bin） 是 Binary 的缩写，存放二进制可执行文件（ls、cat、mkdir 等），常见命令一般放这个目录
- /sbin：sbin（/usr/sbin、/usr/local/sbin）中的 s 是 Super User 的意思，这里存放的是系统管理员使用的系统管理程序
- /boot【常用】：这里存放启动 Linux 时使用的核心文件，包括一些连接文件以及镜像文件
  - grub：开机设置相关文件
  - 内核文件（vmlinuz）
- /dev： dev 是 Device（设备）的缩写，存放 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的
- /etc【常用】：存放所有系统管理所需要的配置文件和子目录
  - 来源于拉丁语全称etcetera，意为等等，零星杂物。装的都是些杂七杂八的配置文件
  - rc.d：存放不同运行等级的启动脚本的链接文件
  - 比如安装了 mysql 数据库 my.conf
- /home【常用】：用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名以用户的账号命名
  - johan
  - elaine
  - lilei
- /lib：存放系统最基本的动态链接共享库和模块文件
- /lost+found：一般情况是空的，当系统非法关机后，这里会粗放一些文件
- /media：会自动识别一些设备，例如U盘、光驱等，当识别后，linux 会把识别的设备挂载到这个目录下
- /mnt【常用】：系统提供该目录是iwie了让用户临时挂载别的文件系统的，可以将外部的存储挂载在 /mnt/ 上，然后进入该目录就可以查看里面的内容
- /opt：给主机额外**安装软件**所存放的目录，如安装 node、python 安装包时，先把软件安装到者
- /proc【不能动】：虚拟目录，是系统内存的映射，访问它能获取系统信息
- /root：系统管理员目录
- /sbin： s 是 Super User 的意思，这里存放系统管理员使用的系统管理程序
- /srv【不能动】： 存放一些服务启动后需要提取的数据
- /sys【不能动】：文件系统 sysfs
- /tmp：存放临时文件
- /usr【常用】：非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录
  - /usr/bin：系统用户使用的引用程序
  - /usr/sbin：超级用户使用的管理程序和系统守护程序
  - /usr/src：内核源代码默认的放置目录
  - /usr/local【常用】：给主机额外安装软件所安装的目录，一般是通过编译源码方式安装的程序
- /var【常用】：存放不断扩充的东西，我们习惯将经常被修改的目录放在这个目录下，包括各种日志文件
- /run：临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件会被删掉



## 实际操作篇

### Vi 和 Vim 编辑器

Linux 系统会内置 vi 文本编辑器

Vim 具有程序编辑的能力，可以看做是 Vi 的增强版本



### 关机和重启命令

shutdown -h now ：立即关机

shutdown -h 1：1分钟后关机

shutdown -r now：现在重新启动计算机

halt：关机，作用和上面一样

reboot：重启计算机

sync：把内存的数据同步到磁盘



### 用户登录和注销

登陆时尽量少用 root 账号登录，因为它权限最大，普通用户登录，登录后用 ”su - root“切换到root 账号

注销账号：在 root 权限下，logout，退出

### 

### 用户管理

添加用户：useradd 用户名



- 进程管理
- 定时任务调度
- RPM 和 YUM
- 开机、重启和用户登录注销
- 磁盘分区、挂载
- 网络配置



。

。

。

。



### RPM 和 YUM

#### rpm包的管理

##### rpm简单介绍

rpm用于互联下载包的打包及安装工具，它包含在某些 Linux 发行版中，它生成具有.RPM扩展名的文件。RPM是 RedHat Package Manager（RedHat软件包管理工具）的缩写，类似 windows 的setup.exe，这一文件格式名称虽然打赏了 RedHat 的标志，但理念是通用的

Linux 的发行版都有采用（suse，redhat，centos 等等），可以算是公认的行业标准

##### rpm 包的简单查询指令

查询已安装的 rpm 列表：rpm -qa | grep xx

举例子：看看当前系统，是否安装了 firefox

##### rpm 包名基本格式

一个rpm包名：firefox-60.2.2-1.el7.centos.x86_64

名称：firefox

版本号：60-2.2-1

适用的操作系统：el7.centos.x86_64

表示 centos7.x 的64位系统

如果是 i686、i386表示 32位系统，noarch 表示通用

##### rpm包的其他查询指令

rpm -qa：查询所安装的所有 rpm 软件包

##### 安装 rpm 包

rpm -ivh RPM包名路径全程

-i：install 安装

v：verbose 提示

h：hash 进度条

##### 卸载 npm 包

rpm -e firebox



#### YUM

yum 的介绍

yum 是一个 shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次性安装所有依赖的软件包

yum 的基本指令

查询 yum 服务器是否有需要安装的软件

yum list | grep xx 软件列表

yum list xxx 下载安装



### apt-get

。。。



## Shell 编程

### Shell 是什么

Shell 是一个命令行解释器，它位用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序

脚本格式要求

1. 脚本以 `#!bin/bash` 开头
2. 脚本需要可执行权限

脚本的常用执行方式

方法1：输入脚本的绝对路径或相对路径

首先要赋予 hello.sh 脚本的 +x 权限，再执行脚本

比如 ./hello.sh 或者使用 /root/demo/hello.sh

方法2：sh + 脚本

不用赋予脚本 +x 权限，直接执行即可

比如 `sh hello.sh`

### Shell  的变量

shell 变量介绍

Linux Shell 中的变量分为，系统变量和用户自定义变量

系统变量：$HOME、$PWD、$SHELL、$USER，比如 echo $HOME 等

显示当前 shell 中所有变量：set



P92





## 3天搞定Linux，1天搞定Shell，清华学神带你通关











## 参考资料



- [3天搞定Linux，1天搞定Shell，清华学神带你通关](https://www.bilibili.com/video/BV1WY4y1H7d3)











