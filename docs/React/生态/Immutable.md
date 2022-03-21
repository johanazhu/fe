# Immutable

## 1. 什么是 Immutable ？

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。主要原理是采用了 Persistent Data Structure（持久化数据结构)，就是当每次修改后我们都会得到一个新的版本，且旧版本可以完好保留，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），就是对于本次操作没有修改的部分，我们可以直接把相应的旧的节点拷贝过去，这其实就是结构共享。

## 为什么要不可变

JS 因为设计初衷所以，可以 XXX

基础类型可以改变

引用类型不可以

引用类型——深浅拷贝

浅拷贝方法

对象

Object.assign()

解构赋值

数组

slice(0)

a.concat(b)

引申出 JavaScript 中有哪些方法会改变原数组，哪些返回返回值

不可变数据为什么流行

原因和 React 有很大关系

数据不可变性是为了服务 diff，因为 react 的底层就是 i 这样实现的，需要对比数据是否变化，才会更新视图

react 火了之后，打出函数式编程的口号，目的是让它们使用 react

如何深拷贝

直接操作 this.state.push({name: 'johan'})react 的数据更新是采用 push 的方式，也就是调用 setState 告诉 react 状态更新了，不然 react 是不会知道的
数据不可变数组的某些操作就是 immutable（返回新数组，不去修改原数组）字符串操作总是不可变的（他会创建一个包含更改的新字符串）
react 为什么不能直接修改 state？
因为 react 的底层实现是 diff，所以必须依赖数据的 immutability，破坏了 immutability 会发生各种难以注意到的问题
数据不可变性是为了服务 diff，因为 react 的底层就是这样实现，需要对比数据是否变化，才会更新视图
像 vue，mobx 之类，数据与视图绑定，视图变化，数据也跟着变化，这样就不需要调用 setState
那么为什么 react 强制要求 plain js object 的 immutability？因为它完全没有提供任何 [ reactive ] 和 [精准追踪改变] 的机制，而是在 vdom 上无脑 diff

总结因为 react 的底层是 diff，所以要保持数据的不可变性，如何让数据不可变呢？基本类型直接复制，引用类型就拷贝（浅拷贝四个方法），但是嵌套对象就不好办了，这个时候就要用到 immutable 之类的库，无论是函数时写法，还是纯函数概念，react 一直在推崇，本质是数据的不可变性

## 参考资料

-   [15 分钟学会 Immutable](https://mp.weixin.qq.com/s/8-xfY45DLqKDKAhvP16sUw)
-   [不能修葺的房子](https://mp.weixin.qq.com/s/APqvWcqhT5GSYsho_-sEtA)
-   [不可变数据结构（immutable data）](https://github.com/sunyongjian/blog/issues/33)
-   [React 为什么不能直接修改 state?](https://www.zhihu.com/question/440916294/answer/1715903878)
