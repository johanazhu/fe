<template><h1 id="浏览器总纲导航" tabindex="-1"><a class="header-anchor" href="#浏览器总纲导航" aria-hidden="true">#</a> 浏览器总纲导航</h1>
<p>​		上升到一万米的高空，俯视整个浏览器，你能看到高山，也能看到沟壑。</p>
<p>​		我们不仅要知道每一座山叫什么，而且要对山中有多少人有所了解，甚至可以看看动植物的生活状态。</p>
<h2 id="从宏观角度看-浏览器是由什么组成" tabindex="-1"><a class="header-anchor" href="#从宏观角度看-浏览器是由什么组成" aria-hidden="true">#</a> 从宏观角度看，浏览器是由什么组成？</h2>
<p>​		我们要弄明白浏览器的各种特性，必须从它是什么，由什么组成入手。它是我们了解浏览器世界的基石。</p>
<h2 id="在浏览器地址栏输入-url-到页面现实-浏览器到底发生了什么" tabindex="-1"><a class="header-anchor" href="#在浏览器地址栏输入-url-到页面现实-浏览器到底发生了什么" aria-hidden="true">#</a> 在浏览器地址栏输入 URL 到页面现实，浏览器到底发生了什么？</h2>
<p>​		从输入那一刻，我们会在浏览器本地内存中查数据，当它发送 HTTP 请求后，就与 HTTP 世界有了一层交流，在 HTTP 世界里，命令经过 DNS 解析，缓存，有可能还会进行301重定向。。。</p>
<p>​		它们之间的世界如下所示：</p>
<p><img src="https://i.loli.net/2021/06/04/gIxJtevpA3rDPYZ.png" alt="浏览器架构"></p>
<p>​	最后返回浏览器拿到 HTTP 世界返回的数据，通过渲染引擎渲染页面</p>
<p>​	因为渲染加载能影响用户体验，所以这一块的回流与重绘要格外注意，同样，也是考点之一</p>
<h2 id="浏览器内核" tabindex="-1"><a class="header-anchor" href="#浏览器内核" aria-hidden="true">#</a> 浏览器内核</h2>
<p>​	如果我们知道了浏览器是由什么组成，我们会对其中的渲染进程刚到好奇。渲染进程也就是我们所说的浏览器内核...</p>
<h2 id="事件循环的理解" tabindex="-1"><a class="header-anchor" href="#事件循环的理解" aria-hidden="true">#</a> 事件循环的理解</h2>
<p>​	宏任务和微任务</p>
<p>​	浏览器中的事件循环</p>
<p>​	Node中的事件循环（暂时不写）</p>
<h2 id="v8工作原理" tabindex="-1"><a class="header-anchor" href="#v8工作原理" aria-hidden="true">#</a> V8工作原理</h2>
<p>​	垃圾回收：如何自动回收？</p>
<p>​	...</p>
<h2 id="对跨域的理解" tabindex="-1"><a class="header-anchor" href="#对跨域的理解" aria-hidden="true">#</a> 对跨域的理解</h2>
<p>​	介绍浏览器跨域</p>
<p>​	介绍同源策略</p>
<p>​	CORS 如何设置，JSONP 为什么不支持 post，JSONP 方案后端需要怎么配合，Ajax 跨域前端需要设置什么</p>
<p>​	localStorage与cookie</p>
<h2 id="定时器的理解" tabindex="-1"><a class="header-anchor" href="#定时器的理解" aria-hidden="true">#</a> 定时器的理解</h2>
<p>​	定时器是怎么实现的</p>
<p>​	定时器为什么是不准确的</p>
<p>​	用setTimeout模拟 setInterval</p>
<h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2>
<p>​	防抖和节流</p>
<p>​	如何系统优化页面</p>
<h2 id="本章与http章的联动" tabindex="-1"><a class="header-anchor" href="#本章与http章的联动" aria-hidden="true">#</a> 本章与HTTP章的联动</h2>
<p>​	HTTP 缓存</p>
<p>​	三次握手，四次挥手（HTTP方面的内容）</p>
</template>
