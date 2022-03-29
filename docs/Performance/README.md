# 性能优化方方面面

> 这个世界贫富两极分化的根源是制度成本被弱势群体所承担，而制度收益被强势群体所占有
>
> ——温铁军



面试里只要你简历上写了把网站速度提升了XX%，大多面试官会问你具体做了什么，有什么指标？

我想这其中包含了方方面面的知识点

我们做性能优化的原因是希望网站能快速访问，就像日本人通过[阿部宽的网站](http://abehiroshi.la.coocan.jp/)来测试网络是否正常，我想如果前端将一个网站优化到秒进，那对其来说是一个很大的褒奖

现代前端应该做些什么方面的性能优化呢？以前的优化手段有哪些呢

这一章，我们从性能优化的方方面面着手

性能优化就像一根线，将前端工程化（webpack的打包优化，构建优化）、React 的性能优化、网络的优化（HTTP缓存、HTTP2多路复用）、页面构建方面（回流和重绘）、防抖、节流等串起来







| 优化方向 | 优化手段                                             |
| -------- | ---------------------------------------------------- |
| 请求数量 | 合并脚本和样式表，拆分初始化负载                     |
| 请求带宽 | 移除重复脚本                                         |
| 缓存利用 | 添加Expires头，配置ETag，使Ajax可缓存                |
| 页面结构 | 将样式表放在顶部，将脚本放在底部，尽早刷新文档的输出 |









## 参考资料

- [15 条前端必备的性能优化方法，你知道哪些](https://zhuanlan.zhihu.com/p/85310910)

- [从龟速 11s 到闪电 1s，详解前端性能优化之首屏加载](https://mp.weixin.qq.com/s/CE4uUUEufCUvXx5HZJxJBw)

- [Web 性能的方方面面](https://github.com/laoqiren/web-performance)

- [H5 性能监控](https://zhuanlan.zhihu.com/p/400429457?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128)

- [性能优化竟白屏，难道真是我的锅？](https://mp.weixin.qq.com/s/nXFNSi77qtlGbmhiouUvJw)

- [面试官：你知道的前端优化手段](https://mp.weixin.qq.com/s/_PhDlEBUF7YhP0UpXdMX8A)

- [前端性能优化，从入门到进阶（基础篇）](https://zhuanlan.zhihu.com/p/78053275)

- [前端加载优化及实践](https://developers.weixin.qq.com/community/develop/article/doc/00062cad124c8867cf380f64156c13)

- [当聊起前端性能优化我们要聊什么](https://zhuanlan.zhihu.com/p/263467359)

- [使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)

- [深入浅出 Performance 工具 & API](https://mp.weixin.qq.com/s/VZ0evkv-2590-DCuBL-Zlw)

- [聊一聊前端性能与体验的优化](https://mp.weixin.qq.com/s/du8IG-pVo2c_z3P4lyBuWw)

- [Web 性能优化：Preload 与 Prefetch 的使用及在 Chrome 中的优先级](https://blog.fundebug.com/2019/04/11/understand-preload-and-prefetch/)

- [performance-column](https://github.com/barretlee/performance-column)

- [常见的前端性能优化手段都有哪些？都有多大收益？](https://www.zhihu.com/question/40505685)

- [前端工程与性能优化](https://github.com/fouber/blog/issues/3)

- [前端性能优化](https://mp.weixin.qq.com/s/J60NkG8A_E-vI3RpKQSTmw)

- [15 年双 11 手淘前端技术巡演 - H5 性能最佳实践](https://github.com/amfe/article/issues/21#)

  



