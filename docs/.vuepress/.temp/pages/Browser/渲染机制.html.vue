<template><h1 id="浏览器渲染机制" tabindex="-1"><a class="header-anchor" href="#浏览器渲染机制" aria-hidden="true">#</a> 浏览器渲染机制</h1>
<p>在面试中我们常遇到这样的一个问题：从输入url到页面展示这一过程（浏览器）做了什么？</p>
<h2 id="渲染机制" tabindex="-1"><a class="header-anchor" href="#渲染机制" aria-hidden="true">#</a> 渲染机制</h2>
<p>1.处理HTML并构建DOM树</p>
<p>2.处理CSS构建CSSOM树</p>
<p>3.将DOM与CSSOM合并成一个渲染树</p>
<p>4.根据渲染树来布局，计算每个节点的位置</p>
<p>5.调用GPU回执，合成图层，显示在屏幕上</p>
<h2 id="重绘-repaint-和回流-reflow" tabindex="-1"><a class="header-anchor" href="#重绘-repaint-和回流-reflow" aria-hidden="true">#</a> 重绘（Repaint）和回流（Reflow）</h2>
<p>回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，</p>
<p>导致性能问题：</p>
<ul>
<li>改变window大小</li>
<li>改变字体</li>
<li>添加或删除样式</li>
<li>文字改变</li>
<li>定位或者浮动</li>
<li>盒模型</li>
</ul>
<h2 id="什么会引起回流" tabindex="-1"><a class="header-anchor" href="#什么会引起回流" aria-hidden="true">#</a> 什么会引起回流</h2>
<p>1.页面渲染初始化</p>
<p>2.DOM结构改变，比如删除了某个节点</p>
<p>3.render树变化，比如减少了padding</p>
<p>4.窗口的resize</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://coolshell.cn/articles/9666.html" target="_blank" rel="noopener noreferrer">浏览器的渲染原理简介<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/ngBL8d9Rxw2iCYMbKw_M-w" target="_blank" rel="noopener noreferrer">前端工程师需要掌握的浏览器渲染笔记<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzI5NjIzNjA1Nw==&amp;mid=2247483752&amp;idx=1&amp;sn=f8e2550e73127177aaaac0ee107557ca&amp;chksm=ec46241edb31ad08ad5d4807011365664e703abc4ec766a4fb8b8d49637b028de005d7767756&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1571358925480&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">浏览器合成与渲染层优化<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&amp;mid=2247484397&amp;idx=1&amp;sn=47283dba1a4c1db938810db0af2cde78&amp;chksm=f991053ccee68c2a918f1fbf9cee012de3e4c593e559ce9e9d7090e30dc73af0f43cad57b72f&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1572220890411&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">渲染树的形成原理你真的很懂吗？<ExternalLinkIcon/></a></li>
</ul>
</template>
