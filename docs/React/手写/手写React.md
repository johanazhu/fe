# 手写 React

首先，我们站在全局看写，先看一下 React 的工作流程

React 工作流程

React 式声明式 UI 库，负责将 State 转换为页面结构（虚拟 DOM 结构）后，再转换成真实 DOM 结构，交给浏览器渲染。当 State 发生改变时，React 会先进行调和（Reconciliation）阶段，调和阶段结束后立刻进入提交（Commit）阶段，提交阶段结束后，新 State 对应的页面才被展示出来

React 的**调和阶段**需要做两件事：

- 计算出目标 state 对应的虚拟 DOM 结构
- 寻找 【将虚拟 DOM 结构修改为目标虚拟 DOM 结构】的最有更新方案

React 按照深度优先遍历虚拟 DOM 树的方式，在一个虚拟 DOM 上完成两件事的计算后，再计算下一个虚拟 DOM。第一件事主要调用类组件的 render 方法活函数组件自身。第二件事为 React 内部实现的 Diff 算法，Diff 算法会记录虚拟 DOM 的更新方法（如 Update、Mount、Unmount），为提交阶段做准备

React 的**提交阶段**也需要做两件事

- 将调和阶段记录的更新方案应用到 DOM 中
- 调用暴露给开发者的钩子方法，如 componentDidUpdate、useLayoutEffect 等

提交

目录总览

- 从一次简单的 React 渲染说起
- 实现 createElement 函数
- 实现 render 函数
- 并发模式/ Concurrent Mode
- Fibers 数据结构
- render 和 commit 阶段
- 更新和删除节点/Reconciliation
- 函数组件
- 函数组件 Hooks

要实现以下功能：

- createElement（Virtual DOM）
- render
- 可中断渲染
- Fibers
- Render and Commit Phases
- 协调（Diff 算法）
- 函数组件
- hooks

## 从一次最简单的 React 渲染说起

```jsx
const element = <h1 title="hello">Hello World!</h1>;
const container = document.getElementById('root');
ReactDOM.render(element, container);
```

上面这三行代码式一个再简单不过的 React 应用：在 root 根节点上渲染一个 Hello World！的 h1 标签节点

可看[demo1]()

这里就有三个疑问

- element 组件是什么
- element 输出什么
- ReactDOM.render 做了什么

回答问题之前，我们先了解下 JSX

### JSX

在 React 中，我们用 JSX 来写业务，它的本质还是 JS，是语法糖而不是 html 模板，

那么我们写的 JSX 会被转变成什么，这也是 element 组件是什么的同质疑问。

它通过 babel 来转换，babel 有个特定的库——[@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)

我们查看 babel 的在线例子，可以看到通过 JSX 来写的代码，会被转换为 `React.createElement(type, props, children)`

如上述的 element 组件，被转变成以下代码：

```js
React.createElement(
  'h1',
  {
    title: 'hello',
  },
  'Hello World!',
);
```

那 React.createElement 把代码转变成什么呢，我们打印 element 元素，能看到：

![image-20220225111649791](https://s2.loli.net/2022/02/25/A5gIEQLMltq3aKB.png)

所以 React.createElement 函数返回的是个对象，它包括了

```javascript
$$typeof: Symbol(react.element)
key: null
props: {title: 'hello', children: 'Hello World'}
ref: null
type: "h1"
_owner: null
_store: {validated: false}
_self: null
_source: null
```

type 就是 DOM 节点的名字，比如这里是 h1。props 包含所有元素的属性（例子中为 title）和特殊属性 children，children 可以包含其他元素，key 是每个组件的为一只，是为了性能优化（与 diff 算法相关），ref 是为了操作 dom 而出的特殊属性。其他的都是些内部属性，暂不研究

key、ref 不错说，p

回去看[源码]()：

```javascript
export function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}
```

至于 [ReactElement]() 工厂方法的代码就是返回一个对象

```javascript
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };
  return element;
};
```

以本文案例为例：它返回的信息为：

```javascript
const element = {
  type: 'h1',
  props: {
    title: 'hello',
    // createElement 第三个及之后参数移到 props.children
    children: 'Hello World!',
  },
};
```

至此，我们总结下组件的最初渲染

开发者用 JSX 来写 React 应用，再通过 babel 将 JSX 转换为 React.createElement(type, props, children) 方法，createElement 会返回一个对象，这个对象被称为 **虚拟 DOM**，它描述的是真实 DOM

既然这个 JSX 表达的是一个真实 DOM 的 JS 表达，那如何将虚拟 DOM 映射到真实 DOM 上呢

这是就需要 render 方法

# ReactDOM.render

我们替换掉 ReactDOM.render，尝试粗暴地手写一下

```javascript

const element = <h1 title="hello">Hello World!</h1>;
const container = document.getElementById("root");
//- ReactDOM.render(element, container)

+const node = document.createElement(element.type)
+node["title"] = element.props.title

+const text = document.createTextNode("")
+text["nodeValue"] = element.props.children

+node.appendChild(text)
+container.appendChild(node)
```

对比元素对象，首先用 element.type 创建节点，再把非 children 属性（这里是 title）赋值给节点。然后创建 children 节点，由于 children 的内容是字符串，故创建 textNode 节点，并把字符串赋值给 nodeValue

再把 children 节点 text 插到元素节点的子节点上，最后把元素节点查到根节点即完成了这次 React 替换

我们可回答一开始留下的疑问，一个组件

- element 组件是什么
- element 输出什么
- ReactDOM.render 做了什么

## createElement

首先我们先实现 createElement 函数，把 JSX 转换为 JS。以下面的这个新的渲染为例，createElement 就是把 JSX 结构转成元素描述的对象

```jsx
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
// 等价转换 👇
const element = React.createElement(
  'div',
  { id: 'foo' },
  React.createElement('a', null, 'bar'),
  React.createElement('b'),
);

const container = document.getElementById('root');
ReactDOM.render(element, container);
```

### render

```javascript
/**
 * 将虚拟 DOM 添加至真实 DOM
 * @param {element} 虚拟 DOM
 * @param {container} 真实 DOM
 */
function render(element, container) {
  // 省略
  // 遍历所有子节点，并进行渲染
  element.props.children.forEach((child) => render(child, dom));
  // 省略
}
```

当我们调用 `ReactDOM.render(reactElement, domContainer)` 时，我们的意思是：将我的 reactElement 映射到 domContainer 的宿主树上吧

React 会查看 reactElement.type （在我们的例子中是 button）然后告诉 ReactDOM 渲染器创建对应的宿主实例并设置正确的属性

```javascript
// 在 ReactDOM 渲染器内部（简化版）
function createHostInstance(reactElement) {
  let domNode = document.createElement(reactElement.type);
  domNode.className = reactElement.props.className;
  return domNode;
}
```

在我们的例子中，React 会这样做：

```javascript
let domNode = document.createElement('button');
domNode.className = 'blue';

domContainer.appendChild(domNode);
```

如果 React 元素在 reactElement.props.children 中含有子元素，React 会在第一次渲染中递归地为他们创建宿主实例

## FiberReconciliation

如果我们用同一个 container 调用 ReactDOM.render() 两次会发生什么呢？

```jsx
ReactDOM.render(
  <button className="blue" />,
  document.getElementById('container'),
);

// ... 之后 ...

// 应该替换掉 button 宿主实例吗？
// 还是在已有的 button 上更新属性？
ReactDOM.render(
  <button className="red" />,
  document.getElementById('container'),
);
```

同样的，React 的工作是将 React 元素树映射到宿主树上去。确定该对宿主实例做什么来影响新的信息有时候叫做协调

有两种方式可以解决。简化版的 React 会丢弃已经存在的树然后从头开始创建它

```javascript
let domContainer = document.getElementById('container');
// 清除掉原来的树
domContainer.innerHTML = '';
// 创建新的宿主实例树
let domNode = document.createElement('button');
domNode.className = 'red';
domContainer.appendChild(domNode);
```

但是在 DOM 环境下，这样的做法效率低下而且会丢失像 focus、selection、scroll 等许多状态。相反，我们希望 React 这样做：

```javascript
let domNode = domContainer.firstChild;
// 更新已有的宿主实例
domNode.className = 'red';
```

...

如果相同的元素类型在同一个地方先后出现两次，React 会重用已有的宿主实例

https://overreacted.io/zh-hans/react-as-a-ui-runtime/

## Fiber 架构之 Scheduler（调度器）

老架构分两层

- Reconciler（协调器）
  - 负责找出变化的组件
  - reconcile（diff 算法）
- Renderer（渲染器）
  - 负责将变化的组件渲染到页面上

起因：在 React15 及以前，Reconciler 采用递归的方式创建虚拟 DOM，递归过程时不能中断的，如果组件树的曾经很深，递归会占用线程很多时间。造成卡顿，为了解决这个问题，React16 将递归的无法中断的更新重构为可中断更新。

它的问题在于当组件树过多时，页面会出现卡顿现象，如何解决，React 团队提出异步可中断更新的方案

即新的 Fiber 架构

他由三部分组成

- Scheduler（调度器）
  - 用于调度任务，分配优先级
- Reconciler（协调器）
  - 用于计算任务造成的副作用
- Renderer（渲染器）
  - 用于在宿主环境执行副作用

Scheduler 调度器的作用是允许中断渲染工作，如果有优先级更高的工作插入，则暂停中断浏览器渲染，待完成该工作后，恢复渲染器渲染

将渲染工作进行分解，分解成一个个小单元

使用 requestIdleCallback 能解决允许中断渲染工作的问题

> window.requestIdleCallback 将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主时间循环上执行后台和低优先级工作，而不会影响延迟关键时间，如动画和输入影响

React 目前已经[不用这个 API](https://github.com/facebook/react/issues/11171#issuecomment-417349573) 了，而是用 [调度器（Scheduler）](https://github.com/facebook/react/tree/main/packages/scheduler)这个包，自己实现调度算法。但他们核心思路是类似的，简化起见用 requestIdleCallback

```javascript
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // 回调函数入参 deadline 可以告诉我们在这个渲染周期还剩多少时间可用
    // 剩余时间小于1毫秒就退出回调，等待浏览器再次空闲
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);
```

## Fiber——静态数据结构+动态单元

Fiber 不仅做为架构，而且它还有其他两层含义，一是作为静态数据结构，另一是作为动态工作单位

我们为了让渲染工作可以分离成一个个小单元，

为了让渲染工作可以分离成一个个小单元，React 设计了 Fiber

每一个 element 都是一个 Fiber 结构，每一个 Fiber 都是一个渲染工作单元

所以 Fiber 即是一种数据结构，也是一个工作单元

为了方便描述描述树和任务单位，React 设计了一种数据结构"fiber"树。每个元素都是一个 fiber，每个 fiber 就是一个单元任务

例如我们渲染如下这样“一颗树”：

```jsx
React.render(
  <div>
    <h1>
      <p />
      <a />
    </h1>
    <h2 />
  </div>,
  container,
);
```

在 render 函数我们创建**根 fiber**，再把它设为 nextUnitOfWork，在 workLoop 函数把 nextUnitOfWork 给 performUnitOfWork 执行，主要包含以下三步：

1. 把元素添加到 DOM
2. 为元素的后代创建 fiber 节点
3. 选择下一个单元任务，并返回

这个思路用代码表达如下：

```javascript
// 之前 render 的逻辑挪到这个函数
function createDom(fiber) {
    const dom = fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type)

    const isProperty = key => key !== "children";
    Object.keys(fiber.props)
    	.filter(isProperty)
    	.forEach(name => {
        dom[name] = fiber.props[name]
    })
    return dom;
}

function render(element, container) {
    // 创建根 fiber，设为下一次的单元任务
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        }
    }
}

let nextUnitOfWork = null;
function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1
    }
    requestIdCallback(workLoop)
}
// 一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    // 子节点 DOM 插到父节点之后
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom)
    }

    // 每个子元素创建新的 fiber
    const elements = fiber.props.children;
    let index = 0;
    ley prevSibling = null;

    while (index < elements.length) {
        const element = elements[index];

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }

        if (index === 0) {
            fiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++;
    }
    // 返回下一个任务单元（fiber)
    // 有子节点直接返回
    if (fiber.child) {
        return fiber.child;
    }
    // 没有子节点则找兄弟节点，兄弟节点也没有找父节点的兄弟节点
    // 循环遍历直到找到为止
    let nextFiber = fiber;
    while(nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent
    }
}
```

React 可以看作是三部分的组合：

- scheduler，调度器，用于调度任务
- reconciler，协调器，用于计算任务造成的副作用
- renderer，渲染器，用于再宿主环境执行副作用

这三者都是独立的包，我们项目里引入的 ReactDOM 可以看作是一下三部分代码打包而成：

- scheduler 的主要逻辑
- reconciler 部分逻辑
- ReactDOM renderer 的主要逻辑

## 参考资料

- [Preact（React）核心原理详解](https://mp.weixin.qq.com/s?__biz=MzU0ODk0MDg4Nw==&mid=2247483951&idx=1&sn=b4fbae59bd89c442c7c8fdaa97d0eca7&chksm=fbb63f17ccc1b60187019619a7ae0c8eee9e9a6a0ac12d02bb5d882b97f0426eb2d5c1a288ae&mpshare=1&scene=1&srcid=1219E4YN8Tw4TU6zNCpHO6Qi&sharer_sharetime=1576748110521&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [从 0 实现一个 tiny react](https://github.com/ykforerlang/tinyreact)
- [手写系列-实现一个铂金段位的 React](https://mp.weixin.qq.com/s/C4pjEzYPZocRnJOaF1q0Jg)
- [React 技术揭秘](https://react.iamkasong.com/)
- [用 90 行 javascript 代码构建自己的 react](https://www.html.cn/web/javascript/19259.html)
- [simple-react](https://github.com/hujiulong/simple-react)
- [从零开始的 React 再造之旅](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490304&idx=1&sn=ff1210a10d747ee4a467572cb479003e&source=41#wechat_redirect)
- [从 0 实现 React 系列(一)：React 的架构设计](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247496377&idx=1&sn=0949ca28eee0fac69c8afcce76424cae&source=41#wechat_redirect)
- [React 源码解析](https://github.com/AttackXiaoJinJin/reactExplain)
- [从零开始的 React 再造之旅](https://segmentfault.com/a/1190000021689852)
- [build-your-own-react](https://pomb.us/build-your-own-react/)
- [自己造一个 ReactDOM](https://mp.weixin.qq.com/s/kmJWbNriGouztcGx4be8BQ)
- [React 性能优化 | 包括原理、技巧、Demo、工具使用](https://juejin.cn/post/6935584878071119885)
