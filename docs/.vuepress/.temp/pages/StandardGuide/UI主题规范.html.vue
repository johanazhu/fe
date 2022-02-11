<template><h1 id="ui主题规范" tabindex="-1"><a class="header-anchor" href="#ui主题规范" aria-hidden="true">#</a> UI主题规范</h1>
<h3 id="标准蓝" tabindex="-1"><a class="header-anchor" href="#标准蓝" aria-hidden="true">#</a> 标准蓝</h3>
<h4 id="基础标准色" tabindex="-1"><a class="header-anchor" href="#基础标准色" aria-hidden="true">#</a> 基础标准色</h4>
<h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/RY6mZ19zWUX8xha.png" alt="1591926539345"></h4>
<p>产品主色调，品牌色，标签背景色，详情页标准字</p>
<h4 id="基本文字色" tabindex="-1"><a class="header-anchor" href="#基本文字色" aria-hidden="true">#</a> 基本文字色</h4>
<h4 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/cOBguvtlwVI4GaX.png" alt="1591926915959"></h4>
<p>用于一级文字标题，如页面标题	应用名称	应用集名称</p>
<h4 id="-2" tabindex="-1"><a class="header-anchor" href="#-2" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/YgRrXSvhxAmfGeB.png" alt="1591927017531"></h4>
<p>用于二级文字标题，如消息文字等</p>
<h4 id="-3" tabindex="-1"><a class="header-anchor" href="#-3" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/T4rfPwLKGsB89yS.png" alt="1591927081244"></h4>
<p>用于三级文字标题</p>
<h4 id="-4" tabindex="-1"><a class="header-anchor" href="#-4" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/EIc317YT6epnVuM.png" alt="1591927186808"></h4>
<p>用于次要文字标题</p>
<h3 id="全局标准色" tabindex="-1"><a class="header-anchor" href="#全局标准色" aria-hidden="true">#</a> 全局标准色</h3>
<h4 id="-5" tabindex="-1"><a class="header-anchor" href="#-5" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/jlxdpI4R5cofgSn.png" alt="1591927254453"></h4>
<p>列表分割线颜色</p>
<h4 id="-6" tabindex="-1"><a class="header-anchor" href="#-6" aria-hidden="true">#</a> <img src="https://i.loli.net/2021/06/03/2zfiuBky17vC6Hg.png" alt="1591927289470"></h4>
<p>页面背景色</p>
<h3 id="页面边距" tabindex="-1"><a class="header-anchor" href="#页面边距" aria-hidden="true">#</a> 页面边距</h3>
<p>主题颜色</p>
<p>用https://www.zhangxinxu.com/wordpress/2019/02/link-rel-alternate-website-skin/</p>
<p>link rel = alternate 的方法来</p>
<p>最好是把所有主题给做出来，但是最后的css以</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>&lt;link href=<span class="token string">"green.css"</span> rel=<span class="token string">"alternate stylesheet"</span> type=<span class="token string">"text/css"</span> title=<span class="token string">"绿色"</span>>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>的形式导入</p>
<p>因为这些文件基本上不会大改动，所以在兼容性，性能上，还有代码可维护上都是可以的</p>
<p>切换的时候用</p>
<p>localStorage.get()的方法获取到css</p>
<p>https://uglyduck.ca/quick-dirty-theme-switcher/</p>
<p>方案一：</p>
<p>写多套css一起打包，切换的时候（用js）改变css，浪费宽带，因为一开始会加载很多css</p>
</template>
