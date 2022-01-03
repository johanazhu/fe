<template><h1 id="外观模式" tabindex="-1"><a class="header-anchor" href="#外观模式" aria-hidden="true">#</a> 外观模式</h1>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>为子系统中的一组接口提供了一个高层接口</p>
<p>使用者使用这个高层接口</p>
<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3>
<p>去医院看病，接待员去挂号、门诊、划价、取药</p>
<h3 id="场景" tabindex="-1"><a class="header-anchor" href="#场景" aria-hidden="true">#</a> 场景</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bindEvent</span><span class="token punctuation">(</span><span class="token parameter">elem<span class="token punctuation">,</span> type<span class="token punctuation">,</span> selector<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>fn <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fn <span class="token operator">=</span> selector<span class="token punctuation">;</span>
        selector <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
<span class="token comment">// 调用</span>
<span class="token function">bindEvent</span><span class="token punctuation">(</span>elem<span class="token punctuation">,</span> <span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token string">'#div1'</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span>
<span class="token function">bindEvent</span><span class="token punctuation">(</span>elem<span class="token punctuation">,</span> <span class="token string">'click'</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://refactoringguru.cn/design-patterns/singleton" target="_blank" rel="noopener noreferrer">深入设计模式<ExternalLinkIcon/></a></li>
</ul>
</template>
