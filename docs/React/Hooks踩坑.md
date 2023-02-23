# Hooks 踩坑——Capture Value

### Capture Value

可以理解为快照

函数在每次渲染时也是独立的。这就是 **Capture Value** 特性

React.Hooks 的本质是利用了闭包机制

简易手写 React Hooks

```javascript
let memorizedState = []; // 存放hooks
let cursor = 0;

function useState(intialState) {
    memorizedState[cursor] = memorizedState[cursor] || initialState;
    const currentCursor = cursor;
    function setState(newState) {
        memorizedState[currentCuror] = newState;
        // render 的意思就是告诉react，可以做diff了，diff之后视图更新
        render();
    }
    // 返回 setState, setState的作用域链上有currentCursor变量，所以无法释放，形成闭包
    return [memorizedState[cursor++], setState];
}

const [show, setState] = useState(false);
```

闭包引起了状态不能更新

### 如何绕过 Capture Value

```jsx
const [flag, setFlag] = useState(false)
function handleClick() {
    setFlag(!flag);

    timer = setTimeout(() => {
        setFlag(!flag);
    }, 2000);
}
```

首次点击按钮后，产生一个快照 ：

```jsx
// ...
falg = false;

function handleClick() {
    setFlag(true);

    timer = setTimeout(() => {
        setFlag(true);
    }, 2000);
}
// ...
```

所以，2s 后 flag 依然 true。

要解决这个问题，很容易想到把上次的状态保存起来。

### 怎么理解这个快照

先看看这个普通函数的类似的行为：

```javascript
function sayHi(person) {
    const name = person.name;
    setTimeout(() => {
        alert('Hello,' + name);
    }, 3000);
}

let someone = { name: 'Johan' };
sayHi(someone);

someone = { name: 'elaine' };
sayHi(someone);

someone = { name: 'xiaowo' };
sayHi(someone);
// Hello, johan
// Hello, elaine
// Hello, xiaowo
```

这个例子种，外层的`someone` 会被赋值很多次（就像在 React 中，当前的状态会改变一样）

形成快照，2s 之后的是按照 2 秒前的动作执行

所以产生 Capture Value 的原因，正是每一次 re-render 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作

利用 `useRef` 就可以绕过 Capture Value 的特性。**可以认为 `ref` 在所有 Render 过程中保持着唯一引用，因此所有对 `ref` 的赋值或取值，拿到的都只有一个最终状态**，而不会在每个 Render 间存在隔离。

**在任意一次渲染中，props 和 state 是始终保持不变的。**如果 props 和 state 在不同的渲染中是相互独立的，那么使用到它们的任何值也是独立的（包括事件处理函数）。它们都“属于”一次特定的渲染。即便是事件处理中的异步函数调用“看到”的也是这次渲染中的`count`值。

## 参考资料

-   [React Hooks 踩坑之-- Capture Value 特性](https://mp.weixin.qq.com/s/eyFKOi3PTux6aTF0s557Rg)

-   [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

-   [精读《useEffect 完全指南》](https://juejin.cn/post/6844903806090608647#heading-5)
