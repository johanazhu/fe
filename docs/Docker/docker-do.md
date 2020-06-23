# docker 常见命令

docker version      看到Docker 客户端的信息
docker pull         拉取镜像
  docker pull node
进入容器：docker run -t -i express_server:v1.0.1 /bin/bash
构建容器： docker build -t express_server:v1.0.1
进入正在运行的容器：docker exec -it 1d0db /bin/bash
生产
打包镜像：docker save express_server:v1.0.1 > express_server.tar
导出镜像： docker load <express_server.tar>
创建
docker commit <原修改后容器ID> <新容器名称>

