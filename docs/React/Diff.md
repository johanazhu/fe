# Diff 算法

对比 Diff 的话，最有的算法时间复杂度为 O(n3)

React 在以下两个假设的基础上提出了一套 O(n) 的启发式算法

1. 两个不同类型的元素会产生不同的树
2. 开发者可以通过设置 key 属性，来告知渲染哪些子元素在不同的渲染树下可以保持不变

完全对比 O(n3)无法接受，故降级为同层对比的 O(n)方案

为什么降级可行？因为跨层级很少法神可以忽略

diff 算法

什么是 diff 算法

​ 对比 git diff

vdom 为什么用 diff 算法

diff 算法的实现流程

​ DOM 操作时昂贵的，因因此尽量减少 DOM 操作

​ 找出本次 DOM 必须更新的节点来更新，其他不更新

​ 这个“找出”的过程，就需要 diff 算法

diff 实现过程

​ patch(container, vnode) 第一次渲染

​ patch(vnode, newVnode) 更新数据

### VD diff 算法

#### 思路

一般的设计思路都是页面等于页面状态的映射，即 UI = render(state)。当需要更新页面的时候，无需关系 DOM 具体的变换方式，只需要改变 state 即可，剩下的事情（render）将由框架代劳。

所以思路就是改变 state，生成新的 VD - 新的 VD 与旧的 VD 进行对比 - 生成差异对象（patch） - 遍历差异对象并更新

## 参考资料

-   [DIff 算法看不懂就一起来锤我(带图)](https://mp.weixin.qq.com/s/XRR9afpujcjbgFZM0Zw6Gw)

-   [15 张图，20 分钟吃透 Diff 算法核心原理](https://juejin.cn/post/6994959998283907102)

-   [精读《DOM diff 原理详解》](https://github.com/ascoders/weekly/blob/v2/190.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3%E3%80%8B.md)

-   [协调](https://zh-hans.reactjs.org/docs/reconciliation.html#gatsby-focus-wrapper)
