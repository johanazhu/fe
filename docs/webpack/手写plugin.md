# 手写 plugin





## 常见的 Plugin

[webpack-merge](https://www.npmjs.com/package/webpack-merge): 用于合并 webpack 的公共配置和环境配置(合并 webpack.config.js 和 webpack.development.js 或者 webpack.production.js)

[yargs-parser](https://www.npmjs.com/package/yargs-parser): 用于将我们的 npm scripts 中的命令行参数转换成键值对的形式如 --mode development 会被解析成键值对的形式 mode: "development"，便于在配置文件中获取参数

[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin): 用于清除本地文件，在进行生产环境打包的时候，如果不清除 dist 文件夹，那么每次打包都会生成不同的 js 文件或者 css 文件堆积在文件夹中，因为每次打包都会生成不同的 hash 值导致每次打包生成的文件名与上次打包不一样不会覆盖上次打包留下来的文件

[progress-bar-webpack-plugin](https://www.npmjs.com/package/progress-bar-webpack-plugin): 打包编译的时候以进度条的形式反馈打包进度

[webpack-build-notifier](https://www.npmjs.com/package/webpack-build-notifier): 当你打包之后切换到别的页面的时候，完成时会在本地系统弹出一个提示框告知你打包结果(成功或失败或警告)

[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin): 自动生成 html,并默认将打包生成的 js、css 引入到 html 文件中

[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin): webpack 打包样式文件中的默认会把样式文件代码打包到 bundle.js 中，mini-css-extract-plugin 这个插件可以将样式文件从 bundle.js 抽离出来一个文件，并且支持 chunk css

[add-asset-html-webpack-plugin](https://www.npmjs.com/package/add-asset-html-webpack-plugin): 从命名可以看出，它的作用是可以将静态资源 css 或者 js 引入到[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)生成的 html 文件中

[optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin): css 压缩，主要使用 [cssnano](https://github.com/cssnano/cssnano) 压缩器(webpack4 的执行环境内置了 cssnano，所以不用安装)

[splitChunks](https://webpack.docschina.org/plugins/split-chunks-plugin/): CommonChunkPlugin 的后世，用于对 bundle.js 进行 chunk 切割(webpack 的内置插件)

[DllPlugin](https://webpack.docschina.org/plugins/dll-plugin/): 将模块预先编译，它会在第一次编译的时候将配置好的需要预先编译的模块编译在缓存中，第二次编译的时候，解析到这些模块就直接使用缓存，而不是去编译这些模块(webpack 的内置插件)

[DllReferencePlugin](https://webpack.docschina.org/plugins/dll-plugin/#dllreferenceplugin): 将预先编译好的模块关联到当前编译中，当 webpack 解析到这些模块时，会直接使用预先编译好的模块(webpack 的内置插件)

[HotModuleReplacementPlugin](https://webpack.docschina.org/plugins/hot-module-replacement-plugin/): 实现局部热加载(刷新)，区别与在 webpack-dev-server 的全局刷新(webpack 的内置插件)









webpack 流程图

init

run

compile 编译开始

compilation 开始编译的过程

make 编译

afterCompilation 编译结束

seal 对代码进行封装，合并，优化

codeGen 生成最终的代码，比如把多个文件合并为一个文件

emit 发射一个文件，把文件写进硬盘里面

done 结束



### imagemin-webpack-plugin

emit

![image-20240811183746700](D:\Documents\PicGo Files\image-20240811183746700.png)









### clean-webpack-plugin



![image-20240811183758201](D:\Documents\PicGo Files\image-20240811183758201.png)









### 自己写 webpack plugin

https://webpack.js.org/contribute/writing-a-plugin/

对 webpack hooks 的了解

对编译原理的了解

对 chunk、hash、module、dep、factory 等概念的理解



```javascript
class MyExampleWebpackPlugin {
  apply(compiler) {
  	// 监听 hooks
  }
}
```











## 参考资料

-   [为什么 webpack4 默认支持 ES6 语法的压缩？](https://juejin.cn/post/6844903935413583880)
-   [手把手带你入门 Webpack Plugin](https://mp.weixin.qq.com/s/8oDENjCOsXxlA2fyuIN4GA)
-   [Webpack - 手把手教你写一个 loader / plugin](https://mp.weixin.qq.com/s/T9H5HYpo-MBgZiSnaHTi0A)
