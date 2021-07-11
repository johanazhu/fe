# Hybrid



### hybrid是什么，为何会是用hybrid？

hybrid即“混合”，即前端和客户端的混合开发

需要前端开发人员和客户端开发人员配合完成



### hybrid技术是如何实现的？

hybird技术的实现依赖于以下两点：

- file 和 schema 协议；
- webview



#### file 和 schema 协议

app 中经常用到的有三个协议：

- file 协议：用来打开本地文件，优点是速度快；
- http/https协议：http 和 ssl/tls 协议，这个协议需要发送网络请求，自然相对 file 协议就慢很多
- schema协议：用于客户端和前端通讯的协议；
  - 微信部分的schema协议如下：
    - weixin://dl/scan 扫一扫
    - weixin://dl/moments 朋友圈

#### webview

webview 是手机系统中，一个基于webkit内核，拥有渲染引擎和JS引擎，用于展示html页面的浏览器控件，简单来说是一个用于展示页面的容器





实现思路：只有当用户版本号和服务器版本号不一致时才去进行资源的请求

![image-20210611170126423](https://i.loli.net/2021/06/11/vpDFm1TSeMWA2Ji.png)



简单来说，hybrid 技术就是通过 webview 和 file、schema 协议来实现页面的加载、渲染、现实，以及与native、服务端的通信





某些环节也可能涉及到server端

https://jeezliu.github.io/javascript/hybrid/JSBridge%E8%AE%BE%E8%AE%A1%E5%92%8C%E5%AE%9E%E7%8E%B0/





Hybrid 应用中H5与Native 通信的那点事儿

https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247485506&idx=1&sn=c96d0a067962e3bbc03c98548a2d7efa&chksm=ce6ecceef91945f87c50c41e844b719120dbc18d26f98f797df8b756439e8eb60a256159dc0b&mpshare=1&scene=1&srcid=&sharer_sharetime=1586567321300&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



转转 Hybrid 体系建设

https://juejin.im/post/6872185695838928909





