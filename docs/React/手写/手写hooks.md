# 手写 hooks

### 手写 useState

```javascript
var _state;
function useState(initialValue) {
    _state = _state || initialValue;
    function setState(newState) {
        _state = newState;
        render();
    }
    return [_state, setState];
}
```

### useEffect

使用方法：

```jsx
useEffect(() => {
    console.log(count);
}, [count]);
```

useEffect 有几个特点：

1. 有两个参数 callback 和 dependencies 数组
2. 如果 dependencies 不存在，那么 callback 每次 render 都会执行
3. 如果 dependencies 存在，只有当它发生了变化，callback 才会执行

```javascript
let _deps;

function useEffect(callback, depArray) {
    const hasNoDeps = !depArray;
    const hasChangedDeps = _deps
        ? !depArray.every((el, i) => el === _deps[i])
        : true;
    if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
    }
}
```

Q：为什么第二个参数是空数组，相当于 componentDidMount

A：因为依赖一直不变化，callback 不会二次执行

现在手写的 useState 和 useEffect 只能用一次，因为只有一个 \_state 和 一个 \_deps

有什么方法解决呢？做成数组

代码关键在于：

1. 初次渲染的时候，按照 useState，useEffect 的顺序，把 state，deps 等按顺序塞到 memoizedState 数组中
2. 更新的时候，按照顺序，从 memoizedState 中把上次记录的值拿出俩

```javascript
let memoizedState = []; // 存放 hooks 的数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialState) {
    memoizedState[cursor] = memoizedState[cursor] || initialState;
    const currentCursor = cursor;
    function setState(newState) {
        memoizedState[currentCursor] = newState;
        render();
    }
    return [memoizedState[currentCursor++], setState];
}

function useEffect(callback, depArray) {
    const hasNoDeps = !depArray;
    const deps = memoizedState[cursor];
    const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
    if (hasNoDeps || hasChangedDeps) {
        callback();
        memoizedState[cursor] = depArray;
    }
    cursor++;
}
```

现在可以回答几个问题

Q：为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或子函数中调用？

A：memoizedState 数组是按 hook 定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到

Q："Capture Value" 特性是如何产生的？

A：每次 ReRender 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作

数组也许比连边更好解释其原理的模型

```javascript
let hooks, i;
function useState() {
    i++
    if(hoos[i]) {
        // 再次渲染时
        return hooks[i]
    }
    // 第一次渲染
    hooks.push(...)
}

// 准备渲染
i = -1
hooks = fiber.hooks || [];
// 调用组件
YourComponent()
// 缓存 Hooks 的状态
fiber.hooks = hooks;
```

简易的 Hooks

```javascript
let memorizedState = []; // 存放hooks
let cursor = 0;
let lastRef;

function useState(intialState) {
    memorizedState[cursor] = memeorizedState[cursor] || initialState;
    const currentCursor = cursor;
    function setState(newState) {
        memorizedState[currentCursor] = newState;
        render();
    }

    return [memorizedState[cursor++], setState];
}

function useEffect(callback, depArr) {
    const noDepArr = !depArr;
    const deps = memorizedState[cursor];
    const hasDepsChanged = deps
        ? !depArr.every((el, i) => el === deps[i])
        : true;
    if (noDepArr || hasDepsChanged) {
        callback();
        memorizedState[cursor] = depArr;
    }
    cursor++;
}

function useRef(value) {
    lastRef = lastRef || { current: value };
    return lastRef;
}
```

所以产生 Capture Value 的原因，正是每一次 rerender 的时候，都会去重新执行函数组件，

而使用 useRef，就相当于把数据存在在内存中

## 参考资料

-   [无意识设计-复盘 React Hook 的创造过程](https://github.com/shanggqm/blog/issues/4)
-   [React Hooks 原理](https://github.com/brickspert/blog/issues/26)
-   [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
-   [React Hooks 踩坑之-- Capture Value 特性](https://mp.weixin.qq.com/s/eyFKOi3PTux6aTF0s557Rg)
