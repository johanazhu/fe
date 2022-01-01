<template><h1 id="微信网页开发之常见问题" tabindex="-1"><a class="header-anchor" href="#微信网页开发之常见问题" aria-hidden="true">#</a> 微信网页开发之常见问题</h1>
<p>这里记录笔者常遇到的问题，有些坑真的让笔者痛不欲生，如果你尝过明明一样的配置，一个页面可以，另一个页面不可以你就能明白我的意思了...</p>
<h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2>
<h3 id="_40048-invalid-url-domain" tabindex="-1"><a class="header-anchor" href="#_40048-invalid-url-domain" aria-hidden="true">#</a> 40048,invalid url domain</h3>
<p><a href="https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#66" target="_blank" rel="noopener noreferrer">微信文档附录5-常见错误及解决方法<ExternalLinkIcon/></a></p>
<p><img src="https://i.loli.net/2021/06/30/lrAxdMK1Ic48smh.png" alt="invalid url domain"></p>
<p>用测试号调试，有几点要注意：</p>
<ol>
<li>本地调式时，自己需要弄个测试号，要注意 ip 一致，本地需要开启 wxCentralControl（中控服务），以及 wxsdk 服务（包括网页授权服务+微信 jssdk 服务），其中的 appid 和 appsecret 写成自己的测试号</li>
<li>本地调用服务器上的 wxsdk 是调不通的</li>
<li>JS 接口安全域名、授权回调页面域名需要一致，才能调通
<ol>
<li>为什么，JS 接口安全域名是服务于 JSSDK，JSSDK 中有分享、发朋友圈等功能，它和你的域名一致才能成功</li>
<li>授权回调域名，主要是通过 Oauth2.0 来实现，就是你一个网页要获取我App（微信）的信息，有两种模式，一是 snsapi_base，用户无感知，二是 snsapi_userinfo ，手动授权</li>
</ol>
</li>
</ol>
<p><strong>总而言之，如果你要调通，必须三者一致</strong></p>
<h3 id="微信分享报这个错-the-permission-value-is-offline-verifying" tabindex="-1"><a class="header-anchor" href="#微信分享报这个错-the-permission-value-is-offline-verifying" aria-hidden="true">#</a> 微信分享报这个错：the permission value is offline verifying?</h3>
<p><a href="https://developers.weixin.qq.com/community/develop/doc/00066cd7ee4a385c645c9be1856000?highLine=the%2520permission%2520value%2520is%2520offline%2520verifying%253F" target="_blank" rel="noopener noreferrer">苹果小部分手机设置分享弹出 the permission value is offline ver？<ExternalLinkIcon/></a></p>
<h3 id="我的单页面应用配置错误" tabindex="-1"><a class="header-anchor" href="#我的单页面应用配置错误" aria-hidden="true">#</a> 我的单页面应用配置错误</h3>
<p>俺找到原因了我找到我的原因了，点击菜单链接配置为<a href="http://xxx.com/" target="_blank" rel="noopener noreferrer">xxx.com<ExternalLinkIcon/></a>。而我的项目首页是<a href="http://xxx.com/mall" target="_blank" rel="noopener noreferrer">xxx.com/mall<ExternalLinkIcon/></a>，框架帮我重定向到/mall，但是微信link还是停留在/，所以微信分享的时候link不对，这也是为什么我在开发者工具中ok，但是部分同事在手机端里有时候不行的原因
配置文件里改成 xxx.com/mall 即可</p>
<h3 id="微信保存图片只能-长按保存" tabindex="-1"><a class="header-anchor" href="#微信保存图片只能-长按保存" aria-hidden="true">#</a> 微信保存图片只能“长按保存”</h3>
<p><a href="https://zhuanlan.zhihu.com/p/260941705" target="_blank" rel="noopener noreferrer">从微信H5点击保存图片说起<ExternalLinkIcon/></a></p>
<p>保存图片的效果点击 “保存图片”按钮，   如果是app中的H5，就调用app给的方法  如果是微信中，不能使用这样的方法，<strong>只能长按保存</strong></p>
<p>别人的经验：</p>
<p><a href="https://github.com/yongheng2016/blog/issues/78" target="_blank" rel="noopener noreferrer">微信分享 总结（SPA/history模式）<ExternalLinkIcon/></a></p>
</template>
