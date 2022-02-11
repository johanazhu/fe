<template><h1 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>函数是一等公民，在所有对象中，它就是王</p>
<p>函数中牵扯的内容太多，比如arguments，this，作用域，作用域链</p>
<p>函数是代码语句的容器，可以使用圆括号操作符() 来调用。调用函数时，参数可以在圆括号内传递，以便函数中的语句可以访问这些特定值</p>
<p>有两种创建函数的写法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// new 写法</span>
<span class="token keyword">var</span> funcA <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">'num1'</span><span class="token punctuation">,</span> <span class="token string">'num2'</span><span class="token punctuation">,</span> <span class="token string">'return num1 + num2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 字面量写法，更常用</span>
<span class="token keyword">var</span> <span class="token function-variable function">funcB</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">num1<span class="token punctuation">,</span> num2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 无论哪一种，都实例化了函数</span>
<span class="token comment">// 函数在对象中的别名叫方法</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>函数可用于返回值、构建对象，或者作为一种机制简单运行代码。JavaScript的函数有很多种用途，但从最基本的形式来说，函数只是可执行语句的唯一作用域</p>
<h3 id="属性和方法" tabindex="-1"><a class="header-anchor" href="#属性和方法" aria-hidden="true">#</a> 属性和方法</h3>
<p>函数对象具有以下属性（不包括继承的属性和方法）</p>
<p><strong>属性</strong>（如Function.prototypes）</p>
<ul>
<li>prototype</li>
</ul>
<h2 id="对象实例属性和方法" tabindex="-1"><a class="header-anchor" href="#对象实例属性和方法" aria-hidden="true">#</a> 对象实例属性和方法</h2>
<p>函数对象实例拥有以下属性和方法</p>
<p><strong>实例属性</strong></p>
<ul>
<li>arguments</li>
<li>constructor</li>
<li>length</li>
</ul>
<p><strong>实例方法</strong></p>
<ul>
<li>apply()</li>
<li>call()</li>
<li>toString()</li>
</ul>
<h2 id="函数是-一等公民-不仅语法-还有值" tabindex="-1"><a class="header-anchor" href="#函数是-一等公民-不仅语法-还有值" aria-hidden="true">#</a> 函数是“一等公民”（不仅语法，还有值）</h2>
<p>在 JavaScript 中，函数是对象。这意味着函数可以存储在一个变量、数组或对象中。同时，函数可以传递给函数，并由函数返回。函数拥有属性，因为它是一个对象。所有这些因素使函数在 JavaScript 中成为 “一等公民”。补充一点，<strong>因为函数的本质作用是执行代码，它创造了函数作用域。</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 1. 函数可以保存在变量(funcA)、数组(funcB)和对象中(funcC)</span>
<span class="token keyword">var</span> <span class="token function-variable function">funcA</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 调用方法: funcA()</span>
<span class="token keyword">var</span> funcB <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 调用方法: funcB[0]()</span>
<span class="token keyword">var</span> funcC <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function-variable function">method</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// funcC.method()</span>

<span class="token comment">///2. 函数可以作为参数传递，也可以作为返回值返回</span>
<span class="token keyword">var</span> <span class="token function-variable function">funcD</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> func
<span class="token punctuation">}</span>
<span class="token keyword">var</span> runFuncPassedToFuncD <span class="token operator">=</span> <span class="token function">funcD</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'转'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">runFuncPassedToFuncD</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 转</span>

<span class="token comment">///3. 函数是对象，也就意味着函数也拥有属性</span>
<span class="token keyword">var</span> <span class="token function-variable function">funcE</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
funcE<span class="token punctuation">.</span>answer <span class="token operator">=</span> <span class="token string">'bingo'</span> <span class="token comment">// 实例化属性</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>funcE<span class="token punctuation">.</span>answer<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bingo</span>

<span class="token comment">// 4. 函数作用域</span>
<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'elaine'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">funcF</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> funcStr <span class="token operator">=</span> <span class="token string">'johan'</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token comment">// elaine</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>funcStr<span class="token punctuation">)</span> <span class="token comment">// funcStr is not defined</span>
<span class="token comment">// 作用域：函数内能访问函数外变量，函数外不能调用函数内的变量</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="this-和-arguments-适用于所有函数" tabindex="-1"><a class="header-anchor" href="#this-和-arguments-适用于所有函数" aria-hidden="true">#</a> this 和 arguments 适用于所有函数</h2>
<p>在所有函数的作用域/函数体内，<code>this</code> 和 <code>arguments</code> 值都是可用的</p>
<p><code>arguments</code> 是类数组对象，它包含所有传递给函数的参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> arguments<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>传递给所有函数的 this 关键字都是对包含函数的对象的引用。换句话说，<strong>谁引用它，this就指向谁。</strong></p>
<p>当函数在全局作用域中定义时， this 值时全局对象。具体讲 <code>this</code> 的内容我们下一节再讲</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'elaine'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">method</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
myObj<span class="token punctuation">.</span><span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// myObj 谁调用它，this指向谁。myObj调用它，this指向它</span>

<span class="token keyword">var</span> <span class="token function-variable function">myObj2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token function">myObj2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// window</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="定义函数" tabindex="-1"><a class="header-anchor" href="#定义函数" aria-hidden="true">#</a> 定义函数</h2>
<p>函数的定义由三种不同的方式： 函数构造函数、函数语句和函数表达式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 函数构造函数：最后一个参数为函数逻辑，之前的都时参数</span>
<span class="token keyword">var</span> add <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">'x'</span><span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">,</span> <span class="token string">'return x + y'</span><span class="token punctuation">)</span>

<span class="token comment">// 函数声明</span>
<span class="token keyword">function</span> <span class="token function">add2</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
<span class="token comment">// 函数表达式</span>
<span class="token keyword">var</span> <span class="token function-variable function">add3</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="调用函数" tabindex="-1"><a class="header-anchor" href="#调用函数" aria-hidden="true">#</a> 调用函数</h2>
<p>使用6种不同的场景调用函数</p>
<ul>
<li>作为函数</li>
<li>作为方法</li>
<li>作为构造函数</li>
<li>使用 apply() 或者 call()</li>
<li>自调用</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 函数模式</span>
<span class="token keyword">var</span> <span class="token function-variable function">myFuntion</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myFunction1<span class="token punctuation">)</span> <span class="token comment">// foo</span>

<span class="token comment">// 方法模式</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function-variable function">myFunction</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span><span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// bar</span>

<span class="token comment">// 构造函数模式</span>
<span class="token keyword">function</span> <span class="token function">Cody</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>living <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>gender <span class="token operator">=</span> <span class="token string">'female'</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">getGender</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>gender<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> cody <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 调用构造函数</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>cody<span class="token punctuation">)</span>

<span class="token comment">// apply() 和 call() 模式</span>
<span class="token comment">// 随便一说： apply() 方法接受 一个包含多个参数的数组</span>
<span class="token comment">// call() 方法接受 一个参数列表</span>
<span class="token keyword">var</span> myObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">sayHello</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> arguments<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> johan <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'johan'</span> <span class="token punctuation">}</span>
<span class="token keyword">var</span> elaine <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'elaine'</span> <span class="token punctuation">}</span>

<span class="token comment">// 在 johan 对象上调用 sayHello</span>
myObj<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>johan<span class="token punctuation">,</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">)</span> <span class="token comment">// johan, foo, bar</span>

myObj<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>elaine<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token string">'bar'</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// elaine, foo, bar</span>

<span class="token comment">// 无论用call() 还是 apply(), 意思都是在说this指向我或者说我来调用</span>
<span class="token comment">// johan 调用 myObj.sayHello 方法，</span>
<span class="token comment">// elaine 调用 myObj.sayHello 方法</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>看出来为什么说 <code>Fucntion</code> 是 JavaScript 的王了吧，关用它就有6种方法，便利即正义</p>
<h3 id="匿名函数" tabindex="-1"><a class="header-anchor" href="#匿名函数" aria-hidden="true">#</a> 匿名函数</h3>
<p>匿名函数是一种没有给出标识符的函数。</p>
<p>匿名函数主要用于将函数作为参数传递给另一个函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个函数来执行匿名函数</span>
<span class="token keyword">var</span> <span class="token function-variable function">sayHi</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 函数表达式</span>
    <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 调用匿名函数</span>
<span class="token punctuation">}</span>
<span class="token comment">// 将匿名函数作为参数传递</span>
<span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hi'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// hi</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="自调用的函数表达式" tabindex="-1"><a class="header-anchor" href="#自调用的函数表达式" aria-hidden="true">#</a> 自调用的函数表达式</h2>
<p>通过圆括号操作符，可以在定义函数表达式后立即执行该函数表达式（除了由Function()构造函数创建的函数）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// hello, world</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这里要多说一句</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">myFunction</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// myFunction 是函数表达式</span>
<span class="token comment">// 让函数表达式执行代码，只需要 myFunction()</span>
<span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 结合到一起就是</span>
<span class="token keyword">var</span> myFunction <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello,world'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 这就是自调用的函数表达式</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="自调用的匿名函数语句" tabindex="-1"><a class="header-anchor" href="#自调用的匿名函数语句" aria-hidden="true">#</a> 自调用的匿名函数语句</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 最经常使用的匿名函数</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">loh</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">'Hi'</span><span class="token punctuation">)</span>

<span class="token comment">// 看起啦有点不一样，但效果一样</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token string">'Hi'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 更简短的方式</span>
<span class="token operator">!</span><span class="token keyword">function</span> <span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token parameter">msg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token string">'Hi'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>如果要立即调用函数，需要使用函数外面的圆括号（或任何将函数转换为表达式的符号）</p>
<p>我们从 Function() 是什么，介绍到它能做什么？解释了它为什么是JavaScript中的王，并且我们知道了各个特征。但是这还不够，我们没有对this关键字，作用域，闭包，以及原型等一些难点做分析，接下来让我们走进 <code>this</code> 关键字的时候，来看一看让人头疼的 this</p>
<p>https://www.zoo.team/article/javascript-functions</p>
<p>函数的概念：执行一个明确的动作并提供一个返回值的独立代码块。函数可以接受作为值传递给它的<strong>参数（arguments）</strong>，函数可以被用来提供<strong>返回值（return value）</strong>，也可以通过**调用（invoking）**被多次执行</p>
<p>一般情况下，JavaScript变量的生命周期被限定在声明其的函数内。</p>
<p>一个闭包会在这种情况下被创建：一个内层函数嵌套在一个外层函数里，这个内层函数被储存在其外层函数作用域之外的作用域的 variable 对象中，同时还保持着对其外层函数局部变量的引用。</p>
</template>
