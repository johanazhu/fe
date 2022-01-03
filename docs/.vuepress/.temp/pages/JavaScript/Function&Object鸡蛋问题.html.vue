<template><h1 id="function-object鸡蛋问题" tabindex="-1"><a class="header-anchor" href="#function-object鸡蛋问题" aria-hidden="true">#</a> Function&amp;Object鸡蛋问题</h1>
<p>先来一张图</p>
<p><img src="https://i.loli.net/2021/06/08/BjVYFWQr1lfkHd8.png" alt="原型"></p>
<p><code>Function.__proto__ === Function.prototype</code> 引发的鸡生蛋蛋生鸡问题</p>
<p>Object.prototype、Function.prototype、function Object、function Function 之间的关系</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object <span class="token keyword">instanceof</span> <span class="token class-name">Function</span> 		<span class="token comment">// true</span>
Function <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> 		<span class="token comment">// true</span>

Object <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> 		<span class="token comment">// true</span>
Function <span class="token keyword">instanceof</span> <span class="token class-name">Function</span>    <span class="token comment">// true</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>Object</code> 构造函数继承了 <code>Function.prototype</code>，同时 <code>Function</code> 构造函数继承了<code>Object.prototype</code>。这里就产生了 <strong>鸡和蛋</strong> 的问题。为什么会出现这种问题，因为 <code>Function.prototype</code> 和 <code>Function.__proto__</code> 都指向 <code>Function.prototype</code>。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Object instanceof Function 	即</span>
Object<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype 					<span class="token comment">// true</span>

<span class="token comment">// Function instanceof Object 	即</span>
Function<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype	<span class="token comment">// true</span>

<span class="token comment">// Object instanceof Object 		即 			</span>
Object<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype 	<span class="token comment">// true</span>

<span class="token comment">// Function instanceof Function 即	</span>
Function<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype	
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://www.cnblogs.com/echolun/p/12384935.html" target="_blank" rel="noopener noreferrer">JS 究竟是先有鸡还是有蛋<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/22989691" target="_blank" rel="noopener noreferrer">JavaScript 世界万物诞生记<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://muyiy.cn/blog/5/5.3.html#%E5%BC%95%E8%A8%80" target="_blank" rel="noopener noreferrer">深入探究 Function &amp; Object 鸡蛋问题<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
