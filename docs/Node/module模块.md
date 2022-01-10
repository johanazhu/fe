# Node中的模块机制 



之前没有模块化

模块化的历程

简单来说：

IIFE——CommonJS——AMD/CMD——ES6模块...





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









## export 与 module.export 的区别

导出多个成员（必须在对象中）

```javascript
exports.a = 123
exports.b = 'hello'
exports.c = function(){
	console.log('ccc')
}
exports.d = {
	foo: 'bar'
}
```


导出多个成员也可以这样写

```javascript
module.exports = {
    foo: 'bar',
    add: function () {
    	console.log('aa')
    }
}
```

导出单个成员（拿到的就是：函数，字符串）

```javascript
module.exports = 'hello'
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









## 参考资料

- [一杯茶的时间，上手 Node.js](https://tuture.co/2019/12/03/892fa12/)
- [「万字整理 」这里有一份Node.js入门指南和实践,请注意查收](https://juejin.cn/post/6844904029219192839)
- [Node.js 模块系统源码探微](https://mp.weixin.qq.com/s?__biz=MzI0NTE5NzYyMw==&mid=2247483885&idx=1&sn=eb4dd408d58774dc1587f0d6705eb8a2&chksm=e9537fb5de24f6a310a36b8d46623ec534a94a5ff09d7deb6191124e14c39b0667ef465059e4&mpshare=1&scene=1&srcid=&sharer_sharetime=1575817441587&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [require和import的区别是什么？看这个你就懂了](https://segmentfault.com/a/1190000014434944)