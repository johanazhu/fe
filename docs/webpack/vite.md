# Vite



为什么会有 vite？

如果应用比较复杂， webpack 的开发和打包速度就会很慢

- webpack dev server 冷启动时间比较长
- webpack  HMR 热更新的反应速度比较慢





### 回顾 webpack 初衷

之所以使用 webpack 打包，生成 bundle.js ，主要有两个原因

- 浏览器环境并不很好
- 零散的模块会产生大量的 HTTP 请求



### webpack 的解决方案

bundle 太大，就采用 Code Split 代码分割

- runtime
- node modules -> verdors 
- common
- self

加上 压缩代码，去除无用代码等手段



## 新的解决思路

### ES Module

随着浏览器对 ES 标准支持的逐渐完善，第一个问题就不存在了。现阶段绝大多数浏览器都是支持 ES Modules 的

其最大的特点是在浏览器端使用 export import 的方式导入和导出模块，在 script 标签里写 `type="module"` ，然后使用 ES Module。





**Vite 的一个实现核心 - 拦截浏览器对模块的请求并返回处理后的结果**我们来看下 Vite 是怎么处理的？

### 大量请求的由HTTP2解决

HTTP 1.x 中，如果想并发多个请求，必须使用多个 TCP 链接，且浏览器为了控制资源，还会对单个域名有 6-8 个的 TCP 链接请求限制；HTTP 2 则可以使用**多路复用**，代替原来的序列和阻塞机制。所有请求都是通过一个 TCP 连接并发完成。





## Vite 三大作用

即 Vite 的 3 大核心功能：Static Server  + HMR + Compile

**3.1 快速的冷启动**

**因为 Webpack Dev Server 在启动时，需要先 build—遍，而 build 的过程是需要耗费很多时间的。**

**而 Vite 则完全不同，当我们执行 Vite serve 时（\**npm run dev\**），内部直接启动了 Web Server，并不会先编译所有的代码文件。**

关于支持 JSX， TSX，Typescript 编译到原生 JS —— Vite 引入了**EsBuild**，是使用 Go 写的，直接编译为 Native 代码，性能要比 TSC 好二三十倍

**3.3 真正的按需编译**

像 Webpack 这类工具的做法是将所有模块提前编译、打包进 bundle 里，换句话说，不管模块是否会被执行，都要被编译和打包到 bundle 里。随着项目越来越大打包后的 bundle 也越来越大，打包的速度自然也就越来越慢。

Vite 利用现代浏览器原生支持 ESM 特性，省略了对模块的打包。

对于需要编译的文件，Vite 采用的是另外一种模式：即时编译。也就是说，只有具体去请求某个文件时才会编译这个文件。所以，这种「即时编译」的好处主要体现在：按需编译。



## 核心思路

**初始启动静态服务**

初始执行命令  npm run dev --> 实际就是启动了 /src/node/server/index.ts 如上文提到启动了一个 koa server, 该文件还使用了 chokidar 库创建一个 watcher，来监听文件变动：

**4.2 监听消息，拦截部分请求**

### 4.4 逻辑小结

- 将当前项目目录作为静态文件服务器的根目录
- 拦截部分文件请求
- 处理代码中 import node_modules 中的模块 b
- 处理 Vue 单文件组件（SFC)的编译
- 通过 WebSocket 实现 HMR





生产打包：Vite 用 rollup，打包体积更小（**rollupInputOptions：定义 rollup 的插件功能**）



## 参考资料

-   [速度与激情之 Vite 初体验](https://mp.weixin.qq.com/s/1LFnTt5Mbj3v_AU_DNMgtA)
