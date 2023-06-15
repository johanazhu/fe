# Node 基础

## Node 是什么

Node 是 JavaScript 的一种运行环境，是一个基于 Chrome V8 引擎建立的一个平台。由于采用了事件驱动、非阻塞 I/O 的模型和单线程处理请求，这使得它非常适合处理大量并发连接、实时应用和数据密集类型的应用程序

- 后端 Web 服务器开发与网络爬虫开发
- 脚手架命令行工具
- 图形界面应用程序开发

## Node.js 特点

非阻塞 I/O

单线程

事件驱动

npm 包管理

无缓冲

可扩展



## Node.js 发展

- 2008 V8 引擎随 Chrome 浏览器问世
- 2009 年 Ryan Dahl，发布了 Node.js 项目



https://webapplog.com/you-dont-know-node/

https://github.com/Walikrence/-/blob/master/TODO/you-dont-know-node.md

（13个基础核心模块）

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





## Node 中的模块机制

之前没有模块化

模块化的历程

简单来说：

IIFE——CommonJS——AMD/CMD——ES6 模块（mjs）

### 什么是 Node 模块

在正是分析 Node 模块机制之前，我们需要明确定义什么是 Node 模块。通常来说，Node 模块可分为两大类：

-   核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成二进制可执行文件
-   文件模块：用户编写的模块，可以是自己写的，也可以使通过 npm 安全的

exports 对象本质上是 module.exports 的引用。也就是说，下面两行代码是等价的

```javascript
// 导出 add 函数
exports.add = add;

// 和上面一行代码是一样的
module.exports.add = add;
```

module 对象

module 在每个模块中表示对当前模块的引用。而 module.exports 又可以通过全局对象 exports 来引用。module 并不是一个全局对象，而更像一个模块内部对象

##### module.children

这个模块引入的所有模块对象

##### module.exports

module.exports 通过模块系统创建。

### export 与 module.export 的区别

导出多个成员（必须在对象中）

```javascript
exports.a = 123;
exports.b = 'hello';
exports.c = function () {
    console.log('ccc');
};
exports.d = {
    foo: 'bar',
};
```

导出多个成员也可以这样写

```javascript
module.exports = {
    foo: 'bar',
    add: function () {
        console.log('aa');
    },
};
```

导出单个成员（拿到的就是：函数，字符串）

```javascript
module.exports = 'hello';
```

以下情况会覆盖：

```javascript
module.exports = 'hello'

// 以这个为准，后者会覆盖前者
module.exports = function(x, y) {
return x + y
}
exports 是 module.exports 的一个引用

console.log(exports === module.exports) // => true

exports.foo = 'bar'

// 等价于
module.exports.foo = 'bar'
```

-   





## 事件触发器 Events 模块

> Node.js 使用了一个**事件驱动**、非阻塞式 I/O 的模型，使其轻量又高效

大多数 Node.js 核心 API 都采用惯用的事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器），那么 Node.js 是如何实现事件驱动的







### 参考资料

- [一杯茶的时间，上手 Node.js](https://segmentfault.com/a/1190000021987355)
- [Node.js 后端工程师学习路径](https://github.com/tuture-dev/nodejs-roadmap)
- [「万字整理 」这里有一份 Node.js 入门指南和实践,请注意查收](https://juejin.cn/post/6844904029219192839)
- [一篇文章构建你的 NodeJS 知识体系](https://mp.weixin.qq.com/s/wezc-VpKOXilEnsHvSuU9g)
- [源码解读：一文彻底搞懂 Events 模块](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247484226&idx=1&sn=19ff9dc40a79d5f6afebc2ba20c1d4f3&chksm=f9910593cee68c850419abfb95f7cc74a00986200fd35345115ee7edd2f203a408d845fe2701&scene=21#wechat_redirect)
- [Node.js 模块系统源码探微](https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&mid=2247483885&idx=1&sn=eb4dd408d58774dc1587f0d6705eb8a2&chksm=e9537fb5de24f6a310a36b8d46623ec534a94a5ff09d7deb6191124e14c39b0667ef465059e4&mpshare=1&scene=1&srcid=&sharer_sharetime=1575817441587&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [require 和 import 的区别是什么？看这个你就懂了](https://segmentfault.com/a/1190000014434944)
- [you-dont-know-node](https://github.com/azat-co/you-dont-know-node)

