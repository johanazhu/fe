<template><h1 id="virtual-dom" tabindex="-1"><a class="header-anchor" href="#virtual-dom" aria-hidden="true">#</a> Virtual DOM</h1>
<blockquote>
<p>我不要你觉得，我要我觉得。这也是学习的一种方式，用自己的话表达出来，毕竟自己说的话要是不懂的话，那怎么可能</p>
</blockquote>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>以前的前端开发量少，所以基本上是对 DOM 直接操作，后来随着前端工程化的不断发展，有了各种 <RouterLink to="/JavaScript/%E5%8E%9F%E7%90%86/%E6%A8%A1%E6%8B%9FMVVM%E7%9A%84%E5%AE%9E%E7%8E%B0.html">MVVM</RouterLink> 模式的前端框架，这些框架共有的特点就是不再关心具体 DOM 的操作，而是把重心放在了基于数据状态的操作，一旦数据更改，跟它绑定的那个地方的 DOM 也会跟着变化</p>
<p>近年前端发展发生了两个变化</p>
<ul>
<li>
<p>命令式——声明式</p>
</li>
<li>
<p>关注API——关注数据</p>
</li>
</ul>
<p>我们的心智得到解脱，不用再记操作DOM的各种长的要命的API（即使JQuery能减轻一些压力），而去注重数据（状态）。以前用 JavaScript 写各种操作页面，动态语言，赋值变来变去；现在追求纯函数、函数式编程、数据不可变，最好用 TS 加上各种库来让我们的应用更加健硕</p>
<p>这样也导致了一个问题，我们去关注数据，去做前端工程化，也慢慢内卷着学习算法，仔细想想，前端最重要的难道不该是体验吗</p>
<h2 id="快速了解" tabindex="-1"><a class="header-anchor" href="#快速了解" aria-hidden="true">#</a> 快速了解</h2>
<p>什么是 Virtual DOM</p>
<ul>
<li>一个描述真实 DOM 的对象</li>
</ul>
<p>为什么需要 Virtual DOM</p>
<ul>
<li>
<p>为声明式编程打开了大门</p>
</li>
<li>
<p>减少页面的渲染、提高性能</p>
</li>
<li>
<p>提供了更好的跨平台能力</p>
</li>
</ul>
<p>React 中的 Virtual DOM</p>
<ul>
<li>工作流程</li>
</ul>
<p>如何实现 Virtual DOM</p>
<ul>
<li>
<p>现实中实现 Virtual DOM 的库有哪些</p>
</li>
<li>
<p>我们按步骤完成 Virtual DOM</p>
</li>
</ul>
<h2 id="什么是-virtual-dom" tabindex="-1"><a class="header-anchor" href="#什么是-virtual-dom" aria-hidden="true">#</a> 什么是 Virtual DOM</h2>
<p><a href="https://zh-hans.reactjs.org/docs/faq-internals.html#gatsby-focus-wrapper" target="_blank" rel="noopener noreferrer">React 的官网<ExternalLinkIcon/></a>这样描述</p>
<blockquote>
<p>Virtual DOM 是一种编程概念。在这个概念里，UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，并通过如 ReactDOM 等类库使之与“真实的”DOM 同步。这一过程叫做协调</p>
<p>这种方式赋予了 React 声明式的 API：您告诉 React 希望让 UI 是什么状态，React 就确保 DOM 匹配该状态。这使您可以从属性操作、事件处理和手动 DOM 更新这些在构建应用程序时必要的操作中解放出来</p>
</blockquote>
<p>React 的<RouterLink to="/React/React%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3.html">理念之一</RouterLink>是 UI = f(data) ，我们通过改变 data 驱动 UI，不必去关注属性操作、事件处理和手动 DOM 更新，只用关心数据即可。而改变 data 怎么更新 UI，就是 React 做的事情了。React 怎么做的呢？</p>
<h3 id="react-写-ui-到渲染视图过程" tabindex="-1"><a class="header-anchor" href="#react-写-ui-到渲染视图过程" aria-hidden="true">#</a> React 写 UI 到渲染视图过程</h3>
<p>用 JSX 来写业务，JSX 其实是 createElement 的语法糖，createElement 生成一个 JS 对象，这个对象就是 Virtual DOM，它描述真实 DOM 树。当状态改变，生成新的 Virtual DOM，两者 Diff，拿着这段 patches 更新页面，减少页面的最小绘制</p>
<p>例如如下 DOM 结构：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Item1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Item2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>映射成虚拟 DOM 就是这样：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    tag<span class="token operator">:</span> <span class="token string">"ul"</span><span class="token punctuation">,</span>
    attrs<span class="token operator">:</span> <span class="token punctuation">{</span>
        id<span class="token operator">:</span> <span class="token string">"list"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            tag<span class="token operator">:</span> <span class="token string">"li"</span><span class="token punctuation">,</span>
            attrs<span class="token operator">:</span> <span class="token punctuation">{</span> className<span class="token operator">:</span> <span class="token string">"item"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Item1"</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
            tag<span class="token operator">:</span> <span class="token string">"li"</span><span class="token punctuation">,</span>
            attrs<span class="token operator">:</span> <span class="token punctuation">{</span> className<span class="token operator">:</span> <span class="token string">"item"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Item2"</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>而我们写的 React 大概是这样：</p>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>function Demo() {
    return (
    	&lt;ul id=&quot;list&quot;&gt;
            &lt;li className=&quot;item&quot;&gt;Item1&lt;/li&gt;	
            &lt;li className=&quot;item&quot;&gt;Item2&lt;/li&gt;	
        &lt;/ul&gt;	
    )
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>总结来说，理解 Virtual DOM 的含义可以从以下几点出发：</p>
<ol>
<li>Virtual DOM 就是描述真实 DOM 的一个对象，并且它至少包含了 tag、props、children 三个属性</li>
<li>Virtual DOM 并不是真实的 DOM，它跟原生 DOM 本质上没有什么关系</li>
<li>本质上 Virtual DOM 对应的是一个 JavaScript 对象，它描述的是视图和应用状态之间的一种映射关系，是某一时刻真实 DOM 状态的内存映射</li>
<li>在视图显示方面，Virtual DOM 对象的节点跟真实 DOM Tree 每个位置的属性一一对应</li>
<li>我们不再需要直接的操作 DOM，只需要关注应用的状态即可，操作 DOM 的事情由框架做了</li>
</ol>
<h2 id="为什么需要-virtual-dom" tabindex="-1"><a class="header-anchor" href="#为什么需要-virtual-dom" aria-hidden="true">#</a> 为什么需要 Virtual DOM</h2>
<p>首先我们要知道操作 DOM 是耗费性能的，操作频繁会引起页面卡顿影响用户体验，而 Virtual DOM 的作用之一是减低不必要的 DOM API 调用</p>
<p>我们想一想如果没有 Virtual DOM，把页面从数据展示到 DOM 上最直接的方式是重置 innerHTML，即你更新数据后，把页面重置。但是如果是一行数据变化，也需要重置整个 innerHTML，就显然很浪费。如果加一层 Virtual DOM 呢，无论你数据如何变化（多次操作），先将它转换为 Virtual DOM，再渲染到 DOM 上，减少了 DOM 重排的次数，进而缩短生成渲染树和绘制所花的时间</p>
<p>React 相对于直接操作原生 DOM 最大的优势在于 batching（批处理）和 diff。为了尽量减少不必要的 DOM 操作，Virtual DOM 在执行 DOM 的更新操作后，不会直接操作真实 DOM，而是根据当前应用状态的数据，生成一个全新的 Virtual DOM，然后跟上一次生成的 Virtual DOM 对比（diff），得到一个 Patch，这样就找到变化了的 DOM 系欸但，针对变化部分进行 DOM 更新，而部重新渲染整个 DOM 树，这个过程就是 diff。</p>
<p>所谓的 batching 就是将多次比较的结果合并后一次性更新到页面，从而有效地减少页面渲染的次数，提高渲染效率。无论是 batching 还是 diff，都是为了尽量减少对 DOM 的调用。简要的示意图如下：</p>
<p><img src="https://i.loli.net/2021/09/08/5YykqprTiPME8On.png" alt="diff过程"></p>
<p>因此总结下关于 Virtual DOM 的优势有哪些：</p>
<ol>
<li>为函数式的 UI 编程打开了大门，我们不需要再去考虑具体 DOM 的操作，框架已经替我们做了，我们可以用更加声明式的方式书写代码</li>
<li>减少页面渲染的次数，提高渲染效率</li>
<li>提供了更好的跨平台能力，因为 Virtual DOM 是以 JavaScript 对象为基础而不依赖具体的平台环境，因此可以适用于其他的平台，如 native、VR、小程序</li>
</ol>
<p>附上知乎上 <a href="https://www.zhihu.com/question/31809713/answer/53544875" target="_blank" rel="noopener noreferrer">尤雨溪 对于 Virtual DOM 的优势的回答<ExternalLinkIcon/></a></p>
<h2 id="react-中的-virtual-dom-如何实现的" tabindex="-1"><a class="header-anchor" href="#react-中的-virtual-dom-如何实现的" aria-hidden="true">#</a> React 中的 Virtual DOM 如何实现的</h2>
<p>ReactElement</p>
<p>ReactFiber</p>
<h2 id="如何实现-virtual-dom" tabindex="-1"><a class="header-anchor" href="#如何实现-virtual-dom" aria-hidden="true">#</a> 如何实现 Virtual DOM</h2>
<blockquote>
<p>React 最核心的  Virtual DOM 、diff算法，打从最开始的 virtual-dom 库开始，人们就发现更快的 diff 优化方案，原来官方做的东西不是最优的（fb方面其实更关注于其平台覆盖度，让它可以在各种平台上运行，而不是DOM环境 ）。于是大家在virtual-dom上面的改动才会更来劲。diff算法基本上把字符串算法那套挪过来了，比如最短编辑长度距离，最长上升序列。。。</p>
<p>现在市面上有上百个虚拟DOM库，我当时集中研究其中前十名：</p>
<p><img src="https://i.loli.net/2021/09/08/2mAcHwo18WPZTLv.png" alt="虚拟DOM库"></p>
</blockquote>
<p>附上知乎上 <a href="https://www.zhihu.com/question/344288548/answer/814347078" target="_blank" rel="noopener noreferrer">司徒正美对类 React 框架层出不穷的回答<ExternalLinkIcon/></a></p>
<h3 id="实现mini-virtual-dom" tabindex="-1"><a class="header-anchor" href="#实现mini-virtual-dom" aria-hidden="true">#</a> 实现mini Virtual DOM</h3>
<h4 id="步骤一-用-js-对象模拟-dom-树" tabindex="-1"><a class="header-anchor" href="#步骤一-用-js-对象模拟-dom-树" aria-hidden="true">#</a> 步骤一：用 JS 对象模拟 DOM 树</h4>
<p>用到原生操作 DOM 方法</p>
<ul>
<li>
<p>createElement</p>
</li>
<li>
<p>setAttribute</p>
</li>
<li>
<p>createTextNode</p>
</li>
<li>
<p>appendChild</p>
</li>
</ul>
<h4 id="步骤二-比较两棵虚拟-dom-树的差异" tabindex="-1"><a class="header-anchor" href="#步骤二-比较两棵虚拟-dom-树的差异" aria-hidden="true">#</a> 步骤二：比较两棵虚拟 DOM 树的差异</h4>
<h4 id="步骤三-把差异应用到真正的-dom-树上" tabindex="-1"><a class="header-anchor" href="#步骤三-把差异应用到真正的-dom-树上" aria-hidden="true">#</a> 步骤三：把差异应用到真正的 DOM 树上</h4>
<p>做一个 虚拟 dom，然后做 diff 对比，把需要更新的部分（patches）渲染到页面上</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.cn/post/6985058301184737287" target="_blank" rel="noopener noreferrer">你不知道的 React Virtual DOM<ExternalLinkIcon/></a></li>
<li><a href="https://www.zhihu.com/question/31809713" target="_blank" rel="noopener noreferrer">网上都说操作真实DOM慢...<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&amp;mid=2247496284&amp;idx=1&amp;sn=9409ad1a80fe8f18c8e18136ebd65dd0&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">从React 历史长河里聊虚拟DOM及其价值<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/livoras/blog/issues/13" target="_blank" rel="noopener noreferrer">如何实现一个VirtualDOM 算法<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.im/post/5c8e5e4951882545c109ae9c" target="_blank" rel="noopener noreferrer">让虚拟DOM和DOM-diff不在成为你的绊脚石<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/79408137" target="_blank" rel="noopener noreferrer">面试官问: 如何理解Virtual DOM？<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/2ddtB_yNx7r9_y7-sF7T-w" target="_blank" rel="noopener noreferrer">谈谈你对虚拟DOM原理的理解<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/GAviSEsBIsOturghONEZmw" target="_blank" rel="noopener noreferrer">谈谈对虚拟DOM的理解<ExternalLinkIcon/></a></li>
</ul>
</template>
