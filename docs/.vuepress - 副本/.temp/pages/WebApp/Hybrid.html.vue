<template><h1 id="hybrid" tabindex="-1"><a class="header-anchor" href="#hybrid" aria-hidden="true">#</a> Hybrid</h1>
<h3 id="hybrid是什么-为何会是用hybrid" tabindex="-1"><a class="header-anchor" href="#hybrid是什么-为何会是用hybrid" aria-hidden="true">#</a> hybrid是什么，为何会是用hybrid？</h3>
<p>hybrid即“混合”，即前端和客户端的混合开发</p>
<p>需要前端开发人员和客户端开发人员配合完成</p>
<h3 id="hybrid技术是如何实现的" tabindex="-1"><a class="header-anchor" href="#hybrid技术是如何实现的" aria-hidden="true">#</a> hybrid技术是如何实现的？</h3>
<p>hybird技术的实现依赖于以下两点：</p>
<ul>
<li>file 和 schema 协议；</li>
<li>webview</li>
</ul>
<h4 id="file-和-schema-协议" tabindex="-1"><a class="header-anchor" href="#file-和-schema-协议" aria-hidden="true">#</a> file 和 schema 协议</h4>
<p>app 中经常用到的有三个协议：</p>
<ul>
<li>file 协议：用来打开本地文件，优点是速度快；</li>
<li>http/https协议：http 和 ssl/tls 协议，这个协议需要发送网络请求，自然相对 file 协议就慢很多</li>
<li>schema协议：用于客户端和前端通讯的协议；
<ul>
<li>微信部分的schema协议如下：
<ul>
<li>weixin://dl/scan 扫一扫</li>
<li>weixin://dl/moments 朋友圈</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="webview" tabindex="-1"><a class="header-anchor" href="#webview" aria-hidden="true">#</a> webview</h4>
<p>webview 是手机系统中，一个基于webkit内核，拥有渲染引擎和JS引擎，用于展示html页面的浏览器控件，简单来说是一个用于展示页面的容器</p>
<p>实现思路：只有当用户版本号和服务器版本号不一致时才去进行资源的请求</p>
<p><img src="https://i.loli.net/2021/06/11/vpDFm1TSeMWA2Ji.png" alt="image-20210611170126423"></p>
<p>简单来说，hybrid 技术就是通过 webview 和 file、schema 协议来实现页面的加载、渲染、现实，以及与native、服务端的通信</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://jeezliu.github.io/javascript/hybrid/JSBridge%E8%AE%BE%E8%AE%A1%E5%92%8C%E5%AE%9E%E7%8E%B0/" target="_blank" rel="noopener noreferrer">JSBridge 设计和实现<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&amp;mid=2247490355&amp;idx=1&amp;sn=312748f8249b48038b7d159cc44c1806&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">Hybrid 应用中 H5 与 Native 通信的那点事儿<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6872185695838928909" target="_blank" rel="noopener noreferrer">转转Hybrid体系建设<ExternalLinkIcon/></a></li>
</ul>
</template>
