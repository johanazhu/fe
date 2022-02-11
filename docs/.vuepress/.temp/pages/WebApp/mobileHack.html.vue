<template><h1 id="mobilehack" tabindex="-1"><a class="header-anchor" href="#mobilehack" aria-hidden="true">#</a> mobileHack</h1>
<h3 id="白屏解决与优化方案" tabindex="-1"><a class="header-anchor" href="#白屏解决与优化方案" aria-hidden="true">#</a> 白屏解决与优化方案</h3>
<p>当前很多无线页面都是用前端模板进行数据渲染，那么在糟糕的网速情况下，一进去页面，看到的不是白屏就是loading，这称为白屏问题。</p>
<p>此问题发生的原因基本可以归结为网速跟静态资源</p>
<p>1、css文件加载需要一些时间，在加载的过程中页面是空白的。</p>
<p>解决：可以考虑将css代码前置和内联。</p>
<p>2、首屏无实际的数据内容，等待异步加载数据在渲染页面导致白屏</p>
<p>解决：在首页直接同步渲染html，后续的滚屏等再采用异步请求数据和渲染html</p>
<p>3、首屏内联 js 的执行会阻塞页面的渲染。</p>
<p>解决：尽量不在首屏html代码中房子内联脚本</p>
<h4 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h4>
<p>根本原因是客户端渲染的无力，因此最简单的方法是咋服务器端，使用模板引起渲染所有页面。同时</p>
<p>1减少文件加载体积，如html压缩，js压缩</p>
<p>2加快js执行速度，比如常见的无限滚动的页面，可以使用js先渲染一个屏幕范围内的东西</p>
<p>3提高一些优化的交互，比如提供一些假的滚动条</p>
<p>4使用本地存储处理静态文件</p>
<h3 id="如何实现打开已安装的app-若未安装则引导用户安装" tabindex="-1"><a class="header-anchor" href="#如何实现打开已安装的app-若未安装则引导用户安装" aria-hidden="true">#</a> 如何实现打开已安装的app，若未安装则引导用户安装？</h3>
<p>来自  http://gallery.kissyui.com/redirectToNative/1.2/guide/index.html  kissy mobile 通过 iframe src 发送请求打开app，自定义url scheme，如taobao://home(淘宝首页)、etao://scan（一淘扫描）;如果安装了客户端则会直接唤起，直接唤起后，之前浏览器窗口（或者扫码工具的webview）推入后台；如果在指定的时间内客户端没有被唤起，则js重定向到app下载地址。大概实现代码如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function-variable function">goToNative</span><span class="token operator">:</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>body<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeChild</span><span class="token punctuation">(</span>iframe<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">gotoDownload</span><span class="token punctuation">(</span>stratTime<span class="token punctuation">)</span> <span class="token comment">// 去下载，下载链接一般是 itunes app store 或者 apk 文件链接</span>
   	<span class="token comment">// 测试时间设置小于800ms时，在android下的UC浏览器会打开native appp时并下载apk，</span>
    <span class="token comment">// 测试android+UC下打开native的时候最好大于800ms</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">800</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>需要注意的是 如果是 android chrome 25 版本以后，在 iframe src 不会发送请求，原因如下 https://developers.google.com/chrome/mobile/docs/intents ，通过loacation href 使用 intent 机制拉起客户端可行并且当前页面不跳转</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>location <span class="token operator">=</span> <span class="token string">'intent://'</span> <span class="token operator">+</span> schemeUrl <span class="token operator">+</span> <span class="token string">'#Intent;scheme='</span> <span class="token operator">+</span> scheme <span class="token operator">+</span> <span class="token string">';package='</span> <span class="token operator">+</span> self<span class="token punctuation">.</span>package <span class="token operator">+</span> <span class="token string">';end'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://js8.in/2013/12/16/ios%E4%BD%BF%E7%94%A8schema%E5%8D%8F%E8%AE%AE%E8%B0%83%E8%B5%B7app/" target="_blank" rel="noopener noreferrer">iOS使用scheme协议调起APP<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/RubyLouvre/mobileHack" target="_blank" rel="noopener noreferrer">司徒正美的mobileHack<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/suoyuesmile/suo-blog/blob/master/articals/h5/0003.md" target="_blank" rel="noopener noreferrer">12个前端必会 H5 问题及解决方法<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&amp;mid=2247490207&amp;idx=1&amp;sn=82e08108f953fa541304b8bfc318fb30&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">微信 H5 页面兼容性解决方案<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/yunzhijia/front-end/blob/master/web%20app%E9%97%AE%E9%A2%98%E5%8F%8A%E6%8A%80%E5%B7%A7%E6%80%BB%E7%BB%93.md" target="_blank" rel="noopener noreferrer">web app问题及技巧总结<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/jtyjty99999/mobileTech" target="_blank" rel="noopener noreferrer">mobileTech<ExternalLinkIcon/></a></li>
<li><a href="https://www.open-open.com/lib/view/open1449325854077.html" target="_blank" rel="noopener noreferrer">H5项目常见问题汇总及解决方案<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/suoyuesmile/suo-blog/blob/master/articals/h5/0003.md" target="_blank" rel="noopener noreferrer">移动端 H5 相关问题汇总<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903615304302600" target="_blank" rel="noopener noreferrer">如何写一个适配iPhoneX的底部导航<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&amp;mid=2247490207&amp;idx=1&amp;sn=82e08108f953fa541304b8bfc318fb30&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">微信 H5 页面兼容性解决方案<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6844903940190896135" target="_blank" rel="noopener noreferrer">微信浏览器禁止页面下拉查看网址<ExternalLinkIcon/></a></li>
<li><a href="http://www.imooc.com/article/260139" target="_blank" rel="noopener noreferrer">移动web开发踩坑总结<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000012761272" target="_blank" rel="noopener noreferrer">iOS Safari浏览器上overflow: scroll元素无法滑动bug解决方法整理<ExternalLinkIcon/></a></li>
<li><a href="https://segmentfault.com/a/1190000016408566" target="_blank" rel="noopener noreferrer">iOS safari浏览器上overflow: scroll元素无法滚动bug深究<ExternalLinkIcon/></a></li>
</ul>
</template>
