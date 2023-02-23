# HTTP 面试题

## Q：HTTP 1、2、3 的区别

A:

## Q：HTTP 与 HTTPS 有什么区别

-   http 是明文传输协议，https 是 ssl +http 协议构建的可进行加密传输、身份认真的网络协议，比 http 协议安全
-   https 比 http 更加安全，搜索引擎对其更友好，利于 SEO
-   https 需要 ssl 证书，http 不用
-   https 端口是 443，http 端口是 80
-   https 是基于传输层，http 是基于应用层
-   https 在浏览器上会显示安全锁，http 没有，且部分网站浏览器会提示不安全

## Q: HTTP 2.0 做了哪些改进

A:

## Q：HTTP 缓存机制

A：强缓存和协商缓存，在 http1.0 中强缓存 cache-control，http1.1 是 expires。协商缓存时 http1.0 的 last-modified 和 http1.1 的 etag

## Q：HTTP 状态码有哪些

A：

## Q：GET 和 POST 的区别在哪里？

A:

-   从缓存角度看，GET 会被缓存，POST 不会被缓存
-   从参数角度看，GET 通过在 url 的"?"后以 key=value 方式传参，数据之间以“&”相连接；POST 则要将数据封装到请求体中发送，这个过程不可见
-   从安全角度看，GET 不安全，因为 URL 可见；POST 较 GET 安全度高
-   从编码角度看，GET 只接受 ASCII 字符，向服务器发送中文字符可能会出现乱码；POST 支持标准字符集，可以正确传递中文
-   从数据长度的限制看，GET 一般受 URL 长度限制（URL 的最大长度是 2048 个字符），POST 无限制

## Q、HTTP 是什么，HTTP 又不是什么？

A：

## Q：你是怎么理解 HTTP 字面上的“超文本”和“传输协议”的？

## Q：能否谈一下你对 HTTP 的认识？越多越好。

## Q：HTTP 有什么特点？有什么优点和缺点？

## Q：HTTP 下层都有哪些协议？是如何工作的？

## Q：聊聊 HTTP2，会导致前端产生什么变化

## 参考资料

-   [GET 和 POST 请求的本质区别是什么？](https://segmentfault.com/a/1190000038556123)
-   [点亮前端必会网络知识点](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247484152&idx=1&sn=ba6fc3a8c71c69a2290f2284aad74fcb&scene=19#wechat_redirect)
