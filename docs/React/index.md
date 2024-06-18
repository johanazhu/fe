# React 导航

> 学习一个东西之前，首先在大脑中积累充分的”疑惑感“。即弄清面临的问题到底是什么，在浏览方法本身之前，最好先使劲问问自己都想到什么方法。一个公认的事实是，你对问题的疑惑越大，在之前做的自己的思考越多，当看到解答之后印象就越深刻

俺是做 React 开发的，React 的知识点有很多，延伸出的点更多，该如何做取舍？我们是要做到事无巨细逐个分析，还是针对常见问题进行讲解。我认为，没有一个全面的指导思路路会走窄，而一味求全只做蜻蜓点水式的了解根本进不了大厂。所以俺不得既要全，又要深。本章节以常见面试题为抓手，测量自己对 React 的了解程度，再对每个知识点进行分析讲解，能做多少就做多少，尽量都写到

## React 面试题

这些面试题基本和基础知识点中的知识点有所联系，

-   [常见面试题](./面试题/)
-   [代码题](./面试题/代码题)

-   [渲染十万条数据解决方案](./面试题/渲染十万条数据解决方案)

## React 各种知识点

-   [React 快速了解](./React快速了解)
-   [核心 API](./核心API)
    -   Component
    -   pureComponent
    -   createElement
        -   JSX 就是通过 babel 转换为 createElement
    -   cloneElement
    -   Refs
    -   portal 传送门
    -   context
    -   children
    -   ...
-   [Fiber](./Fiber)
    -   为什么会有？
    -   Fiber架构是怎么样的？
    -   它的作用
    -   原理
-   [VirtualDOM](./VirtualDOM)
    -   是什么？
    -   它的作用？
-   [Diff](./Diff)
    -   是什么？
    -   在其中起到什么作用
    -   它的本质？抽象语法树（AST）
-   [Hooks](./Hooks)
    -   是什么？
    -   有什么用？优缺点？
    -   它的本质是什么？
    -   [Hooks 踩坑](./Hooks踩坑)
    -   手写 Hooks
    -   写过自定义 Hooks 吗，展开讲讲
-   [setState](./快问快答setState)
    -   为什么要用 setState，而不是直接 `this.statet.xx == oo`？
    -   [setState 异步的原理](./setState)
-   [函数式组件与类组件有何不同](./函数式组件与类组件有何不同)
-   [性能优化](./性能优化)
    -   以 Hooks 为例

-   [事件机制](./事件机制)
-   [Refs](./Refs)
    -   是什么？
    -   不同阶段 ref 的用法
-   [里程碑](./里程碑)
    -   React 从13年开始到V15的Class组件 + 生命周期 再到Function + Hooks 的时间节点里程碑

-   [React版本更新](./React版本更新)
-   [生命周期](./生命周期)（已过时）
    -   class 才有生命周期
    -   15 的生命周期
    -   16.3 的生命周期
    -   16.4 及以上的生命周期

## 生态

-   [Redux](./生态/从Redux说起，到手写，再到状态管理)
    -   Redux 是什么
    -   它的作用

-   [ReactRedux](./生态/ReactRedux)
    -   是什么？ 单向数据流
    -   有什么用？
    -   手写
    -   连接 React 与 Redux
    -   手写
-   [Redux-Sage](./生态/Redux-Sage)
    -   Redux 异步解决方案
    -   手写
-   [Redux-thunk](./生态/Redux-thunk)
    -   Redux 异步解决方案
    -   手写
-   [Dva](./生态/Dva)
    -   集成了 Redux+Redux-Sage
    -   手写
-   [Mobx](./生态/Mobx)
    -   是什么？另一个状态库
    -   原理
-   [各个状态库对比](./生态/状态管理)
-   [ReactRouter](./生态/ReactRouter)
    -   单页面路由的本质
    -   手写
-   [Immutable](./生态/Immutable)
    -   数据不可变是什么

## 手写 React（未实现）

-   JSX 和 虚拟 DOM
-   组件和生命周期
-   diff 算法
-   异步的 setState
