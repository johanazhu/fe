import{_ as s,c as a,o as l,d as e}from"./app.590c1fbf.js";const y=JSON.parse('{"title":"RESTful","description":"","frontmatter":{},"headers":[{"level":2,"title":"RESTful API 是什么？","slug":"restful-api-是什么","link":"#restful-api-是什么","children":[{"level":3,"title":"什么是 REST","slug":"什么是-rest","link":"#什么是-rest","children":[]},{"level":3,"title":"最佳实践","slug":"最佳实践","link":"#最佳实践","children":[]}]}],"relativePath":"HTTP/restful.md"}'),n={name:"HTTP/restful.md"},r=e(`<h1 id="restful" tabindex="-1">RESTful <a class="header-anchor" href="#restful" aria-hidden="true">#</a></h1><h2 id="restful-api-是什么" tabindex="-1">RESTful API 是什么？ <a class="header-anchor" href="#restful-api-是什么" aria-hidden="true">#</a></h2><h3 id="什么是-rest" tabindex="-1">什么是 REST <a class="header-anchor" href="#什么是-rest" aria-hidden="true">#</a></h3><p>REST 的全称是 Representational state transfer</p><ul><li>Representational：数据的表现形式（JSON、XML...）</li><li>state：当前状态或者数据</li><li>transfer：数据传输</li></ul><p>它描述了一个系统如何与另一个交流。比如一个产品的状态（名字，详情）表现为 XML，JSON 或者普通文本</p><p>REST 有六个约束：</p><ul><li>Client—Server（客户端——服务器端）</li><li>Stateless（无状态）</li><li>Cache（缓存）</li><li>Uniform Interface（统一接口）</li><li>Layered System（分层系统）</li><li>Code-On-Demand（按需代码）</li></ul><h3 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a></h3><h4 id="请求设计规范" tabindex="-1">请求设计规范 <a class="header-anchor" href="#请求设计规范" aria-hidden="true">#</a></h4><ul><li>URI 使用名词，尽力使用复数，如 /users</li><li>URI 使用 嵌套 表示 关联关系，如 /users/123/repos/234</li><li>使用 正确的 HTTP 方式，如 GET/POST/PUT/DELETE</li></ul><h4 id="相应设计规范" tabindex="-1">相应设计规范 <a class="header-anchor" href="#相应设计规范" aria-hidden="true">#</a></h4><ul><li>查询</li><li>分页</li><li>字段过滤</li></ul><p>如果记录数量很多，服务器不可能都将它们返回给用户。API 应该提供参数，过滤返回结果。如以下代码参考：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">limit</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">:指定返回记录的数量</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">offest</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">10</span><span style="color:#C3E88D;">:指定返回记录的开始位置</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">page</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">pre_page</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">100</span><span style="color:#C3E88D;">:指定第几页，以及每页的记录数</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">sortby</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&amp;</span><span style="color:#A6ACCD;">order</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">asc:指定返回结果按照哪个属性排序，以及排序顺序</span></span>
<span class="line"><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">animal_type_id</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">:指定筛选条件</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>状态码</li><li>错误处理</li></ul><p>就像 HTML 的错误页面向访问者展示了有用的错误消息一样，API 也应该用之前清晰易读的格式来提供有用的错误消息</p>`,17),p=[r];function t(i,o,c,d,h,u){return l(),a("div",null,p)}const C=s(n,[["render",t]]);export{y as __pageData,C as default};