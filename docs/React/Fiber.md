# Fiber 的作用和原理

目录：

- Fiber 是什么

- Fiber 的作用
- 为什么会有 Fiber
- Fiber 理论实现
- Fiber 实现原理

- Fiber 是如何工作的
- 番外：时间切片与优先级调度



## Fiber 是什么

先看看别人是怎么解释的

[官网解释](https://zh-hans.legacy.reactjs.org/docs/faq-internals.html#what-is-react-fiber)：

Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染

[程墨Morgan](https://www.zhihu.com/people/morgancheng)：React Fiber是对核心算法的一次重新实现

[尤雨溪](https://evanyou.me/)评价Fiber：

React Fiber 本质上是为了解决 React 更新低效率的问题（通过提供分配计算优先级从而提升 perceived performance），不要期待 Fiber 能给你现有应用带来质的提升，如果性能问题是自己造成的，自己的锅还是得自己背

[React技术揭秘](https://react.iamkasong.com/process/fiber.html#fiber%E7%9A%84%E5%90%AB%E4%B9%89) 解释：Fiber包含三层含义

1. 作为架构来说，之前的 React15 的 Reconciler 采用递归的方式执行，数据保存在递归调用栈中，所以被称为 stack Reconciler。React 的 Reconciler 基于 Fiber 节点实现，被称为 Fiber Reconciler
2. 作为静态的数据结构来说，每个 Fiber 节点对应一个 React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的 DOM 节点等信息
3. 作为动态的工作单位来说，每个 Fiber 节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）

...

我的理解：正如卡颂所说，但我以我的理解来复述一遍。Fiber 包含了三层含义

1. 作为架构来说，从 React 15 的 Stack Reconciler 升级为 Fiber Reconciler，这是对核心算法的重构，实现 **异步可中断更新** 的特性
2. 从数据结构来说，它表示一个 React element，它保存了组件的类型（函数组件/类组件/原生组件...）、对应的 DOM 节点等信息
3. 作为动态的工作单位来说，每个 FiberNode 保存了本次更新中该组件改变的状态、要执行的工作（增删改）

无论是作为数据结构还是工作单位，它都是以 FiberNode 的身份存在，因为 React16 的架构我们命名为 Fiber，所以它的协调器就是 Fiber Reconciler，它作为 React element 或者最小工作单位就叫 FiberNode

## Fiber 的作用

为了解决React15在大组件更新时产生的卡顿现象，React团队提出了 Fiber 架构，并在 React16 发布，将 **同步递归无法中断的更新** 重构为 **异步的可中断更新** 

它实现了5个具体目标

- 把可中断的任务拆分成小任务
- 对正在做的任务调整优先次序、重做、复用上次（未完成）的任务
- 在父子任务间从容切换，以支持 React 执行过程中的布局刷新
- 支持 render 返回多个元素
- 更好地支持 error bounday

## 为什么会有 Fiber

要讲 Fiber 原理，就要先从为什么会有 Fiber 说起，为什么要有 Fiber，因为需要。为什么需要，就要从 Fiber 架构之前的 React15 讲起，因为 React15 的架构满足不了大组件渲染卡顿问题（其根本原因是它的更新流程是「**同步、不可中断**」），所以就有了解决方案，这个解决方案就是重构底层架构，它就是 Fiber 架构

### React 15的架构

React 15 的结构由两部分组成：

- Reconciler（协调器）
- Renderer（渲染器）
  - [React DOM Renderer](https://github.com/facebook/react/tree/main/packages/react-dom)：将 React 组件渲染成 DOM
  - [React Native Renderer](https://github.com/facebook/react/tree/main/packages/react-native-renderer)：将 React 组件渲染成 Native 视图
  - [React Test Renderer](https://github.com/facebook/react/tree/main/packages/jest-react)：将 React 组件渲染为 JSON 树（用于测试）
  - [React Art Renderer](https://github.com/facebook/react/tree/main/packages/react-art)：将  React 组件渲染为 ART（即Canvas、SVG之流）

> 严格说来，[`react-native-renderer`](https://github.com/facebook/react/tree/main/packages/react-native-renderer) 实现了 React 和 React Native 的连接。真正渲染 Native 视图的平台特定代码及组件都存储在 [React Native 仓库](https://github.com/facebook/react-native)中

Reconciler 负责找出变化的组件，属于共享代码

Renderer 负责将变化的组件渲染到页面上，不同的平台有不同的渲染器

React 15的 Reconciler （协调器）称之为 Stack reconciler，它的特点是当主动或被动触发更新组件（如改变 props、setState操作）时，会**递归**执行更新。当组件层级很深，递归更新时间超过16ms，就会呈现卡顿现象

> 这是因为人眼接受的动画最低频率是16ms，即1000/60=16.67ms

于是乎，React 团队提出了**可中断的异步更新** 方案，那就是 Fiber 架构

### React 16 架构

React16 架构分为三层：

- Scheduler（调度器）
- Reconciler（协调器）
- Renderer（渲染器）

与 React15 相比，就多了 Scheduler（调度器），正是因为调度器，才使得 React 有了能够中断任务切片、调整优先级等能力

#### Scheduler（调度器）

上文中讲到 React15 大型组件渲染卡顿问题时讲到，当程序运行时间超过 16ms 时，我们会感到卡顿

从浏览器的角度来说：

首先，JavaScript 是单线程语言，意味着它有依次执行代码的特点，打个比喻，就像排队打饭，执行完一个函数再轮到下一个，挨个执行

所以我们可以得到这样的一个画面，React15 在渲染大组件时，因为 JavaScript 单线程的特性，要把大组件下的所有子组件进行递归计算，当计算时间超过了16ms，就产生卡顿现象

![React15的组件更新](https://i.loli.net/2021/06/03/7ncbYMKSCjBkRfr.png)

所以只要我们设置一种机制，将一个耗时长的任务分成很多小任务，按照优先级顺序依次执行，当计算时间超过16ms，就交由 GUI 绘制，绘制一会儿再由渲染线程接管，执行JS。React 的 Scheduler（调度器）再按照优先级分配，看有没有紧急任务，如果没有就继续更新，有的话就执行紧急任务，完成紧急任务后就按照优先级继续完成剩余任务。当执行时间再到16ms时，再交给 GUI 绘制，如此反复，就能瞒过肉眼，感觉运行流畅

这个技术称作**时间分片**，即讲一个渲染工作分解成多个小任务，并在多个帧之间分配和执行这些任务

![Fiber架构下的组件更新](https://i.loli.net/2021/06/03/GYqmfj2AFPZURMt.png)

这种在浏览器空闲的时候调用的方法部分浏览器（目前看就 Safari 不支持）中已经实现，即 [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

React 团队考虑到浏览器兼容性以及 requestIdleCallback 的触发频率不稳定等原因，所以自己写了个 requestIdleCallback polyfill（垫平），其技术用的是 MessageChannel。Scheduler 除了空闲时触发回调的功能外，还提供了多种调度优先级功能

##### 调度器的优先级

React 中调度器的不同优先级极其排序

- Immediate：最高优先级，会马上执行的不能中断
- UserBlocking：一般用户交互结果，需要及时反馈
- Normal：普通等级，比如网络请求等不需要用户立即感知的
- Low：低优先级，这种可以延后，最后要执行
- Idle：最低优先级，可以被无限延迟，比如 console

总得来说，Scheduler 调度器包含了两大功能，一是时间切片、二是优先级调度；时间切片是通过 Fiber 架构下的 Fiber 节点实现，因为是链表结构，所以它能在你中断执行后记录下并在另一个小任务执行时续上；任务调度顾名思义，优先级较高的插队执行

#### Reconciler（协调器）

在讲 React 15 的 Reconciler 时，我们讲到它是递归处理虚拟DOM，React 16 中的 Reconciler 则从递归变成了可以中断的循环过程。每次循环都会调用 shouldYield 判断当前是否有剩余时间

```javascript
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  // 直到调度程序要求我们让步之前继续工作
  while (workInProgress !== null && !shouldYield()) {
    // $FlowFixMe[incompatible-call] found when upgrading Flow
    //在升级 Flow 时发现了 $FlowFixMe[incompatible-call]
    performUnitOfWork(workInProgress);
  }
}
```

之前讲到 React 16 在更新状态时如果超过16ms，会中断执行并存储未执行的代码，等后续浏览器有空闲时间后再执行未执行的代码，那它在技术上是如何实现的

在 React 16 中，Reconciler 与 Renderer 不再是交替工作。当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上增/删/更新的标签，类似这样：

```javascript
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

> 注：以上打标签源自[React技术揭秘](https://react.iamkasong.com/)，目前源码中已经不再是这样的打标签，此处做理解即可

需要注意的是：整个 Scheduler 与 Reconciler 的工作都在内存中进行，只有当所有组件都完成了 Reconciler 的工作，才会统一交给 Renderer

#### Renderer（渲染器）

就是将 Reconciler 打上标签的虚拟DOM对象（即 FiberNode）执行成 DOM（Virtual DOM 变 视图）

简单来说，React 16 的 Fiber 架构就是先通过调度器将高优先级的任务push到协调器中的就绪任务队列中，协调器对其打标签，找出需要变化的组件，最后由渲染器将变化的组件渲染到页面

### React 16 与 React 15的区别

React 16 多了 Scheduler（调度器），分配优先级；React15 没有 Scheduler，不能分配优先级

React 16 中的 Reconciler（协调器）采用 Fiber 架构，可以进行**异步可中断更新**；React 15 的 Reconciler 为 Stack reconciler（堆栈协调器），状态更新时，会进行递归更新，同步且不可中断

我们对比 React16 与 React 15，知道 React 16 采用了 Fiber 架构，它能做到优先级分配、异步可中断更新，那么它的原理是什么，它是怎么实现的

## Fiber 理论实现

Fiber 架构的两大特点：**优先级分配**、**异步可中断**。我们从这两点着手，看它怎么实现

卡颂在 [React 技术揭秘](https://react.iamkasong.com/process/fiber-mental.html) 中提到 React 核心团队成员 [Sebastian Markbåge](https://github.com/sebmarkbage/)（React Hooks 的发明者）说：我们在 React 中做的就是践行代数效应（Algebraic Effects）

并提及浏览器中的 Generator 可以实现` 代数效应`

但 Generator 的一些缺陷使 React 团队放弃了它

- 类似 async，Generator 也是有传染性的，使用了 Generator 则上下文的其他函数都需要做出改变（加上*），心智负担比较重
- Generator 执行的中间状态是上下文关联的，不能解决优先级问题

于是乎，React 自己写了个类 Generator 功能函数，它支持优先级调配，以及可以中断与恢复，并且恢复后可以复用之前的状态

> PS：React-saga 还有 dva 都是用 Generator 实现可控异步

## Fiber 实现原理

在上文解释 Fiber 是什么的时候，我按照自己的理解讲了 Fiber 是什么，其中提及 FiberNode，说它是最小（工作）单位

这里我们不做过多解释，因为那样会牵扯到源码，能得到的结论是 JSX 会被编译成 React.createElement，它最后会调用 ReactElement 方法返回一个包含组件数据的对象，该对象有个参数`$$typeof: REACT_ELEMENT_TYPE` 标记了该对象是个 React Element。大致如下的对象：

```javascript
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: ƒ AppFunc(),
  _owner: null,
  _store: {validated: false},
  _self: null,
  _source: null
}
```

JSX 表示当前组件内容的数据结构，但不包含组件的 Schedule、Reconcile、Renderer 所需的信息。这些都在 FiberNode 中

所以说 React element 表示的我们写的 React 组件，React 内部又加上了一些属性和方法（比如更新的优先级、打标记等等）让其实现异步可中断的能力

而 React element + 这些属性和方法的总和就叫 FiberNode

### FiberNode的结构

源码中写到清清楚楚的[属性定义](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js#L137) 。虽然属性很多，但我们可以按三层含义将它分类

```javascript
function FiberNode(
  this: $FlowFixMe,
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber 用于连接其他 FiberNode 形成 Fiber Tree
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

#### 作为数据结构

作为静态数据结构，它所保存的信息为：

```javascript
// 表示组件类型，Function/Class/Host...
this.tag = tag;
// key 属性，利于 diff 对比
this.key = key;
// 大部分情况同type，某些情况不同，比如 FunctionComponent 使用 React.memo 包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于 ClassComponent，指 Class，对于 HostComponent，指 DOM 节点 tagName
this.type = null;
// 对应的真实DOM节点
this.stateNode = null;
```

#### 作为数据结构（Fiber Node）

Fiber 还可以理解为一种数据结构，Fiber 采用链表实现，每个 Virtual DOM 都可以表示为一个 Fiber。每个元素即每个 FiberNode，对应 React element，多个 FiberNode 形成 Fiber Tree 。它们的这种连接方式在数据结构里称为链表。一个 FiberNode 包含了 return、child、sibling 属性，如下所示：

```javascript
// 指向父级 FiberNode
this.return = null;
// 指向子级 FiberNode
this.child = null;
// 指向右边第一个兄弟 FiberNode
this.sibling = null;
```

#### 作为动态的工作单位

可以将 Fiber 理解为一个执行单位，每次执行完一个执行单位，React 就会检查现在还剩多少时间，如果没有时间就将控制权让出来，它保存了本次更新相关的信息

```javascript
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// Effects
this.flags = NoFlags;
this.subtreeFlags = NoFlags;
this.deletions = null;

// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```



## Fiber 是如何工作的（React 的渲染过程）

笔者没有能力去看源码，只能讲一下 Fiber 架构下的 React 组件时是如何渲染的。注意，笔者不会讲与源码相关的知识点，只是从组件创建到更新， Fiber 架构下的组件是如何运行的：

1. ReactDOM.render() （mount）和 setState （update）的时候开始创建更新
2. Schedule（调度器）设置优先级，并将创建的更新加入任务队列，等待调度
3. 在 requestIdleCallback 空闲时执行任务
4. 从根节点开始遍历 FiberNode，并且构建 WorkInProgress Tree
5. Reconciler（协调器） 阶段生成 EffectList（对其打标签，进行 Diff 对比）
6. Renderer（渲染器） 根据 EffectList 更新 DOM

因为一次更新过程会被分成多个"分片"完成，所以有可能一个更新任务还没完成，就被另一个更高优先级的任务打断，这时候，优先级高的更新任务会优先处理，而底优先级的任务则会作废，然后等待机会重新再来

因为一个更新过程可能被打断，所以 React Fiber 一个更新过程被分为两个阶段：**render **和 **commit**

其中 Reconciler（协调器） 工作的阶段被称为 render 阶段，因为该阶段会调用组件的 render 方法

Renderer（渲染器） 工作的阶段被称为 commit 阶段。它会把 render 阶段提交的信息渲染到页面

而 render 和 commit 阶段统称为 work，即 React 在工作中，相对应的，如果任务正在 Scheduler（调度器）内调度，就不属于 work

第一阶段，React Fiber 会找出需要更新哪些 DOM，这个阶段是可以被打断的；但到了第二阶段，那就一鼓作气把 DOM 更新完，绝不会被打断

我们来画一个图来对比下：

| 更新阶段       | render                                                       | commit                                                      |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| 作用           | 找到 Virtual DOM 中变化的部分，打上增删改的标记              | 将变更的部分一次性更新到 DOM 上                             |
| 是否可以中断   | 可以中断                                                     | 不可以中断                                                  |
| 经历的生命周期 | componentWillMount、componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate | componentDidMount、componentDidUpdate、componentWillUnmount |

简单来说：render（reconcile + schedule） + commit（renderer）两个阶段的渲染

如果用结构化思路来理的话，我认为应该是这样

render（scheduler + reconcile）

- Fiber 节点是链表的数据结构，每个 fiber 节点分别记录子节点、兄弟节点、父节点，这样好处是当中断时可以找到更新到那个节点了（即可打断）
- Fiber 架构下执行不再是递归，而是循环，每次循环做一个 Fiber 的 reconcile，当前处理的 Fiber 会放在 workInProgress 这个全局变量上，workInProgress 为空时，则执行 commit 阶段
  - 每次循环都要判断是否有更高优先级的任务以及是否有剩余时间

commit

- before mutation
  - 异步调用 useEffect 的回调函数
- mutation
- layout
  - 同步调用 useLayoutEffect 的回调函数





## 番外：时间分片

在[浏览器架构](../Browser/浏览器架构)一文中我们讲过现代浏览器由 1 个主要进程、一个 GPU 进程、多个渲染进程、多个插件进程、多个网络进程、多个音频进程、存储进程构成

在[进程与线程](../CSBasic/进程与线程)一文中我们介绍了进程和线程的关系。进程时应用程序创建的实例，而线程依托于进程

再加上我们在[浏览器的渲染原理](../Browser/浏览器的渲染原理)中所说，浏览器渲染分为三个步骤，解析、渲染、绘制

解析：HTML、CSS、JavaScript 被解析，HTML 被解析为 DOM 树，CSS 被解析成 CSS 规则数，JavaScript 通过 DOM API 和 CSSOM API 来操作  DOM Tree 和 CSS Rule Tree

渲染：浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree（渲染树），这其中进行大量的 Reflow 和 Repaint

绘制：最后调用操作系统的 Native GUI 的 API 绘制画面

有了这些知识点后，我们思考一下为什么 React15 中组件更新卡顿的问题，为什么 JavaScript 会一直占用主线程，导致卡顿

上文我们讲到人眼的流畅感觉是 16ms，即1帧的工作量不超过16ms，页面会是流程

那么浏览器一帧内的工作会经历什么呢？

![*浏览器一帧内的工作*](https://s2.loli.net/2024/06/07/Ygm2sRVdeC5Ha8x.webp)

通过上图我们可以得知：

- 处理用户的交互
- JS 解析执行
- 帧开始。窗口尺寸变更，页面滚动等事件
- rAF(requestAnimationFrame)
- 布局
- 绘制

所以如果以上六个步骤所占时间超过16ms，用户就能感到卡顿

React16 提出将渲染更新拆分成多个子任务，每次执行一小部分，做完看是否还有剩余时间，如果有，则继续下一个任务；如果没有，则挂起当前任务，将时间控制权交给主线程，等主线程不忙的时候再执行任务

因为浏览器是一帧一帧执行的，在两个执行帧之间，主线程通常会有一小段空闲时间，requestIdleCallback 可以在空闲期（Idle Period）调用空闲期回调（Idle Callback），执行一些任务

![一帧时间表](https://s2.loli.net/2024/07/01/BLgGQTZadIAJwfe.png)

- 低优先级任务由`requestIdleCallback`处理；
- 高优先级任务，如动画相关的由`requestAnimationFrame`处理；
- `requestIdleCallback`可以在多个空闲期调用空闲期回调，执行任务；
- `requestIdleCallback`方法提供 deadline，即任务执行限制时间，以切分任务，避免长时间执行，阻塞UI渲染而导致掉帧；

### 时间切片的原理

时间切片的本质是模拟实现 requestIdleCallback

除去“浏览器重绘/回流”，下面是浏览器一帧中可以用来执行 JS 的时机

```text
一个task（宏任务） -- 队列中全部 jab（微任务） -- requestAnimationFrame -- 浏览器重绘/回流 -- requestIdleCallback
```

requestIdleCallback 是再“浏览器重绘/回流”后如果当前帧还有空余时间时被调用

浏览器并没有提供其他 API 能够在同样的时机（浏览器重绘/回流后）调用以模拟其实现

唯一能精准控制调用实际的 API 是 requestAnimationFrame，它能让我们再“浏览器重绘/回流”之前执行JS

这也是为什么我们通常用这个API实现JS动画——这是浏览器渲染前的最后时机，所以动画能快速被渲染

所以，退而求其次，Scheduler 的时间切片功能是通过 task（宏任务）实现的

最常见的 task 当属 setTimeout 了，但有个 task 比 setTimeout 执行时机更靠前，那就是 [**MessageChannel**](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

所以 Scheduler 将需要被执行的回调函数作为 MessageChannel 的回调执行。如果当前宿主环境不支持 MessageChannel，则使用 setTimeout

为什么不用 setTimeout，而用 MessageChannel ？

因为 setTimeout 会有 4ms 的最小延迟时间限制，而 MessageChannel 可以在 0 ~ 1ms 内触发



## 总结

fiber 架构是 React 在 16 以后引入的，之前是 jsx -> render function -> vdom 然后直接递归渲染 vdom，现在则是多了一步 vdom 转 fiber 的 reconcile，在 reconcile 的过程中创建 dom 和做 diff 并打上增删改的 effectTag，然后一次性 commit。这个 reconcile 是可被打断的，可以调度，也就是 fiber 的 schedule。







## 参考资料

-   [React 技术揭秘](https://react.iamkasong.com/)
-   [完全理解 React Fiber](http://www.ayqy.net/blog/dive-into-react-fiber/)
-   [[译]深入 React fiber 架构及源码](https://zhuanlan.zhihu.com/p/57346388)
-   [看家本领来了：全面了解 React Suspense 和 Hooks](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484462&idx=1&sn=5dbd034c08a993f6ff7a65d62da0b9bd&source=41#wechat_redirect)
-   [走进 React Fiber 的世界](https://juejin.cn/post/6937560479795511303)
-   [React Fiber 是什么](https://zhuanlan.zhihu.com/p/26027085)
-   [react fiber 到底有多细](https://mp.weixin.qq.com/s/gz7_StDD151Qnt-ziSfmSw)
-   [你不知道的 React Virtual DOM](https://juejin.cn/post/6985058301184737287#heading-6)
-   [我对 React 实现原理的理解](https://zhuanlan.zhihu.com/p/538096803)
