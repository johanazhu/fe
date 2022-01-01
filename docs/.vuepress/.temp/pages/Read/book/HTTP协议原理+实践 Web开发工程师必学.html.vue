<template><h1 id="http协议原理-实践-web开发工程师必学" tabindex="-1"><a class="header-anchor" href="#http协议原理-实践-web开发工程师必学" aria-hidden="true">#</a> HTTP协议原理+实践 Web开发工程师必学！</h1>
<p>浏览器输入URL后HTTP请求返回的完整过程</p>
<p><img src="https://i.loli.net/2021/06/03/2YBUohayWfjNKIc.png" alt="浏览器输入URL后HTTP请求返回的完整过程"></p>
<h2 id="网络协议分层" tabindex="-1"><a class="header-anchor" href="#网络协议分层" aria-hidden="true">#</a> 网络协议分层</h2>
<p><img src="https://i.loli.net/2021/06/03/oD3xifJNZFpmuch.png" alt="网络协议分层"></p>
<p>物理层：定义物理设备如何传输数据</p>
<p>数据链路层：在通信的实体间建立数据链路连接</p>
<p>网络层：为数据在节点之间传输创建逻辑链路</p>
<h4 id="传输层" tabindex="-1"><a class="header-anchor" href="#传输层" aria-hidden="true">#</a> 传输层</h4>
<p>向用户提供可靠的端到端（End-to-End）服务</p>
<p>传输层向高层屏蔽了下层数据通信的细节</p>
<h4 id="应用层" tabindex="-1"><a class="header-anchor" href="#应用层" aria-hidden="true">#</a> 应用层</h4>
<p>为应用软件提供了很多服务</p>
<p>构建于TCP协议之上</p>
<p>屏蔽网络传输相关细节</p>
<h3 id="http协议发展历史" tabindex="-1"><a class="header-anchor" href="#http协议发展历史" aria-hidden="true">#</a> HTTP协议发展历史</h3>
<h4 id="http-0-9" tabindex="-1"><a class="header-anchor" href="#http-0-9" aria-hidden="true">#</a> HTTP/0.9</h4>
<p>只有一个命令GET</p>
<p>没有HEADER等描述数据的信息</p>
<p>服务器发送完毕，关闭TCP连接（现在的http1.1：在一个TCP中能传递多个HTTP）</p>
<h4 id="http-1-0" tabindex="-1"><a class="header-anchor" href="#http-1-0" aria-hidden="true">#</a> HTTP/1.0</h4>
<p>增加了很多命令</p>
<p>增加status code 和header</p>
<p>多字符集支持、多部分发送、权限、缓存等</p>
<h4 id="http-1-1" tabindex="-1"><a class="header-anchor" href="#http-1-1" aria-hidden="true">#</a> HTTP/1.1</h4>
<p>持久连接</p>
<p>pipeline</p>
<p>增加host和其他一些命令</p>
<h4 id="http-2-0" tabindex="-1"><a class="header-anchor" href="#http-2-0" aria-hidden="true">#</a> HTTP/2.0</h4>
<p>所有数据以二进制传输</p>
<p>同一个连接里面发送多个请求不再需要按照顺序来</p>
<p>头信息压缩以及推送等提高效率的功能</p>
<h3 id="http三次握手" tabindex="-1"><a class="header-anchor" href="#http三次握手" aria-hidden="true">#</a> HTTP三次握手</h3>
<p><img src="/images/HTTP/HTTP三次握手.png" alt="HTTP三次握手"></p>
<p>为什么要三次握手？</p>
<h3 id="uri、url、urn" tabindex="-1"><a class="header-anchor" href="#uri、url、urn" aria-hidden="true">#</a> URI、URL、URN</h3>
<h4 id="uri" tabindex="-1"><a class="header-anchor" href="#uri" aria-hidden="true">#</a> URI</h4>
<p>Uniform Resource Identifier/统一资源标识符</p>
<p>用来标识互联网上的信息资源，唯一</p>
<p>包括URL和URN</p>
<h4 id="url" tabindex="-1"><a class="header-anchor" href="#url" aria-hidden="true">#</a> URL</h4>
<p>Uniform Resource Locator/统一资源定位器</p>
<p>就是网站地址：http://www.baidu.com</p>
<p>http://user:pass@host.com:80/path?query=string#hash</p>
<p>此类格式的都叫做URL,比如ftp协议（文件协议）</p>
<h4 id="urn" tabindex="-1"><a class="header-anchor" href="#urn" aria-hidden="true">#</a> URN</h4>
<p>永久统一资源定位符</p>
<p>在资源移动之后还能被找到</p>
<p>目前还没有非常成熟的使用方案</p>
<h3 id="http报文格式" tabindex="-1"><a class="header-anchor" href="#http报文格式" aria-hidden="true">#</a> HTTP报文格式</h3>
<p><img src="https://i.loli.net/2021/06/03/dw5P7ODa2oTcYAm.png" alt="HTTP报文格式"></p>
<h4 id="http的方法" tabindex="-1"><a class="header-anchor" href="#http的方法" aria-hidden="true">#</a> HTTP的方法</h4>
<p>用来定义对于资源的操作</p>
<p>常用的有GET、POST、PUT、DELETE等</p>
<p>从定义上讲有各自的语义</p>
<h4 id="http的code" tabindex="-1"><a class="header-anchor" href="#http的code" aria-hidden="true">#</a> HTTP的CODE</h4>
<p>定义服务器对请求的处理结果</p>
<p>各个区间的CODE有各自的语义</p>
<p>100：</p>
<p>200：</p>
<p>300：</p>
<p>400：</p>
<p>500：</p>
<p>好的HTTP服务可以通过CODE判断结果</p>
<h3 id="第三章-http的各种特性总览" tabindex="-1"><a class="header-anchor" href="#第三章-http的各种特性总览" aria-hidden="true">#</a> 第三章：HTTP的各种特性总览</h3>
<p>使用curl来模式客户端请求</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>curl <span class="token operator">-</span>v www<span class="token punctuation">.</span>baidu<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>CORS跨域请求的限制与解决</p>
<p>浏览器的同域限制</p>
<p>JSONP</p>
<p>‘Access-Control-Allow-Origin’： ‘*’</p>
<h4 id="cors预请求" tabindex="-1"><a class="header-anchor" href="#cors预请求" aria-hidden="true">#</a> CORS预请求</h4>
<p>允许方法：GET、HEAD、POST</p>
<p>允许Content-Type：text/plain、multipart/form-data、application/x-www-form-urlencoded</p>
<p>其他限制：</p>
<p>请求头限制</p>
<p>XMLHttpRequestUpload 对象均没有任何事件监听器</p>
<p>请求中没有使用 ReadabkeStream 对象</p>
<p>‘Access-Control-Allow-Header’： ‘X-Test-Cors’(头的名字)</p>
<p>允许跨域的头</p>
<p>‘Access-Control-Allow-Header’： ‘POST, PUT, Delete‘</p>
<p>允许跨域的方法</p>
<p>’Access-Control-Max-Age‘: 跨域的最长时间</p>
<h4 id="缓存-cache-control" tabindex="-1"><a class="header-anchor" href="#缓存-cache-control" aria-hidden="true">#</a> 缓存 Cache-Control</h4>
<h5 id="特性-值" tabindex="-1"><a class="header-anchor" href="#特性-值" aria-hidden="true">#</a> 特性（值）:</h5>
<h5 id="可缓存性" tabindex="-1"><a class="header-anchor" href="#可缓存性" aria-hidden="true">#</a> 可缓存性</h5>
<p>​		public</p>
<p>​		private</p>
<p>​		no-cache</p>
<p>​	<strong>到期</strong></p>
<p>​		max-age=<code>&lt;seconds&gt;</code></p>
<p>​		s-maxage=<code>&lt;seconds&gt;</code> 代理服务器</p>
<p>​		max-stale=<code>&lt;seconds&gt;</code></p>
<p>​	<strong>重新验证</strong></p>
<p>​		must-revalidate</p>
<p>​		proxy-revalidate</p>
<p>​	<strong>其他</strong></p>
<p>​		no-store 不能用缓存</p>
<p>​		no-transform	不允许改动内容</p>
<p>’Cache-Control‘： ’max-age=200‘ 就能缓存住，</p>
<p>前端构建工具（例如webpack）在打包时会构建出hash值。如果hash值没变，就用缓存，hash值改变（即我们写的新业务）需要用户来读取</p>
<h4 id="缓存验证last-modified和etag的使用" tabindex="-1"><a class="header-anchor" href="#缓存验证last-modified和etag的使用" aria-hidden="true">#</a> 缓存验证Last-Modified和Etag的使用</h4>
<p><img src="https://i.loli.net/2021/06/03/W7tXPNZ5kuYoL6A.png" alt="缓存验证Last-Modified和Etag的使用"></p>
<p>验证头：Last-Modified、Etag</p>
<h4 id="last-modified" tabindex="-1"><a class="header-anchor" href="#last-modified" aria-hidden="true">#</a> Last-Modified</h4>
<p>上次修改时间</p>
<p>配合If-Modified-Since或者If-Unmodified-Since使用</p>
<p>对比上次修改时间以验证资源是否需要更新</p>
<h5 id="etag" tabindex="-1"><a class="header-anchor" href="#etag" aria-hidden="true">#</a> <strong>Etag</strong></h5>
<p>数据签名</p>
<p>配合If-Match或者If-Non-Match使用</p>
<p>对比资源的签名判断是否使用缓存（webpack里的hash就是用这个原理）</p>
<h4 id="cookie和session" tabindex="-1"><a class="header-anchor" href="#cookie和session" aria-hidden="true">#</a> Cookie和Session</h4>
<h5 id="cookie" tabindex="-1"><a class="header-anchor" href="#cookie" aria-hidden="true">#</a> cookie</h5>
<p>通过Set-Cookie设置</p>
<p>下次请求会自动带上</p>
<p>键值对，可以设置多个</p>
<h5 id="cookie的属性" tabindex="-1"><a class="header-anchor" href="#cookie的属性" aria-hidden="true">#</a> cookie的属性</h5>
<p>max-age和expires设置过期时间</p>
<p>Secure只有https的时候发送</p>
<p>HttpOnly无法通过document.cookie访问</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">'Set-Cookie'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'id=123;max-age=10'</span><span class="token punctuation">,</span> <span class="token string">'abc=456, domain=test.com'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Domain：让同域名下的两个子网站之间的cookie通讯</p>
<h3 id="http长连接" tabindex="-1"><a class="header-anchor" href="#http长连接" aria-hidden="true">#</a> HTTP长连接</h3>
<p>一个tcp连接中能发送多个http请求</p>
<p>HTTP的长连接是建立在tcp的基础上，chrome浏览器最多支持6个http请求（公用一个tcp连接）</p>
<p>在http header里写</p>
<p>Connection：keep-Alive</p>
<h3 id="数据协商" tabindex="-1"><a class="header-anchor" href="#数据协商" aria-hidden="true">#</a> 数据协商</h3>
<h4 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h4>
<p>请求（request）</p>
<p>返回（response）</p>
<p>request 中的 Accept</p>
<p>Accept：数据类型</p>
<p>Accept-Encoding：编码方式</p>
<p>Accept-Language：语言</p>
<p>User-Agent：浏览器信息</p>
<p>response 中的 Content</p>
<p>Content-Type: 数据格式</p>
<p>Content-Encoding: 编码方式 <code>gzip</code></p>
<p>Content-Language：语言</p>
<h4 id="redirect" tabindex="-1"><a class="header-anchor" href="#redirect" aria-hidden="true">#</a> Redirect</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url <span class="token operator">===</span> <span class="token string">'/'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    response<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">302</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token string">'Location'</span><span class="token operator">:</span> <span class="token string">'/new'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url <span class="token operator">===</span> <span class="token string">'/new'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    response<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token string">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'text/html'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'&lt;div>hello,world&lt;/div>'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>HTTP 状态码：</p>
<p>302 临时跳转</p>
<p>301 永久跳转 （谨慎，你使用了之后就不好控制了）</p>
<h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h3>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> 	<span class="token number">80</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">server_name</span> test.com
	
	location /</span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:888</span><span class="token punctuation">;</span>
		<span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span></span><span class="token punctuation">;</span>	// 修改头
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>代理缓存</p>
<p>服务器中的Cache-Control:s-maxage 给代理缓存用</p>
<p>no-store 永不缓存</p>
<p>HTTP 头 Vary	http头信息一样才缓存</p>
<h3 id="https解析" tabindex="-1"><a class="header-anchor" href="#https解析" aria-hidden="true">#</a> HTTPS解析</h3>
<h4 id="加密" tabindex="-1"><a class="header-anchor" href="#加密" aria-hidden="true">#</a> 加密</h4>
<p>私钥和公钥</p>
<p>在nginx中配置https</p>
<p><img src="https://i.loli.net/2021/06/03/oai5XeD2pWjNUsJ.png" alt="在nginx中配置https"></p>
<h3 id="http2" tabindex="-1"><a class="header-anchor" href="#http2" aria-hidden="true">#</a> HTTP2</h3>
<h4 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> 优势</h4>
<p>信道复用</p>
<p>分帧传输</p>
<p>Server Push</p>
<div class="language-nginx ext-nginx line-numbers-mode"><pre v-pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> 	<span class="token number">443</span> http2；
    server_name test.com</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">http2_push_preload</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>http/1.1 和 http2 对比网站</p>
<p>https://http2.akamai.com/demo</p>
</template>
