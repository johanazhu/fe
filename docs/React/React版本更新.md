# React 版本更新

笔者从 React17开始将，讲诉每一个大版本

## React17

React 17 的改动并不大

在 React17 中，已经不需要显式导入 React 了。详见[介绍全新的 JSX 转换](https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

- `React` 更新引入了 `react/jsx-runtime`, 改变了 `JSX` 编译模式, 不再是 `React.createElement`

```javascript
_jsx('h1', { children: 'Hello world' });
```

- 同时编译工具(`react` 的预设 `@babel/preset-react`)，针对 `jsx` 不但会帮我们进行编译, 还会帮我们手动引入所需要的包

```javascript
// 由编译器引入（禁止自己引入！）
import { jsx as _jsx } from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

- 那早期版本是不是更新了 `@babel/preset-react` 也可以不需要手动引入? 不可以, 因为这里是使用新的编译方式, 旧的版本并不支持

## React18 

React18 新特性有很多，也是面试常考题，主要分为

- 正式支持 Concurrent Mode（并发模式）
- 自动批处理
- 放弃 IE
- Render API



### Concurrent Mode（并发模式）

在以前，React 在状态变更后，会开始准备虚拟 DOM，然后渲染真实 DOM，整个流程都是串行的。一旦开始触发更新，只能等流程完成结束，期间是无法中断的

并发模式下，React 在执行过程中，每执行一个 Fiber，都会看有没有更高优先级的更新，如果有，则当前低优先级的更新会被暂停，等高优先级任务执行完毕后，再继续执行之前的任务



在 React 18 中，引入了新的并发模式，允许 React 更高效地利用 CPU 资源，提高应用的渲染速度。这个新功能被称为“React 的异步渲染（asyncchronous rendering）”

在 React 18 之前，React 采用基于时间分片的协调策略，将大的更新任务切分为多个小的任务，从而避免阻塞用户界面。但这种策略需要手动添加时间分片代码，而且对于复杂的更新任务难以保证性能

React 18 的并发模式主要通过两个新的 API 来实现：useTransition() 和 useDeferredValue()。useTransition() 可以把回调函数里的更新设置为连续事件的优先级，比离散事件的优先级低。useDeferredValue() 是延后更新 state 的值。这些并发特性的 API 都是通过设置 Lane 来实现的，React 检测对应的 Lane 就会开启带有时间分片的 workLoopConcurrent 循环。时间分片的 workLoop + 优先级调度，这就是 React 并发机制的实现原理



### 自动批处理

在 React18 之前，合成事件、生命周期中如果多次修改 state，会进行批处理，但是原生事件、定时器、promise.then 不会进行批处理。原因是早起的批处理是通过一个状态作为批处理为依据

在 React 18 之后所有的更新都会转成自动批处理：

- 主要原因是不再通过 状态 来作为批处理依据，而是基于 Fiber 增加调度的流程来实现，以更新的「优先级」来依据来进行批处理

可以通过 `flushSync `退出批处理

```jsx
 <div
  onClick={() => {
    flushSync(() => {
    	// 第一次更新
      	setCount1(count => count + 1);
    });
    flushSync(() => {
        // 第二次更新
      	setCount2(count => count + 1);
    });
  }}
>
```



### 彻底放弃 IE

1. React 17 修复了 IE 兼容问题
2. React 18 就彻底放弃了对 IE 的支持



### Render API

修复了将组件挂载在 root 节点的一个 API

18之前版本：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
const root = document.getElementById('root')!;
ReactDOM.render(<App />, root);
```

18版本：支持并发模式渲染

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<App />);
```



### 严格模式下第二次渲染期间抑制日志

为了防止组件有什么意外的副作用，而引起 BUG，所以严格模式下 React 在开发模式中会可以执行两次渲染，尽可能把问题提前暴露出来，来提前预防

而 React 为了让日志更容易阅读，通过修改 console 中的方法，取消了其中一次渲染的控制台日志

问题：开发人员在调试过程中会存在很多困惑

展望未来：React 将不再默认在第二次渲染期间抑制日志，如果安装了 `React DevTools > 4.18.0`, 第二次渲染期间的日志现在将以柔和的颜色显示在控制台中









## 参考资料

-   [React 18 带给我们的惊喜](https://mp.weixin.qq.com/s/Pr5lMuL1ev7id9k2h2DTQQ)
-   [React18 正式版发布，未来发展趋势是？](https://mp.weixin.qq.com/s/gwfib4yaI0NxBfnWGrcwkw)
-   [React 18 对 Hooks 的影响](https://mp.weixin.qq.com/s/fgT7Kxs_0feRx4TkBe6G5Q)
-   [React 18 竟然爆出这么多新特性](https://mp.weixin.qq.com/s/eAomQydy6P61CzdmiTjWPg)
