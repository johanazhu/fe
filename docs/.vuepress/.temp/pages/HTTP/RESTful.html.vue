<template><h1 id="restful" tabindex="-1"><a class="header-anchor" href="#restful" aria-hidden="true">#</a> RESTful</h1>
<h2 id="restful-api-是什么" tabindex="-1"><a class="header-anchor" href="#restful-api-是什么" aria-hidden="true">#</a> RESTful API  是什么？</h2>
<h3 id="什么是-rest" tabindex="-1"><a class="header-anchor" href="#什么是-rest" aria-hidden="true">#</a> 什么是 REST</h3>
<p>REST 的全称是 Representational state transfer</p>
<ul>
<li>Representational：数据的表现形式（JSON、XML...）</li>
<li>state：当前状态或者数据</li>
<li>transfer：数据传输</li>
</ul>
<p>它描述了一个系统如何与另一个交流。比如一个产品的状态（名字，详情）表现为 XML，JSON 或者普通文本</p>
<p>REST 有六个约束：</p>
<ul>
<li>Client—Server（客户端——服务器端）</li>
<li>Stateless（无状态）</li>
<li>Cache（缓存）</li>
<li>Uniform Interface（统一接口）</li>
<li>Layered System（分层系统）</li>
<li>Code-On-Demand（按需代码）</li>
</ul>
<h3 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h3>
<h4 id="请求设计规范" tabindex="-1"><a class="header-anchor" href="#请求设计规范" aria-hidden="true">#</a> 请求设计规范</h4>
<ul>
<li>URI 使用名词，尽力使用复数，如 /users</li>
<li>URI 使用 嵌套 表示 关联关系，如 /users/123/repos/234</li>
<li>使用 正确的 HTTP 方式，如 GET/POST/PUT/DELETE</li>
</ul>
<h4 id="相应设计规范" tabindex="-1"><a class="header-anchor" href="#相应设计规范" aria-hidden="true">#</a> 相应设计规范</h4>
<ul>
<li>查询</li>
<li>分页</li>
<li>字段过滤</li>
</ul>
<p>如果记录数量很多，服务器不可能都将它们返回给用户。API 应该提供参数，过滤返回结果。如以下代码参考：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>?limit<span class="token operator">=</span><span class="token number">10</span>:指定返回记录的数量
?offest<span class="token operator">=</span><span class="token number">10</span>:指定返回记录的开始位置
?page<span class="token operator">=</span><span class="token number">2</span><span class="token operator">&amp;</span><span class="token assign-left variable">pre_page</span><span class="token operator">=</span><span class="token number">100</span>:指定第几页，以及每页的记录数
?sortby<span class="token operator">=</span>name<span class="token operator">&amp;</span><span class="token assign-left variable">order</span><span class="token operator">=</span>asc:指定返回结果按照哪个属性排序，以及排序顺序
?animal_type_id<span class="token operator">=</span><span class="token number">1</span>:指定筛选条件
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>状态码</li>
<li>错误处理</li>
</ul>
<p>就像 HTML 的错误页面向访问者展示了有用的错误消息一样，API 也应该用之前清晰易读的格式来提供有用的错误消息</p>
</template>
