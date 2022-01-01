<template><h1 id="测测你的this等级" tabindex="-1"><a class="header-anchor" href="#测测你的this等级" aria-hidden="true">#</a> 测测你的this等级</h1>
<h3 id="example-7" tabindex="-1"><a class="header-anchor" href="#example-7" aria-hidden="true">#</a> Example 7</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token function-variable function">foo</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

obj<span class="token punctuation">.</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>函数 <code>function() {console.log(this)}</code> 被当作一个参数传入了 <code>obj.foo()</code> 中</p>
<p>最开始，我也中招了，</p>
<p>后来想了像，this 的准则是什么，谁调用我，我就指向谁，在这一题中，我们将 <code>function() {conole.log(this)}</code> 当作一个参数传入了 <code>obj.foo()</code> 中，在这里， <code>fn()</code> 调用，谁调用它呢？</p>
<p><code>obj.foo()</code> 吗？NO。他只是把函数 <code>function() {console.log(this)}</code> 传到 <code>obj</code> 中，而 <code>fn</code> 被独立调用，所以真正调用它的是 window</p>
<p>我们实际上是将属性分配给了在调用函数时绑定到”this“上的新创建的空对象</p>
<p>一旦函数执行完成，就会返回这个刚被创建的对象</p>
<p>参考资料：</p>
<p>this测试第一部分  https://juejin.cn/post/6844903652209999886</p>
<p>this测试第二部分https://juejin.cn/post/6844903652583276552</p>
</template>
