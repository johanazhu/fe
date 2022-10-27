# SourceMap 定位错误

简单来说，Sourcemap 就是一个信息文件，它里面存储着代码转换前后的对应位置信息，也就是转换压缩后的代码所对应的转换前的源代码位置，是源代码和生产代码的映射， Sourcemap 解决了在打包过程中，代码经过压缩，去空格以及 babel 编译转化后，由于代码之间差异性过大，debug 困难的问题

SourceMap 总结

-   映射转换过后的代码和源代码之间的关系
-   代码中引入 // # sourceMappingURL=xxx.js.map 启用
-   sourceMap 解决了源代码和运行代码不一致所产生的问题
-   不只是 js 文件有，css 文件也有
-   核心原理是 base64 vlq 编码

sentry 使用 webpack 上传 sourceMap 源文件定位错误到更详细具体的代码片段







## 参考资料

-   [sourceMap 知多少](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247487962&idx=1&sn=ccaa072d3c6e5bad3689e0edf5590cc1&scene=21#wechat_redirect)
-   [万字长文：关于 sourcemap，这篇文章就够了](https://mp.weixin.qq.com/s/Q8g3ye8owv9HrFFFr7YhsQ)
-   [弄懂 SourceMap，前端开发提效 100%](https://mp.weixin.qq.com/s/kfJ5lqD4M-zT7qSx2sAVUQ)
-   [何为 SourceMap？讲讲 SourceMap 食用姿势](https://juejin.cn/post/7008039749747212319)
-   [如何让调试线上 JS 报错像调试本地源码一样优雅？](https://mp.weixin.qq.com/s/M9TqtDofRzZwR0bb77voEA)
-   [sentry使用webpack上传sourceMap源文件定位错误到更详细具体的代码片段](https://dsx2016.com/?p=1220)
