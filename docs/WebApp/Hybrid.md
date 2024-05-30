# Hybrid

### hybrid 是什么，为何会是用 hybrid？

hybrid 即“混合”，即前端和客户端的混合开发

需要前端开发人员和客户端开发人员配合完成

### hybrid 技术是如何实现的？

hybird 技术的实现依赖于以下两点：

-   file 和 schema 协议；
-   webview

#### file 和 schema 协议

app 中经常用到的有三个协议：

-   file 协议：用来打开本地文件，优点是速度快；
-   http/https 协议：http 和 ssl/tls 协议，这个协议需要发送网络请求，自然相对 file 协议就慢很多
-   schema 协议：用于客户端和前端通讯的协议；
    -   微信部分的 schema 协议如下：
        -   weixin://dl/scan 扫一扫
        -   weixin://dl/moments 朋友圈

#### webview

webview 是手机系统中，一个基于 webkit 内核，拥有渲染引擎和 JS 引擎，用于展示 html 页面的浏览器控件，简单来说是一个用于展示页面的容器

实现思路：只有当用户版本号和服务器版本号不一致时才去进行资源的请求

![image-20210611170126423](https://i.loli.net/2021/06/11/vpDFm1TSeMWA2Ji.png)

简单来说，hybrid 技术就是通过 webview 和 file、schema 协议来实现页面的加载、渲染、显示，以及与 native、服务端的通信

## 参考资料

-   [JSBridge 设计和实现](https://jeezliu.github.io/javascript/hybrid/JSBridge%E8%AE%BE%E8%AE%A1%E5%92%8C%E5%AE%9E%E7%8E%B0/)
-   [Hybrid 应用中 H5 与 Native 通信的那点事儿](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490355&idx=1&sn=312748f8249b48038b7d159cc44c1806&source=41#wechat_redirect)
-   [转转 Hybrid 体系建设](https://juejin.cn/post/6872185695838928909)
