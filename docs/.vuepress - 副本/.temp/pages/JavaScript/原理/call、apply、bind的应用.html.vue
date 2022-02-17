<template><h1 id="call、apply、bind的应用" tabindex="-1"><a class="header-anchor" href="#call、apply、bind的应用" aria-hidden="true">#</a> call、apply、bind的应用</h1>
<p>之前在讲 <a href="../this%E5%85%B3%E9%94%AE%E5%AD%97">this关键字</a> 时，我们介绍过这三个api，我们得出这样的结论：<strong>call、apply和bind都拥有掰弯this指向的能力</strong>。</p>
<p>介于当时的重点在于this，对这三者并没有详细介绍，这一节，我们好好说一说这三个api。</p>
<ul>
<li>call</li>
<li>apply</li>
<li>bind</li>
<li>实际应用
<ul>
<li>继承 xxx = Person.apply(this)</li>
</ul>
</li>
</ul>
<h3 id="call" tabindex="-1"><a class="header-anchor" href="#call" aria-hidden="true">#</a> Call</h3>
<blockquote>
<p>MDN：call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数</p>
</blockquote>
<p>举个例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> bar <span class="token operator">=</span> <span class="token punctuation">{</span>
    myName<span class="token operator">:</span> <span class="token string">"johan"</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>myName<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span> <span class="token comment">// johan</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>也就是说：调用foo函数的时候，调用使用call()，并且传入bar，使得foo函数内部的this指向了bar</p>
<h4 id="实现call" tabindex="-1"><a class="header-anchor" href="#实现call" aria-hidden="true">#</a> 实现call</h4>
<p>咱们根据这个结论来实现一下call</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">johanCall</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context <span class="token operator">=</span> window<span class="token punctuation">,</span> <span class="token operator">...</span>params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是函数才能调用call方法</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"类型错误"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将this也就是被调用的函数，通过赋值给传入的对象，来达到将被调用的函数添加到传入的对象上的目的</span>
    context<span class="token punctuation">.</span>fun <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token comment">// 用传入的对象来调用需要被调用的函数，并保留返回结果</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fun</span><span class="token punctuation">(</span><span class="token operator">...</span>params<span class="token punctuation">)</span>
    <span class="token comment">// 删除传入对象上被添加的函数，防止内存泄漏</span>
    Reflect<span class="token punctuation">.</span><span class="token function">deleteProperty</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">'fun'</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回结果</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>其核心很简单，关键在一个点上，即 <code>context.fun = this</code> , 怎么理解这句话</p>
<p>注意，我们之前讲 this 篇章的时候，就讲过 this 亘古不变的指向原则——谁调用我，我指向谁。</p>
<p>在例子中，foo.call(bar)，即foo调用了call，call方法中的this指向的就是foo函数，所以this代指被调用的函数</p>
<p>梳理一下：</p>
<ul>
<li>将被调用的函数作为一个属性添加到传入的对象上</li>
<li>从而可以实现在传入的对象上，调用需要被调用的函数</li>
<li>其核心原理还是this的指向原理：<strong>谁调用我，我指向谁</strong></li>
</ul>
<p>实现call</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">call2</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 首先要获取调用call2的函数，用 this 可以获取</span>
    context<span class="token punctuation">.</span>fn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    context<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">delete</span> context<span class="token punctuation">.</span>fn<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">{</span>
    value<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
bar<span class="token punctuation">.</span><span class="token function">call2</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>最开始，我们会疑惑，context.fn 怎么来的，但是别忘记了，this的指向为谁调用它就指向谁。</p>
<p>那么在 <code>bar.call2(foo)</code> 中，我们可以看出，调用 call2 函数的是 bar，所以 call2 中的 this 指向的是 bar</p>
<p>context.fn 的意思是</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 伪代码</span>
context<span class="token punctuation">.</span><span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>context.fn()</code> 即执行 bar</p>
<h3 id="实现apply" tabindex="-1"><a class="header-anchor" href="#实现apply" aria-hidden="true">#</a> 实现apply</h3>
<p>apply其实和call差不多，只不过传递参数的方式不同</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token punctuation">[</span>param1<span class="token punctuation">,</span> param2<span class="token punctuation">,</span><span class="token operator">...</span><span class="token punctuation">,</span>paramN<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 参数为数组</span>
<span class="token function">foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> param1<span class="token punctuation">,</span> param2<span class="token punctuation">,</span><span class="token operator">...</span><span class="token punctuation">,</span>paramN<span class="token punctuation">)</span> <span class="token comment">// 参数非数组，传入一串参数</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>咱们对上面的call稍微修改以下就是apply了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">johanApply</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">context <span class="token operator">=</span> window<span class="token punctuation">,</span> params <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是函数才能调用apply方法</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"类型错误"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将this也就是被调用的函数，通过赋值给传入的对象，来达到将被调用的函数添加到传入的对象上的目的</span>
    context<span class="token punctuation">.</span>fun <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token comment">// 用传入的对象来调用需要被调用的函数，并保留返回结果</span>
    <span class="token keyword">const</span> result <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">fun</span><span class="token punctuation">(</span><span class="token operator">...</span>params<span class="token punctuation">)</span>
    <span class="token comment">// 删除传入对象上被添加的函数，防止内存泄漏</span>
    Reflect<span class="token punctuation">.</span><span class="token function">deleteProperty</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token string">'fun'</span><span class="token punctuation">)</span>
    <span class="token comment">// 返回结果</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>bind 用到了闭包</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://github.com/mqyqingfeng/Blog/issues/11" target="_blank" rel="noopener noreferrer">JavaScript深入之call和apply的模拟实现<ExternalLinkIcon/></a></li>
</ul>
</template>
