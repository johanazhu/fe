# 快问快答 setState

## 基础认识

### setState 是同步还是异步的？

分情况。合成事件、钩子函数中调用，表现为“异步”；原生事件、setTimeout/setInterval、Promise 等原生 API 调用则是同步。

### 为什么这么设计？

为了做**性能优化**，React 会将多个 this.setState 产生的修改放在一个队列里，最后批量合成再去渲染，提高性能。如果每次的状态更新都去重新渲染真实 dom，会引起巨大的性能消耗

-   为什么会引起性能的消耗？
    -   先是每次调用 setState 都要走一遍生命钩子函数
    -   再则是 render 之后形成新的虚拟 dom ，新旧虚拟 dom 做对比，diff 需要花费性能
    -   然后把 diff 后的 patch 更新到真实 dom 上，也需要消耗性能

### setState 引发的生命周期

-   static getDerivedStateFromProps
-   shouldComponentUpdate
-   UNSAFE_componentWillUpdate
-   render
-   getSnapshotBeforeUpdate
-   componentDidUpdate

当 getDerivedStateFromProps 被调用时，this.state 没有得到更新

当 shouldComponentUpdate 被调用时，this.state 没有得到更新

当 UNSAFE_componentWillUpdate 被调用时，this.state 依然没有得到更新

直到 render 被调用时，this.state 才得到更新

### setState 怎么才能获取最新的 state

setState 的第二个参数时可选的回调函数 `setState(stateChange[, callback])` 。它将在 setState 完成合并 hou 重新渲染组件并执行。通常，用 componentDidUpdate 来代替此方法

为什么？

[stackoverflow](https://stackoverflow.com/questions/56501409/what-is-the-advantage-of-using-componentdidupdate-over-the-setstate-callback) 有人问过，也有人回答过

-   一致的逻辑

    -   两个不同的方法调用 this.setState，一个有第二个参数，一个没有，不一致

-   批量更新
    -   查看 [demo](https://codesandbox.io/s/blue-moon-mj5fz?file=/src/App.js)
-   什么时候 setState 会比较好？
    -   当外部代码需要等待状态更新时，将它包装到 promise.resolve 中

### 为什么要 setState，而不直接修改 state（this.state.xx = oo）

setState 做的事情不仅时修改 this.state 的值，它还会触发 React 的更新机制，进行 diff，然后将 patch 部分更新到真实 dom 里。

如果直接 this.state.xx = oo 的话，state 虽然修改，但不会触发 UI 重渲染

### setState 异步的原理

setState 的函数实现中，会根据 isBatchingUpdates（默认是 false）变量判断是否直接更新 this.state 还是放到队列中稍后更新。有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 tue，当 React 调用事件处理函数之前或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新

![setState原理](https://i.loli.net/2021/09/13/yJb7HlFMe5pAZkU.png)

setState 执行过程

https://juejin.cn/post/6844903781813993486#heading-5

## 面试吊打

一、如下的代码，它的 a 的值是多少？组件 C 又 render 了几次

```jsx
class C extends React.Component {
  state = {
    a: 0
  };
  componentDidMount() {
    this.setState({ a: 1 });
    setTimeout(() => {
      this.setState({ a: 2 });
    }, 0);
    new Promise((resolve) => {
      resolve(this.setState({ a: 3 }));
    }).then(() => {
      this.setState({ a: 4 });
    });
  }
  render() {
    return <div>{this.state.a}</div>;
  }
}
```

思路：

生命周期中 render 在 componentDidMount 前执行

componentDidMount 钩子函数中的执行顺序：

先进行同步代码，

1. this.setState({ a: 1 })
2. resolve(this.setState({ a: 3 }));

再执行 Promise 的微任务

3. this.setState({ a: 4 });

最后执行 setTimeout 中的宏任务

4. this.setState({ a: 2 });

可以得出：

第一次 render，a 的值为 0

第二次 this.setState 批处理合并 a 为 3，再一次触发 render

第三次 Promise 引发的 render，a 为 4

第四次 setTimeout 引发的 render，a 为 2

附上在线 [demo](https://codesandbox.io/s/exciting-brattain-1pi5m?file=/src/App.js)

二、看看这道题，console 中的值是什么？组件 App 又渲染了几次

```jsx
class App extends React.Component {
  state = {
    val: 0
  };
  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 2 });
    console.log(this.state.val);
    setTimeout(() => {
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
    }, 0);
  }
  render() {
    return <div className="App">{this.state.val}</div>;
  }
}
```

思路：

-   setState 有同步执行的代码，也有异步的。合成事件、生命周期钩子函数为异步执行，原生事件、setTimeout、promise 等原生 API 为同步代码

-   setState 又会被批处理，即在合成事件、生命周期钩子函数中多次调用 setState 函数产生的效果会合并

componentDidMount 中的代码是同步执行，但是表现为异步（因为批处理）。按顺序执行，第一个 val 为 0，第二个 val 也为 0。接着进行批处理，合并 `Object.assign(val, {val: this.state.val + 1}, {val: this.state.val + 2})`。所以当同步代码执行完后 val 的值为 2

接着执行 setTimeout 中的代码，setTimeout 中的第一个，也就是第三个 val 为 2。接下来执行 setState，同步执行，render 一次，第四个 val 为 3。最后执行 setState，也是同步执行，render 一次，第五个 val 为 4。

所以 `console.log()` 中的值为 0、0、2、3、4。render 的次数为 4 次

可以在这里查看 [demo](https://codesandbox.io/s/setstate-216l6?file=/src/App.js)

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
