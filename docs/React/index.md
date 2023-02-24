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
    -   [Refs](./Refs.md)
    -   portal 传送门
    -   context
    -   children
    -   ...
    
-   [VirtualDOM](./VirtualDOM.md)
    -   是什么？
    -   它的作用？
-   [Diff](./Diff.md)
    -   是什么？
    -   在其中起到什么作用
    -   它的本质？抽象语法树（AST）
-   [setState](./快问快答setState.md)
    -   为什么要用 setState，而不是直接 `this.statet.xx == oo`？
    -   setState 异步的原理，为什么出现
    -   表现出异步后如何拿到更新后的 state
-   [函数式组件与类组件有何不同](./函数式组件与类组件有何不同.md)

-   [Hooks](./Hooks.md)

    -   是什么？
    -   有什么用？优缺点？
    -   它的本质是什么？
    -   [Hooks 踩坑](./Hooks踩坑.md)
    -   手写

-   [事件机制](./事件机制.md)
-   [Fiber](./Fiber.md)
    -   为什么会有？
    -   架构是怎么样的
    -   为什么要了解
-   [性能优化](./性能优化.md)
    -   方法
-   [Refs](./Refs.md)
    -   是什么？
    -   不同阶段 ref 的用法
-   [生命周期](./生命周期.md)
    -   class 才有生命周期
    -   15 的生命周期
    -   16.3 的生命周期
    -   16.4 及以上的生命周期

## 生态

-   [Immutable](./生态/Immutable.md)
    -   数据不可变是什么
-   [ReactRedux](./生态/ReactRedux.md)
    -   是什么？ 单向数据流
    -   有什么用？
    -   手写
    -   连接 React 与 Redux
    -   手写

-   [Redux-Sage](./生态/Redux-Sage.md)
    -   Redux 异步解决方案
    -   手写
-   [Redux-thunk](./生态/Redux-thunk.md)
    -   Redux 异步解决方案
    -   手写
-   [Dva](./生态/Dva.md)
    -   集成了 Redux+Redux-Sage
    -   手写
-   [Mobx](./生态/Mobx.md)
    -   是什么？另一个状态库
    -   原理
-   [各个状态库对比](./生态/状态管理)
-   [ReactRouter](./生态/ReactRouter.md)
    -   单页面路由的本质
    -   手写
-   [ReactSSR](./生态/ReactSSR.md)

## 手写 React

-   JSX 和 虚拟 DOM
-   组件和生命周期
-   diff 算法
-   异步的 setState

## 实战

-   [React 代码整洁之道](./实战/React代码整洁之道.md)

-   [React全家桶最佳实践2023年版](./实战/React全家桶最佳实践2023年版.md)

-   [自动化测试](./实战/自动化测试.md)

-   [TodoList](./实战/TodoList.md)

    -   开源
    -   搭建多个版本

-   [UI 组件](./实战/UI组件.md)
    -   开源
    -   jingui
-   [MovMov](./实战/MovMov.md)
    -   开源
    -   力求 star 1000 以上
-   [仿 TapTap 默认颜色取海报颜色](./实战/仿TapTap默认颜色取海报颜色.md)

React 前端工程师学习路径

https://github.com/tuture-dev/react-roadmap
