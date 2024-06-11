# Diff 算法

对比 Diff 的话，最初的算法时间复杂度为 O(n3)

React 在以下两个假设的基础上提出了一套 O(n) 的启发式算法

1. 两个不同类型的元素会产生不同的树
2. 对于同一层级的子节点，可以通过 key 属性进行唯一标识。通过给子节点添加唯一 key 值，React 可以快速定位到发生变化的节点，而不需要对整个子树进行 diff

完全对比 O(n3)无法接受，故降级为同层对比的 O(n)方案

为什么降级可行？因为跨层级很少发生可以忽略

### VirtualDOM Diff 算法

一般的设计思路都是页面等于页面状态的映射，即 UI = render(state)。当需要更新页面的时候，无需关系 DOM 具体的变换方式，只需要改变 state 即可，剩下的事情（render）将由框架代劳。

所以思路就是改变 state，生成新的 VD - 新的 VD 与旧的 VD 进行对比 - 生成差异对象（patch） - 遍历差异对象并更新

 patch(container, vnode) 第一次渲染

 patch(vnode, newVnode) 更新数据

## 参考资料

-   [DIff 算法看不懂就一起来锤我(带图)](https://mp.weixin.qq.com/s/XRR9afpujcjbgFZM0Zw6Gw)

-   [15 张图，20 分钟吃透 Diff 算法核心原理](https://juejin.cn/post/6994959998283907102)

-   [精读《DOM diff 原理详解》](https://github.com/ascoders/weekly/blob/v2/190.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3%E3%80%8B.md)

-   [协调](https://zh-hans.reactjs.org/docs/reconciliation.html#gatsby-focus-wrapper)
