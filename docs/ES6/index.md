# ES6 导航

我想我的 ECMAScript 6 知识点源头是从[ES6 入门教程](https://es6.ruanyifeng.com/)。不得不佩服阮一峰老师，写了这么多文章，都 40 多岁的人了，还能对技术孜孜不倦，这对我有很大的榜样力量

本章系列主要从我认为的重要点排序写下去

先大致介绍 ES 的所有知识点，例如 let、Symbol、块级作用域等我称之为[ES6 完全指南](./ES6完全指南.md)

个人认为 ES6 中最常见的面试题是 Promise，所以 Promise 首当其冲，我写下介绍 [Promise](./Promise/Promise.md) 是什么、[Promise 常见面试题](./面试题/Promise面试题.md)、再来一个[手写 Promise](./Promise/手写Promise.md)，Promise 大致上能明白个 7788。

说完 Promise，自然想到它的语法糖——[Async/Await](./Promise/Async.md)，它是什么？

再来了解一下[模块化历程](./模块化历程.md)，了解这个对我们的工程化有些许帮助，知道了历史，那就动手写个[手写模块打包器](./手写模块打包器.md)

接下来是[Class](./Class.md)，它是面向对象编程的重要语法，在 JavaScript 早期是没有 Class 的，虽然在 ES6 时加上，但本质还是 prototype（原型）的语法糖

接着我们聊[迭代器和生成器](./Iterator&Generator.md)，看看循环时为什么会用到这个，他对 Async/Await 有什么影响

然后我们聊[Let&Const](./Let&Const.md)，在 ES6 之前，只有函数作用域和全局作用域，ES6 之后就有了块级作用域，块级作用域有什么用，它表示什么，Let 和 Const 能形成块级作用域，他们有什么区别，暂时性死区是什么？怎么影响，怎么作用

[Map 和 Set](./Map&Set.md)常考，Map 与 WeakMap 的区别，为什么手写拷贝一个对象需要用 WeakMap？Set 能起到去重的作用，它具体是怎么做的？

ES6 之后的每年发布一个版本，ES6 是 2015 年的，之后的每年更新了哪些新的语法和知识点，我们在 [ES6至ES12的新特性](./ES6至ES12的新特性.md)里会说明一二

Proxy 是个很强大的功能，Vue3 就用此功能完成对数据的变化，我们这节来了解[Proxy](./Proxy.md)
