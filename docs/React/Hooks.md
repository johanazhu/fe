# React Hooks 从认识到手写



## 前言

React hooks 必会，必考题。现在一个 React 开发要不会 Hooks 的话，很难说自己是一名合格的开发者，Hooks 问世已经3年了（18年出品），同仁出的教程数不胜数，这里做我对 Hooks 的认识和理解



## 大纲

测试一下 Hooks 的熟练程度

是什么

- 发展史
  - 从Mixin到HOC再到Hook

有什么用

- 让函数式组件拥有状态，更符合函数式编程理念

最重要且常见的两个 hooks

- useState

- useEffect
  - 与 useLayoutEffect 的区别

性能优化相关

- useMemo
- useCallback

与 Ref 相关

- useRef
- useImperativeHandle

不常见的其他的 hooks

- useReducer
- useContext
- useTransition
- useDebugValue

自定义 Hooks

手写 Hooks



## 测试一下 Hooks 的熟练程度

为什么不能在循环中调用 hooks？react 中为什么不能在 for 循环、if 语句里使用 hooks

为什么只能在函数最外层调用 Hook，不要在循环、条件判断或者子函数中调用？

React Hooks 为什么不能写在条件语句中？

React.memo、React.useCallback、React.usememo 的作用

useState中的值是个对象，改变对象中的值，demo 会渲染吗？如果用 React.memo() 包裹住呢

能否口喷hooks 的原理是什么



## 是什么

用来定义有状态和生命周期函数的纯函数组件（在过去纯函数组件是没有状态和生命周期函数的）



## 有什么用

让函数式组件拥有状态，更符合函数式编程理念





## 最重要且常见的两个 hooks

### useState



### useEffect

它是什么

#### 与 useLayoutEffect 的区别



## 性能优化相关

什么时候使用 useMemo 和 useCallback ？

这两个 hooks 内置于 React 都有特别的原因：

1. 引用相等
2. 昂贵的计算



针对useMemo和useCallback 最直观的测试就是打印 函数式组件是否有渲染，优化之后，没改变的组件不渲染

### useMemo

渲染一个组件，会将内部的方法重新执行，这个操作是没有闭包的，消耗无关的性能。

使用useMemo来优化

传入 `useMemo` 的函数会在渲染期间执行，



### useCallback

useCallback 钩子是专门为传递给子组件的回调函数设计的，可以避免不必要的重新创建这些函数，重新创建这些函数的过程会再每次重渲染时引起性能问题

`useMemo` 和 `useCallback` 接受的参数都是一样，都是在其依赖项发生变化后执行，都是返回缓存的值，区别在于 `useMemo` 返回的是函数运行的结果，`useCallback` 返回的是函数

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)





## 与 Ref 相关



### useRef

useRef 钩子能够再重渲染过程中保存 state

使用 useRef 保存和更新一些数据时有一定好处的，**它可以不通过内存来保存数据**，使得这些数据再重渲染时不会被清除掉

如果我们想利用普通的变量再重渲染过程中追踪数据变化是不可行的，因为每次组件渲染时它都会被重新初始化。然而，如果使用 ref 的话，其中的数据能在每次组件渲染时保持不变。

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

 闭包了，每次调用 setCount，

当我们更新状态的时候, React 会重新渲染组件, 每一次渲染都会拿到独立的 count 状态, 并重新渲染一个 handleCount 函数. 每一个 handleCount 里面都有它自己的 count 



















## 参考资料

- [看家本领来了：全面了解 React Suspense 和 Hooks](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484462&amp;idx=1&amp;sn=5dbd034c08a993f6ff7a65d62da0b9bd&source=41#wechat_redirect)

- [无意识设计-复盘React Hook的创造过程](https://github.com/shanggqm/blog/issues/4)

- [你可能不知道的 React Hooks](https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484934&idx=1&sn=55c272fa810e5645f9e0a42a238e8620&chksm=ea01656add76ec7c7e50140b639f11259b80cdbb2523180e8eb4a1f0ec0032494429a6ba036a&mpshare=1&scene=1&srcid=&sharer_sharetime=1578441321152&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

- [如何结合React Hooks 来使用 Redux](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247487442&idx=1&sn=4cd7e5f483f05e664aadefee84b1c5b7&chksm=ea0d4528dd7acc3e2eccb7b5f3d551eaf07f0c5b0a59c94a4780d0877d0b16f48c2a37f225d0&mpshare=1&scene=1&srcid=&sharer_sharetime=1582717146626&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

- [【React深入】从Mixin到HOC再到Hook](https://juejin.cn/post/6844903815762673671)

- [面试官: 谈一谈 HOC、Render props、Hooks](https://mp.weixin.qq.com/s?__biz=MzA3MjkwNTM1Mw==&mid=2649139131&idx=1&sn=3a2e9a5ae7dd3099943e01d69c980a61&chksm=8705205db072a94b3e21380876b072240efd2b08f5af85d8ddfe8725960fe11372c308e17c59&mpshare=1&scene=1&srcid=&sharer_sharetime=1583729706595&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

- [什么时候使用 useMemo 和 useCallback](https://mp.weixin.qq.com/s?__biz=MzIxNjgwMDIzMA==&mid=2247485108&idx=1&sn=7f7eab36001073edfb4cf7368d79be32&chksm=9782c83da0f5412b2bfb89ed7dd194226e3d9800a4c7b21f89e26bea919844b4799d8a74722c&mpshare=1&scene=1&srcid=&sharer_sharetime=1583904339220&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

- [React Redux | 小孩子才做選擇！ Hooks 和 Redux 我全都要！](https://medium.com/enjoy-life-enjoy-coding/react-redux-%E5%B0%8F%E5%AD%A9%E5%AD%90%E6%89%8D%E5%81%9A%E9%81%B8%E6%93%87-hooks-%E5%92%8C-redux-%E6%88%91%E5%85%A8%E9%83%BD%E8%A6%81-1fdd226f5d99)

- [精读《怎么用 React Hooks 造轮子》](https://github.com/ascoders/weekly/blob/v2/080.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md)

- [精读《useEffect 完全指南》](https://github.com/ascoders/weekly/blob/v2/096.%E7%B2%BE%E8%AF%BB%E3%80%8AuseEffect%20%E5%AE%8C%E5%85%A8%E6%8C%87%E5%8D%97%E3%80%8B.md)

- [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data)

- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

- [useCallback、useMemo 分析以及差别](https://juejin.im/post/5dd64ae6f265da478b00e639)

- [十个案例学会 React Hooks](https://github.com/happylindz/blog/issues/19)

- [React Hooks 原理](https://github.com/brickspert/blog/issues/26)

- [【译】什么时候使用 useMemo 和 useCallback](https://jancat.github.io/post/2019/translation-usememo-and-usecallback/)

- [useEffect 引起的 React Hooks 深入了解](https://mp.weixin.qq.com/s/O7qvU0bM-_ZpmgdIILxbKQ)

- [useEffect, useCallback, useMemo三者有何区别](https://mp.weixin.qq.com/s/MzpUROCRYPpwOycI2sz3lQ)

- [React hooks 最佳实践【更新中】](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247488110&idx=1&sn=f7c142fb65259f22773bb2bad4ccf8ca&chksm=ea0d5894dd7ad18236c174f1b5776f933473c7d6e3d3f95b3f57516d5594552ad7414198d1f4&scene=126&sessionid=1617017984&key=74e411ceb40c53ecceeb837c57022e68713e07c93481427e7e48bce03a829b9867bfe6e59e4db1e1b7bcf1db392c63aecc4ac96c0d04c594bf4f1dcaadb7e77fc37f8e6cb0405ba447bbd29ac158bdfe5f8d98515a27c910f031d65e34617eaa75ab601ef2a0780a16db37bc7c58280e68401ba0ae105a59274bb9a0ed6d1d16&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090070&lang=zh_CN&exportkey=ATPQQ5EDyogKCw2h%2BuLo8yA%3D&pass_ticket=rOrDQ7aYmbIfx6AGR%2BUc8RcjMfmD7fSjUCfVAc87kvPd%2BMLrrXll%2BmIbzLV5R7OT&wx_header=0)

- [React Hooks 万字总结](https://juejin.cn/post/6948748617817522206)

- [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

- [你可能不知道的五个关键的 React 知识点](https://mp.weixin.qq.com/s/Brp0TECsGpdBdv1686TPiQ)

- [「React万字基础全面剖析」](https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w)

- [Separation of concerns with React hooks](https://felixgerschau.com/react-hooks-separation-of-concerns/)

- [如何去合理使用 React hook？](https://www.zhihu.com/question/357020049/answer/909484669?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128&utm_content=group2_Answer&utm_campaign=shareopn)

  

  

- 




