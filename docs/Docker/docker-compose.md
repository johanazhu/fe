## docker-compose

服务（`service`）：一个应用的容器，实际上可以包括若干相同镜像的容器实例

项目（`project`）：由一组关联的应用容器组成的一个完整业务单元，在 `docker-compose.yml` 文件中定义

`compose`  的默认管理对象是项目，通过子命令对项目的一组容器进行便捷的生命周期管理



创建`docker-compose.yml` 文件

```shell
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

## 构建并运行项目

运行 `docker-compose up -d` Compose 就会拉取镜像再创建我们所需要的镜像，然后启动 `wordpress` 和数据库容器。 接着浏览器访问 `127.0.0.1:5555` 端口就能看到 `WordPress` 安装界面了。





### 什么是docker-compose

通过 docker-compose 用户可以很容器地用一个配置文件定义一个多容器的应用

docker-compose 解决了容器与容器之间如何管理编排的问题





























