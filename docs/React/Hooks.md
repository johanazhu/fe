# Hook

用来定义有状态和生命周期函数的纯函数组件（在过去纯函数组件是没有状态和生命周期函数的）



可以讲的东西有很多



全面了解React Suspense 和 Hooks

https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484462&amp;idx=1&amp;sn=5dbd034c08a993f6ff7a65d62da0b9bd&source=41#wechat_redirect



故事背景

https://github.com/shanggqm/blog/issues/4



你可能不知道 React Hooks

https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484934&idx=1&sn=55c272fa810e5645f9e0a42a238e8620&chksm=ea01656add76ec7c7e50140b639f11259b80cdbb2523180e8eb4a1f0ec0032494429a6ba036a&mpshare=1&scene=1&srcid=&sharer_sharetime=1578441321152&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



如何结合React Hooks 来使用 Redux

https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247487442&idx=1&sn=4cd7e5f483f05e664aadefee84b1c5b7&chksm=ea0d4528dd7acc3e2eccb7b5f3d551eaf07f0c5b0a59c94a4780d0877d0b16f48c2a37f225d0&mpshare=1&scene=1&srcid=&sharer_sharetime=1582717146626&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



从Mixin 到 Hoc 再到 Hook

https://juejin.im/post/5cad39b3f265da03502b1c0a



面试官：谈一谈 HOC、Render props 、Hooks

https://mp.weixin.qq.com/s?__biz=MzA3MjkwNTM1Mw==&mid=2649139131&idx=1&sn=3a2e9a5ae7dd3099943e01d69c980a61&chksm=8705205db072a94b3e21380876b072240efd2b08f5af85d8ddfe8725960fe11372c308e17c59&mpshare=1&scene=1&srcid=&sharer_sharetime=1583729706595&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



什么时候使用 useMemo 和 useCallback

https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247485108&idx=1&sn=7f7eab36001073edfb4cf7368d79be32&chksm=9782c83da0f5412b2bfb89ed7dd194226e3d9800a4c7b21f89e26bea919844b4799d8a74722c&mpshare=1&scene=1&srcid=&sharer_sharetime=1583904339220&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



深入解析！React hooks 新UI组件原理：Modal 弹窗

https://mp.weixin.qq.com/s?__biz=MzI1NDU3NzM5Mg==&mid=2247484409&idx=1&sn=7a6ef8e89e61af600595b2873df8b69a&chksm=e9c25c66deb5d5702d7b1e9c1a8852e40286f4aec8b27eb75cab8617e0ccae7858ae08b33313&mpshare=1&scene=1&srcid=&sharer_sharetime=1584974438419&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



React hook

参考文章

https://www.yuque.com/lizhiyao/na2825/pz9ufw





redux+hooks 我全都要

https://medium.com/enjoy-life-enjoy-coding/react-redux-%E5%B0%8F%E5%AD%A9%E5%AD%90%E6%89%8D%E5%81%9A%E9%81%B8%E6%93%87-hooks-%E5%92%8C-redux-%E6%88%91%E5%85%A8%E9%83%BD%E8%A6%81-1fdd226f5d99



怎么使用 React hooks 造轮子

https://github.com/dt-fe/weekly/blob/v2/080.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md



useEffect 完全指南

https://github.com/dt-fe/weekly/blob/v2/096.%E7%B2%BE%E8%AF%BB%E3%80%8AuseEffect%20%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97%E3%80%8B.md



react-hooks-fetch-data

https://www.robinwieruch.de/react-hooks-fetch-data



useEffect 完全指南

https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/



useCallback、useMemo 分析以及差别

https://juejin.im/post/5dd64ae6f265da478b00e639



十个案例学会 React Hooks

https://github.com/happylindz/blog/issues/19

有状态的组件没有渲染，有渲染的组件没有状态



手动做一个hook

https://github.com/shanggqm/blog/issues/4





React hooks 原理

用到了闭包

https://github.com/brickspert/blog/issues/26



自定义hooks









### useRef

#### 为啥使用useRef?

它不仅仅是用来管理DOM ref 的，它还相当于 this，可以存放任何变量，很好的解决闭包带来的不方便行

#### 怎么使用useRef?

```javascript
const [count, setCount] = useState<number>(0)
const countRef = useRef<number>(count)
```

##### 场景举例

##### 1.闭包问题

点击 **加** 一个按钮 3 次，再点 **弹框显示** 1次，再点 **加** 按钮 2 次，最终 `alert` 会是什么结果？

```react
import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState<number>(0)

  const handleCount = () => {
    setTimeout(() => {
      alert('current count: ' + count)
    }, 3000);
  }

  return (
    <div>
      <p>current count: { count }</p>
      <button onClick={() => setCount(count + 1)}>加</button>
      <button onClick={() => handleCount()}>弹框显示</button>
    </div>
  )
}

export default Counter
```

结果是弹框内容为 **current count: 3**，为什么？

 闭包了，每次调用setCount，

当我们更新状态的时候, **React 会重新渲染组件, 每一次渲染都会拿到独立的 count 状态, 并重新渲染一个 handleCount 函数. 每一个 handleCount 里面都有它自己的 count 。**

如何









渲染一个组件，会将内部的方法重新执行，这个操作是没有闭包的，消耗无关的性能。

使用useMemo来优化

传入 `useMemo` 的函数会在渲染期间执行，



### useCallback



`useMemo` 和 `useCallback` 接受的参数都是一样，都是在其依赖项发生变化后执行，都是返回缓存的值，区别在于 `useMemo` 返回的是函数运行的结果，`useCallback` 返回的是函数

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)



### 什么时候使用 useMemo 和 useCallback ？

这两个 hooks 内置于 React 都有特别的原因：

1. 引用相等
2. 昂贵的计算



引用类型的变量会引起 组件的不必要的渲染

https://jancat.github.io/post/2019/translation-usememo-and-usecallback/



针对useMemo和useCallback 最直观的测试就是打印 函数式组件是否有渲染，优化之后，没改变的组件不渲染





useEffect 引起的 React Hooks

https://mp.weixin.qq.com/s/O7qvU0bM-_ZpmgdIILxbKQ



useEffect，useCallback，useMemo 三者有何区别

https://mp.weixin.qq.com/s/MzpUROCRYPpwOycI2sz3lQ






















