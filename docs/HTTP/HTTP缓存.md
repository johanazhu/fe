# HTTP 缓存

![640](https://i.loli.net/2021/06/11/plxXEtBUG7w6Sdj.png)

#### keep-alive

0 为关闭

keepalive_timeout 0;

65s 无连接 关闭

keepalive_timeout 65;

连接数，达到 100 断开

keepalive_requests 100;

#### Cache-Control/Expires/Max-Age

#### Last-Modified/If-Modified-Since

#### Etag/If-None-Match

cache-control 的优先级最高，比如 cache-control：no-cache，就直接进入到协商缓存的步骤，如果 cache-control：max-age=xxx,就会先比较当前时间和上次返回 200 时的时间差，如果没有超过 max-age，命中强缓存，不发请求直接从本地缓存读取该文件（这里需要注意，如果没有 cache-control，会取 expires 的值，来对比是否过期），过期的话会进入下一个阶段——协议缓存

协议缓存阶段，则向服务器发送 header 带有 If-None-Match 和 If-Modified-Since 的请求，服务器会比较 Etag，如果相同，命中协议缓存，返回 304 了如果不一致则有改动，直接返回新的资源文件带上新的 Etag 值并返回 200；

什么是 from disk cache 和 from memory cache，什么时候会触发？

强缓存会触发

1、先查找内存，如果内存中存在，从内存中加载；

2、如果内存中未查找到，现在硬盘获取，如果硬盘中有，从硬盘中加载；

3、如果硬盘中未查找到，就进行网络请求；

4、加载到的资源缓存到硬盘和内存

# 缓存相关

## 参考资料

-   [深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)
-   [「面试三板斧」之缓存 (上)](https://mp.weixin.qq.com/s?__biz=Mzk0OTIwOTc5Ng==&mid=2247486813&idx=1&sn=0ed82e72452ad27494bbcdb90de4ae4b&source=41#wechat_redirect)
-   [彻底理解浏览器的缓存机制](https://www.cnblogs.com/duiniweixiao/p/8884274.html)
-   [前端缓存最佳实践](https://mp.weixin.qq.com/s/03OAnrJ5kM-kdITr00YR4Q)
-   [浏览器缓存的力量](https://mp.weixin.qq.com/s/CsJyKVq3IIjDv32TZ9m7fQ)
-   [node 实践彻底搞懂强缓存和协商缓存](https://juejin.cn/post/6942264171870289956)
-   [浅析 HTTP 缓存](https://juejin.cn/post/6944891188826603528)
