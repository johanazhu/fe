<template><h1 id="h5页面的适配方案" tabindex="-1"><a class="header-anchor" href="#h5页面的适配方案" aria-hidden="true">#</a> H5页面的适配方案</h1>
<p>rem的本质是等比缩放</p>
<p>rem 能模拟 vw 的效果， vw 才是真正的等比缩放</p>
<p>vw 的 1% = 视口宽度 / 100</p>
<p>rem 不是银弹，用户选择大屏幕手机，有些人希望看到更多的图片，更大的字体（等比缩放，rem模式），又有些人希望能看到更多的内容，并不想要更大的图标</p>
<p>所以这里要做取舍</p>
<p>你的网站如果是内容型的（例如知乎），不应该使用rem，而是用 px 来布局</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://yanhaijing.com/css/2017/09/29/principle-of-rem-layout/" target="_blank" rel="noopener noreferrer">Rem布局的原理解析<ExternalLinkIcon/></a></li>
<li><a href="https://www.cnblogs.com/imwtr/p/9648233.html" target="_blank" rel="noopener noreferrer">细说移动端 经典的REM布局 与 新秀VW布局<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/chokcoco/cnblogsArticle/issues/25" target="_blank" rel="noopener noreferrer">前端基础知识概述 -- 移动端开发的屏幕、图像、字体与布局的兼容适配<ExternalLinkIcon/></a></li>
<li><a href="https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html" target="_blank" rel="noopener noreferrer">使用Flexible实现手淘H5页面的终端适配<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903569884184589" target="_blank" rel="noopener noreferrer">再聊移动端页面的适配<ExternalLinkIcon/></a></li>
</ul>
</template>
