<template><h1 id="滚动穿透" tabindex="-1"><a class="header-anchor" href="#滚动穿透" aria-hidden="true">#</a> 滚动穿透</h1>
<h2 id="什么是滚动穿透" tabindex="-1"><a class="header-anchor" href="#什么是滚动穿透" aria-hidden="true">#</a> 什么是滚动穿透</h2>
<p>有一层遮罩层覆盖在 body 上时，当我们滚动遮罩层，它下面的内容也会跟着一起滚动，看起来好像是上面的滚动事件穿透到下面的 DOM 元素上一样，我们称之为滚动穿透</p>
<h2 id="原理是什么" tabindex="-1"><a class="header-anchor" href="#原理是什么" aria-hidden="true">#</a> 原理是什么？</h2>
<p>阻止冒泡</p>
<p>滑动可以，但是滑到顶部或者底部，会穿透穿透原因是因为虽然阻止了容器中的冒泡，但是滑过去后就会监听body上的滚动（只要 你有高度）</p>
<p>在 PC 端是怎么样？</p>
<p>移动端又改如何做？</p>
<p>React 版本的 该怎么做？</p>
<p>别人家的类库</p>
<p>他们的源码解决方案</p>
<p>在弹出弹出框的时候，给body加 <code>postion:fixed; top: 0</code></p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&amp;mid=2247487271&amp;idx=1&amp;sn=4302ecfe4a6a3862f94afce93d362063&amp;chksm=ea0d45dddd7acccb1a18e5663c8e87b0a733d6a21ce243b40d0f28100d53cba400d618744347&amp;mpshare=1&amp;scene=1&amp;srcid=02265TTQt3AsMVr37YQOPcAm&amp;sharer_sharetime=1582725889123&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">这一次，彻底解决滚动穿透<ExternalLinkIcon/></a></li>
<li><a href="https://zhuanlan.zhihu.com/p/64975278" target="_blank" rel="noopener noreferrer">滚动穿透问题探索<ExternalLinkIcon/></a></li>
<li><a href="https://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/" target="_blank" rel="noopener noreferrer">web移动端浮层滚动阻止window窗体滚动JS/CSS处理<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzIyNzk0ODIyMQ==&amp;mid=2247483688&amp;idx=1&amp;sn=514d1739055679e1ba98bdd336edb023&amp;chksm=e85822fadf2fabec3bc29e9a8dd169856f3672e37f14ffc4659b95c40bb994b3a563ec5670b2&amp;mpshare=1&amp;scene=1&amp;srcid=0226Ndgvfw3nQzMQLElAKNe6&amp;sharer_sharetime=1582725893753&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">常用H5滚动穿透6种解决方案<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&amp;mid=2247496335&amp;idx=1&amp;sn=49e1ebd34a97d70ef656439ecb411611&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">忍法，scroll 翻滚之术！<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/lizhiyao/ios-iframe-scroll" target="_blank" rel="noopener noreferrer"> ios-iframe-scroll<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000018598630" target="_blank" rel="noopener noreferrer">React中禁止页面滚动<ExternalLinkIcon/></a></li>
<li><a href="https://tech.youzan.com/moda-component-implement/" target="_blank" rel="noopener noreferrer">移动端 Modal 组件开发杂谈<ExternalLinkIcon/></a></li>
<li><a href="https://www.f2ecoder.net/709.html" target="_blank" rel="noopener noreferrer">花式提升移动端交互体验<ExternalLinkIcon/></a></li>
</ul>
</template>
