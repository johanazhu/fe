<template><h1 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>网络中有各种各样说闭包的文章，有些浅尝辄止，有些CV党，又有些只讲一部分。对我而言，要想了解闭包，需要掌握的知识点有 <code>词法环境(或者是ES中的变量对象)</code> 、<code>执行上下文与执行栈</code> 、 <code>(词法)作用域</code> 、 <code>作用域链</code> 等等。</p>
<p>好在我们在之前的已经梳理了这几块的内容：<RouterLink to="/JavaScript/%E4%BD%9C%E7%94%A8%E5%9F%9F.html">词法作用域</RouterLink>、<RouterLink to="/JavaScript/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83.html">词法环境</RouterLink>、<RouterLink to="/JavaScript/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%8E%E8%B0%83%E7%94%A8%E6%A0%88.html">执行上下文</RouterLink> 。接下来让我们揭开闭包的面纱，从外到内认清克利奥帕特拉七世（闭包）</p>
<h2 id="一句话解释" tabindex="-1"><a class="header-anchor" href="#一句话解释" aria-hidden="true">#</a> 一句话解释</h2>
<p>闭包就是一个绑定了执行环境的函数，它利用了词法作用域的特性，在函数嵌套时，内层函数引用外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包</p>
<h2 id="为什么要有闭包" tabindex="-1"><a class="header-anchor" href="#为什么要有闭包" aria-hidden="true">#</a> 为什么要有闭包？</h2>
<p>在讲闭包之前，我们不妨问自己一下，为什么会有它（这个概念），它解决了什么问题？</p>
<p>试想一下以下场景。你实现一个 web 应用，写了很多页面，同样引入了一些库和框架，自己又写了很多工具函数，当他们在一个（全局）作用域下，就会引发变量冲突问题（虽然我们强调命名规范问题，但实际开发总会遇到命名相同等问题）</p>
<p>假设你定义了一个变量a，一个函数b，直接写在全局环境下，这个模块实现了功能A。现在我们的程序需要开发功能B，你也想用变量a，函数b标识符来表示，那就尴尬了，因为已经在功能A上使用过，不能再使用，而如果不用变量a和函数b标识符来表示语义化上又不洽淡。</p>
<p>你也许想到了c、d两个名字，但是当你调试时，发现原来这两个标识符也已经被其他的工具函数使用过。</p>
<p>命名冲突的原因是因为 <strong>同作用域下已存在相同的变量名</strong>，要解决以上问题，就要从作用域上下手，</p>
<p>即——<strong>一个模块应该有自己的作用域，来保证模块的正常运行</strong></p>
<p>全局作用域肯定不行，我们只用函数作用域可以实现这一功能。所以<strong>闭包其实是利用了函数作用域实现的一种变量保护机制</strong></p>
<p>它的作用是<strong>对模块中变量的保护</strong>。即在函数作用域中写好代码后，将要使用的变量 return 语句暴露到外界</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">'私有变量，只能在 outer 中使用'</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'我是 outer 中的私有函数，只能在 outer 中使用'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">closureOuter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> closureOuter
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 我是 outer 中的私有函数，只能在 outer 中使用</span>
<span class="token comment">// 私有变量，只能在 outer 中使用</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>我们以这个 demo 为例，来说一说整个过程。因为词法作用域，外层函数不能访问内层函数的变量。所以函数 <code>outer</code> 外不能使用 <code>outer</code> 内的变量 <code>a</code> 和函数 <code>inner</code>。但是如果我们调用函数 <code>outer</code> 时赋值给 <code>bar</code> ，返回的是函数 <code>outer</code> 内的函数 <code>closureOuter</code> ，此时的 <code>bar</code> 指向函数  <code>closureOuter</code> ，函数 <code>closureOuter</code> 因为词法环境的原因，能访问变量 <code>a</code> 和函数 <code>inner</code> 。当调用 <code>bar</code> 时，执行函数 <code>clousureOuter</code> ，执行 <code>inner</code> 和打印变量 <code>a</code></p>
<p>我们也可以这样理解，<code>outer</code> 就是一个模块，它暴露 <code>closureOuter</code>  给外界，外界调用 <code>outer</code> 模块，能使用 <code>outer</code> 的变量，但是不能对内部的变量做修改（保护变量）</p>
<p>回到开头所说，为什么要有闭包，因为只有使用闭包才能实现对变量的保护，<strong>闭包其实是一个绑定了执行环境（执行上下文）的函数</strong></p>
<h2 id="各路大神对闭包的定义" tabindex="-1"><a class="header-anchor" href="#各路大神对闭包的定义" aria-hidden="true">#</a> 各路大神对闭包的定义：</h2>
<p>winter：</p>
<blockquote>
<p>闭包其实只是一个绑定了执行环境的函数</p>
<p>闭包与普通函数的区别是，它携带了执行环境，就像人在外星中需要自带吸氧的装备一样，这个函数也带有在程序中生存的环境</p>
<p>实际上 JavaScript 中跟闭包对应的概念就是“函数”</p>
</blockquote>
<p>候策</p>
<blockquote>
<p>函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包。</p>
</blockquote>
<p>黑客与画家</p>
<blockquote>
<p>闭包（lexical closure） 一个函数，通过它可以引用由包含这个函数的代码所定义的变量</p>
</blockquote>
<p>神三元</p>
<blockquote>
<p>闭包产生的本质就是，当前环境中存在指向父级作用域的引用</p>
</blockquote>
<p>MDN对闭包的定义为：</p>
<blockquote>
<p>闭包时指哪些能够访问自由变量的函数</p>
</blockquote>
<p>那什么是自由变量呢？</p>
<blockquote>
<p>自由变量是指在函数中使用的，但既不是函数参数也不是函数局部变量的变量</p>
</blockquote>
<p>由此，我们可以看出闭包共又两部分组成</p>
<blockquote>
<p>闭包 = 函数 + 函数能够访问的自由变量</p>
</blockquote>
<p>《你不知道的 JavaScript》</p>
<blockquote>
<p>闭包是基于词法作用域书写代码时所产生的自然结果，你甚至不需要为了利用它们而有意识地创建闭包。闭包的创建和使用在你的代码中随处可见。你缺少的是根据你自己的意愿来识别、拥抱和影响闭包的思维环境。</p>
</blockquote>
<p>李兵《浏览器工作原理与实践》</p>
<blockquote>
<p>在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。</p>
</blockquote>
<h2 id="闭包形成的原理" tabindex="-1"><a class="header-anchor" href="#闭包形成的原理" aria-hidden="true">#</a> 闭包形成的原理</h2>
<p>闭包的本质是利用函数作用域保护自由变量，并且返回了对被保护变量的引用，这种行为就是闭包</p>
<p>我们先快速复习一下这三个知识点：<RouterLink to="/JavaScript/%E4%BD%9C%E7%94%A8%E5%9F%9F.html">词法作用域</RouterLink>、<RouterLink to="/JavaScript/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83.html">词法环境</RouterLink>、<RouterLink to="/JavaScript/%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%8E%E8%B0%83%E7%94%A8%E6%A0%88.html">执行上下文</RouterLink> 。</p>
<p>词法作用域：词法作用域就是定义在词法阶段的作用域</p>
<p>词法环境：在代码编译阶段记录变量声明、函数声明、函数声明形参的合集？</p>
<p>执行上下文：调用函数时所带的所有信息</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>代码执行时，会将代码压入执行上下文栈中，等执行完再从上下文栈中弹出，函数和全局变量才能压入执行上下文栈，在压入函数时，会执行上下文中存储变量，等执行完后，弹出函数，释放变量；闭包是虽然你释放了外层的函数，但是你内层的函数被引用（一般赋值为一个变量），所以外层函数中的变量没有被释放，一直存在内存中，这就是闭包的原理</p>
<h2 id="函数声明" tabindex="-1"><a class="header-anchor" href="#函数声明" aria-hidden="true">#</a> 函数声明</h2>
<p>一个函数其实也是一个值，就像变量一样</p>
<p><strong>不同之处在于函数声明的初始化会被立即完成</strong></p>
<p>正常来说，这种行为仅适用于函数声明，而不适用于我们将函数分配给变量的函数表达式，例如 <code>let say = function(name)...</code>。</p>
<h2 id="内部和外部的词法环境" tabindex="-1"><a class="header-anchor" href="#内部和外部的词法环境" aria-hidden="true">#</a> 内部和外部的词法环境</h2>
<p>在一个函数运行时，在调用刚开始时，会自动创建一个新的词法环境以存储这个调用的局部变量和参数（相当于压入执行上下文栈中）</p>
<p><strong>当代码要访问一个变量时 —— 首先会搜索内部词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境。</strong></p>
<h2 id="闭包的用途及应用场景" tabindex="-1"><a class="header-anchor" href="#闭包的用途及应用场景" aria-hidden="true">#</a> 闭包的用途及应用场景</h2>
<p>用途：即重用一个变量，又保护变量不被污染的一种编程方法</p>
<p>闭包的应用场景：（1）函数作为返回值；（2）函数作为参数传递</p>
<p>注意到没有，无论是函数作为返回值，还是函数作为参数传递，本质都是函数在预编译时生成作用域，而只要这个函数使用了函数外的变量，调用完外层函数后，没有弹出执行上下文栈</p>
<p>就像上文中介绍，闭包是为了解决私有变量</p>
<p>在 ES6 的 class 没有之前，JavaScript只能借助闭包，在函数中赋值变量，并返回带有变量的函数，举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">counter</span><span class="token punctuation">(</span><span class="token parameter">initial</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token operator">=</span> initial <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">inc</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            x <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> c1 <span class="token operator">=</span> <span class="token function">counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c1<span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
c1<span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 2</span>
c1<span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 3</span>

<span class="token keyword">var</span> c2 <span class="token operator">=</span> <span class="token function">counter</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
c1<span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 11</span>
c1<span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 12</span>
c1<span class="token punctuation">.</span><span class="token function">inc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 13</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>在返回的对象中，实现了一个闭包，该闭包携带了局部变量<code>x</code> ，并且外部代码根本无法范文到变量<code>x</code> 。换句话说，闭包就是携带状态的函数，并且它的状态可以完全对外隐藏。</p>
<h3 id="私有实例变量" tabindex="-1"><a class="header-anchor" href="#私有实例变量" aria-hidden="true">#</a> 私有实例变量</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Car</span><span class="token punctuation">(</span><span class="token parameter">manufacturer<span class="token punctuation">,</span> model<span class="token punctuation">,</span> year<span class="token punctuation">,</span> color</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>manufacturer<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>model<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>year<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> car <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Car</span><span class="token punctuation">(</span><span class="token string">'Aston Martin'</span><span class="token punctuation">,</span><span class="token string">'V8 Vantage'</span><span class="token punctuation">,</span> <span class="token string">'2021'</span><span class="token punctuation">,</span> <span class="token string">'red'</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>car<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="函数式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a> 函数式编程</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">curry</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">===</span> fn<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
        args<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span>
        <span class="token keyword">return</span> inner
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token keyword">const</span> curriedAdd <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">curriedAdd</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 5</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>设计闭包（Closure）的初衷是为了解决什么问题？</p>
<p>闭包是函数式编程及其核心思想“Lambda 计算法”（Lambda Calculus）的必备基础设定</p>
<p>闭包能做什么？</p>
<p>https://juejin.im/post/6844903769646317576#heading-10</p>
<h3 id="面向事件编程" tabindex="-1"><a class="header-anchor" href="#面向事件编程" aria-hidden="true">#</a> 面向事件编程</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> $ <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">BACKGROUND_COLOR</span> <span class="token operator">=</span> <span class="token string">'rgba(200, 200, 242, 1)'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">onClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>background <span class="token operator">=</span> <span class="token constant">BACKGROUND_COLOR</span>
<span class="token punctuation">}</span>

<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> onClick<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="模块化" tabindex="-1"><a class="header-anchor" href="#模块化" aria-hidden="true">#</a> 模块化</h3>
<p>在以下示例中，所有实现细节都隐藏在立即执行的函数表达式中。函数 <code>tick</code> 和 <code>toString</code> 关闭它们完成工作所需的私有状态和函数。闭包使我们能够模块化和封装我们的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> namespace <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">function</span> <span class="token function">format</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">trunc</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        numbers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">function</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> numbers<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>format<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    n<span class="token punctuation">.</span>counter <span class="token operator">=</span> <span class="token punctuation">{</span>
        tick<span class="token punctuation">,</span>
        toString
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>namespace<span class="token punctuation">)</span>

<span class="token keyword">const</span> counter <span class="token operator">=</span> namespace<span class="token punctuation">.</span>counter<span class="token punctuation">;</span>
counter<span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
counter<span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="闭包的延伸" tabindex="-1"><a class="header-anchor" href="#闭包的延伸" aria-hidden="true">#</a> 闭包的延伸</h2>
<h3 id="柯里化函数" tabindex="-1"><a class="header-anchor" href="#柯里化函数" aria-hidden="true">#</a> 柯里化函数</h3>
<h3 id="函数式编程-1" tabindex="-1"><a class="header-anchor" href="#函数式编程-1" aria-hidden="true">#</a> 函数式编程</h3>
<h3 id="redux-thunk的源码" tabindex="-1"><a class="header-anchor" href="#redux-thunk的源码" aria-hidden="true">#</a> redux-thunk的源码</h3>
<p>执行外层函数，外层函数压入执行栈中，调用它时返回一个函数，这个函数被调用着，所以能保持状态（没有释放）</p>
<p>前提：内层函数调用外层函数中的变量。因为使用着外层函数中的变量，所以无法释放</p>
<p>为什么无法释放？执行上下文栈在调用着</p>
<p>闭包住的函数，调用，闭包函数内部的变量变化，调用完后，退出执行上下文栈，此时，内部的变量已经变化了</p>
<p>这也是闭包的特性：改变函数内部的变量</p>
<p>最简单的闭包例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    
    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">return</span> bar<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 —— 这就是闭包</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>垃圾回收器会释放不在使用的内存空间，</p>
<p>闭包会阻止这件事发生。事实上内部作用域依然存在，因此没有被回收。谁在使用这个内部作用域？原来是 bar() 本身在使用</p>
<p>这个函数在定义时的词法作用域意外的地方被调用。闭包使得函数可以继续访问定义时的词法作用域</p>
<p>无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包</p>
<p>本质上无论何时何地，如果将（访问它们各自词法作用域的）函数当作第一 级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、 Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使 用了回调函数，实际上就是在使用闭包</p>
<h3 id="图解闭包" tabindex="-1"><a class="header-anchor" href="#图解闭包" aria-hidden="true">#</a> 图解闭包</h3>
<p>我们看这个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bar <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>EC：</p>
<p>GlobalContext</p>
<p>变量对象（Varibale Object）：</p>
<p>bar</p>
<p>function foo</p>
<p>执行 <code>var bar = foo()</code> ，调用函数 foo()</p>
<p>往栈中push(fooContext)</p>
<p>EC:</p>
<p>fooContext</p>
<p>GlobalContext</p>
<p>变量对象（Varibale Object）</p>
<p>var a</p>
<p>function () (匿名函数)</p>
<p>因为JS引擎在代码编译阶段就确定了它的作用域，我们能看到返回的匿名函数，使用了foo()上下文中的变量，所以foo()上下文不能被销毁</p>
<p>以执行上下文中的案例为例，我们稍作修改</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    
    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> bar
<span class="token punctuation">}</span>
<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 闭包的效果</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>如果说闭包的概念是 内部函数调用外部函数的变量，那么以下例子中的 <code>函数bar</code> 不就是 闭包吗</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>它属于广义上的闭包，但不是我们现实中使用的闭包</p>
<p>这句话（内部函数调用外部函数的变量）不够严谨</p>
<p>以前一说到闭包，很多人都会提到 <code>作用域链</code> (Scope Chain) ，同时会引出 VO（变量对象）和AO（活动对象）这些概念。但在这里，我却没怎么提到相关的关键字，这是为什么？因为版本不同，就好像winter在《重学前端》中所说：</p>
<p>直线</p>
<p>执行上下文在ES3中，包含三个部分</p>
<ul>
<li>scope：作用域，也常常被叫做作用域链</li>
<li>variable object：变量对象，用来存储变量的对象</li>
<li>this value： this值</li>
</ul>
<p>在ES5中，我们改进了命名方式，把执行上下文最初的三个部分改为下面这个样子。 在ES2018中，执行上下文又变成了这个样子，this值被归入lexical environment，但是增加了不少内容。 表达式部分：函数体 scope：作用域，也常常被叫做作用域链。 variable object：变量对象，用于存储变量的对象。 this value：this值。 lexical environment：词法环境，当获取变量时使用。 variable environment：变量环境，当声明变量时使用。 this value：this值。</p>
<p>https://zh.javascript.info/closure</p>
<p>闭包是指内部函数总是可以访问其所在的外部函数中声明的变量和参数，即使在其外部函数被返回（寿命终结）了之后</p>
<p>在 JavaScript 中，所有函数都是天生闭包的</p>
<p>也就是说：JavaScript 中的函数会自动通过隐藏的 <code>[[Environment]]</code> 属性记住创建它们的位置，所以它们都可以访问外部变量</p>
<p>通常，闭包是指使用一个特殊的属性<code>[[Environment]]</code> 来记录函数自身的创建时的环境的函数。它具体指向了函数创建时的词法环境</p>
<h3 id="用案例解释闭包" tabindex="-1"><a class="header-anchor" href="#用案例解释闭包" aria-hidden="true">#</a> 用案例解释闭包</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> globalA <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token parameter">nonlocalA</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>globalA<span class="token punctuation">)</span>
    <span class="token keyword">function</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nonlocalA<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> inner
<span class="token punctuation">}</span>
<span class="token keyword">let</span> innerA <span class="token operator">=</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> innerB <span class="token operator">=</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>调用outer()，意味着往执行上下文栈中压入栈，再生成新的词法环境，其中包含了变量 <code>nonlocalA</code>，<code>console.log</code>命令，以及 inner 函数。</p>
<p>再往下走，执行 <code>console.log(nonlocalA)</code>，再往执行上下文栈中压入，执行完之后释放</p>
<p>走到 function inner 函数时，因为 JavaScript 的作用域是词法作用域，所以它</p>
<p>最后返回 inner 函数</p>
<p>注意了，<strong>在函数运行时，在调用刚开始时，会自动创建一个新的词法环境以存储这个调用的局部变量和参数</strong>（参考<RouterLink to="/JavaScript/%E8%AF%8D%E6%B3%95%E7%8E%AF%E5%A2%83.html">词法作用域章</RouterLink>）</p>
<p>早期的闭包由<code>环境（执行环境、标识符列表）与表达式</code> 两部分组成</p>
<p>环境部分正好对应执行上下文中的词法环境与标识符列表</p>
<p>表达式部分则对应了JS中的函数体</p>
<p>所谓闭包其实就是一个自带了执行环境（由外层函数提供，即便外层函数销毁依旧可以访问）的特殊函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>fContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    Scope<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token constant">AO</span><span class="token punctuation">,</span> checkscopeContext<span class="token punctuation">.</span><span class="token constant">AO</span><span class="token punctuation">,</span> globalContext<span class="token punctuation">.</span><span class="token constant">VO</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>所以指向关系是当前作用域 --&gt; <code>checkscope</code>作用域--&gt; 全局作用域，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO（活动对象） 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，这就是闭包实现的<strong>关键</strong>。</p>
<p>即使上下文销毁了也没事，因为作用域会</p>
<p>每个方法（函数）在执行的时候都会创建一个新的执行上下文，同事也会创建它们自己的词法环境，每个方法的词法环境里有一个 <code>scope</code> 会保存（执行）它上一层的词法环境</p>
<p>词法作用域是代码编译阶段就决定好的，和函数是怎么调用的没有关系</p>
<p>闭包是静态作用域的自然延伸</p>
<p>因为我们用的是词法作用域，</p>
<p>你返回一个函数，但是我的作用域已经保存了参数</p>
<p>内部函数可以访问它们外部函数 foo 中的变量</p>
<p>真实的数据背存在该函数内部，该函数会再暴露除一个函数用来访问真实的数据</p>
<p>闭包有什么用？</p>
<p>闭包一方面存储 name、age 和 title，一方面让 temp 函数去操作这些变量，这就是闭包的全部作用</p>
<p>闭包是穷人的对象，对象是穷人的闭包</p>
<p><strong>「函数」和「函数内部能访问到的变量」（词法环境）的总和，就是一个闭包</strong></p>
<p>闭包是 JS 函数作用域的副产品</p>
<p>换句话说，正是由于 JS 的函数内部可以使用函数外部的变量，所以这段代码正好符合了闭包的定义。而不是 JS 故意要使用闭包</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://juejin.im/post/5a65cfa4f265da3e377c2491" target="_blank" rel="noopener noreferrer">说说我对JavaScript 闭包的理解<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zh.javascript.info/closure" target="_blank" rel="noopener noreferrer">变量作用域，闭包<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.cnblogs.com/xxcanghai/p/4991870.html" target="_blank" rel="noopener noreferrer">大部分人都会做错的经典JS闭包面试题<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://stackoverflow.com/questions/111102/how-do-javascript-closures-work" target="_blank" rel="noopener noreferrer">how-do-javascript-closures-work<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://fangyinghang.com/closures-in-js/" target="_blank" rel="noopener noreferrer">JS 中的闭包是什么？<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
