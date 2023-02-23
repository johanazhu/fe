import{_ as e,c as l,o as a,d as i}from"./app.590c1fbf.js";const P=JSON.parse('{"title":"HTTP 报文组成","description":"","frontmatter":{},"headers":[{"level":3,"title":"请求行","slug":"请求行","link":"#请求行","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"relativePath":"HTTP/HTTP报文组成.md"}'),t={name:"HTTP/HTTP报文组成.md"},r=i('<h1 id="http-报文组成" tabindex="-1">HTTP 报文组成 <a class="header-anchor" href="#http-报文组成" aria-hidden="true">#</a></h1><p>前几篇在讲 HTTP 是什么、它的历史发展，还说到它在网络分层模型中所处位置，以及连接 HTTP 时 TCP 要做的 三次握手四次挥手，那么 HTTP 具体由有什么组成呢？它的报文是什么，请求的报文怎么看呢？本文讲讲这些</p><p>要想把我发的消息通过 HTTP 协议传给另一个人，就需要一种格式，表示它的类型，内容，时间等等，就好比写新闻讲究 5W1H，写诗有五言绝句七言律诗，每一种概念都会具体化，HTTP 的报文也有自己的规律</p><p>报文分为请求报文和应答报文，它们的结构基本相同，由三大部分组成</p><ul><li>起始行：描述请求或响应的基本信息</li><li>头部字段集合：使用 key-value 形式更详细地描述报文</li><li>消息正文：实际传输的数据，不一定是纯文本，也可以是图片、视频或二进制数据</li></ul><p>其中前两部分起始行和头部字段集合经常又合称为 请求头 或 响应头，消息正文又称为实体，但与 header 对应，很多时候就直接称为 body</p><p>一个完整的 HTTP 报文就如下图所示，注意在 header 和 body 之间又一个空行</p><p><img src="https://s2.loli.net/2022/04/08/ystGFaB78dZMDvO.png" alt="报文信息"></p><p>访问<a href="https://fe.azhubaby.com/" target="_blank" rel="noreferrer">五年前端三年面试</a>，元芳能看出一丝猫腻，具体我不能说太多</p><p><img src="https://s2.loli.net/2022/04/08/FDxrJvqiLB4kAOj.png" alt="image-20220408153029388"></p><h3 id="请求行" tabindex="-1">请求行 <a class="header-anchor" href="#请求行" aria-hidden="true">#</a></h3><p>请求报文离的起始行也就是请求行，它描述了客户端想要如何操作服务器端的资源</p><p>它由三部分构成：</p><ul><li>请求方法：GET/POST，表示对资源的操作</li><li>请求目标：通常是个 URI，标记了请求方法要操作的资源</li><li>版本号：表示报文使用 HTTP 协议版本</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><ol><li>HTTP 报文结构就像是「大头儿子」，由「起始行 + 头部 + 空行 + 实体」组成，简单地说就是「header+body」；</li><li>HTTP 报文可以没有 body，但必须要有 header，而且 header 后也必须要有空行，形象地说就是大头必须要带着脖子；</li><li>请求头由「请求行 + 头部字段」构成，响应头由「状态行 + 头部字段」构成；</li><li>请求行有三部分：请求方法，请求目标和版本号；</li><li>状态行也有三部分：版本号，状态码和原因字符串；</li><li>头部字段是 key-value 的形式，用 <code>:</code> 分隔，不区分大小写，顺序任意，除了规定的标准头，也可以任意添加自定义字段，实现功能扩展；</li><li>HTTP/1.1 里唯一要求必须提供的头字段是 Host，它必须出现在请求头里，标记虚拟主机名</li></ol><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-hidden="true">#</a></h2><ul><li><a href="https://time.geekbang.org/column/intro/100029001" target="_blank" rel="noreferrer">透视 HTTP 协议</a></li></ul>',18),d=[r];function n(h,T,o,s,p,c){return a(),l("div",null,d)}const u=e(t,[["render",n]]);export{P as __pageData,u as default};
