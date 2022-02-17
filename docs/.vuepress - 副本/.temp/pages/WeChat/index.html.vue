<template><h1 id="微信公众号导航" tabindex="-1"><a class="header-anchor" href="#微信公众号导航" aria-hidden="true">#</a> 微信公众号导航</h1>
<blockquote>
<p>到了壮年中年，想一想，少年青年时期非常羡慕的那个壮年中年人，是否就是目前的自己？是，那很好。否，那恐怕是来不及了</p>
</blockquote>
<p>最开始做前端，笔者是在一家广告公司，那个时候的 H5 营销页面特别火，不仅仅要做移动端，而且要在微信上传播，而微信分享、发送朋友圈之类的功能是要引入微信的 JS-SDK 的</p>
<p><a href="https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html" target="_blank" rel="noopener noreferrer">微信开放文档<ExternalLinkIcon/></a>上已经写的很具体了，主要是两方面，一是服务端开发、二是客户端（前端）开发</p>
<p>服务器端能做：</p>
<ul>
<li>微信自定义菜单</li>
<li>消息订阅、发送</li>
<li>素材管理</li>
<li>账号管理</li>
<li>...</li>
</ul>
<p>客户端（前端）主要做微信网页开发中的前端部分</p>
<p>而且不同的公众号类型具有不同的接口权限：具体可看<a href="https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Explanation_of_interface_privileges.html" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></p>
<p>本人因为公司业务要求，尝试开发过自定义菜单、用户管理等功能，所以写了<RouterLink to="/WeChat/%E5%BE%AE%E4%BF%A1%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%BC%80%E5%8F%91.html">微信服务端开发</RouterLink>，又因为做网页授权需要获取 openid 需求，写了这篇<RouterLink to="/WeChat/%E5%BE%AE%E4%BF%A1%E7%BD%91%E9%A1%B5%E6%8E%88%E6%9D%83.html">微信网页授权</RouterLink>。从最开始做前端就打交道的 JS-SDK，一直走来遇到的各种坑，分别写在了 <RouterLink to="/WeChat/%E5%BE%AE%E4%BF%A1%E7%BD%91%E9%A1%B5%E5%BC%80%E5%8F%91%E4%B9%8BJS-SDK.html">微信网页开发之JS-SDK</RouterLink> 以及 <RouterLink to="/WeChat/%E5%BE%AE%E4%BF%A1%E7%BD%91%E9%A1%B5%E5%BC%80%E5%8F%91%E4%B9%8B%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html">微信网页开发之常见问题</RouterLink></p>
<p>以上均为本人经验所写，如有纰漏，望请指出</p>
</template>
