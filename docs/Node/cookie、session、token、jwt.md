# Cookie、Session、Token、JST 



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