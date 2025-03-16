# 如何使用二进制文件离线安装 Mysql

> 注意：此方案是在 Linux 环境中

如何安装Mysql，最简单的方式莫过于在线安装，即

```bash
sudo apt install mysql-server
```

**命令行验证**

```bash
mysql -u root -p
```

**服务状态检查**

```bash
sudo systemctl status mysql  # Linux/macOS
```

但是笔者在公司电脑上遇到一个诡异的事情，无法在线拉取 mysql ，我不知道是什么原因，所以只能询问 AI ，得到的方式是可以下载离线安装包，再解压安装，在尝试了无数次的安装后，想记录下安装过程



## 彻底卸载 MySQL

### 1. 停止 MySQL 服务

```bash
sudo systemctl stop mysql
```

### 2. 卸载 MySQL 相关软件包

```bash
sudo apt-get remove --purge mysql-server mysql-client mysql-common mysql-apt-config
```

### 3. 清理残留文件和配置

```bash
whereis mysql # 寻找mysql
sudo rm -rf /etc/mysql /var/lib/mysql /var/log/mysql

# 清理残留依赖
sudo apt-get autoremove
sudo apt-get autoclean
```

### 4. 删除 MySQL 用户和组（可选）

```bash
sudo deluser mysql
sudo delgroup mysql
```



## 下载并安装二进制包

### 1. 下载官方二进制包

- **访问官网**：前往 [MySQL 官网](https://dev.mysql.com/downloads//)，选择 **MySQL Community Downloads**。
- **选择版本**：点击 **MySQL Community Server**，根据操作系统（Windows/macOS/Linux）下载对应的安装包

### 2. 解压压缩包并转移文件目录

```bash
sudo tar -xvf mysql-8.4.3-linux-glibc2.28-x86_64.tar.xz -C /usr/local/
cd /usr/local/
sudo mv mysql-8.4.3-linux-glibc2.28-x86_64 mysql  
```

## 配置 MySQL

#### 1. 创建配置文件 `/etc/my.cnf`

```ini
sudo tee /etc/my.cnf <<EOF
[mysqld]
basedir=/usr/local/mysql # mysql 地址
datadir=/data/mysql # 数据库存储地址
socket=/tmp/mysql.sock # socket 地址，后期要修改
log-error=/data/mysql/error.log # 日志
pid-file=/data/mysql/mysql.pid

# 性能优化参数
innodb_buffer_pool_size=1G
max_connections=200
character-set-server=utf8mb4
collation-server=utf8mb4_0900_ai_ci

[client]
socket=/tmp/mysql.sock
EOF
```

#### 4.2 初始化数据目录

```bash
cd /usr/local/mysql
# 初始化mysql，得到密码
sudo bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/data/mysql
```

如果忘记，可以通过从日志中获取

```bash
sudo grep 'temporary password' /data/mysql/error.log
```

------

## 配置 systemd 服务

### 1. 创建服务文件

进入  `/etc/systemd/system/mysql.service`

```bash
sudo tee /etc/systemd/system/mysql.service <<EOF
[Unit]
Description=MySQL Server
After=network.target

[Service]
User=mysql
Group=mysql
ExecStart=/usr/local/mysql/bin/mysqld --defaults-file=/etc/my.cnf
LimitNOFILE=infinity
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
```

### 2. 启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl start mysql
sudo systemctl enable mysql
```

## 首次登录和密码重置

```bash
# 使用临时密码登录 
/usr/local/mysql/bin/mysql -uroot -p -S /tmp/mysql.sock 
# 修改 root 密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewStrongPassword!'; 
FLUSH PRIVILEGES;
```

## 关键问题避坑指南

### 权限问题

 确保所有目录所有权为 `mysql:mysql`：

```bash
sudo chown -R mysql:mysql /usr/local/mysql /data/mysql
```

### 连接报错

使用 navicat 连接时，报错`2002 - Can't connect to local MySQL server through socket '/run/mysqld/mysqld.sock' (2)`

因为默认将 sock 放入到 `/tmp/mysql.sock` 中，所以本地  mysql 能连接，但是 navicat 连接补上，navicat 会去`/run/mysqld/mysqld.sock` 中找

有两种方法可以解决

#### 方法一：修改 Navicat 连接配置

- 在 Navicat 的连接设置中，将 "Socket File Path" 修改为步骤2中查询到的实际路径。
- 例如：`/tmp/mysql.sock`。但是我没找到这个

#### 方法二：修改 MySQL 配置

- 如果希望 MySQL 生成 socket 文件到默认路径（如`/run/mysqld/mysqld.sock`）：

  ```ini
  [mysqld]
  socket = /run/mysqld/mysqld.sock
  
  [client]
  socket=/run/mysqld/mysqld.sock
  ```

- 确保目录权限正确。如果路径是 `/run/mysqld`，确保该目录存在且权限正确

  ```bash
  sudo mkdir -p /run/mysqld         # 创建目录（如果不存在）
  sudo chown mysql:mysql /run/mysqld  # 设置所属用户和组
  sudo chmod 755 /run/mysqld        # 设置权限
  ```

- 保存文件后重启 MySQL：

  ```bash
  sudo systemctl restart mysql
  ```

如此，Navicat 就能连接上 Mysql