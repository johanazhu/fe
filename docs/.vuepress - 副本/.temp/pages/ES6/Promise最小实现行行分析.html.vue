<template><h1 id="promise最小实现行行分析" tabindex="-1"><a class="header-anchor" href="#promise最小实现行行分析" aria-hidden="true">#</a> Promise最小实现行行分析</h1>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<blockquote>
<p>莫要一口吃成大胖子，在这个物欲横流的社会，少反而是多</p>
</blockquote>
<h3 id="基本写法" tabindex="-1"><a class="header-anchor" href="#基本写法" aria-hidden="true">#</a> 基本写法</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> promise1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="最小实现" tabindex="-1"><a class="header-anchor" href="#最小实现" aria-hidden="true">#</a> 最小实现</h3>
<p>Promise中最重要的是 resolve 和 then</p>
<h4 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 模拟成功</span>
    <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token comment">// 执行回调函数数组中的所有函数</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">cb</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 当实例化时，直接执行传入的fn函数，并将resolve函数传入</span>
    <span class="token function">fn</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>回头看案例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'fn'</span><span class="token punctuation">)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><blockquote>
<p>注意：无论是 fn 还是 resolve 都是函数，因为在 JS 中函数也是对象，可以当作值来传递，所以这样的写法不奇怪</p>
</blockquote>
<p>我们的手写源码中有 <code>fn(resolve)</code> ，当 <code>new Promise(fn)</code> 时，我们就已经调用了 <code>fn</code> ，并把Promise 构造函数中的 resolve 传入。这里的例子中，执行顺序是：</p>
<ul>
<li>new Promise(fn)</li>
<li>执行fn函数，打印 fn</li>
<li>500毫秒后，执行 resolve(1)</li>
<li>this.data 赋值为 1，并执行 this.callbacks</li>
</ul>
<h4 id="then" tabindex="-1"><a class="header-anchor" href="#then" aria-hidden="true">#</a> then</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Promise</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">then</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">onResolved</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">onResolved</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>res <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>回到案例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> promise1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>

promise1<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>源码和案例对比着看，可以看出</p>
<ul>
<li>
<p>onResolved 是 then 方法中的回调函数</p>
</li>
<li>
<p>源码第一行 <code>return new Promise</code> ，返回一个新的 Promise 实例，为什么要返回一个新的呢，因为规定说 then 要链式调用，而且 then 中的如果没有实例，就继承用上一个 Promise 实例，也就是说规则如此，所以我们必须 返回一个新的 Promise 实例</p>
</li>
<li>
<p><code>return new Promise((resolve) =&gt; {...})</code> 其实就和上文说的 fn 是一个味道，即执行 fn 函数，这个 fn 函数中，向 this.callbacks 数组push 匿名函数() =&gt; {const res = ...}</p>
</li>
<li>
<p>当resolve(2)时，执行 this.callbacks 函数组成的数组。</p>
</li>
<li>
<p>如果 promise1.then() 执行后的值返回的是 promise，那么就让新的 Promise 实例再 then</p>
</li>
<li>
<p>如果是个普通值，那就执行 resolve(res)，依次执行callbacks 里的函数</p>
</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.cn/post/6844904094079926286" target="_blank" rel="noopener noreferrer">最简实现Promise，支持异步链式调用（20行）<ExternalLinkIcon/></a></li>
</ul>
</template>
