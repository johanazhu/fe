<template><h1 id="柯里化" tabindex="-1"><a class="header-anchor" href="#柯里化" aria-hidden="true">#</a> 柯里化</h1>
<p>函数作为一等对象最大的好处就是可以在程序运行时创建它们并将之储存在变量里。如下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>function add(a, b) {
    return a + b;
}

add(5, 2);
add(5, 2);
add(5, 100)
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这里我们可以优化 add 函数，每次使用 add 函数都是将数字 5 和其他三个数字进行相加，如果能把数字 5 内置在函数中而不用调用时作出参数传进去是个不错的注意。我们可以用柯里化（partial application 或者 currying）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">add5</span><span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>现在，我们创建了一个调用 add 函数并预置了一个参数值（这里是5）的 add5 函数， add5 函数本质上来讲其实就是预置了一个参数（柯里化）的 add 函数。不过，这个例子并没展示出这门技术动态的一面，如果我们提供的默认值是另外一个应该这么做？按照上面的例子，我们必须再次新建一个函数来提供一个新的预置参数。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">curryAdd</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> add5 <span class="token operator">=</span> <span class="token function">curryAdd</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add5</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>现在来介绍一下这个新的函数 curryAdd，它接收一个参数，这个参数会作为 add 函数的参数 a，同时返回一个新的匿名函数，这个匿名函数接收一个参数b来作为add函数的另一个参数。</p>
<p>当我们通过 curryAdd(5) 来调用这个函数时，它返回一个已经储存了我们一个明确参数值的函数，这个参数值此时被当做时这个匿名函数的一个局部变量。因为我们创建了一个闭包，所以即使这个匿名函数已经执行完毕，但我们还是可以通过它来最终求出我们需要的 a + b 的值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">init</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">platform</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    host<span class="token operator">:</span> <span class="token string">'http://www.baidu.com'</span><span class="token punctuation">,</span>
    payload<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    isSpa<span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'1111'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></template>
