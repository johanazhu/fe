<template><h1 id="node基础" tabindex="-1"><a class="header-anchor" href="#node基础" aria-hidden="true">#</a> Node基础</h1>
<h2 id="node-是什么" tabindex="-1"><a class="header-anchor" href="#node-是什么" aria-hidden="true">#</a> Node 是什么</h2>
<p>Node 是 JavaScript 的一种运行环境，是一个基于 Chrome V8 引擎建立的一个平台。由于采用了事件驱动、非阻塞 I/O 的模型，Node 能够成为了构建轻量且高效的 Web 应用的理想选择</p>
<h2 id="node-js-特点" tabindex="-1"><a class="header-anchor" href="#node-js-特点" aria-hidden="true">#</a> Node.js 特点</h2>
<p>非阻塞I/O</p>
<p>单线程</p>
<p>事件驱动</p>
<p>npm 包管理</p>
<p>无缓冲</p>
<p>可扩展</p>
<h2 id="node-全局对象" tabindex="-1"><a class="header-anchor" href="#node-全局对象" aria-hidden="true">#</a> Node 全局对象</h2>
<p>在浏览器中，我们有 <code>document</code> 和 <code>window</code> 等全局对象；而 Node 只包含 ECMAScript 和 V8，不包含 BOM 和 DOM，因此 Node 中不存在 <code>document</code> 和 <code>window</code>；取而代之，Node 专属的全局对象是 <code>process</code></p>
<h3 id="javascript-全局对象的分类" tabindex="-1"><a class="header-anchor" href="#javascript-全局对象的分类" aria-hidden="true">#</a> JavaScript 全局对象的分类</h3>
<p>在此之前，我们先看一下 JavaScript 各个运行环境的全局对象的比较，如下图所示：</p>
<p><img src="https://i.loli.net/2021/08/22/HfksCreUZlO37Kx.png" alt="各个运行环境的全局对象"></p>
<p>可以看到 JavaScript 全局对象可以分为四类：</p>
<ol>
<li>浏览器专属，例如 <code>window</code>、<code>alert</code> 等等；</li>
<li>Node 专属，例如 <code>process</code>、<code>__dirname</code> 、<code>__filename</code> 等等</li>
<li>浏览器和 Node 共有，但是实现方式不同，例如 <code>console</code> 、<code>setTimeout</code> 、<code>setInterval</code></li>
<li>浏览器和 Node 共有，并且属于 ECMAScript 语言定义的一部分，例如 <code>Date</code>、<code>String</code>、<code>promise</code> 等</li>
</ol>
<h3 id="node-专属全局对象解析" tabindex="-1"><a class="header-anchor" href="#node-专属全局对象解析" aria-hidden="true">#</a> Node 专属全局对象解析</h3>
<h4 id="process进程" tabindex="-1"><a class="header-anchor" href="#process进程" aria-hidden="true">#</a> process进程</h4>
<p>process 全局对象可以说是 Node.js 的灵魂，它是管理当前 Node.js 进程状态的对象，提供了与操作系统的简单接口。</p>
<h5 id="有哪些属性" tabindex="-1"><a class="header-anchor" href="#有哪些属性" aria-hidden="true">#</a> 有哪些属性</h5>
<ul>
<li><code>pid</code>：进程编号</li>
<li><code>env</code>：系统环境变量</li>
<li><code>argv</code>：命令行执行此脚本时的输入参数</li>
<li><code>platform</code>：当前操作系统的平台</li>
</ul>
<blockquote>
<p>提示</p>
<p>可以在 Node REPL 中尝试一下这些对象。像上面说的那样进入 REPL（你的输出很有可能跟我的不一样）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ node
Welcome to Node.js v12.10.0.
Type <span class="token string">".help"</span> <span class="token keyword">for</span> <span class="token function">more</span> information.
<span class="token operator">></span> process.pid
<span class="token number">3</span>
<span class="token operator">></span> process.platform
<span class="token string">'darwin'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></blockquote>
<h4 id="buffer" tabindex="-1"><a class="header-anchor" href="#buffer" aria-hidden="true">#</a> Buffer</h4>
<p><code>Buffer</code> 全局对象让 JavaScript 也能够轻松地处理二进数据流，结合 Node 的流接口（Stream），能够实现高效的二进制文件处理</p>
<h4 id="filename-和-dirname" tabindex="-1"><a class="header-anchor" href="#filename-和-dirname" aria-hidden="true">#</a> <code>__filename</code> 和 <code>__dirname</code></h4>
<p>分别代表当前所运行 Node 脚本的文件路径和所在目录路径</p>
<h4 id="module-模块" tabindex="-1"><a class="header-anchor" href="#module-模块" aria-hidden="true">#</a> module 模块</h4>
<p>Node 实现了一个简单模块记在系统。在 Node 中，文件和模块是一一对应的关系，可以理解为一个文件就是一个模块。其模块系统的实现主要依赖于全局对象 module，其中实现了 exports（导出）、require（加载）机制</p>
<p>简单来说，commonJS 导出的是值的拷贝，而非值的引用，这与 <RouterLink to="/ES6/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3ES6%E6%A8%A1%E5%9D%97%E6%9C%BA%E5%88%B6.html">ES6中的模块化</RouterLink>是不一样的</p>
<p>具体可以跳转这里看 <RouterLink to="/Node%E4%B8%AD%E7%9A%84%E6%A8%A1%E5%9D%97%E6%9C%BA%E5%88%B6.html">Node中的模块机制</RouterLink></p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<p><a href="https://tuture.co/2019/12/03/892fa12/" target="_blank" rel="noopener noreferrer">一杯茶的时间，上手 Node.js<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/tuture-dev/nodejs-roadmap" target="_blank" rel="noopener noreferrer">Node.js 后端工程师学习路径<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/6844904029219192839" target="_blank" rel="noopener noreferrer">「万字整理 」这里有一份Node.js入门指南和实践,请注意查收<ExternalLinkIcon/></a></p>
<p><a href="https://mp.weixin.qq.com/s/wezc-VpKOXilEnsHvSuU9g" target="_blank" rel="noopener noreferrer">一篇文章构建你的 NodeJS 知识体系<ExternalLinkIcon/></a></p>
</template>
