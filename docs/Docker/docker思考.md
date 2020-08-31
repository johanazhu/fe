## docker禽兽指南

一个服务器中，可以安装多个应用，每一个应用起一个docker容器，
每一个docker容器中通过docker Compose编排容器
通过docker Compose编排容器来做到起各个app应用

每一个docker容器中 做一个docker Compose

### Dockerfile文件

dockerfile是为了描述一个镜像（应用），通过docker-compose来组织运行





通过 dockerfile 生成image（镜像）

```javascript
docker build .
```



将修改后的容器打包为镜像

```shell
docker commit 08c701024f8c johanbo/nginx_container
```

发布镜像到你的dockerhub上

```shell
docker push johanbo/nginx_container:latest 
```

验证是否成功

```shell
docker inspect johanbo/nginx_container
```

![](C:\Users\Administrator\Desktop\docker\docker_inspect.png)

登录 `hub.docker.com`

![](C:\Users\Administrator\Desktop\docker\dockerhub.png)





但是不推荐使用docker commit 方法来把容器打包为镜像。相反，推荐使用被称为 Dockerfile 的定义文件和 docker build 命令来构建镜像。

做一个dockerfile文件

![](C:\Users\Administrator\Desktop\docker\dockerfile文件.png)

build 文件，-t：tag标签   	.  当前目录

```shell
docker build -t johanbo/nginxfordockerfile .
```

生成了 image 镜像，通过`docker images` 即可查看

![](C:\Users\Administrator\Desktop\docker\通过dockerfile生成的image.png)

然后基于`johanbo/nginxfordockerfile`  来生成容器吧

```shell
docker run -it --name nginx_dockerfile4 -p 4444:80 d54804cb5208 /bin/bash
```

开启nginx服务

```shell
nginx
```

查看服务是否开启

```shell
ps -ef	查看进程
```

`Ctrl + p + q` 退出容器

在浏览器中输入`localhost:4444`

成功访问



























## 开发个小型docker compose 项目

开发一个由 MySQL、Redis、PHP-FPM和Nginx组成的小型 PHP 网站为例

因为小型网站由MySQL、Redis、PHP-FPM 和 Nginx 四款软件所组成的，那么就准备四个容器分别运行他们





## 	



































# docker重要命令

开始容器

```shell
docker run -it --name 名字 -p 6666:80 d54804cb5208 /bin/bash
```

推送容器到hub上

```shell
docker push johanbo/nginxfordockerfile:latest
```

查看容器

```shell
docker inspect johanbo/nginxfordockerfile
```

数据卷连接 -v [本地]:[容器]

```shell
docker run -it -v d:/code/test/docker/nginx/html:/usr.sgare/nginx/html nginx:lasest
```

修改镜像名字

```shell
docker tag 镜像ID xxxx:xxxx
```

删除镜像

```shell
docker rmi 镜像名
```

删除容器

```shell
docker rm 容器名
```

导出镜像

```docker
docker expose
```

基于dockerfile打包镜像

```shell
docker build -t express_server .
-t: 标签，可以理解为名字
. ：dockerfile所在位置
```

