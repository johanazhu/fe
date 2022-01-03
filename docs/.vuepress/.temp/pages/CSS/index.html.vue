<template><h1 id="css常见面试点" tabindex="-1"><a class="header-anchor" href="#css常见面试点" aria-hidden="true">#</a> CSS常见面试点</h1>
<blockquote>
<p>面试过程思路清晰，面试官给出关键字，能够快速反应出相关的技术要点，但是也要避免滔滔不绝，说一堆无关紧要的东西。举例来说，当时勾股老师面试我的时候，问了我一个左图右文的布局做法，我的回答是：我自己总结过7种方案，其中比较好用的是基于 BFC 的，float的以及flex的三种。之后把关键 CSS 口喷了一下，然后 CSS 就面完了</p>
</blockquote>
<p>CSS 方面的知识点，说起来也就这几点：</p>
<p><a href="#%E9%80%89%E6%8B%A9%E5%99%A8">选择器</a></p>
<p><a href="#%E4%BC%AA%E7%B1%BB%E4%B8%8E%E4%BC%AA%E5%85%83%E7%B4%A0">伪类与伪元素</a></p>
<p><a href="#%E7%94%BB%E4%B8%AA%E4%B8%89%E8%A7%92%E5%BD%A2">画个三角形</a></p>
<p><a href="#%E7%9B%92%E6%A8%A1%E5%9E%8B">盒模型</a></p>
<p><a href="#BFC">BFC</a></p>
<p><a href="#%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8">清除浮动</a></p>
<p><a href="#%E5%B8%83%E5%B1%80">各种布局</a></p>
<ul>
<li>
<p><a href="#flex">flex布局</a></p>
</li>
<li>
<p><a href="#grid">grid布局</a></p>
</li>
<li>
<p><a href="#%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD">水平垂直居中</a></p>
</li>
<li>
<p><a href="#%E5%B7%A6%E8%BE%B9%E5%9B%BA%E5%AE%9A%E5%AE%BD%EF%BC%8C%E5%8F%B3%E8%BE%B9%E8%87%AA%E9%80%82%E5%BA%94">左边固定宽，右边自适应</a></p>
</li>
<li>
<p><a href="%E5%B7%A6%E5%9B%BE%E5%8F%B3%E6%96%87%E5%B8%83%E5%B1%80">左图右文布局</a></p>
</li>
<li>
<p><a href="#%E7%80%91%E5%B8%83%E6%B5%81%E6%95%88%E6%9E%9C">瀑布流效果</a></p>
</li>
<li>
<p><a href="#%E5%9C%A3%E6%9D%AF%E3%80%81%E5%8F%8C%E9%A3%9E%E7%BF%BC">圣杯、双飞翼</a></p>
</li>
</ul>
<h2 id="选择器" tabindex="-1"><a class="header-anchor" href="#选择器" aria-hidden="true">#</a> 选择器</h2>
<ul>
<li>通用选择器（*）</li>
<li>标签选择器（div、p、span）</li>
<li>id选择器（#foo）</li>
<li>class选择器（.foo）</li>
<li>属性选择器（a[href=&quot;https://example.org&quot;]）</li>
<li>相邻选择器（h1+p）</li>
<li>子选择器（ul&gt;li）</li>
<li>后代选择器（li a）</li>
<li>伪类选择器（:last-child、:hover、:focus）</li>
<li>伪元素选择器（::before、::after）</li>
</ul>
<p>根据 css 放置位置计算权重：</p>
<ul>
<li>!important &gt; 行内样式 &gt; 内联样式 &gt; 外联样式</li>
</ul>
<p>根据 css 选择器性质计算权重</p>
<ul>
<li>!important &gt; id &gt; 类、属性、伪类选择器 &gt; 标签选择器、伪元素选择器</li>
</ul>
<h2 id="伪类与伪元素" tabindex="-1"><a class="header-anchor" href="#伪类与伪元素" aria-hidden="true">#</a> 伪类与伪元素</h2>
<p>w3c引入这两个概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分</p>
<p>伪类用于当已有元素处于的某个状态时，为其添加对应的样式（:last-child、:hover、:focus）</p>
<p>伪元素用于创建一些不再文档树中的元素，并为其添加样式（::before、::after）</p>
<p>伪类和伪元素的区别在于：<strong>有没有创建一个文档树之外的元素</strong></p>
<ul>
<li>语法不同，伪类用冒号，伪元素用双冒号</li>
<li>可以同事使用多个伪类，但只能同时使用一个伪元素</li>
<li>在计算权重时，伪类与类优先级相同，伪元素与标签优先级相同</li>
</ul>
<blockquote>
<p>PS：一些早期的伪元素曾使用单冒号的语法，所以你可能会在代码或者示例中看到。现代的浏览器为了保持后兼容，支持早期的带有单双冒号语法的伪元素</p>
</blockquote>
<p>伪类思维导图</p>
<p><img src="https://i.loli.net/2021/10/08/2zSThQidZUqAtIf.png" alt="伪类思维导图"></p>
<p>伪元素思维导图：</p>
<p><img src="https://i.loli.net/2021/10/08/mSA8fvzoYdwGeCc.png" alt="伪元素思维导图"></p>
<h2 id="画个三角形" tabindex="-1"><a class="header-anchor" href="#画个三角形" aria-hidden="true">#</a> 画个三角形</h2>
<p>宽高为0，border三边设置透明transparent，一边设置颜色</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.sanjiaoxing</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 10px solid transparent<span class="token punctuation">;</span>
  <span class="token property">border-left</span><span class="token punctuation">:</span> 10px solid black<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><a href="https://codepen.io/jojobo/pen/XWaKwMy" target="_blank" rel="noopener noreferrer">线上demo<ExternalLinkIcon/></a></p>
<h2 id="盒模型" tabindex="-1"><a class="header-anchor" href="#盒模型" aria-hidden="true">#</a> 盒模型</h2>
<p>盒模型由 margin、border、padding、content 组成</p>
<p>分两种</p>
<ul>
<li>标准盒模型
<ul>
<li>width = content 宽度</li>
<li>height = content 高度</li>
</ul>
</li>
<li>IE模型
<ul>
<li>width = border + padding + content 宽度</li>
<li>height = border + padding + content 高度</li>
</ul>
</li>
</ul>
<p>在浏览器中，默认是标准盒模型，css 的写法是 <code>box-sizing: content-box</code>。如果要切换成 IE 模式（也叫怪异盒子），写法为 <code>box-sizing: border-box</code>。</p>
<h2 id="外边距重叠" tabindex="-1"><a class="header-anchor" href="#外边距重叠" aria-hidden="true">#</a> 外边距重叠</h2>
<p>块的上边距(margin-top)和下外边距(margin-bottom)有时合并（折叠）为单个边距，其大小为单个边距的最大值（或如果它们相等，则仅为其中一个），这种行为称为<strong>边距折叠</strong></p>
<p>有三种情况会引起外边距重叠</p>
<ul>
<li>
<p>同一层相邻元素之间</p>
<ul>
<li>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
p:nth-child(1)</span><span class="token punctuation">{</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">p:nth-child(2)</span><span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 87px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style>

&lt;p>下边界范围会...&lt;/p>
&lt;p>...会跟这个元素的上边界范围重叠。&lt;/p>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li>
<li>
<p><a href="https://codepen.io/jojobo/pen/MWvedqz?editors=1100" target="_blank" rel="noopener noreferrer">线上demo<ExternalLinkIcon/></a></p>
</li>
</ul>
</li>
<li>
<p>没有内容将父元素和后代元素分开</p>
<ul>
<li>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style type="text/css">
    section</span>    <span class="token punctuation">{</span>
        <span class="token property">margin-top</span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 87px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">header</span> <span class="token punctuation">{</span>
        <span class="token property">margin-top</span><span class="token punctuation">:</span> 87px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">footer</span> <span class="token punctuation">{</span>
        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
&lt;/style>

&lt;section>
    &lt;header>上边界重叠 87&lt;/header>
    &lt;main>&lt;/main>
    &lt;footer>下边界重叠 87 不能再高了&lt;/footer>
&lt;/section>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></li>
<li>
<p><a href="https://codepen.io/jojobo/pen/WNExVwN?editors=1100" target="_blank" rel="noopener noreferrer">线上demo<ExternalLinkIcon/></a></p>
</li>
</ul>
</li>
<li>
<p>空的块级元素</p>
<ul>
<li>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">&lt;style>
p</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">margin-top</span><span class="token punctuation">:</span> 13px<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 87px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
&lt;/style>

&lt;p>上边界范围是 87 ...&lt;/p>
&lt;div>&lt;/div>
&lt;p>... 上边界范围是 87&lt;/p>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li>
<li>
<p><a href="https://codepen.io/jojobo/pen/qBXNzgX?editors=1100" target="_blank" rel="noopener noreferrer">线上demo<ExternalLinkIcon/></a></p>
</li>
</ul>
</li>
</ul>
<p>解决方案</p>
<ul>
<li>将其设置为浮动元素、inline-block 元素、绝对定位元素、将父元素设置为 BFC（仅限第二种父中有子情况）</li>
</ul>
<h2 id="bfc" tabindex="-1"><a class="header-anchor" href="#bfc" aria-hidden="true">#</a> <RouterLink to="/CSS/BFC%E6%98%AF%E4%BB%80%E4%B9%88.html">BFC</RouterLink></h2>
<p>什么是BFC？</p>
<ul>
<li>块级上下文作用域，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域</li>
</ul>
<p>怎么引起BFC？</p>
<ul>
<li>根元素（html ）</li>
<li>浮动元素（元素的 float 不是 none）</li>
<li>绝对定位元素（元素的 position 为 absolute 或 fixed）</li>
<li>display的值为table-cell、table-caption和inline-block、flex 、inline-flex、grid、 inline-grid中的任何一个（表格单元格、表格单元格、行内块元素、弹性元素、网格元素）</li>
<li>overflow 不会 visible 的块级元素</li>
<li>匿名表格单元格元素</li>
</ul>
<p>BFC 有什么用？</p>
<ul>
<li>清除浮动</li>
<li>解决外边距重叠问题</li>
<li>自适应布局（最主要的问题）</li>
</ul>
<p>BFC 有什么不足？</p>
<p>已经过时，现在用 flex 布局能代替 BFC 的作用，并且更加强大</p>
<h2 id="清除浮动" tabindex="-1"><a class="header-anchor" href="#清除浮动" aria-hidden="true">#</a> 清除浮动</h2>
<p>在父元素后面添加一个伪元素，设置为 block，并清除左右浮动</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.container::after</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> bothd
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="布局" tabindex="-1"><a class="header-anchor" href="#布局" aria-hidden="true">#</a> 布局</h2>
<h3 id="flex布局" tabindex="-1"><a class="header-anchor" href="#flex布局" aria-hidden="true">#</a> <RouterLink to="/CSS/flex.html">flex布局</RouterLink></h3>
<h3 id="grid布局" tabindex="-1"><a class="header-anchor" href="#grid布局" aria-hidden="true">#</a> <RouterLink to="/CSS/grid.html">grid布局</RouterLink></h3>
<h3 id="水平垂直居中" tabindex="-1"><a class="header-anchor" href="#水平垂直居中" aria-hidden="true">#</a> <RouterLink to="/CSS/%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD.html">水平垂直居中</RouterLink></h3>
<h3 id="左边固定宽-右边自适应" tabindex="-1"><a class="header-anchor" href="#左边固定宽-右边自适应" aria-hidden="true">#</a> <RouterLink to="/CSS/%E5%B7%A6%E8%BE%B9%E5%9B%BA%E5%AE%9A%E5%AE%BD%EF%BC%8C%E5%8F%B3%E8%BE%B9%E8%87%AA%E9%80%82%E5%BA%94.html">左边固定宽，右边自适应</RouterLink></h3>
<h3 id="左图右文布局" tabindex="-1"><a class="header-anchor" href="#左图右文布局" aria-hidden="true">#</a> <RouterLink to="/CSS/%E5%B7%A6%E5%9B%BE%E5%8F%B3%E6%96%87%E5%B8%83%E5%B1%80.html">左图右文布局</RouterLink></h3>
<h3 id="瀑布流效果" tabindex="-1"><a class="header-anchor" href="#瀑布流效果" aria-hidden="true">#</a> <RouterLink to="/CSS/%E7%80%91%E5%B8%83%E6%B5%81%E6%95%88%E6%9E%9C.html">瀑布流效果</RouterLink></h3>
<h3 id="圣杯、双飞翼" tabindex="-1"><a class="header-anchor" href="#圣杯、双飞翼" aria-hidden="true">#</a> <RouterLink to="/CSS/%E5%9C%A3%E6%9D%AF%E3%80%81%E5%8F%8C%E9%A3%9E%E7%BF%BC.html">圣杯、双飞翼</RouterLink></h3>
<h2 id="block、inline-block、inline对比" tabindex="-1"><a class="header-anchor" href="#block、inline-block、inline对比" aria-hidden="true">#</a> block、inline-block、inline对比</h2>
<ul>
<li>block
<ul>
<li>块级元素，独占一行</li>
<li>常见元素：div、p、h1...h6、ul、ol、dl、address、blockquote</li>
</ul>
</li>
<li>inline-block
<ul>
<li>行内块元素，不独占一行，又可以设置宽度和高度</li>
</ul>
</li>
<li>inline
<ul>
<li>行内元素，相连的排在一行，拍不下时换行</li>
<li>常见元素：span、a、input、select、textarea、img、br、strong、em、label</li>
</ul>
</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/" target="_blank" rel="noopener noreferrer">总结伪类和伪元素<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6844904117819850765" target="_blank" rel="noopener noreferrer">【面试题】CSS知识点整理(附答案)<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://juejin.cn/post/6888102016007176200" target="_blank" rel="noopener noreferrer">【建议收藏】css晦涩难懂的点都在这啦<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s/KoIpUnJtUp2Y5bComYRHHw" target="_blank" rel="noopener noreferrer">margin: auto的魔法<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
