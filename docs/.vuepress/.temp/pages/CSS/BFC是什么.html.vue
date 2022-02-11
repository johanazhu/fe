<template><h1 id="css世界中的结界——bfc" tabindex="-1"><a class="header-anchor" href="#css世界中的结界——bfc" aria-hidden="true">#</a> CSS世界中的结界——BFC</h1>
<h2 id="bfc是什么" tabindex="-1"><a class="header-anchor" href="#bfc是什么" aria-hidden="true">#</a> BFC是什么</h2>
<p>BFC全称为 block formattng context，中文为“块级格式化上下文”。相对应的还有IFC，也就是 inline formatting context，中文为“内联格式化上下文”。</p>
<p>是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域</p>
<p>具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性</p>
<p>BFC的特征如结界一般，里面的人出不去，外面的人进不来</p>
<p>表现原则：如果一个元素具有BFC，内部子元素再怎么翻云覆雨，都不会影响外部的元素。所以，BFC元素是不可能发生 margin 重叠的，因为 margin 重叠时会影响外面的元素；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度坍塌，必然会影响后面元素布局和定位<strong>这显然有违BFC元素的子元素不会影响外部元素的设定</strong>。</p>
<p>如何触发BFC呢？常见的情况如下：</p>
<ul>
<li>根元素（html ）</li>
<li>浮动元素（元素的 float 不是 none）</li>
<li>绝对定位元素（元素的 position 为 absolute 或 fixed）</li>
<li>行内块元素（元素的 display 为 inline-block）</li>
<li>表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认该值）</li>
<li>表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）</li>
<li>匿名表格单元格元素（元素的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/display" target="_blank" rel="noopener noreferrer"><code>display</code><ExternalLinkIcon/></a> 为 <code>table、``table-row</code>、 <code>table-row-group、``table-header-group、``table-footer-group</code>（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 <code>inline-table</code>）</li>
<li>overflow 不会 visible 的块级元素</li>
<li>弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）</li>
<li>网格元素（display 为 grid 或 inline-grid 元素的直接子元素）</li>
</ul>
<p>还有其他的可以到<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>查看</p>
<p>换言之，只要元素符合上面任意一个元素，就无须使用 clear: both 属性去清除浮动的影响了。因为，不要见到一个 <code>&lt;div&gt;</code> 元素就加上类似.clearfix 的类名，否则只能暴雷你孱弱的CSS基本功</p>
<h2 id="bfc的作用" tabindex="-1"><a class="header-anchor" href="#bfc的作用" aria-hidden="true">#</a> BFC的作用</h2>
<h3 id="_1-清除内部浮动" tabindex="-1"><a class="header-anchor" href="#_1-清除内部浮动" aria-hidden="true">#</a> 1.清除内部浮动</h3>
<p>在布局时我们经常会遇到这种情况，对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要将父元素变成一个 BFC 就行。常用的做法如给父元素设置overflow: hidden 属性</p>
<h3 id="_2-垂直-margin-合并" tabindex="-1"><a class="header-anchor" href="#_2-垂直-margin-合并" aria-hidden="true">#</a> 2.垂直 margin 合并</h3>
<p>外边距合并的问题。</p>
<p>主要用到</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>盒子垂直方向的距离由margin决定。属于同一个BFC的两个相邻盒子的margin会发生重叠
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠，那么我们创建不属于同一个 BFC，就不会发生 margin 重叠了。</p>
<img src="https://i.loli.net/2021/06/03/YLG6tZU1J5RjluT.png" />
<h3 id="_3-自适应布局" tabindex="-1"><a class="header-anchor" href="#_3-自适应布局" aria-hidden="true">#</a> 3.自适应布局</h3>
<p>如下</p>
<h4 id="bfc与流式布局" tabindex="-1"><a class="header-anchor" href="#bfc与流式布局" aria-hidden="true">#</a> BFC与流式布局</h4>
<p><strong>BFC 的结界特性最重要的用途其实不是去 margin 重叠或者是清除 float 影响，而是实现更健壮、更智能的自适应布局</strong></p>
<p>我们从最基本的文字环绕效果说起，</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">*</span><span class="token punctuation">{</span>
	<span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
	<span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box</span> <span class="token punctuation">{</span>
	<span class="token property">width</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
	<span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.zhanan</span> <span class="token punctuation">{</span>
	<span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
	<span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
	<span class="token property">background</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.info</span> <span class="token punctuation">{</span>
	<span class="token property">background</span><span class="token punctuation">:</span> #f1f1f1<span class="token punctuation">;</span>
    <span class="token property">color</span><span class="token punctuation">:</span> #222<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>zhanan<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>渣男<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>info<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>资产100000000，上海三套房，劳斯莱斯两辆，上市公司CEO,肖战相貌，彭于晏身材，只爱你一个人...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>我们看到这样的场景：</p>
<p><img src="https://i.loli.net/2021/06/03/uKSvxCOnWcyLPG3.png" alt="BFC1"></p>
<p>给info加上 overflow：hidden</p>
<p><img src="https://i.loli.net/2021/06/03/oPjbLkCtgpwdZGI.png" alt="BFC1"></p>
<p>因为我们将 info 元素改造成了 BFC，所以具有 BFC 特性的元素的子元素不会受到外部元素影响，也不会影响外部元素，于是，这里的 info 元素为了不和浮动元素产生任何交集，顺着浮动边缘形成自己的封闭上下文</p>
<h2 id="bfc的局限" tabindex="-1"><a class="header-anchor" href="#bfc的局限" aria-hidden="true">#</a> BFC的局限</h2>
<p>有了 BFC 自适应布局，纯流体特性布局基本上没有了存在的价值。然后，只是理论上如此。如果 BFC 自适应布局真那么超能，那为何并没有口口相传呢？</p>
<p>因为绝大多数出发 BFC 的属性自身有一些古怪的特性，所以，实操时，能兼顾流体特性和 BFC 特性来实现自适应布局的属性并不多。接下来我们一个一个来看，</p>
<ol>
<li>float: left。浮动元素本身 BFC 化，然后浮动元素有破坏性和包裹性，失去了元素本身的流体自适应。因此无法用来实现自动填满容器的自适应布局。不过兼容性尚可，在 IE 时代被大肆使用，也就是常说的“浮动布局”</li>
<li>position: absolute。严重脱离文档流</li>
<li>overflow: hidden。最为常见的 BFC 使用属性。唯一的问题就是容器盒子外的元素可能会被隐藏掉</li>
<li>display: inline-block。在IE6和IE7上古浏览器中，兼容性比 overflow: hidden 更好</li>
<li>display: table-cell。兼容性要在IE8及以上版本的浏览器；二是应付连续英文字符换行有些吃力，适用场景比 overflow:hidden 更为宽泛</li>
<li>display: table-row。对 width 无感，无法自适应剩余容器空间。</li>
<li>display: table-caption。此属性一无是处</li>
</ol>
<p>还有其他声明对自适应布局也都一无是处，就不展开细说</p>
<p>总结一下。我们对 BFC 声明家族大致过了一边，能担任自适应布局重任的也就是一下几个：</p>
<ul>
<li>overflow: auto/hidden，适用于 IE7 及以上版本浏览器；</li>
<li>display: inline-block，适用于 IE6 和 IE7</li>
<li>display: table-cell，适用于 IE8 及以上版本浏览器</li>
</ul>
<p>最后，我们提炼出两套 IE7 及以上版本浏览器适配的自适应解决方案。</p>
<ol>
<li>借助 overflow 属性，如下：</li>
</ol>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.lbf-content</span> <span class="token punctuation">{</span> <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2">
<li>融合 display: table-cell 和 display: inline-block，如下：</li>
</ol>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.lbf-content</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> table-cell<span class="token punctuation">;</span> <span class="token property">width</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
    <span class="token comment">/* 如果不需要兼容IE7，以下样式可以省略 */</span>
    *<span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span> *<span class="token property">width</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这两种基于 BFC 的自适应方案均支持无限桥套，因此，多栏自适应可以通过嵌套方式实现。这两种方案均有一点不足，前者如果子元素要定位到父元素的外面可能会被隐藏，后者无法直接让连续英文字符换行。</p>
<p>最后，关于display: table-cell 元素内连续英文字符无法换行的问题，事实上是可以解决的，就是使用类似下面的 CSS 代码：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.word-break</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> table<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">table-layout</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
    <span class="token property">word-break</span><span class="token punctuation">:</span> break-all<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。包括浮动，和外边距合并等等，因此，有了这个特性，我们布局的时候就不会出现意外情况了。</p>
<p>但在我看来，BFC已成过去式，现在有更好的自适应布局手段——flex，在现代手机H5遍地的世界里，flex的兼容性已经足够了，</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.jianshu.com/p/acf76871d259" target="_blank" rel="noopener noreferrer">【CSS】深入理解BFC原理及应用<ExternalLinkIcon/></a></li>
<li><a href="https://book.douban.com/subject/27615777/" target="_blank" rel="noopener noreferrer">CSS世界：张鑫旭<ExternalLinkIcon/></a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context" target="_blank" rel="noopener noreferrer">Web 开发者指南<ExternalLinkIcon/></a></li>
</ul>
</template>
