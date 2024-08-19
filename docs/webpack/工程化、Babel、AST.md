# 工程化、Babel、AST

模块化一直在发展，然后 Node 兴起，导致前端工程化的出现

## 模块化的发展

在[模块化的历程](../ES6/模块化历程)中我们详细分析过这个发展过程，主要分为三块

- IIFE
- CommonJS、AMD
- ESM 模块化

因为前端复杂度变高，工程化是必然阶段，既然有了工程化，打包工具就孕育而生，其中以 webpack 最为著名，其实这些打包器的就是做了以下几点

- 你可以写最新的ES6、7、8、9、10、11代码，用最新的语法，到时候帮你转成浏览器能识别的 ES5 语法
- 你可以按照写很多很多js、css文件，到时候打包时把它打包成几个文件

这其中就用到了 babel



## Babel

Babel 是一个 JavaScript 编译器，将  JavaScript 代码解析为 AST（抽象语法树），再遍历 AST 进行修改，把 AST 变成 ES5 语法

### babel 的原理

- parse：把代码 code 变成 AST
- traverse：遍历 AST 进行修改
- generate：把 AST 变成代码 code2

即 code -- (1) --> ast --> (2) --> ast2 --> (3) --> code2



#### 为什么必须要用 AST

因为用变量、正则表达式实现不了，只能通过 AST 这种把代码的每个词转换为树形结构的对象形式能力的工具才能做到。所以才能用到

> 正则会把 let a = 'let' 变成 var a = 'var'

### babel 的作用

babel 可以把高级代码翻译为 ES5

- @babel/parser

- @babel/traverse

- @babel/generator

- @babel/core 包含前三者

- @babel/preset-env 内置很多规则

babel 能让开发者愉快的使用 ES6 语法，这解决了 webpack 等打包器的第一个问题，第二个问题就是如何将多个文件打包成一个文件，这点就是 webpack 做的事情了



## 参考资料

-   [保姆级教学！这次一定学会 babel 插件开发！](https://mp.weixin.qq.com/s/ZVWffh-MWcRNl2rDp0cKiQ)
-   [babel-从入门到上手](https://mp.weixin.qq.com/s/LlQRx5SPmFgnTDO8VunGnw)
-   [Babel 原理](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496615&idx=1&sn=d2db051d9565145eeb018dd29b615b7f&source=41#wechat_redirect)
-   [关于 Babel 你必须知道的基础知识](https://mp.weixin.qq.com/s?__biz=Mzg5NDEyMzA2NQ==&mid=2247484890&idx=1&sn=95b86941c0fa210476e6e7ef0326a025&chksm=c025288cf752a19a6b46fbbe13dc49c2ca319aa65fa48cfc359b4a76cffdd0abe66c0bec4c83&mpshare=1&scene=1&srcid=&sharer_sharetime=1584105668190&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [前端工程师的自我修养-关于 Babel 那些事儿](https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&mid=2247484012&idx=1&sn=a94d753e0af22a1ae26f5f9f04cfc4e6&chksm=e9537c34de24f5229d5781d4e22d59f467fdd0291aab0f4b3b6012bcefdd77dbdc61e047101f&mpshare=1&scene=1&srcid=&sharer_sharetime=1583070249517&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [不容错过的 Babel7 知识](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496263&idx=1&sn=e89481086041aa74ebb1ec912fe04b1b&source=41#wechat_redirect)
-   [一口（很长的）气了解 babel](https://zhuanlan.zhihu.com/p/43249121)
-   [再看 Babel](https://mp.weixin.qq.com/s/KhjCPvwfMrinxvLcy-e23w)
-   [深入理解 babel 生态](https://github.com/willson-wang/Blog/issues/67)
-   [深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.cn/post/6844903956905197576)
-   [99% 的前端开发者没弄明白的 babel 知识](https://mp.weixin.qq.com/s/hfztxp26YyMOSxiKF2i4eg)
-   [吃一堑长一智系列: 99% 开发者没弄明白的 babel 知识](https://github.com/pigcan/blog/issues/26)
-   [AST 详解与运用](https://zhuanlan.zhihu.com/p/266697614?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128)







