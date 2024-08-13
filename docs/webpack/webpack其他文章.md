# webpack其他文章



## Webpack 从零到总结

### 参考资料

-   [Webpack 再深入再总结](https://juejin.cn/post/6844904042066345998)

-   [webpack4：从入门到真实项目配置详解](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484378&idx=1&sn=560a2c50cdd022760972e6e8b6a8e2d8&source=41#wechat_redirect)

-   [Webpack 深入浅出之公司级分享总结](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490264&idx=2&sn=a8ff54faabddf8baf5a16140fb770e64&source=41#wechat_redirect)

-   [即刻起，加速您的前端构建](https://juejin.cn/post/6844903796489863181)

-   [你配置 Webpack 4 的方式可能是错的！](https://www.infoq.cn/article/E-Ltr55vDi2Mg16pHilp)



## webpack 持久化缓存

1. 在多页面应用中，我们需要将公共模块进行拆包，比如 header，footer，以及一些公共区域等等，这样页面在我们的网站中进行跳转的时候由于这些公共模块存在于缓存当中，就可以直接进行加载，而不是再通过网络请求。
2. 分离业务代码和第三方的代码：之所以将业务代码和第三方代码分离出来，是因为业务代码更新频率高，而第三方代码更新迭代速度慢，所以我们将第三方代码(库，框架)进行抽离，这样可以充分利用浏览器的缓存来加载第三方库。
3. 从 js 中抽离 css，使得 css 样式和 js 逻辑相对独立，这样我们在修改样式或者页面的逻辑的时候它们将互不影响到各自的缓存。
4. 抽离异步加载的内容，比如路由切割，与首屏渲染无关的内容等等。
5. 生成稳定的 hash 值，代码修改实现 hash 值变化最小，即代码修改只影响到其对应的文件 hash 值，而不要去影响到其它文件的 hash 值。

### 参考资料

-   [webpack 大型应用优化实践](https://zhuanlan.zhihu.com/p/33377189)
-   [webpack 持久化缓存实践](https://github.com/happylindz/blog/issues/7)
-   [希望做浏览器长缓存？关于 Webpack 生成的 Hash，你应该知道这些](https://segmentfault.com/a/1190000011980729)



## 深入理解 webpack 文件打包机制

### 参考资料

-   [深入理解 webpack 文件打包机制](https://github.com/happylindz/blog/issues/6)
-   [Webpack4 打包机制原理简析](https://juejin.cn/post/6844904007463337997)



## 实战-动手搭一个自己的脚手架

### 参考资料

-   [如何写一个自己的脚手架 - 一键初始化项目](https://segmentfault.com/a/1190000020498166)
-   [🛠 如何快速开发一个自己的项目脚手架？](https://segmentfault.com/a/1190000019219648)
-   [《前端那些事》从 0 到 1 开发简单脚手架](https://juejin.cn/post/6844904137709060104)





## webpack 持久化缓存

1. 在多页面应用中，我们需要将公共模块进行拆包，比如 header，footer，以及一些公共区域等等，这样页面在我们的网站中进行跳转的时候由于这些公共模块存在于缓存当中，就可以直接进行加载，而不是再通过网络请求。
2. 分离业务代码和第三方的代码：之所以将业务代码和第三方代码分离出来，是因为业务代码更新频率高，而第三方代码更新迭代速度慢，所以我们将第三方代码(库，框架)进行抽离，这样可以充分利用浏览器的缓存来加载第三方库。
3. 从 js 中抽离 css，使得 css 样式和 js 逻辑相对独立，这样我们在修改样式或者页面的逻辑的时候它们将互不影响到各自的缓存。
4. 抽离异步加载的内容，比如路由切割，与首屏渲染无关的内容等等。
5. 生成稳定的 hash 值，代码修改实现 hash 值变化最小，即代码修改只影响到其对应的文件 hash 值，而不要去影响到其它文件的 hash 值。

### 参考资料

-   [webpack 大型应用优化实践](https://zhuanlan.zhihu.com/p/33377189)
-   [webpack 持久化缓存实践](https://github.com/happylindz/blog/issues/7)
-   [希望做浏览器长缓存？关于 Webpack 生成的 Hash，你应该知道这些](https://segmentfault.com/a/1190000011980729)



## SourceMap 定位错误

简单来说，Sourcemap 就是一个信息文件，它里面存储着代码转换前后的对应位置信息，也就是转换压缩后的代码所对应的转换前的源代码位置，是源代码和生产代码的映射， Sourcemap 解决了在打包过程中，代码经过压缩，去空格以及 babel 编译转化后，由于代码之间差异性过大，debug 困难的问题

SourceMap 总结

-   映射转换过后的代码和源代码之间的关系
-   代码中引入 // # sourceMappingURL=xxx.js.map 启用
-   sourceMap 解决了源代码和运行代码不一致所产生的问题
-   不只是 js 文件有，css 文件也有
-   核心原理是 base64 vlq 编码

sentry 使用 webpack 上传 sourceMap 源文件定位错误到更详细具体的代码片段



### 参考资料

-   [sourceMap 知多少](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247487962&idx=1&sn=ccaa072d3c6e5bad3689e0edf5590cc1&scene=21#wechat_redirect)
-   [万字长文：关于 sourcemap，这篇文章就够了](https://mp.weixin.qq.com/s/Q8g3ye8owv9HrFFFr7YhsQ)
-   [弄懂 SourceMap，前端开发提效 100%](https://mp.weixin.qq.com/s/kfJ5lqD4M-zT7qSx2sAVUQ)
-   [何为 SourceMap？讲讲 SourceMap 食用姿势](https://juejin.cn/post/7008039749747212319)
-   [如何让调试线上 JS 报错像调试本地源码一样优雅？](https://mp.weixin.qq.com/s/M9TqtDofRzZwR0bb77voEA)
-   [sentry使用webpack上传sourceMap源文件定位错误到更详细具体的代码片段](https://dsx2016.com/?p=1220)



## 参考资料

-   [webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)
-   [看完这篇，面试再也不怕被问 webpack 热更新](https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046496&idx=1&sn=42ee37f7bf887096fce5ca1b2aa67b7c&chksm=87c41970b0b39066c3bdd4ef578777ee62c13eb66efef332bbe0b5c39e41a3c965908298e473&mpshare=1&scene=1&srcid=&sharer_sharetime=1572566106309&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [政采云：看完这篇，面试再也不怕被问 Webpack 热更新](https://mp.weixin.qq.com/s?__biz=Mzg5NDEyMzA2NQ==&mid=2247486131&idx=1&sn=6f27671a12fcbb848b0c86abd424b098&chksm=c02527e5f752aef395007528c4ae327a3a1a72dda02869bd75e900b60af7caf109413097fabd&scene=126&sessionid=1604365577&key=d3c7cb8eeb23bc839793a9f7aa89b848f9d3e9405efedebb00a4938c963531095873c1ca74df0279d5b3bfabd91f63cbf160005be205715629cbd27a083ca3d78302962db086ac544015904cdb3ee77c71a86a212baa2bc79c287fb82446eaeb80f15515a77cb0e38c3e610a8e5f0667dc341637a790e45cd543d90d229fb12b&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=Ad7lpr6bKBokHPdrZJObFSQ%3D&pass_ticket=cPm3DUlXru4ZlQeWfx3ViNDvg6L%2FVMcbbCnRaGkVN728bYwfXpkgSy7d%2F6y0gZdy&wx_header=0)
-   [聊聊 webpack 热更新以及原理](https://mp.weixin.qq.com/s/RS5JOqe4Cuqeg_LjhRBMWg)
-   [120 行代码帮你了解 Webpack 下的 HMR 机制](https://mp.weixin.qq.com/s/FMVjQkWQryqea3X6CWM2cw)
-   [webpack-dev-middleware 源码解读](https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&mid=2247484052&idx=1&sn=93842fa46cfe1b0cc86f554caff06d0b&chksm=e9537cccde24f5da2e3e9e36b3fc0583ff97a54f2e9264cad0d902c559fda6ce5805150e17e3&mpshare=1&scene=1&srcid=&sharer_sharetime=1584923003884&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [Webpack 的异步加载原理及分包策略](https://mp.weixin.qq.com/s/sYppiGPoWaWhRnnCpuPqFw)
-   [一文搞懂 Webpack 多入口配置](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484467&idx=1&sn=c0c41d40f804a6b699aa2c206dac648d&source=41#wechat_redirect)
-   [Webpack 再深入再总结](https://juejin.cn/post/6844904042066345998)
-   [[万字总结] 一文吃透 Webpack 核心原理](https://mp.weixin.qq.com/s/e7oKV7sBqCpZQAj-8fG3Dg)
-   [[源码解读] Webpack 插件架构深度讲解](https://zhuanlan.zhihu.com/p/367931462)
-   [基于 webpack 的持久化缓存方案](https://github.com/soda-x/blog/issues/9)
-   [手摸手 webpack 大型项目实战](https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247484575&idx=1&sn=32124917711e780c18d57b0eb2816daf&chksm=9782ca16a0f54300ecbd61fa08dd11b8f248dbfcbe573e7ab36ce8bf22000f126dff28bfe443&mpshare=1&scene=1&srcid=&sharer_sharetime=1576542483555&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
