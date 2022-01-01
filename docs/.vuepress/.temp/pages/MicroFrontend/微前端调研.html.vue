<template><p>什么是微前端？</p>
<p>微前端有什么用？具体解决什么？</p>
<p>如何使用微前端？</p>
<p>使用场景？</p>
<p>SingleSpa</p>
<p>我感觉微前端更适用在后台操作系统上，</p>
<p>看了好几个大厂，比如美团外卖，网易应选，每日优鲜的，都是改造后台的。</p>
<p>前台目前的项目没看到</p>
<p>但是像鲸钱包就是一个项目，如果拆成好几个小的项目，不应该，</p>
<p>微前端的前提是项目各自独立，</p>
<p>但是鲸钱包二合一项目本身就是一个独立的项目，将它分离不合实际。</p>
<p>虽然是页面跳转，但是项目相对独立</p>
<p>共赢如何改造</p>
<p>需要登录情况下跳转到</p>
<p>如果没有登录跳转到登录页面</p>
<p>什么是single-spa？</p>
<p>single-spa 一个基于 JavaScript的 微前端架构，它可以用于构建可共存的微前端应用，每个前端应用都可以用自己的框架编写，完美支持 Vue React Angular。可以实现 服务注册 时间监听 字符组件通讯 等功能</p>
<p>umi乾坤暂不支持 通讯，要通讯的话要自己封装</p>
<p>https://github.com/umijs/qiankun/projects/2</p>
<p>单页面应用</p>
<p>懒加载就可以</p>
<p>页面跳转就可以，跳的时候加上access参数</p>
<p>凭证accessToken</p>
<p>我希望的是</p>
<p>二合一，共赢，咨询 三个是独立的项目， 独立开发独立部署</p>
<p>如何做到？通过路由跳转带参数？</p>
<p>安全吗？通过get请求如果抓包是得到信息，显然不安全</p>
<p>感觉不需要使用微前端</p>
<p>这套东西在后台管理页面上也许好使，但是 to C 项目完全不需要</p>
<p>一个页面不超过200行</p>
<p>jwt</p>
<p>uid</p>
<p>带过去</p>
<p>get的时候带过去</p>
<p>然后我去解析</p>
<p>跳转共赢的时候带上 签名</p>
<p>共赢这边解析 解析是同一个人就</p>
<p>md5 加密</p>
<p>可以前端起一个node服务，目前就做加密效果</p>
<p>进入共赢项目的时候就去验证他是否是他。</p>
<p>如果说咨询只有在点击的时候判断你的话，那么它就在哪个时候调用接口</p>
<p>session已经没用了，用jwt</p>
<p>既然用单页面应用，session的功能只剩下保存uid用，用jwt</p>
<p>session和jwt 的区别在于session 不可预测，jwt 无状态，加密</p>
<p>jsapi_ticket 临时票据</p>
<p>需要ticket 才能生成 accessToken 访问令牌</p>
<p>基本上是敲定了</p>
<p>二合一，共赢，咨询分而治之</p>
<p>但是二合一还是要彻底重构，用手</p>
<p>Suspense 是什么</p>
<p>配合 lazy 实现 <code>code Spliting</code></p>
<p>https://tech.meituan.com/2018/09/06/fe-tiny-spa.html</p>
<p>https://www.thoughtworks.com/cn/radar/techniques/micro-frontends</p>
</template>
