<template><h1 id="函数式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a> 函数式编程</h1>
<p>函数式编程中非常重要的概念——纯函数（Pure Function）</p>
<p>简单来说，一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。简单来说，只有两点：</p>
<ul>
<li>函数的返回结果只依赖于它的参数</li>
<li>函数的执行过程里面没有副作用</li>
</ul>
<h3 id="函数的返回结果只依赖于它的参数" tabindex="-1"><a class="header-anchor" href="#函数的返回结果只依赖于它的参数" aria-hidden="true">#</a> 函数的返回结果只依赖于它的参数</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>foo</code> 函数不是一个纯函数，因为它返回的结果依赖于外部变量<code>a</code>，我们在不知道 <code>a</code> 的值的情况下，并不能保证 <code>foo(2)</code> 的返回值是 3。返回值是不可预测的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>现在的 <code>foo</code> 的返回值只依赖于它的参数 <code>x</code> 和 <code>b</code> ，<code>foo(1, 2)</code> 永远是 3。只要 <code>foo</code> 代码不变，你传入的参数是确定的，那么 <code>foo(1, 2)</code> 的值永远是可预测的。</p>
<p>这就是纯函数的第一个条件：一个函数的返回结果只依赖于它的参数</p>
<h3 id="函数执行过程没有副作用" tabindex="-1"><a class="header-anchor" href="#函数执行过程没有副作用" aria-hidden="true">#</a> 函数执行过程没有副作用</h3>
<p>一个函数执行过程对产生了外部可观察的变化，呢么就说这个函数有副作用</p>
<p>我们修改一下<code>foo</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">.</span>x <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span>count<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>
counter<span class="token punctuation">.</span>x<span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>我们把原来的 <code>x</code> 换成了 <code>obj</code>，我现在可以往里面传一个对象进行计算，计算过程不会对传入的对象进行修改，计算前后的 <code>counter</code> 不会发生任何变化，计算前是 1，计算后也是 1，它现在是纯的，但我们再稍微修改一下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">foo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    obj<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">.</span>x <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">foo</span><span class="token punctuation">(</span>counter<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4</span>
counter<span class="token punctuation">.</span>x<span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>我们在 <code>foo</code> 内部加了一句 <code>obj.x = 2</code>，计算前的 <code>counter.x</code> 是 1，但是计算以后 <code>counter.x</code> 是 2。<code>foo</code> 函数的执行对外部的 <code>counter</code> 产生了影响，他又副作用，因为它修改了外部传进来的对象，它不纯了。</p>
<p>要想看懂一些牛逼的源码</p>
<p>必须掌握的编程思维就是 函数式编程</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token parameter">x</span> <span class="token operator">=></span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">f</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">g</span> <span class="token operator">=</span> <span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">*</span> <span class="token number">2</span>'
<span class="token keyword">const</span> fg <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> g<span class="token punctuation">)</span>
<span class="token function">fg</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651233708&amp;idx=1&amp;sn=5f65bf6cc7e012ce99e648e8c4b56a89&amp;chksm=bd4944288a3ecd3eed9fa153b2eaa7e1716393a96e307228920d5c638816b437f96d80eede63&amp;scene=21#wechat_redirect</p>
<h3 id="纯函数的好处" tabindex="-1"><a class="header-anchor" href="#纯函数的好处" aria-hidden="true">#</a> 纯函数的好处</h3>
<p>纯函数的概念</p>
<blockquote>
<p>纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用</p>
</blockquote>
<p>副作用的概念</p>
<blockquote>
<p>副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互</p>
</blockquote>
<p>副作用可能包括，但不限于：</p>
<ul>
<li>更改文件系统</li>
<li>往数据库插入记录</li>
<li>发送一个 http 请求</li>
<li>可变数据</li>
<li>打印 log</li>
<li>获取用户输入</li>
<li>DOM 查询</li>
</ul>
<h3 id="追求-纯-的理由" tabindex="-1"><a class="header-anchor" href="#追求-纯-的理由" aria-hidden="true">#</a> 追求“纯”的理由</h3>
<h4 id="可缓存性-cacheable" tabindex="-1"><a class="header-anchor" href="#可缓存性-cacheable" aria-hidden="true">#</a> 可缓存性（Cacheable）</h4>
<h4 id="可测试性-testable" tabindex="-1"><a class="header-anchor" href="#可测试性-testable" aria-hidden="true">#</a> 可测试性（Testable）</h4>
<h4 id="合理性-reasonabel" tabindex="-1"><a class="header-anchor" href="#合理性-reasonabel" aria-hidden="true">#</a> 合理性（Reasonabel）</h4>
<h2 id="柯里化-curry" tabindex="-1"><a class="header-anchor" href="#柯里化-curry" aria-hidden="true">#</a> 柯里化（Curry）</h2>
<p>curry 的概念</p>
<blockquote>
<p>只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数</p>
</blockquote>
<h4 id="偏函数的简单应用" tabindex="-1"><a class="header-anchor" href="#偏函数的简单应用" aria-hidden="true">#</a> 偏函数的简单应用</h4>
<p>Function.prototype.bind()</p>
<p>会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体</p>
<p>https://github.com/sunyongjian/FP-Code/tree/master/src</p>
<p>https://juejin.cn/post/6940442700889980965</p>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3>
<p>函数式编程倡导<strong>利用若干简单的执行单元</strong>让计算结果不断渐进，逐层推导复杂的运算</p>
<p>https://juejin.cn/post/6940442700889980965</p>
<p>函数式编程有两个最基本的运算： 合成（compose）和柯里化（Currying）</p>
<h3 id="合成-compose" tabindex="-1"><a class="header-anchor" href="#合成-compose" aria-hidden="true">#</a> 合成（Compose）</h3>
<p>如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做“函数的合成”（compose）</p>
<p>合成的好处显而易见，它让代码变得简单而富有可读性，同时通过不同的组合方式，我们可以轻易组合出其他常用函数，让我们的代码更具表现力</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"f1"</span><span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> arg<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"f2"</span><span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> arg<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">f3</span><span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"f3"</span><span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> arg<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">compose</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>funcs</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>funcs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">arg</span><span class="token punctuation">)</span> <span class="token operator">=></span> arg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>funcs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> funcs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// funcs 是个数组，表示参数的集合，所以能使用 reduce</span>
    <span class="token comment">// reduce 中 (累加值, 当前值)</span>
    <span class="token keyword">return</span> funcs<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span>
            <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span>
                <span class="token function">a</span><span class="token punctuation">(</span><span class="token function">b</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span>f1<span class="token punctuation">,</span> f2<span class="token punctuation">,</span> f3<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">"omg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// f1(f2(f3("omg")))</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"res"</span><span class="token punctuation">,</span> res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// f</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><h3 id="柯里化-currying" tabindex="-1"><a class="header-anchor" href="#柯里化-currying" aria-hidden="true">#</a> 柯里化（Currying）</h3>
<p>概念：把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术</p>
<p>所谓“柯里化”，<strong>就是把一个多参数的函数，转化为单参数函数</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 柯里化之前</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>

<span class="token comment">// 柯里化之后</span>
<span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 箭头函数表示</span>
<span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>

<span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>这样调用上述函数： <code>(add(3))(4)</code> 或直接 <code>add(3)(4)</code></p>
<h3 id="多个箭头函数是什么意义" tabindex="-1"><a class="header-anchor" href="#多个箭头函数是什么意义" aria-hidden="true">#</a> 多个箭头函数是什么意义</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">addSumArrow</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token comment">// 等于</span>
<span class="token keyword">const</span> <span class="token function-variable function">addSumNormal</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">enhancer</span><span class="token punctuation">(</span><span class="token parameter">originF</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"before"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">originF</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"after"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 等于</span>
<span class="token keyword">const</span> <span class="token function-variable function">enhancer</span> <span class="token operator">=</span>
    <span class="token punctuation">(</span><span class="token parameter">originF</span><span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"before"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">originF</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"after"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>两数之加</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token function-variable function">c_add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>三数之乘</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function-variable function">multi</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">*</span> b <span class="token operator">*</span> c<span class="token punctuation">;</span>
<span class="token function-variable function">c_multi</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">c</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">*</span> b <span class="token operator">*</span> c<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>单参定理</p>
<p><strong>「多参数函数」一定能改写为「单参数函数」，且其输入输出保持不变</strong>。</p>
<p>「赋值」会导致数据共享变得麻烦，你无法信任别人不改你的数据，别人也无法信任你：</p>
<ul>
<li>要么就靠大家自觉，约定大家都不改 options（我只能说祝你好运）；</li>
<li>要么传给别人之前先深拷贝一下，拿到别人的数据之后最好也先深拷贝一下……</li>
</ul>
<p>数据不可变的两个有点：</p>
<ul>
<li>数据可变将导致[代入法]不可用，函数与数学再无关联；而数据不可变则相反</li>
<li>数据可变将导致数据共享变得困难；而数据不可变则相反</li>
</ul>
<p>函数式编程无副作用是因为它不会修改自己外部的 env，也不会去修改通过参数传进来的对象，顶多修改自己的本地变量而已</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651233708&amp;idx=1&amp;sn=5f65bf6cc7e012ce99e648e8c4b56a89&amp;chksm=bd4944288a3ecd3eed9fa153b2eaa7e1716393a96e307228920d5c638816b437f96d80eede63&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">简明 JavaScript 函数式编程-入门篇<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sunyongjian/FP-Code/tree/master/src" target="_blank" rel="noopener noreferrer">函数式编程思维<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6940442700889980965" target="_blank" rel="noopener noreferrer">浅析 JavaScript 函数式编程<ExternalLinkIcon/></a></li>
</ul>
</template>
