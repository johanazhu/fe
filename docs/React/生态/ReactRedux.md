# React Redux源码解析





使用过`redux`的同学都知道，`redux`作为`react`公共状态管理工具，配合`react-redux`可以很好的管理数据,派发更新，更新视图渲染的作用，那么对于 `react-redux` 是如何做到根据 `state` 的改变，而更新组件，促使视图渲染的呢，让我们一起来探讨一下，`react-redux` 源码的奥妙所在



在正式分析之前我们不妨来想几个问题:



React-redux



## 参考资料

- [「源码解析」一文吃透react-redux源码（useMemo经典源码级案例）](https://mp.weixin.qq.com/s/oEvs6qzUbf4Lb5pvftKZIQ)
- [【干货】从零实现 react-redux](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247485220&idx=2&sn=74811cf3a61baf1a883fe1c7a76b88fa&chksm=c06686b2f7110fa4211871572ae52b08b0cc045741540e28e7c026f441b7c7f26e454aecd1b0&mpshare=1&scene=1&srcid=&sharer_sharetime=1585194811446&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)