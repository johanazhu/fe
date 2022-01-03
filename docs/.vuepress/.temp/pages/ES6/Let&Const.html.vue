<template><h1 id="let-和-const" tabindex="-1"><a class="header-anchor" href="#let-和-const" aria-hidden="true">#</a> let 和 const</h1>
<p>https://www.cnblogs.com/zhuzhenwei918/p/6131345.html</p>
<p>我用了两个月的时间才理解 let</p>
<p>https://zhuanlan.zhihu.com/p/28140450</p>
<p>块级作用域和暂时性死区。</p>
<p>之前的var变量，会有变量提升的概念。即你在任何处用var定义变量，一开始js引擎会将其变量置位顶部（以 <code>undefined</code> 的形式，再执行到赋值时，再赋值）</p>
<p>但是用let、const 声明的变量，则不会有变量提升的概念，在定义let之前，不能调用let声明的变量，不然会报错，在块级作用域的开始到let声明的前一行，这块区域被称为<code>暂时性死区</code></p>
<p>变量提升和暂时性死区</p>
<p>var会变量提升</p>
<p>function会函数提升</p>
<p>函数提升的优先级大于变量提升</p>
<p>let、const会引起暂时性死区</p>
<p>为什么？</p>
<p>因为</p>
<p>变量提升和暂时性死区算feature(特性)还是bug</p>
<p>ES6规定，let/const 命令会使区块形成封闭的作用域。如在声明之前使用变量，就会报错。</p>
<p>总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。</p>
<p>这在语法上，称为“<strong>暂时性死区</strong>”（temporal dead zone，简称TDZ）</p>
<p>也就是说由let、const声明的变量，在使用之前，这些变量都是不可用的</p>
<p>var 声明的会在预编译阶段进行变量提升，并且赋值undefined</p>
<p>非表达式的函数也会进行函数声明，它的优先级大于var</p>
<p>阮一峰：</p>
<blockquote>
<p>ES6 规定暂时性死区和<code>let</code>、<code>const</code>语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。</p>
</blockquote>
<p>作用域</p>
<p>​</p>
<p>代码提升是在预编译阶段进行，而代码执行阶段</p>
<p>预编译阶段会做三件事</p>
<p>​	变量声明</p>
<p>​	变量声明并进行提升，但是值为 undefined</p>
<p>​	所有非表达式的函数声明进行提升（函数声明）</p>
<p><img src="https://i.loli.net/2021/06/04/9uaTpg7C3l8XxNb.png" alt="image-20210604173150466"></p>
<ol>
<li>当脚本开始运行，词法环境预先填充了所有的变量
<ul>
<li>最初，它们处于“未初始化（Uninitiallized）”状态。这是一种特殊的内部状态，这意味着引擎知道变量，但是在用 <code>let</code> 声明前，不能引用它。几乎就像变量不存在一样。</li>
</ul>
</li>
<li>然后 <code>let phrase</code> 定义出现了。它尚未被赋值，因此它的值为 <code>undefined</code> 。从这一刻起，我们就可以使用变量了。</li>
</ol>
<p>第一个阶段，就是暂时性死区</p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<p><a href="https://zh.javascript.info/closure" target="_blank" rel="noopener noreferrer">闭包<ExternalLinkIcon/></a></p>
</template>
