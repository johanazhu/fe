<template><h1 id="tcp协议" tabindex="-1"><a class="header-anchor" href="#tcp协议" aria-hidden="true">#</a> TCP协议</h1>
<p>本文把TCP/IP讲绝了！</p>
<p>https://mp.weixin.qq.com/s/EhkbUZYX_P7XJFQ5471HaQ</p>
<p>一文串联 HTTP、TCP、IP、以太网</p>
<p>https://mp.weixin.qq.com/s/6cZ5VWYs55R0cxG5aABHjA</p>
<p>https://blog.poetries.top/browser-working-principle/guide/part1/lesson02.html#_3-tcp%EF%BC%9A%E6%8A%8A%E6%95%B0%E6%8D%AE%E5%AE%8C%E6%95%B4%E5%9C%B0%E9%80%81%E8%BE%BE%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F</p>
<p>总结：</p>
<ul>
<li>互联网中的数据是通过数据包来传输的，数据包在传输过程中容易丢失或出错</li>
<li>IP 负责把数据包送达目的主机</li>
<li>UDP 负责把数据包送达具体应用</li>
<li>而 TCP 保证了数据完整地传输，它的连接可以分为三个阶段：建立连接、传输数据和断开连接</li>
<li>其实了解 TCP 协议，是为了全方位了解 HTTP，包括其实际功能和局限性，之后才会更加深刻地理解为什么要推出 HTTP/2，以及为什么要推出 QUIC 协议，也就是未来的 HTTP/3。这是一个由浅入深、循序渐进的过程</li>
</ul>
<p>一个TCP 连接过程包括建立连接、传输数据和断开连接三个阶段</p>
<p>而 HTTP 协议，正是建立在 TCP 连接基础之上的。HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础</p>
<h1 id="udp" tabindex="-1"><a class="header-anchor" href="#udp" aria-hidden="true">#</a> udp</h1>
<p>网络通讯概述</p>
<p>ip地址（重点）</p>
<p>Linux命令</p>
<p>端口（重点）</p>
<p>socker简介</p>
<p>udp网络程序-发送-接收</p>
<p>python3编译转换</p>
<p>udp绑定端口问题（重点）</p>
<p>网络通讯过程（简单版）</p>
<p>案例：udp聊天器</p>
<h2 id="网络通讯概述" tabindex="-1"><a class="header-anchor" href="#网络通讯概述" aria-hidden="true">#</a> 网络通讯概述</h2>
<h3 id="_1-什么是网络" tabindex="-1"><a class="header-anchor" href="#_1-什么是网络" aria-hidden="true">#</a> 1.什么是网络</h3>
<p>被问到http的时候你就这么回答</p>
<p>https://mp.weixin.qq.com/s/7uuypNid-1iNlXavTFHp7w</p>
<p>网络是怎么样连接的</p>
<p>https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&amp;mid=2247484152&amp;idx=1&amp;sn=ba6fc3a8c71c69a2290f2284aad74fcb&amp;scene=19#wechat_redirect</p>
</template>
