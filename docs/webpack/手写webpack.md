# 手写 webpack

打包 bundle 原理分析与实现

npx webpack

​ webpack -> config -> 打包入口 输出目录（入口文件在哪） -> 入口文件 -> 分析是否有依赖，以及依赖模块的路径 -> 解析处理内容（es6 转 es5）-> chunk code（缺失函数，require exports）

首先是构建器

演化：

模块化的道路，现时 IIFE，后来 commonJS，AMD 和 CMD 的起来，gulp 和 grund 的兴起，后来是 wbepack 统一配置，rollup 的到来，未来的 vite 和 snowpack

## 参考资料

-   [实现一个简单的 Webpack](https://juejin.cn/post/6844903858179670030)
-   [90 行代码的 webpack，你确定不学吗？](https://mp.weixin.qq.com/s/vpQq3FcJuQkKXvxsq8c9Bw)
-   [微医前端带你从头建立构建体系【开篇】](https://mp.weixin.qq.com/s/-8rsHyu2nys_37nVlWiyCg)
