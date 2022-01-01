<template><h1 id="移动端适配方案" tabindex="-1"><a class="header-anchor" href="#移动端适配方案" aria-hidden="true">#</a> 移动端适配方案</h1>
<h3 id="快问快答" tabindex="-1"><a class="header-anchor" href="#快问快答" aria-hidden="true">#</a> 快问快答</h3>
<p>响应式布局有几种方式</p>
<p>我觉得很多情况下要多种方案一起用，很多情况下时互补的，媒体查询是必要的</p>
<p>1.媒体查询2.百分比 3.rem 4.vw/vh</p>
<h4 id="适配方案对比" tabindex="-1"><a class="header-anchor" href="#适配方案对比" aria-hidden="true">#</a> 适配方案对比</h4>
<ul>
<li>viewport 缩放方案
<ul>
<li>适配原理简单</li>
<li>需要使用JS</li>
<li>直接使用设计稿标注无需换算</li>
<li>方案死板只能实现页面级别整体缩放</li>
</ul>
</li>
<li>动态REM方案
<ul>
<li>是撇原理稍复杂</li>
<li>需要使用JS</li>
<li>设计稿标注换算到CSS的rem计算简单</li>
<li>方案灵活技能实现整体缩放又能实现</li>
</ul>
</li>
<li>vw方案
<ul>
<li>适配原理简单</li>
<li>不需要JS即可适配</li>
<li>设计稿标注的px换算到CSS的vw计算复杂</li>
<li>方案灵活技能实现整体缩放又能实现局部不缩放</li>
</ul>
</li>
</ul>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://juejin.im/post/5e6caf55e51d4526ff026a71" target="_blank" rel="noopener noreferrer">一篇搞定移动端适配<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzA3MDkzNjM3MA==&amp;mid=2455673434&amp;idx=1&amp;sn=ccf86c2c5d37c98bc9e25230a9dceed4&amp;chksm=889f0807bfe88111772a4f91cfd2d15fa0ce47a979ac09fa8f43f5b6bac07d41fa19cc7224ac&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586042825490&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">大厂是怎么做移动端适配的<ExternalLinkIcon/></a></li>
<li><a href="http://www.conardli.top/blog/article/%E5%A4%9A%E7%AB%AF%E5%BC%80%E5%8F%91/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D%E6%80%BB%E7%BB%93%EF%BC%88%E4%BA%8C%EF%BC%89%E5%BA%94%E7%94%A8%E7%AF%87.html#%E4%B8%80%E3%80%81%E8%8B%B1%E5%AF%B8" target="_blank" rel="noopener noreferrer">移动端适配原理篇<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844904194273443848" target="_blank" rel="noopener noreferrer">可伸缩布局方案amfe-flexible解决多端适配问题<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903938051964941" target="_blank" rel="noopener noreferrer">移动 web 最佳实践<ExternalLinkIcon/></a></li>
</ul>
</template>
