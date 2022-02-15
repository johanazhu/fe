<template><h1 id="es6导航" tabindex="-1"><a class="header-anchor" href="#es6导航" aria-hidden="true">#</a> ES6导航</h1>
<p>其中大多数知识可以从 阮一峰先生的 E6 和 XXX 和 一个狠人的 和 你不知道的JAVASCRIPT 中获取知识，以下为本人的知识了解</p>
<h2 id="let和const" tabindex="-1"><a class="header-anchor" href="#let和const" aria-hidden="true">#</a> let和const</h2>
<p>默认使用const，只有当确实需要改变变量的值的时候才使用let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量的修改是很多 bug 的源头</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// bad</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">'bar'</span>

<span class="token comment">// good</span>
<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token string">'bar'</span>

<span class="token comment">// better </span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">'bar'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>let 和 const 引起块作用域。在ES6之前，只有两种作用域（全局作用域和函数作用域，eval作用域不算）。</p>
<p>let 和 const 不会引起变量提升，会有<strong>暂时性死区</strong></p>
<p>这个要说到代码执行过程，分两个阶段，</p>
<ul>
<li>代码预编译阶段</li>
<li>代码执行阶段</li>
</ul>
<p><strong>预编译阶段是前置阶段，这个时候由编译器将 JS 代码变异成可执行的代码</strong></p>
<p><strong>执行阶段主要任务是执行代码，执行上下文在这个阶段全部创建完成</strong>。</p>
<p>在通过语法分析，确认语法无误之后，JS 带啊在预编译阶段对变量的内存空间进行分配，我们熟悉的变量提升过程在此阶段完成。</p>
<p>预编译阶段应注意三点：</p>
<ul>
<li>预编译阶段进行变量声明；</li>
<li>预编译阶段变量声明进行提升，但值为 undefined；</li>
<li>预编译阶段所有非表达式的函数声明进行提升</li>
</ul>
<p>之前说到暂时性死区和“变量提升”有关，看以下代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span>
    <span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>会输出：<code>undefined</code> ，原因是变量 bar 在函数内进行了提升。相当于：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> bar
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span>
    bar <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这里多说一句，这是在预编译阶段执行的“伪代码”，当 foo() 执行时，就是第二阶段，执行代码</p>
<p>但在这里使用 let 声明时：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span>
    <span class="token keyword">let</span> bar <span class="token operator">=</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>会报错：Uncaught ReferenceError: bar is not defined。</p>
<p>我们知道使用<code>let</code> 或 <code>const</code> 声明变量，会针对这个变量形成一个封闭的块级作用域，在这个会计作用域当中，如果在声明变量钱访问该变量，就会报 <code>referenceError</code> 错误；如果在声明变量后访问，则可以正常获取变量值：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> bar <span class="token operator">=</span> <span class="token number">3</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>正常输出3。因此在相应花括号形成的作用域中，存在一个“死区”，起始于函数开头，终止与相关变量声明的一行。在这个范围内无法访问 let 或 const 声明的变量。这个“死区”的专业名称为：TDZ （Temporal Dead Zone）</p>
<h2 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串" aria-hidden="true">#</a> 模板字符串</h2>
<p>需要拼接字符串的时候尽量改成模板字符串：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// bad</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">'this is a'</span> <span class="token operator">+</span> example

<span class="token comment">// good</span>
<span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">this is a </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>example<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h3>
<p>​	箭头函数中的this，就是声明函数时所处上下文中的this，它不会被其他方式所改变</p>
<h3 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol" aria-hidden="true">#</a> Symbol</h3>
<h3 id="set-和-map" tabindex="-1"><a class="header-anchor" href="#set-和-map" aria-hidden="true">#</a> Set 和 Map</h3>
<h3 id="解构赋值" tabindex="-1"><a class="header-anchor" href="#解构赋值" aria-hidden="true">#</a> 解构赋值</h3>
<h3 id="展开运算符" tabindex="-1"><a class="header-anchor" href="#展开运算符" aria-hidden="true">#</a> 展开运算符</h3>
<p>​	使用...来表示展开运算符，它可以展开数组/对象</p>
<p>前言：</p>
<p>1.这里的“ES6”泛指 ES5 之后的新语法</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="http://www.alloyteam.com/2016/03/es6-front-end-developers-will-have-to-know-the-top-ten-properties/" target="_blank" rel="noopener noreferrer">前端开发者不得不知的 ES6 十大特性<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a9a3ccb24267c1d01960" target="_blank" rel="noopener noreferrer">老司机也会在闭包相关知识点翻车（上）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046817&amp;idx=1&amp;sn=ee4af07eed742d0df9dbad676c6f9e84&amp;chksm=87c418b1b0b391a79f27f3db6abc46c05fe8d993d98bb12e68823b96e92f34bfc84f21667e03&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1585194801642&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">ES6 你可能不知道的事 - 进阶篇<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844903959283367950" target="_blank" rel="noopener noreferrer">1.5万字概括ES6全部特性(已更新ES2020)<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844903726201700365" target="_blank" rel="noopener noreferrer">ES6 完全使用手册<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/yaDMqup7Ut_5ial4oAQBDA" target="_blank" rel="noopener noreferrer">ES6+ 的必考集合，你都会了吗？<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
