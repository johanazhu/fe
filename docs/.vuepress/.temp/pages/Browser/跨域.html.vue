<template><h1 id="跨域解决方案" tabindex="-1"><a class="header-anchor" href="#跨域解决方案" aria-hidden="true">#</a> 跨域解决方案</h1>
<h2 id="快问快答" tabindex="-1"><a class="header-anchor" href="#快问快答" aria-hidden="true">#</a> 快问快答</h2>
<ul>
<li>
<p>同源策略的原理，为什么要有这个东西</p>
<p>规定同一个协议、域名、端口为同域，非同域下你无法通过脚本获取 cookie，也无法发送 ajax。主要是为了信息安全，防止自己网站的信息数据被窃取。 请求获取其他域下的资源。</p>
</li>
<li>
<p>如何跨过同源策略的限制</p>
<p>像一些静态资源加载引用是没有同源策略的，比如 img，css，script。</p>
<p>ajax 跨域的主要方法是： jsonp 和 cors（服务端去允许跨域访问）</p>
</li>
<li>
<p>说一下 jsonp 的原理</p>
<p>就是利用了 script 标签不受同源策略的限制，传给后端的 query <code>/a?callback=foo</code>，response 里为 <code>foo({ a: 'b'})</code>，前端直接执行 foo 就可以拿到注入的数据了。</p>
</li>
</ul>
<h2 id="解决跨域的几种方式" tabindex="-1"><a class="header-anchor" href="#解决跨域的几种方式" aria-hidden="true">#</a> 解决跨域的几种方式</h2>
<ul>
<li>
<p>服务器端使用 CORS 模块</p>
</li>
<li>
<p>JSONP</p>
</li>
<li>
<p>Nginx 代理服务器配置跨域</p>
</li>
</ul>
<p>因为web端能看源码</p>
<p>所以为了限制，有同源策略，只允许当前源（域名、协议、端口）一致的情况下才能请求</p>
<p>Node端跨域</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'*'</span><span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Origin'</span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//这个表示任意域名都可以访问，这样写不能携带cookie了。</span>
<span class="token comment">//res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Headers'</span><span class="token punctuation">,</span> <span class="token string">'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Methods'</span><span class="token punctuation">,</span> <span class="token string">'PUT, POST, GET, DELETE, OPTIONS'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置方法</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>method <span class="token operator">==</span> <span class="token string">'OPTIONS'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 意思是，在正常的请求之前，会发送一个验证，是否可以请求。</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>或者使用库cors</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> cors <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'cors'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> corsOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  origin<span class="token operator">:</span> <span class="token string">'http://www.baidu.com'</span><span class="token punctuation">,</span> <span class="token comment">//只有百度可以访问</span>
  optionsSuccessStatus<span class="token operator">:</span> <span class="token number">200</span> 
<span class="token punctuation">}</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/products/:id'</span><span class="token punctuation">,</span> <span class="token function">cors</span><span class="token punctuation">(</span>corsOptions<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>msg<span class="token operator">:</span> <span class="token string">'只有百度可以访问'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">80</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'CORS-enabled web server listening on port 80'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s?__biz=MzIyNjc1NjQ4MA==&amp;mid=2247484094&amp;idx=1&amp;sn=8511a97fc39b7f7cd6b6f42a85191d8c&amp;chksm=e86ad051df1d5947a3c70ddda2d35200cfcdad7612400a92290d24fa55a257cf7cb20b219e71&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1586861922785&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">10 种跨域解决方案（附终极方案）<ExternalLinkIcon/></a></li>
</ul>
</template>
