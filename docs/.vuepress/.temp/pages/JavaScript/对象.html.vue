<template><h1 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h1>
<h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要" aria-hidden="true">#</a> 概要</h2>
<p>在前面几节或多或少看到有关Object的使用，让我们通过几行代码来认识Object</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> cody <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 创建一个不带属性的空对象</span>
<span class="token keyword">for</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> cody<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 确认 cody 对象是普通的空对象</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cody<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 检查它自身上的属性和方法</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token comment">// 没有任何输出，因为 cody 本身不包含任何属性</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>通过 <code>Object() 构造函数</code> 创建出来名为 <code>cody</code> 的普通对象。可以把 <code>Object() 构造函数</code> 想象成饼干模型，该模型用来创建没有预定义属性或方法的空对象（当然，除了哪些继承自原型链的属性或方法）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> cody <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 等效于 var cody = new Object(); {} 是语法糖</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>注意：Object() 构造函数本身对象，即 构造函数是基于 Function 构造函数创建的对象。有点混乱，但是要记住，像 Array 构造函数那样，Object 构造函数只是创建了<code>空白对象</code>，我们可以随性所以地创建任何<code>空对象</code>。然后像 <code>cody</code> 这样的空对象与创建拥有预定义属性的构造函数非常不同。</p>
<h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2>
<p><code>Object()构造函数</code> 采用一个可选参数。该参数是要创建的值。如果不提供任何参数，那么将假定一个有null 或 undefined 值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> cody1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cody2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cody3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> cody1<span class="token punctuation">,</span> <span class="token keyword">typeof</span> cody2<span class="token punctuation">,</span> <span class="token keyword">typeof</span> cody3<span class="token punctuation">)</span> <span class="token comment">// 'object object object'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>我们可以使用 <code>Object()构造函数</code> 来创建任何其他拥有构造函数的原生对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Obejct</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\bt[a-z]+\b</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 使用 Object() 构造函数创建 string, number, array, function, boolean, regex 对象</span>
<span class="token comment">// 提醒：这些是例子，仅作演示，内置函数有9个，都可以用Object()构造函数创建</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="属性和方法" tabindex="-1"><a class="header-anchor" href="#属性和方法" aria-hidden="true">#</a> 属性和方法</h2>
<p>Object() 对象具有以下属性（不包括继承的属性和方法）。</p>
<p><strong>属性</strong> (如 Object.prototype)</p>
<ul>
<li>prototype</li>
</ul>
<h2 id="实例属性和方法" tabindex="-1"><a class="header-anchor" href="#实例属性和方法" aria-hidden="true">#</a> 实例属性和方法</h2>
<p>Object() 对象实例拥有下列属性和方法。</p>
<p><strong>实例属性</strong> （如 var myObject = { }; myObject.constructor）;</p>
<ul>
<li>constructor</li>
</ul>
<p><strong>实例方法</strong> （如 var myObject = { }; myObject.toString()）;</p>
<ul>
<li>hasOwnProperty()</li>
<li>isPrototypeOf()</li>
<li>propertyIsEnumerable()</li>
<li>toLocaleString()</li>
<li>toString()</li>
<li>valueOf()</li>
</ul>
<p>注意：原型链以 Object.prototype 结尾，因此，Object() 的所有属性和方法（如上所示）被所有的 JavaScript 对象继承</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// 可以查找所有的 Object() 构造函数上的属性和方法</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="所有对象都继承自-object-prototype" tabindex="-1"><a class="header-anchor" href="#所有对象都继承自-object-prototype" aria-hidden="true">#</a> 所有对象都继承自 Object.prototype</h2>
<p>Object() 构造函数在 JavaScript 中是特殊的，因为它的 prototype 属性在原型链中是最后一个</p>
<p>下面的代码，我将 foo 属性添加到 Object.prototype 上，然后创建一个字符串</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">'foo'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> myString <span class="token operator">=</span> <span class="token string">'bar'</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myString<span class="token punctuation">.</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// foo</span>
<span class="token comment">// 先在myString 实例上找foo属性，找不到往 myString.__proto__ 上找，也就是 String.prototype 上找，再找不到往 myString.__proto__.__proto__ 上找，也就是在 Object.prototype 上找</span>
<span class="token comment">// myString.__proto__ === String.prototype</span>
<span class="token comment">// myString.__proto__.__proto__ === String.prototype.__proto__ === Object.prototype</span>
<span class="token comment">// 原型链的奥秘会在后续文章中详细说明</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>注意：添加至 Object.prototype 的任何内容都将出现在for in 循环和原型链中。因此，更该 Obejct.prototype 是被禁止的</p>
<h2 id="构造函数实例上的属性——constructor" tabindex="-1"><a class="header-anchor" href="#构造函数实例上的属性——constructor" aria-hidden="true">#</a> 构造函数实例上的属性——Constructor</h2>
<p>介绍：返回创建实例对象的 <code>Object</code> 构造函数的引用</p>
<p>描述：所有对象都会从它的原型能上继承一个 <code>constructor</code> 属性</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
o<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Object<span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
a<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Array<span class="token punctuation">;</span>  <span class="token comment">// true</span>

<span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Number</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
n<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Number <span class="token comment">// true</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> elaine <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">'elaine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>elaine<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span> <span class="token comment">// People</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>说白了，它的作用就是告诉你，谁创造了你。</p>
<p>我的记忆方法是 谁构造了你，即谁生了你，即母亲生你，即构造函数（构造器）即母亲，而原型（prototype）则是父亲，你的财富来源于你的父亲（比喻不太洽淡，我想说的是继承）</p>
<p>但是它是不可靠的，因为可以改变他的指针，除了 String，Number，Boolean 等只读的原生构造函数，其他的都可以被改变，举个例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">People</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
func<span class="token punctuation">.</span>constructor <span class="token operator">=</span> People
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>constructor <span class="token operator">===</span> People<span class="token punctuation">)</span> <span class="token comment">// true</span>
<span class="token comment">// javascript 可以动态赋值，所有的引用对象都不靠谱，因为都能被动态替换掉值</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>注意：ES6中的 <code>Class</code> 中有个constructor() 方法，是另一码事</p>
<h2 id="构造函数实例上的方法——hasownproperty" tabindex="-1"><a class="header-anchor" href="#构造函数实例上的方法——hasownproperty" aria-hidden="true">#</a> 构造函数实例上的方法——hasOwnProperty</h2>
<p>介绍：这个对象是否有它自身的属性或方法</p>
<p>一般用法: <code>obj.hasOwnProperty('XX')</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 创建一个空对象</span>
foo<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'johan'</span> <span class="token comment">// 给 foo对象 动态赋值</span>
foo<span class="token punctuation">.</span><span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'age'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'sayHello'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span><span class="token string">'toStrig'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>解读：如果本身有这个属性或者方法，用 <code>hasOwnProperty</code> 就能检测出，它能区别 <code>自身属性与继承属性</code></p>
<p>在之前一章中我们谈到如何深拷贝时，我们就用到了它，用它遍历对象的所有自身属性</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 截取深拷贝中的一段</span>
<span class="token keyword">function</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token parameter">source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> target <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 如果目标对象是对象的话</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> prop <span class="token keyword">in</span> source<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>source<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepClone</span><span class="token punctuation">(</span>source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            target<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> source<span class="token punctuation">[</span>prop<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> target
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>两个对象做对比</p>
<p>isDeepEqual</p>
<p>defineProperty</p>
<p>它的特性，vue就是利用了这个属性来做双向数据绑定的</p>
</template>
