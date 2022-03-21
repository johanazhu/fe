# babel 的使用

什么是 babel？

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

[friendly-errors-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffriendly-errors-webpack-plugin): 能够更好在终端看到 webapck 运行的警告和错误

[happypack](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fhappypack): 多线程编译，加快编译速度(加快 loader 的编译速度)，注意，thread-loader 不可以和 mini-css-extract-plugin 结合使用

[splitChunks](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fsplit-chunks-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx): CommonChunkPlugin 的后世，用于对 bundle.js 进行 chunk 切割(webpack 的内置插件)

[DllPlugin](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx): 将模块预先编译，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存，而不是去编译这些模块(webpack 的内置插件)

[DllReferencePlugin](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%2F%23dllreferenceplugin): 将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块(webpack 的内置插件)

[HotModuleReplacementPlugin](https://link.juejin.im?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fhot-module-replacement-plugin%2F%23src%2Fcomponents%2FSidebar%2FSidebar.jsx): 实现局部热加载(刷新)，区别与在 webpack-dev-server 的全局刷新(webpack 的内置插件)
