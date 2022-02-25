# 常见面试题



知乎上有个问题：[如果进阿里前端，代码能力得达到什么程度？](https://www.zhihu.com/question/29191974/answer/1620274467)

阿里官方的回答中，如果是个数量掌握 React 前端框架，了解技术底层的话，中高级的要求点是：

- 能说明白为什么要实现fiber，以及可能带来的坑
- 能说明白为什么要实现hook
- 能说明白为什么要用immutable，以及用或者不用的考虑
- 知道react不常用的特性，比如context，portal
- 能用自己的理解说明白react like框架的本质，能说明白如何让这些框架共存
- 能设计出框架无关的技术架构。包括但不限于：
- 说明如何解决可能存在的冲突问题，需要结合实际案例。
- 能说明架构分层逻辑、各层的核心模块，以及核心模块要解决的问题。能结合实际场景例举一些坑或者优雅的处理方案则更佳
- 看过全家桶源码，不要求每行都看，但是知道核心实现原理和底层依赖。能口喷几行关键代码把对应类库实现即达标
- 能从数据驱动角度透彻的说明白 redux，能够口喷原生 js 和 redux 结合要怎么做
- 能结合 redux，vuex，mobx 等数据流谈谈自己对 vue 和 react 的异同
- 有基于全家桶构建复杂应用的经验，比如最近很火的微前端和这些类库结合的时候要注意什么，会有什么坑，怎么解决

一看，我就慌的一批，这就是中高级前端的标准，你达标了吗？

## 常见问题

### Q：渲染十万条数据解决方案

A：[渲染十万条数据解决方案](./渲染十万条数据解决方案.md)

### Q：请问 Fiber 是什么？

A： React Fiber 是对核心算法的一次重新实现。16和15的区别，如下。它有三层含义，作为架构，作为静态数据结构，作为动态工作单位

### Q： React Fiber 和之前的 15 有什么区别

A： React 在 V16 之前会面临的主要性能问题是：当组件很庞大时，更新状态可能造成页面卡顿，更笨原因在于——更新流程是【同步、不可中断的】

为了解决这个问题，React 重写了代码，提出了 Fiber 架构，它是异步可中断的

## Q：函数式组件和类组件有什么区别

A：最大的区别在于函数式组件会捕获渲染时的值

具体可以看这篇文章——[函数式组件与类组件有何不同](../函数式组件与类组件有何不同.md)



## 组件

### Q：函数式组件与 class 组件的区别

A：最大的区别在于函数式组件会捕获渲染时的值

具体可以看这篇文章——[函数式组件与类组件有何不同](../函数式组件与类组件有何不同.md)

### Q： React 有哪几种创建组件的方式？有什么区别

A：函数式组件、类组件、createElement

PS：这个问题已经淘汰，以前的函数组件是没有状态的，但现在16.8之后就有 hook，函数式组件也有状态；反而类组件没多少人写了，因为生命周期很麻烦，也难记

### Q： React 组件间有哪些通讯方式？

A：四种，父传子（props），子传父（props回调），跨组件（context），非嵌套组件通信（事件订阅）

### Q：父组件如何调用子组件中的方法？

A：一般都是子组件调用父组件的方法，那有什么办法让父组件调用子组件的方法？分两种场景

- 类组件
  - createRef
- 函数式组件
  - forwardRef + useImperativeHandle

### Q： React是如何区分class和function的？

A：在 Component 的 prototype 上有 isReactComponent ，函数式组件没有

```javascript
// React 内部
class Component {}
Component.prototype.isReactComponent = {}
```



## 性能优化

### Q：在 React 中可以做哪些性能优化

列表项使用 key 属性

类组件

函数式组件

其他方式

A：主要用React.memo、React.useCallback、React.usememo 的作用

### Q：请问 React/ Vue 之类的框架为什么需要给组件添加 key 属性，其作用是什么？

A：唯一性，diff 算法



## state & setState

### Q：请问 setState 是异步还是同步？为什么？

A：代码是同步的，但是渲染要看模式，在legacy模式下，非原生事件、setTimeout/setInterval 等情况下为异步；addEventListener 绑定的原生事件、setTimeout/setInterval 同步；而在未来的concurrent 模式下（V18模式使用），都为异步

为什么？为了提高性能，React会采用批处理的方案

### Q：什么事件可以触发异步，什么会触发同步？

A：非原生事件、非setTimeout/setInterval 会触发异步；原生事件、setTimeout/setInterval 会触发同步 

### Q：调用 setState 之后发生了什么

A：（在legacy模式下）调用setState 后，会将修改的回调函数放入执行队列中，当此事件中的setState全部调用完，会批处理合成setState，并依次触发static getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate等生命周期

### Q：在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState 会发生什么？

A：禁止在  shouldComponentUpdate 和 componentWillUpdate 中调用 setState，为什么，这回造成循环调用，直至内存崩溃。 setState 会触发 React 的更新机制，好让视图更新，会依次触发生命周期函数，而 shouldComponentUpdate 、componentWillUpdate 都是必过的生命周期，会造成循环调用（PS： componentWillUpdate 未来版本会不用）

### Q：为什么不能直接使用 this.state 改变数据

A：修改值不改变视图，setState不仅是修改 this.state 的值，更重要的是它会触发 React 的更新机制，会进行 diff，然后将 patch 部分更新到真实 DOM 中



## Hooks

### Q：你对 Hooks 了解吗？Hooks 的本质是什么？为什么？

A：

### Q：为什么不能在循环中调用 hooks？或者说为什么不能在 for 循环、if 语句里使用 hooks？

A：

### Q： React hooks，它带来了哪些便利

A：

### Q：列举几个常用的 Hook

A：

### Q：说下 React hooks 实现原理

A：

### Q： React Hooks 当中的 useEffect 是如何区分生命周期钩子的

A：

### Q： useEffect(fn, []) 和 componentDidMount 有什么差异

A：

### Q: hooks 和 hoc 的区别，为什么不用 hoc

A:	

### Q: useMemo，useCallback的区别，你是如何看待这两个 api 的意义，在什么场景下会使用它

A:



## Virtual DOM

### Q： React 的 Virtual dom 是怎么实现的？

A：

### Q：考虑过 React 、 Vue 这类的框架为什么要用 Virtual DOM 机制吗？

A：

### Q：为什么 Virtual dom 会提高性能？

A：



## diff 

### Q：简单介绍下 diff 算法

A：





## React中的事件机制

### Q：简述下 React 的事件代理机制

A：

### Q： React 的事件代理机制和原生事件绑定有什么区别？

A：

### Q： React 的事件代理机制和原生事件绑定混用会有什么问题？

A：

### Q： React 中如果绑定事件使用匿名函数会怎么样？

A：



## 生态相关

### Q： Redux 是什么

A：

### Q：请求 Redux 的原理是什么？你能手写一个 Redux 吗？

A：

### Q： React-redux 的实现原理

A：

### Q： Redux 和 mobx 的区别

A：

### Q： Redux 异步中间件有什么用？

A：

### Q：请问 React.Router 的模式

A：共三种模式，手写一个

### Q：请问 Dva 的知识点？与 namespce 同层的参数有哪些？

A：



## 生命周期

### Q：简述下 React 的生命周期？每个声明周期都做了什么？

A：

### Q：聊聊 React 16.4 + 的生命周期

A：



## 其他

### Q：请问 React 从本页面跳转至其他站点页是否会执行 unmount？为什么

A：

### Q：请问 React 中的 错误捕获

A：转 异步捕获 方面

### Q：错误边界是什么？它有什么用？

A：





### Q：为什么 constructor 里要调用 super 和传递 props？

A：这是官网的一段代码，具体见：[状态（State） 和 生命周期](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)

```jsx
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
        	<div>
                <h1>Hello, World!</h1>
                <h2>It is {this.state.date.toLocalTimeString()}</h2>
            </div>
        )
    }
}
```

而且有这么一段话，不仅让我们调用 `super` 还要把 `props` 传递进去，但是没有告诉我们为什么要这么做。

不知道你有没有疑惑为什么要调用 `super` 和传递 `props`，接下来我们来揭开谜题吧

**为什么要调用 super**

其实这不是 React 的限制，这是 JavaScript 的限制，在构造函数里如果要调用 this，那么提前就要调用 super，在 React 里，我们常常会在构造函数里初始化 state ，`this.state = xxx` ,所以需要调用 super

**为什么要传递 props**

你可以能以为必须给 `super` 传入 `props` ,否则 `React.Component` 就没办法初始化 `this.props`

```javascript
class Component {
    constructor(props) {
        this.props = props;
        // ...
    }
}
```

不过，如果你不小心漏传了 `props` ，直接调用了 `super()` ，你仍然可以在 `render` 和其他方法中访问 `this.props` 

难道这样也行？**因为 React 会在构造函数被调用之后，会把 props 赋值给刚刚创建的实例对象**

```javascript
const instance = new YourComponent(props);
instance.props = props;
```

`props` 不传也能用，是有原因的。

但这意味着你在使用 React 时，可以用 `super()` 代替 `super(props)` 了么？

那还是不行的，不然官网也不会建议你调用 props 了，虽然 React 会在构造函数运行之后，为 `this.props` 赋值，但在 `super()` 调用之后与构造函数结束之前， `this.props` 仍然是没法用的

```javascript
class Component {
    constructor(props) {
        this.props = props;
        // ...
    }
}
class Button extends React.Component {
    constructor(props) {
        super(); // 没有传入 props
        console.log(props) // {}
        console.log(this.props) // undefined
    }
}
```

要是构造函数中调用了某个访问 `props` 的方法，那这个 bug 就更难定位了。因此我强烈建议始终使用 super(props)，即使这不是必须的：

```javascript
class Button extends React.Component {
  constructor(props) {
    super(props); //  传入 props
    console.log(props); //  {}
    console.log(this.props); //  {}
  }
  // ...
}
```

### Q：为什么调用方法要 bind this？

A：四种写实践的写法





### Q： React 中的 ref 是干嘛的？

A：

### Q： connect 原理

A：

### Q：什么是 Portals？

A：

### Q：什么是 suspense 组件？

A：

### Q：为什么React 元素有一个 `$$typeof` 属性？

A：

### Q：为什么 JSX 中的组件名要以大写字母开头

A：判断当前渲染的元素是组件还是 HTML 元素



### Q： React 17、React 18 有什么新的特性

A：



### Q：请问 React 有什么坑点？

A：

1. JSX做表达式判断时，需要强转未 boolean 类型，如：


```jsx
render() {
    const b = 0;
    return (
    	<div>
        	{
                !!b && <div>这是一段文字</div>
            }
        </div>
    )
}
```

如果不使用!!b 进行强转数据类型，会在页面里面输出 0

2. 如果key不变，数据就不会变，如果两列数据为[1, 2, 3] ,[1, 2, 3, 4, 5, 6]点击第一组数据中的任意项，此数据标红，且展示第二组数据，如果展示UI时，key为index，那么前三是不会被替换的，你看的会是数据标红了且是第二条数据





react中onClick={fun}和onClick=>{()=>fun}有何区别呢？

https://www.zhihu.com/question/504049336/answer/2294252770?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128&utm_content=group3_Answer&utm_campaign=shareopn





## 参考资料

- [如果进阿里前端，代码能力得达到什么程度？](https://www.zhihu.com/question/29191974/answer/1620274467)
- [金三银四 React 常见面试题](https://juejin.cn/post/6940287134154637326)
- [一年半经验，百度、有赞、阿里前端面试总结](https://github.com/yacan8/blog/issues/18)
- [React 灵魂 23 问，你能答对几个？](https://zhuanlan.zhihu.com/p/304213203)
- [新手学习 react 迷惑的点(完整版)](https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484614&idx=1&sn=a2b5050136c2cd5e00db90a6cc8daaed&chksm=ea0167aadd76eebc0af31bf8de9ee7e5a35ecdb9e19045f5f36a0e5f8e3ae28e25e58eec0994&mpshare=1&scene=1&srcid=&sharer_sharetime=1567645123897&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

