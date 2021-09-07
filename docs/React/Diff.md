# Diff 算法



diff算法

什么是diff算法

​	对比 git diff

vdom为什么用diff算法

diff算法的实现流程

​	DOM操作时昂贵的，因因此尽量减少DOM操作

​	找出本次DOM必须更新的节点来更新，其他不更新

​	这个“找出”的过程，就需要diff算法

diff实现过程

​	patch(container, vnode)	第一次渲染

​	patch(vnode, newVnode)	更新数据



### VD diff 算法

#### 思路

一般的设计思路都是页面等于页面状态的映射，即 UI = render(state)。当需要更新页面的时候，无需关系DOM具体的变换方式，只需要改变 state 即可，剩下的事情（render）将由框架代劳。

所以思路就是改变state，生成新的VD - 新的VD与旧的VD进行对比 - 生成差异对象（patch） - 遍历差异对象并更新






DIff算法看不懂就一起来锤我(带图)

https://mp.weixin.qq.com/s/XRR9afpujcjbgFZM0Zw6Gw





15张图，20分钟吃透Diff算法核心原理，我说的！！！

https://juejin.cn/post/6994959998283907102



精度 dom diff 原理详解

https://github.com/ascoders/weekly/blob/v2/190.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3%E3%80%8B.md

