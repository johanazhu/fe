# Node 基础

## Node 是什么

Node 是 JavaScript 的一种运行环境，是一个基于 Chrome V8 引擎建立的一个平台。由于采用了事件驱动、非阻塞 I/O 的模型，Node 能够成为了构建轻量且高效的 Web 应用的理想选择

## Node.js 特点

非阻塞 I/O

单线程

事件驱动

npm 包管理

无缓冲

可扩展

## Node 全局对象

在浏览器中，我们有 `document` 和 `window` 等全局对象；而 Node 只包含 ECMAScript 和 V8，不包含 BOM 和 DOM，因此 Node 中不存在 `document` 和 `window`；取而代之，Node 专属的全局对象是 `process`

### JavaScript 全局对象的分类

在此之前，我们先看一下 JavaScript 各个运行环境的全局对象的比较，如下图所示：

![各个运行环境的全局对象](https://i.loli.net/2021/08/22/HfksCreUZlO37Kx.png)

可以看到 JavaScript 全局对象可以分为四类：

1. 浏览器专属，例如 `window`、`alert` 等等；
2. Node 专属，例如 `process`、`__dirname` 、`__filename` 等等
3. 浏览器和 Node 共有，但是实现方式不同，例如 `console` 、`setTimeout` 、`setInterval`
4. 浏览器和 Node 共有，并且属于 ECMAScript 语言定义的一部分，例如 `Date`、`String`、`promise` 等

### Node 专属全局对象解析

#### process 进程

process 全局对象可以说是 Node.js 的灵魂，它是管理当前 Node.js 进程状态的对象，提供了与操作系统的简单接口。

##### 有哪些属性

-   `pid`：进程编号
-   `env`：系统环境变量
-   `argv`：命令行执行此脚本时的输入参数
-   `platform`：当前操作系统的平台

> 提示
>
> 可以在 Node REPL 中尝试一下这些对象。像上面说的那样进入 REPL（你的输出很有可能跟我的不一样）：
>
> ```bash
> $ node
> Welcome to Node.js v12.10.0.
> Type ".help" for more information.
> > process.pid
> 3
> > process.platform
> 'darwin'
> ```

#### Buffer

`Buffer` 全局对象让 JavaScript 也能够轻松地处理二进数据流，结合 Node 的流接口（Stream），能够实现高效的二进制文件处理

#### `__filename` 和 `__dirname`

分别代表当前所运行 Node 脚本的文件路径和所在目录路径

#### module 模块

Node 实现了一个简单模块记在系统。在 Node 中，文件和模块是一一对应的关系，可以理解为一个文件就是一个模块。其模块系统的实现主要依赖于全局对象 module，其中实现了 exports（导出）、require（加载）机制

简单来说，commonJS 导出的是值的拷贝，而非值的引用，这与 [ES6 中的模块化](../ES6/模块化历程.md)是不一样的

### 参考资料

- [一杯茶的时间，上手 Node.js](https://tuture.co/2019/12/03/892fa12/)

- [Node.js 后端工程师学习路径](https://github.com/tuture-dev/nodejs-roadmap)

- [「万字整理 」这里有一份 Node.js 入门指南和实践,请注意查收](https://juejin.cn/post/6844904029219192839)

- [一篇文章构建你的 NodeJS 知识体系](https://mp.weixin.qq.com/s/wezc-VpKOXilEnsHvSuU9g)
