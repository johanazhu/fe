# Virtual DOM


> 我不要你觉得，我要我觉得。这也是学习的一种方式，用自己的话表达出来，毕竟自己说的话要是不懂的话，那还是人吗

## 前言

以前的前端开发量少，所以基本上是对 DOM 直接操作，后来随着前端工程化的不断发展，有了各种 [MVVM](../JavaScript/原理/模拟MVVM的实现.md) 模式的前端框架，这些框架共有的特点就是不再关心具体 DOM 的操作，而是把重心放在了基于数据状态的操作，一旦数据更改，跟它绑定的那个地方的 DOM 也会跟着变化。

前端的发展发生了两个变化

- 命令式——声明式

- 关注API——关注数据

我们的心智得到解脱，不用再记操作DOM的各种长的要命的API（即使JQuery能减轻一些压力），而去注重数据（状态）。以前用 JavaScript 写各种操作页面，动态语言，赋值变来变去，现在追求纯函数、函数式编程、数据不可变，最好用 TS 加上各种库来让我们的应用更加健硕

这样也导致了一个问题，我们去关注数据，去做前端工程化，也慢慢内卷着学习算法，仔细想想，前端最重要的难道不该是体验吗



## 快速了解

什么是Virtual DOM

​	一个描述真实 DOM 的对象

为什么需要 Virtual DOM

​	操作 DOM 很耗时

​	Virtual DOM 的优势	

React 中的 Virtual DOM

​	工作流程

​	...

如何实现 Virtual DOM

​	现实中实现 Virtual DOM 的库有哪些

​	我们按步骤完成 Virtual DOM







## 什么是 Virtual DOM

React 的官网这样描述

> Virtual DOM 是一种编程概念。在这个概念里，UI 以一种理想化的，或者说“虚拟的”表现形式呗保存于内存中，并通过如 ReactDOM 等类库使之与“真实的”DOM 同步。这一过程叫做协调



Virtual DOM 是虚拟DOM的简称，指的是用JS模拟的DOM结构，将DOM变化的对比放在JS层来做。换而言之，Virtual DOM 就是JS对象



它是一个简单的JS对象，并且至少包含 tag 、props 、children 三个属性。



如何实现VD与真实DOM的映射

借助 JSX 编译器（使用babel来转移）

遍历VD对象，生成真实的dom



Virtual DOM 就是描述 DOM 树的 JS 对象，

之所以要有它，是因为快？

### 过程

用 JSX 来写业务，写完后 render 后，JSX 其实是 createElement 的语法糖，createElement 生成一个 JS 对象，这个对象就是 Virtual DOM，它描述真实 DOM 树。当状态改变后，生成新的 Virtual DOM，两者有对比，diff 之后的 patches，拿着这段 patch 更新页面即可，减少最小的页面绘制

React在内部维护了一套虚拟DOM（VDOM），在内部维护着一颗VDOM树，这颗VDOM树映射到浏览器真实的DOM树，React通过更新VDOM树来对真实DOM更新，VDOM是plain object所以很明显操作VDOM的开销要比操作真实DOM小的多，再加上React内部的reconciler，React会在reconsilation之后最小化的进行VDOM的更新，再patch到真实DOM上最终完成用户看得到的更新。



## 为什么需要 Virtual DOM

借助VD，可以达到有效减少页面渲染次数的目的，从而提高效率

页面渲染三个阶段

- js计算（Scripting）

- 生成渲染树（Rendering）

- 绘制页面（Painting）

通过VD的比较，我们可以将多个操作合并到一起，减少dom重排的次数，进而缩短生成渲染树和绘制所花的时间

目的是声明性的、状态驱动的 UI 开发

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



## 如何实现 Virtual DOM



### 实现 Virtual DOM 的库

snabbdom、ddd、virtual-dom

> 注意：司马的react-like 用的是XX，preact 用的是XXX，而 React 是自己写的

Sbabbdom

- Vue 2.X 内部使用的 Virtual DOM 就是改造的 Snabbdom

使用snabbdom实现vdom

这是一个简易的实现 vdom 功能的库，相比 vue、react，对于 vdom 这块更加简易，适合我们学习 vdom。vdom 里面有两个核心的 api，一个是 h 函数，一个是 patch 函数，前者用来生成 vdom 对象，厚泽的功能在于做 虚拟 dom 对比和将 vdom 挂载到真实 DOM 上。





#### 步骤一：用 JS 对象模拟 DOM 树

用到原生操作 DOM 方法

- createElement

- setAttribute

- createTextNode

- appendChild



#### 步骤二：比较两棵虚拟 DOM 树的差异



#### 步骤三：把差异应用到真正的 DOM 树上

做一个 虚拟 dom，然后做 diff 对比，把需要更新的部分（patches）渲染到页面上













## 参考资料

- [你不知道的 React Virtual DOM](https://juejin.cn/post/6985058301184737287)
- [网上都说操作真实DOM慢...](https://www.zhihu.com/question/31809713)
- [从React 历史长河里聊虚拟DOM及其价值](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496284&idx=1&sn=9409ad1a80fe8f18c8e18136ebd65dd0&source=41#wechat_redirect)
- [如何实现一个VirtualDOM 算法](https://github.com/livoras/blog/issues/13)
- [让虚拟DOM和DOM-diff不在成为你的绊脚石](https://juejin.im/post/5c8e5e4951882545c109ae9c)
- [面试官问: 如何理解Virtual DOM？](https://zhuanlan.zhihu.com/p/79408137)
- [谈谈你对虚拟DOM原理的理解](https://mp.weixin.qq.com/s/2ddtB_yNx7r9_y7-sF7T-w)
- [谈谈对虚拟DOM的理解](https://mp.weixin.qq.com/s/GAviSEsBIsOturghONEZmw)

