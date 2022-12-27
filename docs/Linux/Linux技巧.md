# Linux 技巧



## centos中执行apt-get命令提示apt-get command not found

在centos下应该用yum install xxx

yum和apt-get的区别
一般来说著名的linux系统基本上分两大类： 
1.RedHat系列：Redhat、Centos、Fedora等 
2.Debian系列：Debian、Ubuntu等 


RedHat 系列 
1 常见的安装包格式 rpm包,安装rpm包的命令是“rpm -参数” 
2 包管理工具 yum 
3 支持tar包 

Debian系列 
1 常见的安装包格式 deb包,安装deb包的命令是“dpkg -参数” 
2 包管理工具 apt-get 
3 支持tar包



## centos7安装NodeJs-16



### Yum 安装 Node.js

yum安装设置Node.js v16版本
 `curl --silent --location https://rpm.nodesource.com/setup_16.x | sudo bash`
 (setup_16里16是版本号，可根据自己需要修改)

yum方式安装
 `sudo yum -y install nodejs`

其它参考：
 以上命令安装不成功可执行：
 `sudo yum clean all`
 若本地存在多个nodesoucre，可以执行以下命令，在重新yum安装命令
 `sudo rm -fv /etc/yum.repos.d/nodesource*`



### 二进制安装 Node.js

下载node 16版本
 `wget https://nodejs.org/dist/v16.13.2/node-v16.13.2-linux-x64.tar.xz`
 解压xz `xz -d node-v16.13.2-linux-x64.tar.xz`

> 注：xz 找不到命令需要执行 `yum install xz.x86_64 -y`

解压tar  `tar xvf node-v16.13.2-linux-x64.tar`
 转移文件夹 `mv node-v16.13.2-linux-x64 /usr/local/nodejs`
 添加下面内容到环境配置里 `vi /etc/profile`

```bash
export PATH=$PATH:'/usr/local/nodejs/bin'
```

生效 `source /etc/profile`
 测试查看版本

```css
[root@localhost 1]# node -v
v16.13.2
[root@localhost 1]# npm -v
8.1.2
```





## centos 彻底删除nodejs默认安装文件

1. yum remove **nodejs npm** -y.
2. cd /usr/local/lib 删除所有**node** 和node_modules文件夹 ...
3. cd /usr/local/bin. 删除**node** 的可执行文件
4. 删除: /usr/local/bin/**npm**
