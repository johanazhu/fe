# 工程化、Babel、AST



## 前端工程化的原理

1. 将 JavaScript 代码解析为 AST（抽象语法树）
2. 基于 AST，解释器（interpreter）将 AST 转化为字节码（bytecode），这一步 JS 引擎实际上已经在执行 JS 代码了
3. 为了进一步的优化，优化编译器（optimizing compiler）将热点函数优化编译为机器指令（machine code）执行
4. 如果优化假设失败，优化编辑器会将机器码回退到字节码



基于 AST 的灵活性诞生了很多工具，如 `babel`、`webpack`等等



## Babel

Babel 是一个 JavaScript 编译器，将



### babel 的原理

- parse：把代码 code 变成 AST
- traverse：遍历 AST 进行修改
- generate：把 AST 变成代码 code2

即 code -- (1) --> ast --> (2) --> ast2 --> (3) --> code2



#### 为什么必须要用 AST

因为用变量、正则表达式实现不了，只能通过 AST 这种把代码的每个词转换为树形结构的对象形式能力的工具才能做到。所以才能用到

> 正则会把 let a = 'let' 变成 var a = 'var'





## AST

1.parse: 把代码 code 变成 AST

2.traverse: 遍历 AST 进行修改

3.generate: 把 AST 变成代码 code2

### 工具

babel 可以把高级代码翻译为 ES5

- @babel/parser

- @babel/traverse

- @babel/generator

- @babel/core 包含前三者

- @babel/preset-env 内置很多规则



# babel 相关知识点





## 什么是 babel？

用最新的标准编写的 javascript 代码向下编译成可以砸今天随处可用的版本

babel-core

核心包，把 js 代码分析为 ast

babel-node

### plugins(插件)

babel 插件

### presets(预设)

可以理解为 plugins 的集合，不同的 presets 包含不同的 plugins

比如 @babel-presets-react 包含了写 react 需要用到的 @babel/plugin-syntax-jsx, @babel/plugins-transform-react-jsx, @babel/plugins-transform-react-display-name 等

而最为常用的，也是被官方推荐的，是@babel/presets-env。默认情况下，所有已被纳入规范的语法（ES2015,ES2016,ES2017,ES2018,Modules）所需要使用的 plugins 都包含在 env 这个 presets 中。

### Polyfill(代码填充，兼容性补丁)

babel 插件专注于对语法做转换，而有些浏览器不识别某些 api，最简答的方法就是用浏览器能识别的方法为 Array 写一个静态方法 isArray

ps:某些浏览器没有 isArray api，polyfill 用浏览器能识别的方法为 Array 写一个 isArray 函数

```javascript
Array.isArray = function (arg) {
    var toString = {}.toString;
    return toString.call(arg).slice(8, -1) == 'Array';
};
```

webpack

一个问题

如何使用在 react-route 中使用 require("./app.js")

```
 <Route path="/app" component={require("./app.js")}/>
```

我知道肯定用了 babel 的一个插件

但是试了好多，都不对

# treeShaking

[webpack-merge](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-merge): 用于合并 webpack 的公共配置和环境配置(合并 webpack.config.js 和 webpack.development.js 或者 webpack.production.js)

[yargs-parser](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fyargs-parser): 用于将我们的 npm scripts 中的命令行参数转换成键值对的形式如 --mode development 会被解析成键值对的形式 mode: "development"，便于在配置文件中获取参数

[clean-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fclean-webpack-plugin): 用于清除本地文件，在进行生产环境打包的时候，如果不清除 dist 文件夹，那么每次打包都会生成不同的 js 文件或者 css 文件堆积在文件夹中，因为每次打包都会生成不同的 hash 值导致每次打包生成的文件名与上次打包不一样不会覆盖上次打包留下来的文件

[progress-bar-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fprogress-bar-webpack-plugin): 打包编译的时候以进度条的形式反馈打包进度

[webpack-build-notifier](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-build-notifier): 当你打包之后切换到别的页面的时候，完成时会在本地系统弹出一个提示框告知你打包结果(成功或失败或警告)

[html-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhtml-webpack-plugin): 自动生成 html,并默认将打包生成的 js、css 引入到 html 文件中

[mini-css-extract-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin): webpack 打包样式文件中的默认会把样式文件代码打包到 bundle.js 中，[mini-css-extract-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin)这个插件可以将样式文件从 bundle.js 抽离出来一个文件，并且支持 chunk css

[add-asset-html-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fadd-asset-html-webpack-plugin): 从命名可以看出，它的作用是可以将静态资源 css 或者 js 引入到[html-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhtml-webpack-plugin)生成的 html 文件中

[uglifyjs-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fuglifyjs-webpack-plugin): 代码丑化，用于 js 压缩(可以调用系统的线程进行**多线程压缩**，优化 webpack 的**压缩速度**)

[optimize-css-assets-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Foptimize-css-assets-webpack-plugin): css 压缩，主要使用 [cssnano](https://link.juejin.im?target=https%3A%2F%2Fgithub.com%2Fcssnano%2Fcssnano) 压缩器(webpack4 的执行环境内置了 cssnano，所以不用安装)

[friendly-errors-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffriendly-errors-webpack-plugin): 能够更好在终端看到 webpack 运行的警告和错误

[happypack](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhappypack): 多线程编译，加快编译速度(加快 loader 的编译速度)，注意，thread-loader 不可以和 mini-css-extract-plugin 结合使用

[splitChunks](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsplit-chunks-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx): CommonChunkPlugin 的后世，用于对 bundle.js 进行 chunk 切割(webpack 的内置插件)

[DllPlugin](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx): 将模块预先编译，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存，而不是去编译这些模块(webpack 的内置插件)

[DllReferencePlugin](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23dllreferenceplugin): 将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块(webpack 的内置插件)

[HotModuleReplacementPlugin](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fhot-module-replacement-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx): 实现局部热加载(刷新)，区别与在 webpack-dev-server 的全局刷新(webpack 的内置插件)





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







