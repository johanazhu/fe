# ES6导航

我想我的ECMAScript 6知识点源头是从[ES6 入门教程](https://es6.ruanyifeng.com/)。不得不佩服阮一峰老师，写了这么多文章，都40多岁的人了，还能对技术孜孜不倦，这对我有很大的榜样力量

本章系列主要从我认为的重要点排序写下去

先大致介绍ES的所有知识点，例如let、Symbol、块级作用域等我称之为[ES6完全指南](./ES6完全指南.md)

个人认为ES6中最常见的面试题是Promise，所以 Promise 首当其冲，我写下介绍 [Promise](./Promise/Promise.md) 是什么、[Promise常见面试题](./Promise/Promise面试题.md)、再来一个[手写Promise](./Promise/手写Promise.md)，Promise大致上能明白个7788。

说完Promise，自然想到它的语法糖——[Async/Await](./Promise/Async.md)，它是什么？

再来了解一下[模块化历程](./模块化历程.md)，了解这个对我们的工程化有些许帮助，知道了历史，那就动手写个[手写模块打包器](./手写模块打包器.md)

接下来是[Class](./Class.md)，它是面向对象编程的重要语法，在JavaScript 早期是没有 Class 的，虽然在ES6时加上，但本质还是 prototype（原型）的语法糖

接着我们聊[迭代器和生成器](./Iterator&Generator.md)，看看循环时为什么会用到这个，他对Async/Await有什么影响

然后我们聊[Let&Const](./Let&Const.md)，在ES6之前，只有函数作用域和全局作用域，ES6之后就有了块级作用域，块级作用域有什么用，它表示什么，Let和Const能形成块级作用域，他们有什么区别，暂时性死区是什么？怎么影响，怎么作用

[Map和Set](./Map&Set.md)常考，Map与WeakMap的区别，为什么手写拷贝一个对象需要用WeakMap？Set能起到去重的作用，它具体是怎么做的？

ES6之后的每年发布一个版本，ES6是2015年的，之后的每年更新了哪些新的语法和知识点，我们在 [ES6+](./ES6+.md)里会说明一二

Proxy是个很强大的功能，Vue3就用此功能完成对数据的变化，我们这节来了解[Proxy](./Proxy.md)



