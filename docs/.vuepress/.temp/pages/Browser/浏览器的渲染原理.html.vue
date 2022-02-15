<template><h1 id="浏览器的渲染原理" tabindex="-1"><a class="header-anchor" href="#浏览器的渲染原理" aria-hidden="true">#</a> 浏览器的渲染原理</h1>
<h2 id="浏览器工作大致流程" tabindex="-1"><a class="header-anchor" href="#浏览器工作大致流程" aria-hidden="true">#</a> 浏览器工作大致流程</h2>
<p>先上一张图：</p>
<p><img src="https://i.loli.net/2021/06/03/zEAmsLgQ3tXu89P.jpg" alt="浏览器渲染大致流程"></p>
<p>从图中我们可以知道：</p>
<ol>
<li>浏览器会解析三个东西：
<ol>
<li>一个是HTML/SVG/XHTML，事实上，webkit 有三个 C++ 的类对应这三类文档。解析这三种文件产生一个 DOM Tree。</li>
<li>CSS，解析 CSS 会产生 CSS 规则树</li>
<li>JavaScript，脚本，主要是通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree</li>
</ol>
</li>
<li>解析完成后，浏览器引擎会通过 DOM Tree 和 CSS Rule Tree 来构造 Rendering Tree，注意：
<ol>
<li>Rendering Tree 渲染树并不等同于 DOM 树，因为一些像 Header 或 display:none 的东西就没必要放在渲染树上</li>
<li>CSS 的 Rule Tree 主要是为了完成匹配并把 CSS Rule 附加上 Rendering Tree 上的每个 Element。也就是DOM节点。也就是所谓的 Frame。</li>
<li>然后，计算每个 Frame（也就是每个Element）的位置，这又叫 layout 和 reflow（回流）过程</li>
</ol>
</li>
<li>最后通过调用操作系统 Native GUI 的 API 绘制</li>
</ol>
<h2 id="dom解析" tabindex="-1"><a class="header-anchor" href="#dom解析" aria-hidden="true">#</a> DOM解析</h2>
<p>HTML 的 DOM Tree 解析如下：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Web page parsing<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Web page parsing<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>This is an example Web page.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>上面这段HTML会解析成这样：</p>
<p><img src="https://i.loli.net/2021/06/03/km1FEpcSAJOl9xf.jpg" alt="DOM-Tree-01"></p>
<p>下面是另一个有SVG标签的情况：</p>
<p><img src="https://i.loli.net/2021/06/03/wxiaKertykuEYl3.jpg" alt="DOM-Tree-02"></p>
<h2 id="css解析" tabindex="-1"><a class="header-anchor" href="#css解析" aria-hidden="true">#</a> CSS解析</h2>
<p>CSS的解析大概是下面这个样子（下面是Firefox的玩法），假设我们有下面的HTML文档：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>doc</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>A few quotes<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>para</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emph<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      Franklin said that <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>quote</span><span class="token punctuation">></span></span>"A penny saved is a penny earned."<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>quote</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>para</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>para</span><span class="token punctuation">></span></span>
      FDR said
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>quote</span><span class="token punctuation">></span></span>"We have nothing to fear but 
        	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>emph<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>fear itself.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>"
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>quote</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>para</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>doc</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>于是 DOM Tree 是这个样子：</p>
<p><img src="https://i.loli.net/2021/06/03/amq93DJLexcyjQM.jpg" alt="DOM-Tree-Example"></p>
<p>然后我们的CSS文档是这样的：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* rule 1 */</span> <span class="token selector">doc</span> <span class="token punctuation">{</span> <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span> <span class="token property">text-indent</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment">/* rule 2 */</span> <span class="token selector">title</span> <span class="token punctuation">{</span> <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span> <span class="token property">font-size</span><span class="token punctuation">:</span> 3em<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment">/* rule 3 */</span> <span class="token selector">para</span> <span class="token punctuation">{</span> <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token comment">/* rule 4 */</span> <span class="token selector">[class="emph"]</span> <span class="token punctuation">{</span> <span class="token property">font-style</span><span class="token punctuation">:</span> italic<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>于是我们的CSS Rule Tree 会是这个样子：</p>
<p><img src="https://i.loli.net/2021/06/03/tA2lqIs41EUTaze.jpg" alt="CSS-Rule-Tree-Example"></p>
<p>途中的第四条规则出现了两次，一次是独立的，一次是在规则3的子节点。所以，我们可以知道，建立CSS Rule Tree 是需要比照着 DOM Tree 来着。CSS 匹配 DOM Tree 主要是从右到左解析 CSS 的 Selector，好多人以为这个事会比较快，其实并不一定。关键还看我们的 CSS 的 Selector 怎么写了。</p>
<p><strong>注意：CSS 匹配 HTML 元素是一个相对复杂和有性能问题的事情。所以，你就会在N多地方看到很多人都告诉你，DOM 树要小，CSS 尽量用 id 和 class ，千万不要过度层叠下去......</strong></p>
<p>所以，Firefox 基本上来说是通过 CSS 解析生成 CSS Rule Tree，然后，通过对比 DOM 生成 Style Context Tree，然后 Firefox 通过把 Style Content Tree 和其 Render Tree（Frame Tree）关联上，就完成了。主要：Render Tree 会把一些不可见的节点去除掉。而 <strong>Firefox 中所谓的 Frame就是一个DOM节点，不要被其名字所迷惑了</strong></p>
<p><img src="https://i.loli.net/2021/06/03/tFjHvRyMh9JZ6lY.png" alt="Firefox-style-context-tree"></p>
<p>注：Webkit不像Firefox要用两个树来干这个，Webkit也有Style对象，它直接把这个Style对象存在了相应的DOM结点上了</p>
<h2 id="渲染" tabindex="-1"><a class="header-anchor" href="#渲染" aria-hidden="true">#</a> 渲染</h2>
<p>渲染的流程基本上如下（黄色的四个步骤）：</p>
<ol>
<li>计算 CSS 样式</li>
<li>构建 Render Tree</li>
<li>Layout - 定位坐标和大小，是否换行，各种 position，overflow，z-index 属性...</li>
<li>正式绘制</li>
</ol>
<p><img src="https://i.loli.net/2021/06/03/oMqHztC1QaLw4U3.jpg" alt="Firefox-style-context-tree"></p>
<p>注意：上图流程中有很多连接线，这表示了 JavaScript 动态修改了 DOM 属性或时 CSS 属性会导致重新 Layout，有些改变不会，就是那些指到天上的箭头，比如，修改后的 CSS rule 没有被匹配到等</p>
<p>这里重要说两个概念，一个是 Repaint ，另一个是 Reflow，这两个不是一回事</p>
<ul>
<li>
<p>Repaint——屏幕的一部分要重画，比如某个 CSS 的背景色变了。但是元素的集合尺寸没有变</p>
</li>
<li>
<p>Reflow——意味着元件的几何尺寸变了，我们需要重新验证并计算 Render Tree。是 Render Tree 的一部分或全部发生了变化。这就是 Reflow，或是 Layout（HTML 使用的是 flow based layout，也就是流式布局，所以，如果某元件的几何尺寸发生了变化，需要重更新布局，也就叫 Reflow）。Reflow 会从<code>&lt;html&gt;</code> 这个 root frame 开始递归往下，一次计算所有的结点几何尺寸和位置，在 Reflow 过程中，可能会增加一些 frame，比如一个文本字符串必须被包装起来</p>
</li>
</ul>
<p>总之，Reflow 的成本比 Repaint 的成本高得多。DOM Tree 里的每个节点都会有 Reflow 方法，一个节点的 Reflow 很有可能导致子节点，甚至父点以及同级节点的 Reflow</p>
<p>所以，以下动作很大可能会是成本比较高的：</p>
<ul>
<li>当你增加、删除、修改DOM节点时，会导致 Reflow 或 Repaint</li>
<li>当你移动 DOM 的位置，或时搞个动画的时候</li>
<li>当你修改 CSS 样式的时候</li>
<li>当你 Resize 窗口的时候（移动端没有这个问题），或是滚动的时候</li>
<li>当你修改网页的默认字体时</li>
</ul>
<p>注：display:none 会触发 Reflow，而 visibility: hidden 只会触发 Repaint，因为没有发现位置变化</p>
<p>我们的浏览器时聪明的，它会把修改的操作积攒一批，然后做一次 Reflow，这叫做异步 Reflow 或增量异步 Reflow。但有些情况浏览器不会这样做，比如：resize 窗口、改变了页面某人的字体等。对于这些操作，浏览器会马上进行 Reflow</p>
<h2 id="减少reflow-回流-repaint-重绘" tabindex="-1"><a class="header-anchor" href="#减少reflow-回流-repaint-重绘" aria-hidden="true">#</a> 减少reflow（回流）/repaint（重绘）</h2>
<p>下面时一些 Best Practices:</p>
<p><strong>1) 不要一条一条地修改 DOM 的样式。与其这样，不如预先定义好 CSS 的class，然后修改 DOM 的 className</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// bad</span>
<span class="token keyword">var</span> left <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span> top <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token string">"px"</span><span class="token punctuation">;</span>
el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>top <span class="token operator">=</span> top <span class="token operator">+</span> <span class="token string">"px"</span><span class="token punctuation">;</span>

<span class="token comment">// Good</span>
el<span class="token punctuation">.</span>className <span class="token operator">+=</span> <span class="token string">"theclassname"</span><span class="token punctuation">;</span>

<span class="token comment">// Good</span>
el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>cssText <span class="token operator">+=</span> <span class="token string">";left:"</span> <span class="token operator">+</span>left <span class="token operator">+</span> <span class="token string">"px;top:"</span> <span class="token operator">+</span> top <span class="token operator">+</span> <span class="token string">"px;"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>2) 把 DOM &quot;离线&quot;后修改。如:</strong></p>
<ul>
<li>使用 documentFragment 对象在内存里操作 DOM</li>
<li>先把 DOM 给 display：none（有一次 Reflow），然后你想怎么改就怎么改。比如修改 100 次，然后再把它显示出来</li>
<li>clone 一个 DOM 节点到内存里，然后想怎么改就怎么改，改完后，和在线的那个交换一下</li>
</ul>
<p>**3）不要把 DOM 节点的属性值放在一个循环里当作循环的变量。**不然这会导致大量地读写这个节点的属性</p>
<p><strong>4）尽可能地修改层级比较低的DOM</strong>。当然，改变层级比较底的 DOM 也有可能造成大面积的 Reflow，但是也可能影响范围很小</p>
<p><strong>5）为动画的 HTML 元件使用 fixed 或 absolute 的 position</strong>，那么修改它们的 CSS 是不会 Reflow 的</p>
<p>**6）千万不要使用 table 布局。**因为可能很小的一个改动会造成整个 table 的重新布局</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>浏览器渲染三个步骤，解析，渲染，绘制</p>
<p>解析：三种语言都要分析，HTML 被解析为 DOM 树，CSS 被解析成 CSS 规则树，JavaScript 通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree</p>
<p>渲染：浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree（渲染树），这其中进行大量的 Reflow 和 Repaint</p>
<p>绘制：最后调用操作系统的 Native GUI 的 API 绘制</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li>
<p><a href="https://coolshell.cn/articles/9666.html" target="_blank" rel="noopener noreferrer">浏览器的渲染原理简介<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=Mzg5NDEyMzA2NQ==&amp;mid=2247484400&amp;idx=1&amp;sn=9c7d4b7f346034fd06e2a587cb9c58cf&amp;chksm=c0252ea6f752a7b06e0e6ba4346581fbe864ec769963ffa6cf4b0c7204f4afb0ddb44a76e6cd&amp;mpshare=1&amp;scene=1&amp;srcid=1008vvgoRuGQgyy1MwuzlS8T&amp;sharer_sharetime=1570506760100&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">深入理解现代浏览器<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://zhuanlan.zhihu.com/p/96986818?tdsourcetag=s_pctim_aiomsg" target="_blank" rel="noopener noreferrer">万字详文：深入理解浏览器原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&amp;mid=2451046766&amp;idx=1&amp;sn=4d9177602ebd278bfa5c5bc959598b73&amp;chksm=87c4187eb0b3916869bc64d39e7b3c6e59bb2c5fe2789d9a888be2cb6cda4c7cc4ff05d99e8b&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1583904346478&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">现代浏览器内部工作原理（附详细流程图）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000022633988" target="_blank" rel="noopener noreferrer">前端都该懂的浏览器工作原理<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
