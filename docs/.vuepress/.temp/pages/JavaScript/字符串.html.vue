<template><h1 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h1>
<h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2>
<p>String()构造函数用于创建字符串对象和字符串原始值</p>
<h2 id="属性和方法" tabindex="-1"><a class="header-anchor" href="#属性和方法" aria-hidden="true">#</a> 属性和方法</h2>
<p>字符串对象具有以下属性和方法（不包括继承的属性和方法）</p>
<h3 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> <strong>属性</strong></h3>
<ul>
<li>prototype</li>
</ul>
<h3 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> <strong>方法</strong></h3>
<ul>
<li>froCharCode()</li>
</ul>
<h2 id="实例属性和方法" tabindex="-1"><a class="header-anchor" href="#实例属性和方法" aria-hidden="true">#</a> 实例属性和方法</h2>
<h3 id="实例属性" tabindex="-1"><a class="header-anchor" href="#实例属性" aria-hidden="true">#</a> <strong>实例属性</strong></h3>
<ul>
<li>constructor</li>
<li>length</li>
</ul>
<h3 id="实例方法" tabindex="-1"><a class="header-anchor" href="#实例方法" aria-hidden="true">#</a> <strong>实例方法</strong></h3>
<ul>
<li>
<p>slice()</p>
<ul>
<li>
<p><code>slice()</code> 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'The quick brown fox jumps over the lazy dog.'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// the lazy dog.</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// quick brown fox</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ul>
</li>
<li>
<p>substr()</p>
<ul>
<li>
<p><code>substr()</code> 方法返回一个字符串中从指定位置开始到指定字符串的字符</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'abcdefghig'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"(1,2): "</span>    <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// (1,2): bc</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"(1): "</span>      <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>PS: 未来可能会被移除掉，如果可以的花，使用 <code>substring()</code> 代替它</p>
</li>
</ul>
</li>
<li>
<p>substring()</p>
<ul>
<li>
<p><code>substring()</code> 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引知道字符串的末尾的一个子集</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> anyString <span class="token operator">=</span> <span class="token string">'Mozilla'</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>anyString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Moz</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>anyString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Moz</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
</li>
<li>
<p>concat()</p>
<ul>
<li>
<p><code>concat()</code> 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hello <span class="token operator">=</span> <span class="token string">'Hello, '</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>hello<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">'Kevin'</span><span class="token punctuation">,</span> <span class="token string">' have a nice day'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// Hello, Kevin have a nice day</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ul>
</li>
<li>
<p>indexOf()</p>
<ul>
<li>
<p><code>indexOf</code> 方法返回调用它的 <code>String</code> 对象中第一次出现的指定值的索引，从 <code>fromIndex</code> 处进行搜索。如果未找到该值，则返回 -1 。</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> question <span class="token operator">=</span> <span class="token string">'How Are You'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>question<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'A'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 4</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>question<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'B'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// -1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
</li>
<li>
<p>replace()</p>
<ul>
<li>
<p><code>replace()</code> 方法返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以使一个字符串或者一个正则表达式，替换值可以使一个字符串或者一个每次匹配都要调用的回调函数。</p>
</li>
<li>
<p>原字符串不会改变</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'OK, I am fine'</span>
<span class="token keyword">const</span> newStr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">I</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span> <span class="token string">'Johan'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newStr<span class="token punctuation">)</span> <span class="token comment">//  "OK, Johan am fine"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
</li>
<li>
<p>toString()</p>
<ul>
<li>
<p><code>toString()</code> 方法返回指定对象的字符串形式</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>toString<span class="token punctuation">)</span> <span class="token comment">// Hello World</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ul>
</li>
<li>
<p>valueOf()</p>
<ul>
<li>
<p><code>valueOf()</code> 方法返回 <code>String</code> 对象的原始值</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> stringObj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringObj<span class="token punctuation">)</span> <span class="token comment">// String { 'foo' }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stringObj<span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// foo</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
</li>
<li>
<p>charAt()</p>
<ul>
<li>
<p><code>charAt()</code> 方法从一个字符串中返回指定的字符</p>
</li>
<li>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> anyString <span class="token operator">=</span> <span class="token string">"Brave new world"</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"The character at index 0   is '"</span> <span class="token operator">+</span> anyString<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>   <span class="token operator">+</span> <span class="token string">"'"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//The character at index 0 is 'B'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
</ul>
</li>
<li>
<p>charCodeAt()</p>
</li>
<li>
<p>lastIndexOf()</p>
</li>
<li>
<p>localeCompare()</p>
</li>
<li>
<p>match()</p>
</li>
<li>
<p>quote()</p>
</li>
<li>
<p>search()</p>
</li>
<li>
<p>toLocaleLowerCase()</p>
</li>
<li>
<p>toLocaleUpperCase()</p>
</li>
<li>
<p>toLowerCase()</p>
</li>
<li>
<p>toUpperCase()</p>
</li>
</ul>
</template>
