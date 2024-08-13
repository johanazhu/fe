# loader以及原理解析









## Load原理

一个 loader 可以是一个普通函数

一个 loader 也可以是一个异步函数





#### 单一职责原则

webpack 里每个 loader 只做一件事

目前我们的 css-loader 做了两件事

一是把 CSS 变为 JS 字符串

二是把 JS 字符串放到 style 标签里



#### raw-loader 源码

https://github.com/webpack-contrib/raw-loader/

20行

#### css-loader 源码

https://github.com/webpack-contrib/css-loader









## 参考资料

-   [为什么 webpack4 默认支持 ES6 语法的压缩？](https://juejin.cn/post/6844903935413583880)
-   [手把手带你入门 Webpack Plugin](https://mp.weixin.qq.com/s/8oDENjCOsXxlA2fyuIN4GA)
-   [Webpack - 手把手教你写一个 loader / plugin](https://mp.weixin.qq.com/s/T9H5HYpo-MBgZiSnaHTi0A)
