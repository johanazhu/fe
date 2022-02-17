<template><h1 id="javascript由什么组成" tabindex="-1"><a class="header-anchor" href="#javascript由什么组成" aria-hidden="true">#</a> JavaScript由什么组成</h1>
<p>​		这个一个基础结构问题，一个完整的 JavaScript 包括：ECMAScript 、文档对象模型（DOM）、浏览器对象模型（BOM），本章正是研究的 ECMAScript 。如果对 DOM 感兴趣，请移步—— DOM 。如果对 BOM 感兴趣，请移步—— BOM 。</p>
<p>​		ECMAScript规定这门语言由一下组成部分：</p>
<p>​			<strong>1.语法</strong></p>
<p>​			<strong>2.变量和数据类型</strong></p>
<p>​			<strong>3.关键字和保留字</strong></p>
<p>​			<strong>4.操作符</strong></p>
<p>​			<strong>5.语句</strong></p>
<p>​			<strong>6.对象</strong></p>
<p>​		也就是说，这六大模块组成了这门语言，就好比你学习英语，要掌握基本的单词和语法，才能说出一口流利的英语。</p>
<p>​		这六大支柱中，像语法、变量和数据类型、关键字和保留字、操作符、语句都是极好理解的，但是对象却让很多人绝望，对象毕竟是学习JavaScript最重要的知识。因为 JavaScript 一切皆对象。</p>
<p>​</p>
<h2 id="javascript的数据类型" tabindex="-1"><a class="header-anchor" href="#javascript的数据类型" aria-hidden="true">#</a> JavaScript的数据类型</h2>
<p>​		<strong>数据类型分为 基本类型 和 引用类型。</strong></p>
<p>​		基本类型在不同的书中叫法不同，当然引用类型的叫法也不同（复杂类型）。</p>
<p>​		基本类型包含 <code>undefined类型</code>、<code>Null类型</code>、<code>String类型</code>、<code>Number类型</code>、<code>Boolean类型</code>、<code>Symbol类型</code></p>
<p>​		引用类型是一种数据结构，在别的语言中被称为类，但是在 JavaScript 中实际上没有类（基于原型链继承Object）。原生的引用类型有 <code>Object</code> 、<code>Function</code>、<code>Array</code> 、<code>Date</code>、<code>RegExp</code>、<code>Error</code></p>
<p>​	<img src="@source/.vuepress/public/images/JavaScript/数据类型分类.png" alt="数据类型分类"></p>
<p>​		JavaScript内置了一些构造函数和对象，详情的可以到 MDN（ <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures" target="_blank" rel="noopener noreferrer">JavaScript的内置函数<ExternalLinkIcon/></a> ）上看一眼，其最主要的九个原生对象构造函数：</p>
<ul>
<li><strong>String()</strong></li>
<li><strong>Number()</strong></li>
<li><strong>Boolean()</strong></li>
<li><strong>Object()</strong></li>
<li><strong>Array()</strong></li>
<li><strong>Function()</strong></li>
<li><strong>Date()</strong></li>
<li><strong>RegExp()</strong></li>
<li><strong>Error()</strong></li>
</ul>
<p>两个比较重要的对象：</p>
<ul>
<li><strong>Math</strong></li>
<li><strong>JSON</strong></li>
</ul>
<p>以上就是ECMAScript中最重要的东西。</p>
<p>注意：JavaScript内置对象有很多，具体参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects" target="_blank" rel="noopener noreferrer">这篇<ExternalLinkIcon/></a></p>
<p>我们可以看一下以下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> string1 <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> string2 <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> number1 <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> number2 <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> boolean1 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> boolean2 <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> string1<span class="token punctuation">,</span> <span class="token keyword">typeof</span> string2<span class="token punctuation">)</span>		<span class="token comment">// 输出 'string, string'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> number1<span class="token punctuation">,</span> <span class="token keyword">typeof</span> number2<span class="token punctuation">)</span> 	<span class="token comment">// 输出 'number, number'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> boolean1<span class="token punctuation">,</span> <span class="token keyword">typeof</span> boolean2<span class="token punctuation">)</span>	<span class="token comment">// 输出 'boolean, boolean'</span>

<span class="token comment">// 如果使用创建对象的构造函数和new关键字</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'male'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myNumber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBoolean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myString<span class="token punctuation">,</span> <span class="token keyword">typeof</span> myNumber<span class="token punctuation">,</span> <span class="token keyword">typeof</span> myBoolean<span class="token punctuation">)</span>
<span class="token comment">// object, object, object</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>我们看到如果使用字面量语法创建值，<strong>那么值类型的输出结果就是值类型</strong>；</p>
<p>如果使用 new 关键字创建 String()、Number()、Boolean() 值时，<strong>创建的对象实际上是一个复杂对象</strong>。</p>
<p>这说明 new 关键字 做了一些手脚，至于它是怎么改变三个小兄弟的，可以跳转到——这里[ new 改变了对象 ]</p>
<h2 id="typeof-操作符" tabindex="-1"><a class="header-anchor" href="#typeof-操作符" aria-hidden="true">#</a> typeof 操作符</h2>
<p>作用：返回正在使用的值的类型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 基本类型/值类型/原始值/原始类型	叫法不同意思一致</span>
<span class="token keyword">var</span> null1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> undefined1 <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> string1 <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> number1 <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> boolean1 <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> symbol1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> null1<span class="token punctuation">)</span> <span class="token comment">// object, 需要注意</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> undefined1<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> string1<span class="token punctuation">)</span> <span class="token comment">// string</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> number1<span class="token punctuation">)</span> <span class="token comment">// number</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> boolean1<span class="token punctuation">)</span> <span class="token comment">// boolean</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> symbol1<span class="token punctuation">)</span> <span class="token comment">// symbol</span>

<span class="token comment">// 引用类型/复杂值</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'male'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myNumber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBoolean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myFunction <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">'x'</span><span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">,</span> <span class="token string">'return x * y'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myRegExp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'\\bt[a-z]+\\b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myError <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myString<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myNumber<span class="token punctuation">)</span> 	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myBoolean<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myObject<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myArray<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myFunction<span class="token punctuation">)</span>	<span class="token comment">// 输出 function 需要注意</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myDate<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myRegExp<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> myError<span class="token punctuation">)</span>	<span class="token comment">// 输出 object</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>通过 <code>typeof</code> 操作符能判断出使用的值的类型。需要注意的有两个，</p>
<p>一是 <code>null</code> , 返回object</p>
<p>二是 new Function，返回的是 function</p>
<p>至于为什么？挖个坑，等有时间在研究</p>
<p>随便一说，这也是我们看很多源码或者自己写代码时常用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token constant">XXX</span> <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果XXX是function的话做什么操作</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><blockquote>
<p>PS: 在《JavaScript启示录》里第一章第八节里说 RegExp() 的类型返回的是 function，但是我检验后发现并不是，我猜测是因为老版本的浏览器对RegExp的判断为 funtion，而我用的chrome浏览器（V8引擎）表示 RegExp的类型为object</p>
</blockquote>
<h2 id="基本类型和引用类型的区别" tabindex="-1"><a class="header-anchor" href="#基本类型和引用类型的区别" aria-hidden="true">#</a> 基本类型和引用类型的区别</h2>
<p><strong>基本类型储存在栈内存中</strong></p>
<p><strong>引用类型储存堆内存中</strong></p>
<p>基本类型所花的内存小，所以可以直接拷贝</p>
<p>引用类型所花的内存大，所以是地址引用</p>
<p><img src="@source/.vuepress/public/images/JavaScript/类型存储.png" alt="类型存储"></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 案例1</span>
<span class="token keyword">var</span> string1 <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> string2 <span class="token operator">=</span> string1<span class="token punctuation">;</span>
string1 <span class="token operator">=</span> <span class="token string">"bar"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>string1<span class="token punctuation">,</span> string2<span class="token punctuation">)</span> <span class="token comment">// 输出 bar, foo</span>

<span class="token comment">// 案例2</span>
<span class="token keyword">var</span> object1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'johan'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">23</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> object2 <span class="token operator">=</span> object1<span class="token punctuation">;</span>
object1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'elaine'</span><span class="token punctuation">;</span>
object2<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">22</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>object1<span class="token punctuation">,</span> object2<span class="token punctuation">)</span> 
<span class="token comment">// 输出 { name: 'elaine', age: 23 } { name: 'elaine', age: 23 }  </span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>因为基本类型（值类型）是存放在栈内存中，string1赋值给string2后，相当于开了一个独立空间给string2，string1和string2是完全独立的两个个体，再给string1赋值什么，都与string2无关。</p>
<p>而引用类型（复杂类型）之所以叫引用类型（在学术上叫复杂类型或复杂值），因为对象的地址是引用的，Object可以一直嵌套，Function也可以嵌套很多很多层（回调函数），Array可以变花样的做出三维数组之类，总之，对象可以弄的很大。弄得越大，就越占内存，如果一个很大的值随意复制，那对使用者来说就是灾难（不知不觉中就占了很大的内存）。所以它不可能随意复制，而是用指针的方式来将对象指向同一个地址（这里可以衍生到浅拷贝和深拷贝）</p>
<p>当你创建一个object1，就在堆内存中开辟一个内存。如果你赋值给object2，其实就是把object1指向堆内存的地址复制给object2，它们指向的是同一个地址。再在object1或者object2做修改的话，相当于在堆内存上做修改，无论object1修改还是object2修改都会改变</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> obj2 <span class="token operator">=</span> obj1<span class="token punctuation">;</span>
obj1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'elaine'</span><span class="token punctuation">;</span>
obj2<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">23</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span> <span class="token comment">// { name: 'elaine', age: 22};</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span> <span class="token comment">// { name: 'elaine', age: 22};</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>虽然说 JavaScript 的动态性很是方便，但是如果一些新手修改了object中的值而为告知，那么就是灾难。因为 动态性+全局作用域，所有变量命名就成了问题，所以一般的库都是用匿名函数的方式来 执行代码，再后面就有了 模块化的概念，其本质是为了解决 变量命名的问题</p>
<p>光知道JavaScript的数据类型不够，我们需要准确定位每一个变量是什么数据类型才行。</p>
<p>判断数据类型的方式常见的有三种</p>
<ul>
<li>使用 typeof</li>
<li>使用 instanceof</li>
<li>使用 constructor</li>
<li>使用 Object.prototype.toString.call()</li>
</ul>
<p>在 typeof 操作符中已经谈过，typeof 可以检测出 string、number、boolean、undefined以及 function，而对于 null 和 对象则无法检测，显示 object</p>
<h3 id="instanceof-运算符" tabindex="-1"><a class="header-anchor" href="#instanceof-运算符" aria-hidden="true">#</a> instanceof 运算符</h3>
<p><code>instanceof </code> 运算符用于检测构造函数的 <code>prototype</code> 属性是否出现在某个实例对象的原型链上</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> elaine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">'elaine'</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elaine <span class="token keyword">instanceof</span> <span class="token class-name">People</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elaine <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>instanceof 运算符能让我们找到他的爸爸是谁（谁制造了他，从生理上讲应该是妈妈是谁），以及他的祖宗十八代</p>
<h3 id="constructor-构造器" tabindex="-1"><a class="header-anchor" href="#constructor-构造器" aria-hidden="true">#</a> constructor 构造器</h3>
<p><code>constructor</code> 是一种用于创建和初始化 <code>class</code> 创建的对象的特殊方法。请注意，他是方法。就好比</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>不要因为单词陌生误以为它是属性</p>
<p>语法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>arguments<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里多说一句，常看见 React 中有这样表达式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这里的意思很明白，<code>HelloWorld</code> 组件继承了 <code>React.Component</code> 组件，<code>constructor（props）</code> 意味着调用了父类的构造函数，并将 props 传递给 HelloWorld，使用 <code>super</code> 是因为 在派生类中，必须调用 <code>super</code> 才能使用 <code>this</code></p>
<p>说完题外话，我们继续来看 <code>constructor</code> 能检验数据类型吗？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 借typeof中的例子，直接打印看效果</span>
<span class="token comment">// 基本类型</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>null1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Cannot read property 'constructor' of null</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>undefined1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Cannot read property 'constructor' of undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>string1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// String() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>number1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Number() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>boolean1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Boolean() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>symbol1<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Symbol() { [native code] }</span>
<span class="token comment">// 引用类型</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myString<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// String() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myNumber<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Number() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myBoolean<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Boolean() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Object() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myArray<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Array() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myFunction<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Function() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myDate<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Date() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myRegExp<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// RegExp() { [native code] }</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myError<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Error() { [native code] }</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>综上所述，constructor 对 underfined 和 null 无效。其实除此之外， constructor 的指针是可以改变的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Student</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> student <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>student<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// Person() {}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>具体我们在 原型链 那章做详细介绍</p>
<h3 id="object-prototype-tostring-call-source" tabindex="-1"><a class="header-anchor" href="#object-prototype-tostring-call-source" aria-hidden="true">#</a> Object.prototype.toString.call(source)</h3>
<p><code>toString()</code> 方法返回一个表示该对象的字符串</p>
<p>每个对象都有一个<code>toString()</code> 方法（继承自Object）。</p>
<p>用它能真正做到对类型的检测</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 继续引用上述例子</span>
<span class="token comment">// 基本类型</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>null1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Null]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>undefined1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Undefined]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>string1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object String]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>number1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Number]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>boolean1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Boolean]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>symbol1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Symbol]</span>
<span class="token comment">// 引用类型</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myString<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object String]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myNumber<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Number]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myBoolean<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Boolean]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myObject<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Object]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myArray<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Array]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myFunction<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Function]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myDate<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Date]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myRegExp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object RegExp]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myError<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//[object Error]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>我们可以看到它返回 [object  NativeConstructorName] 格式的字符串，它能清晰的判断我们所需要的原生构造函数，同样，它的缺点是不能检测非原生构造函数。</p>
<p>在jquery中的$.type() 是内部的原理用的就是 Object.prototype.toString.call()，让我们手写一个类型判断的小小工具库吧</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isType</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">"[object Null]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'null'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Undefined]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'undefined'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object String]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'string'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Number]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'number'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Boolean]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'boolean'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Object]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'object'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Array]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'array'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Function]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'function'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Date]"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> <span class="token string">'date'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object RegExp]"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token string">'regexp'</span><span class="token punctuation">;</span>
        <span class="token keyword">case</span> <span class="token string">"[object Error]"</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token string">'error'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>这一节我们讲了 JavaSript由那些组成，从语言上分它包括语法，变量和数据类型，关键字和保留字，操作符，语句，对象。从数据类型上分，它分为基本类型（简单类型/值类型）和引用类型（复杂类型）。基本类型由数字、字符串、布尔值（true|false）、null值、undefined值、Symbol（唯一值）。其他的所有制都是对象（引用类型基于对象）。而且，数字、字符串和布尔值“貌似”对象，因为他们拥有方法，但他们是不可变的。</p>
<p>我们还知道可以通过四种方式来判断数据类型，但有优缺点</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>能检测</th>
<th>不能检测</th>
</tr>
</thead>
<tbody>
<tr>
<td>typeof</td>
<td>string、number、boolean、undefined以及 function</td>
<td>null以及除function外的对象，结果都为 object</td>
</tr>
<tr>
<td>constructor</td>
<td>string、number、boolean、array、object、function 以及 构造函数</td>
<td>undefined、null。不安全，因为 指向可以改变</td>
</tr>
<tr>
<td>instanceof</td>
<td>准确地判断复杂引用数据类型</td>
<td>不能正确判断基础数据类型</td>
</tr>
<tr>
<td>Object.prototype.toString()</td>
<td>内置构造函数函数</td>
<td>构造函数</td>
</tr>
</tbody>
</table>
<p>我们知道</p>
<p>下一节，我们讲走进对象的世界，看看JavaScript中最大的王</p>
</template>
