# React 快速了解

## 是什么

用于构建用户界面的 JavaScript 库

facebook 做的一个 UI 库

React 英语意思：响应

## 特点

声明式

组件化

一次学习，跨平台编写

最好的学习资料在[官网](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)

React 的作者的 [blog](https://overreacted.io/) ，上面有很多易错点以及原理解答，很好的学习资料

## 哲学

单向数据流

不可变特性（immutability）

## 本质

主要有三个特征

-   UI = f(data)
    -   贯彻了一套公式
    -   改变 data，驱动 function，从而改变 UI
        -   data 即我们所说的 props 和 state
-   一切都是组件

    -   页面是组件，路由也是组件，错误边界也是组件...

-   声明式编程

    -   对比 JQuery
        -   JQuery 是命令式的库，直接操作 dom，我拿到这个 dom，我要去干什么
        -   React 是声明式的库，写好一个组件，UI 就展示成什么样

## 执行过程

我们用 JSX 来写 React，JSX 会通过 babel 将其代码转换成 React.createElement 的形式，React.createElement 返回的是一个对 DOM 的描述，并不是真正的 DOM，这个叫 Virtual DOM。

当某一时刻调用 React 的 `render()` 方法，会创建一颗由 React 元素组成的树，在下一次 props 或 state 更新时，相同的 `render()` 方法会返回一颗不同的树。React 需要基于这两颗树之间的差异来判断如何高效更新 UI，这也就是 diff。

说到 diff，此概念在 [Git](../Git/) 中也有过，不过 diff 的算法与 React 不同，在 Git 中时间复杂度为 O(n2)，但是在 React 里，最优的算法的时间复杂度仍为 O(n3)

所以 React 在以下两个假设的基础上提出了一套 O(n) 的启发式算法

1. 两个不同类型的元素会产生出不同的树
2. 开发者可以通过设置 key 属性，来告知渲染哪些子元素在不同的渲染树下可以保持不变

其第一点，不同类型的元素会产生不同的树，React 发现组件的类型不同时，直接重绘新的组件，而不去在做 diff。第二点即可理解为动态产生的组件需要设置 key。

### Render

Class 中的 Render 方法是个纯函数，不做任何直接渲染的事情。只是返回了一些指令，由 React 对这些指令做真正的 DOM 操作

JSX 其实是 `React.createElement(compoent, props,...children)` 函数的语法糖。如下 JSX 代码：

```jsx
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>
```

会编译为：

```javascript
React.createElement(MyButton, { color: 'blue', shadowSize: 2 }, 'Click Me');
```

[在线 Babel 编译器](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.15.5&externalPlugins=&assumptions=%7B%7D) 可以玩一玩

## 参考资料

-   [React 官网](https://zh-hans.reactjs.org)
-   [帮助你深入理解 React](https://www.zhihu.com/lives/883022235516960768)
-   [Live - 帮助你深入理解 React](https://www.xbroder.com/2018/08/19/react-zhihu-live/)
