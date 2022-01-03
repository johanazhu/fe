<template><h1 id="react-事件机制" tabindex="-1"><a class="header-anchor" href="#react-事件机制" aria-hidden="true">#</a> React 事件机制</h1>
<h2 id="一句话" tabindex="-1"><a class="header-anchor" href="#一句话" aria-hidden="true">#</a> 一句话</h2>
<p>React 的事件是自己写的</p>
<p>兼容</p>
<p>利用事件冒泡优化性能</p>
<p>react事件机制分为两个部分：1、事件注册；2、事件分发</p>
<p>事件注册部分，所有的时间都会注册到document上，拥有统一的回调函数dispatchEvent 来执行事件分发</p>
<p>事件分发部分，首先生成合成事件，注意统一种事件类型只能生成一个合成事件Event，如onclick这个类型的事件，dom上所有带有jsx绑定的onClick的回调函数都会按顺序（冒泡或者捕获）会放到Event._dispatchListeners 这个数组里，后面依次执行它</p>
<p>【React深入】React事件机制</p>
<p>https://juejin.cn/post/6844903790198571021</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://zh-hans.reactjs.org/docs/events.html#gatsby-focus-wrapper" target="_blank" rel="noopener noreferrer">官网：事件合成<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/35468208" target="_blank" rel="noopener noreferrer">一看就晕的React事件机制<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&amp;mid=2247484257&amp;idx=1&amp;sn=eb61917284de8d9ff28009087256e7c3&amp;chksm=9782cde8a0f544fe83b9bc4e8fbfd9cd1ccacbd2da513423e148fdf879cf2d6da0fcb0033ccf&amp;mpshare=1&amp;scene=1&amp;srcid=0928H2hAMnVEnL0XcSEBDWZK&amp;sharer_sharetime=1569627030109&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">【长文慎入】一文吃透 react 事件机制原理<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/sMaY0_D6wFeh6BZIP5KCpA" target="_blank" rel="noopener noreferrer">「react进阶」一文吃透react事件系统原理<ExternalLinkIcon/></a></li>
</ul>
</template>
