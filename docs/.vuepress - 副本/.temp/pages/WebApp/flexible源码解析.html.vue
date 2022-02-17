<template><h1 id="flexible-源码解析" tabindex="-1"><a class="header-anchor" href="#flexible-源码解析" aria-hidden="true">#</a> flexible 源码解析</h1>
<p>amlib-flexible 源码总共 44 行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">flexible</span><span class="token punctuation">(</span><span class="token parameter">window<span class="token punctuation">,</span> document</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> docEl <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement
  <span class="token keyword">var</span> dpr <span class="token operator">=</span> window<span class="token punctuation">.</span>devicePixelRatio <span class="token operator">||</span> <span class="token number">1</span>

  <span class="token comment">// adjust body font size</span>
  <span class="token keyword">function</span> <span class="token function">setBodyFontSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>document<span class="token punctuation">.</span>body<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token number">12</span> <span class="token operator">*</span> dpr <span class="token operator">+</span> <span class="token string">'px'</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'DOMContentLoaded'</span><span class="token punctuation">,</span> setBodyFontSize<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">setBodyFontSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// set 1rem = viewWidth / 10</span>
  <span class="token keyword">function</span> <span class="token function">setRemUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> rem <span class="token operator">=</span> docEl<span class="token punctuation">.</span>clientWidth <span class="token operator">/</span> <span class="token number">10</span>
    docEl<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> rem <span class="token operator">+</span> <span class="token string">'px'</span>
  <span class="token punctuation">}</span>

  <span class="token function">setRemUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// reset rem unit on page resize</span>
  window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> setRemUnit<span class="token punctuation">)</span>
  window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'pageshow'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>persisted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setRemUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// detect 0.5px supports</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>dpr <span class="token operator">>=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> fakeBody <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> testElement <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span>
    testElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token string">'.5px solid transparent'</span>
    fakeBody<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>testElement<span class="token punctuation">)</span>
    docEl<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>fakeBody<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>testElement<span class="token punctuation">.</span>offsetHeight <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      docEl<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'hairlines'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    docEl<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>fakeBody<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">,</span> document<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><ul>
<li><s>根据设备的 dpr 动态改写 `` 标签，设置 viewport 的缩放</s></li>
<li><s>给 `` 元素添加 data-dpr 属性，并且动态改写 data-dpr 的值</s></li>
<li>根据 <code>document.documentElement.clientWidth</code> 动态修改 <code>&lt;html&gt;</code> 的 font-size ，页面其他元素使用 rem 作为长度单位进行布局，从而实现页面的等比缩放</li>
</ul>
<blockquote>
<p>关于头两点，其实现在的 <code>lib-flexible</code> 库已经不这样做了，不再去缩放 Viewport，字体大小的设定也直接使用了 rem</p>
</blockquote>
<p>flexible 作为屏幕宽度适配解决方案，是存在一些问题的：</p>
<ul>
<li>动态修改 Viewport 存在一定的分线</li>
</ul>
<p>两个版本</p>
<p>0.3.2 老的</p>
<p>通过 meta 标签改变页面的缩放比例，从而达到适配的目的，同时，这个方案解决 1px 问题</p>
<p>缺点是只对 ios 的 dpr 进去处理，对于 安卓机型都默认 dpr = 1</p>
<p>2.0 新的（2019）</p>
<p>两个问题存在，判断设备支不支持 0.5px，如果支持，就在 body 上面添加一个名为 hairlines 的 class，所以我们的代码这样写</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.line</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* dpr>=2且支持0.5px的时候*/</span>
<span class="token selector">.hairlines .line</span> <span class="token punctuation">{</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 0.5px solid red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>但这样有两个问题</p>
<ul>
<li>对于那些 <code>dpr&gt; 2 且不支持 0.5px</code> 的安卓机，我们应该如何统一处理？</li>
<li>如果 <code>dpr = 3</code> 那么 border 就应该是 <code>0.333px</code>，而不是 <code>0.5px</code> 了</li>
</ul>
<p>https://juejin.cn/post/6896713964848152589</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<p><a href="https://github.com/chokcoco/cnblogsArticle/issues/25#" target="_blank" rel="noopener noreferrer">前端基础知识概述 -- 移动端开发的屏幕、图像、字体与布局的兼容适配<ExternalLinkIcon/></a></p>
</template>
