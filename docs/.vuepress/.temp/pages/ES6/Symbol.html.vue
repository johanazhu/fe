<template><h1 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol" aria-hidden="true">#</a> Symbol</h1>
<p>我们了解一个新东西时，首先要问三个问题，再关联已有知识，再结合得出结论</p>
<p>三个问题：这是什么？有什么用？什么场景下使用。</p>
<h3 id="symbol是什么" tabindex="-1"><a class="header-anchor" href="#symbol是什么" aria-hidden="true">#</a> Symbol是什么？</h3>
<p>Symbol的作用非常的专一，换句话说其设计出来就只有一个目的——<strong>作为对象属性的唯一标识符</strong>，防止对象属性冲突发生</p>
<p>我们在React会看到这样的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    $$<span class="token keyword">typeof</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span>react<span class="token punctuation">.</span>element<span class="token punctuation">)</span><span class="token punctuation">,</span>
    key<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    props<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    ref<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    type<span class="token operator">:</span> ClickCounter
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/" target="_blank" rel="noopener noreferrer">简单了解ES6/ES2015 Symbol() 方法<ExternalLinkIcon/></a></li>
<li><a href="http://caibaojian.com/es6/symbol.html" target="_blank" rel="noopener noreferrer">ES6 symbol<ExternalLinkIcon/></a></li>
</ul>
</template>
