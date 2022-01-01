<template><h1 id="cookie、session、token、jwt" tabindex="-1"><a class="header-anchor" href="#cookie、session、token、jwt" aria-hidden="true">#</a> Cookie、Session、Token、JWT</h1>
<h2 id="session-介绍" tabindex="-1"><a class="header-anchor" href="#session-介绍" aria-hidden="true">#</a> Session 介绍</h2>
<h3 id="session-的优势" tabindex="-1"><a class="header-anchor" href="#session-的优势" aria-hidden="true">#</a> Session 的优势</h3>
<ul>
<li>相比 JWT，最大的优势在于可以主动清除 Session</li>
<li>Session 保存在服务器短，相对较为安全</li>
<li>结合 cookie 使用，较为灵活，兼容性较好</li>
</ul>
<h3 id="session-的劣势" tabindex="-1"><a class="header-anchor" href="#session-的劣势" aria-hidden="true">#</a> Session 的劣势</h3>
<ul>
<li>cookie + session 在跨域场景表现并不好</li>
<li>如果是分布式部署，需要做多机共享 session 机制</li>
<li>基于 cookie 的机制很容易被 CSRF（跨站请求伪造）</li>
<li>查询 Session 信息可能会有数据库查询操作</li>
</ul>
<h2 id="jwt介绍" tabindex="-1"><a class="header-anchor" href="#jwt介绍" aria-hidden="true">#</a> JWT介绍</h2>
<h3 id="什么是-jwt" tabindex="-1"><a class="header-anchor" href="#什么是-jwt" aria-hidden="true">#</a> 什么是 JWT</h3>
<p>jwt 是 json web token 的圈层，它解决了 session 以上的问题，优点是服务器不保存任何会话数据，即服务器变为无状态，使其更容易扩展</p>
<h3 id="jwt的构成" tabindex="-1"><a class="header-anchor" href="#jwt的构成" aria-hidden="true">#</a> JWT的构成</h3>
<p>Header（头部）+ Payload（有效载荷）+ Signature（签名）</p>
<h4 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> Header</h4>
<ul>
<li>typ：token 的类型，这里固定位 JWT</li>
<li>alg：使用 hash 算法，例如：RSA、SHA256 或者 HMAC</li>
</ul>
<h4 id="payload" tabindex="-1"><a class="header-anchor" href="#payload" aria-hidden="true">#</a> Payload</h4>
<ul>
<li>存储需要传递的信息，如用户ID、用户名等</li>
<li>包含元数据，如过期时间、发布人等</li>
<li>与 Header 不同 Payload 可以加密</li>
</ul>
<h4 id="signature" tabindex="-1"><a class="header-anchor" href="#signature" aria-hidden="true">#</a> Signature</h4>
<ul>
<li>对 Header 和 Payload 部分进行签名</li>
<li>保证 Token 在传输的过程中没有被篡改或者损坏</li>
</ul>
<h3 id="认证流程" tabindex="-1"><a class="header-anchor" href="#认证流程" aria-hidden="true">#</a> 认证流程</h3>
<ol>
<li>客户端登录时传用户名、密码</li>
<li>服务器拿到用户名和密码后根据算法，生成 token，返回给浏览器</li>
<li>客户端拿到 token 后，存在本地存储中，再请求时带着 token 请求（一般放在 http header 中）</li>
<li>服务器拿着传来的 token ，验证其身份，返回资源</li>
</ol>
<blockquote>
<p>PS：服务器可以在 paylload 设置过期时间，如果过期，可以让客户端重新发起验证</p>
</blockquote>
<h3 id="jwt缺点" tabindex="-1"><a class="header-anchor" href="#jwt缺点" aria-hidden="true">#</a> JWT缺点</h3>
<ul>
<li>更多的空间占用</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&amp;mid=2247485063&amp;idx=1&amp;sn=82c8ea7a0467a91b8dbbdd950f761fe5&amp;chksm=c0668711f7110e076d9dc265e79c837871cc615ca41a0ab669fdf28f911c1f9245ef8dba042f&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1582675470189&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">还分不清 Cookie、Session、Token、JWT<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&amp;mid=2247496330&amp;idx=1&amp;sn=5da74664cd5674e5771059cd5fd1c298&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">辩证的眼光搞懂 JWT 这个知识点<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/bMIIbfbJ1ETt7b419Oaukg" target="_blank" rel="noopener noreferrer">理解 Cookie、Session、Token<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&amp;mid=2247488056&amp;idx=1&amp;sn=d07e95f60604aa2da9aee49b86e6cd5f&amp;chksm=ea0d58c2dd7ad1d45e20a951b8847b63d597a99ade063014e20e79b23162e051ee06f68755d0&amp;scene=126&amp;sessionid=1600412234&amp;key=d3c7cb8eeb23bc83968429e6896fb1b7aba49ba0d6a3b34aff3f5ccb37deb4cb883e7a341562d5ab59ff32b314a331abab775bccc7865ce6c364a77489f8bf91df735ca53b2b3a507b575204e29604b058962fba3a78d88dfc2a238dc84d35749b598b16d8077ecdc6928b0da8787889d8a64251fc1618d27a315f2e46696f5b&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=62090529&amp;lang=zh_CN&amp;exportkey=ATtLISQdbnnQU2A6%2BO3uCSY%3D&amp;pass_ticket=G1%2BpLV9U7UxieEvoe8apJpgtIUKxkgKCK%2Fa%2B3TfiAiVfivJ091UXMCqZfVMTaBn2&amp;wx_header=0" target="_blank" rel="noopener noreferrer">使用NodeJS实现JWT原理<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
