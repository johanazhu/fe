# HTTP 面试题

## GET 和 POST 的区别在哪里？

-   从缓存角度看，GET 会被缓存，POST 不会被缓存
-   从参数角度看，GET 通过在 url 的"?"后以 key=value 方式传参，数据之间以“&”相连接；POST 则要将数据封装到请求体中发送，这个过程不可见
-   从安全角度看，GET 不安全，因为 URL 可见；POST 较 GET 安全度高
-   从编码角度看，GET 只接受 ASCII 字符，向服务器发送中文字符可能会出现乱码；POST 支持标准字符集，可以正确传递中文
-   从数据长度的限制看，GET 一般受 URL 长度限制（URL 的最大长度是 2048 个字符），POST 无限制

## 参考资料

-   [GET 和 POST 请求的本质区别是什么？](https://segmentfault.com/a/1190000038556123)
-   [点亮前端必会网络知识点](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247484152&idx=1&sn=ba6fc3a8c71c69a2290f2284aad74fcb&scene=19#wechat_redirect)
