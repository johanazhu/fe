<template><h1 id="字体设置最佳实践" tabindex="-1"><a class="header-anchor" href="#字体设置最佳实践" aria-hidden="true">#</a> 字体设置最佳实践</h1>
<p>最佳实践字体：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">body</span> <span class="token punctuation">{</span>
    <span class="token property">font-family</span><span class="token punctuation">:</span> -apple-system<span class="token punctuation">,</span> BlinkMacSystemFont<span class="token punctuation">,</span> <span class="token string">"PingFang SC"</span><span class="token punctuation">,</span><span class="token string">"Helvetica Neue"</span><span class="token punctuation">,</span>STHeiti<span class="token punctuation">,</span><span class="token string">"Microsoft Yahei"</span><span class="token punctuation">,</span>Tahoma<span class="token punctuation">,</span>Simsun<span class="token punctuation">,</span>sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>iOS 4.0+ （iOS 9以下系统已经非常少） 使用英文字体 Helvetica Neue，之前的iOS版本降级使用 Helvetica。 中文字体设置为华文黑体STHeiTi。</p>
<p>iOS 9+ Safari开始支持 -apple-system 参数， Chrome 使用 BlinkMacSystemFont ，兼容 iOS ／ MacOS</p>
<p><code>微软雅黑</code>是为了兼容Win系统，毕竟视网膜分辨率的win系统用<code>Simsun</code>是非常丑陋的，可以用 4K 屏 windows 去看 JD 淘宝，你能忍的话我就没话说</p>
<p><code>PingFang SC</code> 是简体苹方，看需要 如果要命中对应 苹方字体的话 直接写 PingFang 不带引号。</p>
<p>需补充说明，华文黑体并不存在iOS的字体库中(http://support.apple.com/kb/HT5484?viewlocale=en_US)， 但系统会自动将华文黑体 STHeiTi 兼容命中系统默认中文字体黑体-简或黑体-繁：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Heiti SC Light 黑体-简 细体
Heiti SC Medium 黑体-简 中黑
Heiti TC Light 黑体-繁 细体
Heiti TC Medium 黑体-繁 中黑
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>原生Android下中文字体与英文字体都选择默认的无衬线字体。</p>
<p>4.0之前版本英文字体原生Android使用的是Droid Sans，中文字体原生Android会命中Droid Sans Fallback。</p>
<p>4.0+ 中英文字体都会使用原生Android新的Roboto字体。</p>
<p>其他第三方Android系统也一致选择默认的无衬线字体。</p>
<p>Android 就直接让它命中系统字体吧，因为你无法预知发行厂商会去内置什么字体，或者人家root去修改什么字体。</p>
<h2 id="参考阅读" tabindex="-1"><a class="header-anchor" href="#参考阅读" aria-hidden="true">#</a> 参考阅读</h2>
<ul>
<li><a href="https://github.com/AlloyTeam/Mars/blob/master/solutions/font-family.md" target="_blank" rel="noopener noreferrer">腾讯 AlloyTeam 团队字体设置最佳实践<ExternalLinkIcon/></a></li>
</ul>
</template>
