<template><h1 id="koa2基础" tabindex="-1"><a class="header-anchor" href="#koa2基础" aria-hidden="true">#</a> Koa2基础</h1>
<h2 id="知识储备" tabindex="-1"><a class="header-anchor" href="#知识储备" aria-hidden="true">#</a> 知识储备</h2>
<p>Node 基本常识</p>
<h2 id="什么是-koa2" tabindex="-1"><a class="header-anchor" href="#什么是-koa2" aria-hidden="true">#</a> 什么是 Koa2</h2>
<p>由 Express 原班人马打造的新生代 Node.js Web 框架，它的代码很简单，没有像 Express 那样，提供路由、静态服务等等，它是为了解决 Node 问题（简化了 Node 中操作）并取代之，它本身是一个简单的中间件框架，需要配合各个中间件才能使用</p>
<p><a href="https://koajs.com/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p><a href="https://koa.bootcss.com/" target="_blank" rel="noopener noreferrer">中文文档<ExternalLinkIcon/></a> (野生)</p>
<p>Koa2 是什么？</p>
<ul>
<li>用 NodeJS 写的 Web 框架</li>
<li>Koa 可被视为 nodejs 的 HTTP 模块的抽象</li>
</ul>
<p>Koa 可被视为 nodejs 的 HTTP 模块的抽象</p>
<p>用法很简单：</p>
<p>Koa2 启动服务</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'Hello World'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'3000端口已启动'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>其中，Koa2 封装了 request 和 response，将它们放在一起，成了 ctx。</p>
<p>再 Koa2 中，ctx 是个很关键的值，</p>
<p>ctx.body ：返回值</p>
<p>ctx.status：返回的code</p>
<p>ctx.request：请求体</p>
<p>ctx.response：返回体</p>
<p>app 实例、context、request、request 官方API文档</p>
<p>https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/index.md</p>
<p>https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/context.md</p>
</template>
