# TCP 协议

总结：

-   互联网中的数据是通过数据包来传输的，数据包在传输过程中容易丢失或出错
-   IP 负责把数据包送达目的主机
-   UDP 负责把数据包送达具体应用
-   而 TCP 保证了数据完整地传输，它的连接可以分为三个阶段：建立连接、传输数据和断开连接
-   其实了解 TCP 协议，是为了全方位了解 HTTP，包括其实际功能和局限性，之后才会更加深刻地理解为什么要推出 HTTP/2，以及为什么要推出 QUIC 协议，也就是未来的 HTTP/3。这是一个由浅入深、循序渐进的过程

一个 TCP 连接过程包括建立连接、传输数据和断开连接三个阶段

而 HTTP 协议，正是建立在 TCP 连接基础之上的。HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础

# udp

网络通讯概述

ip 地址（重点）

Linux 命令

端口（重点）

socker 简介

udp 网络程序-发送-接收

python3 编译转换

udp 绑定端口问题（重点）

网络通讯过程（简单版）

案例：udp 聊天器

## 网络通讯概述

### 1.什么是网络

## 参考资料

-   [本文把 TCP/IP 讲绝了！](https://mp.weixin.qq.com/s/EhkbUZYX_P7XJFQ5471HaQ)
-   [一文串联 HTTP、TCP、IP、以太网](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496571&idx=1&sn=3532002eb4a2f4d4cd54cb6bfc934f05&source=41#wechat_redirect)
-   [TCP 协议：如何保证页面文件能被完整送达浏览器](https://blog.poetries.top/browser-working-principle/guide/part1/lesson02.html#%E4%B8%80%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E7%9A%84%E2%80%9C%E6%97%85%E7%A8%8B%E2%80%9D)
-   [被问到 http 的时候你就这么回答](https://mp.weixin.qq.com/s/7uuypNid-1iNlXavTFHp7w)
