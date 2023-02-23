# React 原理解析

知识点

​ 虚拟 dom

​ JSX

​ React 核心 api

​ ReactDOM

​ render()

​ 实现 React.createElement，ReactDom.render，Component

​ CreateElement

​ ReactDOM.render

生命周期怎么实现

setState 的过程

# JSX 和虚拟 DOM

问题：

**在定义 React 组件或者书写 React 相关代码，不管代码中有没有用到 React 这个对象，我们都必须将其 import 进来，这是为什么？**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('app'));
```

因为 React 将 App 解析成 vnode

ReactDOM 的作用就是将用 jsx 写成的对象映射到真实的 DOM 上，引入 React，自然能解析 `<App />` 语法

jsx 转换成 abstract dom tree 的时候，需要 `React.createElement`，引入 React，因为 babel 的缘故，自动转换为 抽象语法树对象

## 组件和声明周期

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

![image-20210419171455659](https://i.loli.net/2021/04/19/V9e5gtmZcUkojnS.png)

当对象的 type 属性是字符串时，表示为普通 html 标签，当 type 为函数时，它被当做构造函数，props 属性被传入这个构造函数，生成实例，再调用实例的 render 方法，render 方法返回的数据结构才用以渲染。

前言：

React 是什么？

React 是一个库，它主要做的事情，就是管理试图 UI，

写法：你可以按照 jsx 写法，也可以按照 React.createElement() 来写代码

第一章：JSX 与 transform-react-jsx

https://zh-hans.reactjs.org/

```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);
```

如果不加 JSX 的话，同样的意思

```jsx
class HelloMessage extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
}

ReactDOM.render(React.createElement(HelloMessage, { name: "Taylor" }), document.getElementById('hello-example'));
```

所以抽象语法树，会讲你写的代码转换成 （“div”, null, 'Hello', this.props.name），即 type，props，多个 children，当然你可以以其他形式来

我们知道 Babel 是将 ES6 语法转移成 ES5，那 Babel 是怎么转换的呢，就是运用了抽象语法树，具体可以看看这篇文章：抽象语法树

似乎我们只要引入`@babel/plugin-transform-react-jsx`，就能运行 React

那为什么是 （type），属性（props），多个子节点（children）

React

有兴趣可以看看它的[源码](https://github.com/babel/babel/blob/main/packages/babel-plugin-transform-react-jsx/src/create-plugin.js)

每个 JSX 元素只是调用 `React.createElement(component, props, ...children)` 的语法糖

所以我们如果要做 React.createElement，就按照这种形式来写，至于为什么是 type，props，...children。我想一个 jsx 只需要这三个属性就可以覆盖，标签名，标签中的属性，父标签下的子标签，一直递归下去，知道空

我们先来看一个例子：

```javascript
const test = (
	<div class="test">test, world</>
)
```

```javascript
function createElement(type, props, ...children) {
    console.log('type', type);
    console.log('props', props);
    console.log('children', children);
}
// 源码中，是会输出 $$typeof,key,ref,props,children,_owner,_self,_source 等等
```

```javascript
function createElement(type, props, ...children) {
    return {
        type,
        props,
        children,
    };
}
```

我们已经知道 React.createElement 相当于创建了一个对象（也就是虚拟 dom），如果我们要在页面上看到所写的代码，就需要把这个对象映射成 HTML，然后插入到 document（文档）中。

这里有两个步骤，

一是 vnode（即虚拟 dom，以下简写成 vnode）与真实 dom 的映射

二将真实 dom 插入到页面中

```jsx
function render(vnode, container) {
    // 第一步：创建真实dom vnode -> node
	const node = createNode(vnode)
    // 第二步：将 node 插入 container
    return container.appendChild(node)
}

function createNode(vnode) {
    ...
}
```

PS：ReactDOM.render(element, container[, callback])，是有 callback 参数，这里先不实现

关键一部是 createNode 函数，我们先来看看 vnode 的结构

div,

是`<div class="blue">hello,world</div>`

```javascript
function createNode(vnode) {
    const { type, props } = vnode;
    let node = null;
    if (typeof type === 'string') {
        node = document.createElement(type)
    }
    // 递归children

    // 在节点上赋上属性
    setAttribute(node)

    // 将 children 遍历，转成真实 dom 节点，再插入 node 中
    reconcileChildren(nodeChildren, node)

    return node;
}

function setAttribute()
```

疑惑：

react 到底是什么

为什么用 jsx 写 react，或者说写组件有哪些方法

简述下 React 的生命周期？每个生命周期都做了什么？

setState 是异步的，怎么实现

fiber 是什么，它解决了什么（为什么用 fiber 代替之前的框架），优势是什么

事件合成怎么做的，因为 react 中有几万行代码是针对事件的

hooks 是什么，解决了什么问题，写法，各种 hooks 的作用和用法

react 如何做优化

为什么说 immutable 是 React 的核心？（知乎问题）

为什么要 setState，而不是直接 this.state.xx == oo？

什么是虚拟 dom？

怎么做 diff？

react 到底是什么

​ UI 库..，facebook 出品，

​ 为什么会出来

​ 页面越来越重，频繁操作真实 dom 页面会变卡，变慢，而且页面不好组织。所以就有了一些框架，其中最好的是 react 和 vue，其目的是

为什么用 jsx 写 react，或者说写组件有哪些方法

​ 开创，写起来舒服

​ react.createElement

​ 类组件 `<Welcome>`

​ 函数组件` const jsx = <div></div>`

​ jsx 会转换为 react.createElement

react 的源头是 react.createElement，生产虚拟 dom

组件：

当我们自己的组件继承 Component 的时候，我们的组件会继承一些属性，这些属性简单的来说就是**自更新能力**

当我们调用 this.setState() 的时候，组件就会自动的重新渲染自己，然后通过新的虚拟节点去对比旧节点来进行变更

component.render()

得到 vnode

setState 为什么要做成异步的？原因是什么？

为了性能，不能每次 setState 的时候都触发更新，所以要异步

setState 是一个队列

利用事件队列，让 flush 在所有同步任务后执行

https://github.com/facebook/react/issues/11527

[RFClarification: why is `setState` asynchronous?](https://github.com/facebook/react/issues/11527#)

为什么要设计成异步的

批处理

为什么要 setState，而不是直接 this.state.xx == oo？

​ 因为 react 没有像 vue 那样对数据进行劫持，如果用 this.state.xx == oo，react 并不知道是数据改变了，所以必须使用 setState 来告诉 react 数据已经发生改变

React hooks 和 Class Component 的性能哪一个更好？

一样，都是走相同的 diff 算法

craeteElement 生成虚拟 dom？

JSX ——babel —— React.createElement('div', {}, ...children)——return——VDOM——ReactDOM.render——DOM

先生成虚拟 DOM,在把虚拟 DOM 映射到 DOM 上，也就是渲染

好文：Deep In React 之浅谈 React Fiber 架构(一)

https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484469&idx=1&sn=f68d044f1b0e4e2eb981e3878427b75b&scene=21#wechat_redirect

React 核心思想：

内存中维护一颗虚拟 DOM 树，数据变化时（setState），自动更新虚拟 DOM，得到一颗新树，然后 Diff 新老虚拟 DOM 树，找到有变化的部分（diff 算法），得到一个 Change（Patch），将这个 Patch 加入队列，最终批量更新这些 Patch 到 DOM 中

Fiber 时为了解决原先架构中的卡顿问题——任务一旦执行，就无法中断，js 线程一直占用主线程，导致卡顿

render 阶段可以理解为就是 Diff 的过程

React Fiber 首先时将虚拟 DOM 树转化为 Fiber tree，因此每个节点都有 child、subling、return 属性，遍历 Fiber tree 时采用的是后续遍历方法（深度优先）：

1. 从顶点开始遍历
2. 如果有大儿子，先遍历大儿子；如果没有大儿子，则标识遍历完成
3. 大儿子
    1. 如果有弟弟，则返回弟弟，跳到 2
    2. 如果没有弟弟，则返回父节点，并标志完成父节点遍历，跳回 2
    3. 如果没有父节点则标志遍历结束

![image-20210428100332140](https://i.loli.net/2021/04/28/1mv4WjqrDNKsXPC.png)

React 抽象来说，就是一个公式

UI=f(state)

我们把最终绘制出来的**\*UI\***当做一个函数**\*f\***运行的结果，**\*f\***就是 React 和我们基于 React 写得代码，而**\*f\***的输入参数就是**\*state\***。

https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzA5NzkwNDk3MQ==&action=getalbum&album_id=1355691950980317186&scene=173&from_msgid=2650591628&from_itemidx=1&count=3&nolastread=1#wechat_redirect
