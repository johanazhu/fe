# 一文讲通 Nginx



# 前端的 Nginx 知识梳理

https://mp.weixin.qq.com/s/dte9oRimIWlZp0pd-ZF-WQ

下面这以 ubuntu 为例，卸载安装 nginx

### 卸载

```shell
# 移除 nginx
$ apt-get --purge remove nginx

# 查询 nginx 依赖的包，会列出来
$ dpkg --get-selections|grep nginx

# 移除上面列出的包，例如 nginx-common
$ apt-get --purge remove nginx-common

# 也可以执行 autoremove ，会自动删除不需要的包
$ apt-get autoremove

# 查询 nginx 相关的文件，删掉就可以了
$ sudo find / -name nginx*
```

### 安装

```shell
安装依赖库

# gcc g++
apt-get install build-essential
apt-get install libtool

# pcre
sudo apt-get install libpcre3 libpcre3-dev

# zlib
apt-get install zlib1g-dev

# ssl
apt-get install openssl
apt-get install libssl-dev
```

**安装 nginx**

到 nginx download 上找到最新的nginx 版本







## 参考资料

- [前端而须知的 nginx 技巧](https://mp.weixin.qq.com/s?__biz=MzI5NjIzNjA1Nw==&mid=2247483888&idx=1&sn=c2235eb2330e2c06c99281bf2c15b3a6&chksm=ec462486db31ad902b52c9f9a9eef10e89328929544d6af7451d17bb799aa34a2a593306cd31&mpshare=1&scene=1&srcid=&sharer_sharetime=1574174348607&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [五分钟看懂 nginx 负债均衡](https://mp.weixin.qq.com/s?__biz=Mzg3NTcwMTUzNA==&mid=2247486249&idx=1&sn=8448800eb7eaa3963d532f6f576b305c&source=41#wechat_redirect)
- [详细的 nginx 配置 https 零基础教程](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247484991&idx=2&sn=a68e578591e2df254fa339aacc1ec9e2&chksm=f99100eecee689f88e9e08fddc9ff42d0c88b8fd89c027b489005d28cf1950320f6e3b6cf1fd&mpshare=1&scene=1&srcid=&sharer_sharetime=1585873416059&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [Nginx安装维护入门学习笔记](https://github.com/jaywcjlove/nginx-tutorial)
- [Nginx 最全操作总结](https://mp.weixin.qq.com/s/LmtHTOVOvdcnMBuxv7a9_A)



