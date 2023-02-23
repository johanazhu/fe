# Preact 核心原理详解笔记

一：Preact 是什么

二：Preact 和 React 的区别有哪些？

三：Preact 是怎么工作的

四：结合实际组件了解整体渲染流程

五：Preact Hooks

Preact 是什么？

Preact 和 React 的区别

Preact 是怎么工作的

-   JSX
-   Virtual Dom
-   Preact 的 Virtual DOM Diff 算法

Preact Hooks 的实现

一个组件的生命周期

# Preact 是什么？

简单而言，Preact 是 React 的 3KB 轻量级替代方案，它拥有着和 React 一样的 API。有同学或许会问，Preact 中的 P 的含义是什么，根据 Preact 的作者表述的是 performance 的含义，这也是 Preact 框架的目标之一。

## Preact 和 React 的区别有哪些？

区别在于

-   事件系统
-   更符合 DOM 规范的描述

### 事件系统

一个例子

```jsx
// React
<input onChange={e => console.log(e.target.value)} />

// Preact
<input onInput={e => console.log(e.target.value)} />
```

在 React 内部，其自身实现了一套事件合成系统，所以我们一般在 React 的表单组件中使用的都是 onChange 方法来进行组件的更新，而在 Preact 内部，没有事件合成系统，它直接使用的是由浏览器原生提供的事件系统，这就是它提交更小的直接原因之一

### 更符合 DOM 规范的描述

在 React 中我们想描述一个 DOM 的类名，必须要使用 className, 而在 Preact 中，不仅可以使用 className 来描述，也可以直接使用 class 来描述 DOM 的类名，这也使得 Preact 更接近原生 DOM 规范的描述

## Preact 是怎么工作的

主要由三部分组成 JSX、Virtual DOM、Diff 算法

### JSX

如何在 JS 中描述 DOM 结构，通过浏览器的操作 DOM API 、封装成一个工厂函数来进行接受一定的输入，输出就是相对的 DOM

用结构式的写法写法不变，

演变后用 JSX 语法，经过 babel 或者其他的插件转换为上诉的函数式描述，然后在经过一系列处理，变成我们所熟悉的原生 DOM 结构，这就是 JSX 产生的本质原因

综合来看，其实 JSX 的本质就是 JS 的扩展，它允许你用类似 HTML/XML 的结构，进而编译成类似如下的一个函数调用

```javascript
h(nodeName, attributes, ...children);
```

JSX 转换到函数调用这个阶段是由 React 团队提供，后面因为 babel 做的更好，更强大，就逐渐演变成了 @babel/plugin-transform-react-JSX 这个核心插件，所以上文所提及的 h 函数，正式因为在 Preact 中， JSX 的预发会通过 babel 这个插件转换成一个名称为 h 的工厂函数，类似于在 React 中的 React.createElement 的作用，所以我们才需要去声明 h 函数，虽然我们在实际开发环境上用不到，但是它的作用就体现在 babel 转换后的代码中

### Virtual DOM

我们写 JSX，通过 babel 的@babel/plugin-transform-react-JSX 转换为 h 函数，即

```jsx
<div id="foo">
    Hello!
    <br />
</div>
```

babel 转换

```javascript
h('div', { id: 'foo' }, 'Hello!', h('br'));
```

而 h 是个函数，输入就有输出，输出的即使一个特殊类型的数据结构，它就是 Virtual DOM

```json
{
    "nodeName": "div",
    "attritubes": { "id": "foo" },
    "children": ["Hello!", { "nodeName": "br" }]
}
```

Virtual DOM 本质上就是一种用来描述 DOM 结构的数据结构，所以 h 函数的输出其实就是我们常说的 Virtual DOM

不管在 React 中还是在 Preact 中，最核心的都是 Virtual DOM 的 Diff 算法，怎么把最新的数据所驱动的 DOM 结构表现在页面当中，就需要 Diff 算法

### Diff 算法

在 Preact 中，Virtual DOM 的 Diff 算法可以拆解成三块

-   Diff children
-   Diff 这里的 type 指的是组件的类型，主要分为 component、Fragment 和 DOM node 三种
-   Diff props

## 参考资料

-   [Preact（React）核心原理详解](https://mp.weixin.qq.com/s?__biz=MzU0ODk0MDg4Nw==&mid=2247483951&idx=1&sn=b4fbae59bd89c442c7c8fdaa97d0eca7&chksm=fbb63f17ccc1b60187019619a7ae0c8eee9e9a6a0ac12d02bb5d882b97f0426eb2d5c1a288ae&mpshare=1&scene=1&srcid=1219E4YN8Tw4TU6zNCpHO6Qi&sharer_sharetime=1576748110521&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
