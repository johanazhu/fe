# TCP协议





本文把TCP/IP讲绝了！

https://mp.weixin.qq.com/s/EhkbUZYX_P7XJFQ5471HaQ



一文串联 HTTP、TCP、IP、以太网

https://mp.weixin.qq.com/s/6cZ5VWYs55R0cxG5aABHjA





https://blog.poetries.top/browser-working-principle/guide/part1/lesson02.html#_3-tcp%EF%BC%9A%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AE%8C%E6%95%B4%E5%9C%B0%E9%80%81%E8%BE%BE%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F



总结：

- 互联网中的数据是通过数据包来传输的，数据包在传输过程中容易丢失或出错
- IP 负责把数据包送达目的主机
- UDP 负责把数据包送达具体应用
- 而 TCP 保证了数据完整地传输，它的连接可以分为三个阶段：建立连接、传输数据和断开连接
- 其实了解 TCP 协议，是为了全方位了解 HTTP，包括其实际功能和局限性，之后才会更加深刻地理解为什么要推出 HTTP/2，以及为什么要推出 QUIC 协议，也就是未来的 HTTP/3。这是一个由浅入深、循序渐进的过程



一个TCP 连接过程包括建立连接、传输数据和断开连接三个阶段

而 HTTP 协议，正是建立在 TCP 连接基础之上的。HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础

































































