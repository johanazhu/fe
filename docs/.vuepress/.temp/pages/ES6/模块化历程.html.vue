<template><h1 id="模块化历程" tabindex="-1"><a class="header-anchor" href="#模块化历程" aria-hidden="true">#</a> 模块化历程</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>在李录的《文明、现代化、价值投资与中国》里，他把人类的文明史分为三大跃升阶段：即1.0狩猎采集文明、2.0农业文明和3.0科技文明。针对 JavaScript 的模块化，笔者认为模块化历程也可类比为这样的历程。在前端页面不复杂的情况下，我们只需引入需要的库、js文件或模块，这就像“狩猎采集文明”时，饿了去打猎、摘果子一样，及时反馈，速度NO1；后来前端页面复杂起来，各路前辈将优秀的模块思维带入前端，有了各种模块化方案，这就好比农业文明时代，你需要按照一种规范或说标准来写，它有约束性，但能极高的解决1.0时代的缺点——依赖顺序。有代表性的库如CommonJS，RequireJS，SeaJS。再后来就是目前的3.0科技文明阶段，前端需要各种打包器来进行打包，它不再是简简单单的脚本文件，写几个文件就引用那么简单了，在这个阶段最出名是的webpack，也有gulp，rollup。当然现在还有vite和snowpack等。接下来让我们揭开模块化的历程，从历史演变来看清模块化的本质</p>
<h2 id="狩猎采集阶段——iife主导全球化" tabindex="-1"><a class="header-anchor" href="#狩猎采集阶段——iife主导全球化" aria-hidden="true">#</a> 狩猎采集阶段——IIFE主导全球化</h2>
<p>模块化解决的问题：</p>
<ul>
<li>
<p>命名冲突</p>
</li>
<li>
<p>文件依赖</p>
</li>
</ul>
<h4 id="commonjs" tabindex="-1"><a class="header-anchor" href="#commonjs" aria-hidden="true">#</a> CommonJS</h4>
<ol>
<li>模块可以i多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存</li>
<li>模块记载会阻塞接下来代码的执行，需要等到模块加载完成才能继续执行——同步加载</li>
</ol>
<p><strong>适用场景</strong>：服务器环境。nodejs 的模块规范是参考 commonJS 实现的</p>
<p><strong>用法：</strong></p>
<p>1.导入：require(&quot;路径&quot;)</p>
<p>2.导出：module.exports 和 exports</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// a.js</span>
<span class="token keyword">export</span><span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">"hello world"</span><span class="token punctuation">;</span> 

<span class="token comment">// b.js</span>
<span class="token keyword">var</span> moduleA <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a.js'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>moduleA<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// hello world</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>module.exports 和 exports 的区别是 exports 是 module.exports 的一个引用，详单与 Node 为每个模块提供一个 exports 变量，指向 module.exports。这相当于在模块顶部，有一行 var exports = module.exports 这样的命令</p>
<p>以上例子可以理解为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 默认执行 var exports = module.exports</span>
exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">'hello world'</span><span class="token punctuation">;</span> <span class="token comment">// 相当于：module.exports.a = 'hello world'</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="amd" tabindex="-1"><a class="header-anchor" href="#amd" aria-hidden="true">#</a> AMD</h4>
<p>1.异步加载</p>
<p>2.管理模块之间的依赖性，便于代码的编写和维护</p>
<p>适用场景：浏览器环境，requireJS 是参考AMD规范实现的</p>
<p>用法：</p>
<p>1.导入：require(['模块名称'], function())</p>
<p>因为Node ，有了CommonJS，所有大家有了想在浏览器端实现模块化的想法，这个时候分为三个分支，amd，cmd以及es6，amd的代表库是requirejs，cmd的代表是玉伯的seajs，后来es6才是集大成者。而玉伯的seajs是从requirejs中分离</p>
<p>无论是cmd还是amd都是浏览器上的规范，是为了想在浏览器端实现模块化而做的</p>
<p>为什么会有模块化</p>
<ul>
<li>网站正在变成 Web Apps</li>
<li>随着站点的扩大，代码的复杂性也在增加</li>
<li>需要高度解耦的JS文件/模块</li>
<li>部署需要几个HTTP调用中的优化代码</li>
</ul>
<p>最开始的模块</p>
<h4 id="从设计模块说起" tabindex="-1"><a class="header-anchor" href="#从设计模块说起" aria-hidden="true">#</a> 从设计模块说起</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>全局被污染，很容易命名冲突</p>
<h4 id="简单封装-命名空间模式" tabindex="-1"><a class="header-anchor" href="#简单封装-命名空间模式" aria-hidden="true">#</a> 简单封装：命名空间模式</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token constant">MYAPP</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">foo</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">bar</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token constant">MYAPP</span><span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>减少全局上的变量数</p>
<p>本质是对象，一点都不安全</p>
<h4 id="匿名闭包-iife-模块" tabindex="-1"><a class="header-anchor" href="#匿名闭包-iife-模块" aria-hidden="true">#</a> 匿名闭包：IIFE 模块</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Module <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   	<span class="token keyword">var</span> _private <span class="token operator">=</span> <span class="token string">'safe now'</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_private<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        foo<span class="token operator">:</span> foo
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

Module<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 私有变量</span>
Module<span class="token punctuation">.</span>_private<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>函数是 JavaScript 唯一的 Local Scope（作用域）</p>
<h4 id="再增强一点-引入依赖" tabindex="-1"><a class="header-anchor" href="#再增强一点-引入依赖" aria-hidden="true">#</a> 再增强一点：引入依赖</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Module <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">$</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _$body <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"body"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// we can use jQuery now!</span>
    <span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_$body<span class="token punctuation">)</span> <span class="token comment">// 特权方法</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        foo<span class="token operator">:</span> foo
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>jQuery<span class="token punctuation">)</span>

Module<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这就是模块模式，也是现代模块实现的基石</p>
<h3 id="石器时代——脚本加载器" tabindex="-1"><a class="header-anchor" href="#石器时代——脚本加载器" aria-hidden="true">#</a> 石器时代——脚本加载器</h3>
<p>只有封装性可不够，我们还需要加载</p>
<p>让我们回到脚本标签</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>body
	script(src="jquery.js")
	script(src="app.js") // do some $ thins...
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>顺序是根本</p>
<p>并行加载</p>
<p>DOM 顺序即执行顺序</p>
<p>但现实是这样的...</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>body
	script(src="zepto.js")
	script(src="jhash.js")
	script(src="fastClick.js")
	script(src="iScroll.js")
	script(src="underscore.js")
	script(src="handlebar.js")
	script(src="datacenter.js")
	script(src="deferred.js")
	script(src="util/wxbridge.js")
	script(src="util/login.js")
	script(src="util/date.js")
	script(src="app.js")
	...
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>难以维护</p>
<p>依赖模糊	不清楚的依赖关系</p>
<p>请求过多的 HTTP 调用</p>
<h4 id="labjs-脚本加载器" tabindex="-1"><a class="header-anchor" href="#labjs-脚本加载器" aria-hidden="true">#</a> LABjs-脚本加载器</h4>
<p>时间：2009年</p>
<p>作用：加载和阻止 JavaScript</p>
<p>效果：使用 LABjs 将取代所有难看的“脚本标签”</p>
<h5 id="它是怎么工作的" tabindex="-1"><a class="header-anchor" href="#它是怎么工作的" aria-hidden="true">#</a> 它是怎么工作的</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">script</span><span class="token punctuation">(</span>src<span class="token operator">=</span><span class="token string">"LAB.js"</span> async<span class="token punctuation">)</span>
$<span class="token constant">LAB</span><span class="token punctuation">.</span><span class="token function">script</span><span class="token punctuation">(</span><span class="token string">"framework.js"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token function">script</span><span class="token punctuation">(</span><span class="token string">"plugin.framework.js"</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token function">script</span><span class="token punctuation">(</span><span class="token string">"myplugin.framework.js"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">.</span><span class="token function">script</span><span class="token punctuation">(</span><span class="token string">"init.js"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>先到先得（执行顺序不重要）</p>
<h5 id="另外" tabindex="-1"><a class="header-anchor" href="#另外" aria-hidden="true">#</a> 另外</h5>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>$LAB
.script(["script1.js", "script2.js", "script3.js"])
.wait(function() { // wait for all scripts to execute first
	script1Func();
	script2Func();
	script3Func();
})
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>它基于文件的依赖管理</p>
<h3 id="蒸汽朋克——模块加载器" tabindex="-1"><a class="header-anchor" href="#蒸汽朋克——模块加载器" aria-hidden="true">#</a> 蒸汽朋克——模块加载器</h3>
<p>YUI3 Loader - Module Loader</p>
<p>2009</p>
<p>YUI 的轻量级内核和模块化体系结构使其具有可扩展性，快速性和鲁棒性</p>
<h4 id="写法" tabindex="-1"><a class="header-anchor" href="#写法" aria-hidden="true">#</a> 写法</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// YUI - 编写模块</span>
<span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"dom"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token constant">DOM</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// YUI - 使用模块</span>
<span class="token constant">YUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'dom'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token function">doSomeThing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token comment">// use some methods DOM attach to Y</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="创建自定义模块" tabindex="-1"><a class="header-anchor" href="#创建自定义模块" aria-hidden="true">#</a> 创建自定义模块</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// hello.js</span>
<span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>el<span class="token punctuation">,</span> <span class="token string">'innerHTML'</span><span class="token punctuation">,</span> <span class="token string">'Hello!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'3.0.0'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    requires<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'dom'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token constant">YUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token string">'hey yui loader'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>基于模块的依赖管理</p>
<h4 id="让我们再深入一下" tabindex="-1"><a class="header-anchor" href="#让我们再深入一下" aria-hidden="true">#</a> 让我们再深入一下</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Sandbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> modulex<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Sandbox<span class="token punctuation">.</span>modulex<span class="token punctuation">[</span>modules<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>YUI 其实是一个强沙箱</p>
<p>所有依赖模块通过 attach 的方式被注入沙盒</p>
<h4 id="但还是-脚本标签" tabindex="-1"><a class="header-anchor" href="#但还是-脚本标签" aria-hidden="true">#</a> 但还是”脚本标签“</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>script(src="/path/to/yui-min.js")
script(src="/path/to/my/module1.js")
script(src="/path/to/my/module2.js")
script(src="/path/to/my/module3.js")
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token constant">YUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'module1'</span><span class="token punctuation">,</span> <span class="token string">'module2'</span><span class="token punctuation">,</span> <span class="token string">'module3'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// you can use all this module now</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>你不必按照固定顺序写脚本写标签</p>
<p>加载与执行分离</p>
<h4 id="漏了一个问题" tabindex="-1"><a class="header-anchor" href="#漏了一个问题" aria-hidden="true">#</a> 漏了一个问题</h4>
<p>HTTP调用过多</p>
<h4 id="yui组合的工作原理" tabindex="-1"><a class="header-anchor" href="#yui组合的工作原理" aria-hidden="true">#</a> YUI组合的工作原理</h4>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>script(src="http://www.baidu.com/build/yui/yui-min.js")
script(src="http://www.baidu.com/build/dom/dom-min.js")
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>改造成</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">script</span><span class="token punctuation">(</span>src<span class="token operator">=</span>"http<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com<span class="token operator">/</span>combo<span class="token operator">?</span>
       build<span class="token operator">/</span>yui<span class="token operator">/</span>yui<span class="token operator">-</span>min<span class="token punctuation">.</span>js<span class="token operator">&amp;</span>
       build<span class="token operator">/</span>dom<span class="token operator">/</span>dom<span class="token operator">-</span>min<span class="token punctuation">.</span>js"<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在单个请求中处理多个文件</p>
<p>GET请求，需要服务器支持</p>
<p>以及</p>
<p>合并 concat</p>
<p>压缩 Minify</p>
<p>混淆 丑化</p>
<h3 id="commonjs-1" tabindex="-1"><a class="header-anchor" href="#commonjs-1" aria-hidden="true">#</a> CommonJS</h3>
<p>CommonJS</p>
<p>2009.08</p>
<p>不仅适用于浏览器</p>
<h5 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法：</h5>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// math.js</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">var</span> math <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./math.js'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>math<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="amd-cmd——浏览器环境预设方案" tabindex="-1"><a class="header-anchor" href="#amd-cmd——浏览器环境预设方案" aria-hidden="true">#</a> AMD / CMD——浏览器环境预设方案</h3>
<h4 id="amd-async-module-definition" tabindex="-1"><a class="header-anchor" href="#amd-async-module-definition" aria-hidden="true">#</a> AMD(Async Module Definition)</h4>
<p>RequireJS 对模块定义的规范化产出</p>
<p>CMD(Common Module Definition)</p>
<p>SeaJS 对模块定义的规范化产出</p>
<h3 id="browserify-gulp-webpack" tabindex="-1"><a class="header-anchor" href="#browserify-gulp-webpack" aria-hidden="true">#</a> browserify/gulp/webpack</h3>
<p>CommonJs in Browser</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g browserify
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>只需要写 CommonJs 的代码，用 browserify 帮你编译就好</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>browserify main.js -o bundle.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Browserify 分析 AST 的 require() 调用，以遍历项目的整个依赖关系图</p>
<h4 id="webpack-集大成者" tabindex="-1"><a class="header-anchor" href="#webpack-集大成者" aria-hidden="true">#</a> Webpack-集大成者</h4>
<p>几乎对任何资源或资产进行转换，捆绑或打包</p>
<h3 id="rollup" tabindex="-1"><a class="header-anchor" href="#rollup" aria-hidden="true">#</a> Rollup</h3>
<h3 id="es6-模块" tabindex="-1"><a class="header-anchor" href="#es6-模块" aria-hidden="true">#</a> ES6 模块</h3>
<p>用ES6的模块来写，然后用babel转移成低版本的 JavaScript 语法</p>
<h3 id="vite" tabindex="-1"><a class="header-anchor" href="#vite" aria-hidden="true">#</a> Vite</h3>
<p>我想说的就是模块化的发展啊</p>
<p>介绍模块化发展历程</p>
<p>IIFE(声明即执行的函数表达式)，特点：<strong>在一个单独的函数作用于中执行代码，避免变量冲突</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        data<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>AMD:</strong> 使用 requireJS 来编写模块化，特点：<strong>依赖必须提前声明好</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">'./index.js'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// code 就是index.Js 返回的内容</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>CMD:</strong> 使用 seaJS 来编写模块化，特点： <strong>支持动态引入依赖</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> moduke</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> indexCode <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./index.js'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>CommonJS:</strong>  nodejs 中自带的模块化</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>exports指向module.exports，即exports = model.exports</p>
<p><strong>UMD:</strong>  是AMD 和 CommonJS 的糅合，跨平台的解决方案</p>
<p><strong>ES Modules：</strong> ES6引入的模块化，支持import来引入另一个js</p>
<p>ES6模块与CommonJS模块的差异</p>
<p>CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用</p>
<p>CommonJS 模块是运行时加载，ES6 模块是编译时输出接口</p>
<p>https://github.com/mqyqingfeng/Blog/issues/108</p>
<p>js模块化规范总结</p>
<p>https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046624&amp;idx=1&amp;sn=5e148a4785b54730e3673ba709882a24&amp;chksm=87c419f0b0b390e61fc91695c663e27ed130c28e30307d4576c43023b4bf6964ef2f56645d61&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1576713268652&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd</p>
<p>javascript 模块化七日谈</p>
<p>http://huangxuan.me/js-module-7day/#/</p>
<p>玉伯 sea.js</p>
<p>https://github.com/seajs/seajs/issues/588</p>
<p>从 IIFE 聊到 Babel 都不深入了解前端模块化发展体系</p>
<p>https://juejin.im/post/5cb9e563f265da03712999e8</p>
<p>前端模块化的十年征程</p>
<p>https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651240309&amp;idx=1&amp;sn=b5a9ac499b00d402af528c15c1a301fb&amp;chksm=bd496ef18a3ee7e73448f0f65605aa5a27df947adca2cc201829915752a7748052e8c87f612d&amp;mpshare=1&amp;scene=1&amp;srcid=1019fyBTdQpkLsyYbQcol6Bk&amp;sharer_sharetime=1603066623304&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6&amp;key=b936ead840dca7f694fb75475df166150e813a5c4fa005b428552d5bb59dace7262a3b08891c13edc316a462bd0d5b6202433ca5fb04bba0d453e47f3b9706355205a0e7ba9a6bff4984a22d538f6bb9b7eafa9fe033f5129ebebfff4d9bcfe4592f28564660c311186df8b7cce8e3bd9740b74a283d38bf980dd9d5335bf3ae&amp;ascene=1&amp;uin=MTA0NTY0NDM2MQ%3D%3D&amp;devicetype=Windows+10+x64&amp;version=6300002f&amp;lang=zh_CN&amp;exportkey=AbGKawpaIdiHy5D4SiZMfP0%3D&amp;pass_ticket=c4InQddtubDqW9DvkTQK5NIlK76V2XF%2F0upCynHdACcXVxeZSvopDX%2FLpl580dSr&amp;wx_header=0</p>
<p>AMD和CMD最大的区别是对依赖模块的执行时机处理不同</p>
<p>AMD：依赖前置，提前执行</p>
<p>CMD：依赖就近，延迟执行</p>
<p>ESM（ES6 module）</p>
<p>export 只支持对象形式导出，不支持值的导出，export default命令用于指定模块的默认输出，只支持值导出，但是只能指定一个，本质上它就是输出一个叫做default的变量或方法</p>
<p>CommonJs 因为是同步执行，所以如果在浏览器上使用CommonJS，会引起浏览器的假死（卡住）</p>
<p>AMD规范是异步加载模块，允许指定回调函数，代表函数库：<code>require.js</code></p>
<p><code>require.js</code> 主要解决两个问题：</p>
<ul>
<li>异步加载模块</li>
<li>模块之间依赖模糊</li>
</ul>
<p>CMD是阿里的玉伯提出的，js 的函数为 <code>sea.js</code> 。它与 <code>require.js</code> 最主要的区别是实现了按需加载，推崇依赖就近原则，模块延迟执行</p>
<p>UMD 是 AMD 和 CommonJS 的综合产物</p>
<p>ifelse 的写法</p>
<p>ES6 的模块化，可以使用 <code>import</code> 关键字引入模块， 通过<code>export</code> 关键字导出模块</p>
<p>与 CommonJS 的差异</p>
<ul>
<li>CommonJS 模块输出的是一个值的拷贝， ES6模块输出的是值的引用</li>
<li>CommonJS 模块是运行时加载，ES6 模块是编译时输出接口</li>
</ul>
<p>https://mp.weixin.qq.com/s/y4A6Wc00fmdWRWmuj0ae5g</p>
<p>https://mmbiz.qpic.cn/sz_mmbiz_png/udZl15qqib0PhSBbWjiaibUzaBx1yGSG5BpY9hsFHkoXea8FKoCtD3x8yLibpQXojiabT4WbH7vslE94fMJ8icXricJzg/640?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1</p>
<h3 id="iife" tabindex="-1"><a class="header-anchor" href="#iife" aria-hidden="true">#</a> IIFE</h3>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">var</span> module1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> x <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">var</span> module2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">var</span> a <span class="token operator">=</span> module1<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span> b<span class="token operator">:</span> a <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>	
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>在ES6的模块化还没出来之前，一些库或者模块是通过 IIFE（立即执行函数）来实现的。关于IIFE，我们之前在 JavaScript 篇的 <RouterLink to="/JavaScript/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E7%9A%84%E9%AD%85%E5%8A%9B.html">立即执行函数的魅力</RouterLink> 中提到过</p>
<p>但用这种方式的缺点：扩展的模块无法共享原有模块的内部属性，还有模块本身常常依赖其他模块，模块模式无法实现这些依赖关系</p>
<p>缺点：</p>
<ul>
<li>随着项目扩展，html 文件中会包含大量的 script 标签</li>
<li>script 的依赖关系难以用 script 标签的先后顺序组织</li>
</ul>
<p>为了解决这个问题，出现了两个互相竞争的标准，即Asynchronous Module Definition（AMD）和 CommonJS</p>
<p>AMD和CommonJS是两个相互竞争的标准，均可以定义JavaScript模块。除了语法和原理的区别之外，主要的区别是AMD的设计理念是明确基于浏览器，而CommonJS的设计是面向通用JavaScript环境（如 Node.js服务端），而不局限于浏览器。</p>
<p>AMD 异步</p>
<p>CommonJS 同步</p>
<h3 id="amd-1" tabindex="-1"><a class="header-anchor" href="#amd-1" aria-hidden="true">#</a> AMD</h3>
<p>AMD可以很容易指定模块及依赖关系。同时，它支持浏览器。目前，AMD最流行的实现是 RequireJS（http://requirejs.org/）。</p>
<h4 id="使用姿势" tabindex="-1"><a class="header-anchor" href="#使用姿势" aria-hidden="true">#</a> 使用姿势</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'jquery'</span><span class="token punctuation">,</span> <span class="token string">'common'</span><span class="token punctuation">,</span> <span class="token string">'errorMsg'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">$<span class="token punctuation">,</span> common<span class="token punctuation">,</span> errorMsg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> <span class="token function-variable function">Home</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Home<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>RequireJS 声明一个模块是，必须指定所有的依赖项，这些依赖项会被当做形参传到 factory 中，对于依赖的模块会提前执行（在 RequireJS 2.0 也可以选择延迟执行），这被称为：依赖前置</p>
<p>但是这会带来说明问题呢？</p>
<p>加大了开发过程中的难度，无论是阅读之前的代码还是编写新的内容，会出现这样的情况：引入的另一个模块中的内容是条件性执行的</p>
<h3 id="cmd-common-module-definition-seajs" tabindex="-1"><a class="header-anchor" href="#cmd-common-module-definition-seajs" aria-hidden="true">#</a> CMD（Common Module Definition） &amp; SeaJS</h3>
<p>CMD 是除AMD以外的另外一种模块组织规范。CMD 即 Common Module Definition，意为“通用模块定义”。</p>
<p>针对 AMD 规范中可以优化的部分，<a href="https://github.com/cmdjs/specification/blob/master/draft/module.md" target="_blank" rel="noopener noreferrer">CMD 规范<ExternalLinkIcon/></a> 出现了，而 <a href="https://github.com/seajs/seajs" target="_blank" rel="noopener noreferrer">SeaJS<ExternalLinkIcon/></a> 则作为它的具体实现之一，与 AMD 十分相似：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// AMD 的一个例子，当然这是一种极端的情况</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"header"</span><span class="token punctuation">,</span> <span class="token string">"main"</span><span class="token punctuation">,</span> <span class="token string">"footer"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">header<span class="token punctuation">,</span> main<span class="token punctuation">,</span> footer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      header<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'new-title'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      main<span class="token punctuation">.</span><span class="token function">setMain</span><span class="token punctuation">(</span><span class="token string">'new-content'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      footer<span class="token punctuation">.</span><span class="token function">setFooter</span><span class="token punctuation">(</span><span class="token string">'new-footer'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 <span class="token comment">// 与之对应的 CMD 的写法</span>
<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> header <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./header'</span><span class="token punctuation">)</span>
      header<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">'new-title'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> main <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./main'</span><span class="token punctuation">)</span>
      main<span class="token punctuation">.</span><span class="token function">setMain</span><span class="token punctuation">(</span><span class="token string">'new-content'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> footer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./footer'</span><span class="token punctuation">)</span>
      footer<span class="token punctuation">.</span><span class="token function">setFooter</span><span class="token punctuation">(</span><span class="token string">'new-footer'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>AMD与CMD最大的区别：</p>
<p>一方面，在依赖的处理上</p>
<ul>
<li>AMD 推崇依赖前置，即通过依赖数组的方式提前声明当前模块的依赖</li>
<li>CMD 推崇依赖就近，在编译需要用到的时候通过调用require 方法动态引入</li>
</ul>
<p>另一方面，在本模块的对外输出上</p>
<ul>
<li>AMD 推崇通过返回值的方式对外输出</li>
<li>CMD 推崇通过给 module.exports 赋值的方式对外输出</li>
</ul>
<h3 id="amd-cmd背后的实现原理" tabindex="-1"><a class="header-anchor" href="#amd-cmd背后的实现原理" aria-hidden="true">#</a> AMD &amp;&amp; CMD背后的实现原理</h3>
<p>一种解决方 案是采用UMD（Universal Module Definition, https://github.com/umdjs/umd），这种模式的语法有点复杂，它同时支持 AMD和CommonJS。</p>
<h3 id="es6-模块-1" tabindex="-1"><a class="header-anchor" href="#es6-模块-1" aria-hidden="true">#</a> ES6 模块</h3>
<p>Babel 作为 ES6 官方指定的编译器</p>
<p>CommonJS 与 Sea.js</p>
<p>Sea.js 的初衷是为了让 ComoonJS Modules/1.1 的模块能运行在浏览器端，但由于浏览器和服务器的实质差异，实际上，无法达到，也没必要达到</p>
<p><img src="https://i.loli.net/2021/06/03/rNlbIdexRzf9W8V.png" alt="image-20210316161915559"></p>
<p>ESModule 系列（一）：演进</p>
<p>https://mp.weixin.qq.com/s/XmwfKLQrRlZ4z0niz5mLJg</p>
<p>浏览器中的 ESM</p>
<p>https://mp.weixin.qq.com/s/JZW6S6LLIOGrBGfbD173rQ</p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料：</h3>
<p><a href="https://huangxuan.me/js-module-7day/#/" target="_blank" rel="noopener noreferrer">JavaScript 模块化七日谈<ExternalLinkIcon/></a></p>
<p><a href="https://zhuanlan.zhihu.com/p/265632724" target="_blank" rel="noopener noreferrer">前端模块化的十年征程<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/seajs/seajs/issues/269" target="_blank" rel="noopener noreferrer">从 CommonJS 到 Sea.js<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/seajs/seajs/issues/588" target="_blank" rel="noopener noreferrer">前端模块化开发那点历史<ExternalLinkIcon/></a></p>
</template>
