# Node中的模块机制 



之前没有模块化

模块化的历程

简单来说：

IIFE——CommonJS——AMD/CMD——ES6模块...





https://tuture.co/2019/12/03/892fa12/

### 什么是 Node 模块

在正是分析 Node 模块机制之前，我们需要明确定义什么是 Node 模块。通常来说，Node 模块可分为两大类：

- 核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成二进制可执行文件
- 文件模块：用户编写的模块，可以是自己写的，也可以使通过 npm 安全的





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





https://juejin.cn/post/6844904029219192839









Node.Js 模块系统源码探微

https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&mid=2247483885&idx=1&sn=eb4dd408d58774dc1587f0d6705eb8a2&chksm=e9537fb5de24f6a310a36b8d46623ec534a94a5ff09d7deb6191124e14c39b0667ef465059e4&mpshare=1&scene=1&srcid=&sharer_sharetime=1575817441587&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd