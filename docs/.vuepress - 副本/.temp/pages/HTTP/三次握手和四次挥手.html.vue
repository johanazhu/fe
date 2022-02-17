<template><h1 id="三次握手和四次挥手" tabindex="-1"><a class="header-anchor" href="#三次握手和四次挥手" aria-hidden="true">#</a> 三次握手和四次挥手</h1>
<p>面试官：请介绍下三次握手</p>
<p>求职者：请以此握手时客户端给服务器端发送一个报文，第二次是服务器端收到报文之后，会应答一个报文给客户端，第三次握手时客户端收到报文后再给服务器端发送一个保卫呢，三次握手就成功了</p>
<p>进行三次握手的主要作用时为了确认对方的接受能力和发送额能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备</p>
<p>为什么是三次？</p>
<p>只有至少做三次，才能让客户端和服务器端知道双方的发送、接受能力是否正常。</p>
<ul>
<li>第一次握手：客户端发送网络包，服务端收到了。这样服务器端就能得出结论：客户端的发送能力、服务器端的接受能力是正常的</li>
<li>第二次握手：服务器发包，客户端收到了。这样客户端就能得到结论：服务端的接受、发送能力，客户端的接受、发送能力是正常的。不过此时服务器端并不知道确认客户端的接受能力是否正常</li>
<li>第三次握手：客户端发包，服务器端收到了。这样服务器端就能得出结论：客户端的接受、发送能力正常，服务器端自己的发送、接受能力也正常</li>
</ul>
<p>为什么要有四次挥手？</p>
<ul>
<li>客户端第一次发送消息给服务器端告诉它需要断开连接</li>
<li>服务器端收到这个消息后返回一个消息告诉客户端：知道了，为了确保服务器端收到了之前所有的HTTP请求，服务器端需要等一等再断开连接</li>
<li>服务器确认所有的HTTP请求都收到了，主动发消息给客户端：我这边所有的请求都处理万了，我也可以断开连接了。</li>
<li>客户端收到这个请求后，返回消息告诉服务器端：我知道，断开连接吧</li>
</ul>
<p>断开连接，需要客户端和服务器端都主动断开连接，所以至少需要四次挥手才能确保连接断开</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://limeii.github.io/2018/11/deep-understanding-https/" target="_blank" rel="noopener noreferrer">深入理解HTTPS<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA5MTk4MzgzNA==&amp;mid=2453246617&amp;idx=1&amp;sn=0057c76375e6343672fe1665483dd236&amp;chksm=87b9282cb0cea13a222aaa2ba40dd029484d6e2e192e8d627363a308b353b0108971b15d1c0b&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1570232506816&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">不要再问我三次握手和四次挥手<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
