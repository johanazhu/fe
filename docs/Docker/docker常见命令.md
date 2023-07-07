# docker 常见命令

## 常见命令

- `docker version` ：查看 `Docker` 客户端和服务端的信息

- `docker --version` ：只查看版本

- `docker images` ：查看所有的镜像（`image`）

- `docker images` ：等于`docker image ls`

- `docker ps`：查看现在启动中的容器

- `docker ps -a` ：查看所有启动过的容器（`container`）

- `docker container ls`： 查看所有**正启动**的容器（`container`）

- `docker help` ：帮助

- `docker info`：查看 docker 信息

- `docker image help`： image 的帮助

- `docker container help` ：container 的帮助

- `docker commit` ：生成一个镜像（image）

- `docker save express_server:v1.0.0 > express_server.tar`：打包镜像

- `docker load < express_server.tar`：导入镜像

- `docker build . -t express_server:V1.0.0` 构建容器

- `docker exec -it container_id bash`：进入容器

- `ctrl+p+q`：退出容器后端还在运行（前提是进入容器时使用）

- `docker logs container_id`：查看日志

- `docker logs -f container_id`：实时查看日志

- `docker stop container_id`：停止某一容器

- `docker restart container_id`：重启某一容器

- `docker rm container_id`：删除某一容器（`docker ps -a` 就看不到了）

## Image 镜像

- 下载镜像： `docker pull <image-name>:<tag>`

- 查看所有镜像：`docker images`

- 删除镜像：`docker rmi <image-id>`

- 上传镜像：`docker push <username>/<repository>:<tag>`，要先注册 [hub.docker.com](hub.docker.com)

> PS：如果 `docker images` 出现 REPOSITORY 是 `<none>` 的情况，可以运行 `docker image prune` 删除

Linux 中，如果使用默认的 overlay2 存储驱动，Docker 镜像会保存在 `/var/lib/docker/overlay2` 目录下

## Container 容器

- 启动容器：`docker run -p xxx:xxx -v=hostPath:containerPath -d --name <container --name> <image-name>`
  -   `-p`：端口映射

  -   `-v`：数据卷，文件映射

  -   `-d`：后台运行

  -   `--name`：定义容器名称

- 查看所有容器：`docker ps`，加 `-a` 显示隐藏的容器

- 停止容器：`docker stop <container-id>`

- 删除容器：`docker rm <container-id>`，加 `-f` 是强制删除

- 查看容器信息（如 IP 地址）： `docker inspect <container-id>`

- 查看容器日志：`docker logs <container-id>`

- 进入容器控制台：

  -   `docker exec -it <container-id> /bin/sh`

  -   `docker exec -it 容器名/<container-id> bash`

- 退出容器：
  -   exit
  
- 查看容器的虚拟ip地址：

  - ```bash
    docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name_or_id
    ```

    

    

