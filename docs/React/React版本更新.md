# React 版本更新

笔者从 React17开始讲，讲诉每一个大版本

## React17 版本更新

React17 无新特性，是个过渡版本，它在2022年9月发布，这个版本将 React 自身的升级变得更加容易

- 渐进式升级
- 事件委托的变更
- 全新的 JSX 转换

## 渐进式升级

**React v17 开启了 React 渐进式升级的新篇章**。当你从 React 15 升级至 16 时（或者，从 16 升级到 17），你通常会一次性升级整个应用程序，这对大部分应用来说十分有效

## 事件委托的变更

React v17中，React 不会再将事件处理添加到 `document` 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中

```jsx
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

在 React 16 及之前版本，React 会对大多数事件进行`document.addEventListener()` 操作。

React v17 开始会通过调用 `rootNode.addEventListener()` 来代替

![react_17_delegation](https://s2.loli.net/2024/06/16/kXmv5TSiZxj2Qya.png)

## 全新的 JSX 转换

Reacct v17 支持了全新的 [JSX 转换](https://zh-hans.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)。使得无需显式导入 React 即可单独使用 JSX

## React18 版本更新

React18 新特性有很多，也是面试常考题，它在22年3月发布，它的特性包括：

- 正式支持 Concurrent Mode（并发模式）
- Render API
- 自动批处理
- 新功能（新API）：过渡（startTransition）
- 新的 Suspense 特性：支持 Suspense 的流式服务端渲染
- 放弃 IE
- 服务端组件



### Concurrent Mode（并发模式）

V16就提出了Fiber架构，React 并发（concurrent）模式还在构建中（处于实验阶段），到V18才正式投入

在以前，React 在状态变更后，会开始准备虚拟 DOM，然后渲染真实 DOM，整个流程都是串行的。一旦开始触发更新，只能等流程完成结束，期间是无法中断的

并发模式下，React 在执行过程中，每执行一个 Fiber，都会看有没有更高优先级的更新，如果有，则当前低优先级的更新会被暂停，等高优先级任务执行完毕后，再继续执行之前的任务

React 18 的并发模式主要通过两个新的 API 来实现：useTransition() 和 useDeferredValue()。useTransition() 可以把回调函数里的更新设置为连续事件的优先级，比离散事件的优先级低。useDeferredValue() 是延后更新 state 的值。这些并发特性的 API 都是通过设置 Lane 来实现的，React 检测对应的 Lane 就会开启带有时间分片的 workLoopConcurrent 循环。时间分片的 workLoop + 优先级调度，这就是 React 并发机制的实现原理



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



### 自动批处理

在 React18 之前，合成事件、生命周期中如果多次修改 state，会进行批处理，但是原生事件、定时器、Promise 不会进行批处理。原因是早期的批处理是通过一个状态作为批处理为依据

在 React 18 之后所有的更新都会转成自动批处理：

- 主要原因是不再通过 状态 来作为批处理依据，而是基于 Fiber 增加调度的流程来实现，以更新的「优先级」来依据来进行批处理

```jsx
// 之前：只对 React 事件执行批量处理
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 将渲染两次，每次状态更新一次（无批量处理）
}, 1000);

// 之后：超时、Promises、本机事件处理程序
// 或任何其他事件内的更新是批处理的。

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会在最终重新渲染一次（这就是批量处理！）
}, 1000);
```

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



### 新功能（新API）：过渡（Transition）

过渡是  React 中的一个新概念，用以区分紧急和非紧急更新

- 紧急更新：反映了直接的交互，如输入、点击、按压
- 过渡更新：将 UI 从一个视图过渡到另一个

```jsx
import { startTransition } from 'react';

// 紧急：显示输入的内容
setInputValue(input);

// 将内部的任何状态更新都标记为过渡
startTransition(() => {
  // 过渡：显示结果
  setSearchQuery(input);
});
```

被 startTransition 包裹的更新被当作非紧急事件处理，如有更紧急更新，如点击或按键，则会被中断。如果一个过渡被用户中断（例如，连续输入多个字符），React 会丢弃未完成的无效的渲染，而只渲染最新的更新。

- `useTransition`：一个启动过渡的 Hook，包括一个值以跟踪待定状态。
- `startTransition`：当 Hook 不能使用时，一个启动过渡的方法。

### 新的 Suspense 特性：支持 Suspense 的流式服务端渲染

如果组件树的某一部分还没有准备好被显示，Suspense 可以让你声明式地指定加载状态：

```jsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

React17时，React 推出了一个有限的 Suspense 版本。然而，唯一支持的用例是用 React.lazy 拆分代码，且在服务端渲染时根本不支持

在 React 18 中，我们增加了对服务端的 Suspense 支持，并使用并发渲染特性扩展了其功能



### 彻底放弃 IE

1. React 17 修复了 IE 兼容问题
2. React 18 就彻底放弃了对 IE 的支持





## 参考资料

-   [官网React17](https://zh-hans.legacy.reactjs.org/blog/2020/10/20/react-v17.html)
-   [官网React18](https://zh-hans.legacy.reactjs.org/blog/2022/03/29/react-v18.html)
-   [React 18 带给我们的惊喜](https://mp.weixin.qq.com/s/Pr5lMuL1ev7id9k2h2DTQQ)
-   [React18 正式版发布，未来发展趋势是？](https://mp.weixin.qq.com/s/gwfib4yaI0NxBfnWGrcwkw)
-   [React 18 对 Hooks 的影响](https://mp.weixin.qq.com/s/fgT7Kxs_0feRx4TkBe6G5Q)
-   [React 18 竟然爆出这么多新特性](https://mp.weixin.qq.com/s/eAomQydy6P61CzdmiTjWPg)
