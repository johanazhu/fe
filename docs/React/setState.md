# 深入浅出 setState 原理篇

## 前言

想起自己（2021 年） 8 月份面试时，被面试官们问了好几个 setState 的问题，现在想想，虽然回答上问题，但是了解的不深刻。我知道 setState 被设计成”异步“是为了性能，但是涉及到源码解读我就歇菜了；我知道如何让它同步，但是遇到真实的代码情况时，却不知道如何下手。说到底，当时是准备了面经把这些概念记下来，而没有真正理解它

在认识 setState 前，我们问几个常见问题

-   setState 是同步还是异步？
-   如果是异步，怎么让它同步？
-   为什么要这样设计？

## 基本概念和使用

React 的理念之一是 UI=f(data)，修改 data 即驱动 UI 变化，那么怎么修改呢？React 提供了一个 API ——setState（类组件的修改方法）

[官网介绍](https://zh-hans.reactjs.org/docs/react-component.html#setstate)：

> `setState()` 将对组件 state 的更新排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式
>
> 为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。React 并不会保证 state 的变更会立即生效
>
> `setState()` 并不总是立即更新组件。它会批量推迟更新。这使得在调用 `setState()` 后立即读取 `this.state` 成为了隐患。为了消除隐患，请使用 `componentDidUpdate` 或者 `setState` 的回调函数（`setState(updater, callback)`），这两种方式都可以保证在应用更新后触发
>
> 除非 `shouldComponentUpdate()` 返回 `false`，否则 `setState()` 将始终执行重新渲染操作。如果可变对象被使用，且无法在 `shouldComponentUpdate()` 中实现条件渲染，那么仅在新旧状态不一时调用 `setState()`可以避免不必要的重新渲染

### 使用方法

```jsx
setState(updater, [callback]);
```

参数一为带有形式参数的 updater 函数：

```jsx
(state, props) => stateChange;

// 例如
// this.setState((state, props) => {
//   return {counter: state.counter + props.step};
// });
```

setState 的第一个参数除了接受函数外，还可以接受对象类型：

```jsx
setState(stateChange[, callback])

// 例如：this.setState({count: 2})
```

setState 的第二个参数为可选的回调函数，它将在 setState 完成合并重新渲染组件后执行。通常，我们建议使用 componentDidUpdate 来代替此方法

```jsx
setState(stateChange[, callback])

// 例如: this.setState({count: 2}, () => {console.log(this.state.count)})
```

### 与 setState 回调相比，使用 componentDidUpdate 有什么优势？

[stackoverflow](https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback) 有人问过，也有人回答过：

-   一致的逻辑

-   批量更新
-   什么时候 setState 会比较好？

    -   当外部代码需要等待状态更新时，如 Promise

## setState 的特性——批处理

如果在同一周期内对多个 setState 进行处理，例如，在同一周期内多次设置商品数据，相当于：

```javascript
this.setState({count: state.count + 1});
this.setState({count: state.count + 1});
this.setState({count: state.count + 1});
// ===
Object.assign(
  count,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

后调的 setState 将覆盖同一周期内先调用 setState 的值

-   setState(stateChange[, callback])
-   setState((state, props) => stateChange[, callback])

setState 必引发更新过程，但不一定会引发 render 被执行，因为 shouldCompomentUpdate 可以返回 false

## 批处理引发的问题

### 问题 1：连续使用 setState，为什么不能实时改变

```jsx
state.count = 0;
this.setState({ count: state.count + 1 });
this.setState({ count: state.count + 1 });
this.setState({ count: state.count + 1 });
// state.count === 1，不是 3
```

因为 this.setState 词 API 为会进行批处理，后调的 setState 会覆盖统一周期内先调用的 setState 的值，如下图所示：

```jsx
state.count = 0;
this.setState({ count: state.count + 2 });
this.setState({ count: state.count + 3 });
this.setState({ count: state.count + 4 });
// state.count === 4
```

### 问题 2：为什么要 setState，而不是直接 this.state.xx = oo?

因为 setState 做的事情不仅只是修改了 `this.state` 的值，另外最重要的是它会触发 React 的更新机制，会进行 diff，然后将 patch 部分更新到真实 dom 里

如果你直接 `this.state.xx = oo` 的话，state 的值确实会改，但是它不会驱动 React 重渲染。setState 能帮助我们更新视图，引发 shouldComponentUpdate、render 等一系列函数的调用。至于批处理，React 会将 setState 的效果放入队列中，在事件结束之后产生一次重新渲染，为的就是把 Virtual DOM 和 DOM 树操作降到最小，用于提高性能

当调用 setState 后，React 的 [生命周期函数](https://zh-hans.reactjs.org/docs/react-component.html) 会依次顺序执行

-   static getDerivedStateFromProps
-   shouldComponentUpdate
-   render
-   getSnapshotBeforeUpdate
-   componentDidUpdate

### 问题 3：那为什么会出现异步的情况呢？（为什么这么设计？）

因为性能优化。假如每次 setState 都要更新数据，更新过程就要走五个生命周期，走完一轮生命周期再拿 render 函数的结果去做 diff 对比和更新真实 DOM，会很耗时间。所以将每次调用都放一起做一次性处理，能降低对 DOM 的操作，提高应用性能

### 问题 4：那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？

通过第二个参数 `setState(partialState, callback)` 中的 callback 拿到更新后的结果

```jsx
onHandleClick() {
    this.setState(
        {
            count: this.state.count + 1,
        },
        () => {
            console.log("点击之后的回调", this.state.count); // 最新值
        }
    );
}
```

或者可以直接给 state 传递函数来表现出同步的情况

```jsx
this.setState((state) => {
    console.log('函数模式', state.count);
    return { count: state.count + 1 };
});
```

## 执行原理

首先先了解[三种渲染模式](https://zh-hans.reactjs.org/docs/concurrent-mode-adoption.html)

> -   legacy 模式：`ReactDOM.render(<App />, rootNode)` 。这是当前 React app 使用的方式。当前没有计划删除本模式，但是这个模式可能不支持新功能
> -   blocking 模式：`ReactDOM.createBlockingRoot(rootNode).render(<App />)` 。目前正在实验中，作为迁移到 concurrent 模式的第一个步骤
> -   concurrent 模式 ：`ReactDOM.createRoot(rootNode).render(<App />)`。目前再实验中，未来稳定之后，打算作为 React 的模式开发模式。这个模式开启了所有的新功能
>     -   拥有不同的优先级，更新的过程可以被打断

在 legacy 模式下，在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state

像 addEventListener 绑定的原生事件、setTimeout/setInterval 会走同步，除此之外，也就是 React 控制的事件处理 setState 会异步

而 concurrent 模式都是异步，这也是未来 React 18 的默认模式

## 总结

首先，我们总结下关键知识点

-   setState 不会立即改变 React 组件中 state 的值
-   setState 通过引发一次组件的更新过程来引发重新绘制
-   多次 setState 函数调用产生的效果会合并（批处理）

其次，回答一下文章开头的问题（第二第三问题在文中已经回答）

setState 是同步还是异步？

-   代码同步，渲染看模式
    -   legacy 模式，非原生事件、setTimeout/setInterval 的情况下为异步；addEventListener 绑定原生事件、setTimeout/setInterval 时会同步
    -   concurrent 模式：异步

![image-20220221160905787](https://s2.loli.net/2022/02/21/oDCljPzA5yFqTpU.png)

附上线上 demo 示例：

-   [setState 是同步还是异步](https://azhubaby.com/demo/setState是同步还是异步/build/index.html)

## 参考资料

-   [setState：这个 API 设计到底怎么样](https://zhuanlan.zhihu.com/p/25954470)
-   [setState 为什么不会同步更新组件状态](https://zhuanlan.zhihu.com/p/25990883)
-   [setState 何时同步更新状态](https://zhuanlan.zhihu.com/p/26069727)
-   [浅入深出 setState（上篇）](https://segmentfault.com/a/1190000015615057)
-   [浅入深出 setState（下篇）](https://segmentfault.com/a/1190000015821018)
-   [重新认识 React 的 setState](https://keqingrong.cn/blog/2019-04-01-react-setstate)
-   [你真的理解 setState 吗？](https://zhuanlan.zhihu.com/p/39512941)
-   [setState 到底是同步的，还是异步的](https://mp.weixin.qq.com/s/my2Jx7pcbVYnaCWklAzKXA)
-   [React 中 setState 是一个宏任务还是微任务？](https://segmentfault.com/a/1190000040445026)
-   [What is the advantage of using componentDidUpdate over the setState callback?](https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback)
-   [深入学习：何时以及为什么 setState() 会批量执行？](https://stackoverflow.com/a/48610973/458193)
-   [深入：为什么不直接更新 this.state？](https://github.com/facebook/react/issues/11527#issuecomment-360199710)
-   [这届面试官，不讲武德](https://zhuanlan.zhihu.com/p/296359220)
