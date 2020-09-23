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

补充一个来自三水清的详细讲解 [http://js8.in/2013/12/16/ios%E4%BD%BF%E7%94%A8schema%E5%8D%8F%E8%AE%AE%E8%B0%83%E8%B5%B7app/](http://js8.in/2013/12/16/ios使用schema协议调起app/)



https://github.com/RubyLouvre/mobileHack



https://mp.weixin.qq.com/s?__biz=MzI0MzIyMDM5Ng==&mid=2649826693&idx=1&sn=86c9c0657ac4cec87421267dc4ec9f2c&chksm=f175ef46c6026650969e0396b5423cd32110606dff9a40d1d08d7822e1cbe2a62e9447ff752e&mpshare=1&scene=1&srcid=&sharer_sharetime=1584449414703&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484857&idx=1&sn=a4562185da23740c42182adf4eb0fc96&chksm=ce6ec115f91948035274bc2cd93fabda921d915bd9ea9ab28c86cb4bc9933c01937b5d0e5126&mpshare=1&scene=1&srcid=&sharer_sharetime=1571876108871&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd