<template><h1 id="javascript相关面试题" tabindex="-1"><a class="header-anchor" href="#javascript相关面试题" aria-hidden="true">#</a> JavaScript相关面试题</h1>
<h3 id="js延迟加载的方式有哪些" tabindex="-1"><a class="header-anchor" href="#js延迟加载的方式有哪些" aria-hidden="true">#</a> js延迟加载的方式有哪些？</h3>
<p>defer 和 async</p>
<p>​	什么是defer？</p>
<p>​	什么是async？</p>
<p>动态创建DOM方式</p>
<p>按需异步载入js</p>
<h3 id="如何解决跨域问题" tabindex="-1"><a class="header-anchor" href="#如何解决跨域问题" aria-hidden="true">#</a> 如何解决跨域问题?</h3>
<h3 id="如何统计当前页面出现过多少种-html-标签" tabindex="-1"><a class="header-anchor" href="#如何统计当前页面出现过多少种-html-标签" aria-hidden="true">#</a> 如何统计当前页面出现过多少种 html 标签</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token operator">=></span>v<span class="token punctuation">.</span>tagName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>size
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="求一个网页中出现次数最多的三种标签" tabindex="-1"><a class="header-anchor" href="#求一个网页中出现次数最多的三种标签" aria-hidden="true">#</a> 求一个网页中出现次数最多的三种标签</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> html <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'html'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> htmlChild <span class="token operator">=</span> html<span class="token punctuation">.</span>children<span class="token punctuation">;</span>
<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token parameter">children</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">of</span> children<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>tagName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            obj<span class="token punctuation">[</span>i<span class="token punctuation">.</span>tagName<span class="token punctuation">]</span> <span class="token operator">=</span> obj<span class="token punctuation">[</span>i<span class="token punctuation">.</span>tagName<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            obj<span class="token punctuation">[</span>i<span class="token punctuation">.</span>tagName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">const</span> child <span class="token operator">=</span> i<span class="token punctuation">.</span>children<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>child<span class="token punctuation">.</span>length<span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">fn</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">fn</span><span class="token punctuation">(</span>htmlChild<span class="token punctuation">)</span>
<span class="token keyword">let</span> tag <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> b<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">result</span><span class="token punctuation">(</span><span class="token parameter">array</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> array<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">result</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>问：介绍defineProperty方法，什么时候需要用到</p>
<p>44道 js 难题， 做对一半就是高手</p>
<p>https://mp.weixin.qq.com/s/qcUjTZGVRIBR4-JINXpFpA</p>
<p>JS 20道概念虽老但也略有收获的JS基础题</p>
<p>https://www.cnblogs.com/echolun/p/13363457.html</p>
<p>十道经典面试题</p>
<p>https://zhuanlan.zhihu.com/p/373484984</p>
<p>常见面试题</p>
<p>https://mp.weixin.qq.com/s/kh8H5YkFiJOgRH7hAzXfGQ</p>
<p>夯实JS主要知识点</p>
<p>https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046276&amp;idx=1&amp;sn=b54360af4eaa853699f6ebda2d2be822&amp;chksm=87cbe694b0bc6f8238b645cbffe7c3ef7c4b3f6a6899670e5a306b494e819af2d4dd1cf052f1&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1566830719714&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd</p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<p>[夯实JS主要知识点]</p>
</template>
