<template><h1 id="instanceof——找祖籍" tabindex="-1"><a class="header-anchor" href="#instanceof——找祖籍" aria-hidden="true">#</a> instanceof——找祖籍</h1>
<h3 id="什么是-instanceof" tabindex="-1"><a class="header-anchor" href="#什么是-instanceof" aria-hidden="true">#</a> 什么是 instanceof？</h3>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof" target="_blank" rel="noopener noreferrer">MAN<ExternalLinkIcon/></a>的解释是：</p>
<blockquote>
<p>instanceof 运算符 用于检测构造函数的 <code>prototype</code> 属性是否出现在某个<strong>实例对象</strong>的原型链上</p>
</blockquote>
<p>由此可知，instanceof 的左侧必须是对象，才能找到它的原型链</p>
<p>instanceof 右侧必须是函数，函数才会有 prototype 属性</p>
<p>例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Resume</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> hobby</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hobby <span class="token operator">=</span> hobby<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> johan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Resume</span><span class="token punctuation">(</span><span class="token string">'johan'</span><span class="token punctuation">,</span> <span class="token string">'18'</span><span class="token punctuation">,</span> <span class="token string">'swim'</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>johan <span class="token keyword">instanceof</span> <span class="token class-name">Resume</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>johan <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h3>
<p>粗暴一点讲，左边为实例，不是由右边 new 出来，就是右边的原型 new 出来（在其原型链上）</p>
<p>ps：如果对原型以及原型链不太了解，可以看看这篇 <RouterLink to="/JavaScript/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E5%8E%9F%E5%9E%8B%E9%93%BE.html">原型与原型链</RouterLink></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第一版</span>
<span class="token keyword">function</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> right<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myInstanceof</span><span class="token punctuation">(</span>johan<span class="token punctuation">,</span> Resume<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myInstanceof</span><span class="token punctuation">(</span>johan<span class="token punctuation">,</span> Object<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>第一版我们实现了 left 是 谁 new 出来的，但这还不够，<code>myInstanceof</code> 还要检测 left 是否在 right 的原型链上。所以我们要递归 <code>left.__proto__</code> 。直到原型链的最深一层 null</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第二版</span>
<span class="token keyword">function</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> right<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>__proto__<span class="token punctuation">,</span> right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="考虑它是基本类型" tabindex="-1"><a class="header-anchor" href="#考虑它是基本类型" aria-hidden="true">#</a> 考虑它是基本类型</h3>
<p>在一开始就说了，instanceof 的左侧必须是对象，这样才能找到它的原型链</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myInstanceof</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> Number<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num <span class="token keyword">instanceof</span> <span class="token class-name">Number</span><span class="token punctuation">)</span>  <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>所以我们要增加对基本类型的判断</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> left <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">||</span> left <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> right<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> left<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>__proto__<span class="token punctuation">,</span> right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="看看别人家的-instanceof-实现" tabindex="-1"><a class="header-anchor" href="#看看别人家的-instanceof-实现" aria-hidden="true">#</a> 看看别人家的 instanceof 实现</h3>
<p>神三元</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myInstanceof</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 基本数据类型直接返回 false</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> left <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">||</span> left <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token comment">// getPrototype是Object对象自带的一个方法，等效于__proto__</span>
    <span class="token keyword">let</span> proto <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 循环往下寻找，知道找到相同的对象</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>proto <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token comment">// 找到相同的原型对象</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>proto <span class="token operator">==</span> right<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>
        proto <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>proto<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>while 的用法比俺高级多了</p>
<p>下一章，我们讲讲 new ，其实 new 就是生儿子，与 instanceof 找祖籍有一点关联</p>
</template>
