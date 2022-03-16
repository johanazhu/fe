# React Redux 源码解析

使用过`redux`的同学都知道，`redux`作为`react`公共状态管理工具，配合`react-redux`可以很好的管理数据，派发更新，更新视图渲染的作用，那么对于 `react-redux` 是如何做到根据 `state` 的改变，而更新组件，促使视图渲染的呢，让我们一起来探讨一下，`react-redux` 源码的奥妙所在

在正式分析之前我们不妨来想几个问题:

React-redux

主要是两个组件，connect 高阶组件 和 Provider 组件

connect

1. 从 `store` 里面获取读和写的 API
2. 对拿到的接口进行封装。根据 `mapStateToProps` 和 `mapDispatchToProps` 进行封装
3. 在家当的时候进行更新（精准更新）。只有`store` 发生变化，才对页面进行更新
4. 渲染组件（订阅 redux，数据改变后广播通知）

connect 就是一个高阶组件

Provider 其实就是一个使用 context 上下文后的组件

把 context 喝 store 结合起来，与欸的那个只能通过 `dispatch` 来进行修改，这样的话，每个组件既可以去 context 里面获取 store 从而获取状态，又不用担心它们乱改数据

## 参考资料

-   [「源码解析」一文吃透 react-redux 源码（useMemo 经典源码级案例）](https://mp.weixin.qq.com/s/oEvs6qzUbf4Lb5pvftKZIQ)
-   [【干货】从零实现 react-redux](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247485220&idx=2&sn=74811cf3a61baf1a883fe1c7a76b88fa&chksm=c06686b2f7110fa4211871572ae52b08b0cc045741540e28e7c026f441b7c7f26e454aecd1b0&mpshare=1&scene=1&srcid=&sharer_sharetime=1585194811446&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
