<template><h1 id="node中的模块机制" tabindex="-1"><a class="header-anchor" href="#node中的模块机制" aria-hidden="true">#</a> Node中的模块机制</h1>
<p>之前没有模块化</p>
<p>模块化的历程</p>
<p>简单来说：</p>
<p>IIFE——CommonJS——AMD/CMD——ES6模块...</p>
<h3 id="什么是-node-模块" tabindex="-1"><a class="header-anchor" href="#什么是-node-模块" aria-hidden="true">#</a> 什么是 Node 模块</h3>
<p>在正是分析 Node 模块机制之前，我们需要明确定义什么是 Node 模块。通常来说，Node 模块可分为两大类：</p>
<ul>
<li>核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成二进制可执行文件</li>
<li>文件模块：用户编写的模块，可以是自己写的，也可以使通过 npm 安全的</li>
</ul>
<p>exports 对象本质上是 module.exports 的引用。也就是说，下面两行代码是等价的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 导出 add 函数</span>
exports<span class="token punctuation">.</span>add <span class="token operator">=</span> add<span class="token punctuation">;</span>

<span class="token comment">// 和上面一行代码是一样的</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>add <span class="token operator">=</span> add<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>module 对象</p>
<p>module 在每个模块中表示对当前模块的引用。而 module.exports 又可以通过全局对象 exports 来引用。module 并不是一个全局对象，而更像一个模块内部对象</p>
<h5 id="module-children" tabindex="-1"><a class="header-anchor" href="#module-children" aria-hidden="true">#</a> module.children</h5>
<p>这个模块引入的所有模块对象</p>
<h5 id="module-exports" tabindex="-1"><a class="header-anchor" href="#module-exports" aria-hidden="true">#</a> module.exports</h5>
<p>module.exports 通过模块系统创建。</p>
<h2 id="export-与-module-export-的区别" tabindex="-1"><a class="header-anchor" href="#export-与-module-export-的区别" aria-hidden="true">#</a> export 与 module.export 的区别</h2>
<p>导出多个成员（必须在对象中）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">123</span>
exports<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token string">'hello'</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'ccc'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
exports<span class="token punctuation">.</span>d <span class="token operator">=</span> <span class="token punctuation">{</span>
	foo<span class="token operator">:</span> <span class="token string">'bar'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>导出多个成员也可以这样写</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">add</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'aa'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>导出单个成员（拿到的就是：函数，字符串）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token string">'hello'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>以下情况会覆盖：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token string">'hello'</span>

<span class="token comment">// 以这个为准，后者会覆盖前者</span>
module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
exports 是 module<span class="token punctuation">.</span>exports 的一个引用

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>exports <span class="token operator">===</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">)</span> <span class="token comment">// => true</span>

exports<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'bar'</span>

<span class="token comment">// 等价于</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'bar'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://tuture.co/2019/12/03/892fa12/" target="_blank" rel="noopener noreferrer">一杯茶的时间，上手 Node.js<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844904029219192839" target="_blank" rel="noopener noreferrer">「万字整理 」这里有一份Node.js入门指南和实践,请注意查收<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&amp;mid=2247483885&amp;idx=1&amp;sn=eb4dd408d58774dc1587f0d6705eb8a2&amp;chksm=e9537fb5de24f6a310a36b8d46623ec534a94a5ff09d7deb6191124e14c39b0667ef465059e4&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1575817441587&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">Node.js 模块系统源码探微<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000014434944" target="_blank" rel="noopener noreferrer">require和import的区别是什么？看这个你就懂了<ExternalLinkIcon/></a></li>
</ul>
</template>
