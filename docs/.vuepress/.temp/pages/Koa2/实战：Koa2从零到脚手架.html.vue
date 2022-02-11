<template><h1 id="实战-koa2从零到脚手架" tabindex="-1"><a class="header-anchor" href="#实战-koa2从零到脚手架" aria-hidden="true">#</a> 实战：Koa2从零到脚手架</h1>
<h2 id="什么是-koa2" tabindex="-1"><a class="header-anchor" href="#什么是-koa2" aria-hidden="true">#</a> 什么是 Koa2</h2>
<p>由 Express 原班人马打造的新生代 Node.js Web 框架，它的代码很简单，没有像 Express 那样，提供路由、静态服务等等，它是为了解决 Node 问题（简化了 Node 中操作）并取代之，它本身是一个简单的中间件框架，需要配合各个中间件才能使用</p>
<p><a href="https://koajs.com/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p><a href="https://koa.bootcss.com/" target="_blank" rel="noopener noreferrer">中文文档<ExternalLinkIcon/></a> (野生)</p>
<h2 id="最简单的-koa-服务器" tabindex="-1"><a class="header-anchor" href="#最简单的-koa-服务器" aria-hidden="true">#</a> 最简单的 Koa 服务器</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'Hello World'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'3000端口已启动'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="洋葱模型" tabindex="-1"><a class="header-anchor" href="#洋葱模型" aria-hidden="true">#</a> 洋葱模型</h2>
<p><img src="https://i.loli.net/2021/08/22/HBG3YuUs6Pn48AO.png" alt="洋葱模型"></p>
<p>这是 Koa 的洋葱模型</p>
<p>看看 Express 的中间件是什么样的：</p>
<p><img src="https://i.loli.net/2021/08/22/hMleGoU2NwQtYqO.png" alt="Express的中间件"></p>
<p>请求（Request）直接依次贯穿各个中间件，最后通过请求处理函数返回响应（Response）。再来看看 Koa 的中间件是什么样的：</p>
<p><img src="https://i.loli.net/2021/08/22/clE2NI1svCihqQm.png" alt="koa的中间件"></p>
<p>可以看出，Koa 中间件不像 Express 中间件那样在请求通过了之后就完成自己的使命；相反，中间件的执行清晰地分为两个阶段。我们看看 Koa 中间件具体是什么样的</p>
<h2 id="koa中间件的定义" tabindex="-1"><a class="header-anchor" href="#koa中间件的定义" aria-hidden="true">#</a> Koa中间件的定义</h2>
<p>Koa的中间件是这样一个函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">middleware</span><span class="token punctuation">(</span><span class="token parameter">ctx<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 先做什么</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 后做什么</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>第一个参数是 Koa Context，也就是上图中贯穿中间件和请求处理函数的绿色箭头所传递的内容，里面封装了请求体和响应体（实际上还有其他属性），分别可以通过 <code>ctx.request</code> 和 <code>ctx.response</code> 来获取，一下是一些常用的属性：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>ctx<span class="token punctuation">.</span>url <span class="token comment">// 相当于 ctx.request.url</span>
ctx<span class="token punctuation">.</span>body <span class="token comment">// 相当于 ctx.response.boby</span>
ctx<span class="token punctuation">.</span>status <span class="token comment">// 相当于 ctx.response.status</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>更多 Context 属性请参考 <a href="https://github.com/koajs/koa/blob/master/docs/api/context.md" target="_blank" rel="noopener noreferrer">Context API 文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>中间件的第二个参数便是 <code>next</code> 函数：用来把控制权转交给下一个中间件。但它与 Express 的 <code>next</code> 函数本质的区别在于， <strong>Koa 的 <code>next</code> 函数返回的是一个 Promise</strong> ，在这个 Promise 进入完成状态（Fulfilled）后，就会去执行中间件中第二个阶段的代码。具体可以看这一篇—— <RouterLink to="/Koa2/%E6%89%8B%E5%86%99koa2.html">手写koa2</RouterLink></p>
<h2 id="有哪些常见的中间件" tabindex="-1"><a class="header-anchor" href="#有哪些常见的中间件" aria-hidden="true">#</a> 有哪些常见的中间件</h2>
<h3 id="路由中间件——koa-router或-koa-router" tabindex="-1"><a class="header-anchor" href="#路由中间件——koa-router或-koa-router" aria-hidden="true">#</a> 路由中间件——koa-router或@koa/router</h3>
<h4 id="下载-npm-包" tabindex="-1"><a class="header-anchor" href="#下载-npm-包" aria-hidden="true">#</a> 下载 npm 包</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> koa-router --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p>有些教程使用 <code>@koa/router</code>，现如今这两个库由同一个人维护，代码也一致。即 koa-router === @koa/router（写自2021年8月23日）</p>
</blockquote>
<p>NPM包地址：<a href="https://www.npmjs.com/package/koa-router" target="_blank" rel="noopener noreferrer">koa-router<ExternalLinkIcon/></a> 、<a href="https://www.npmjs.com/package/@koa/router" target="_blank" rel="noopener noreferrer">@koa/router<ExternalLinkIcon/></a></p>
<h4 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h4>
<p>在根目录下创建 controllers 目录，用来存放控制器有关的代码。首先是 HomeController，创建 controllers/home.js，代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">HomeController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">home</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'hello world'</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'Login Controller'</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'Register Controller'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> HomeController<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="实现路由" tabindex="-1"><a class="header-anchor" href="#实现路由" aria-hidden="true">#</a> 实现路由</h4>
<p>再创建 routes 文件夹，用于把控制器挂载到对应的路由上面，创建 home.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-router'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> home<span class="token punctuation">,</span> login<span class="token punctuation">,</span> register <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../controllers/home'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> home<span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/login'</span><span class="token punctuation">,</span> login<span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/register'</span><span class="token punctuation">,</span> register<span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="注册路由" tabindex="-1"><a class="header-anchor" href="#注册路由" aria-hidden="true">#</a> 注册路由</h4>
<p>在 routes 中创建 index.js，以后所有的路由都放入 routes，我们创建 index.js 的目的是为了让结构更加整齐，index.js 负责所有路由的注册，它的兄弟文件负责各自的路由</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">app</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  fs<span class="token punctuation">.</span><span class="token function">readdirSync</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>file <span class="token operator">===</span> <span class="token string">'index.js'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">./</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>file<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>route<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>route<span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote>
<p>注：allowedMethods 的作用</p>
<ol>
<li>响应 option 方法，告诉它所支持的请求方法</li>
<li>相应地返回 405 （不允许）和 501 （没实现）</li>
</ol>
<p>注：可以看到 <code>@koa/router</code> 的使用方式基本上与 Express Router 保持一致</p>
</blockquote>
<h4 id="引入路由" tabindex="-1"><a class="header-anchor" href="#引入路由" aria-hidden="true">#</a> 引入路由</h4>
<p>最后我们需要将 router 注册为中间件，新建 <code>index.js</code>，编写代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> routing <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./routes'</span><span class="token punctuation">)</span>

<span class="token comment">// 初始化 Koa 应用实例</span>
consr app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 注册中间件</span>
<span class="token comment">// 相应用户请求</span>
<span class="token function">routing</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>

<span class="token comment">// 运行服务器</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>使用 postman 测试一下</p>
<p><img src="https://i.loli.net/2021/08/24/PFnyfjLORIZ1imC.png" alt="测试路由"></p>
<h3 id="其他中间件" tabindex="-1"><a class="header-anchor" href="#其他中间件" aria-hidden="true">#</a> 其他中间件</h3>
<ul>
<li>koa-bodyparser ——请求体解析</li>
<li>koa-static —— 提供静态资源服务</li>
<li>@koa/cors —— 跨域</li>
<li>koa-json-error —— 处理错误</li>
<li>koa-parameter —— 参数校验</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cnpm i koa-bodyparser -S 
cnpm i koa-static -S
cnpm i @koa/cors -S
cnpm i koa-json-error -S
cnpm i koa-parameter -S
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> bobyParser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-bodyparser'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> koaStatic <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-static'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> cors <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'@koa/cors'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> error <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-json-error'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> parameter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-parameter'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> routing <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./routes'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>
  <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">postFormat</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> <span class="token punctuation">{</span> stack<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span>
      process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">'production'</span> <span class="token operator">?</span> rest <span class="token operator">:</span> <span class="token punctuation">{</span> stack<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">bobyParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">koaStatic</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">parameter</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">routing</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'3000端口已启动'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="实现-jwt-鉴权" tabindex="-1"><a class="header-anchor" href="#实现-jwt-鉴权" aria-hidden="true">#</a> 实现 JWT 鉴权</h2>
<p>JSON Web Token（JWT）是一种流行的 RESTful API 鉴权方案</p>
<p>先安装相关的 npm 包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cnpm <span class="token function">install</span> koa-jwt jsonwebtoken -S
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>创建 <code>config/index.js</code> ，用来存放 JWT Secret 常量，代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">JWT_SECRET</span> <span class="token operator">=</span> <span class="token string">'secret'</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">JWT_SECRET</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>有些路由我们希望只有已登录的用户才有权查看（受保护路由），而另一些路由则是所有请求都可以访问（不受保护的路由）。在 Koa 的洋葱模型中，我们可以这样实现：</p>
<p><img src="https://i.loli.net/2021/08/23/J5LYKBUTFIm4Q87.png" alt="加入JWT后的洋葱模型"></p>
<p>可以看出，所有的请求都可以直接访问未受保护的路由，但是受保护的路由都放在 JWT 中间件的后面，我们需要再创建几个文件来做 JWT 的实验</p>
<p>我们知道，所谓的用户（users）是个最常见的需要鉴权的路由，所以我们现在 controllers 中创建 user.js ，写下如下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'create'</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'find'</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'findById'</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'update'</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">'delete'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> UserController
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="注册-jwt-中间件" tabindex="-1"><a class="header-anchor" href="#注册-jwt-中间件" aria-hidden="true">#</a> 注册 JWT 中间件</h3>
<p>用户的增删改查都安排上了，语义很明显了，其次我们在 routes 文件中创建 user.js，这里展示与 users 路由相关的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-router'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'koa-jwt'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span>
  create<span class="token punctuation">,</span>
  find<span class="token punctuation">,</span>
  findById<span class="token punctuation">,</span>
  update<span class="token punctuation">,</span>
  <span class="token keyword">delete</span><span class="token operator">:</span> del<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../controllers/user'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Router</span><span class="token punctuation">(</span><span class="token punctuation">{</span> prefix<span class="token operator">:</span> <span class="token string">'/users'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token constant">JWT_SECRET</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../config/'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> auth <span class="token operator">=</span> <span class="token function">jwt</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token constant">JWT_SECRET</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> create<span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> find<span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/:id'</span><span class="token punctuation">,</span> findById<span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">'/:id'</span><span class="token punctuation">,</span> auth<span class="token punctuation">,</span> update<span class="token punctuation">)</span>
router<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'/:id'</span><span class="token punctuation">,</span> auth<span class="token punctuation">,</span> del<span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> router
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>综上代码，routes 文件下的 home.js 都不需要 JWT 中间件的保护，user.js 中的 更新和删除需要 JWT 的保护</p>
<p>测试一下，能看出 JWT 已经起作用了</p>
<p><img src="https://i.loli.net/2021/08/24/HEt9xDV8WQUnKcJ.png" alt="测试JWT"></p>
<p>我们到目前为止，完成了对 JWT 的验证，但是验证的前提是先签发 JWT，怎么签发，你登录的时候我给你一个签好名的 token，要更新/删除时在请求头中带上 token，我就能校验...</p>
<p>这里牵扯到登录，我们先暂停一下，先补充数据库的知识，让项目更加完整</p>
<h2 id="mongoose-加入战场" tabindex="-1"><a class="header-anchor" href="#mongoose-加入战场" aria-hidden="true">#</a> Mongoose 加入战场</h2>
<p>如果要做一个完整的项目，数据库是必不可少的，与 Node 匹配的较好的是 NoSql 数据库，其中以 Mongodb 为代表，当然如果我们要使用这一数据库，需要按照相应的库，而这个库就是 mongoose</p>
<h3 id="下载-mongoose" tabindex="-1"><a class="header-anchor" href="#下载-mongoose" aria-hidden="true">#</a> 下载 mongoose</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cnpm i mongoose -S
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="连接及配置" tabindex="-1"><a class="header-anchor" href="#连接及配置" aria-hidden="true">#</a> 连接及配置</h3>
<p>在 <code>config/index.js</code> 中添加 connectionStr 变量，代表 mongoose 连接的数据库地址</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token constant">JWT_SECRET</span> <span class="token operator">=</span> <span class="token string">'secret'</span>
<span class="token keyword">const</span> connectionStr <span class="token operator">=</span> <span class="token string">'mongodb://127.0.0.1:27017/basic'</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token constant">JWT_SECRET</span><span class="token punctuation">,</span>
  connectionStr<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>创建 <code>db/index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> connectionStr <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../config/'</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">connect</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>connectionStr<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      useNewUrlParser<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      useUnifiedTopology<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    mongoose<span class="token punctuation">.</span>connection<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'open'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Mongoose连接成功'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>进入主文件 <code>index.js</code>，修改配置并启动</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">const</span> db <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./db/'</span><span class="token punctuation">)</span>
<span class="token operator">...</span>

db<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>启动服务 <code>npm run serve</code>，即 <code>nodemon index.js</code>，能看出 mongoose 已经连接成功了</p>
<p><img src="https://i.loli.net/2021/08/23/LQcboKAC8sZXMFh.png" alt="nodemon"></p>
<h3 id="创建数据模型定义" tabindex="-1"><a class="header-anchor" href="#创建数据模型定义" aria-hidden="true">#</a> 创建数据模型定义</h3>
<p>在根目录下创建 <code>models</code> 目录，用来存放数据模型定义文件，在其中创建 <code>User.js</code>，代表用户模型，代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongoose'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">mongoose<span class="token punctuation">.</span>Schema</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> String <span class="token punctuation">}</span><span class="token punctuation">,</span>
  password<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> String <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> mongoose<span class="token punctuation">.</span><span class="token function">model</span><span class="token punctuation">(</span><span class="token string">'User'</span><span class="token punctuation">,</span> schema<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>具体可以看看 <RouterLink to="/Node/Mongoose.html">Mongoose</RouterLink> 这篇文章，这里我们就看行为，以上代码表示建立了一个数据对象，供操作器来操作数据库</p>
<h3 id="在-controller-中操作数据库" tabindex="-1"><a class="header-anchor" href="#在-controller-中操作数据库" aria-hidden="true">#</a> 在 Controller 中操作数据库</h3>
<p>然后就可以在 Controller 中进行数据的增删改查操作。首先我们打开 <code>constrollers/user.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../models/User'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span> <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">findById</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findByIdAndUpdate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findByIdAndDelete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">204</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> UserController
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>以上代码中，</p>
<ul>
<li>User.create({xxx})：在 User 表中创建一个数据</li>
<li>User.find()：查看所有的 User 表中的数据</li>
<li>User.findById(id)：查看 User 表中的其中一个</li>
<li>User.findByIdAndUpdate(id, body)：更新 User 表中的其中一个数据</li>
<li>User.findByIdAndDelete(id)：删除 User 表中的其中一个数据</li>
</ul>
<p>以上就是对数据库的<strong>增删改查</strong></p>
<h2 id="加盐" tabindex="-1"><a class="header-anchor" href="#加盐" aria-hidden="true">#</a> 加盐</h2>
<p>这个我们需要对密码进行一下加密，无它，安全。</p>
<p>进数据库一查，就能看到密码，这说明数据对开发人员是公开的，开发人员可以拿着用户的账号密码做任何事，这是不被允许的</p>
<p><img src="https://i.loli.net/2021/08/24/iJZhb8D297e4Tjl.png" alt="数据库中的用户表"></p>
<h3 id="下载-npm-包——bcrypt" tabindex="-1"><a class="header-anchor" href="#下载-npm-包——bcrypt" aria-hidden="true">#</a> 下载 npm 包——bcrypt</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cnpm i bcrypt --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我们前往 <code>models/User.js</code> 中，对其进行改造</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">mongoose<span class="token punctuation">.</span>Schema</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> String <span class="token punctuation">}</span><span class="token punctuation">,</span>
  password<span class="token operator">:</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> String<span class="token punctuation">,</span>
    select<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hashSync</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>添加 select：false 不可见，set(val) 对值进行加密，我们来测试一下</p>
<p><img src="https://i.loli.net/2021/08/24/JoHQ5XICL2Bh1St.png" alt="创建李四"></p>
<p>能看到 password 被加密了，即使在数据库里，也看不出用户的密码，那用户输入的密码难道输入这么一串密码，显然不是，用户要是输入的话，我们要对其进行验证，例如我们的登录</p>
<p>我们进入 <code>constrollers/home</code> 文件中，对其进行改造，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">class</span> <span class="token class-name">HomeController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span> <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">'+password'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> isValid <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareSync</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> isValid
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul>
<li>User.findOne({ username }) 能查到到没有 password 的数据，因为我们人为的把 select 设为 false，如果要看，加上 select('+password') 即可</li>
<li>require('bcrypt').compareSync(password, user.password) 将用户输入的明文密码和数据库中的加密密码进行验证，为 true 是正确，false 为密码不正确</li>
</ul>
<p>回到 JWT</p>
<h2 id="在-login-中签发-jwt-token" tabindex="-1"><a class="header-anchor" href="#在-login-中签发-jwt-token" aria-hidden="true">#</a> 在 Login 中签发 JWT Token</h2>
<p>我们需要提供一个 API 端口让用户可以获取到 JWT Token，最合适的当然是登录接口 <code>/login</code> ，打开 <code>controllers/home.js</code>，在 <code>login</code> 控制器中实现签发 JWT Token 的逻辑，代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'jsonwebtoken'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../models/User'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token constant">JWT_SECRET</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../config/'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">HomeController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span> <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body

    <span class="token comment">// 1.根据用户名找用户</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">'+password'</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">422</span>
      ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span> message<span class="token operator">:</span> <span class="token string">'用户名不存在'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 2.校验密码</span>
    <span class="token keyword">const</span> isValid <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareSync</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isValid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token operator">:</span> user<span class="token punctuation">.</span>_id <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token constant">JWT_SECRET</span><span class="token punctuation">)</span>
      ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
      ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> token
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">401</span>
      ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span> message<span class="token operator">:</span> <span class="token string">'密码错误'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>在 <code>login</code> 中，我们首先根据用户名（请求体中的 <code>name</code> 字段）查询对应的用户，如果该用户不存在，则直接返回 401；存在的话再通过 <code>(bcrypt').compareSync</code> 来验证请求体中的明文密码 <code>password</code> 是否和数据库中存储的加密密码是否一致，如果一致则通过 <code>jwt.sign</code> 签发 Token，如果不一致则还是返回 401。</p>
<h2 id="在-user-控制器中添加访问控制" tabindex="-1"><a class="header-anchor" href="#在-user-控制器中添加访问控制" aria-hidden="true">#</a> 在 User 控制器中添加访问控制</h2>
<p>Token 的中间件和签发都搞定之后，最后一步就是在合适的地方校验用户的 Token，确认其是否有足够的权限。最典型的场景便是，在更新或删除用户时，我们要<strong>确保是用户本人在操作</strong>。打开 <code>controllers/user.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> User <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../models/User'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userId <span class="token operator">=</span> ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
    <span class="token keyword">if</span> <span class="token punctuation">(</span>userId <span class="token operator">!==</span> ctx<span class="token punctuation">.</span>state<span class="token punctuation">.</span>user<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">403</span>
      ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span>
        message<span class="token operator">:</span> <span class="token string">'无权进行此操作'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findByIdAndUpdate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userId <span class="token operator">=</span> ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id

    <span class="token keyword">if</span> <span class="token punctuation">(</span>userId <span class="token operator">!==</span> ctx<span class="token punctuation">.</span>state<span class="token punctuation">.</span>user<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">403</span>
      ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span> message<span class="token operator">:</span> <span class="token string">'无权进行此操作'</span> <span class="token punctuation">}</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findByIdAndDelete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">204</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> UserController
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>添加了一些用户并登录，将 Token 添加到请求头中，使用 DELETE 删除用户，能看到 状态码变成 204，删除成功</p>
<p><img src="https://i.loli.net/2021/08/24/TgPnXmwVZF8vYNQ.png" alt="删除用户操作"></p>
<h2 id="断言处理" tabindex="-1"><a class="header-anchor" href="#断言处理" aria-hidden="true">#</a> 断言处理</h2>
<p>在做登录时、更新用户信息、删除用户时，我们需要if else 来判断，这看起来很蠢，如果我们能用断言来处理，代码在看上去会优雅很多，这个时候 <code>http-assert</code> 就出来了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// constrollers/home.js</span>
<span class="token operator">...</span>
<span class="token keyword">const</span> assert <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http-assert'</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">HomeController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span> <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body
    <span class="token comment">// 1.根据用户名找用户</span>
    <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">'+password'</span><span class="token punctuation">)</span>
    <span class="token comment">// if (!user) {</span>
    <span class="token comment">//   ctx.status = 401</span>
    <span class="token comment">//   ctx.body = { message: '用户名不存在' }</span>
    <span class="token comment">// }</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token number">422</span><span class="token punctuation">,</span> <span class="token string">'用户不存在'</span><span class="token punctuation">)</span>
    <span class="token comment">// 2.校验密码</span>
    <span class="token keyword">const</span> isValid <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareSync</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>isValid<span class="token punctuation">,</span> <span class="token number">422</span><span class="token punctuation">,</span> <span class="token string">'密码错误'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token operator">:</span> user<span class="token punctuation">.</span>_id <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token constant">JWT_SECRET</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token punctuation">{</span> token <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
   <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>同理，处理 <code>controllers/user</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userId <span class="token operator">=</span> ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
    <span class="token function">assert</span><span class="token punctuation">(</span>userId <span class="token operator">===</span> ctx<span class="token punctuation">.</span>state<span class="token punctuation">.</span>user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token number">403</span><span class="token punctuation">,</span> <span class="token string">'无权进行此操作'</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findByIdAndUpdate</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userId <span class="token operator">=</span> ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id
    <span class="token function">assert</span><span class="token punctuation">(</span>userId <span class="token operator">===</span> ctx<span class="token punctuation">.</span>state<span class="token punctuation">.</span>user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token number">403</span><span class="token punctuation">,</span> <span class="token string">'无权进行此操作'</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">findByIdAndDelete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">204</span>
  <span class="token punctuation">}</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>代码看起来就是整洁清爽</p>
<h2 id="参数校验" tabindex="-1"><a class="header-anchor" href="#参数校验" aria-hidden="true">#</a> 参数校验</h2>
<p>之前我们加了一个中间件——<code>koa-parameter</code>，我们当初只是注册了这个中间件，但是未使用，我们在创建用户时需要判断用户名和密码的数据类型为 String 类型且必填，进入 <code>controllers/user.js</code> 添加代码如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token operator">...</span>
<span class="token keyword">class</span> <span class="token class-name">UserController</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ctx<span class="token punctuation">.</span><span class="token function">verifyParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      username<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      password<span class="token operator">:</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span> required<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span> <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>body
    <span class="token keyword">const</span> model <span class="token operator">=</span> <span class="token keyword">await</span> User<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
    ctx<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">200</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> model
  <span class="token punctuation">}</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>Github地址：<a href="https://github.com/johanazhu/koa-basic" target="_blank" rel="noopener noreferrer">koa-basic<ExternalLinkIcon/></a></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://tuture.co/2020/05/22/fac8401/" target="_blank" rel="noopener noreferrer">一杯茶的时间，上手 Koa2 + MySQL 开发<ExternalLinkIcon/></a></li>
</ul>
</template>
