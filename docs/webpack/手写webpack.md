# 手写webpack



打包 bundle 原理分析与实现

npx webpack

​	webpack -> config -> 打包入口 输出目录（入口文件在哪） -> 入口文件 -> 分析是否有依赖，以及依赖模块的路径 -> 解析处理内容（es6转es5）-> chunk code（缺失函数，require exports）











微医前端带你从头建立构建体系【开篇】

https://mp.weixin.qq.com/s/-8rsHyu2nys_37nVlWiyCg



90行代码的webpack，你确定不学吗？

https://mp.weixin.qq.com/s/vpQq3FcJuQkKXvxsq8c9Bw



首先是构建器

演化：

模块化的道路，现时IIFE，后来commonJS，AMD和CMD的起来，gulp和grund的兴起，后来是wbepack统一配置，rollup的到来，未来的vite和snowpack

