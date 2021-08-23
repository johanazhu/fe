options 方法的作用

1.检测服务器所支持的请求方法

2.CORD中的预检请求



allowedMethods的作用

相应options 方法，告诉所支持的请求方法

相应地返回405（不允许） 和 501（没实现）





NoSQL

对不同于传统的关系型数据库的数据库管理系统的统称

NoSQL 数据库的分类

列存储（HBase）

文档存储（MongoDB）

Key-value 存储（Redis）

为什么要用NoSQL

简单

便于横向拓展

适合超大规模数据的存储

很灵活地存储复杂结果的数据（Schema Free）



为什么要用MongoDB

性能好（内存计算）

大规模数据存储（可拓展性）

可靠安全（本地复制、自动故障转移）

方便存储复杂数据结构（Schema Free）





### session 优势

相对JWT,最大的优势在于可以主动清除seeion

session 保存在服务器端，相对较为安全

结合 cookie 使用，较为灵活，兼容性较好



### Session 劣势

cookie + session 在跨域场景表现并不好

如果是分布式部署，需要做多级共享session机制

基于cookie 的机制很容易被CSRF

查询 session 信息可能会有数据库查询操作



session: 主要存放在服务器端，相对安全

cookie：主要存放在客户端，并且不是很安全



什么是JWT>

JSON Web Token 是一个开放标准（RFC 7519）

定义了一个紧凑且独立的方式，可以将各方之间的信息作为JSON对象进行安全传输

该信息可以验证和信任，因为是经过数字签名的



JWT的构成

头部（Header）

有效载荷（Payload）

签名（Signature）

#### Header

typ：token的类型，这里固定为JWT

alg：使用的hash算法，例如：HMAC SHA256或者 RSA

#### Payload

存储需要传递的信息，如用户ID、用户名等

还包含元数据，如过期时间、发布人等

与 Header 不同，Payload 可以加密

#### Signature

对 Header 和 Payload 部分进行签名

保证 Token 在传输的过程中没有被篡改或者损坏



