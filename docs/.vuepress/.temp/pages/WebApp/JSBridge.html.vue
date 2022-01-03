<template><h1 id="jsbridge" tabindex="-1"><a class="header-anchor" href="#jsbridge" aria-hidden="true">#</a> JSBridge</h1>
<h3 id="一句话解释" tabindex="-1"><a class="header-anchor" href="#一句话解释" aria-hidden="true">#</a> 一句话解释</h3>
<p>Native 与 H5 交互，就需要一些方法，而这些解决方案就叫 JSBridge</p>
<h3 id="jsbridge-的实现技术" tabindex="-1"><a class="header-anchor" href="#jsbridge-的实现技术" aria-hidden="true">#</a> JSBridge 的实现技术</h3>
<h4 id="js-调用原生层" tabindex="-1"><a class="header-anchor" href="#js-调用原生层" aria-hidden="true">#</a> JS 调用原生层</h4>
<p>JS调用Native 的实现方式较多，主要有拦截 <code>url schema</code> 、重写 prompt、注入 API 等方式</p>
<p>共三种方法</p>
<ul>
<li>
<p>拦截 Url Schema（假请求）</p>
<ul>
<li>
<p>native 会拦截 H5 发出的请求，当检测到协议为 jsbridge（自定义的协议） 而非普通的 http/https/file 等协议时，会拦截该请求，解析出 URL 中的 methodName、arg、cbName，执行该方法并调用 js 回调函数</p>
</li>
<li>
<p>缺点：连续发送时消息丢失，如下代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">"jsbridge://callNativeNslog?{"</span>data<span class="token string">": "</span><span class="token number">111</span><span class="token string">", "</span>cbName<span class="token string">": "</span><span class="token string">"}"</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">"jsbridge://callNativeNslog?{"</span>data<span class="token string">": "</span><span class="token number">222</span><span class="token string">", "</span>cbName<span class="token string">": "</span><span class="token string">"}"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ul>
</li>
<li>
<p>拦截 prompt alrt confirm</p>
</li>
<li>
<p>注入 JS 上下文</p>
</li>
</ul>
<h4 id="原生层调用js" tabindex="-1"><a class="header-anchor" href="#原生层调用js" aria-hidden="true">#</a> 原生层调用JS</h4>
<p>Native 调用 JS 比较简单，只要 H5 将 JS 方法暴露在 Window 上给 Native 调用即可</p>
<ul>
<li>
<p>Android 通过 WebView 的 loadUrl 或 evaluateJavaScript 方法</p>
<ul>
<li>
<p>loadUrl</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>mWebview<span class="token punctuation">.</span><span class="token function">loadUrl</span><span class="token punctuation">(</span><span class="token string">"javascript: func()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 优点：1.兼容性好</span>
<span class="token comment">// 缺点：1.会刷新页面 2.无法获取 js 方法执行结果</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>evaluateJavaScript</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>mWebview<span class="token punctuation">.</span><span class="token function">evaluateJavascript</span><span class="token punctuation">(</span><span class="token string">"javascript: func()"</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">ValueCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onReceiveValue</span><span class="token punctuation">(</span><span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 优点：1.性能好 2.可获取 js 执行后的返回值</span>
<span class="token comment">// 缺点：1.仅在安卓 4.4 以上可用</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li>
</ul>
</li>
<li>
<p>iOS 通过 UIWebView 的stringByEvaluatingJavaScriptFromString 或 WKWebview 的 evaluateJavaScript 方法</p>
</li>
</ul>
<h3 id="jsbridge-的使用" tabindex="-1"><a class="header-anchor" href="#jsbridge-的使用" aria-hidden="true">#</a> JSBridge 的使用</h3>
<h4 id="如何引用" tabindex="-1"><a class="header-anchor" href="#如何引用" aria-hidden="true">#</a> 如何引用？</h4>
<p>一、由 H5 引用</p>
<p>采用本地引用 npm 包的方式进行调用。这种方式可以确定 JSBridge 是存在的，可直接调用 Native 方法，但是如果后期 Bridge 的实现方式改变，双方需要做更多的兼容，维护成本高</p>
<p>二、由 Native 注入</p>
<p>在 Native 中注入方法来引用 JSBridge。这样有利于保持 API 与 Native 的一致性，但是缺点是在 Native 注入的方法和时机都受限， JS 调用 Native 之前需要先判断 JSBridge 是否注入成功</p>
<h4 id="使用规范" tabindex="-1"><a class="header-anchor" href="#使用规范" aria-hidden="true">#</a> 使用规范</h4>
<p>H5 调用 Native 方法的伪代码实例，如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>params <span class="token operator">=</span> <span class="token punctuation">{</span>
  api_version<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>	<span class="token comment">// API 版本</span>
  title<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>	<span class="token comment">// 标题</span>
  filename<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>	<span class="token comment">// 文件名称</span>
  image<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>	<span class="token comment">// 图片链接</span>
  url<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>	<span class="token comment">// 网址链接</span>
  <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    xxx<span class="token punctuation">;</span>	<span class="token comment">// 调用成功后执行</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">.</span>code <span class="token operator">==</span> <span class="token string">'-2'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      fail <span class="token operator">&amp;&amp;</span> <span class="token function">fail</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//	调用了当前客户端中不存在的 API 版本</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> msg <span class="token operator">=</span> err<span class="token punctuation">.</span>msg<span class="token punctuation">;</span>	<span class="token comment">//异常信息</span>
      Toast<span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
window<span class="token punctuation">.</span>NativeApi<span class="token punctuation">.</span><span class="token function">share</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>以下简要列出通用方法的抽象，目标基本遵循以下规范进行双端通信</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>NativeApi<span class="token punctuation">.</span><span class="token function">xxx</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  api_version<span class="token operator">:</span><span class="token string">''</span><span class="token punctuation">,</span>
  name<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>
  path<span class="token operator">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>
  id<span class="token operator">:</span>	<span class="token string">"xxx"</span><span class="token punctuation">,</span>
  <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">fail</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>由于初期版本选择了由 H5 本地引用 JSBridge，后期采用 Native 注入的方式。现有的 H5 需要对各种情况做兼容，逻辑抽象如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">reqNativeBridge</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果不在 APP 内进行调用</span>
    vm<span class="token punctuation">.</span>$dialog<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      message<span class="token operator">:</span> <span class="token string">"此功能需要访问 APP 才能使用"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>window<span class="token punctuation">.</span>NativeApi<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 针对初期版本</span>
      vm<span class="token punctuation">.</span>$dialog<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        message<span class="token operator">:</span> <span class="token string">"请更新到最新 APP 使用该功能"</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 此处只针对“调用了当前客户端中不存在的 API 版本”的报错进行处理</span>
      <span class="token comment">// 其余种类的错误信息交由具体的业务去处理</span>
      fn <span class="token operator">&amp;&amp;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        vm<span class="token punctuation">.</span>$dialog<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
          message<span class="token operator">:</span> <span class="token string">"请更新到最新 APP 使用该功能"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>JSBridge 就字如其意，它是 Native 和 H5 交互的一种手段，可以在 Native 端做 Bridge（注入方法供 H5 调用），也可以在 H5 端做 Bridge（1.请求schema，App会拦截约定的schema；2. 重写prompt；3.全局注入API，但是这个方法安全性较差）</p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<ul>
<li>
<p><a href="https://github.com/mcuking/JSBridge" target="_blank" rel="noopener noreferrer">JSBridge实现原理<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000018208609" target="_blank" rel="noopener noreferrer">WebView与APP交互实战记录<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&amp;mid=2247484005&amp;idx=1&amp;sn=43b97435aa13b4427c82bf87a9165c05&amp;chksm=e9537c3dde24f52ba8f59e7ea837ac6b23d8bc8376cb6d5e7a34214ed49b6820fe67ab80416b&amp;mpshare=1&amp;scene=1&amp;srcid=&amp;sharer_sharetime=1582500333067&amp;sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd" target="_blank" rel="noopener noreferrer">小白必看，JSBridge<ExternalLinkIcon/></a></p>
</li>
</ul>
</template>
