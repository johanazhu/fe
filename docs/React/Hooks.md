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

你对 Hooks 了解吗？Hooks 的本质是什么？为什么？

为什么不能在循环中调用 hooks？或者说为什么不能在 for 循环、if 语句里使用 hooks？

React hooks，它带来了哪些便利

列举几个常用的 Hook

说下 React hooks 实现原理

React Hooks 当中的 useEffect 是如何区分生命周期钩子的

 useEffect(fn, []) 和 componentDidMount 有什么差异





```react
// 用来替代constructor初始化状态
useState()

// 替代 componentDidMount和componentDidUpdate以及componentWillUnmount
// 统一称为处理副作用
useEffect()

// 替代shouldComponent
useMemo（）
```







## 是什么

React Hooks 是 React `16.7.0-alpha` 版本推出的新特性.

React Hooks 要解决的问题是状态共享，是继 [render-props](https://zh-hans.reactjs.org/docs/render-props.html#gatsby-focus-wrapper) 和 [higher-order components](https://zh-hans.reactjs.org/docs/higher-order-components.html#use-hocs-for-crossing-cutting-concerns) 之后的第三种状态共享方案，不会产生 JSX 嵌套地狱问题

> Render props  是一个用于告知组件需要渲染什么内容的函数 props
>
> 不一定要用名为 render 的prop 来使用这种模式。任何被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 render prop
>
> 自己的话：父组件控制要渲染什么内容



用来定义有状态和生命周期函数的纯函数组件（在过去纯函数组件是没有状态和生命周期函数的）



## 有什么用

让函数式组件拥有状态，更符合函数式编程理念



## 使用规则

Hooks 的本质就是 JavaScript 函数，在使用它时需要遵守[两条规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

### 只在最顶层使用 Hook

**不要在循环，条件或嵌套函数中调用 Hook**，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确

### 只在 React 函数中调用 Hook

不要再普通的 JavaScript 函数中调用 Hook，你可以：

- 在 React 的函数组件中调用 Hook
- 在自定义 Hook 中调用其他 Hook





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



先说结论 useCallback 和 useMemo 都可缓存函数的引用或值，但是从更细的实用角度来说，useCallback 缓存函数的引用，useMemo 缓存计算数据的值



### useMemo

渲染一个组件，会将内部的方法重新执行，这个操作是没有闭包的，消耗无关的性能。

使用useMemo来优化

传入 `useMemo` 的函数会在渲染期间执行，



默认情况下，如果React 父组件重新渲染，它包含的所有子组件都会重新渲染，即使子组件没有任何变化。

React.memo() 方法可以防止子组件不必要渲染，从而提供组件性能。



### useCallback

useCallback 钩子是专门为传递给子组件的回调函数设计的，可以避免不必要的重新创建这些函数，重新创建这些函数的过程会再每次重渲染时引起性能问题

`useMemo` 和 `useCallback` 接受的参数都是一样，都是在其依赖项发生变化后执行，都是返回缓存的值，区别在于 `useMemo` 返回的是函数运行的结果，`useCallback` 返回的是函数

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)



### React.memo

只有当 props 改变时会重新渲染子组件

[demo](https://codesandbox.io/s/laughing-shamir-5nx7p?file=/src/App.js)



### useCallback 和 useMemo

相同点：useCallback 和 useMemo 都是性能优化的手段，类似于类组件的 shouldComponentUpdate，在子组件中使用 shouldComponentUpdate，判断该组件的 props 和 state 有没有变化，从而避免每次父组件 render 时重新渲染子组件

区别：useCallback 和 useMemo 的区别是 useCallback 返回一个函数，当把它返回的这个函数作为子组件使用时，可以笔名每次父组件更新时重新渲染这个子组件

```react
const renderButton = useCallback(
     () => (
         <Button type="link">
            {buttonText}
         </Button>
     ),
     [buttonText]    // 当buttonText改变时才重新渲染renderButton
);
```

useMemo 返回的是一个值，用于避免在每次渲染时都进行高开销的计算

```react
// 仅当num改变时才重新计算结果
const result = useMemo(() => {
    for (let i = 0; i < 100000; i++) {
      (num * Math.pow(2, 15)) / 9;
    }
}, [num]);
```



### 什么时候使用

别人导师说：任何时候都用是一个好的习惯，但是大部分时间不用也没什么大问题。**但是如果该函数或变量作为 props 传给子组件，请一定要用，避免子组件的非必要渲染**



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

- [无意识设计-复盘React Hook的创造过程](https://github.com/shanggqm/blog/issues/4)

- [【React深入】从Mixin到HOC再到Hook](https://juejin.cn/post/6844903815762673671)

- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

- [useCallback、useMemo 分析以及差别](https://juejin.im/post/5dd64ae6f265da478b00e639)

- [十个案例学会 React Hooks](https://github.com/happylindz/blog/issues/19)

- [React Hooks 原理](https://github.com/brickspert/blog/issues/26)

- [useEffect, useCallback, useMemo三者有何区别](https://mp.weixin.qq.com/s/MzpUROCRYPpwOycI2sz3lQ)

- [React hooks 最佳实践【更新中】](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247488110&idx=1&sn=f7c142fb65259f22773bb2bad4ccf8ca&chksm=ea0d5894dd7ad18236c174f1b5776f933473c7d6e3d3f95b3f57516d5594552ad7414198d1f4&scene=126&sessionid=1617017984&key=74e411ceb40c53ecceeb837c57022e68713e07c93481427e7e48bce03a829b9867bfe6e59e4db1e1b7bcf1db392c63aecc4ac96c0d04c594bf4f1dcaadb7e77fc37f8e6cb0405ba447bbd29ac158bdfe5f8d98515a27c910f031d65e34617eaa75ab601ef2a0780a16db37bc7c58280e68401ba0ae105a59274bb9a0ed6d1d16&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090070&lang=zh_CN&exportkey=ATPQQ5EDyogKCw2h%2BuLo8yA%3D&pass_ticket=rOrDQ7aYmbIfx6AGR%2BUc8RcjMfmD7fSjUCfVAc87kvPd%2BMLrrXll%2BmIbzLV5R7OT&wx_header=0)

- [React Hooks 万字总结](https://juejin.cn/post/6948748617817522206)

- [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

- [「React万字基础全面剖析」](https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w)

- [Separation of concerns with React hooks](https://felixgerschau.com/react-hooks-separation-of-concerns/)

- [如何去合理使用 React hook？](https://www.zhihu.com/question/357020049/answer/909484669?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128&utm_content=group2_Answer&utm_campaign=shareopn)

- [使用 React.memo() 提高组件性能](https://alexsidorenko.com/blog/react-render-always-rerenders/)

  

  



