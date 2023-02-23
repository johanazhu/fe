# Cookie、Session、Token、JWT

## Session 介绍

### Session 的优势

-   相比 JWT，最大的优势在于可以主动清除 Session
-   Session 保存在服务器短，相对较为安全
-   结合 cookie 使用，较为灵活，兼容性较好

### Session 的劣势

-   cookie + session 在跨域场景表现并不好
-   如果是分布式部署，需要做多机共享 session 机制
-   基于 cookie 的机制很容易被 CSRF（跨站请求伪造）
-   查询 Session 信息可能会有数据库查询操作

## JWT 介绍

### 什么是 JWT

jwt 是 json web token 的圈层，它解决了 session 以上的问题，优点是服务器不保存任何会话数据，即服务器变为无状态，使其更容易扩展

### JWT 的构成

Header（头部）+ Payload（有效载荷）+ Signature（签名）

#### Header

-   typ：token 的类型，这里固定位 JWT
-   alg：使用 hash 算法，例如：RSA、SHA256 或者 HMAC

#### Payload

-   存储需要传递的信息，如用户 ID、用户名等
-   包含元数据，如过期时间、发布人等
-   与 Header 不同 Payload 可以加密

#### Signature

-   对 Header 和 Payload 部分进行签名
-   保证 Token 在传输的过程中没有被篡改或者损坏

### 认证流程

1. 客户端登录时传用户名、密码
2. 服务器拿到用户名和密码后根据算法，生成 token，返回给浏览器
3. 客户端拿到 token 后，存在本地存储中，再请求时带着 token 请求（一般放在 http header 中）
4. 服务器拿着传来的 token ，验证其身份，返回资源

> PS：服务器可以在 paylload 设置过期时间，如果过期，可以让客户端重新发起验证

### JWT 缺点

-   更多的空间占用

## 参考资料

-   [还分不清 Cookie、Session、Token、JWT](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247485063&idx=1&sn=82c8ea7a0467a91b8dbbdd950f761fe5&chksm=c0668711f7110e076d9dc265e79c837871cc615ca41a0ab669fdf28f911c1f9245ef8dba042f&mpshare=1&scene=1&srcid=&sharer_sharetime=1582675470189&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [辩证的眼光搞懂 JWT 这个知识点](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496330&idx=1&sn=5da74664cd5674e5771059cd5fd1c298&source=41#wechat_redirect)
-   [理解 Cookie、Session、Token](https://mp.weixin.qq.com/s/bMIIbfbJ1ETt7b419Oaukg)

-   [使用 NodeJS 实现 JWT 原理](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247488056&idx=1&sn=d07e95f60604aa2da9aee49b86e6cd5f&chksm=ea0d58c2dd7ad1d45e20a951b8847b63d597a99ade063014e20e79b23162e051ee06f68755d0&scene=126&sessionid=1600412234&key=d3c7cb8eeb23bc83968429e6896fb1b7aba49ba0d6a3b34aff3f5ccb37deb4cb883e7a341562d5ab59ff32b314a331abab775bccc7865ce6c364a77489f8bf91df735ca53b2b3a507b575204e29604b058962fba3a78d88dfc2a238dc84d35749b598b16d8077ecdc6928b0da8787889d8a64251fc1618d27a315f2e46696f5b&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=ATtLISQdbnnQU2A6%2BO3uCSY%3D&pass_ticket=G1%2BpLV9U7UxieEvoe8apJpgtIUKxkgKCK%2Fa%2B3TfiAiVfivJ091UXMCqZfVMTaBn2&wx_header=0)
