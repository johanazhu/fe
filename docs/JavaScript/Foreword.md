# 前言

如何深入JavaScript，我们不妨看看书中是怎么描述的。

在 《JavaScript语言精粹》中，它的主旨是JavaScript语言中的精华部分，从它的语法分析，再到对象到函数再到继承到数组等等；

在《JavaScript启示录》中，它从对象开始讲，再讲对象和属性，再讲各个内置函数，比如 Object()、Function()、再到this、作用域和闭包、原型、Array()、String()...

可以看出 JavaScript启示录更加的全面。

但这仅仅是10几年前的老书，和现在相比，很多东西没有得到补充。

我希望能写出一本覆盖比较全面的前端地图，能让自己在这里就能看到外面的世界


如果按照路线图

什么是js？——js有什么组成（一切皆对象）——对象——Object——Function



我会先讲

JavaScript是什么？

​	javascript精粹中的核心部分，概括的讲。他的难点在哪里，需要注意的是什么等等

JavaScript由什么组成

​	基本类型和引用类型

​		基本类型是直接克隆

​		引用对象是引用，所以也被称为引用类型

​	引用类型又分为Object，Function，Array等数据类型

​	知道了JavaScript的所有数据类型后，我们要判断每个数据类型，比如用typeof 来判断，instanceof，Object.prototype.toString.call(source)方法判断，它们的优缺点是什么。综上总结自己手写一个判断数据类型的库，isType()

这时，我们隆重介绍引用类型（基本类型没什么好介绍了），也就是所谓的`一切皆对象`，在这一节里，我们分析对象的组成，对象间是如何存值的，以及对象的....。最主要了解的是如何复制对象，也就是深拷贝的内容，这里会与浅拷贝做比较，并且做对比，再后面手写深拷贝，一步一步了解深拷贝的每一步骤。

我们已经大致上了解对象这个概念了，接下来我们就挨个来认识引用类型中的数据类型，先从最广泛的Object来谈起，Object的各个方法和属性（附上脑图），Object

接着我们聊聊Function，为什么说函数是第一公民，函数凭什么在JavaScript中这么吃香（因为它，有人以函数式编程的思维写代码，JS本身是面向对象的编程语言，函数的强大让他的写法多了一种）

同样的，我们也从Function的方法和属性讲起，逐个讲解，这其中牵扯到 难点 This，作用域，原型链

Function()

​	柯里华

This()

作用域

闭包

原型

Array()

String()

Number()、Boolean()、使用原始值“字符串、数字和布尔值、null和underfined

Math函数和Regex正则和JSON

重难点突破

​	什么是作用域，首先你要知道什么是词法作用域

​	手写call，apply，bind，手写new，手写节流和防抖，手写深浅拷贝



也就是所谓的提纲

要确认好





夯实JS主要知识点

- 基本类型和引用类型
- 类型判断
- 强制类型转换
- 作用域
- 执行上下文
- 理解函数的执行过程
- this 指向
- 闭包
- 原型和原型链
- js 的继承
- event loop

https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046276&idx=1&sn=b54360af4eaa853699f6ebda2d2be822&chksm=87cbe694b0bc6f8238b645cbffe7c3ef7c4b3f6a6899670e5a306b494e819af2d4dd1cf052f1&mpshare=1&scene=1&srcid=&sharer_sharetime=1566830719714&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



珠峰架构课里对javascript 高级的课程安排

- call、apply、bind、new等手写实现
- 原型链和闭包深入
- 执行上下文和作用域链
- 深拷贝和浅拷贝
- 防抖和节流
- 词法分析和语法分析
- 常量、解析、模板字符串、解构操作符、箭头函数、数组新方法、生成器和迭代器等ES6语法
- Symbol 愿变成、Set和Map应用以及 WeakMap、Object.defineProperty 以及下一代的 Proxy& Reflect、ESModule实现、浏览器和Node.js中的EventLoop
- V8 内存管理、垃圾收集、引用记数、标记清除、标记整理和增量标记
- 高阶函数、发布订阅和观察者模式、Promise核心应用、generator和实现co库、async+await原理、实现完整的PromiseA+类库、包括reduce、all、finally、tru等方法