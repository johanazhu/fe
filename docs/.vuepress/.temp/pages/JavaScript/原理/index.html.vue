<template><h1 id="手写汇总导航" tabindex="-1"><a class="header-anchor" href="#手写汇总导航" aria-hidden="true">#</a> 手写汇总导航</h1>
<p><RouterLink to="/JavaScript/%E5%8E%9F%E7%90%86/%E6%8B%B7%E8%B4%9D%E7%9A%84%E7%A7%98%E5%AF%86.html">拷贝的秘密</RouterLink></p>
<p><a href="./%E6%A8%A1%E6%8B%9Fcall%E5%92%8Capply%E7%9A%84%E5%AE%9E%E7%8E%B0">模拟call和apply的实现</a></p>
<h2 id="手写-ajax" tabindex="-1"><a class="header-anchor" href="#手写-ajax" aria-hidden="true">#</a> 手写 ajax</h2>
<h2 id="手写-call" tabindex="-1"><a class="header-anchor" href="#手写-call" aria-hidden="true">#</a> 手写 call</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'zhang'</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token function">Person</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">'wang'</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span> <span class="token comment">// this指向obj</span>
<span class="token comment">// obj = {age:30,name:"wang"}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="手写apply" tabindex="-1"><a class="header-anchor" href="#手写apply" aria-hidden="true">#</a> 手写apply</h2>
<h2 id="手写-bind" tabindex="-1"><a class="header-anchor" href="#手写-bind" aria-hidden="true">#</a> 手写 bind</h2>
<h2 id="手写-new" tabindex="-1"><a class="header-anchor" href="#手写-new" aria-hidden="true">#</a> 手写 new</h2>
<p>1.新生成了一个对象</p>
<p>2.链接到原型</p>
<p>3.绑定 this</p>
<p>4.返回新对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 创建一个空的对象</span>
    <span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 获得构造函数</span>
    <span class="token keyword">let</span> Con <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
    <span class="token comment">// 链接到原型</span>
    obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Con</span><span class="token punctuation">.</span>prototype
    <span class="token comment">// 绑定 this，执行构造函数</span>
    <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">Con</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> arguments<span class="token punctuation">)</span>
    <span class="token comment">// 确保 new 出来是个对象</span>
    <span class="token keyword">return</span> <span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">?</span> result <span class="token operator">:</span> obj
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="手写-防抖" tabindex="-1"><a class="header-anchor" href="#手写-防抖" aria-hidden="true">#</a> 手写 防抖</h2>
<h2 id="手写-节流" tabindex="-1"><a class="header-anchor" href="#手写-节流" aria-hidden="true">#</a> 手写 节流</h2>
<p>https://segmentfault.com/a/1190000018257074</p>
<p>死磕 36 个 JS 手写题</p>
<p>https://mp.weixin.qq.com/s/Fra63OYWVN4_rQehTn6o7w</p>
</template>
