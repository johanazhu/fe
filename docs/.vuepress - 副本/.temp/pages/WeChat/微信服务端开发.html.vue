<template><h1 id="微信服务端开发" tabindex="-1"><a class="header-anchor" href="#微信服务端开发" aria-hidden="true">#</a> 微信服务端开发</h1>
<blockquote>
<p>这里的笔记比较杂</p>
</blockquote>
<p>起服务，例如用 Koa 起个服务，后端请求微信提供的方法...</p>
<h2 id="什么是-access-token" tabindex="-1"><a class="header-anchor" href="#什么是-access-token" aria-hidden="true">#</a> 什么是 access_token</h2>
<blockquote>
<p>access_token 是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。有效期为2小时，且一天最多只能调用2000次</p>
</blockquote>
<p>这样的话，access_token 必须缓存起来（不然它只有2000次调用）</p>
<p>我们定时每1个小时刷新一次，一天也就调用24次，搓搓有余了</p>
<p>思路是这样，调用XX方法，如果有缓存，用缓存的；如果没有，去调用接口</p>
<p>做法：每一个小时去调用一次接口</p>
<h2 id="什么是-jsapi-ticket" tabindex="-1"><a class="header-anchor" href="#什么是-jsapi-ticket" aria-hidden="true">#</a> 什么是 jsapi_ticket</h2>
<p>jsapi_ticket 是公众号用于调用微信JS接口的临时票据。一般为2小时，通过access_token获取。</p>
<p>无论是 access_token 还是 jsapi_ticket ，都需要进行缓存</p>
<h2 id="如何监听消息管理" tabindex="-1"><a class="header-anchor" href="#如何监听消息管理" aria-hidden="true">#</a> 如何监听消息管理？</h2>
<p>如何监听自定义菜单的点击事件？</p>
<p><img src="@source/.vuepress/public/images/WeChat/监听点击事件.png" alt="1597714990796"></p>
<p>需要配置“接口配置信息”，这个配通了，就是说，微信会发消息给你</p>
<p>但是因为翻墙的原因，本机的ip获取不到，只能通过内网穿透来实现，找了natappfree来实现</p>
<p>使用 <code>koa-xml-body</code> 来解析 xml 格式文件</p>
<p>但是需要注意的是，<code>app.use(xmlParser());</code>  要放在 <code>app.use(bodyParser());</code> 前面</p>
<h2 id="内网穿透" tabindex="-1"><a class="header-anchor" href="#内网穿透" aria-hidden="true">#</a> 内网穿透</h2>
<p>为了在本机调试，需要内网穿透，本来用 natapp，但是偶尔会连接不上，又查了查，找到最好的内网穿透的工具：<strong>ngrok</strong></p>
<h2 id="关于media-id" tabindex="-1"><a class="header-anchor" href="#关于media-id" aria-hidden="true">#</a> 关于media_id</h2>
<p>想在公众号里回复图片，视频或者图文，就要有media_id。找了半圈，新增临时素材能获取media_id。有效期是3天</p>
<h3 id="坑点-axios请求怎么样也上传不了照片" tabindex="-1"><a class="header-anchor" href="#坑点-axios请求怎么样也上传不了照片" aria-hidden="true">#</a> 坑点：axios请求怎么样也上传不了照片</h3>
<p>这里的常见错误：<a href="https://developers.weixin.qq.com/community/develop/doc/00000ef32dc64883d9d93f31f56800" target="_blank" rel="noopener noreferrer">公众号开发 调用【上传图文消息内的图片获取URL】接口时，返回 412 错误？<ExternalLinkIcon/></a></p>
<h3 id="坑点2-微信测试号不能上传-永久media-id-但是文档没写" tabindex="-1"><a class="header-anchor" href="#坑点2-微信测试号不能上传-永久media-id-但是文档没写" aria-hidden="true">#</a> 坑点2：微信测试号不能上传 永久media_id，但是文档没写</h3>
<p>永久素材可以一般要在有素材内容的公众号里直接拿过来</p>
<p><a href="https://segmentfault.com/q/1010000012972666" target="_blank" rel="noopener noreferrer">微信公众号上传的永久素材得到的media_id无效<ExternalLinkIcon/></a></p>
<h2 id="如何让在koa中使用redis-让redis-同步" tabindex="-1"><a class="header-anchor" href="#如何让在koa中使用redis-让redis-同步" aria-hidden="true">#</a> 如何让在koa中使用redis ，让redis 同步</h2>
<p>加入一个库 async-redis</p>
<p>让它支持异步</p>
<h2 id="定时功能" tabindex="-1"><a class="header-anchor" href="#定时功能" aria-hidden="true">#</a> 定时功能</h2>
<p>定时 node-schedule 接入，每一小时定时获取 access_token</p>
</template>
