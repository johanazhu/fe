# docker 常见命令

### 常见命令

`docker version`      查看 `Docker` 客户端和服务端的信息

`docker --version`  	只查看版本

`docker images`		查看所有的镜像（`image`）

`docker images` === `docker image ls`

`docker ps -a` 		查看所有启动过的容器（`container`）

`docker container ls` 	查看所有**正启动**的容器（`container`）



### 运行容器

根据镜像生成容器：

`docker run -it --name express_demo -p 3000:3000 express_server:v1.0.1 /bin/bash `		

参数说明：

- -i：以交互模式运行容器，通常与 **-t** 同时使用
- -t：为容器重新分配一个伪输入终端，通常与 **-i** 同时使用
- --name    给这个容器起名字
- -p     端口映射，本机端口（启动容器的宿主机）：镜像端口
- -d     后台运行（`docker run -d -p 8000:80 nginx`）
- -v     数据卷(`docker run -d -v /home/johan/www/express_server:/www/express_server`)



一般我会安装 -it --name -p 的写法，把根据那个镜像启动放在最后面

`docker run -it --name express_demo -p 3000:3000 express_server:v1.0.1 /bin/bash `

以上的代码翻译成白话文就是：

根据express_server:v1.0.1 版本的镜像启动一个名字叫express_demo 端口为3000的容器并进入容器内，注意本机端口对应镜像中的3000端口



### 拉取

拉取镜像：

`docker pull 发布者名字(可有可无)/镜像名:版本名`      

- docker pull node
- docker pull johanbo/docker_express_server:tagname



### 构建

#### 通过 dockerfile 构建（常见）

`docker build . -t express_server:V1.0.0 ` 	构建容器

- -t：给这个包起名字
- ：之后为版本号

即 docker 打包当前目录（.），当前目录下有dockerfile，才能使用

`docker exec -it xxxx /bin/bash`	进入正在运行的容器

- xxxx：为容器名，id和名字都可以进入

#### 通过 commit 构建

`docker commit <原修改后容器ID> <新容器名称>` 



### 生产

打包镜像：

`docker save express_server:v1.0.0 > express_server.tar`	

`docker save –o ubuntu_node.jar ubuntu_node`

导入镜像： `docker load < express_server.tar`



### 删除

删除镜像：`docker rmi image名`

删除容器：`docker rm 168d445a98a3` 	



### 容器

停止容器：`docker stop xx` 

运行已经停止的容器：`docker start xx`	

直接关闭容器：`docker kill xx` 	

- 其中 xx 都为容器名







