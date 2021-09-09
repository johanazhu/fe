# 深入浅出 setState



## 前言

想起自己 8 月份面试时，被面试官们问了好几个 setState 的问题，现在想想，虽然回答上问题了，但是了解的不深刻，为什么？我知道 setState 被设计成”异步“是为了性能，但是涉及到源码解读我就歇菜了；我知道如何让它同步，但是遇到真实 Code 时，却不知道如何下手。说到底，当时是准备了面经把这些概念记下来，而没有真正理解它



## 快速了解

基本概念和使用

关键点问题

​	setState 最招骂的就是不会立即修改 this.state





调用 setState 后会发生什么

有一答一

来几个面试题





## 基本概念和使用

React 的理念之一是 UI=f(data)，修改 data 即驱动 UI 变化，那么怎么修改呢？React 提供了一个



setState 容易犯错的点

1. setState 不会立刻改变 React 组件中 state 的值
2. setState 通过引发一次组件的更新过程来引发重绘
3. 多次 setState 函数调用会被合并





## 常见的问题

### 问题一：

```react
this.setState({count: state.count + 1}); 
this.setState({count: state.count + 1}); 
this.setState({count: state.count + 1}); 
// state.count === 1，不是 3
```









setState是异步的？

为什么setState是异步的？这样设计的目的是什么？

如何实现异步的setState，设计思路是什么？

为了性能，

因为浏览器是单线程，我举个例子，如果你点击，而这个点击方法里延迟3秒，那么用户再在三秒里是不能做什么事情的，这样的用户体验是极差的，所以react在设计setState的时候会把setState设计成异步。

每一次setState如果都会引发一次组件更新，走完一圈生命周期，实在是有点粗糙和浪费

如何设计我就没思路了





#### 为什么要 setState，而不是直接 this.state.xx = oo?

我们知道在 vue 中的修改状态是可以直接修改的。为什么在react中不行

因为 setState 做的事情不仅只是修改了 `this.state` 的值，另外最重要的是它会触发 React 的更新机制，会进行diff，然后将 patch 部分更新到真实 dom 里。

如果你直接 `this.state.xx = oo` 的话，state 的值确实会改，但是改了不会触发 UI 的更新，那就不是数据驱动了。

那为什么Vue直接修改 data 可以触发 UI 的更新呢？ 因为 Vue 在创建 UI 的时候会把这些 data 给收集起来，并且在这些 data 的访问器属性 setter 进行了重写，在这个重写的方法里会去触发 UI 的更新







## setState 的大纲笔记

1. setState不会立刻改变 React 组件中 state 的值；

   1. 因为批处理
   2. 修改 this.state 值是没有意义的，它不会驱动 react 重渲染
   3. setState 函数能帮助我们更新视图，引发 componentDidMount、render 等一系列函数的调用

2. setState通过引发一次组件的更新过程来引发重新绘制；

   1. 使用setState后，会触发render

   2. react不像vue，vue是通过数据劫持来实现数据变化视图跟着更新，react需要通过调用setState来render

      1. React改变状态时通过一个函数setState驱动的，和vue不同

   3. setState 调用引起的React的更新生命周期函数4个函数（比修改props引发的生命周期少一个componentWillReceiveProps函数），这4个函数一次被调用

      1. shouldComponentUpdate

      2. componnetWillUpdate

      3. render

      4. componentDidUpdate

         this.state 只有在render函数被调用后才更新

         不管你喜欢不喜欢，反正this.state就是不会再this.setState调用之后立刻更新

3. 多次setState函数调用产生的效果会合并。

   1. 批处理
   2. 原因如上所示，只有调用this.setState才会更新试图（render 的时候更新数据），所以为了性能，每次更新过程中，会把积攒的setState结果合并（react会将多个this.setState产生的修改放在一个队列里，最后批处理）

4. setState中能传入函数

   1. 传入函数的话，就能实现同步

5. this.setState 能同步

   1. 在React中，**如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state**。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。







## 调用 setState 后会发生什么



React 的结构

React

​	Component

​		prototype

​			setState



ReactDOM 的结构

​	updater





## 有一答一

1. setState 是同步还是异步？

我的回答是执行过程代码同步，只要合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，所以表现出来有时候同步，有时候异步

2. 何时是同步，何时是异步？

只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout/setInterval 等原生API 中都是同步的。简单的可以理解为被 React 控制的函数里面就会表现出“异步”，反之表现为同步。

3. 那为什么会出现异步的情况呢？（为什么这么设计？）

为了做性能优化，将 state 的更新延缓到最后批量合并再去渲染，对于应用的性能优化有极大好处。如果每次的状态更改都去重新渲染真实 dom，那么它将带来巨大的性能消耗

4. 那如何在表现出异步的函数里可以准确拿到更新后的 state 呢？

通过第二个参数 `setState(partialState, callback)` 中的 callback 拿到更新后的结果

或者可以直接给 state 传递函数来表现出同步的情况

```javascript
this.setState((state) => {
    return { val: newVal }
})
```

5. 那表现出异步的原理是怎么样的？

在 React 的 setState 函数实现中，会根据 isBatchingUpdates（默认是 false） 变量判断是否直接更新 this.state 还是放到队列中稍后更新。然后有一个 batchedUpdate 函数，可以修改 isBatchingUpdates 为 true，当 React 调用事件处理函数之前，或者生命周期函数之前就会调用 batchedUpdate 函数，这样的话，setState 就不会同步更新 this.state，而是放到更新队列里面后续更新。

这样你就可以理解为什么原生事件和 setTimeout/setinterval 里面调用 this.state 会同步更新了吧，因为通过这些函数调用的 React 没办法去调用 batchedUpdate 函数将 isBatchingUpdates 设置为 true，那么这个时候 setState 的时候默认就是 false，那么就会同步更新。



## 来几个面试题

第一个，也是我在面试中遇到的。如下的代码，它的 a 的值是多少？又 render 了几次

```react
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
    console.log("state", this.state);
    return <div>{this.state.a}</div>;
  }
}
```





## 参考资料

- [setState：这个API设计到底怎么样](https://zhuanlan.zhihu.com/p/25954470)

- [setState为什么不会同步更新组件状态](https://zhuanlan.zhihu.com/p/25990883)

- [setState何时同步更新状态](https://zhuanlan.zhihu.com/p/26069727)
- [浅入深出setState（上篇）](https://segmentfault.com/a/1190000015615057)
- [浅入深出setState（下篇）](https://segmentfault.com/a/1190000015821018)
- [setState详解与React性能优化](https://segmentfault.com/a/1190000039776687)
- [重新认识 React 的 setState](https://keqingrong.cn/blog/2019-04-01-react-setstate)
- [你真的理解setState吗？](https://zhuanlan.zhihu.com/p/39512941)
- [setState 到底是同步的，还是异步的](https://mp.weixin.qq.com/s/my2Jx7pcbVYnaCWklAzKXA)
- [React 中 setState 是一个宏任务还是微任务？](https://segmentfault.com/a/1190000040445026)

