# React Hooks 详解

> 学习一项知识，必须问自己三个重要问题：1. 它的本质是什么。2. 它的第一原则是什么。3. 它的知识结构是怎样的

## 大纲

测试一下 Hook 的熟练程度

是什么

-   为什么要有 Hook

    -   状态逻辑复用

-   发展史
    -   Mixins
    -   HOC
-   Hook 的设计目标
    -   类组件的缺点
    -   Hooks带来的好处


各个 Hooks 

-   useState（状态）
-   useEffect（副作用）
    -   与 useLayoutEffect 的区别
-   useContext（上下文）
-   useReducer（Redux）
-   [useMemo（记忆）以及useCallback（回调）](./useCallback和useMemo)
-   [Ref以及useRef](./Ref以及useRef)
-   [Hooks 踩坑](./Hooks踩坑)
-   [Hooks实现原理](./Hooks实现原理)
-   [手写自定义Hooks](./手写自定义Hooks)

附录：使用规则



## 测试一下 Hooks 的熟练程度

为什么不能在 for 循环、if 语句里使用 Hook

React.memo、React.useCallback、React.usememo 的作用

useState 中的值是个对象，改变对象中的值，组件会渲染吗？如果用 React.memo() 包裹住呢

能否口喷 Hook 的原理是什么

Hooks 的本质是什么？为什么？

React Hook，它带来了哪些便利？

说下 React Hook 实现原理

React Hook 当中的 useEffect 是如何区分生命周期钩子的

useEffect(fn, []) 和 componentDidMount 有什么差异

---

回答的如何？在了解一个概念前，疑惑越多，认识就越深

## 是什么

React Hook 是 React 16.8 推出的新特性。它可以让你再不编写 class 的情况下使用 state 以及其他的 React 特性

### 为什么要有 Hook

我们一定要有个概念，即 React 的本质是什么？它的特征是 UI=f(data)、一切皆组件、声明式编程。那好，它既然是 UI=f(data)，data（数据）通过 function 来驱动 UI 视图变化，之前了解 [setState](./快问快答setState.md) 时我们就说了，setState 是来管理状态的，因为在一个视图，你不能简单只展示，也要交互，交互就有状态的改变，React 是通过 setState 来改变状态。但 setState 是类组件中的 API，而每一个类组件写起来很麻烦，需要加各种生命周期，写一个组件为了是麻烦的，再加上各种优化会更麻烦。在函数式组件中，是没有状态的，一般当做渲染（无状态组件）

[官网](https://zh-hans.reactjs.org/docs/hooks-intro.html#motivation)也曾经说过设计 Hooks 的动机有三：

> 1. 在组件之间复用状态逻辑很难
> 2. 复杂组件变得难以理解
> 3. 难以理解的 class

我们先了解下状态逻辑复用的发展史

### 发展史

#### Mixins 时代

在我还没用 React 之前就有了，现在已经被淘汰。

> Mixins（混入）是一种通过扩展收集功能的方式，它本质上是将一个对象的属性拷贝到另一个对象上，不过你可以拷贝`任意多`个对象的`任意个`方法到一个新对象上去，这是`继承`所不能实现的。它的出现主要就是为了解决代码复用问题

这里不对其做分析，React 官方文档在 [Mixins Considered Harmful](https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) 一文中提到了 Mixins 带来的危害：

-   Mixins 可能会相互依赖，相互耦合，不利于代码维护
-   不同的 Mixins 中的方法可能会相互冲突
-   Mixins 非常多时，组件时可以感知到的，甚至还要为其做相关处理，这样会给代码造成滚雪球的复杂性

#### HOC（高阶组件）

HOC 的原理其实很简单，它就是一个函数，且它接受一个组件作为参数，并返回一个新的组件，把复用的地方放在高阶组件中，你在使用的时候，只需要做不同用处

打个比方：就好像我给你一瓶水，你在渴的时候就会喝它；你在耍帅的时候拿它摆 POSE；你在别人需要的时候给他喝帮助人...

各位可以前往这里查看 [demo](https://codesandbox.io/s/hoc-demo-d9p9j?file=/src/App.js:0-629)

HOC 的用处不单单是代码复用，还可以做权限控制、打印日志等。但它有也缺陷，例如 HOC 是在原组件上进行包裹或者嵌套，如果大量使用 HOC，将会产生非常多的嵌套，这会让调试变得非常困难；而且 HOC 可以劫持 props，在不遵守约定的情况下可能造成冲突

总结下 HOC：

1. 创建一个函数，该函数接收一个组件作为输入，除了组件还可以传递其他的参数
2. 基于该组件返回一个不同的组件
3. 它是将通用的逻辑进行处理，但会因为嵌套，使得调试难度变高

### Hook 的设计目标

我们了解了 React 状态逻辑复用的发展史，结合类组件带来的不便。我们希望 React Hook 能这样的：

1. 无 Class 的复杂性
2. 无生命周期的困扰
3. 优雅地复用
4. 对其 Class 组件已经具备的能力

#### 类组件的缺点

- 代码量多


- this 指向：需要考虑 this 的指向问题


- 组件难以维护


- 状态逻辑难复用
  - 在组件之间复用状态逻辑很难，可能要用到 render props（渲染属性）或者 HOC（高阶组件），但无论时渲染属性还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），导致层级冗余

#### Hooks 带来的好处

- 逻辑复用


- 业务代码更聚合


- 写法简洁

  -  这个不用多说，写个 class 组件，需要写各种生命周期，如果优化，还需要在 shouldComponentUpdate 做渲染判断，但是函数式组件的 useMemo、memo 比 shouldComponentUpdate 不知道简洁到那里去


## 各种 Hooks 

### useState

作用：让函数组件具有维持状态的能力

函数组件本身就是一个函数，不是类，因此没有构造函数 constructor(props)

任何你想定义的变量都可以单独拆分出去，独立定义，互不影响

在使用 useState 时，就会蹦出一个常见的面试题，[函数式组件与类组件有何不同](./函数式组件与类组件有何不同.md) ，函数式组件能捕获渲染时的值

### 注意事项

1.不可局部更新

- 如果 state 是一个对象，能否部分更新，不能
- setState 不会帮我们合并属性，可使用 展开运算符（...）来解决
- useReducer 也不会合并属性

2.地址要变

- setState(obj) 如果 obj 地址不变，那么 React 就认为数据没有变化

3.useState 和 setState 都接受函数

- setState(i => i + 1)



### useEffect

作用：执行副作用

> PS：什么是副作用？对环境的改变就是副作用

每一次渲染都有它自己的 props 和 state

用途：

- 作为 componentDidMount 使用，[] 作为第二个参数
- 作为 componentDidUpdate 使用，可指定依赖
- 作为 componentWillUnmount 使用，通过 return

如果同时存在多个 useEffect，会按照出现次序执行

在我们讨论 effects 之前，我们需要先讨论一下渲染（rendering）

我们来看一个计数器组件 Counter

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```

我们的组件第一次渲染的时候，从`useState()`拿到`count`的初始值`0`。当我们调用`setCount(1)`，React 会再次渲染组件，这一次`count`是`1`。如此等等：

```jsx
// During first render
function Counter() {
    const count = 0; // Returned by useState()
    // ...
    <p>You clicked {count} times</p>;
    // ...
}

// After a click, our function is called again
function Counter() {
    const count = 1; // Returned by useState()
    // ...
    <p>You clicked {count} times</p>;
    // ...
}

// After another click, our function is called again
function Counter() {
    const count = 2; // Returned by useState()
    // ...
    <p>You clicked {count} times</p>;
    // ...
}
```

当我们更新状态的时候，React 会重新渲染组件。每一次渲染都能拿到独立的 count 状态，这个状态值是函数中的一个常量

#### 每一次渲染都有它自己的事件处理函数

到目前为止一切都还好。那么事件处理函数呢？

看下面的这个例子。它在三秒后会 alert 点击次数`count`：

```jsx
function Counter() {
    const [count, setCount] = useState(0);

    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000);
    }

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <button onClick={handleAlertClick}>Show alert</button>
        </div>
    );
}
```

如果我按照下面的步骤去操作：

-   点击增加 counter 到 3
-   点击一下“Show alert”
-   点击增加 counter 到 5 并且在定时器回调触发前完成

渲染的是 3，捕获当前的值

它究竟是如何工作的呢？

我们发现 count 在每一次函数调用中都是一个常量值。值得强调的是——我们的组件函数每次渲染都会被调用，但是每一次调用中 count 值都是常量，并且它被赋予了当前渲染中的状态值

这就解释了我们的事件处理函数如何捕获点击时候的 count 值。如果我们应用相同的替换原理，每一次渲染“看到”的是它自己的 count

```jsx
// During first render
function Counter() {
    const count = 0; // Returned by useState()
    // ...
    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000);
    }
    // ...
}

// After a click, our function is called again
function Counter() {
    const count = 1; // Returned by useState()
    // ...
    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000);
    }
    // ...
}

// After another click, our function is called again
function Counter() {
    const count = 2; // Returned by useState()
    // ...
    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count);
        }, 3000);
    }
    // ...
}
```

所以实际上，每次渲染都有一个“新版本”的 handleAlertClick。每一个版本的 handleAlertClick “记住”了它自己的 count

### useLayoutEffect 

名曰：布局副作用

它与 useEffect 常做对比，两者执行时机不同、性能影响不同、使用场景也不同

- useEffect 会异步执行
  - 在 commit 阶段的 before mutation 阶段调用，但是会在 layout 阶段完成后才异步执行
  - 所以它不会阻塞浏览器的绘制
  - **在浏览器渲染完成后执行**
- useLayoutEffect 是同步执行
  - 在 commit 阶段的 layout 阶段同步执行
  - 等价于类组件中的 componentDidMount
  - 可以读取并同步修改 DOM，确保 DOM 的变化在用户看到之前完成
  - 所以它会阻塞浏览器的绘制
  - **在浏览器渲染前执行**

#### 示意图

```javascript
APP() --> React.element --> VDOM --> DOM --> 修改视图
```

`useLayoutEffect` 发生在 DOM 和 修改视图 阶段之间

`useEffect` 发生在修改 DOM 之后

#### 总结

简单来说，useLayoutEffect 总是比 useEffect 先执行

为了用户体验，优先使用useEffect（优先渲染）

### useReducer

用来践行 Flux/Redux 的思想

看代码，公分4步走

一：创建初始值 initialState

二、创建所有操作 reducer(state, action)

三、传给 useReducer，得到读和写 API

四、调用写`({ type: "操作类型"})`

总的来说 useReducer 是 useState 的复杂版



### useContext

上下文

全局变量是全局的上下文

上下文是局部的全局变量

使用方法

一、使用 `const context = createContext(null)` 创建上下文

二、使用 `<Contet.Provider value={{ state, setState }}>` 圈定作用域

三、在作用域内使用 `useContext` 消费上下文





## 附录：使用规则

Hooks 的本质就是 JavaScript 函数，在使用它时需要遵守[两条规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

> ### 只在最顶层使用 Hook
>
> **不要在循环，条件或嵌套函数中调用 Hook**，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确
>
> ### 只在 React 函数中调用 Hook
>
> 不要再普通的 JavaScript 函数中调用 Hook，你可以：
>
> -   在 React 的函数组件中调用 Hook
> -   在自定义 Hook 中调用其他 Hook

## 参考资料

-   [【React 深入】从 Mixin 到 HOC 再到 Hook](https://juejin.cn/post/6844903815762673671)

-   [useEffect 完整指南](https://overreacted.io/a-complete-guide-to-useeffect/)

-   [useCallback、useMemo 分析以及差别](https://juejin.im/post/5dd64ae6f265da478b00e639)

-   [十个案例学会 React Hooks](https://github.com/happylindz/blog/issues/19)

-   [useEffect, useCallback, useMemo 三者有何区别](https://mp.weixin.qq.com/s/MzpUROCRYPpwOycI2sz3lQ)

-   [React hooks 最佳实践【更新中】](https://mp.weixin.qq.com/s?__biz=MzI1ODE4NzE1Nw==&mid=2247488110&idx=1&sn=f7c142fb65259f22773bb2bad4ccf8ca&chksm=ea0d5894dd7ad18236c174f1b5776f933473c7d6e3d3f95b3f57516d5594552ad7414198d1f4&scene=126&sessionid=1617017984&key=74e411ceb40c53ecceeb837c57022e68713e07c93481427e7e48bce03a829b9867bfe6e59e4db1e1b7bcf1db392c63aecc4ac96c0d04c594bf4f1dcaadb7e77fc37f8e6cb0405ba447bbd29ac158bdfe5f8d98515a27c910f031d65e34617eaa75ab601ef2a0780a16db37bc7c58280e68401ba0ae105a59274bb9a0ed6d1d16&ascene=1&uin=MTA0NTY0NDM2MQ%3D%3D&devicetype=Windows+10+x64&version=62090070&lang=zh_CN&exportkey=ATPQQ5EDyogKCw2h%2BuLo8yA%3D&pass_ticket=rOrDQ7aYmbIfx6AGR%2BUc8RcjMfmD7fSjUCfVAc87kvPd%2BMLrrXll%2BmIbzLV5R7OT&wx_header=0)

-   [React Hooks 万字总结](https://juejin.cn/post/6948748617817522206)

-   [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

-   [「React 万字基础全面剖析」](https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w)

-   [Separation of concerns with React hooks](https://felixgerschau.com/react-hooks-separation-of-concerns/)

-   [如何去合理使用 React hook？](https://www.zhihu.com/question/357020049/answer/909484669?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128&utm_content=group2_Answer&utm_campaign=shareopn)

-   [使用 React.memo() 提高组件性能](https://alexsidorenko.com/blog/react-render-always-rerenders/)
