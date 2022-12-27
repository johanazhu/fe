# 服务器上安装 Docker

在服务器上安装 docker 、docker-compose

### 更新、安装必备软件

```bash
apt-get update && apt-get install -y wget vim
```

### 非大陆 Docker 安装

```bash
wget -q0- get.docker.com | bash
```

### 查看 Docker 版本

```bash
docker -v
```

### 开机自动启动

```bash
systemctl enable docker
```

### 卸载 Docker

```bash
sudo apt-get purge docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

### 非大陆 Docker-compose 安装

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

```bash
docker-compose --version
```

### 修改 Docker 配置

以下配置会增加一段自定义内网 IPv6 地址，开启容器的 IPv6 功能，以及限制日志文件大小，防止 Docker 日志塞满硬盘

```bash
cat > /etc/docker/daemon.json <<EOF
{
    "log-driver": "json-file",
    "log-opts": {
        "max-size": "20m",
        "max-file": "3"
    },
    "ipv6": true,
    "fixed-cidr-v6": "fd00:dead:beef:c0::/80",
    "experimental":true,
    "ip6tables":true
}
EOF
```

### 重启 Docker 服务

```bash
systemctl restart docker
```





## 参考资料

- [Debian 11 / Ubuntu 22.04 安装 Docker 以及 Docker Compose 教程](https://u.sb/debian-install-docker/)
- [【Docker系列】不用宝塔面板，小白一样可以玩转VPS服务器！](https://blog.laoda.de/archives/hello-docker)
