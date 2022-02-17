<template><h1 id="微信网页授权" tabindex="-1"><a class="header-anchor" href="#微信网页授权" aria-hidden="true">#</a> 微信网页授权</h1>
<p>微信网页授权步骤差不多有四步，具体文档可查看<a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>，我画了下流程图：</p>
<p><img src="https://i.loli.net/2021/09/26/aPZvclQdzDTmjoL.png" alt="微信授权流程图"></p>
<p>以下为代码实战</p>
<h2 id="第一步-用户同意授权-获取code" tabindex="-1"><a class="header-anchor" href="#第一步-用户同意授权-获取code" aria-hidden="true">#</a> 第一步：用户同意授权，获取code</h2>
<p>需先调用 <code>/auth</code> 接口，传入必传参数 <code>url</code> 以及 <code>scope</code>（此为参数名）</p>
<p>请求方式：GET</p>
<ul>
<li>
<p>url 为回调地址</p>
</li>
<li>
<p>scope 有两个可选参数</p>
<ul>
<li>snsapi_base 只能获取进入页面用户的 openid，用户无感知，叫静默授权</li>
<li>snsapi_userinfo 能获取用户的基本信息，但需要用户接受，叫手动授权，如下图</li>
</ul>
</li>
</ul>
<p><img src="https://i.loli.net/2021/05/21/gKzl6PTUmQYos4L.png" alt="1599707513545"></p>
<p>具体区别可前往 <a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html" target="_blank" rel="noopener noreferrer">微信文档<ExternalLinkIcon/></a> 查看</p>
<h2 id="第二步-通过code换取网页授权access-token" tabindex="-1"><a class="header-anchor" href="#第二步-通过code换取网页授权access-token" aria-hidden="true">#</a> 第二步：通过code换取网页授权access_token</h2>
<p>这里以手动授权为例</p>
<p>获取到微信的 code 后，再请求 <code>/getUserInfo</code></p>
<p>请求方式： GET</p>
<p>请求参数：code，需请求 <code>/auth</code> 获取到 <code>code</code> 先，如果你在请求 <code>/auth</code> 时传入的 <code>scope</code> 为 <code>snsapi_userinfo</code> , 那么返回微信个人信息，包括微信名，性别，所在地区，国籍，头像等等，如下</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>   
  <span class="token string">"openid"</span><span class="token operator">:</span><span class="token string">" OPENID"</span><span class="token punctuation">,</span>
  <span class="token string">"nickname"</span><span class="token operator">:</span> <span class="token constant">NICKNAME</span><span class="token punctuation">,</span>
  <span class="token string">"sex"</span><span class="token operator">:</span><span class="token string">"1"</span><span class="token punctuation">,</span>
  <span class="token string">"province"</span><span class="token operator">:</span><span class="token string">"PROVINCE"</span><span class="token punctuation">,</span>
  <span class="token string">"city"</span><span class="token operator">:</span><span class="token string">"CITY"</span><span class="token punctuation">,</span>
  <span class="token string">"country"</span><span class="token operator">:</span><span class="token string">"COUNTRY"</span><span class="token punctuation">,</span>        <span class="token string">"headimgurl"</span><span class="token operator">:</span><span class="token string">"https://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46"</span><span class="token punctuation">,</span>
  <span class="token string">"privilege"</span><span class="token operator">:</span><span class="token punctuation">[</span> <span class="token string">"PRIVILEGE1"</span> <span class="token string">"PRIVILEGE2"</span>     <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">"unionid"</span><span class="token operator">:</span> <span class="token string">"o6_bmasdasdsad6_2sgVt7hMZOPfL"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>但如果 <code>scope</code> 为 <code>snsapi_base </code> ，请求成功时只返回用户的 <code>openid</code></p>
<blockquote>
<p>PS: 请求<code>/getOpenId</code>、 <code>/getUserInfo</code> 成功时会返回 <code>access_token</code>，但此 <code>access_token</code>  和 微信服务端开发中的 <code>access_token</code> 不同，一个是微信与服务器打交道（微信票据服务），另一个是微信网页的 OAuth2.0 服务（网页授权）</p>
</blockquote>
<h2 id="第三步-请求-userinfo" tabindex="-1"><a class="header-anchor" href="#第三步-请求-userinfo" aria-hidden="true">#</a> 第三步：请求 userInfo</h2>
<p>拿着 access_token 和 openid，去请求微信官方接口</p>
<blockquote>
<p><code>http：GET（请使用 https 协议） https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&amp;openid=OPENID&amp;lang=zh_CN</code></p>
</blockquote>
<p>返回openid、nickname、sex、province、city、country、headimgurl 等信息，拿着 openid 和 你想要的数据返回值原来 <code>/auth</code> 参数中的 url 上</p>
<h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2>
<p>先调用 <code>/auth</code> 接口，传入参数 url 和 scope</p>
<p>请求接口：<code>http://192.168.230.209/auth?url=http://192.168.230.209/home&amp;scope=snsapi_userinfo</code></p>
<p>redis 存 <code>url=http://192.168.230.209/home</code>，即最后授权完成拿到数据后返回的前端地址</p>
<p>判断参数 scope，如果是 <code>snsapi_userinfo</code>，用户点击授权后跳转至 <code>/getWxUserInfo</code> 接口；</p>
<p>如果是 <code>snsapi_base</code>，静默授权后跳转至 <code>getOpenId</code> 接口</p>
<p>这里我们传的 scope 为 <code>snsapi_userinfo</code>，所以请求成功后会有授权页面</p>
<p><img src="https://i.loli.net/2021/05/21/gKzl6PTUmQYos4L.png" alt="1599707513545"></p>
<p>点击”同意“会跳转至页面</p>
<p><code>http://192.168.230.209:8888/api/wechat/getWxUserInfo?code=081UcAFa1s1OAz0o7wGa1wb8vG1UcAFX&amp;state=123</code></p>
<blockquote>
<p>PS：<code>http://192.168.230.209:8888/api/wechat</code> 为该后端服务地址，<code>getWxUserInfo</code> 为路由（即请求接口）</p>
</blockquote>
<p>从<code>ctx.request.query</code> 中拿到 code，拿着 code 请求 access_token服务，access_token 服务也是微信官方提供的一个方法</p>
<blockquote>
<p><code>获取code后，请求以下链接获取access_token： https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&amp;secret=SECRET&amp;code=CODE&amp;grant_type=authorization_code</code></p>
</blockquote>
<p>请求成功的话，拿着这个返回值中的 access_token 和 openid，请求 userinfo 接口，在上文已经介绍过，这里不做重复</p>
<blockquote>
<p>这里要说明的一点是，如果请求 access_token  的返回 code 为 40029，说明 access_token 已经失效，我们需要重新刷新 access_token</p>
</blockquote>
<p>拿到 userinfo 的返回值后，在最开始存在 redis 中的url上拼接 openid、headimgurl 等即可</p>
<p>这里需要说明一点</p>
<p>需要先配置 OAuth2.0 网页授权的回调页面域名，类似这种</p>
<p><img src="https://i.loli.net/2021/09/27/PufDxSq7m3abZcA.png" alt="授权回调页面域名"></p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>一直要知道一定，微信网页开发和调用微信的 JS-SDK 不一样，也和微信服务端开发不一样</p>
<p>它可以当初拎出来说，坑也比较少，不会遇到像 JS-SDK 那样的各种报错</p>
<p>只要知道，它为为了获取 openid （以及微信个人信息）而弄的一个服务就好了</p>
</template>
