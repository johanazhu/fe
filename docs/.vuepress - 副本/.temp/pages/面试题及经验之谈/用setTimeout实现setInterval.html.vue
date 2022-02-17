<template><h1 id="用settimeout实现setinterval" tabindex="-1"><a class="header-anchor" href="#用settimeout实现setinterval" aria-hidden="true">#</a> 用setTimeout实现setInterval</h1>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token comment">// 每隔1秒打印一个1</span>

<span class="token keyword">function</span> <span class="token function">mySetInterval</span><span class="token punctuation">(</span><span class="token parameter">func<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   
   <span class="token function">setTimeout</span><span class="token punctuation">(</span>func<span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 带清理功能</span>
<span class="token comment">// 返回值</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/259" target="_blank" rel="noopener noreferrer">用 setTimeout 实现 setInterval，阐述实现的效果与setInterval的差异<ExternalLinkIcon/></a></li>
</ul>
</template>
