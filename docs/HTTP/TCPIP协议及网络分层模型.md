# TCP/IP 协议及网络分层模型

互联网要互联连接，一条消息从发送到接受，都需要走一遍网络协议。我们讲讲 TCP/IP 协议以及网络分层模型

先看网络分层模型

## 网络分层模型

在网络分层模型中，有两种模型，一是 TCP/IP 标准，它提出的早，1970 年就被发明。它提出了分层概念，将网络通信份分为四层，分别是链接层、网络层、传输层、应用层

另一种是 OSI，全称叫开放式系统互联通信参考模型，是国际标准，用来统一各种网络协议，始于上世纪 70 年代后期。是网络分层的"空架子老大"

OSI 模型分成了七层，分别为物理层、数据链路层、网络层、传输层、会话层、表示层、应用层

两者的关系就好比手机系统的巨头是 iOS 和 Android，它们出了标准，因为话语强，所以国际标准以它们为核心再添加指定一些其他标准，但核心是 iOS 和 Android。其中 TCP/IP 就是网络分层模型中的老大，OSI 就像英国女王那样，是皇室象征，是国际标准

### TCP/IP 网络分层模型

很有意思，TCP/IP 明明是网络通信协议的统称，却以其中两个核心协议为名字来称呼。它总共有四层，像搭积木一样，每一层需要下层的支撑，同时又支撑着上层。如图所示：

![TCP/IP 网络分层模型](https://s2.loli.net/2022/04/07/KqvUdjkCNDiYTMt.png)

最底层也是第一层叫 网络访问（链接）层，Network Access（link）layer，负责在以太网、Wi-Fi 这样底层网络上发送原始数据包。使用 MAC 地址来标记网络上的设备，所以有时候也叫 MAC 层

第二层叫网络互连层，internet layer， IP 协议就处在这一层。因为 IP 协议定义了 IP 地址的概念，所以就在链接层的基础上，用 IP 地址取代 MAC 地址

第三层叫传输层，transport layer，负责保证数据在 IP 地址标记的两点之间可靠地传输，例如 TCP、UDP、SCTP 等

第四层叫应用层，顾名思义，是面向具体应用的协议，如 HTTP、SSH、FTP、SMTP、DNS 等

按照 TCP/IP 模型，网络通信是一层包着一层，发送端每通过一层则增加首部，接收端每通过一层则删除首部

![数据传输过程](https://s2.loli.net/2022/04/07/Pyge4oamhtSUncX.jpg)

这里要注意的是：

-   MAC 层的传输单位是帧（frame）
-   IP 层的传输单位是包（packet）
-   TCP 层的传输单位是段（segment）
-   HTTP 的传输单位则是消息或报文（message）

> 注：我们常说的丢包丢包丢的就是 IP 包

### OSI 网络分层模型

官方定的分层模型叫 OSI，全称是开放式系统互联通信参考模型。你问我支不支持，我是支持的，但它又不是个强制标准，所以一直有四层（TCP/IP 模型）、七层（OSI 模型）之说。

![OSI 网络分层模型](https://s2.loli.net/2022/04/07/9oZybraWt7lQe83.png)

第一层：物理层，physical layer，网络的物理形式，例如电缆、光纤、网卡等；

第二层：数据链路层，data link layer，它基本相当于 TCP/IP 的链接层；

第三层：网络层，network layer，相当于 TCP/IP 的网络层；

第四层：传输层，transport layer，相当于 TCP/IP 的传输层；

第五层，会话层，session layer，维护网络中的连接状态，即保持会话和同步；

第六层，表示层，presentation layer，把数据转换为合适、可理解的语法和语义；

第七层，应用层，面向具体的应用传输数据

### 两个分层模型的映射关系

![640](https://s2.loli.net/2022/04/07/ponFub1gE2L6xyB.png)

第一层：物理层，TCP/IP 里无对应；

第二层：数据链路层，对应 TCP/IP 的网络访问（链接）层；

第三层：网络层，对应 TCP/IP 的网络互连层；

第四层：传输层，对应 TCP/IP 的传输层；

第五、六、七层：统一对应到 TCP/IP 的应用层。

## TCP/IP 协议

上诉我们知道两个网络分层模型是什么，由什么组成，并且知道它们的映射关系。虽然有国际标准，但这个世界还是以 TCP/IP 协议为主要标准。你可以理解为先入为主，也可以理解为单极霸权，甚至可以联想一下 5G/6G 标准对世界话语权的重要性，总之，现阶段还是以 TCP/IP 协议为主。

四大层

### 网络访问（链接）层

MAC 地址，它表示的你的物理世界地址

### 网络层

IP 协议定义了 IP 地址

电影《黑客军团》中有个片段，被做成了程序员段子

![dEl8QHe](https://s2.loli.net/2022/04/07/tDLM34TkmnR8esP.jpg)

A：你的地址是什么？

B： 173.168.15.10（IP 地址）

A：不，你的本地地址呢？

B： 127.0.0.1

A：我的意思是你的物理地址

B： 29:01:38:62:31:58（物理地址指的就是 MAC 地址）

你也可以通过 `ipconfig /all` 来查看你的所有地址

![网络地址](https://s2.loli.net/2022/04/07/bgqxAaT5H8ol4cD.png)

### 传输层

具有代表性的是 TCP，可以说在 HTTP3 之前，传输层就是 TCP 的天下，它代表的就是传输层，可在 HTTP2 之后，发现影响性能瓶颈的地方成了 TCP 的队头阻塞，所以 UDP 开始活跃起来，真是此一时彼一时

关于 TCP 和 UDP ，这张图表能更好的对比分析

![TCP 和 UDP](https://s2.loli.net/2022/04/07/mLlIU1r4QnBY8pe.png)

### 应用层

应用层有很多协议，例如 HTTP 协议、FTP 协议、SMTP 协议...

| 应用层协议 | 应用         |
| ---------- | ------------ |
| HTTP       | 万维网       |
| FTP        | 文件传输     |
| DNS        | 域名转换     |
| SMTP       | 电子邮件     |
| TELNET     | 远程终端接入 |
| ...        | ...          |

## 参考资料

-   [本文把 TCP/IP 讲绝了！](https://mp.weixin.qq.com/s/EhkbUZYX_P7XJFQ5471HaQ)
-   [一文串联 HTTP、TCP、IP、以太网](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496571&idx=1&sn=3532002eb4a2f4d4cd54cb6bfc934f05&source=41#wechat_redirect)
-   [TCP 协议：如何保证页面文件能被完整送达浏览器](https://blog.poetries.top/browser-working-principle/guide/part1/lesson02.html#%E4%B8%80%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E7%9A%84%E2%80%9C%E6%97%85%E7%A8%8B%E2%80%9D)
-   [被问到 http 的时候你就这么回答](https://mp.weixin.qq.com/s/7uuypNid-1iNlXavTFHp7w)
-   [TCP/IP 协议族](https://link.zhihu.com/?target=https%3A//zh.wikipedia.org/wiki/TCP/IP%E5%8D%8F%E8%AE%AE%E6%97%8F%23cite_note-1)
