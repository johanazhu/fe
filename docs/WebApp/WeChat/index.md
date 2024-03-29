# 微信公众号导航

> 到了壮年中年，想一想，少年青年时期非常羡慕的那个壮年中年人，是否就是目前的自己？是，那很好。否，那恐怕是来不及了

最开始做前端，笔者是在一家广告公司，那个时候的 H5 营销页面特别火，不仅仅要做移动端，而且要在微信上传播，而微信分享、发送朋友圈之类的功能是要引入微信的 JS-SDK 的

[微信开放文档](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)上已经写的很具体了，主要是两方面，一是服务端开发、二是客户端（前端）开发

服务器端能做：

-   微信自定义菜单
-   消息订阅、发送
-   素材管理
-   账号管理
-   ...

客户端（前端）主要做微信网页开发中的前端部分

而且不同的公众号类型具有不同的接口权限：具体可看[这里](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Explanation_of_interface_privileges.html)

本人因为公司业务要求，尝试开发过自定义菜单、用户管理等功能，所以写了[微信服务端开发](./微信服务端开发.md)，又因为做网页授权需要获取 openid 需求，写了这篇[微信网页授权](./微信网页授权.md)。从最开始做前端就打交道的 JS-SDK，一直走来遇到的各种坑，分别写在了 [微信网页开发之 JS-SDK](./微信网页开发之JS-SDK.md) 以及 [微信网页开发之常见问题](./微信网页开发之常见问题.md)

以上均为本人经验所写，如有纰漏，望请指出
