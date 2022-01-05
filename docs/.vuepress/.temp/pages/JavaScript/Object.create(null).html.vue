<template><h1 id="object-create-null" tabindex="-1"><a class="header-anchor" href="#object-create-null" aria-hidden="true">#</a> Object.create(null)</h1>
<p>前言：</p>
<blockquote>
<p>在 Vue和Vuex的源码中，作者都是用了<code>Object.create(null)</code> 来初始化一个对象。为什么不是用更简洁的 {} 呢</p>
</blockquote>
<p>先说结论：</p>
<ol>
<li>你如果需要一个非常干净且高度可定制的对象当做数据字典的话，可以使用 Object.create(null)</li>
<li>想节省 <code>hasOwnProperty</code> 带来的一丢丢性能损失并且可以偷懒少些一点代码的时候</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">create</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">proto</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token function-variable function">Noop</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token class-name">Noop</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> proto<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Noop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.cn/post/6844903589815517192" target="_blank" rel="noopener noreferrer">详解Object.create(null)<ExternalLinkIcon/></a></li>
</ul>
</template>
