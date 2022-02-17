<template><h1 id="微信网页开发之js-sdk" tabindex="-1"><a class="header-anchor" href="#微信网页开发之js-sdk" aria-hidden="true">#</a> 微信网页开发之JS-SDK</h1>
<p>为什么要做这个？</p>
<p>因为需要。</p>
<p>在微信中分享链接，如果你想分享出来的是有缩略图和描述的，都必须要接入微信的 JS-SDK</p>
<p>笔者在入行第一家公司是广告公司，老板为了做此效果，费了很大劲（朋友圈请各路朋友帮忙），所以这一功能在笔者对此印象很深刻</p>
<p>我们这里用倒推法来推演</p>
<h2 id="倒推步骤" tabindex="-1"><a class="header-anchor" href="#倒推步骤" aria-hidden="true">#</a> 倒推步骤</h2>
<p>我要做微信分享，即要看<a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>，文档写了，一共四步</p>
<ol>
<li>
<p>绑定域名</p>
</li>
<li>
<p>引入JS文件</p>
</li>
<li>
<p>通过config接口注入权限验证配置（接口签名）</p>
</li>
<li>
<p>通过ready接口处理成功验证（通过error接口处理失败验证）</p>
</li>
</ol>
<h3 id="第一步-绑定域名" tabindex="-1"><a class="header-anchor" href="#第一步-绑定域名" aria-hidden="true">#</a> 第一步：绑定域名</h3>
<p>很简单，在开发者工具中填入”JS安全域名“。如果我们用的是测试号，可填ip地址，这里需要注意的是：</p>
<p><strong>域名不要加协议名和端口号</strong></p>
<p><img src="https://i.loli.net/2021/09/27/sId5AyF81o6WzUt.png" alt="测试号"></p>
<h3 id="第二步-引入js文件" tabindex="-1"><a class="header-anchor" href="#第二步-引入js文件" aria-hidden="true">#</a> 第二步：引入JS文件</h3>
<p>你可以直接引入 JS 文件，也可以引入 npm 包，一般我们开发H5应用，会采用 npm 包，现在都用1.6.0版本，问题不大</p>
<p>引入 <code>http://res.wx.qq.com/open/js/jweixin-1.6.0.js</code> 或者</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i weixin-js-sdk
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="第三步-通过config接口注入权限验证配置" tabindex="-1"><a class="header-anchor" href="#第三步-通过config接口注入权限验证配置" aria-hidden="true">#</a> 第三步：通过config接口注入权限验证配置</h3>
<p>最重要的一步，前两步都是配置，第三步相当于请求接口，接口返回数据，你填上这些数据。第四步是验证你填的数据是否正确</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx<span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  debug<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。</span>
  appId<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> <span class="token comment">// 必填，公众号的唯一标识</span>
  timestamp<span class="token operator">:</span> <span class="token punctuation">,</span> <span class="token comment">// 必填，生成签名的时间戳</span>
  nonceStr<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> <span class="token comment">// 必填，生成签名的随机串</span>
  signature<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span><span class="token comment">// 必填，签名</span>
  jsApiList<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 必填，需要使用的JS接口列表</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="第三步往前推-获取-jsapi-ticket" tabindex="-1"><a class="header-anchor" href="#第三步往前推-获取-jsapi-ticket" aria-hidden="true">#</a> 第三步往前推：获取 jsapi_ticket</h3>
<p>我们需要做个接口，供H5调用，调用后让其获取到 appId、timestamp、nonceStr、signature</p>
<p>signature（签名） 是通过noncestr、jsapi_ticket、timestamp、url 生成的。这里noncestr、timestamp、url 都好获取，唯独这个 jsapi_ticket （票据），怎么拿到手，通过 access_token 获取</p>
<p><img src="https://i.loli.net/2021/09/27/qtRglMxv4BT5rwc.png" alt="获取jsapi_ticket"></p>
<h3 id="第三步再往前推推-获取-access-token" tabindex="-1"><a class="header-anchor" href="#第三步再往前推推-获取-access-token" aria-hidden="true">#</a> 第三步再往前推推：获取 access_token</h3>
<p>access_token 是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用 access_token。这里需要注意的是无论是我们的微信服务端开发（开发自定菜单、订阅通知等功能、素材管理等功能，可看这篇文章：<RouterLink to="/WeChat/%E5%BE%AE%E4%BF%A1%E6%9C%8D%E5%8A%A1%E7%AB%AF%E5%BC%80%E5%8F%91.html">微信服务端开发</RouterLink>）还是 JS-SDK 调用，都需要用到 access_token，按照微信的官方文档，希望开发者能做一个中控服务，定时刷新 access_token</p>
<blockquote>
<p>建议公众号开发者使用中控服务器统一获取和刷新access_token，其他业务逻辑服务器所使用的access_token均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致access_token覆盖而影响业务；</p>
</blockquote>
<p>考虑到 jsapi_ticket 也需要缓存、所以我的理解是我们的架构中微信中控服务中需要包含两个缓存的数据：access_token 和 jsapi_ticket。</p>
<h3 id="第三步的关键一步-签名算法" tabindex="-1"><a class="header-anchor" href="#第三步的关键一步-签名算法" aria-hidden="true">#</a> 第三步的关键一步：签名算法</h3>
<p>我们拿到 access_token 和 jsapi_ticket，并缓存住后，要通过一定的签名生成规则来生成signature</p>
<p>具体文档上都有写：<a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62" target="_blank" rel="noopener noreferrer">签名算法<ExternalLinkIcon/></a> ，这里不做详细介绍</p>
<p>大致流程是用户请求接口，服务器端返回 appId、timestamp、nonceStr、signature，用户拿到数据后，填入config</p>
<h3 id="第四步-通过ready、error接口验证" tabindex="-1"><a class="header-anchor" href="#第四步-通过ready、error接口验证" aria-hidden="true">#</a> 第四步：通过ready、error接口验证</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>wx<span class="token punctuation">.</span><span class="token function">ready</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
wx<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这里不做过多说明</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>我们要做微信开发，无论做不做公众号服务端的开发，都需要 access_token，所以要有个中控服务，它的功能点之一是负责每 2 小时定时刷新 access_token。我们要做微信网页开发，就需要缓存 jsapi_ticket（它也有7200秒的限制），所以我们的中控服务需要缓存两个数据：access_token（凭据） 和 jsapi_ticket（票据），将其缓存在 redis 中</p>
<p>我们要开发微信网页分享功能，其中需要拿到 jsapi_ticket，并通过签名规则生成 signature，并提供一个 api 接口，用户进入页面后，请求此 api，服务器返回 appId、timestamp、nonceStr、signature 等参数，用户将其放入 config 中，并验证其是否运行</p>
<h2 id="实战环节" tabindex="-1"><a class="header-anchor" href="#实战环节" aria-hidden="true">#</a> 实战环节</h2>
<h3 id="web端" tabindex="-1"><a class="header-anchor" href="#web端" aria-hidden="true">#</a> web端</h3>
<p>封装为方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> wxsdk <span class="token keyword">from</span> <span class="token string">'weixin-js-sdk'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> fetchSignature <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@/services'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">initShareConfig</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">detailInfo<span class="token punctuation">,</span> configInfo</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    wxsdk<span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        debug<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        appId<span class="token operator">:</span> configInfo<span class="token punctuation">.</span>appId<span class="token punctuation">,</span> <span class="token comment">// 必填，公众号的唯一标识</span>
        timestamp<span class="token operator">:</span> configInfo<span class="token punctuation">.</span>timestamp<span class="token punctuation">,</span> <span class="token comment">// 必填，生成签名的时间戳</span>
        nonceStr<span class="token operator">:</span> configInfo<span class="token punctuation">.</span>nonceStr<span class="token punctuation">,</span> <span class="token comment">// 必填，生成签名的随机串</span>
        signature<span class="token operator">:</span> configInfo<span class="token punctuation">.</span>signature<span class="token punctuation">,</span> <span class="token comment">// 必填，签名</span>
        jsApiList<span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">'updateAppMessageShareData'</span><span class="token punctuation">,</span>
            <span class="token string">'updateTimelineShareData'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 必填，需要使用的JS接口列表</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    wxsdk<span class="token punctuation">.</span><span class="token function">ready</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// “分享给朋友”及“分享到QQ”按钮的分享内容</span>
        wxsdk<span class="token punctuation">.</span><span class="token function">updateAppMessageShareData</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            title<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token comment">// 分享标题</span>
            desc<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>desc<span class="token punctuation">,</span> <span class="token comment">// 分享描述</span>
            link<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>link<span class="token punctuation">,</span> <span class="token comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            imgUrl<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>imgUrl<span class="token punctuation">,</span> <span class="token comment">// 分享图标</span>
            <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 设置成功</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// “分享到朋友圈”及“分享到QQ空间”</span>
        wxsdk<span class="token punctuation">.</span><span class="token function">updateTimelineShareData</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            title<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token comment">// 分享标题</span>
            link<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>link<span class="token punctuation">,</span> <span class="token comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            imgUrl<span class="token operator">:</span> detailInfo<span class="token punctuation">.</span>imgUrl<span class="token punctuation">,</span> <span class="token comment">// 分享图标</span>
            <span class="token function-variable function">success</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 设置成功</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> initWxShare <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> name <span class="token operator">=</span> <span class="token string">'长泽雅美'</span><span class="token punctuation">,</span> desc <span class="token operator">=</span> <span class="token string">"长泽雅美至上主义者"</span><span class="token punctuation">,</span> img <span class="token operator">=</span> wxLogo<span class="token punctuation">,</span> link <span class="token operator">=</span> <span class="token string">''</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token punctuation">{</span>
        url<span class="token operator">:</span> <span class="token function">encodeURIComponent</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">'#'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> configInfo <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchSignature</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> href<span class="token operator">:</span> realUrl <span class="token punctuation">}</span> <span class="token operator">=</span> window<span class="token punctuation">.</span>location<span class="token punctuation">;</span>

    <span class="token keyword">let</span> shareUrl <span class="token operator">=</span> realUrl<span class="token punctuation">;</span>

    <span class="token keyword">const</span> detailData <span class="token operator">=</span> <span class="token punctuation">{</span>
        name<span class="token punctuation">,</span>
        desc<span class="token punctuation">,</span>
        link<span class="token operator">:</span> link <span class="token operator">||</span> shareUrl<span class="token punctuation">,</span>
        imgUrl<span class="token operator">:</span> img<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>configInfo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">initShareConfig</span><span class="token punctuation">(</span>detailData<span class="token punctuation">,</span> configInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> initWxShare<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><p>页面使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 仅做演示</span>
<span class="token keyword">import</span> initWxShare <span class="token keyword">from</span> <span class="token string">'@/utils/wechat'</span><span class="token punctuation">;</span>
<span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">initWxShare</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        name<span class="token operator">:</span> <span class="token string">'好友向您推荐了长泽雅美写真集'</span><span class="token punctuation">,</span>
        desc<span class="token operator">:</span> <span class="token string">'长泽雅美新电影《行骗天下·英雄片》'</span><span class="token punctuation">,</span>
        img<span class="token operator">:</span> <span class="token string">'给个图'</span><span class="token punctuation">,</span>
        link<span class="token operator">:</span> <span class="token string">'这里根据需求写当前连接或者要跳转的链接'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="服务器端" tabindex="-1"><a class="header-anchor" href="#服务器端" aria-hidden="true">#</a> 服务器端</h3>
<p>我们需要提供一个接口供 web 端调用，简单来说</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 这里仅提供主要代码</span>
router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/jsapi"</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> url <span class="token punctuation">}</span> <span class="token operator">=</span> ctx<span class="token punctuation">.</span>request<span class="token punctuation">.</span>query<span class="token punctuation">;</span>
    <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">sign</span><span class="token punctuation">(</span><span class="token function">decodeURIComponent</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> config<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">sign</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> ticket <span class="token operator">=</span> <span class="token keyword">await</span> redis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">WX_TICKET</span> <span class="token operator">||</span> <span class="token string">"wx_ticket"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ticket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
            nonceStr<span class="token operator">:</span> <span class="token function">createNonceStr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            timestamp<span class="token operator">:</span> <span class="token function">createTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            jsapi_ticket<span class="token operator">:</span> ticket<span class="token punctuation">,</span>
            url<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> newString <span class="token operator">=</span> <span class="token function">raw</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> signature <span class="token operator">=</span> <span class="token function">sha1</span><span class="token punctuation">(</span>newString<span class="token punctuation">)</span><span class="token punctuation">;</span>
        obj<span class="token punctuation">.</span>signature <span class="token operator">=</span> signature<span class="token punctuation">;</span>
        obj<span class="token punctuation">.</span>appId <span class="token operator">=</span> <span class="token constant">APPID</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token string">"ticket获取失败"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">createNonceStr</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">createTimestamp</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 签名规则</span>
<span class="token keyword">const</span> <span class="token function-variable function">raw</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
    keys <span class="token operator">=</span> keys<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> newObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    keys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        newObj<span class="token punctuation">[</span>key<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> string <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> k <span class="token keyword">in</span> newObj<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        string <span class="token operator">+=</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> k <span class="token operator">+</span> <span class="token string">"="</span> <span class="token operator">+</span> newObj<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    string <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">substr</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> string<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p>一看很简单，在 <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a> 最后微信还提供示例代码，可以说很贴心了</p>
<h2 id="额外说明" tabindex="-1"><a class="header-anchor" href="#额外说明" aria-hidden="true">#</a> 额外说明</h2>
<p>网页授权access_token和普通access_token：</p>
<p><img src="https://i.loli.net/2021/06/03/PQCgKNv7zFHOdDT.png" alt="image-20201221123635929"></p>
</template>
