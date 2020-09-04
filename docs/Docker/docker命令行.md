# docker 常见命令



`docker version`      查看 `Docker` 客户端和服务端的信息

`docker images`		查看所有的镜像（`image`）

`docker ps -a` 		查看所有启动过的容器（`container`）

`docker container ls` 	查看所有**正启动**的容器（`container`）

`docker pull`         拉取镜像

- docker pull node



`docker run -it -name express_demo -p 3000:3000 express_server:v1.0.1 /bin/bash `		根据镜像生成容器

参数说明：

- -i：
- -t：
- -name    给这个容器起名字
- -p     端口映射，本机端口（启动容器的宿主机）：镜像端口

一般我会安装 -it -name -p 的写法，把根据那个镜像启动放在最后面

`docker run -it -name express_demo -p 3000:3000 express_server:v1.0.1 /bin/bash `

以上的代码翻译成白话文就是：

根据express_server:v1.0.1 版本的镜像启动一个名字叫express_demo 端口为3000的容器并进入容器内，注意本机端口对应镜像中的3000端口



进入容器：docker run -t -i express_server:v1.0.1 /bin/bash

构建容器： docker build -t express_server:v1.0.1

进入正在运行的容器：docker exec -it 1d0db /bin/bash

生产

打包镜像：docker save express_server:v1.0.1 > express_server.tar

导出镜像： docker load <express_server.tar>

创建

docker commit <原修改后容器ID> <新容器名称>



`docker rmi image名`	删除镜像

`docker rm 168d445a98a3` 	删除容器



`docker stop xx` 停止容器

`docker start xx`	运行已经停止的容器

`docker kill xx` 	直接关闭容器





`docker images` === `docker image ls`







### 详细

`docker version`      看到 `Docker` 客户端和服务端的信息

![docker_version](D:\code\project\elaine\fe\docs\.vuepress\public\images\Docker\docker_version.png)

