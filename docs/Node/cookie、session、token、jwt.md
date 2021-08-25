# Cookie、Session、Token、JST 





## Session 简介

### Session 的优势

- 相比 JWT，最大的优势在于可以主动清除 Session
- Session 保存在服务器短，相对较为安全
- 结合 cookie 使用，较为灵活，兼容性较好

### Session 的劣势

- cookie + session 在跨域场景表现并不好
- 如果是分布式部署，需要做多机共享 session 机制
- 基于 cookie 的机制很容易被 CSRF（跨站请求伪造）
- 查询 Session 信息可能会有数据库查询操作



## JWT简介

### 什么是 JWT

- JSON Web Token 是一个开发标准（RFC 7519）
- 定义了一个紧凑且相对独立的方式，可以将各方之间的信息作为 JSON 对象进行安全传输
- 该信息可以验证和信息，因为要经过数字签名

### JWT的构成

Header（头部）+ Payload（有效载荷）+ Signature（签名）

#### Header

- typ：token 的类型，这里固定位 JWT
- alg：使用 hash 算法，例如：RSA、SHA256 或者 HMAC

#### Payload

- 存储需要传递的信息，如用户ID、用户名等
- 包含元数据，如过期时间、发布人等
- 与 Header 不同 Payload 可以加密

#### Signature

- 对 Header 和 Payload 部分进行签名
- 保证 Token 在传输的过程中没有被篡改或者损坏



还分不清 Cookie、Session、Token、JWT

https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247485063&idx=1&sn=82c8ea7a0467a91b8dbbdd950f761fe5&chksm=c0668711f7110e076d9dc265e79c837871cc615ca41a0ab669fdf28f911c1f9245ef8dba042f&mpshare=1&scene=1&srcid=&sharer_sharetime=1582675470189&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



辩证的眼光搞懂 JWT 这个知识点

https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650591301&idx=1&sn=a266e2edebfec457b211ffc54b04ce65&chksm=8891c061bfe64977ac22b85da9c0e4c386fe1e540bae03c502c179049476850399adec08076d&mpshare=1&scene=1&srcid=&sharer_sharetime=1583017451923&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



cookie和session

https://github.com/alsotang/node-lessons/tree/master/lesson16



理解 Cookie、Session、Token

https://mp.weixin.qq.com/s/bMIIbfbJ1ETt7b419Oaukg



关键点是验证

当然，如果一个人的 token 被别人偷走了，那我也没办法，我也会认为小偷就是合法用户，这其实和一个人的 session id 被别人偷走是一样的。

 

这样一来，我就不保存 session id 了，我只是生成 token ，然后验证 token ，我用我的 CPU 计算时间获取了我的 session 存储空间 ！



之前豪哥说保存Token的方式不合适，但是怎么不合适了呢？本质都是验证用户信息而已