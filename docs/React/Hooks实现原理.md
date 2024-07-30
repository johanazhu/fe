# React Hooks 实现原理

在学习 Hooks 是怎么实现的之前，我们需要知道[Fiber](./Fiber) 、[Hooks](./Hooks) 相关的知识

在 [Fiber](./Fiber) 中，我们了解到 React Fiber 的架构遵循着 `schedule - render - commit` 的运行流程，这个流程是 React 最底层的运行规律

- schedule 调度，分配优先级
- render 多次调用以下生命周期函数
  - componentWillMount
  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate 
- commit 会调用以下生命周期
  - componentDidMount
  - componentDidUpdate
  - componentWillUnmount

以前有人会拿 ClassComponent 的生命周期来类比 Hooks API 的执行时机。但两者的概念并不相通

比如：代替 componentWillReceiveProps 的 Hooks 是什么呢？

```jsx
useEffect( () => {
	console.log('something updated');
}, [props.something])
```

但是 componentWillReceiveProps 是在 render 阶段执行，而 useEffect 是在 commit 阶段完成渲染后异步执行

在 React15 中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次，但是在 React16（React Fiber 架构）下，不再是这样，render 阶段会在一次加载和更新中被多次调用，commit 阶段只会执行一次

那么 useEffect 为什么会在 commit 之后执行呢？

## Hooks 的工作原理

对于 useState Hook，考虑如下例子：

```jsx
function App() {
  const [num, updateNum] = useState(0);

  return <p onClick={() => updateNum((num) => num + 1)}>{num}</p>;
}
```

可以将工作分为两部分：

1. 通过一些途径产生更新，更新会造成组件 render
2. 组件 render 时 useState 返回的 num 为更新后的结果

其中 `步骤1` 的 `更新` 可以分为 `mount` 和 `update`：

1. 调用 `ReactDOM.render` 会产生 `mount` 的`更新`，`更新`内容为 `useState` 的 `initialValue`（即 0）
2. 点击 `p` 标签触发 `updateNUM` 会产生一次 `update` 的`更新`，`更新`内容为 `num => num + 1`

hooks 挂载数据的数据结构叫做 fiber。





hooks 的实现就是基于 fiber 的，会在 fiber 节点上放一个链表，每个节点的 memorizedState 属性上存放了对应的数据，然后不同的 hooks api 使用对应的数据来完成不同的功能





## 手写 useState















## 参考资料

- [React技术揭秘](https://react.iamkasong.com/)
