<template><h1 id="http常见面试题" tabindex="-1"><a class="header-anchor" href="#http常见面试题" aria-hidden="true">#</a> HTTP常见面试题</h1>
<h2 id="get-和-post-的区别在哪里" tabindex="-1"><a class="header-anchor" href="#get-和-post-的区别在哪里" aria-hidden="true">#</a> GET 和 POST 的区别在哪里？</h2>
<ul>
<li>从缓存角度看，GET 会被缓存，POST 不会被缓存</li>
<li>从参数角度看，GET 通过在 url 的&quot;?&quot;后以 key=value 方式传参，数据之间以“&amp;”相连接；POST 则要将数据封装到请求体中发送，这个过程不可见</li>
<li>从安全角度看，GET 不安全，因为 URL 可见；POST 较 GET 安全度高</li>
<li>从编码角度看，GET 只接受 ASCII 字符，向服务器发送中文字符可能会出现乱码；POST 支持标准字符集，可以正确传递中文</li>
<li>从数据长度的限制看，GET 一般受 URL 长度限制（URL 的最大长度是 2048 个字符），POST 无限制</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000038556123" target="_blank" rel="noopener noreferrer">GET 和 POST请求的本质区别是什么？<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&amp;mid=2247484152&amp;idx=1&amp;sn=ba6fc3a8c71c69a2290f2284aad74fcb&amp;scene=19#wechat_redirect" target="_blank" rel="noopener noreferrer">点亮前端必会网络知识点<ExternalLinkIcon/></a></li>
</ul>
</template>
