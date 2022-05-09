# docker-compose



## 介绍

软件设计和开发，有单一职责原则。Docker 也一样，每个容器只负责一个服务

如果开发环境需要多个服务（nodejs mysql mongodb redis），就需要启动多个 Docker 容器

要连同着多个 Docker 容器，就需要 docker-compose

docker-compose 解决了容器与容器之间如何管理编排的问题

## 安装

一行命令即可安装。完成之后运行 `docker-compose --version` 可以看到当前版本

## 配置文件

新建 `docker-compose.yml` 文件

```yml
version: "3"
services:
   db:
     image: mysql:5.7
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "5555:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
volumes:
  db_data:
```

docker-cpmpose 基本结构

![docker-cpmpose 基本结构](https://i.loli.net/2021/09/13/EpdCZlwPauW5tBU.png)

## 语法

服务（`service`）：一个应用的容器，实际上可以包括若干相同镜像的容器实例

项目（`project`）：由一组关联的应用容器组成的一个完整业务单元，在 `docker-compose.yml` 文件中定义

`compose` 的默认管理对象是项目，通过子命令对项目的一组容器进行便捷的生命周期管理
