<template><h1 id="我常用的webapp开发规范" tabindex="-1"><a class="header-anchor" href="#我常用的webapp开发规范" aria-hidden="true">#</a> 我常用的webApp开发规范</h1>
<h3 id="meta头" tabindex="-1"><a class="header-anchor" href="#meta头" aria-hidden="true">#</a> Meta头</h3>
<h3 id="字体" tabindex="-1"><a class="header-anchor" href="#字体" aria-hidden="true">#</a> 字体</h3>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">font-family</span><span class="token punctuation">:</span> PingFangSC-Regular<span class="token punctuation">,</span>Helvetica<span class="token punctuation">,</span>STHeiti STXihei<span class="token punctuation">,</span>Microsoft YaHei<span class="token punctuation">,</span>Microsoft JhengHei<span class="token punctuation">,</span>Arial<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="css与javascript-分离" tabindex="-1"><a class="header-anchor" href="#css与javascript-分离" aria-hidden="true">#</a> css与javascript 分离</h3>
<h2 id="移动端页面默认样式重置" tabindex="-1"><a class="header-anchor" href="#移动端页面默认样式重置" aria-hidden="true">#</a> 移动端页面默认样式重置</h2>
<ol>
<li>
<p>-webkit-tap-heiglight-color（这个属性只用于IOS（iphone和ipad））</p>
<p>当你点击一个链接或者通过js定义的可点击的元素时，他会出现一个半透明的灰色背景，要重置这个表现，可以通过设置-webkit-tap-highlight-color调整</p>
<p>el：设置高亮色为50%透明的红色</p>
<p>​	-webkit-tap-highlight-color: rgba(255, 0, 0, .5);</p>
</li>
<li>
<p>outlint: none</p>
<p>属性值设置为：</p>
<p>​	a.取消webkit内核浏览器下默认的文本框聚焦样式（input,textarea{online: noine}）</p>
<p>​	b.在pc端为a标签定义此样式，是为了取消IE浏览器下点击a标签时出现的虚线，IE7及以下版本还不识别此属性，需要在a标签上调价hidefocus=“true”</p>
</li>
</ol>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.open-open.com/lib/view/open1449325854077.html" target="_blank" rel="noopener noreferrer">H5项目常见问题汇总及解决方案<ExternalLinkIcon/></a></li>
</ul>
</template>
