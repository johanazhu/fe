<template><h1 id="restful是个啥东西" tabindex="-1"><a class="header-anchor" href="#restful是个啥东西" aria-hidden="true">#</a> RESTful是个啥东西</h1>
<h2 id="一句话" tabindex="-1"><a class="header-anchor" href="#一句话" aria-hidden="true">#</a> 一句话</h2>
<p>用 URL 定位资源，用 HTTP 描述操作</p>
<p>看 URL 就知道你要什么资源</p>
<p>看 HTTP method 就知道你要干什么</p>
<p>看 status code 就知道结果是什么</p>
<h2 id="是什么" tabindex="-1"><a class="header-anchor" href="#是什么" aria-hidden="true">#</a> 是什么</h2>
<p>RESTful架构风格最初由Roy T. Fielding（HTTP/1.1协议专家组负责人）在其2000年的博士学位论文中提出。</p>
<p>REST 即 Representational State Transfer 的缩写，可译为”表现层状态转化“</p>
<ul>
<li>Representational: 数据的表现形式（JSON、XML......）</li>
<li>State：当前状态或者数据</li>
<li>Transfer：数据传输</li>
</ul>
<h2 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h2>
<p>REST 最大的特点为：资源、统一接口、URI和无状态</p>
<ul>
<li>资源
<ul>
<li>数据也好、服务也罢。都是资源</li>
<li>以 json 为载体展示</li>
</ul>
</li>
<li>统一接口
<ul>
<li>增删改查（CRUD）分别对应 HTTP 方法
<ul>
<li>GET 查询</li>
<li>POST 增加</li>
<li>PUT 更新（PATCH也是更新，修改部分资源）</li>
<li>DELETE 删除</li>
</ul>
</li>
</ul>
</li>
<li>URI
<ul>
<li>URI（统一资源定位符）指向资源，URI 就是一个资源的地址或标识符</li>
</ul>
</li>
<li>无状态
<ul>
<li>所有的资源，都可以通过 URI 定位，而且这个定位与其他资源无关</li>
<li>对每个资源的请求，都不依赖于其他资源或其他请求</li>
</ul>
</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.zhihu.com/question/28557115" target="_blank" rel="noopener noreferrer">怎样用通俗的语言解释REST，以及RESTful？<ExternalLinkIcon/></a></li>
<li><a href="https://blog.igevin.info/posts/restful-architecture-in-general/" target="_blank" rel="noopener noreferrer">RESTful 架构风格概述<ExternalLinkIcon/></a></li>
</ul>
</template>
