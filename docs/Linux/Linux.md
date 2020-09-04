# Linux 

研发必须知道的服务器Linux知识

### Linux是什么

开源，服务器

### Linux能做什么

企业服务器

嵌入式开发（安卓手机，路由器，机顶盒）



## Linux命令

#### 服务器硬件资源信息

- 内存：free -m
- 硬盘：df -h
- 负债：w/top
- cpu个数和核数



#### 文件操作命令

- Linux文件的目录结构

- 文件基本操作

- 文本编辑神器Vim
- 文件权限 421
- 文件搜索，查找，读取
- 文件压缩与解压



##### Liunx 文件目录结构

- 根目录 /
- 家目录 /home
- 临时目录 /tmp
- 配置目录 /etc
- 用户程序目录 /usr



##### 文件操作基本命令

| 命令  | 解释             |                                         |
| ----- | ---------------- | --------------------------------------- |
| ls    | 查看目录下的文件 |                                         |
| touch | 新建文件         |                                         |
| mkdir | 新建文件夹       | mkdir -p imooc_dir/test1/test2 层级创建 |
| cd    | 进入目录         |                                         |
| rm    | 删除文件和目录   |                                         |
| cp    | 复制             |                                         |
| mv    | 移动             |                                         |
| pwd   | 显示路径         |                                         |
|       |                  |                                         |



文件搜索，查找，读取

| 命令 | 解释             |
| ---- | ---------------- |
| less | 可控分页         |
| grep | 搜索关键字       |
| find | 查找文件         |
| wc   | 统计个数         |
| tail | 从文件尾部开始读 |
| head | 从文件头部读     |
| cat  | 读取整个文件     |
| more | 分页读取         |



文件解压缩

- tar 命令



系统用户操作命令

| 命令    | 解释     |
| ------- | -------- |
| useradd | 添加用户 |
| adduser | 添加用户 |
| userdel | 删除用户 |
| passwd  | 设置密码 |



### 防火墙

- 作用：保护服务器安全
- 设置防火墙规则
  - 开放80，22端口
- 关闭防火墙

### 防火墙设置

- 安装：yum install firewalld
- 启动：service firewalld start
- 查找状态：service firewalld status
- 关闭或禁用防火墙：service firewalld stop/disable 



### 提权 和 文件 上传下载操作

- 提权： sudo
  - visudo
- 文件下载
  - wget、curl
- 文件上传
  - scp（mac）
  - lrzsz（window）



## WebServer

APACHE

NGINX



#### Apache基本操作

| 解释 | 命令                |
| ---- | ------------------- |
| 安装 | yum install httpd   |
| 启动 | service httpd start |
| 停止 | service httpd stop  |





Linux系统

Linux命令

SSH

WebServer

数据库

缓存

PHP,Python,Java

必备服务

