# mobileHack



### 白屏解决与优化方案

当前很多无线页面都是用前端模板进行数据渲染，那么在糟糕的网速情况下，一进去页面，看到的不是白屏就是loading，这称为白屏问题。

此问题发生的原因基本可以归结为网速跟静态资源

1、css文件加载需要一些时间，在加载的过程中页面是空白的。

解决：可以考虑将css代码前置和内联。

2、首屏无实际的数据内容，等待异步加载数据在渲染页面导致白屏

解决：在首页直接同步渲染html，后续的滚屏等再采用异步请求数据和渲染html

3、首屏内联 js 的执行会阻塞页面的渲染。

解决：尽量不在首屏html代码中房子内联脚本

#### 解决方案

根本原因是客户端渲染的无力，因此最简单的方法是咋服务器端，使用模板引起渲染所有页面。同时

1减少文件加载体积，如html压缩，js压缩

2加快js执行速度，比如常见的无限滚动的页面，可以使用js先渲染一个屏幕范围内的东西

3提高一些优化的交互，比如提供一些假的滚动条

4使用本地存储处理静态文件



### 如何实现打开已安装的app，若未安装则引导用户安装？

来自  http://gallery.kissyui.com/redirectToNative/1.2/guide/index.html  kissy mobile 通过 iframe src 发送请求打开app，自定义url scheme，如taobao://home(淘宝首页)、etao://scan（一淘扫描）;如果安装了客户端则会直接唤起，直接唤起后，之前浏览器窗口（或者扫码工具的webview）推入后台；如果在指定的时间内客户端没有被唤起，则js重定向到app下载地址。大概实现代码如下

```javascript
goToNative:function () {
    if(!body) {
        setTimeout(function() {
            document.body.appendChild(iframe);
        }, 0)
    } else {
        body.appendChild(iframe)
    }
}

setTimeout(function () {
    document.body.removeChild(iframe);
    gotoDownload(stratTime) // 去下载，下载链接一般是 itunes app store 或者 apk 文件链接
   	// 测试时间设置小于800ms时，在android下的UC浏览器会打开native appp时并下载apk，
    // 测试android+UC下打开native的时候最好大于800ms
}, 800)
```

需要注意的是 如果是 android chrome 25 版本以后，在 iframe src 不会发送请求，原因如下 https://developers.google.com/chrome/mobile/docs/intents ，通过loacation href 使用 intent 机制拉起客户端可行并且当前页面不跳转

```javascript
window.location = 'intent://' + schemeUrl + '#Intent;scheme=' + scheme + ';package=' + self.package + ';end';
```







## 参考资料

- [iOS使用scheme协议调起APP](https://js8.in/2013/12/16/ios%E4%BD%BF%E7%94%A8schema%E5%8D%8F%E8%AE%AE%E8%B0%83%E8%B5%B7app/)
- [司徒正美的mobileHack](https://github.com/RubyLouvre/mobileHack)
- [12个前端必会 H5 问题及解决方法](https://github.com/suoyuesmile/suo-blog/blob/master/articals/h5/0003.md)
- [微信 H5 页面兼容性解决方案](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490207&idx=1&sn=82e08108f953fa541304b8bfc318fb30&source=41#wechat_redirect)
- [web app问题及技巧总结](https://github.com/yunzhijia/front-end/blob/master/web%20app%E9%97%AE%E9%A2%98%E5%8F%8A%E6%8A%80%E5%B7%A7%E6%80%BB%E7%BB%93.md)
- [mobileTech](https://github.com/jtyjty99999/mobileTech)
- [H5项目常见问题汇总及解决方案](https://www.open-open.com/lib/view/open1449325854077.html)
- [移动端 H5 相关问题汇总](https://github.com/suoyuesmile/suo-blog/blob/master/articals/h5/0003.md)
- [如何写一个适配iPhoneX的底部导航](https://juejin.cn/post/6844903615304302600)
- [微信 H5 页面兼容性解决方案](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490207&idx=1&sn=82e08108f953fa541304b8bfc318fb30&source=41#wechat_redirect)
- [微信浏览器禁止页面下拉查看网址](https://juejin.cn/post/6844903940190896135)
- [移动web开发踩坑总结](http://www.imooc.com/article/260139)
- [iOS Safari浏览器上overflow: scroll元素无法滑动bug解决方法整理](https://segmentfault.com/a/1190000012761272)
- [iOS safari浏览器上overflow: scroll元素无法滚动bug深究](https://segmentfault.com/a/1190000016408566)

