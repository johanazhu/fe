<template><p>ios srcoll height</p>
<p>首先，iframe嵌套的元素被子元素的宽度撑开，</p>
<p>在react componentDidMount中 找到iframe 把宽设置为client宽度</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">'iframe'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientWidth <span class="token operator">+</span> <span class="token string">'px'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>下滑情况下，页面自动刷新到顶部</p>
<p>是因为iframe 的高度问题，下滑超过iframe的2倍高度，页面就会受不了自动刷新</p>
<p>怎么办</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>height：10000px 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>测试真的可以</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scroll-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>iframe</span> 
            <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>iframe<span class="token punctuation">"</span></span>
            <span class="token attr-name">frameBorder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span>
            <span class="token attr-name">scolling</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span>{isIos()</span> <span class="token attr-name">?</span> <span class="token attr-name">'no'</span> <span class="token attr-name">:</span> <span class="token attr-name">'yes'}</span>
            <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://item.m.jd.com/product/206735.html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>iframe</span><span class="token punctuation">></span></span>    
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>	

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-less ext-less line-numbers-mode"><pre v-pre class="language-less"><code><span class="token selector">.scroll-wrapper</span> <span class="token punctuation">{</span>
    <span class="token property">overflow-y</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
    <span class="token property">-webkit-overflow-scrolling</span><span class="token punctuation">:</span> touch<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token selector">.iframe</span> <span class="token punctuation">{</span>
        <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>100% <span class="token operator">-</span> 88px<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">padding-bottom</span><span class="token punctuation">:</span> 88px<span class="token punctuation">;</span> <span class="token comment">// 针对ios</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></template>
