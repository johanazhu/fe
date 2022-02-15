<template><h1 id="模拟bind的实现" tabindex="-1"><a class="header-anchor" href="#模拟bind的实现" aria-hidden="true">#</a> 模拟bind的实现</h1>
<p>在之前的文章里，我们曾经说过，bind 能改变 this 的指向。并在 <a href="../call%E3%80%81apply%E3%80%81bind%E7%9A%84%E5%BA%94%E7%94%A8">这篇文章</a> 中详细介绍了 bind 的作用以及它的使用场景。这里我们来讲一下如何模拟实现 bind</p>
<p>先来看以下 MDN 对 bind 的介绍：</p>
<blockquote>
<p><code>bind()</code> 方法创建一个新的函数，在 <code>bind()</code> 被调用时，这个新函数的 <code>this</code> 被指定为 <code>bind()</code> 的第一个参数，而其余参数将作为新函数的参数，供调用时使用</p>
</blockquote>
<p>由此我们可以得出 bind 函数的两个特点：</p>
<ol>
<li>返回一个函数</li>
<li>可以传入参数</li>
</ol>
<h2 id="返回函数的模拟实现" tabindex="-1"><a class="header-anchor" href="#返回函数的模拟实现" aria-hidden="true">#</a> 返回函数的模拟实现</h2>
<p>先从第一个特点开始，举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 返回一个函数</span>
<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>

<span class="token function">bindFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>关于指定 this 的指向，我们可以使用 call 或者 apply 实现，关于 call 或 apply 的实现，可以看<a href="../%E6%A8%A1%E6%8B%9Fcall%E5%92%8Capply%E7%9A%84%E5%AE%9E%E7%8E%B0">《模拟call和apply的实现》</a> 。我们查看第一版代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第一版</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mybind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>PS: 这里多说一句，其实 bind 使用的闭包</p>
<p>此外，之所以 <code>return self.apply(context)</code> ，是考虑到绑定函数可能有返回值，依然是这个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">bindFoo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="传参的模拟实现" tabindex="-1"><a class="header-anchor" href="#传参的模拟实现" aria-hidden="true">#</a> 传参的模拟实现</h2>
<p>我们要实现传参功能前，先看看在使用 bind 时传参会是怎么个样子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'elaine'</span><span class="token punctuation">)</span>

<span class="token function">bindFoo</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span>
<span class="token comment">// 1</span>
<span class="token comment">// elaine</span>
<span class="token comment">// 22</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>函数 bar 需要两个参数，bind 传递了 name ，在执行 bindFoo 时，在传入 age</p>
<p>说明 bind 能”带参入局“（带球过人）</p>
<p>所以我们要对 arguments 进行处理</p>
<p>我们的理论知识是，arguments 管理所有的参数，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 第二版</span>
<span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mybind</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取 mybind 函数从第二个参数到最后一个参数</span>
    <span class="token comment">// slice.call(arguments, 1) 这个使用太精髓了</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里的 argments 是指 bind 返回函数传入的参数</span>
        <span class="token keyword">var</span> bindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>bindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>第二版实现了 bind 函数传参的问题，精髓在于 slice 和 arguments 的配合</p>
<h2 id="构造函数效果的模拟实现" tabindex="-1"><a class="header-anchor" href="#构造函数效果的模拟实现" aria-hidden="true">#</a> 构造函数效果的模拟实现</h2>
<p>bind还有一个特点，就是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>一个绑定函数也能使用<span class="token keyword">new</span>操作符来创建对象：这种行为就像把原函数当成构造器。提供的<span class="token keyword">this</span>值被忽略，同时调用时的参数被提供给模拟函数
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>也就是说当 bind 返回的函数作为构造函数的时候， bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>habit <span class="token operator">=</span> <span class="token string">'shopping'</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

bar<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>friend <span class="token operator">=</span> <span class="token string">'johan'</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> <span class="token function">bar</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'elaine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bindFoo</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>
<span class="token comment">// undefined</span>
<span class="token comment">// elaine</span>
<span class="token comment">// 18</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>habit<span class="token punctuation">)</span> 
<span class="token comment">// shopping</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>friend<span class="token punctuation">)</span>
<span class="token comment">// johan</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefined，说明绑定的 this 失效了，如果大家知道 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj</p>
<p>所以我们可以通过修改返回的函数的原型来实现，</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">bind2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token function-variable function">fBound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> bindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向实例，可以让实例获得来自绑定函数的值</span>
        <span class="token comment">// 以上面的是 demo 为例，如果改成`this instanceof fBound ? null : context`,实例只是一个空对象，将 null 改成 this，实例会具有 habit 属性</span>
        <span class="token comment">// 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context</span>
        <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fBound</span> <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> context<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>bindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值</span>
    <span class="token comment">// 按上面的 demo 为例，this 指的是 bar(谁调用我，我指向谁)，fBound.protype=this.prototype 就是将 bar.prototype 赋值给了 fBound，供实例来继承 </span>
    fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    <span class="token keyword">return</span> fBound<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="构造函数效果的优化实现" tabindex="-1"><a class="header-anchor" href="#构造函数效果的优化实现" aria-hidden="true">#</a> 构造函数效果的优化实现</h2>
<p>在第三版中，我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。看个例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// bind2 以 第四版 为基础</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> bar<span class="token punctuation">.</span><span class="token function">bind2</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
bindFoo<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token number">1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>我们修改的是绑定函数 bindFoo 的 prototype ，却把 bar 的 prototype 也修改了。这是因为对象赋值是引用地址，所以改变 bindFoo 的 prototype 就是改变 bar 的 prototype 。这里有两个方案，一通过一个空函数来进行中转，二通过深拷贝来实现</p>
<h3 id="空函数进行中装" tabindex="-1"><a class="header-anchor" href="#空函数进行中装" aria-hidden="true">#</a> 空函数进行中装</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">bind2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">fNOP</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">fBound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> bindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fNOP</span> <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> context<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>bindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    fNOP<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span>
    fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fNOP</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> fBound<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="深拷贝来实现" tabindex="-1"><a class="header-anchor" href="#深拷贝来实现" aria-hidden="true">#</a> 深拷贝来实现</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">bind2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">fBound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> bindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fBound</span> <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> context<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>bindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 使用最简单的深拷贝</span>
    <span class="token keyword">return</span> fBound
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>如果调用 bind 的不是函数咋办?</p>
<p>不行，我们要报错！</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Function.prototype.bind - what is trying to be bound is not callable"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="最终版本" tabindex="-1"><a class="header-anchor" href="#最终版本" aria-hidden="true">#</a> 最终版本</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">bind2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Function.prototype.bind - what is trying to be bound is not callable"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">var</span> self <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token comment">// 删除 context 后剩余的参数</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">fNOP</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token keyword">var</span> <span class="token function-variable function">bBound</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> bindArgs <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token function">self</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">fNOP</span> <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> context<span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>bindArgs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fNOP<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>prototype
    fBound<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">fNOP</span>
    <span class="token keyword">return</span> fBound
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>PS: 因为拷贝那个比较简单，所以我们用空函数进行中装为例</p>
<h2 id="es6版本模拟bind" tabindex="-1"><a class="header-anchor" href="#es6版本模拟bind" aria-hidden="true">#</a> ES6版本模拟bind</h2>
<ol>
<li>
<p>处理参数，返回一个闭包</p>
</li>
<li>
<p>判断是否为构造函数调用，如果是则使用 <code>new</code> 调用当前函数</p>
</li>
<li>
<p>如果不是，使用 <code>apply</code> ，将 <code>context</code> 和处理好的参数传入</p>
</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myBind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> <span class="token operator">...</span>args1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"Function.prototype.bind - what is trying to be bound is not callable"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> _this <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token constant">F</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断是否用于构造函数</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">F</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">_this</span><span class="token punctuation">(</span><span class="token operator">...</span>args1<span class="token punctuation">,</span> <span class="token operator">...</span>arguments<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args1<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>测试用例 ：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>habit <span class="token operator">=</span> <span class="token string">'shopping'</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

bar<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>friend <span class="token operator">=</span> <span class="token string">'johan'</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bindFoo <span class="token operator">=</span> bar<span class="token punctuation">.</span><span class="token function">myBind</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">'elaine'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">bindFoo</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>
<span class="token comment">// undefined</span>
<span class="token comment">// elaine</span>
<span class="token comment">// 18</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>habit<span class="token punctuation">)</span> 
<span class="token comment">// shopping</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>friend<span class="token punctuation">)</span>
<span class="token comment">// johan</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>如何理解 <code> return new _this(...args1, ...args2)</code></p>
<p>以上诉 demo 为例，<code>_this</code> 指的 是 bar，即第一次调用myBind时存在函数myBind中的变量，被闭包住了。</p>
<p>后面的（...args1, ...args2）就是使用扩展运算符，展开变量</p>
<p>bind的骚操作在于它可以用作构造函数，所以要判断返回的函数（闭包），是否是被实例化，如果实例化，就是基于 foo 来做实例化，参数为传来的所以参数</p>
<p>如果是当作一个普通函数调用，那么就用 apply 来调用</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/mqyqingfeng/Blog/issues/12" target="_blank" rel="noopener noreferrer">JavaScript深入之bind的模拟实现<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
