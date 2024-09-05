# 常见面试题

## Q：webpack 的 Loader 是什么？

A：webpack 自带的打包器只支持 JS 文件，当我们想加载 css/less/scss/ts/md 文件时，就需要用 loader

loader 的原理就是把 文件内容包装成能运行的 JS 

比如加载 css 需要用到 style-loader 和 css-loader 

css-loader 把代码从 CSS 代码变成 export default str 形式的 JS 代码

style-loader 把代码挂载到 head 里 的 style 标签里







## Q：有哪些常见的 loader？

A：

- `raw-loader`: 加载文件原始内容

- `file-loader`: 把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件（处理图片和字体）

- `url-loader`: 与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值时返回其 publicPath，小于阈值时返回文件 base64 形式编码（处理图片和字体）

- `source-map-loader`：加载额外的 source map 文件，以方便断点调试

- `svg-inline-loader`：将压缩后的 svg 内容注入代码中

- `image-loader`：加载并且压缩图片文件

- `json-loader`：加载 json 文件

- `babel-loader`：将 es6 转换成 es5

- `markdown-loader`：把 markdown 变成 html

- `ts-loader`：将 typescript 转换成 javascript，并提示类型错误

- `sass-loader`：将 sass 代码转换为 css 代码

- `css-loader`：把 CSS 变成 JS 字符串

- `style-loader`： 把 JS 字符串变成 style 标签

- `postcss-loader`：扩展 css 语法，使用下一代 css，可以配合 autoprefixer 插件自动补齐 css3 前缀

- `eslint-loader`：通过 eslint 检查 javascript 代码

- `tslint-loader`：通过 tslint 检查 typescript 代码

- `thread-loader`：用于多进程打包



## Q：有哪些常见的 plugin？

A：

- `html-webpack-plugin`：用于创建 HTML 页面并自动引入JS 和 CSS
- `clean-webpack-plugin`：用于清理之前打包的残余文件
- `mini-css-extract-plugin`：用于将 JS 中的 CSS 抽离成单独的 CSS 文件
- `SplitChunksPlugin`：用于代码分包(Code Split)
- `DllPlugin` + `DllReferencePlugin`：用于避免大依赖被频繁重新打包，大幅降低打包时间
- `eslint-webpack-plugin` ：用于检查代码中的错误
- `DefinePlugin`：用于在 webpack config 里添加全局变量
- `copy-webpack-plugin`：用于拷贝静态文件到 dist

## Q: loader 和 plugin 的区别是什么

Q：

- loader是文件加载器，它能对文件进行编译、优化、混淆等，比如 babel-loader / css-loader
- plugin是webpack 插件，它是对 webpack 功能的扩展，能实现更多功能，比如定义全局变量、Code Split、加快编译等。它能在 webpack 的每个阶段介入，因为它是基于事件机制，会监听 webpack 所有打包节点，并于节点出执行任务

loader是一个文件转换器，它是对文件的转换，比如把less转换为 css，单纯的文件转换过程

plugin 是对 webpack 功能的扩展，对 webpack 的每个阶段它都可以介入，他是基于事件机制，会监听 webpack 所有打包节点，执行广泛的任务

## Q：webpack 构建流程简单说一下

A: webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数

 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译

 确定入口：根据配置中的 entry 找出所有的入口文件

 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖文件都经过了本步骤的处理

 完成模块编译：在经过第 4 步使用的 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及他们之间的依赖关系

 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这部是可以修改输出内容的最后机会

 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上的过程中， webpack 会在特定的时间点广告处特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 webpack 提供的 API 改变 Webpack 的运行结果

简单的说：

 初始化：启动构建，读取与合并配置参数，加载 plugin，实例化 Compiler

 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行便已处理

 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换为文件，输出到文件系统中

## Q：source map 是什么？生产环境怎么用？

 A：source map 是讲编译、打包、压缩后的 diamante 映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要吊事源码就需要 source map

 map 文件只要不打开开发者工具，浏览器是不会加载的

 线上环境一般有三种处理方案：

 hidden-source-map：借助第三方错误监控平台 Sentry 使用

 nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高

 sourcemap：通过 nginx 设置将 .map 文件只对白名单开发（公司内网）

 注意：避免在生产中使用 inline- 和 eval- ，因为它们会增加 bundle 体积大小，并降低整体性能

## Q：模块打包原理知道吗？

 webpack 实际上尉每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。

## Q：文件监听原理呢？

在发现源码发生变化时，自动重新构建出新的输出文件。

webpack 开启监听模式，有两种方式：

 启动 webpack 命令时，带上 --watch 参数

 在配置 webpack.config.js 中设置 watch：true

## Q：说一下 webpack 的热更新原理吧（必考）

 webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

 HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff（chunk 需要更新的部分），实际上 WDS 与浏览器之间维护了一个 `Websocket` ，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 `Ajax` 请求来获取更新内容（文件列表、hash），这样客户端就可以再借助这些信息继续向 WDS 发起 `jsonp` 请求获取该 chunk 的增量更新

后续的部分（拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？）由 `HocModulePlugin` 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像 `react-hot-loader` 和 `vue-loader` 都是借助这些 API 实现 HMR。

原理请参考 webpack HMR 原理解析

## Q：如何对 bundle 体积进行监控和和分析？

`VSCode` 中有个插件 `Import Cost` 可以帮组我们对引入的模块的大小进行实时监测，还可以和使用 `webpack-bundle-analyzer` 生成 `bundle` 的模块组成图，显示所占体积

`bundlesize` 工具包可以进行自动化资源体积监控

## Q：文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀

-   `Hash` ：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
-   `Chunkhash`：和 webpack 打包的 chunk 有关，不同的 entry 会发出不同的 chunkhas
-   `Contenthash`：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

## Q：如何优化 webpack 的构建速度？

可以讲很多，我觉得按重要性来说

-   使用 `高版本`的 webpack 和 Node.js
-   `多进程/多实例构建`: HappyPack（不维护了）、thread-loader
-   压缩代码
    -   webpack-paralle-uglify-plugin
    -   uglifyjs-webpack-plugin 开启 parallel 参数（不支持 ES6）
    -   terser-webpack-plugin 开启 parallel 参数
    -   多进程并行压缩
    -   通过 mini-css-extract-plugin 提取 chunk 中的 css 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 css
-   图片压缩
    -   使用基于 Node 库的 imagemin（很多定制选项、可以处理多种图片格式）
    -   配置 image-webpack-loader
-   缩小打包作用于
    -   exclude/include（确定 loader 规则范围）
    -   resolve.modules 指明第三方模块的绝对路径（减少不必要的查找）
    -   resolve.mainFields 只采用 main 字段作为入口文件描述字段（减少搜索不走，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段）
    -   resolve.extensions 尽可能减少后缀尝试的可能性
    -   noParse 对完全不需要解析的库进行忽略（不去解析但仍会打包到 bundle 中，被忽略掉的文件里不应该包含 import、require、define 等模块化语句）
    -   IgnorePlugin（完全排除模块）
    -   合理使用 alias
-   提取页面公共资源
    -   使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
    -   使用 splitchunksplugin 进行（公共脚本、基础包、页面公共文件）分离（webpack4 内置），替代了 commonschunkplugin 插件
    -   基础包分离
-   DLL：
    -   使用 DllPlugin 将不常变化的代码提前打包，并复用，如 vue、react
    -   使用 DllPlugin 进行分包，使用 DllReferencePlugin（索引链接）对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
    -   HashedModuleIdsPlugin 可以解决模块数字 id 问题
-   充分利用缓存提升二次构建速度
    -   babel-loader 开启缓存
    -   terser-webpack-plugin 开启缓存
    -   使用 cache-loader 或者 hard-source-webpack-plugin
-   Tree shaking
    -   purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用（建议）
    -   打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉（只能对 ES6 Modlue 生效）开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
    -   禁用 babel-loader 的模块依赖解析，否则 webpack 接受到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
-   动态 polyfill
    -   建议采用 polyfill-service 只给用户返回需要的 polyfill，社区维护
-   处于生产环境时，关闭不必要的环节，比如可以关闭 source map

## Q：你刚才提到了代码分割，那代码分割的本质是什么？有什么意义呢？

代码分割的本质其实是在`源代码直接上线` 和 `打包成唯一脚本main.bundle.js` 这两种极端方案之间的一种更适合实际场景的中间状态。

**用可接受的服务器性能压力增加来换取更好的用户体验**

源代码直接上线：虽然过程可控，但是 http 请求多，性能开销大

打包成唯一脚本：一把搜哈自己爽，服务器压力下，但是页面空白期长，用户体验差

## Q：是否写过 Loader？简单描述一下编写 loader 的思路？

Loader 支持链式调用，所以开发商需要严格遵循“单一职责”，每个 Loader 只负责自己需要负责的事件。

过程：

-   Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用
-   Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 webpack 该 loader 是否需要二进制数据
-   尽可能的异步 Loader，如果计算量很小，同步也可以
-   Loader 是无状态的，我们不应该在 Loader 中保留状态
-   使用 loader-utils 和 schema-utils 为我们提供的使用工具
-   加载本地 loader 方法
    -   npm link
    -   resolveloader

## Q：是否写过 Plugin？简单描述一下编写 plugin 的思路

webpack 在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在特定的阶段钩入想要添加的自定义功能。 webpack 的 tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。

过程：

-   compiler 暴露了和 webpack 整个生命周期相关的钩子
-   compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
-   插件需要在其原型上绑定 apply 方法，才能访问 compiler 实例
-   传给每个插件的 compilter 和 compilation 对象都是同一个引用，若在一个插件中修改了他们身上的属性，会影响后面的插件
-   找出合适的事件点去完成想要的功能
    -   emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改（emit 事件是修改 webpack 输出资源的最后时机）
    -   watch-run 当依赖的文件发生变化时会出发
-   异步的事件需要在插件处理完任务时调用回调函数通知 webpack 进入下一个流程，不然会卡主

## Q：聊一聊 Babel 原理吧

大多数 JavaScript Parser 遵循 `estree` 规范，Babel 最初基于 `acorn` 项目（轻量级现代 JavaScript 解析器） Babel 大概分为三大部分：

-   解析：将代码转换成 AST
    -   词法分析：将代码（字符串）分割为 token 流，即语法单元成的数组
    -   语法分析：分析 token 流（上面生成的数组）并生成 AST
-   转换：访问 AST 的节点进行变换操作生产新的 AST
    -   [Taro 就是利用 babel 完成的小程序语法装换](https://github.com/NervJS/taro/blob/master/packages/taro-transformer-wx/src/index.ts)
-   生成：以新的 AST 为基础生成代码

想了解如何一步一步实现一个编译器的同学可以移步 Babel 官网曾经推荐的开源项目 [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler) 



## Q：webpack和vite的区别

A：

1.开发环境区别

- vite 自己实现 server，不对代码打包，充分利用浏览器的`<script type="module">` 的支持
  - 假设 main.js 引入了 vue
  - 该 server 会把 `import { useEffect } from 'react'` 改成 `import {useEffect } from "/node_modules/.vite/react.js"` 这样浏览器就知道去哪里做到 vue.js
- webpack-dev-server 常使用 babel-loader 基于内存打包，比 vite 慢很多很多
  - 该 server 会把 react.js 的代码（递归地）打包进 main.js

2.生产环境区别

- vite 使用 rollup + esbuild 来打包 JS 代码
- webpack 使用 babel 来打包 JS 代码，比 esbuild 慢很多很多
  - webpack 能使用 esbuild 吗？可以，你需要配置（很麻烦）
  - esbuild 为什么快
    - babel 用 js 写，esbuild 用 go 写的
    - webpack 和 rollup 一个层级
    - babel 和 esbuild 一个层级的
    - vite 相当于比 webpack 再封装了一层

3.文件处理时机

- vite 只会在你请求某个文件的时候处理该文件
- webpack 会提前打包好 main.js，等你请求的时候直接输出打包好的 JS 给你

目前已知 vite 的缺点有

1. 热更新常常失败，原因不清楚
2. 有些功能 rollup 不支持，需要自己写 rollup 插件
3. 不支持非现代浏览器





## Q：如何实现 tree-shaking？

A：tree-shaking 就是让没有用到的 JS 代码不打包，以减小包的体积

怎么删？

- 使用 ES Modules 语法（即 ES6 的 import 和 export 关键字）
- CommonJS 语法无法 tree-shaking（即 require 和 exports 语法）
- 引入的时候只引用需要的模块
  - 要写 `import { cloneDeep } from 'lodash-es'` 引入的库也需要用 ES Modules
  - 不要写 `import _ from 'lodash'` 因为会导致无法 tree-shaking 

怎么不删？

在 package.json 中配置 sideEffects，防止某些文件被删掉

- 比如我 import 了 x.js，而 x.js 只是添加了 window.x 属性，那么 x.js 就要放到 sideEffects 里
- 比如所有被 import 的 CSS 都要放在 sideEffects 里

怎么开启？

在 webpack config 中将 mode 设置为 production（开发环境没必要 tree-shaking）

> 在 Webpack5 中，Tree Shaking 在生产环境下默认启动
>



## 参考资料

-   [「吐血整理」再来一打 Webpack 面试题](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490341&idx=1&sn=2020de4976722d426c7ac3cebedf9d90&source=41#wechat_redirect)
