<template><h1 id="javascript语言精粹" tabindex="-1"><a class="header-anchor" href="#javascript语言精粹" aria-hidden="true">#</a> JavaScript语言精粹</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<blockquote>
<p>要是有所得罪请远离。本是出自一番好意，知识想显得粗浅技艺，那才是我们的初衷</p>
<p>——莎士比亚《仲夏夜之梦》</p>
</blockquote>
<h2 id="第一章-精华" tabindex="-1"><a class="header-anchor" href="#第一章-精华" aria-hidden="true">#</a> 第一章 精华</h2>
<blockquote>
<p>我不过略有一些讨人喜欢的地方而已，怎么会有什么迷人的魔力？</p>
<p>——莎士比亚《温莎的风流娘儿们》</p>
</blockquote>
<p>JavaScript 是一门 动态编程语言</p>
<p>优点：函数、弱类型、动态对象和对象字面量表示法（JSON）
缺点：全局变量</p>
<p>JavaScript 的函数是（主要）基于词法作用域（lexical scoping）的顶级对象。 JavaScript 是第一个成为主流的 Lambda 语言</p>
<p>强类型和弱类型
强类型允许编译器在编译时检测错误</p>
<p>原型继承是 JavaScript 中一个有争议的特性。 JavaScript 有一个无类型的（class-free）对象系统，在这个系统中，对象直接从其他对象继承属性。</p>
<h2 id="第二章-语法" tabindex="-1"><a class="header-anchor" href="#第二章-语法" aria-hidden="true">#</a> 第二章 语法</h2>
<blockquote>
<p>我很熟悉它，早就在文法书上念过了。</p>
<p>——莎士比亚《泰德斯-安德为尼克斯》</p>
</blockquote>
<p>以下的值被当做假（false）
false
null
undefined
空字符串
数字 0
数字 NaN</p>
<p>其他所有的值都被当做 真，包括 true、字符串“false”，以及所有的对象</p>
<p>return 语句会导致从函数中提前返回。它也可以指定要返回的值。如果没有指定返回表达式，那么返回值是 undefined</p>
<h4 id="表达式" tabindex="-1"><a class="header-anchor" href="#表达式" aria-hidden="true">#</a> 表达式</h4>
<p>最简单的表达式是字面量值（比如字符串或者数字）、变量、内置的值（true、false、null、undefined、NaN和Infinity）、以 new 开头的调用表达式、以 delete 开头的属性提取表达式、包括圆括号中的表达式、以一个前置运算符作为前导的表达式，或者表达式后面跟着：</p>
<ul>
<li>一个中置运算符与另一个表达式；</li>
<li>三元运算符 ？ 后面跟着另一个表达式，后面接一个 : ，再然后接着第3个表达式；</li>
<li>一个函数调用；</li>
<li>一个属性提取表达式</li>
</ul>
<p>三元运算符 ？ 有3个运算数。如果第一个运算数值为真，产生第2个运算数的值。但如果第一个运算数值为假，则产生第3个运算数的值。</p>
<p>运算符优先级</p>
<table>
<thead>
<tr>
<th>. [] ( )</th>
<th>提取属性与调用函数</th>
</tr>
</thead>
<tbody>
<tr>
<td>delete new typeof + - !</td>
<td>一元运算符</td>
</tr>
<tr>
<td>* / %</td>
<td>乘法、除法、求余</td>
</tr>
<tr>
<td>+ -</td>
<td>加法/连接、减法</td>
</tr>
<tr>
<td>&gt;= &lt;= &gt; &lt;</td>
<td>不等式运算符</td>
</tr>
<tr>
<td>=== !==</td>
<td>等式运算符</td>
</tr>
<tr>
<td>&amp;&amp;</td>
<td>逻辑与</td>
</tr>
<tr>
<td>||</td>
<td>逻辑或</td>
</tr>
<tr>
<td>?：</td>
<td>三元</td>
</tr>
</tbody>
</table>
<p>typeof 运算符产生的值有‘number’、‘string’、‘boolean’、‘undefined’、‘function’和‘object’。如果运算数是一个数组或null，那么结果是'object'，这是不对的</p>
<h2 id="第三章-对象" tabindex="-1"><a class="header-anchor" href="#第三章-对象" aria-hidden="true">#</a> 第三章 对象</h2>
<blockquote>
<p>对于丑陋的事物，爱会闭目无视。</p>
<p>——莎士比亚《维洛那二绅士》</p>
</blockquote>
<p>Javascript 的简单数据类型包括数字、字符串、布尔值（true|false）、null值、underfined值、Symbol。其他所有的值都是对象。数字、字符串和布尔值“貌似”对象，因为它们拥有方法，但他们是不可变的。</p>
<p>Javascript 中的对象是可变的键控集合（keyed collections）。在Javascript中，数组是对象，函数是对象，正则表达式是对象，当然，对象自然也是对象。</p>
<p>对象是属性的容器，其中每一个属性都拥有名字和值。属性的名字可以是包括空字符串在内的任意字符串。属性值可以使除 undefined 值之外的任何值。</p>
<p>Javascript 包含一种原型链的特性，允许对象继承另一个对象的属性。正确地使用它能减少对象初始化时消耗的时间和内存。</p>
<p>对象：对象是“名/值”对的集合并有一个连到原型对象的隐藏连接。</p>
<h3 id="基本类型和引用类型" tabindex="-1"><a class="header-anchor" href="#基本类型和引用类型" aria-hidden="true">#</a> 基本类型和引用类型</h3>
<h4 id="基础类型" tabindex="-1"><a class="header-anchor" href="#基础类型" aria-hidden="true">#</a> 基础类型</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">'hanbo'</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> a<span class="token punctuation">;</span>
a <span class="token operator">=</span> <span class="token string">'fuchan'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment">// hanbo</span>
<span class="token comment">// </span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>引用类型</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> x <span class="token operator">=</span> stooge<span class="token punctuation">;</span>
x<span class="token punctuation">.</span>nickname <span class="token operator">=</span> <span class="token string">'Gurly'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> nick <span class="token operator">=</span> stooge<span class="token punctuation">.</span>nickname
<span class="token comment">// 因为 x 和 stooge 是指向同一个对象的引用，所以 nick 为 'Gurly'</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// a 、 b 和 c 每个都引用一个不同的空对象</span>
a <span class="token operator">=</span> b <span class="token operator">=</span> c <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// a 、 b 和 c 都引用同一个空对象</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>本质：</p>
<p>设计 js 类型的时候就设置成</p>
<p><strong>基本类型用的是栈，引用类型用的是堆</strong></p>
<h3 id="原型" tabindex="-1"><a class="header-anchor" href="#原型" aria-hidden="true">#</a> 原型</h3>
<p>每个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象都可以到Object.prototype，它是 JavaScript 中的标配对象。</p>
<p>当你创建一个新对象时，你可以选择某个对象作为它的原型。</p>
<p>原型连接在更新时不起作用。当我们对某个对象作出改变时，不会改变该对象的原型。</p>
<p>原型连接只有在检索值的时候才用到。当我们想获取对象的某个属性值，但该对象没有此属性名，那么 JavaScript 会试着从原型对象中获取属性值。如果那个原型对象也没有该属性，那么再从它的原型中寻找，依次类推，直到该过程最后到达终点 Object.prototype。如果想要的属性完全不存在于原型链中，那么结果就是 undefined 值。这个过程称为委托。</p>
<p>原型关系是一种动态的关系。如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> friend <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayHi</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'hi'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
friend<span class="token punctuation">.</span><span class="token function">sayHi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "hi"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>举个例子：</p>
<h4 id="构造函数模式" tabindex="-1"><a class="header-anchor" href="#构造函数模式" aria-hidden="true">#</a> 构造函数模式</h4>
<p>归纳式，也可以理解为图书馆分类式</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> job</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>job <span class="token operator">=</span> job
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> zhangsan <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token string">'屠夫'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> lisi <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'李四'</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token string">'肉贩'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'zhangsan'</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>job <span class="token operator">=</span> <span class="token string">'屠夫'</span>
<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
person1<span class="token punctuation">.</span><span class="token function">sayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// "zhangsan"</span>
<span class="token comment">// this 指谁，谁调用它就指谁，person1调用，this就指person1，它本身没有name，就沿着原型链往上找，找到Person定义的name</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h4>
<p>继承有多种方式</p>
<p>比如说工厂模式、构造函数模式、原型模式</p>
<p>单单说 构造函数模式，他的缺点是，每一个基于构造函数的实例对象。都会存下一份副本。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> job</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>job <span class="token operator">=</span> job
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">sayName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>人类是个集合，每个人都有自己的名字，年龄也各不相同，职业也不同，但是说名字这个方法是可以相同的，就是章口就来，名字是自己的（谁调用this指向谁）</p>
<p>几个还好，但是上万个上亿人用这个构造函数，性能就出问题了，每实例一次，内存开销一次，创建属性和方法，因为是各自独立的副本</p>
<p>而原型继承的特点可以弥补，它用来定义方法和共享的属性</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token class-name">Man</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>gender <span class="token operator">=</span> <span class="token string">'男人'</span><span class="token punctuation">;</span>
<span class="token class-name">Man</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayGender</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'我是男人'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> xiaoming <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Man</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
xiaoming<span class="token punctuation">.</span>gender <span class="token comment">// '男人'</span>
xiaoming<span class="token punctuation">.</span><span class="token function">sayGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//我是男人</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在创建 Man 函数（构造函数也是函数）时，内存只开销一次，</p>
<p>所有一般的继承是基于 构造函数+原型链。其作用是 优化性能，减少内存开销</p>
<p>其本质是 数学中的归纳</p>
<p>详细内容见第六章“原型链的分析”</p>
<h4 id="检查属性类型" tabindex="-1"><a class="header-anchor" href="#检查属性类型" aria-hidden="true">#</a> 检查属性类型</h4>
<p>typeof 操作符检查属性的类型</p>
<p>hasOwnProperty 如果对象拥有独有的属性，他会返回true，hasOwnProperty 犯法不会检查原型链</p>
<h4 id="减少全局变量污染" tabindex="-1"><a class="header-anchor" href="#减少全局变量污染" aria-hidden="true">#</a> 减少全局变量污染</h4>
<p>JavaScript 可以很随意地定义全局变量来容纳你的应用的所有资源。遗憾的是，全局变量削弱了程序的灵活性，应该避免使用。</p>
<p>最小化使用全局变量的方法之一是为你的应用只创建一个唯一的全局变量。</p>
<p>当然还有一种方法（减少全局污染）——闭包</p>
<h2 id="第四章-函数" tabindex="-1"><a class="header-anchor" href="#第四章-函数" aria-hidden="true">#</a> 第四章 函数</h2>
<blockquote>
<p>所有的过失在未犯以前，都已定下应处的惩罚。</p>
<p>——莎士比亚《一报还一报》</p>
</blockquote>
<p>函数包含一组语句，他们是 JavaScript 的基础模块单元，用于代码复用、信息隐藏和组合调用。函数用于指定对象的行为。一般来说，所谓编程， 就是讲一组需求分解成一组函数与数据结构的技能。</p>
<p><strong>编程 = 函数 + 数据结构</strong></p>
<p>函数中就有很多东西可以引申出来。</p>
<p>函数是JavaScript中的第一公民啊</p>
<p>https://www.zhihu.com/question/67652709</p>
<p>我感觉可以结合知乎上的大神对 这句话的评价</p>
<p>用引用的方式来表示</p>
<p>函数就是对象的一种</p>
<h4 id="函数对象" tabindex="-1"><a class="header-anchor" href="#函数对象" aria-hidden="true">#</a> 函数对象</h4>
<p>JavaScript 中的函数就是对象。对象是“名/值”对的集合并游泳一个连到原型对象的隐藏连接。</p>
<p>对象字面量产生的对象连接到 Object.prototype 。函数对象连接到 Function.prototype（该原型对象本身连接到 Object.prototype）。每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 对象字面量 创建 对象</span>
<span class="token keyword">var</span> <span class="token function-variable function">func</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 函数字面量 创建 函数对象</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>每个函数对象在创建时也随配有一个 prototype 属性。它的值是一个拥有 constructor 属性且值极为该函数的对象。这个隐藏连接到 Function.prototype 完全不同。</p>
<p>因为函数是对象，所以他们可以像任何其他的值一样被使用。函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其他函数，函数也可以再返回函数。而且，因为函数是对象，所以可以拥有方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">str</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 保存在变量中</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function-variable function">a</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token comment">// 保存在方法中</span>
<span class="token keyword">var</span> array <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">'zhangsan'</span><span class="token punctuation">,</span>
    <span class="token number">16</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span> <span class="token comment">// 保存到数组中</span>
<span class="token keyword">function</span> <span class="token function">father</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'当做参数的函数'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">father</span><span class="token punctuation">(</span>test<span class="token punctuation">)</span> <span class="token comment">// 函数当做参数传递给其他函数</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token keyword">function</span> <span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'返回我'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">test1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 函数返回函数，调用test1() 返回function() {console.log("返回我")} 匿名函数。再调用一次，就出结果。</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h4 id="函数字面量" tabindex="-1"><a class="header-anchor" href="#函数字面量" aria-hidden="true">#</a> 函数字面量</h4>
<p>函数对象通过函数字面量来创建</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个名为 add 的变量，并用来把两个数字相加的函数赋值给它</span>
<span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>将一个函数赋值给 add（字面量）</p>
<p>函数字面量有四个部分：</p>
<p>第一部分：保留字 function</p>
<p>第二部分：函数名，可以省略，省略的叫匿名函数（anonymous）</p>
<p>第三部分：包括在圆括号中的一组参数。多个参数用逗号分隔。这些参数的名称将被定义为函数中的变量</p>
<p>第四部分：包括在花括号中的一组语句。这些语句是函数的主题，他们在函数被调用时执行。</p>
<p>函数字面量可以出现在任何允许表达式出现的地方。</p>
<p>函数也可以被定义在其他函数中。一个内部函数除了可以访问自己的参数和变量，同时它也能自由访问把它嵌套在其中的父函数的参数和变量。通过函数字面量创建的函数对象包含一个连到外部上下文的连接。这被称为闭包（closure）。它是JavaScript强大表现力的来源。详细请进闭包篇。</p>
<h4 id="调用" tabindex="-1"><a class="header-anchor" href="#调用" aria-hidden="true">#</a> 调用</h4>
<p>调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数（形参），每个函数还接受两个附加的参数：this 和 arguments。参数 this 在面向对象编程中非常重要，它的值取决于调用的模式。</p>
<p>在JavaScript中一共有六种调用模式。方法调用模式、函数调用模式、构造函数调用模式、apply，bind，call调用模式、箭头函数调用模式，还要一种忘记了</p>
<p>调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号。圆括号内可包含零个或多个用逗号隔开的表达式。每个表达式产生一个参数值。每个参数值被赋予函数声明时定义的形式参数名。当实际参数（arguments）的个数与形式参数（parameters）的个数不匹配时，不会导致运行时错误（javascript就是骚，ts会报错）。如果实际参数值过多，超出的参数值会被忽略。如果实际参数值过少，缺失的值会被替换为 undefined。对参数值不会进行类型检查：任何类型的值都可以被传递给任何参数。</p>
<p>回过头来说六种调用模式：</p>
<h5 id="方法调用模式" tabindex="-1"><a class="header-anchor" href="#方法调用模式" aria-hidden="true">#</a> 方法调用模式</h5>
<p>即当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this 被绑定到该对象。</p>
<p>(ps:方法即函数在对象内部中的一个属性)</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
	value<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token function-variable function">increment</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">inc</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">+=</span> <span class="token keyword">typeof</span> inc <span class="token operator">===</span> <span class="token string">'number'</span> <span class="token operator">?</span> inc <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
myObject<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 1</span>

myObject<span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myObject<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 3</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="函数调用模式" tabindex="-1"><a class="header-anchor" href="#函数调用模式" aria-hidden="true">#</a> 函数调用模式</h5>
<p>当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
<span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// sum 的值为 7。</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>在笔者看来，函数调用模式就是放在全局中</p>
<p>以此模式调用函数时，this 被绑定到全局对象上。这其实是JavaScript 语言设计上的一个bug。我们首先模拟一下按照人的思维所希望的结果——当内部函数被调用时，this应该仍然绑定到外部函数的this变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="构造器调用模式" tabindex="-1"><a class="header-anchor" href="#构造器调用模式" aria-hidden="true">#</a> 构造器调用模式</h5>
<p>JavaScript 是一门基于原型继承的语言。这意味着对象可以直接从其他对象继承属性。该语言是无类型的。</p>
<p>new</p>
<p>如果再一个函数前面带上 new 来调用，那么背地里将会创建一个连接到该函数的 prototype 成员的新对象，同时 this 会绑定到那个新对象上。</p>
<p>手写new</p>
<h4 id="apply-调用" tabindex="-1"><a class="header-anchor" href="#apply-调用" aria-hidden="true">#</a> apply 调用</h4>
<p>apply 方法让我们创建一个参数数组传递给调用函数。它也允许我们选择 this 的值</p>
<p>bind，call调用</p>
<p>手写</p>
<h4 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h4>
<p>当函数被调用时，会得到一个&quot;免费&quot;配送的参数，那就是 arguments 数组。函数可以通过此参数访问所有它调用时传递给它的参数列表，包括哪些没有被分配给函数声明时定义的形式参数的多余参数。</p>
<p>个人感觉在 源码中比较常见</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> i<span class="token punctuation">,</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	sum <span class="token operator">+=</span> arguments<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 108</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>这里要多提一句，arguments 是语言设计种的错误。它并不是一个真正的数组。它只是一个“类似数组（array-like）”的对象。arguments 拥有一个 length 属性，但它没有任何数组的方法。</p>
<p>数组和类数组的区别在哪里？</p>
<p>我的理解：数组继承自Array.prototype 它有 原型上的属性和方法。实例化后就能直接用，但是类数组只是结构上像数组，但却没有数组该有的东西。可以这么说，类数组长得和数组像，但它不是数组。</p>
<h4 id="返回" tabindex="-1"><a class="header-anchor" href="#返回" aria-hidden="true">#</a> 返回</h4>
<p>当一个函数被调用时，它从第一个语句开始执行，并在遇到关闭函数体的 } 时结束。然后函数把控制权交还给调用该函数的程序</p>
<p>return 语句可用来使函数提前返回。当 return 被执行时，函数立即返回而不再执行余下的语句</p>
<p>一个函数总是会返回一个值。如果没有特定的返回值，则返回 undefined</p>
<p>我们在chrome中调试时，常常会写这样的语句：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'hello, world'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 返回的结果往往是：</span>
<span class="token comment">// hello,world</span>
<span class="token comment">// undefined</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这正是因为 没有 return，导致他默认返回 undefined</p>
<h4 id="作用域" tabindex="-1"><a class="header-anchor" href="#作用域" aria-hidden="true">#</a> 作用域</h4>
<p>作用域控制着变量与参数的可见性及生命周期。对它能减少名字冲突，并且提供自动内存管理。</p>
<p>静态作用域——动态作用域</p>
<p>重学前端中的知识。</p>
<p>块级作用域</p>
<h4 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h4>
<p>作用域的好处是内部函数可以访问定义他们的外部函数的参数和变量（除了this和arguments）</p>
<h4 id="回调" tabindex="-1"><a class="header-anchor" href="#回调" aria-hidden="true">#</a> 回调</h4>
<h4 id="模块" tabindex="-1"><a class="header-anchor" href="#模块" aria-hidden="true">#</a> 模块</h4>
<p>我们可以使用函数和闭包来构造模块。模块是一个提供接口却隐藏状态与实现的函数或对象。通过使用函数产生模块，我们可以摒弃全局变量的使用。</p>
<p>立即执行函数</p>
<h4 id="链式" tabindex="-1"><a class="header-anchor" href="#链式" aria-hidden="true">#</a> 链式</h4>
<p>有一些方法没有返回值。例如，一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。</p>
<h4 id="柯里化" tabindex="-1"><a class="header-anchor" href="#柯里化" aria-hidden="true">#</a> 柯里化</h4>
<p>函数也是值，从而我们可以用有趣的方式去操作函数值。柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数。</p>
<p>。。。</p>
<p>那么我有疑问了，既然讲到了 函数，就不得不提 es6 中的 class</p>
<p>总结函数：</p>
<p>说话函数的最后，你只用记住一句话：再JavaScript种函数是第一公民</p>
<h2 id="第五章-继承" tabindex="-1"><a class="header-anchor" href="#第五章-继承" aria-hidden="true">#</a> 第五章 继承</h2>
<blockquote>
<p>往往会把一件完整的东西化为无数的形象。就像凹凸镜一般，从正面望去，只见一片模糊。</p>
<p>——莎士比亚《查理二世》</p>
</blockquote>
<p>在基于类的语言中，对象是类的实例，并且类可以从另一个类继承。JavaScript 是一门基于原型的语言，这意味着对象直接从其他对象继承</p>
<h4 id="伪类" tabindex="-1"><a class="header-anchor" href="#伪类" aria-hidden="true">#</a> 伪类</h4>
<p>模拟类的形式来做继承，我没太看懂</p>
<p>javascript 语言精粹第60页</p>
<h4 id="原型-1" tabindex="-1"><a class="header-anchor" href="#原型-1" aria-hidden="true">#</a> 原型</h4>
<p>在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承相比基于类的继承在概念上更为简单：一个新对象可以继承一个旧对象的属性。</p>
<p>在某种意义上，一个内部作用域会继承它的外部作用域</p>
<h2 id="第六章-数组" tabindex="-1"><a class="header-anchor" href="#第六章-数组" aria-hidden="true">#</a> 第六章 数组</h2>
<blockquote>
<p>你这披着羊皮的狼，我要把你赶走。</p>
<p>——莎士比亚《亨利六世上篇》</p>
</blockquote>
<h4 id="容易混淆的地方" tabindex="-1"><a class="header-anchor" href="#容易混淆的地方" aria-hidden="true">#</a> 容易混淆的地方</h4>
<p>JavaScript 本身对于数组和对象的区别是混乱的。 typeof 运算符报告数组的类型是 ‘object’ ，这没有任何意义</p>
<p>JavaScript 没有一个好的机制来区别数组和对象。我们可以通过定义自己的 is_array 函数来弥补这个缺陷：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">is_array</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> value <span class="token operator">&amp;&amp;</span>
        <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span>
        value<span class="token punctuation">.</span>constructor <span class="token operator">===</span> <span class="token string">'Array'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>遗憾的是，它在识别从不同的窗口（window）或帧（iframe）里构造的数组时会失败。有一个更好的方法去判断一个对象是否是数组：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">is_array</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'[object Array]'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="第七章-正则表达式" tabindex="-1"><a class="header-anchor" href="#第七章-正则表达式" aria-hidden="true">#</a> 第七章 正则表达式</h2>
<blockquote>
<p>相反地，宣导一个称心如意的配偶，就能百年谐合，幸福无穷。我们不应该选谁来陪亨利国王，他作为一国之君</p>
<p>——莎士比亚《亨利六世》</p>
</blockquote>
<h2 id="第八章-方法" tabindex="-1"><a class="header-anchor" href="#第八章-方法" aria-hidden="true">#</a> 第八章 方法</h2>
<blockquote>
<p>他虽疯，但却有他的一套理论。</p>
<p>——莎士比亚《丹麦王子，哈姆雷特的悲剧》</p>
</blockquote>
<p>JavaScript 包含了一套小型的可用在标准类型上的标准方法集。</p>
<h4 id="array" tabindex="-1"><a class="header-anchor" href="#array" aria-hidden="true">#</a> Array</h4>
<h5 id="array-concat-item" tabindex="-1"><a class="header-anchor" href="#array-concat-item" aria-hidden="true">#</a> array.concat(item...)</h5>
<p>concat 方法产生一个新数组，它包含一份 array 的浅复制（shallow copy）并把一个或多个参数 item 附加在气候。如果参数 item 是一个数组，那么它的每个元素会被分别添加。与它功能类似的 array.push(item...)方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'x'</span><span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">,</span> <span class="token string">'z'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token comment">// c 变成 ['a', 'b', 'c', 'x', 'y', 'z', true]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="第九章-代码风格" tabindex="-1"><a class="header-anchor" href="#第九章-代码风格" aria-hidden="true">#</a> 第九章 代码风格</h2>
<blockquote>
<p>好一串嘟嘟囔囔的头衔！</p>
<p>——莎士比亚《亨利六世上篇》</p>
</blockquote>
<h2 id="第十章-优美的特性" tabindex="-1"><a class="header-anchor" href="#第十章-优美的特性" aria-hidden="true">#</a> 第十章 优美的特性</h2>
<blockquote>
<p>我让你的脚玷污我的嘴唇，让你的肖像玷污我的眼睛，让你的每一部分玷污我的心，等候着你的答复。你的最忠实的...</p>
<p>——莎士比亚《空爱一场》</p>
</blockquote>
<p>精简的 JavaScript 里都是好东西，包括以下主要内容</p>
<h5 id="函数是顶级对象" tabindex="-1"><a class="header-anchor" href="#函数是顶级对象" aria-hidden="true">#</a> 函数是顶级对象</h5>
<p>​	在精简 JavaScript 中，函数是有词法作用域的闭包（lambda）</p>
<h5 id="基于原型继承的动态对象" tabindex="-1"><a class="header-anchor" href="#基于原型继承的动态对象" aria-hidden="true">#</a> 基于原型继承的动态对象</h5>
<p>​	对象是无类别的。我们可以通过普通的赋值给任何对象添加一个新成员属性。一个对象可以从另一个对象继承成员属性。</p>
<h5 id="对象字面量和数组字面量" tabindex="-1"><a class="header-anchor" href="#对象字面量和数组字面量" aria-hidden="true">#</a> 对象字面量和数组字面量</h5>
<p>​	这对创建新的对象和数组来说是一个非常方便的表达法。JavaScript字面量是数据交换格式 JSON 的灵感之源。其实字面量表达也是一种语法糖</p>
<h2 id="附录a-毒瘤" tabindex="-1"><a class="header-anchor" href="#附录a-毒瘤" aria-hidden="true">#</a> 附录A 毒瘤</h2>
<blockquote>
<p>那会在一言一行中证明其可怕</p>
<p>——莎士比亚《泰尔亲王佩里克里斯》</p>
</blockquote>
<h4 id="全局变量" tabindex="-1"><a class="header-anchor" href="#全局变量" aria-hidden="true">#</a> 全局变量</h4>
<p>共有 3 中方法定义全局变量。第一种是在任何函数之外放置一个 var 语句：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>	<span class="token keyword">var</span> foo <span class="token operator">=</span> value；
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>第 2 种是直接给全局对象添加一个属性。全局对象是所有全局变量的容器。在 Web 浏览器里，全局对象名为window，在Node里就是global</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>foo <span class="token operator">=</span> value<span class="token punctuation">;</span>
global<span class="token punctuation">.</span>foo <span class="token operator">=</span> value<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>第 3 中是直接使用未经声明的变量，这被称为隐式的全局变量；</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>foo <span class="token operator">=</span> value
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>新手比较常见，导致不容易找bug</p>
<h3 id="作用域-1" tabindex="-1"><a class="header-anchor" href="#作用域-1" aria-hidden="true">#</a> 作用域</h3>
<p>javaScript 的语法来源于C。在所有其他类似C语言风格的语言里，一个代码块（括在一对花括号中的一组语句）会创造一个作用域。代码块中声明的变量在其外部是不可见的。JavaScript 采用了这样的块语法，却没有提供块级作用域：代码块中声明的变量在包含此代码块的函数的任何位置都是可见的。</p>
<p>在大多数语言中，一般来说，声明变量的最好的地方是在第一次用到它的地方。但这种做法在 JavaScript 里反而是一个坏习惯，因为它没有块级作用域。更好的方法是在每个函数的开头部分声明所有变量</p>
<p>后面的糟粕什么的就不多谈了</p>
</template>
