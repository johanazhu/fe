<template><h2 id="重学前端学习" tabindex="-1"><a class="header-anchor" href="#重学前端学习" aria-hidden="true">#</a> 重学前端学习</h2>
<h3 id="建立知识架构" tabindex="-1"><a class="header-anchor" href="#建立知识架构" aria-hidden="true">#</a> 建立知识架构</h3>
<p>前端知识结构</p>
<ul>
<li>文法
<ul>
<li>词法</li>
<li>语法</li>
</ul>
</li>
<li>语义</li>
<li>运行时
<ul>
<li>类型</li>
<li>执行过程</li>
</ul>
</li>
</ul>
<p>“用规定的文法，去表达特定语义，最终操作运行时”</p>
<p><strong>程序 = 算法 + 数据结构</strong></p>
<p><strong>对运行时来说，类型就是数据结构，执行过程就是算法</strong></p>
<p>词法中有各种直接量、关键字、运算符，语法和语义则是表达式、语句、函数、对象、模块，类型则包含了对象、数字、字符串等......</p>
<h3 id="_05-javascript类型-关于类型-有哪些你不知道的细节" tabindex="-1"><a class="header-anchor" href="#_05-javascript类型-关于类型-有哪些你不知道的细节" aria-hidden="true">#</a> 05-JavaScript类型：关于类型，有哪些你不知道的细节</h3>
<p>问题：</p>
<ul>
<li>为什么有的编程规范要求用void 0代替undefined？</li>
<li>字符串有最大长度吗？</li>
<li>0.1 + 0.2不是等于0.3么？为什么JavaScript里不是这样的？</li>
<li>ES6新加入的Symbol是个什么东西？</li>
<li>为什么给对象添加的方法能用在基本类型上？</li>
</ul>
<blockquote>
<p>运行时类型是代码实际执行过程中我们用到的类型。所有的类型数据都会属于7个类型之一。从变量、参数、返回值到表达式中间结果，任何JavaScript代码运行过程中产生的数据，都具有运行时类型</p>
</blockquote>
<p>1.为什么有的编程规范要求用void 0代替undefined？</p>
<p>Undefined 类型表示为定义，它的类型只有一个值，就是 undefined。任何比那里在赋值前是 Undefined类型，值为 undefined，一般我们可以用全局变量undefined（就是名为undefined的这个变量）来表示这个值，或者void运算来把任一表达式变成undefined值。</p>
<p>但是javascript中的undefined是一个变量，而并非一个关键字，这是javascript语言公认的设计失误之一，所以为了避免无意被篡改，建议void(0)来获取undefined值</p>
<p>undefined和null有一定的表意差别，null表示的是：<strong>定义了但是为空</strong> 。所以实际编程时，一般把变量赋值为undefined，这样可以保证所以值为undefined的遍历，都是从未赋值的自然状态</p>
<p>Null类型也是一个值，就是null，它的语义表示控制，与undefined不同，，null是JavaScript关键字，所有在任何代码中，你都可以放心用null关键字来获取null值</p>
<p>2.我们来看看字符串是否有最大长度。</p>
<p>2^53 - 1</p>
<p>JavaScript中的Number类型有 18437736874454810627(即2^64-2^53+3) 个值</p>
<p>3.为什么在JavaScript中，0.1+0.2不能=0.3：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">loh</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span> <span class="token operator">==</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>因为浮点数运算的精度问题导致左右结果相差微小的值</p>
<p>一般用JavaScript提供的最小精度值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token number">0.1</span> <span class="token operator">+</span> <span class="token number">0.2</span> <span class="token operator">-</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> Number<span class="token punctuation">.</span><span class="token constant">EPSILON</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol" aria-hidden="true">#</a> Symbol</h3>
<p>symbol是ES6中引入的新类型，它是一切非字符串的对象key的集合，在ES6规范中，整个对象系统被用Symbol重塑</p>
<h3 id="object" tabindex="-1"><a class="header-anchor" href="#object" aria-hidden="true">#</a> Object</h3>
<p>Object是JavaScript中最复杂的类型，也是JavaScript的核心机制之一。Object表示对象的意思，它是一切有形和无形物体的总称</p>
<h3 id="javascipt-对象的特征" tabindex="-1"><a class="header-anchor" href="#javascipt-对象的特征" aria-hidden="true">#</a> JavaScipt 对象的特征</h3>
<ul>
<li>对象具有唯一标识性：即使完全相同的两个对象，也并非同一对象</li>
<li>对象有状态：对象具有状态，同一对象可能处于不同状态之下</li>
<li>对象具有行为：即对象的状态，因为它的行为产生变迁</li>
</ul>
<p>对象具有唯一性</p>
<p>一般来说，各种语言的对象唯一标识性都是用内存地址来体现的，对象具有唯一标识的内存地址，所以具有唯一的标识</p>
<p>在JavaScript中，对象的状态和行为其实都被抽象为了属性</p>
<p><strong>JavaScript中对象具有的特定是：对象具有高度的动态性</strong></p>
<p>动态语言</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span>a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span>
o<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>a<span class="token punctuation">,</span> o<span class="token punctuation">.</span>b<span class="token punctuation">)</span> <span class="token comment">// 1, 2 </span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>能在对象定义后，再往对象上加状态和行为，Java则不行，因为他是静态的</p>
<h4 id="javascript-对象的两类属性" tabindex="-1"><a class="header-anchor" href="#javascript-对象的两类属性" aria-hidden="true">#</a> JavaScript 对象的两类属性</h4>
</template>
