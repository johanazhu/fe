# React Hook 从认识到手写



> 学习一项知识，必须问自己三个重要问题：1. 它的本质是什么。2. 它的第一原则是什么。3. 它的知识结构是怎样的



## 前言

React hook 必会，必考题。现在一个 React 开发要不会 Hook 的话，很难说自己是一名合格的开发者，Hook 问世已经3年了（18年出品），同仁出的教程数不胜数，这里做我对 Hook 的认识和理解



## 大纲

测试一下 Hook 的熟练程度

是什么

- 为什么要有 Hook
  - 状态逻辑复用

- 发展史
  - Mixin 
  - HOC
- Hook 的设计目标

最重要且常见的两个 Hook

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

为什么不能在 for 循环、if 语句里使用 Hook

React.memo、React.useCallback、React.usememo 的作用

useState 中的值是个对象，改变对象中的值，组件会渲染吗？如果用 React.memo() 包裹住呢

能否口喷 Hook 的原理是什么

你对 Hook 了解吗？Hooks 的本质是什么？为什么？

React Hook，它带来了哪些便利

列举几个常用的 Hook

说下 React Hook 实现原理

React Hook 当中的 useEffect 是如何区分生命周期钩子的

useEffect(fn, []) 和 componentDidMount 有什么差异



-----

回答的如何？如果一知半解请随我看一下我对它的认识

## 是什么

React Hook 是 React 16.7.0-alpha（真正推出是 React 16.8）推出的新特性。它可以让你再不编写 class 的情况下使用 state 以及其他的 React 特性

### 为什么要有 Hook

我们一定要有个概念，即 React 的本质是什么？它的特征 UI=f(data)、一切皆组件、声明式编程。那好，它既然是 UI=f(data)，data（数据）通过 function 来驱动 UI 视图变化，之前了解 [setState](./快问快答setState.md) 时我们就说了，setState 是来管理状态的，因为在一个视图，你不能简单只展示，也要交互，交互就有状态的改变，React 是通过 setState 来改变状态。但 setState 是类组件中的API，而每一个类组件写起来很麻烦，需要加各种生命周期。在函数式组件中，是没有状态的，一般当做渲染（无状态组件）

说了这么多，那为什么要有 Hook 呢？因为**状态逻辑复用**。我们先了解下状态逻辑复用的发展史

### 发展史

#### Mixin时代

在我还没用 React 之前就有了，现在已经被淘汰。

> Mixin（混入）是一种通过扩展收集功能的方式，它本质上是将一个对象的属性拷贝到另一个对象上，不过你可以拷贝`任意多`个对象的`任意个`方法到一个新对象上去，这是`继承`所不能实现的。它的出现主要就是为了解决代码复用问题

这里不对其做分析，React官方文档在 [Mixins Considered Harmful](https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) 一文中提到了 Mixin 带来的危害：

- Mixin 可能会相互依赖，相互耦合，不利于代码维护
- 不同的 Mixin 中的方法可能会相互冲突
- Mixin 非常多时，组件时可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球的复杂性

#### HOC（高阶组件）

HOC的原理其实很简单，它就是一个函数，且它接受一个组件作为参数，并返回一个新的组件，把复用的地方放在高阶组件中，你在使用的时候，只需要做不同

打个比方：就好像我给你一瓶水，你在渴的时候就会喝它；你在耍帅的时候拿它摆POSE；你在别人需要的时候给他喝帮助人...

write is cheap，show you code

```react
function Wrapper(WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            console.log('我是一瓶水')
        }
        render() {
            return (
                <div>
                    <div className="title">{this.props.title}</div>	
                    <WrappedComponent {...this.props} />
                </div>	
            )
        }
    }
}
```

```react
import "./styles.css";
import React from "react";
import Wrapper from "./Wrapper";

class A extends React.Component {
  render() {
    return <div>喝它</div>;
  }
}

class B extends React.Component {
  render() {
    return <div>耍帅摆POSE</div>;
  }
}

class C extends React.Component {
  render() {
    return <div>帮助别人</div>;
  }
}

const AA = Wrapper(A);
const BB = Wrapper(B);
const CC = Wrapper(C);

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <AA title="我是普通人" />
      <BB />
      <CC />
    </div>
  );
}

```

这样就很明显的看出 HOC 的好处，”一瓶水“是共同代码，A、B、C处理业务代码，然后将A、B、C传入HOC（一瓶水）中，返回了一个新的组件 AA、BB、CC。相同的代码得到了公用

![HOC-demo](https://i.loli.net/2021/09/17/q7vQpZwIngNc3C2.png)

各位可以前往这里查看 [demo](https://codesandbox.io/s/hoc-demo-d9p9j?file=/src/App.js:0-629)

HOC 的用处不单单是代码复用，还可以做权限控制、打印日志等。但它有也缺陷，例如 HOC 是在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这会让调试变得非常困难；而且HOC 可以劫持 props，在不遵守约定的情况下可能造成冲突

### Hook 的设计目标

我们了解了 React 状态逻辑复用的发展史，结合类组件带来的不便。我们希望 React Hook 能这样的：

1. 无 Class 的复杂性
2. 无生命周期的困扰
3. 优雅地复用
4. 对其 Class 组件已经具备的能力



## 最重要且常见的两个 hooks

### useState















### useEffect

它是什么

#### 与 useLayoutEffect 的区别





```react
// 用来替代constructor初始化状态
useState()

// 替代 componentDidMount和componentDidUpdate以及componentWillUnmount
// 统一称为处理副作用
useEffect()

// 替代shouldComponent
useMemo（）
```





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









## 使用规则

Hooks 的本质就是 JavaScript 函数，在使用它时需要遵守[两条规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

### 只在最顶层使用 Hook

**不要在循环，条件或嵌套函数中调用 Hook**，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确

### 只在 React 函数中调用 Hook

不要再普通的 JavaScript 函数中调用 Hook，你可以：

- 在 React 的函数组件中调用 Hook
- 在自定义 Hook 中调用其他 Hook











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

  

  



