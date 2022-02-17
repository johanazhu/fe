<template><h1 id="http缓存" tabindex="-1"><a class="header-anchor" href="#http缓存" aria-hidden="true">#</a> HTTP缓存</h1>
<p><img src="https://i.loli.net/2021/06/11/plxXEtBUG7w6Sdj.png" alt="640"></p>
<h4 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a> keep-alive</h4>
<p>0 为关闭</p>
<p>keepalive_timeout 0;</p>
<p>65s无连接 关闭</p>
<p>keepalive_timeout 65;</p>
<p>连接数，达到100断开</p>
<p>keepalive_requests 100;</p>
<h4 id="cache-control-expires-max-age" tabindex="-1"><a class="header-anchor" href="#cache-control-expires-max-age" aria-hidden="true">#</a> Cache-Control/Expires/Max-Age</h4>
<h4 id="last-modified-if-modified-since" tabindex="-1"><a class="header-anchor" href="#last-modified-if-modified-since" aria-hidden="true">#</a> Last-Modified/If-Modified-Since</h4>
<h4 id="etag-if-none-match" tabindex="-1"><a class="header-anchor" href="#etag-if-none-match" aria-hidden="true">#</a> Etag/If-None-Match</h4>
<p>cache-control的优先级最高，比如cache-control：no-cache，就直接进入到协商缓存的步骤，如果cache-control：max-age=xxx,就会先比较当前时间和上次返回200时的时间差，如果没有超过max-age，命中强缓存，不发请求直接从本地缓存读取该文件（这里需要注意，如果没有cache-control，会取expires的值，来对比是否过期），过期的话会进入下一个阶段——协议缓存</p>
<p>协议缓存阶段，则向服务器发送header带有If-None-Match和If-Modified-Since的请求，服务器会比较Etag，如果相同，命中协议缓存，返回304了如果不一致则有改动，直接返回新的资源文件带上新的Etag值并返回200；</p>
<p>什么是from disk cache 和 from memory cache，什么时候会触发？</p>
<p>强缓存会触发</p>
<p>1、先查找内存，如果内存中存在，从内存中加载；</p>
<p>2、如果内存中未查找到，现在硬盘获取，如果硬盘中有，从硬盘中加载；</p>
<p>3、如果硬盘中未查找到，就进行网络请求；</p>
<p>4、加载到的资源缓存到硬盘和内存</p>
<h1 id="缓存相关" tabindex="-1"><a class="header-anchor" href="#缓存相关" aria-hidden="true">#</a> 缓存相关</h1>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.jianshu.com/p/54cc04190252" target="_blank" rel="noopener noreferrer">深入理解浏览器的缓存机制<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s?__biz=Mzk0OTIwOTc5Ng==&amp;mid=2247486813&amp;idx=1&amp;sn=0ed82e72452ad27494bbcdb90de4ae4b&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">「面试三板斧」之缓存 (上)<ExternalLinkIcon/></a></li>
<li><a href="https://www.cnblogs.com/duiniweixiao/p/8884274.html" target="_blank" rel="noopener noreferrer">彻底理解浏览器的缓存机制<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/03OAnrJ5kM-kdITr00YR4Q" target="_blank" rel="noopener noreferrer">前端缓存最佳实践<ExternalLinkIcon/></a></li>
<li><a href="https://mp.weixin.qq.com/s/CsJyKVq3IIjDv32TZ9m7fQ" target="_blank" rel="noopener noreferrer">浏览器缓存的力量<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6942264171870289956" target="_blank" rel="noopener noreferrer">node实践彻底搞懂强缓存和协商缓存<ExternalLinkIcon/></a></li>
<li><a href="https://juejin.cn/post/6944891188826603528" target="_blank" rel="noopener noreferrer">浅析HTTP缓存<ExternalLinkIcon/></a></li>
</ul>
</template>
