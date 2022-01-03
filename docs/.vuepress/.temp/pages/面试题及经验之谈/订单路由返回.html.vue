<template><h1 id="订单路由返回" tabindex="-1"><a class="header-anchor" href="#订单路由返回" aria-hidden="true">#</a> 订单路由返回</h1>
<h2 id="访问上一页-url-地址" tabindex="-1"><a class="header-anchor" href="#访问上一页-url-地址" aria-hidden="true">#</a> 访问上一页 url 地址</h2>
<p>传统做法：document.referrer</p>
<p>但是在单页面中不支持
有两种做法一：不是每个页面都需要记录上一页的 url，所以对特定页面处理，在上一页通过参数形式带到下一页，在下一页进行判断缺点：带参数，麻烦，好几个页面要针对参数进行判断，容易遗漏
二，react-router 团队中 react-router-native 库中针对安卓手机的处理https://github.com/ReactTraining/react-router/blob/a7e8888533aa6c9510703d73dec63ad5d0979f43/packages/react-router-native/AndroidBackButton.js#L22
我的情况是：在支付确认页跳转到输入密码安全页面，安全页面返回，弹出弹出框（history.block）回调到支付确认页，支付确认页再返回（通过浏览器路由返回），会跳转到支付密码页面，导致报错
结合以上两种做法：采用第二种，再点击”确认返回“按钮时，history.goBack() 返回至上页面，并关闭弹框安全页面 history 出栈</p>
<h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>
<ul>
<li><a href="https://www.zhangxinxu.com/wordpress/2017/02/js-page-url-document-referrer/" target="_blank" rel="noopener noreferrer">JS 获取上一访问页面 URL 地址 document.referrer 实践<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/ReactTraining/react-router/blob/a7e8888533aa6c9510703d73dec63ad5d0979f43/packages/react-router-native/AndroidBackButton.js#L22" target="_blank" rel="noopener noreferrer">react-router 团队中 react-router-native 库中针对安卓手机的处理<ExternalLinkIcon/></a></li>
</ul>
</template>
