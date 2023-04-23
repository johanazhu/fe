# Linux 导航

> 犹太人最厉害的手段是调起人的欲望
>
> 没有阴谋，都是阳谋，所谓阴谋都是掌握的信息不够

Linux 是一个前端通往编程高手必不可少的技能之一。笔者在写这篇文章时对 Linux 的认识也许不如后端大牛们，这一 Linux 系列只是作为前端的笔记

这一系列主要围绕一个前端需要掌握的运维知识展开

- Linux 常用命令


- Linux 基本概念


- Shell 命令


- Vim 谅解书


- 日志与定时任务




先来了解下，什么是 Linux

## Linux 是什么

一句话解释：开源的类UNIX操作系统

我们常说的 Linux 操作系统全称是 GNU/Linux。单独的 Linux 一般指的并不是操作系统，而是操作系统的 kernel（内核）。Linux 内核和 GNU 组合在一起才是操作系统

Linux内核最初只是由芬兰人林纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的

## 发展历史

如下图所示，Unix 是祖爷爷，Linux 是家族创始人，它让家族发扬光大

![Linux 和 Unix 的关系](https://s2.loli.net/2022/12/26/F7tyJ98PMOu2NLV.png)

## 常用 Linux 发行版

单靠 Linux 内核，我们无法做任何事情，只有内核和应用程序在一起，我们才能使用

发行版（distro）的英文是 distribution，是内核和应用程序的集合。一个典型的 Linux 发行版包括：Linux 内核，一些 GNU 程序库和工具，命令行 bash，也会包含图形界面

发行版有很多，可以在 [distrowatch](https://distrowatch.com/) 上查看各个版本的发行版

常见的有

- Ubuntu[新手推荐]：安装简单，界面友好，社区活跃
- CentOS[推荐]：Red Hat的开源版
- archlinux[老手常用]：最小的基本系统
- Debian：适合系统管理和运维
- Deepin：国产的深度发行版，界面做的非常好看
- ...

社区里，Ubuntu 和 CentOS 用的人最多，很多教程也是基于这两种操作系统讲解 Linux 及运维知识的



## 前端开发时用到的 Linux 命令

笔者使用的 window 操作系统，安装 WSL 后，使用 WSL 来开发应用，开发完之后，通过ssh 连接远程服务器，并实现 ssh 远程推送
