# 2024 React 高频面试题

知乎上有个问题：[如果进阿里前端，代码能力得达到什么程度？](https://www.zhihu.com/question/29191974/answer/1620274467)

2020年12月份阿里官方的回答中，如果熟练掌握 React 前端框架，了解技术底层的话，中高级的要求点是：

-   能说明白为什么要实现 fiber，以及可能带来的坑
-   能说明白为什么要实现 hook
-   能说明白为什么要用 immutable，以及用或者不用的考虑
-   知道 react 不常用的特性，比如 context，portal
-   能用自己的理解说明白 react like 框架的本质，能说明白如何让这些框架共存
-   能设计出框架无关的技术架构。包括但不限于：
-   说明如何解决可能存在的冲突问题，需要结合实际案例。
-   能说明架构分层逻辑、各层的核心模块，以及核心模块要解决的问题。能结合实际场景例举一些坑或者优雅的处理方案则更佳
-   看过全家桶源码，不要求每行都看，但是知道核心实现原理和底层依赖。能口喷几行关键代码把对应类库实现即达标
-   能从数据驱动角度透彻的说明白 redux，能够口喷原生 js 和 redux 结合要怎么做
-   能结合 redux，vuex，mobx 等数据流谈谈自己对 vue 和 react 的异同
-   有基于全家桶构建复杂应用的经验，比如最近很火的微前端和这些类库结合的时候要注意什么，会有什么坑，怎么解决

试问自己，自己能回答的上来吗，如果回答不上来，那么看一下我的回答吧



## Fiber 

### Q：请问 Fiber 是什么？

A： React Fiber 是 React 对核心算法的一次重新实现。它有三层含义，作为架构，作为静态数据结构，作为动态工作单位

作为架构：之前是 Stack Reconciler，之后叫 Fiber Reconciler

作为静态数据结构：每一个 Fiber 节点对应一个 React.element，它保存了该组件的类型以及对应 DOM 节点等信息

作为动态的工作单位：每个 Fiber 节点保存了本次更新中该组件改变的状态、要执行的工作

### Q: React 为什么要提出 Fiber？

A： React 在 V16 之前会面临的主要性能问题是：当组件很庞大时，更新状态可能造成页面卡顿，根本原因在于——更新流程是【同步、不可中断的】

为了解决这个问题，React 重写了代码，提出了 Fiber 架构，设计出异步可中断的架构，解决了这个问题

### Q: Fiber 是怎么实现渲染（任务）可中断的？⭐

A：React 实现了类似 requestIdleCallback 的功能（React 使用 MessageChannel 实现），使得任务能实现中断执行。当一个任务执行时间过长时，会被中断机制强制中断，并存储数据，等到下一个任务执行有空闲时间后，再被调度恢复之前任务的信息并继续执行

### Q: Fiber 中动态优先级是什么？

A：根据当前状态，调整优先级，给每个任务加权重值，表示它的优先级。如果一个任务的优先级比另一个任务高，它会打断低优先级任务并先执行。通过权重值做到任务是先执行还是后执行

### Q：Fiber 中优先级的权重值的原理

A：每一个 Fiber 节点但都有一个 priorityLevel 属性，用来表示任务优先级。优先级分为多个等级，包括 Immediate、UserBlocking、Normal、Low 和 Idle 等。

在执行任务时，调度器会先处理高优先级的任务，并且可以中断低优先级任务的执行。当高优先级任务完成后，调度器会恢复低优先级任务的执行，并复用之前的中间状态

对于低优先级任务，调度器会利用浏览器的空闲时间来处理，从而不会阻塞用户交互

### Q: Fiber 怎么做到让出控制权呢

> 使用 Fiber 除了可中断执行，他还有个特点，使用 Fiber 进行任务控制，当我分批处理任务，我会让出浏览器的控制权，好让浏览器可以执行其他的操作。Fiber 怎么做到让出控制权呢

A： 自己封装的 requestIdleCallback。

### Q：为什么不用 setTimeout，而用 MessageChannel 

A：setTimeout 会有延迟，因为 setTimeout 默认有 4 毫秒的延迟。使用 MessageChannel 可以实现，它工作原理和 setTimeout 类似，延迟为 0~1 ms

### Q：Fiber 是通过什么实现时间切片的

A：requestIdleCallback 有兼容性问题，不是所有浏览器都支持，所以 React 团队用 MessageChannel 模拟 requestIdleCallback

### Q：Fiber 是什么样的数据结构？

A：（单向）链表。主要包含一下链接属性：

- return：指向父 Fiber 节点的指针
- child：指向第一个子 Fiber 节点的指针
- sibling：指向下一个兄弟 Fiber 节点的指针

### Q：必须是链表吗，能用数组吗

A：链表结构能够更高效地插入和删除节点

### Q: Fiber 是如何支持动画的呢

A：requestAnimationFrame



## Virtual DOM（虚拟DOM）

### Q： 讲一下你对虚拟DOM的理解？

A：虚拟 DOM 是对真实 DOM 的一种抽象和映射。它本质是一个 JavaScript 对象，能够用轻量级的方式描述 DOM 结构和属性信息

它作为 DOM 的一层缓存和映射，能够提高前端性能优化，它可以通过比较新旧虚拟 DOM 来计算出最小化 DOM 差异，从而最小化对真实DOM的更新，减少DOM操作

它的工作原理分为三步：

1. 更新过程：当组件的状态发生变化时，React 会创建一个新的虚拟 DOM 树来放映最新的组件状态
2. 差异比较（Diff）：React通过比较新旧 DOM 树，来确定实际 DOM 需要做哪些具体的更新
3. 批量更新（Reconciliation）：一单 React 确定了需要进行的 DOM 更新，它会尽量批量执行这些更新，以最小化操作实际DOM的次数，从而提高性能

### Q： 虚拟DOM 有什么用？

A：有三个作用。一减少页面渲染的次数，提高渲染效率；二提供更好的跨平台能力；三为函数式的 UI 编程打开了大门

### Q： React 的 Virtual DOM（虚拟DOM） 是怎么实现的？

A：React 是把真实的 DOM 树转换为 JS 对象树，也就是 Virtual DOM。每次数据更新后，重新计算 VM，并和上一次生成的 VM 树进行对比，对发生变化的部分进行批量更新。除了性能之外，VM 的实现最大的好处在于和其他平台的集成。

虚拟 DOM 的本质是 JavaScript 对象，它可以代表真实 DOM 的抽象表示。通过预先操作虚拟 DOM，在某个时机找出与真实 DOM 之间的差异并重新渲染，来提升真实 DOM 的性能和效率

### Q：考虑过 React 、 Vue 这类的框架为什么要用 Virtual DOM 机制吗？

A：为了减少不必要的 DOM 渲染、跨平台、为函数式的 UI 编程打开了大门

### Q：为什么 Virtual Dom 会提高性能？

A：因为 VM 并不是真实的操作 DOM，通过 Diff 算法可以避免一些不变更的 DOM 操作，从而提高性能

但是不一定会提高性能，他只是通过 Diff 算法避免了一些不需要变更的 DOM 操作，但最终还是要操作 DOM 的，并且 Diff 的过程也需要成本



## Diff 算法

### Q：简单介绍下 Diff 算法

A：本来涉及到两棵树的对比，时间复杂度是 O(n^3)。为了降低时间复杂度，React 基于两个假设条件（启发式算法 O(n) ）：

-   两个不同类型的元素会产生不同的树
-   同一层级的子节点，可以通过唯一标识符（key）进行区分

### Q：Diff 中的key的作用，为什么不建议用index作为key

A：唯一性标识，index 会重合，做 Diff 算法的时候定位元素比较困难



## 组件

### Q： React 组件间有哪些通讯方式？

A：父传子（props），子传父（props 回调），跨组件（context），非嵌套组件通信（事件订阅，远亲组件，用第三方状态库，如Redux、MobX）

### Q：父组件如何调用子组件中的方法？

A：一般都是子组件调用父组件的方法，那有什么办法让父组件调用子组件的方法？分两种场景

-   类组件
    -   createRef
    -   回调函数
-   函数式组件
    -   forwardRef + useImperativeHandle
    -   回调函数

### Q： React 是如何区分 class 和 function 的？

A：在 Component 的 prototype 上有 isReactComponent ，函数式组件没有

```javascript
// React 内部
class Component {}
Component.prototype.isReactComponent = {};
```

### Q： React 有哪几种创建组件的方式？有什么区别

A：函数式组件、类组件、createElement

PS：这个问题已经淘汰，以前的函数组件是没有状态的，但现在 16.8 之后就有 hook，函数式组件也有状态；反而类组件没多少人写了，因为生命周期很麻烦，也难记



## 性能优化

### Q：哪些方法会触发 React 的重新渲染呢

A：父元素渲染、state、props更新（数据更新）、focusUpdate

### Q：React 怎么避免重复渲染

A：React.memo、useMemo、useCallback

### Q：介绍一下 React.memo

A：React.memo 是一个高阶组件(higher-order component),它可以用来包装一个函数组件,使之成为一个"记忆"的组件。React.memo 是对函数组件的 Props 进行浅比较

> 浅比较：只会比较 props 对象的第一层属性,不会深入比较嵌套对象或数组的内部结构
>
> 如果 props 相等，直接用上一次渲染的结果；如果 props 不相等，则返回

### Q：useMemo 和 useCallback 呢

A：useMemo 和 useCallback 是 React Hooks 中的两个重要函数，它们也都是用于性能优化的工具

useMemo：用于缓存计算结果。它接受一个函数和一个依赖数组,在依赖数组中的变量发生变化时,才会重新计算并返回新的结果

useCallback：缓存回调函数。它接受一个函数和一个依赖数组,在依赖数组中的变量发生变化时,才会重新创建函数实例

### Q：在 React 中可以做哪些性能优化

列表项使用 key 属性

类组件

-   shouldComponentUpdate 避免不必要的渲染

    -   true：当前组件进行 render
    -   false：当前组件不进行 render
    -   用法：shouldComponentUpdate(nextProps, nextState)

-   将函数绑定放在构造函数、或者在定义阶段使用箭头函数绑定，可以避免每次都绑定事件
-   PureComponent 会对 props 和 state 进行前对比

函数式组件

-   memo 避免不必要的渲染

    -   与 shouldComponentUpdate 相反，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false

-   useMemo、useCallback
    -   useMemo 返回缓存的值
    -   useCallback 返回缓存的函数

### Q：请问 React/ Vue 之类的框架为什么需要给组件添加 key 属性，其作用是什么？

A：唯一性，做 Diff 算法



## state & setState

### Q：使用 setState 底层发生了什么事情⭐

首先，React 把一次渲染分为两个阶段，render 和 commit。其中 Reconciler 工作的阶段被称为 render 阶段，因为该阶段会调用组件的 render 方法；Renderer 工作的阶段被称为 commit 阶段。它会把 render 阶段提交的信息渲染到页面

- render 阶段可以中断，它会找diff，会找出所有节点的变更
  - 生命周期会被多次调用，因为会被高优先级任务打断
  - componentWillMount、componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate
- commit 阶段不可中断，会执行所有的变更（change）
  - 只会调用一次，同步执行
  - componentDidMount、componentDidUpdate、componentWillUnmount

当使用 setState 后，React 会经历以下步骤：

1. setState 后会产生一个更新（即创建 update），将 Update 对象入队到 updateQueue 中

2. Scheduler 查看是否有更高优先级的任务，并将创建的更新加入任务队列，等待调度

3. 在 requestIdleCallback 空闲时执行任务
4. 从根节点开始遍历 FiberNode，并且构建 WorkInProgress Tree
5. Reconciler（协调器） 阶段生成 EffectList（对其打标签，进行 Diff 对比）
6. Renderer（渲染器） 根据 EffectList 更新 DOM

自此完成一个更新渲染流程

其中，1、2、3、4、5 为 render 阶段，由 Scheduler 调度任务，可以被打断

6 为 commit 阶段，是将 Reconciler 记录的需要更改的 Virtual DOM 映射到真实DOM上，该阶段不可打断

render 阶段可以被打断，因为表示每个组件的节点已经从 React15 的树形结构改成了之后的链表结构，更新流程不再是递归，而是循环：

```javascript
function workLoop() {
  while (wip) {
    performUnitOfWork();
  }

  if (!wip && wipRoot) {
    commitRoot();
  }
}
```

而且每次循环都会调用`shouldYiled()` 判断当前是否有剩余时间：

```javascript
function workLoopConcurrent() {
    // Perform work until Scheduler asks us to yield
    while (workInProgress !== null && !shouldYield()) {
        workInProgress = performUnitOfWork(workInProgress);
    }
}
```

所以以上步骤中的 2、3、4、5可能会因为以下原因而被中断：

- 有更高优先级的任务更新
- 当前帧没有剩余时间

### Q：setState 有两个参数，第二个参数是做什么的

A：第二个参数是可选的回调函数，它会在组件重新渲染后执行

### Q：请问 setState 是异步还是同步？为什么？

**React 18 之后 setState 都是异步**

**React 18 之后 setState 都是异步**

**React 18 之后 setState 都是异步**

A：代码是同步的，但是渲染是异步的。在 React18 之前，React能控制的，比如说生命周期，合成事件都是异步的，React无法控制的地方，比如说原生事件、setTimeout/setInterval 就是同步的

为什么？

为了提高性能，React 会采用自动批处理

### Q：为什么要设计成异步？

A：React 的核心开发者员 [Dan Abramov](https://overreacted.io/) 回复这不是一个历史包袱，而是一个设计，完整回复请看 [issue](https://github.com/facebook/react/issues/11527#issuecomment-360199710)，简单来说有几点考量：

1. 保持内部一致性
   - React 的设计确保了 state、props、refs 等对象的行为和表现的一致性。即使 setState 是同步的，props也无法同步更新，因为只有付组件重渲染之后才能知道新的 props。React 选择异步更新 state 和 props，以保证在重构代码时，无论是提升 state 还是使用 props，代码的行为都是一致的
2. 性能优化
   - React 会根据不同的调用源（如事件处理、网络请求、动画等）给 setState 调用不同的优先级，这意味着一些状态更新可能被延迟，从而优化性能，例如在用户输入时优先处理输入框的状态更新，而延迟处理接收到的新消息的渲染
3. 更多的可能性
   - 当切换当前页面，通过 setState 异步，让 React 幕后渲染页面

### Q：在 shouldComponentUpdate 或 componentWillUpdate 中使用 setState 会发生什么？

A：禁止在 shouldComponentUpdate 和 componentWillUpdate 中调用 setState，为什么，这回造成循环调用，直至内存崩溃。 setState 会触发 React 的更新机制，好让视图更新，会依次触发生命周期函数，而 shouldComponentUpdate 、componentWillUpdate 都是必过的生命周期，会造成循环调用（PS： componentWillUpdate 未来版本会不用）

### Q：为什么不能直接使用 this.state 改变数据

A：修改值不改变视图，setState 不仅是修改 this.state 的值，更重要的是它会触发 React 的更新机制，会进行 diff，然后将 patch 部分更新到真实 DOM 中

### Q：React 组件主动更新的方法有那些？

A：setState、forceUpdate、this.setState、this.forceUpdate、ReactDOM.render

被动渲染组件的方法：修改 props

## Hooks

### Q：你对 Hooks 了解吗？Hooks 的本质是什么？为什么？

A： React Hooks 是 React 16.8 之后推出的函数式组件状态管理方案。它是为了解决状态复用、类组件写法麻烦等原因而提出的

本质是什么？闭包

### Q：Hooks 到底解决了哪些问题？

A：复用状态逻辑、组件复用、class 写的难以理解，而且Hooks的写法符合函数式写法，更贴合 React 函数式编程范式

### Q：为什么不能在循环中调用 hooks？或者说为什么不能在 for 循环、if 语句里使用 hooks？

A：Hooks 的使用规则：不要在循环、条件或嵌套函数中使用 Hook，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们

存 Hooks 状态的对象是以**单链表**的形式储存状态，如果用循环、条件或者嵌套函数等方式使用 Hooks，会破坏 Hooks 的调用顺序

```typescript
fiber.memorizedstate(hook@)-> next(hook1)-> next(hook2)->next(hook3)->next(hook4)->...
```

React 中每个组件都有一个对应的 FiberNode，其实就是一个对象，这个对象有个属性叫 memoizedState。当组件是函数组件的时候，Fiber.memoizedState 上存储的就是 Hooks 单链表

单链表的每个 Hook 节点没有名字或者 key，因为除了它们的顺序，我们无法记录它们的唯一性。因为为了确保某个 Hook 是它本身，我们不能破坏这个链表的稳定性

PS： Hook 类型定义如下：

```javascript
export type Hook = {
    memoizedState: any, // 最新状态值
    baseState: any, // 初始状态值
    baseQueue: Update<any, any> | null,
    queue: UpdateQueue<any, any> | null, // 环形链表，存储的是该 hook 多次调用产生的更新对象
    next: Hook | null,  // next 指针，之下链表中的下一个 Hook，如果为 null，证明是最后一个 Hook
}
```

### Q： React hooks，它带来了哪些便利

A：逻辑复用、业务代码更聚合、写法更简洁

### Q：列举几个常用的 Hook

A： useState、useEffect、useRef、useCallback、useMemo、useReducer、useLayoutEffect 等

### Q：useState 为什么用数组，而不用对象

A：降低使用复杂度。数组可以用解构赋值降低复杂度，而对象不行

### Q：useEffect 实现原理？⭐

A：useEffect 是 React 中用于处理组件副作用的重要 Hooks。在组件渲染（render）阶段，useEffect 会将 effect 函数放到 Fiber.updateQueue 的环线链表中

在组件提交（commit）阶段，React 会遍历所有 Fiber 的 updateQueue，取出 effect 函数并异步执行

effect 函数执行完毕会返回一个清理函数，在组件销毁浅会执行这个清理函数

如果 useEffect 第二个参数是空数组，则 effect 函数只会在组件挂载时执行一次，相当于 ComponentDidMount 的效果（但不是，下面回答）

useEffect只能在函数组件的最外层调用，不能在循环、条件判断等内部代码块中调用。这是因为Hooks依赖于特殊的队列数据结构

### Q：说下 React hooks 实现原理

A：闭包、Fiber、链表

Hooks 主要是利用闭包来保存状态，使用链表保存一系列 Hooks，将链表中的第一个 Hook 与 Fiber 关联。在 Fiber 树更新时，就能从 Hooks 中计算出最终输出的状态和执行相关的副作用

### Q： React Hooks 当中的 useEffect 是如何区分生命周期钩子的

A：第二个参数为空数组，简单来说是依赖项为空

### Q： useEffect(fn, []) 和 componentDidMount 有什么差异

A： useEffect 会捕获 props 和 state。即使在回调函数里，你拿到的还是初始的 props 和 state。如果你想要得到“最新”的值，你可以使用 ref。不过通常会有更简单的实现方式，所以你并不一定要用 ref。记住，effects 的心智模型和 componentDidMount 以及其他生命周期是不同的，试图找到它们之间完全一致的表达反而更容易是你混淆。想要更有效，你需要“think in effects”，它的心智模型更接近于实现状态同步，而不是响应生命周期 ——Dan

#### 执行时机不同

componentDidMount 在组件挂载之后运行。如果立即（同步）设置 state，那么 React 就会触发一次额外的 render，并将第二个 render 的响应作为初始 UI，

useEffect 也是在挂载后运行，但是它更往后，它不会阻塞真实 DOM 渲染，因为 useEffect 在绘制（Paint）之后异步运行。

#### Props 和 State 的捕获（Capture Value）

每次渲染就会捕获新的 props 和 state

### Q: Hooks 、HOC、Props 有什么区别，为什么不用 HOC

A: 相同点：都是为了解决**代码复用**问题

HOC 接受一个组件，加上一些逻辑后返回一个新组件

Props 实现数据共享

Hooks 可以让你在不编写 Class 的情况下，使用 state

从 min 到 HOC 再到 Hooks，就是**代码复用**的发展历程

HOC 的缺点是会有嵌套、props 会被劫持，容易出现冲突，Hooks 没有个问题

### Q: useMemo，useCallback 的区别，你是如何看待这两个 api 的意义，在什么场景下会使用它

A: useMemo 缓存值，useCallback 缓存函数。两个函数的用法很像

### Q: 为什么 useState 不能在判断语句中声明？

A：官网里写了只在最顶层使用 Hooks。不要在循环，条件或嵌套函数中调用 Hook，确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。

state 是以链表的数据结构存在，多个 state 之间同构 next 进行关联。假设有 3 个 state，A、B、C。如果 B 在判断语句中，那么就会出现 A，B 的状态能够及时更新，但是 C 不会更新。因为调用 2 次 useState，只会更新两次 state，在 state 的链表中，A.next ->B，B.next -> C，那么就只会更新 A、B。C 不会更新，导致一些不可预知的问题

### Q：useLayoutEffect 和 useEffect 的区别

useLayoutEffect 和 useEffect 的区别在于执行时机：

- useEffect 是在浏览器页面渲染后异步执行、，它不会阻塞浏览器的渲染过程
   - commit 阶段的 before mutation 阶段调用
   - 但是会在 layout 完成后才异步执行
- useLayoutEffect 是在浏览器完成 DOM 更新后但浏览器进行下一次绘制之前同步执行，它会阻塞浏览器的渲染过程
   - commit 阶段 的 layout 阶段同步执行
   - 等价于类组件中的 componentDidMount





## 事件机制

### Q：React 合成事件是什么？它与原生事件有什么区别？

A：React 合成事件是 React 模拟原生 DOM 事件所有能力的一个事件对象。它的作用是为了解决浏览器兼容性问题

与原生事件相比，合成事件有以下主要区别：

- 跨浏览器兼容性
- 批量更新
- 事件委托
- 跨平台

### Q：React 的事件机制是怎么样的（是什么？）

A：初始化渲染时在 root 节点上注册原生事件；原生事件触发时模拟捕获、目标和冒泡阶段派发合成事件。通过这种机制，冒泡的原生事件类型最多在 root 节点上注册一次，节省内存

### Q：React 中如何阻止事件冒泡

A: `e.stopPropagation` 阻止事件冒泡；`e.preventDefault`：阻止默认行为，如阻止表单提交、链接跳转等

### Q： React 的事件代理机制和原生事件绑定有什么区别？

A：有以下区别

1. 绑定方式不同。原生 DOM 事件直接绑定再具体的 DOM 原生上，而 React 的合成事件是通过事件委托的方式绑定再最近的 React 根节点上
2. 事件名称命名方式不同。原生事件使用“on”前缀加事件名的命名方式（如“onclick”），而 React 事件则使用小驼峰（camelCase）的命名方式（如“onClick”）
3. 事件对象的属性和方法不完全相同。React 的合成事件对象 SyntheticEvent 提供了一些跨浏览器的兼容性API，而原生事件对象则是浏览器原生的
4. 内存消耗和动态绑定事件，React 的事件委托机制减少了内存消耗，并支持动态绑定事件

### Q: React 事件代理是什么

A: React 利用事件委托机制在根节点上统一监听 DOM 事件，再根据触发的 target 将事件分发到具体的组件实例。另外其中的 e 是合成事件对象（SyntheticEvent），而不是原生的 DOM 事件对象

### Q: React 事件代理的原理是什么

A: React 基于 Virtual DOM 实现了一个合成（SyntheticEvent）层，在合成层它会处理事件的接受和分发。它通过事件委派将所有事件都绑定再根节点上，统一监听 DOM 事件

- 在这个事件监听器上维持了一个映射来保存组件内部的事件监听与处理函数。当组件挂载或卸载时，再这个统一的事件监听器上进行删除和插入一些对象；当事件触发时，先被监听器拦截，然后在映射表中找到真正的处理函数并调用，这样简化了事件处理和回收机制，提高效率

还有就是自动绑定。React 的上下文会指向该组件的实例，即自动绑定 this 为当前组件

简单来说：React 底层主要对合成事件做了两件事情：**事件委托和自动绑定**

### Q: React 的事件代理机制和原生事件绑定混用会有什么问题？

A: React 的事件代理机制的本质是事件委托，在合成事件内部仅仅对根节点进行的绑定，所以当 React 点击事件触发时，其实事件并没有绑定到原组件事件上，而是再根节点上，当混用时，React 事情可能会失效



## 生态相关

### Q：Redux 是什么

A：一个状态管理库，一般和 React 搭配使用。遵循单向数据流的开发模式。用户通过 action 发起 dispatch ，通过 reducer 返回新的 store。reducer 是一个纯函数，传入 store 后会输出 store

### Q：讲一下 Redux 的原理和工作流程？⭐

A：Redux 核心概念包括

- Store：存储应用的整个状态
- Action：描述应用状态变化的事情
- Reducer：根据 Action 更新 Store 中的状态

Redux 的工作流程如下：

1. 用户在应用中触发某个事件，比如点击按钮
2. 即 dispatch 一个 Action 
3. Reducer 函数接受一个 Action，根据其更新 Store 中的状态
4. Store 状态发生变化，View 跟着变化

view -> store.dispatch(action) -> 中间件 -> store -> reducer -> store(新state) -> view（通知）

### Q：React-redux 的实现原理

A：React-redux 通过 Provider 组件和 connect() 高阶组件，将 Redux 的状态管理机制与 React 组件衔接在一起

### Q: React-redux 中 connect 实现原理

A：connect() 是一个高姐组件，它通过订阅 Store 变化、映射 state 和 dispatch 到 props。

### Q： Redux 和 mobx 的区别

A：主要区别如下：

1. 设计思想不同：Redux 更多遵循函数式编程思想，而 Mobx 则更多从面向对象的角度考虑问题
2. 数据管理方式不同：Redux 是集中在一个大 store 中进行统一管理，而 Mobx 则将数据保存在多个分散的 store 中
3. 数据变化追踪不同，Mobx 是采用了隐式数据流，可以自动追踪状态的依赖关系，只更新相关组件。而 Redux 采用显示的数据流，需要开发者手动指定数据流的路径

### Q：Redux 中的异步是怎么做的？

A：中间件 redux-saga、redux-thunk



## 其他

### Q：渲染十万条数据解决方案

A：[渲染十万条数据解决方案](./渲染十万条数据解决方案.md)

### Q：如何获取 React 的DOM 元素

A：ref ，函数式组件中通过 useRef 获取

### Q：讲一下你对 context 的理解

A：Context 是 React 提供的一种跨组件传递数据的机制。工作原理是 先创建一个 Context 对象，然后在组件树的顶层使用 Context 的 Provider 组件提供数据，子孙组件则通过 useContext 等方法获取数据。

使用 Context 的好处是可以更好的管理全局状态，减少 props 过深的问题

### Q：React.lazy 懒加载实现原理

A： `React.lazy` 是 React16.6引入的功能，可以实现组件的动态导入和懒加载

它利用了 dynamic import 这个语法，允许我们动态导入模块，而不是在构建时静态引入

React.lazy 和 Suspense 配合使用，可以有效地将应用程序分割成更小的 chunks，按需加载，提供应用程序的性能和用户体验

### Q：函数式组件和类组件有什么区别

A：最大的区别在于函数式组件会捕获渲染时的值

具体可以看这篇文章——[函数式组件与类组件有何不同](../React/函数式组件与类组件有何不同)





## 生命周期（2024年已过时）

### Q：简述下 React 的生命周期？每个声明周期都做了什么？

A：类组件才有的概念。一般分为挂载时，更新时，卸载时、错误时三块，

挂载时（Mount）：constructor、getDerivedStateFromProps 、render、componentDidMount、

更新时（Update）：getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate

卸载时（Unmount）：componentWillUnmount

错误时（Error）：getDerivedStateFromError、componentDidCatch

![image-20220304145136362](https://s2.loli.net/2022/03/04/ha3NcqybKZ24QkP.png)

## 其他

### Q：React 中如何做异常

A：使用 Error Boundary 组件，它可以捕获子组件的渲染错误、生命周期错误以及构造函数错误

getDerivedStateFromError：用来处理错误、componentDidCatch：输出完整的错误信息

try / catch 仅能用于命令式代码（imperative code）,但是 react 组件是声明式的，所以需要错误边界来捕捉错误

### Q：使用 Error Boundary 组件会有什么问题

A: 

1. 不能捕获事件处理函数中的异常，Error Boundary 组件只能捕获渲染期间的异常，无法捕获事件处理程序中的异常；可以使用 try-catch 或 window.onerror/window.addEventListener("error") 进行捕获
2. 不能捕获异步操作中的异常，如 Promise，setTimeout 的异常无法捕获，可以用 window.addEvent('onhandledrejection')  进行捕获
3. 错误信息不够详细，它会返回一个回退UI，并不会提供太多的错误信息



### Q：为什么 constructor 里要调用 super 和传递 props？

A：这是官网的一段代码，具体见：[状态（State） 和 生命周期](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)

```jsx
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
                <h2>It is {this.state.date.toLocalTimeString()}</h2>
            </div>
        );
    }
}
```

而且有这么一段话，不仅让我们调用 `super` 还要把 `props` 传递进去，但是没有告诉我们为什么要这么做。

不知道你有没有疑惑为什么要调用 `super` 和传递 `props`，接下来我们来揭开谜题吧

**为什么要调用 super**

其实这不是 React 的限制，这是 JavaScript 的限制，在构造函数里如果要调用 this，那么提前就要调用 super，在 React 里，我们常常会在构造函数里初始化 state ，`this.state = xxx` ,所以需要调用 super

**为什么要传递 props**

你可以能以为必须给 `super` 传入 `props` ,否则 `React.Component` 就没办法初始化 `this.props`

```javascript
class Component {
    constructor(props) {
        this.props = props;
        // ...
    }
}
```

不过，如果你不小心漏传了 `props` ，直接调用了 `super()` ，你仍然可以在 `render` 和其他方法中访问 `this.props`

难道这样也行？**因为 React 会在构造函数被调用之后，会把 props 赋值给刚刚创建的实例对象**

```javascript
const instance = new YourComponent(props);
instance.props = props;
```

`props` 不传也能用，是有原因的。

但这意味着你在使用 React 时，可以用 `super()` 代替 `super(props)` 了么？

那还是不行的，不然官网也不会建议你调用 props 了，虽然 React 会在构造函数运行之后，为 `this.props` 赋值，但在 `super()` 调用之后与构造函数结束之前， `this.props` 仍然是没法用的

```javascript
class Component {
    constructor(props) {
        this.props = props;
        // ...
    }
}
class Button extends React.Component {
    constructor(props) {
        super(); // 没有传入 props
        console.log(props); // {}
        console.log(this.props); // undefined
    }
}
```

要是构造函数中调用了某个访问 `props` 的方法，那这个 bug 就更难定位了。因此我强烈建议始终使用 super(props)，即使这不是必须的：

```javascript
class Button extends React.Component {
    constructor(props) {
        super(props); //  传入 props
        console.log(props); //  {}
        console.log(this.props); //  {}
    }
    // ...
}
```

### Q：为什么调用方法要 bind this？

A：四种写实践的写法

### Q： React 中的 ref 是干嘛的？

A：操作实例或 DOM 的 API

### Q：什么是 Portals？

A：传送门，能在指定的 dom 上渲染组件

### Q：什么是 suspense 组件？

A：一般和 lazy 结合，在页面加载出来前渲染

### Q：为什么 React 元素有一个 `$$typeof` 属性？

A： Dan 写的[一篇文章](https://overreacted.io/why-do-react-elements-have-typeof-property/)，是为了防止 XSS 攻击。因为 JSON 不支持 Symbol 类型，所以服务器通过 JSON 攻击不会影响到 React

### Q：为什么 JSX 中的组件名要以大写字母开头

A：判断当前渲染的元素是组件还是 HTML 元素

### Q： React 17、React 18 有什么新的特性

A： concurrent 模式，异步可中断

### Q：请问 React 有什么坑点？

A：

1. JSX 做表达式判断时，需要强转未 boolean 类型，如：

```jsx
render() {
    const b = 0;
    return (
    	<div>
        	{
                !!b && <div>这是一段文字</div>
            }
        </div>
    )
}
```

如果不使用!!b 进行强转数据类型，会在页面里面输出 0

2. 如果 key 不变，数据就不会变，如果两列数据为[1, 2, 3] ,[1, 2, 3, 4, 5, 6]点击第一组数据中的任意项，此数据标红，且展示第二组数据，如果展示 UI 时，key 为 index，那么前三是不会被替换的，你看的会是数据标红了且是第二条数据



## 参考资料

-   [如果进阿里前端，代码能力得达到什么程度？](https://www.zhihu.com/question/29191974/answer/1620274467)
-   [金三银四 React 常见面试题](https://juejin.cn/post/6940287134154637326)
-   [一年半经验，百度、有赞、阿里前端面试总结](https://github.com/yacan8/blog/issues/18)
-   [React 灵魂 23 问，你能答对几个？](https://zhuanlan.zhihu.com/p/304213203)
-   [新手学习 react 迷惑的点(完整版)](https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484614&idx=1&sn=a2b5050136c2cd5e00db90a6cc8daaed&chksm=ea0167aadd76eebc0af31bf8de9ee7e5a35ecdb9e19045f5f36a0e5f8e3ae28e25e58eec0994&mpshare=1&scene=1&srcid=&sharer_sharetime=1567645123897&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [react中onClick={fun}和onClick=>{()=>fun}有何区别呢？](https://www.zhihu.com/question/504049336/answer/2294252770)
