<template><h1 id="javascript-启示录" tabindex="-1"><a class="header-anchor" href="#javascript-启示录" aria-hidden="true">#</a> JavaScript 启示录</h1>
<p>目录</p>
<h2 id="第一章-javascript-对象" tabindex="-1"><a class="header-anchor" href="#第一章-javascript-对象" aria-hidden="true">#</a> 第一章 JavaScript 对象</h2>
<h3 id="_1-1-创建对象" tabindex="-1"><a class="header-anchor" href="#_1-1-创建对象" aria-hidden="true">#</a> 1.1 创建对象</h3>
<p>​	在 JavaScript 中，对象是“王”：JavaScript 里的几乎所有东西都是对象或者用起来像对象。理解了对象，就能理解 JavaScript。</p>
<p>​	对象是一组有命名值（也成为属性）集合的容器。</p>
<p>​	如果没有方法，除了用于存储静态属性意外，对象就没有其他太多用途。</p>
<p>像 Object，String之类的是 JavaScript 自身内置的构造函数。当然，你也可以定义一个非原生的自定义 构造函数，用它来创建 对象。</p>
<p>构造函数也是函数，他相当于一个能自定义对象的模板（我的理解）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 定义 Person 构造函数，以便稍后创建自定义的 Person() 对象</span>
<span class="token keyword">var</span> <span class="token function-variable function">Person</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">living<span class="token punctuation">,</span> age<span class="token punctuation">,</span> gender</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>living <span class="token operator">=</span> living<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>gender <span class="token operator">=</span> gender<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">getGender</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>gender
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 实例化 Person 对象，并将它保存到 johan 变量</span>
<span class="token keyword">var</span> johan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token number">26</span><span class="token punctuation">,</span> <span class="token string">'male'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>johan<span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_1-3-javascript-原生-内置对象构造函数" tabindex="-1"><a class="header-anchor" href="#_1-3-javascript-原生-内置对象构造函数" aria-hidden="true">#</a> 1.3 JavaScript 原生/内置对象构造函数</h3>
<p>JavaScript包含 9 个原生（或内置）对象构造函数。</p>
<ul>
<li><strong>Number（）</strong></li>
<li><strong>String（）</strong></li>
<li><strong>Boolean（）</strong></li>
<li><strong>Object（）</strong></li>
<li><strong>Array（）</strong></li>
<li><strong>Function（）</strong></li>
<li><strong>Date（）</strong></li>
<li><strong>RegExp（）</strong></li>
<li><strong>Error（）</strong></li>
</ul>
<p>注意：</p>
<ul>
<li>Math对象在这里很古怪，它是一个静态对象，而不是构造函数</li>
<li>原生对象有时也被称为“全局对象”，因为他们是JavaScript中原生就可以使用的对象。</li>
<li>Number（）、String（）和 Boolean（）构造函数不仅能构建对象，而且能为字符串、数字和布尔值提供原始值</li>
</ul>
<p>龙生九子，九个，还有个私生子（Math）</p>
<h3 id="_1-4-用户自定义-非原生对象构造函数" tabindex="-1"><a class="header-anchor" href="#_1-4-用户自定义-非原生对象构造函数" aria-hidden="true">#</a> 1.4 用户自定义/非原生对象构造函数</h3>
<p>自定义构造函数，首字母大写（约定俗成）</p>
<h3 id="_1-7-原始值-或简单值" tabindex="-1"><a class="header-anchor" href="#_1-7-原始值-或简单值" aria-hidden="true">#</a> 1.7 原始值（或简单值）</h3>
<p>原始值是表示 JavaScript 中可用的数据/信息的最底层形式（即最简单的形式）</p>
<p>就是基本类型</p>
<h3 id="_1-8-null、undefined、-string-、10、true-和-false-等原始值不是对象" tabindex="-1"><a class="header-anchor" href="#_1-8-null、undefined、-string-、10、true-和-false-等原始值不是对象" aria-hidden="true">#</a> 1.8 null、undefined、“string”、10、true 和 false 等原始值不是对象</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 使用原始值的时候，不会创建对象，注意没有使用 new 关键字</span>
<span class="token keyword">var</span> primitiveString1 <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> primitiveString2 <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> primitiveNumber1 <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> primitiveNumber2 <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'10'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> primitiveBoolean1 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> primitiveBoolean2 <span class="token operator">=</span> <span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> primitiveString1<span class="token punctuation">,</span> <span class="token keyword">typeof</span> primitiveString2 <span class="token punctuation">)</span> <span class="token comment">// 输出 'string, string'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> primitiveNumber1<span class="token punctuation">,</span> <span class="token keyword">typeof</span> primitiveNumber2 <span class="token punctuation">)</span> <span class="token comment">// 输出 'number, number'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> primitiveBoolean1<span class="token punctuation">,</span><span class="token keyword">typeof</span> primitiveBoolean2 <span class="token punctuation">)</span><span class="token comment">// 输出 'boolean,boolean'</span>

<span class="token comment">// 对比创建对象的构造函数和 new 关键字用法</span>
<span class="token keyword">var</span> myNumber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">'male'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBoolean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myArray <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myFunction <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">'x'</span><span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">,</span> <span class="token string">'return x * y'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myDate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myRegExp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'\\bt[a-z]+\\b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myError <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'Johan!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
	<span class="token keyword">typeof</span> myNumber<span class="token punctuation">,</span> 	<span class="token comment">// obejct</span>
    <span class="token keyword">typeof</span> myString<span class="token punctuation">,</span>  	<span class="token comment">// obejct</span>
    <span class="token keyword">typeof</span> myBoolean<span class="token punctuation">,</span>	<span class="token comment">// obejct</span>
    <span class="token keyword">typeof</span> myObject<span class="token punctuation">,</span>	<span class="token comment">// object</span>
    <span class="token keyword">typeof</span> myArray<span class="token punctuation">,</span>		<span class="token comment">// object</span>
    <span class="token keyword">typeof</span> myFunction<span class="token punctuation">,</span>	<span class="token comment">// function</span>
    <span class="token keyword">typeof</span> myDate<span class="token punctuation">,</span>		<span class="token comment">// object</span>
    <span class="token keyword">typeof</span> myRegExp<span class="token punctuation">,</span>	<span class="token comment">// function</span>
    <span class="token keyword">typeof</span> myError<span class="token punctuation">,</span>		<span class="token comment">// object</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>总结：原始值不是对象。原始值的特殊指出在于它们是用来表示简单值的。</p>
<h3 id="_1-9-如何存储和复制原始值" tabindex="-1"><a class="header-anchor" href="#_1-9-如何存储和复制原始值" aria-hidden="true">#</a> 1.9 如何存储和复制原始值</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myStringCopy <span class="token operator">=</span> myString<span class="token punctuation">;</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myString<span class="token punctuation">,</span> myStringCopy<span class="token punctuation">)</span> 	<span class="token comment">// 输出 'null foo'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我的理解：因为是原始值是堆引用，体积小，直接堆引用。待考证</p>
<h3 id="_1-10-原始值对比采用值比较" tabindex="-1"><a class="header-anchor" href="#_1-10-原始值对比采用值比较" aria-hidden="true">#</a> 1.10 原始值对比采用值比较</h3>
<p>可以通过比较原始值来确定其值在字面上是否相同。从逻辑上讲，如果将一个包括数值 10 的变量与另一个包含数值 10 的变量进行比较，JavaScript 将会认为它们是相等的，因为 10 与 10 是相同的（即 10 === 10 ）。</p>
<h3 id="_1-11-原始值-string、number、boolean-在被用做对象时就像对象" tabindex="-1"><a class="header-anchor" href="#_1-11-原始值-string、number、boolean-在被用做对象时就像对象" aria-hidden="true">#</a> 1.11 原始值（String、Number、Boolean）在被用做对象时就像对象</h3>
<h3 id="_1-12-复杂值-或组合值" tabindex="-1"><a class="header-anchor" href="#_1-12-复杂值-或组合值" aria-hidden="true">#</a> 1.12 复杂值（或组合值）</h3>
<p>原生对象构造函数 Object()、Array()、Function()、Date()、Error() 和 RegExp() 是复杂类型。因为它们包含一个或多个原始值或复杂值。</p>
<p>本质上，复杂值可以由很多不同类型的 JavaScript 对象组成。可以这样说，复杂对象其在内存中的大笑是未知的，因为复杂对象可以包含任何职，而不是一个特定的已知值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> object <span class="token operator">=</span> <span class="token punctuation">{</span>
	myString<span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span>
    myNumber<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    myBoolean<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    myNull<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    myUndefined<span class="token operator">:</span> <span class="token keyword">undefined</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'string'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 相比简单的原始值，原始值不能表示复杂值，而复杂值可以封装任意 JavaScript 值</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token string">'string'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myNumber <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myBoolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myNull <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myUndefined <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>复杂值是各种值的组合，并且在复杂性和组合方面与原始值不同。</p>
<p>注意：</p>
<p>“复杂对象” 这一术语在其他作品中也被表达为“复合对象”或“引用对象”。</p>
<p>原始值不是“值引用”，不能表示其他值的组合（即一个由几部分或几个元素组成的东西）。另一方面，复杂对象是“值“引用，可以包含或封装其他值。</p>
<h4 id="_1-13-如何存储或复制复杂值" tabindex="-1"><a class="header-anchor" href="#_1-13-如何存储或复制复杂值" aria-hidden="true">#</a> 1.13 如何存储或复制复杂值</h4>
<p>创建一个包含复杂对象的变量时，其值是内存中的一个引用地址。引用一个复杂对象时，使用它的名称（即变量或对象属性）通过内存中的引用地址获取该对象。</p>
<p>当修改复杂值时，所有引用对象地址的变量的值都会被改变，因为复杂值时通过引用进行存储的</p>
<p>深拷贝和浅拷贝</p>
<h4 id="_1-14-复杂对象比较采用引用比较" tabindex="-1"><a class="header-anchor" href="#_1-14-复杂对象比较采用引用比较" aria-hidden="true">#</a> 1.14 复杂对象比较采用引用比较</h4>
<p>复杂对象只有在引用想听的对象(即有相同的地址)时才相等。包括相同对象的两个变量彼此不相等，因为它们并不指向同一个对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> objectFoo <span class="token operator">=</span> <span class="token punctuation">{</span> same<span class="token operator">:</span> <span class="token string">'same'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> objectBar <span class="token operator">=</span> <span class="token punctuation">{</span> same<span class="token operator">:</span> <span class="token string">'same'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 输出 fasle， JS并不关注它们的类型是否相同</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objectFoo <span class="token operator">===</span> objectBar<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 复杂对象如何相等，引用同一个对象</span>
<span class="token keyword">var</span> objectA <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> objectB <span class="token operator">=</span> objectA<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objectA <span class="token operator">===</span> objectB<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="_1-15-复杂对象具有动态属性" tabindex="-1"><a class="header-anchor" href="#_1-15-复杂对象具有动态属性" aria-hidden="true">#</a> 1.15 复杂对象具有动态属性</h4>
<p>复杂对象支持动态对象属性，因为我们可以定义对象，然后创建引用，再更新对象，并且所有指向该对象的变量都会“获得”更新</p>
<h4 id="_1-16-typeof-操作符" tabindex="-1"><a class="header-anchor" href="#_1-16-typeof-操作符" aria-hidden="true">#</a> 1.16 typeof 操作符</h4>
<p>在jsbasic中说过，</p>
<p>需要注意的是 函数或者正则返回的 是 function</p>
<h4 id="_1-17-动态属性支持易变对象" tabindex="-1"><a class="header-anchor" href="#_1-17-动态属性支持易变对象" aria-hidden="true">#</a> 1.17 动态属性支持易变对象</h4>
<p>我们可以在原生构造函数上存储属性，并在原型对象上，向原生对象额外添加新方法</p>
<h4 id="_1-18-构造函数实例都拥有指向其构造函数的-constructor-属性" tabindex="-1"><a class="header-anchor" href="#_1-18-构造函数实例都拥有指向其构造函数的-constructor-属性" aria-hidden="true">#</a> 1.18 构造函数实例都拥有指向其构造函数的 Constructor 属性</h4>
<p>说白了，Contructor 属性就是说谁是你的妈，谁制造的你，谁生的你， constructor 的英文翻译就是构造函数</p>
<p>比如说</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Object<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// 指向 Object() 构造函数</span>

<span class="token comment">// 自定义 构造函数</span>
<span class="token keyword">function</span> <span class="token function">CustomConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">'Wow!'</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> instanceOfCustructor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instanceOfCustructor<span class="token punctuation">.</span>constructor <span class="token operator">===</span> CustomConstructor<span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instanceOfCustructor<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// function CustomConstructor() { return 'Wow!' }</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_1-19-验证对象是否是特定构造函数的实例" tabindex="-1"><a class="header-anchor" href="#_1-19-验证对象是否是特定构造函数的实例" aria-hidden="true">#</a> 1.19 验证对象是否是特定构造函数的实例</h4>
<p>通过使用 instanceof 操作符，可以确定（ture 或 false） 一个对象是否是特定构造函数的实例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">CustomConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'bar'</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> instanceOfConstructor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>instanceOfConstructor <span class="token keyword">instanceof</span> <span class="token class-name">CustomConstructor</span><span class="token punctuation">)</span> <span class="token comment">//true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>可以翻译为： 这个实例 属于 这个构造函数吗</p>
<p>当然，任何时候判断一个对象是否是 Object 的实例时，他都讲返回 true，因为所有的对象都继承自 Object() 构造函数</p>
<p>即使是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> instance Object<span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token keyword">var</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>func instance Object<span class="token punctuation">)</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>数组，函数都是由对象构建，也是对象</p>
<h4 id="_1-21-javascript-对象和-object-对象" tabindex="-1"><a class="header-anchor" href="#_1-21-javascript-对象和-object-对象" aria-hidden="true">#</a> 1.21 JavaScript 对象和 Object() 对象</h4>
<p>不要讲一般术语“JavaScript对象”与 Object() 对象混淆。术语“JavaScript对象” 指的是 JavaScript 中的所有对象，因为 JavaScript 中的大部分值都可以像对象一样使用。这是由于大多数 JavaScript 值都是由能够生成特定类型对象的原生构造函数所创建。</p>
<p>记住：Object() 对象是一种特定类型的值，它是一个通用的空对象。</p>
<h2 id="第二章-对象与属性" tabindex="-1"><a class="header-anchor" href="#第二章-对象与属性" aria-hidden="true">#</a> 第二章 对象与属性</h2>
<h4 id="_2-6-使用-hasownproperty-验证对象属性不是来自原型链" tabindex="-1"><a class="header-anchor" href="#_2-6-使用-hasownproperty-验证对象属性不是来自原型链" aria-hidden="true">#</a> 2.6 使用 hasOwnProperty 验证对象属性不是来自原型链</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">'value'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 输出 true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>‘toString<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 输出 false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="第三章-object" tabindex="-1"><a class="header-anchor" href="#第三章-object" aria-hidden="true">#</a> 第三章 Object()</h3>
<h4 id="_3-3-object-属性和方法" tabindex="-1"><a class="header-anchor" href="#_3-3-object-属性和方法" aria-hidden="true">#</a> 3.3 Object() 属性和方法</h4>
<p>Object() 对象具有以下属性（不包括继承的属性和方法）</p>
<p>属性（如 Object.prototype）</p>
<ul>
<li>prototype</li>
</ul>
<h4 id="_3-4-object-对象实例属性和方法" tabindex="-1"><a class="header-anchor" href="#_3-4-object-对象实例属性和方法" aria-hidden="true">#</a> 3.4 Object() 对象实例属性和方法</h4>
<p>Object() 对象实例拥有以下属性和方法</p>
<p><strong>实例属性</strong> （如 var myObject = {}; myObject.constructor）</p>
<ul>
<li>constructor</li>
</ul>
<p><strong>实例方法</strong>（如 var myObject = {}; myObject.toString()）;</p>
<ul>
<li>hasOwnProperty</li>
<li>isPrototypeOf()</li>
<li>propertyIsEnumerable()</li>
<li>toLocaleString()</li>
<li>toString()</li>
<li>valueOf()</li>
</ul>
<p>注意： 原型链以 Object.prototype 结尾（指向null），因此，Object() 的所有属性和方法（如上所示）被所有的 JavaScript 对象继承。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> str1 <span class="token operator">=</span> <span class="token string">'hanbo'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str1<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> num1 <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>num1<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// toString() 方法继承自Object()对象</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="_3-6-所有对象都继承自-object-prototype" tabindex="-1"><a class="header-anchor" href="#_3-6-所有对象都继承自-object-prototype" aria-hidden="true">#</a> 3.6 所有对象都继承自 Object.prototype</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token string">'bar'</span>
<span class="token keyword">var</span> myNumber <span class="token operator">=</span> <span class="token number">11</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myString<span class="token punctuation">.</span>foo<span class="token punctuation">)</span> <span class="token comment">// 输出 'foo' 通过原型链在 Object.prototype.foo 上找到</span>
<span class="token function">consolelog</span><span class="token punctuation">(</span>myNumber<span class="token punctuation">.</span>foo<span class="token punctuation">)</span> <span class="token comment">// 同上</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="第四章-function" tabindex="-1"><a class="header-anchor" href="#第四章-function" aria-hidden="true">#</a> 第四章 Function()</h2>
<h4 id="_4-3-function-属性和方法" tabindex="-1"><a class="header-anchor" href="#_4-3-function-属性和方法" aria-hidden="true">#</a> 4.3 Function() 属性和方法</h4>
<p><strong>属性</strong>（如 Function.prototype;）</p>
<ul>
<li>prototype</li>
</ul>
<h4 id="_4-4-function-对象实例属性和方法" tabindex="-1"><a class="header-anchor" href="#_4-4-function-对象实例属性和方法" aria-hidden="true">#</a> 4.4 Function 对象实例属性和方法</h4>
<p>函数对象实例拥有以下属性和方法</p>
<p><strong>实例属性</strong>（如 var myFunction = function(x, y, z) {}; myFuntion.length;）</p>
<ul>
<li>arguments</li>
<li>constructor</li>
<li>length</li>
</ul>
<p><strong>实例方法</strong> （如 var myFunction = function(x, y, z) {}; myFunction.toString()）</p>
<ul>
<li>apply()</li>
<li>call()</li>
<li>toString()</li>
</ul>
<h4 id="_4-14-调用函数-函数、方法、构造函数或者call-和apply" tabindex="-1"><a class="header-anchor" href="#_4-14-调用函数-函数、方法、构造函数或者call-和apply" aria-hidden="true">#</a> 4.14 调用函数[函数、方法、构造函数或者call()和apply()]</h4>
<p>其实不止4种</p>
<h4 id="_4-15-匿名函数" tabindex="-1"><a class="header-anchor" href="#_4-15-匿名函数" aria-hidden="true">#</a> 4.15 匿名函数</h4>
<p>匿名函数是一种没有给出标识符的函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hi'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>简单来说就是没有函数名</p>
<h4 id="_4-16-自调用的函数表达式" tabindex="-1"><a class="header-anchor" href="#_4-16-自调用的函数表达式" aria-hidden="true">#</a> 4.16 自调用的函数表达式</h4>
<p>定义函数表达式后立即调用该函数表达式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">sayWord</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello, word'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="_4-17-自调用的匿名函数语句" tabindex="-1"><a class="header-anchor" href="#_4-17-自调用的匿名函数语句" aria-hidden="true">#</a> 4.17 自调用的匿名函数语句</h4>
<p>就是将以上两种结合到一起，特点是在这个空间内，你的命名不会与外界产生联系，其原理是闭包</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 最经常使用的匿名函数</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Hi'</span><span class="token punctuation">)</span>
<span class="token comment">// 写法不同的匿名函数</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token string">'Hi'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 更简短的方法</span>
<span class="token operator">!</span><span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token string">'Hi'</span><span class="token punctuation">)</span>
<span class="token comment">// 注意：下一代码不行！</span>
<span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>copnsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hi'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>注意： 如果要立即调用函数，需要使用函数外面的圆括号（或任何将函数转换为表达式的符号）</p>
<h4 id="_4-20-函数定义之前调用-函数提升" tabindex="-1"><a class="header-anchor" href="#_4-20-函数定义之前调用-函数提升" aria-hidden="true">#</a> 4.20 函数定义之前调用（函数提升）</h4>
<p>在真正定义函数语句之前，可以在执行时调用该函数语句。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">speak</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">sayYo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">sayYo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Yo'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>在运行代码之前，函数语句其实已经被编译器解释，并添加至执行堆栈/上下文</p>
<p>注意：被定义为“函数表达式”的函数没有被提升——只有“函数语句”被提升</p>
<h2 id="第六章-this-关键字" tabindex="-1"><a class="header-anchor" href="#第六章-this-关键字" aria-hidden="true">#</a> 第六章 this 关键字</h2>
<h4 id="_6-1-this-概要及-this-如何引用对象" tabindex="-1"><a class="header-anchor" href="#_6-1-this-概要及-this-如何引用对象" aria-hidden="true">#</a> 6.1 this 概要及 this 如何引用对象</h4>
<p>this 对其函数的作用域时可见的，而且它是函数属性/方法所在对象的一个引用</p>
<p>总的来说，this 是在函数内部使用，用来引用包含函数的对象，而不是函数本身[使用 new 关键字或者 call() 和 apply() 的情况例外]</p>
<h4 id="_6-4-充分利用作用域链研究嵌套函数问题" tabindex="-1"><a class="header-anchor" href="#_6-4-充分利用作用域链研究嵌套函数问题" aria-hidden="true">#</a> 6.4 充分利用作用域链研究嵌套函数问题</h4>
<p>可以简单地在夫函数种使用作用于阿联来保留对 this 的引用，以便 this 值不丢失。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
    myProperty<span class="token operator">:</span> <span class="token string">'I can see the light'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">myMethod</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> that <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span> <span class="token comment">// myMethod 作用域中，保存 this 引用(that 即 myObject)</span>
        <span class="token keyword">var</span> <span class="token function-variable function">helperFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>that<span class="token punctuation">.</span>myProperty<span class="token punctuation">)</span> <span class="token comment">// 输出 'I can see the light'</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// window.object</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="_6-5-使用call-或-apply-控制-this-值" tabindex="-1"><a class="header-anchor" href="#_6-5-使用call-或-apply-控制-this-值" aria-hidden="true">#</a> 6.5 使用call() 或 apply() 控制 this 值</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">myFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">param1<span class="token punctuation">,</span> param2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> param1<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>bar <span class="token operator">=</span> param2<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">myFuntion</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">)</span>
<span class="token function">myFunction</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="第七章-作用域和闭包" tabindex="-1"><a class="header-anchor" href="#第七章-作用域和闭包" aria-hidden="true">#</a> 第七章 作用域和闭包</h2>
<h4 id="_7-1-javascript-作用域概要" tabindex="-1"><a class="header-anchor" href="#_7-1-javascript-作用域概要" aria-hidden="true">#</a> 7.1 JavaScript 作用域概要</h4>
<p>在 JavaScript 种，作用域是执行代码的上下文。作用域又三种类型：全局作用域、局部作用域（有时被称为“函数作用域”）和 eval 作用域（还有块级作用域ES6中）</p>
<p>在函数内部使用var定义的代码，七作用域是局部的，且只对该函数的其他表达式“可见”，包括嵌套/子函数中的代码。</p>
<p>在全局作用域内定义的变量从任何地方都可以访问，因为它是作用域链中的最高层/最后一个</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 全局作用域</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 0</span>

<span class="token keyword">var</span> <span class="token function-variable function">myFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 局部作用域</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token comment">// 输出 1</span>
    <span class="token keyword">var</span> <span class="token function-variable function">myNestedFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 局部作用域</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token comment">// 输出2</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_7-2-作用域链-词法作用域" tabindex="-1"><a class="header-anchor" href="#_7-2-作用域链-词法作用域" aria-hidden="true">#</a> 7.2 作用域链（词法作用域）</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> sayHiText <span class="token operator">=</span> <span class="token string">'howdy'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">func1</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> <span class="token function-variable function">func2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sayHiText<span class="token punctuation">)</span> <span class="token comment">// func2 作用域，但在全局作用域中查找到了 sayHiText</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>按数学的逻辑，就是集合关系，先在自己函数内找变量，如果没有，再到函数上一级找，以此类推到全局作用域</p>
<p>注意：仔细想一下，作用域链和原型链的区别并不大。两者都是通过为止体系和分层体系来查找值的方法</p>
<h4 id="_7-6-函数定义时确定作用域-而非调用时确定" tabindex="-1"><a class="header-anchor" href="#_7-6-函数定义时确定作用域-而非调用时确定" aria-hidden="true">#</a> 7.6 函数定义时确定作用域，而非调用时确定</h4>
<p>这个也叫词法作用域。</p>
<p>其实很简单，如果是按照调用的时候确认作用域，那么对js来说就是灾难，你在上面定位一个函数，在下面又定位一个函数，而下面那个函数调用了上面那个函数。但你在这两个函数之间调用下面函数时，你要先去找下面那个函数，下面的函数调用上面的函数，又跑到上面，如果同事写的乱一点，你将很难定位错误所在，</p>
<p>好在JavaScript的作用域是词法作用域，它根据函数定义时的位置确认</p>
<p>作用域链是在调用函数之前创建。正因为如此，我们可以创建闭包。例如，我们可以让函数向全局作用域返回一个嵌套函数，但该函数仍然能够通过作用域链返回其父函数的作用域。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">parentFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 返回匿名函数</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token comment">// 输出 ‘foo'</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// nestedFunction 引用 parentFunction 函数返回的匿名函数</span>
<span class="token keyword">var</span> nestedFunction <span class="token operator">=</span> <span class="token function">parentFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">nestedFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 foo，因为返回的函数可以通过作用域链访问 foo</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>你懂我意思吗？</p>
<p>因为JavaScript的作用域是词法作用域，词法作用域的特点是：根据函数定义时的位置确认</p>
<p>所以当你定义好一个函数后，它的作用域就确定了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">parentFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">'foo'</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这个函数，他的作用域已经确认了。在 parentFunction()函数中，有 属性foo 和匿名方法。</p>
<p>匿名方法中的作用域包含 console.log(foo),foo 在匿名函数中找不到，往上级找，在parentFunction中找到，引用它。</p>
<h4 id="_7-7-闭包是由作用域链引起的" tabindex="-1"><a class="header-anchor" href="#_7-7-闭包是由作用域链引起的" aria-hidden="true">#</a> 7.7 闭包是由作用域链引起的</h4>
</template>
