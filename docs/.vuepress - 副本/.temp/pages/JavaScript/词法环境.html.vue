<template><h1 id="词法环境-lexical-environment" tabindex="-1"><a class="header-anchor" href="#词法环境-lexical-environment" aria-hidden="true">#</a> 词法环境（Lexical Environment）</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>在说一个概念前，我们需要确定它的前提，此文以ECMAScript5为基础撰写</p>
<h2 id="一句话解释" tabindex="-1"><a class="header-anchor" href="#一句话解释" aria-hidden="true">#</a> 一句话解释</h2>
<p>词法环境就是在 JavaScript 代码执行时记录变量声明、函数声明、函数声明的形参的合集</p>
<h2 id="javascript-的编译过程" tabindex="-1"><a class="header-anchor" href="#javascript-的编译过程" aria-hidden="true">#</a> JavaScript 的编译过程</h2>
<p>在介绍 <code>词法环境</code> 前，我们先看下在 V8 里 JavaScript 的编译执行过程，大致分为三个阶段</p>
<p>第一步：V8 引擎刚拿到 <code>执行上下文</code> 的时候，会把代码从上到下一行一行的先做分词/词法分析(Tokenizing/Lexing)。分词是指：比如 <code>var a = 2;</code> 这段代码，会被分词为：<code>var</code> <code>a</code> <code>2</code>和<code>;</code>这样的原子符号(atomic token)；词法分析是指：登记变量声明、函数声明、函数声明的形参</p>
<p>第二步：在分词结束以后，会做代码解析，引擎将 token 解析翻译成一个AST(抽象语法树)， 在这一步的时候，如果发现语法错误，就会直接报错不会再往下执行</p>
<p>第三步：引擎生成CPU可以执行的机器码</p>
<p>在第一步里有个词法分析，它用来登记变量声明、函数声明、函数声明的形参，后续代码执行的时候就知道去哪里拿变量的值和函数了，这个登记的地方就是<code>Lexical Environment(词法环境)</code> (抄自<a href="https://limeii.github.io/2019/05/js-lexical-environment/" target="_blank" rel="noopener noreferrer">深入理解JavaScript-词法环境<ExternalLinkIcon/></a>)</p>
<p><strong>总结起来：引擎会在解释 JavaScript 代码之前首先对其进行编译。编译器的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来</strong></p>
<p>这段执行生命周期内容有误</p>
<p>我们先升到一万米高空，看一下整个 JavaScript 的执行生命周期</p>
<p>JavaScript 的执行生命周期分成两个阶段，<strong>编译阶段</strong>和<strong>执行阶段</strong></p>
<ul>
<li>
<p>编译阶段由编译器完成，它将代码翻译成可执行代码，这个阶段能知道<strong>全部标识符</strong>在哪里、如何声明的以及<strong>作用域规则</strong></p>
<ul>
<li>编译阶段进行变量声明</li>
<li>编译阶段变量声明进行提升，但是指为 undefined</li>
<li>编译阶段所有非表达式的函数声明进行提升</li>
</ul>
</li>
<li>
<p>代码执行阶段即执行可运行代码，生成执行上下文，这部分由引擎完成</p>
<ul>
<li>负责 <code>变量赋值</code> ，<code>函数引用</code> 以及<code>执行代码</code></li>
</ul>
</li>
</ul>
<p>（PS：对 JavaScript 而言，大部分情况下编译发生在代码执行前的几微秒）</p>
<p><img src="https://i.loli.net/2021/06/09/O9gCBRYSIwbnpxW.png" alt="词法环境"></p>
<p>我们要说的 <code>词法环境</code> 就是在编译阶段负责收集的”容器“</p>
<p>PS：JavaScript 采用的是词法作用域（静态作用域），所以词法环境是与我们所写的代码结构相对应，换句话说，我们将代码写成什么样，词法环境就是怎么样子。词法环境是在代码定义的时候决定的，跟代码在哪里调用没有关系。</p>
<h2 id="词法环境由什么组成" tabindex="-1"><a class="header-anchor" href="#词法环境由什么组成" aria-hidden="true">#</a> 词法环境由什么组成</h2>
<p>词法环境的内部有两部分组成：<strong>环境记录器（Environment Record）</strong>、<strong>对外部环境的引用（outer）</strong></p>
<ol>
<li>环境记录器记录存储变量、函数声明以及函数声明的形参</li>
<li>外部环境的引用意味着它可以访问其父级词法环境（作用域）</li>
</ol>
<p>环境记录器又分为两种</p>
<ol>
<li>
<p><strong>声明式环境记录（Declarative Environment Record）</strong>：用来记录直接有标识符定义的元素，比如变量、常量、let、class、module、import以及函数声明。</p>
</li>
<li>
<p><strong>对象式环境记录（Object Environment Record）</strong>：主要用于with和global的词法环境。</p>
</li>
</ol>
<p>其中 <strong>声明式环境记录（Declarative Environment Record）</strong>，又分为两种类型：</p>
<ul>
<li><strong>函数环境记录（Function Environment Record）</strong>：用于函数作用域。</li>
<li><strong>模块环境记录（Module Environment Record）</strong>：模块环境记录用于体现一个模块的外部作用域，即模块export所在环境。</li>
</ul>
<p>我们做一个分类图，更加具象的认知词法环境所包含的东西</p>
<p><img src="@source/.vuepress/public/images/JavaScript/词法环境.png" alt="原型"></p>
<p>环境记录器很好理解，无非就是变量集合，那什么是outer呢</p>
<p>在之前介绍 <RouterLink to="/JavaScript/%E4%BD%9C%E7%94%A8%E5%9F%9F.html">作用域</RouterLink> 的文章中我们曾经总结过：JavaScript 的作用域是词法作用域，它由函数在那里定义有关，与它在如何被调用无关</p>
<p><strong>而 outer 就是指向词法环境的父级词法环境（作用域）</strong> （仅代表自己的理解）</p>
<p>我们举个例子来看一下词法环境的构成元素：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    
    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">*</span> b<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>它的词法作用域关系图如下：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/词法作用域-example.png" alt="原型"></p>
<p>更加具象的关系图如下：</p>
<p><img src="@source/.vuepress/public/images/JavaScript/词法环境-词法作用域example.png" alt="原型"></p>
<p>我们也可以用伪代码来模拟上面代码的词法环境：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 全局词法环境</span>
GlobalEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span>
    outer<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 全局环境的外部环境引用为null</span>
    GlobalEnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 全局 this 绑定指向全局对象</span>
        <span class="token punctuation">[</span><span class="token punctuation">[</span>GlobalThisValue<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> ObjectEnvironmentRecord<span class="token punctuation">[</span><span class="token punctuation">[</span>BindingObject<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 声明式环境记录，除了全局函数和 var ，其他声明都绑定在这里</span>
        DeclarativeEnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// 对象式环境记录，绑定对象为全局对象</span>
        ObjectEnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
            a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            foo<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span> <span class="token operator">>></span><span class="token punctuation">,</span>
            baz<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span> <span class="token operator">>></span><span class="token punctuation">,</span>
            isNaN<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span> <span class="token operator">>></span><span class="token punctuation">,</span>
            isFinite<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span><span class="token operator">>></span><span class="token punctuation">,</span>
            parseInt<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span><span class="token operator">>></span><span class="token punctuation">,</span>
            parseFloat<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span><span class="token operator">>></span><span class="token punctuation">,</span>
            Array<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> construct <span class="token keyword">function</span><span class="token operator">>></span><span class="token punctuation">,</span>
            Object<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> construct <span class="token keyword">function</span><span class="token operator">>></span><span class="token punctuation">,</span>
            <span class="token operator">...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//foo函数的词法环境</span>
fooFunctionEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span>
    outer<span class="token operator">:</span> GlobalEnvironment<span class="token punctuation">,</span> <span class="token comment">// 外部词法环境引用全局环境</span>
    FunctionEnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token punctuation">[</span>ThisValue<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> GlobalEnviroment<span class="token punctuation">,</span> <span class="token comment">// this绑定指向全局环境</span>
        bar<span class="token operator">:</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">function</span> <span class="token operator">>></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
    
<span class="token comment">// bar函数的词法环境</span>
barFunctionEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span>
    outer<span class="token operator">:</span> fooFunctionEnviroment<span class="token punctuation">,</span> <span class="token comment">// 外部词法环境引用foo函数词法环境</span>
    FunctionEnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
    	<span class="token punctuation">[</span><span class="token punctuation">[</span>ThisValue<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> GlobalEnviroment<span class="token punctuation">,</span> <span class="token comment">// this绑定指向全局环境</span>
  		b<span class="token operator">:</span> <span class="token number">2</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// baz函数的词法环境</span>
bazFunctionEnvironment <span class="token operator">=</span> <span class="token punctuation">{</span>
    outer<span class="token operator">:</span> GlobalEviroment<span class="token punctuation">,</span> <span class="token comment">// 外部词法环境引用指向全局环境</span>
    FuntionEnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token punctuation">[</span><span class="token punctuation">[</span>ThisValue<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">:</span> GlobalEnviroment<span class="token punctuation">,</span> <span class="token comment">// this绑定指向全局环境</span>
        a<span class="token operator">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><p>我们可以看出词法环境的两个重要组成部分，其中outer由作用域决定，环境记录器记录所有的变量，当在本词法环境中找不到变量时，就会引着outer往父级词法环境中找变量，这就形成了作用域链</p>
<h2 id="变量提升以及函数提升" tabindex="-1"><a class="header-anchor" href="#变量提升以及函数提升" aria-hidden="true">#</a> 变量提升以及函数提升</h2>
<p>就像我们之前所说，<strong>在编译阶段，包括变量和函数在内的所有声明都会在任何代码被执行前首先处理</strong></p>
<p>当你看到 <code>var a = 1;</code> 时，可能会认为这是一个声明。但 JavaScript 实际上会将其看成两个意思：<code>var a = undefined;</code> 和 <code>a = 2;</code> 。第一个定义声明在编译阶段进行。第二个赋值声明会<strong>被留在原地</strong>等待执行阶段。</p>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>在代码执行之前，即编译阶段：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>a <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>执行阶段：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="函数优先" tabindex="-1"><a class="header-anchor" href="#函数优先" aria-hidden="true">#</a> 函数优先</h3>
<p>函数声明和变量声明都会被提升。但是这个值得注意的细节是函数会首先被提升，然后才是变量。</p>
<p>例如下面的代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> foo<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><details>
    <summary>答案</summary>
    输出 1 而不是 undefined 或者 2
</details>
<p>这段代码会被引起理解为如下形式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// var foo 被忽略</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>注意，var foo 尽管出现在 function foo() ... 的声明之前，但它是重复的声明（因此被忽略了），因为函数声明会被提升到普通变量之前。</p>
<p>尽管重复的 var 声明会被忽略调，但出现在后面的函数声明还是可以覆盖前面的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><details>
    <summary>答案</summary>
    输出 3
</details>
<p>说到函数声明和变量声明，我们可以举出很多例子，例如这个例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar1'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><details>
    <summary>答案</summary>
    bar2
</details>
<p>调换顺序呢：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">bar</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar2'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'bar1'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><details>
    <summary>答案</summary>
    bar2
</details>
<p>本质上这些题目绕不开之前俺们说的原理：编译阶段进行函数、变量提升，执行阶段在原处执行代码。在编译阶段函数 <code>bar</code> 提升，执行阶段，bar赋值给function() {...}，输出结果 bar2</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>我们介绍了词法环境，从它是怎么产生，到它是什么（由什么组成），再到后面的函数、变量提升，总结最难写了</p>
<p>了解词法环境为我们下一节的 <RouterLink to="/JavaScript/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%8E%E8%B0%83%E7%94%A8%E6%A0%88.html">执行上下文与调用栈</RouterLink> 打下了基础</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://github.com/xitu/gold-miner/blob/master/TODO1/understanding-execution-context-and-execution-stack-in-javascript.md" target="_blank" rel="noopener noreferrer">理解 JavaScript 中的执行上下文和执行栈<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://limeii.github.io/2019/05/js-lexical-environment/" target="_blank" rel="noopener noreferrer">JS：深入理解JavaScript-词法环境<ExternalLinkIcon/></a></p>
</li>
<li>
<p>书：你不知道的JavaScript（上卷）</p>
</li>
</ul>
</template>
