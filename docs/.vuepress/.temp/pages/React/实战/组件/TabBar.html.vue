<template><h1 id="tabbar-组件" tabindex="-1"><a class="header-anchor" href="#tabbar-组件" aria-hidden="true">#</a> TabBar 组件</h1>
<p>首先，我们会想如何做一个TabBar 组件，该如何规划，让我们逆向思维，如果我们用TabBar组件时我们希望它是怎么样的写法以及需要传递什么值（props）来展示。</p>
<p>如果按照开发的思想看思路走</p>
<p>我们也许会做出像这种的</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabBar</span></span>
  <span class="token attr-name">currentIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span></span>
  <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token parameter">index</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
  <span class="token attr-name">list</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token string">'1'</span><span class="token punctuation">,</span> title<span class="token operator">:</span> <span class="token string">'理财产品'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token string">'2'</span><span class="token punctuation">,</span> title<span class="token operator">:</span> <span class="token string">'我的资产'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">}</span></span>
<span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabBar</span></span> 
    <span class="token attr-name">activeIndex</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>active<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabBar.Item</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>back<span class="token punctuation">"</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'aa'</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">标签1</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TabBar.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabBar.Item</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>setting<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">标签2</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TabBar.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabBar.Item</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>clock<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">标签3</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TabBar.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">TabBar.Item</span></span> <span class="token attr-name">icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>close<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token plain-text">标签4</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TabBar.Item</span></span><span class="token punctuation">></span></span><span class="token plain-text">
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">TabBar</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>我们当然可以把click事件绑定到Item标签上，但是如果你的Item多了，你不是要复制很多次吗？</p>
<p>这个时候聪明的你会不会联想到 雅虎军规中 代码优化中的减少dom操作，通过事件冒泡的形式来让子元素上的事件委托给父元素，让父元素代子元素点击，因为子元素为兄弟关系（结构相同，内容不同），只用绑定父元素就能很好的减少dom操作。</p>
<p>写到这里，如果是基本情况的Tabbar就已经差不多了，修改下css就通用了。但是我们的要求是希望功能更全面。比如他既可以当做底部的Tabbar用，也可以在页面中当做顶部导航切换，切换的时候能加下划线标识。当Item超过4个之后希望它能滑动。</p>
<p>只有让它先滑动起来，下划线跟着滑动就是，所以滑动是其中的重点。</p>
<p>按照这两个思路去想，需要改造css，布局将不采用flex布局，而是采用position定位。且需要有个wrapper包裹主Item</p>
<p>React.Children.count(this.props.children)</p>
<p>查看子元素的数量</p>
<details open>
    <summary> 我是标题</summary>
    <p>Requires a computer running an operating system. The computer
  must have some memory and ideally some kind of long-term storage.
  An input device as well as some form of output device is
  recommended.</p>
</details>
<p>如果有不明白的童靴，可以去了解下什么是 TabBar？</p>
<p>组件开发</p>
<p>文档写法 react-markdown-loader 也许可以，不知道</p>
<p>作者：金瓶世家</p>
<p>柯里化（curry）</p>
<p>概念：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数</p>
<p>flex 布局</p>
<p>Mixin（混入）是一种通过扩展手机功能的方式，它本质上是将一个对象的属性拷贝到另一个对象上，不过你可以拷贝 <code>任意多</code> 个对象的 <code>任意个</code> 方法到一个新对象上，这是 <code>继承</code> 所不能实现的。它的出现主要就是为了解决代码复用问题。</p>
<p>umi3 乾坤</p>
<p>做一个大的框架，包裹了 jquery现在的二合一项目，然后点击的时候跳转到其他的项目中。</p>
</template>
