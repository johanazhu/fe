<template><h1 id="高质量前端快照方案-来自页面的「自拍」" tabindex="-1"><a class="header-anchor" href="#高质量前端快照方案-来自页面的「自拍」" aria-hidden="true">#</a> 高质量前端快照方案：来自页面的「自拍」</h1>
<p>高质量前端快照方案：来自页面的「自拍」</p>
<p>https://musicfe.dev/canvas-snapshot/</p>
<p>https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&amp;mid=2247496305&amp;idx=1&amp;sn=4e20f5a5900ece4c8323bf1a38a637db&amp;source=41#wechat_redirect</p>
<p>我们不推荐通过加时间戳或者版本号等方式强制回源，避免影响源站性能和 CDN 计费</p>
<p>网易云音乐 的 H5 网页保存为图片方案</p>
<p><a href="https://segmentfault.com/a/1190000038910770" target="_blank" rel="noopener noreferrer">前端海报生成的不同方案和优劣<ExternalLinkIcon/></a></p>
<p>分析这个H5</p>
<p>https://st.music.163.com/c/yourposter/m1/index.html</p>
<p>音乐自动播放</p>
<p>动画</p>
<p>输入点闪烁</p>
<p><code>animation：cursor-blink .5s ease-in infinite alternate</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token atrule"><span class="token rule">@keyframes</span> cursor-blink</span> <span class="token punctuation">{</span>
    <span class="token selector">0%</span> <span class="token punctuation">{</span>
        <span class="token property">opacity</span><span class="token punctuation">:</span> 0
    <span class="token punctuation">}</span>

    <span class="token selector">to</span> <span class="token punctuation">{</span>
        <span class="token property">opacity</span><span class="token punctuation">:</span> 1
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>测一测你的人格主导色</p>
<p>官方揭秘！你的颜色是这样算出来的……</p>
<p>https://musicfe.dev/color-quiz/</p>
<p>H5</p>
<p>https://st.music.163.com/st-color-quiz/index</p>
<h2 id="音乐自动播放" tabindex="-1"><a class="header-anchor" href="#音乐自动播放" aria-hidden="true">#</a> 音乐自动播放</h2>
<blockquote>
<p><code>autoplay</code>是个布尔属性值，表示声音是否自动播放，默认不自动播放。然而，随着浏览器的发展，这个属性变得限制越来越多。首先在移动端，<code>autoplay</code>自动播放已经被禁止了，PC端也已经禁止，18年的时候，Chrome这么做了，然后被很多开发者抗议，后来又恢复autoplay（给大家缓冲时间），现在已经Chrome又不支持自动播放了。</p>
<p>——张鑫旭</p>
</blockquote>
<p>https://www.zhangxinxu.com/wordpress/2019/07/html-audio-api-guide/</p>
<p><img src="https://s2.loli.net/2021/12/27/F1kX7iAUxwv94pD.png" alt="image-20211227152921543"></p>
<p>但网易云是不需要点击就能实现的</p>
</template>
