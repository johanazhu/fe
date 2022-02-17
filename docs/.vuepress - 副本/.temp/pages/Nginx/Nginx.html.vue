<template><h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1>
<blockquote>
<p>学习一个东西之前，首先在大脑中积累充分的”疑惑感“。即弄清面临的问题到底是什么，在浏览方法本身之前，最好先使劲问问自己都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻																											                              ——李未鹏</p>
</blockquote>
<p>在写这篇文章之前，我已经做过一些 Nginx 配置了，已经在服务器上倒腾了一些时间，知道反向代理，负载均衡</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">7000</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span> localhost</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">root</span> /usr/share/nginx/html/dist</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>

    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token directive"><span class="token keyword">location</span> /rest</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8000/rest</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>这是很简单的 Nginx 配置，</p>
<p>我的疑问也有很多，如</p>
<ul>
<li>Nginx还有那些未尝试的好用的配置，如gzip压缩</li>
<li>https 和 http2 的配置是怎么样</li>
<li>如何在 Nginx 做缓存，其中 http 缓存知识请移步 http 系列文章</li>
<li>强缓存怎么配，协议缓存怎么配？最佳实践是什么？</li>
<li>Nginx 的架构是怎么样的？一直说它是轻架构的服务器，那么它的源码难吗（好像是用C写的）</li>
<li>如何做到前端代码部署上去后（使用ftp形式上传到指定文件），能访问到最新代码，js、css打hash？（移步部署）</li>
<li>如果在代码部署后，在微信中打开清楚缓存，等稳定了关闭缓存</li>
</ul>
<h2 id="nginx-是什么" tabindex="-1"><a class="header-anchor" href="#nginx-是什么" aria-hidden="true">#</a> Nginx 是什么？</h2>
<p>https://wutao.work/archives/50799.html</p>
<p>nginx教程</p>
<p>https://github.com/jaywcjlove/nginx-tutorial</p>
</template>
