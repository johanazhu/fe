# React Hooks 实现原理

原来写了流程，无奈看的时候感觉不妥，太干涩了，不如先实现一个 useState 再来讲理论知识。在看这章之前，需要先复习一下之前的 [Hooks](./Hooks)

## 手写 useState

### 第一阶段，实现最简单的 useState

```jsx
let _state;
const myUseState = initialValue => {
    _state = _state === undefined ? initialValue : _state;
    const setState = newValue => {
        _state = newValue
        render();
    }
    return [_state, setState]
}

// 无关useState，只为为了让其可以渲染组件
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
const render = () => {
  root.render(<App />);
};
```

我们知道 Hooks 是用闭包实现的，不然每次 render 之后它的值就会变化，所以必须有个全局变量定义在 `myUseState` 外，我们看 useState 的使用

```javascript
const [num, setNum] = useState(1);
```

它就是一个函数，传入一个值，返回两个值，两个值中一个是被闭包作用的变量，一个是操作这个变量的函数，操作 setState 后，就会重新渲染，这里用 `render()` 方法模拟

笔者将这段代码放到 [codesandbox](https://codesandbox.io/p/sandbox/shou-xie-usestate-di-yi-jie-duan-l53vmf) 上，可随时查看编辑

## 第二阶段，实现多个 useState 不冲突

上一阶段，我们实现了单个 useState ，但如果有多个 useState 呢，这方式就不中用了

其实很简单，把它设置为数组就可以，通过对其下标的指针来表示变化的是哪个变量即可

全部代码如下所示：

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

let _state: any = [];
let index = 0;

const myUseState = (initialState: any) => {
  const currentIndex = index;
  _state[currentIndex] =
    _state[currentIndex] === undefined ? initialState : _state[currentIndex];

  const useState = (newValue: any) => {
    _state[currentIndex] = newValue;
    console.log("_state", _state);
    render();
  };

  index += 1;
  return [_state[currentIndex], useState];
};

function App() {
  const [num, setNum] = myUseState(0);
  const [num2, setNum2] = myUseState(0);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <h2>{num}</h2>
      <button onClick={() => setNum(num + 1)}>点我加1</button>
      <h2>{num2}</h2>
      <button onClick={() => setNum2(num2 + 1)}>点我加1</button>
    </div>
  );
}

const render = () => {
  index = 0;
  root.render(<App />);
};

render();
```

其中，最关键的点在于，有个 `_state 数组`和表示每个 state 的` index 下标`，通过 `state[index]` 表示每个由 useState 表示的值

除此之外，每次 render 时，都要将 index 下标重置为 0，不然因为闭包的缘故， index 下标会一直往数组中push

代入贴出可以一观：[线上代码](https://codesandbox.io/p/sandbox/aged-surf-89zjlk)

如此一来我们就完成了 useState

这也解释了为什么使用 React Hooks 的使用规则：**不能再循环、条件、嵌套函数中调用 Hook**

因为 Hooks 方法的存储方式是数组（其实是链表，后续说明），一旦加判断调用，state 和 setState 的对应关系就错了（这里以 useState 为例）



## Hooks 的工作原理

我们的第二阶段的 useState 其实还有问题的，因为我们在全局 App 中使用了 _state 和 index，那么其他组件怎么办？

答案是给每个组件创建一个 _state 和 index

问题又来了：放在全局作用域中重名了怎么办

解决方案，放在组件对应的 Fiber Node 上

结合在 [Fiber](./Fiber) 篇中所讲，Fiber 的含义之一就是 Fiber Node，每一组件就对应一 Fiber Node，其中它的结构就是

```javascript
function FiberNode(
  this: $FlowFixMe,
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  ...
  //  保存该FunctionComponent对应的Hooks链表
  this.memoizedState = null;
  ...
}
```

其中 memoizedState 就是上文所写的 _state，只不过我们将其简化为数组，用 index 配合表示值，而在真实 React 中 memoizedState 它是个对象，它通过链表来链接，不过 Hook 是无环的单链表

```javascript
hook = {
  // 环状单向链表
  queue: {
    pending: null,
  },
  // 保存hook对应的state
  memoizedState: initialState,
  // 与下一个Hook连接形成单向无环链表
  next: null,
};
```

数据结构如上所示，memoizedState 表示一个组件的 Hooks，next 相当于上文所说的下表，表示下一个 Hooks









## 参考资料

- [React技术揭秘](https://react.iamkasong.com/)
