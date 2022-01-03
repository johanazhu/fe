<template><h1 id="构造函数、原型、实例、类" tabindex="-1"><a class="header-anchor" href="#构造函数、原型、实例、类" aria-hidden="true">#</a> 构造函数、原型、实例、类</h1>
<h3 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h3>
<p>构造函数、原型、实例、类是分别是什么？怎么解释</p>
<h3 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h3>
<p>一种用于创建或者初始化 class 对象的特殊方法；</p>
<p>生成对象 基于构造函数和原型</p>
<p>var obj  = {}</p>
<p>1、<strong>constructor 函数模板</strong> 创建对象</p>
<p>2、constructor 属性 告诉 实例 你的爸爸是谁 谁创造了你</p>
<p>对象、函数、原型、继承、构造函数、实例、类</p>
<p>高程4中对构造函数、原型和实例的关系的描述：</p>
<blockquote>
<p>每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针（<code>__proto__</code>）指向原型。</p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> johan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'johan'</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这个案例中，Person 是构造函数，它有一个属性 prototype，这个属性负责构造函数共享的数据、方法。而这个原型对象有一个属性叫 constructor，指回构造函数 Person。由 Person 构建出的实例 johan，有一个内部指针（<code>__proto__</code>）指向创建它的原型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Person
johan<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这里不仅有一个思考？如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数，这样就在实例和原型之间构建了一条原型链</p>
<p><img src="https://i.loli.net/2021/04/15/nfZbSWMTjVzr2lv.png" alt="image-20210415144321299"></p>
<p>本质是链表，每个构造函数中的原型是一个节点，通过节点来进行继承</p>
<p>而“实例”一词，给人的感觉是和类相关</p>
<p>用原型链怎么个继承法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">Man</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> johan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>johan<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="https://i.loli.net/2021/04/15/YIUl3MLayuTpNRk.png" alt="image-20210415152547277"></p>
<p>关系伪代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>johan<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Man</span><span class="token punctuation">.</span>prototype
<span class="token class-name">Man</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>colors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'red'</span><span class="token punctuation">,</span> <span class="token string">'green'</span><span class="token punctuation">,</span> <span class="token string">'blue'</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token class-name">Man</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> johan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

johan<span class="token punctuation">.</span>colors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">'yellow'</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>johan<span class="token punctuation">.</span>colors<span class="token punctuation">)</span>

<span class="token keyword">const</span> elaine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elaine<span class="token punctuation">.</span>colors<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>在 Person 中定义的属性，因为继承的缘故（Man.prototype = new Person()），使得 Person的属性变成了公共属性</p>
<p>new Person() 就是创建一个实例</p>
<p>Man.prototype = new Person()</p>
<p>Man这个构造函数的原型等于Person创建的一个实例</p>
<p>这个实例的<code>__proto__</code> 等于 Person.prototype</p>
<p>所以可以翻译为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Man</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 可以翻译为</span>
<span class="token class-name">Man</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Person</span><span class="token punctuation">.</span>prototype
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>还记得之前的例子吗？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>我觉得以后看到 new 的第一反应是：</p>
<p><code>实例.__proto__ === 构造函数.prototype</code></p>
<h3 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h3>
<h4 id="什么是类" tabindex="-1"><a class="header-anchor" href="#什么是类" aria-hidden="true">#</a> 什么是类？</h4>
<p>回到上述问题</p>
<p>类和实例是匹配的，金丝雀是鸟类的一种。对个人对集体的关系</p>
<p>而原型是链表关系，就好比古董收藏，我是蒙娜丽莎的拥有者，它的上一任是XX，它的上上任是XXX，在 JavaScript 语言中，你能动态改变上一任或者上上任。只要把prototype对象中的constructor指向更改即可</p>
<p>类继承，是集合继承</p>
<p>原型继承，是树状继承</p>
<p>本质是链表，每一个构造函数是一个节点，而不是几个集合</p>
<h4 id="原型式继承" tabindex="-1"><a class="header-anchor" href="#原型式继承" aria-hidden="true">#</a> 原型式继承</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">object</span><span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">function</span> <span class="token constant">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> o<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token punctuation">{</span> 
 	name<span class="token operator">:</span> <span class="token string">"Nicholas"</span><span class="token punctuation">,</span> 
 	friends<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Shelby"</span><span class="token punctuation">,</span> <span class="token string">"Court"</span><span class="token punctuation">,</span> <span class="token string">"Van"</span><span class="token punctuation">]</span> 
<span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">object</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span>

a<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">F</span><span class="token punctuation">.</span>prototype <span class="token operator">===</span> person
a<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> person
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>首先是对象，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">myNew</span><span class="token punctuation">(</span><span class="token parameter">Con<span class="token punctuation">,</span> <span class="token operator">...</span>rest</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Con</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token function">Con</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> rest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> result
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> obj
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>社区上一直有人说：类的概念，但是 JavaScript 是这样吗？</p>
<p>JavaScript 的”类模式“的本质是 基于原型而做的</p>
<p>原型继承是怎么样的</p>
<p>类继承有什么问题</p>
<p>思想上的改变</p>
<p>基于原型的继承是指针的继承，好比你有一块宝石，传给了一个人，然后这个人把宝石镶嵌到手套里，再传给了另一个人，</p>
<p>而基于类的联想，人们会想当然的这么想：</p>
<p>动物是动物类，狗也是一种类，哈士奇是狗类的一个实例，</p>
<p>问题来了，你怎么看</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dog<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 按照类的思考模式：实例的原型继承自动物</span>
<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>本质是链表，每一个构造函数是一个节点，而不是几个集合</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">YeFamily</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">YeFamily</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">xinfa</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'上天下地无敌心法'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">OldMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">OldMan</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">YeFamily</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">OldMan</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">has</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'上古盔甲'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">DayMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">DayMan</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OldMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">DayMan</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">say</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'爱吹牛逼'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>所谓的继承，就是<code>__proto__</code> 指针指向对象的问题</p>
<p>这个例子也不太好</p>
<p>因为指针有任意性的特点</p>
<p>少年可以继承自父亲（组长），也可以继承自老族长或者老祖宗，只不过继承（<code>__proto__</code>指向问题）</p>
<p>这里牵扯到 new 问题，new 操作符会在内部创建一个对象，继承自构造函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>答案：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>b<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">B</span><span class="token punctuation">.</span>prototype 
<span class="token class-name">B</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">A</span><span class="token punctuation">.</span>prototype
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>原型是什么？原型对象又是什么？</p>
<p><code>Function.__proto__ === Function.prototype</code></p>
<h3 id="面试题" tabindex="-1"><a class="header-anchor" href="#面试题" aria-hidden="true">#</a> 面试题</h3>
<p>颜海镜原型面试题</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html" target="_blank" rel="noopener noreferrer">JavaScript面向对象编程（二）：构造函数的继承<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844903856376119304" target="_blank" rel="noopener noreferrer">从原型聊到原型继承，深入理解JavaScript面向对象精髓<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000002596600" target="_blank" rel="noopener noreferrer">为什么原型继承很重要<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
