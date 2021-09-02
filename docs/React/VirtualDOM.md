# Virtual DOM
虚拟dom



## Virtual Dom 

#### vd 是什么?

它是一个简单的JS对象，并且至少包含 tag 、props 、children 三个属性。

#### 为什么需要vd？

借助VD，可以达到有效减少页面渲染次数的目的，宠儿提高效率

页面渲染三个阶段

- js计算（Scripting）

- 生成渲染树（Rendering）

- 绘制页面（Painting）

通过VD的比较，我们可以将多个操作合并到一起，减少dom重排的次数，进而缩短生成渲染树和绘制所花的时间

#### 如何实现VD与真实DOM的映射

借助 JSX 编译器（使用babel来转移）

遍历VD对象，生成真实的dom



### VD diff 算法

#### 思路

一般的设计思路都是页面等于页面状态的映射，即 UI = render(state)。当需要更新页面的时候，无需关系DOM具体的变换方式，只需要改变 state 即可，剩下的事情（render）将由框架代劳。

所以思路就是改变state，生成新的VD - 新的VD与旧的VD进行对比 - 生成差异对象（patch） - 遍历差异对象并更新



从React 历史长河里聊虚拟DOM及其价值

https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650590866&idx=1&sn=8b6d3b47f80e21fd6fe45439258edfef&chksm=8891deb6bfe657a0ebab3da007b49538a0edb2a4d526dbf828a6ddc2193415b831c6c1cba948&mpshare=1&scene=1&srcid=&sharer_sharetime=1577523565014&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



如何实现一个VirtualDOM 算法

https://github.com/livoras/blog/issues/13



#### 高效渲染策略

https://github.com/fi3ework/blog/issues/15

React在内部维护了一套虚拟DOM（VDOM），在内部维护着一颗VDOM树，这颗VDOM树映射到浏览器真实的DOM树，React通过更新VDOM树来对真实DOM更新，VDOM是plain object所以很明显操作VDOM的开销要比操作真实DOM小的多，再加上React内部的reconciler，React会在reconsilation之后最小化的进行VDOM的更新，再patch到真实DOM上最终完成用户看得到的更新。



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





让虚拟DOM和DOM-diff不在成为你的绊脚石

https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247484479&idx=1&sn=2d6461dd9bee8416da5f342064b5e540&chksm=9782cab6a0f543a0d2e54dd316f0921031b1b0add56fc291404a9afd82d0a68c6b8326ce7f8b&mpshare=1&scene=1&srcid=&sharer_sharetime=1574727372597&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



深度剖析：如何实现一个Virtual DOM

https://segmentfault.com/a/1190000017072371

https://github.com/livoras/blog/issues/13



谈谈你对虚拟dom 原理的理解

https://mp.weixin.qq.com/s/2ddtB_yNx7r9_y7-sF7T-w



面试官问: 如何理解Virtual DOM？

https://zhuanlan.zhihu.com/p/79408137



vdom是虚拟DOM的简称，指的是用JS模拟的DOM结构，将DOM变化的对比放在JS层来做。换而言之，vdom就是JS对象



精度 dom diff 原理详解

https://github.com/ascoders/weekly/blob/v2/190.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3%E3%80%8B.md



谈谈你对虚拟DOM原理的理解

https://mp.weixin.qq.com/s/2ddtB_yNx7r9_y7-sF7T-w





### Virtual Dom 的优势在哪里？

是一种视图层的表达力，可以用纯 JavaScript 对象去描述界面应该渲染成什么样子

为函数式的 UI编程方式打开了大门

可以渲染到 DOM 以外的 backend，比如 ReactNative



virtual-dom-is-pure-overhead 这篇文章所说

> - 虚拟DOM不是快，而是“通常”比较快
>
> - 无效、无意义的 diff 是需要浪费性能的，因此有些场景不如直接操作原生DOM性能好
>
> - 虚拟DOM 价值不在于性能

虚拟DOM 只是实现一个目的的手段或方式：声明式、基于状态驱动UI的开发模式





你不知道的虚拟dom 字节-写的很好

https://juejin.cn/post/6985058301184737287





## 参考资料

- [virtual-dom-is-pure-overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead)

- [网上都说操作真实DOM慢...](https://www.zhihu.com/question/31809713)






15张图，20分钟吃透Diff算法核心原理，我说的！！！

https://juejin.cn/post/6994959998283907102





谈谈对虚拟dom的理解

https://mp.weixin.qq.com/s/GAviSEsBIsOturghONEZmw
