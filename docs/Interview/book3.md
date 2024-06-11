# 模拟题三



## 1. CSS：如何实现垂直居中？

考察点：div 居中

分三种情况，水平居中，垂直居中，水平垂直居中

单水平居中而言，居中元素不定宽高
absolute+transform
flex 属性居中
flex + 子项 margin auto
grid 属性居中
grid 子项 margin auto
grid 子项属性居中
-webkit-box 属性居中
table-cell + text-align
line-height + text-align
writeing-mode
table
居中元素需定宽高
须知宽高+absolute+负 margin
须知宽高+absolute+calc
须知宽高+absolute+margin auto
局限性较大的全局居中
须知宽高+fixed+transform
须知宽高+fixed+负 margin
须知宽高+fixed+calc
须知宽高+fixed+margin auto





## 2. 手写 New 操作符

考察点：new 操作符

相关文章：[new 做了什么](../JavaScript/new 做了什么)

new 操作符具体做了什么

> 1.在内存中创建一个新对象
>
> 2.这个新对象的[[prototype]] 指向被赋值为构造函数的 prototype 属性
>
> 3.构造函数内部的 this 被赋值为这个新对象
>
> 4.执行构造函数内部的代码
>
> 5.如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

手写代码

```javascript
function new2(Constructor, ...args) {
    let obj = Object.create(null);
    obj.__proto__ = Constructor.prototype;
   	const result = Constructor.apply(obj, args)
    return typeof result === 'object' ? result : obj
}
```



### 衍生问题

Object.create、apply



#### Object.create

```javascript
function create(proto){
    function F() {}
    F.prototype = proto
    return new F()
}
```



#### apply

```javascript
function myApply(context === window, args) {
    if (this === Fcuntion.prototype) {
        return undefined
    }
    let fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
        result = context[fn](...args)
    } else {
        result = context[fn]()
    }
    delete context[fn];
    return result
}
```



## 3. 事件循环

考察点：事件循环机制

正常执行代码，遇到宏任务塞入宏任务队列， 遇到微任务，塞入微任务队列。正常代码执行完毕，先执行全部的微任务，再从宏任务队列中拿出一个执行它，如遇到微任务再塞入微任务队列，遇到宏任务再塞入宏任务队列，执行完毕再从宏任务队列中获取，以此往复

整个 Event Loop 的执行顺序如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程接续接管，开始下一个宏任务（从事件队列中获取，也就是callback queue）





## 4.迭代器和生成器

考察点： generator 原理

迭代器是 iterator
生成器是 generator

生成器
yield 生成一个断点
next 继续执行

## 5. React：虚拟 DOM 与 Diff 算法

考察点： Virtual DOM 、Diff

### 什么是 Virtual DOM

React 使用 JavaScript 对象来模拟 DOM 树，这种模拟结构被称为虚拟 DOM。通过使用虚拟 DOM，React 可以高效地比较组件状态的变化，并只更新需要修改的DOM 节点，而不需要重新渲染整个页面

### 为什么需要 Virtual DOM

1. 提高渲染效率，直接操作DOM是非常矮柜的，会导致页面的重绘和回流，降低性能。虚拟DOM可以批量比较和更新 DOM，最大限度地减少 DOM 操作，提高渲染效率
2. 跨平台兼容，虚拟 DOM 是一个平台无关的数据结构，可以跨浏览器、移动端等多个平台使用，这为 React 的跨平台能力奠定了基础
3. 简化开发，虚拟 DOM 屏蔽了底层 DOM 操作的复杂性，使开发者可以更专注于应用逻辑的开发，提高开发效率
4. 更友好的调试体验，虚拟DOM是 JavaScript 对象，可以更容易地进行调试和测试，提高开发体验

### Diff 算法

React 通过比较新旧两颗虚拟 DOM 树的差异，计算出需要最小化 DOM 操作的更新路径。传统的 Diff 算法复杂度高度  O(n^3)，而 React 将其优化到 O(n)，大幅提高了更新效率

React 在以下两个假设的基础上提出了一套 O(n) 的**启发式算法**

1. 两个不同类型的元素会产生不同的树
2. 对于同一层级的子节点，可以通过 key 属性进行唯一标识。通过给子节点添加唯一 key 值，React 可以快速定位到发生变化的节点，而不需要对整个子树进行 diff

### 衍生问题

重绘和回流



#### 重绘和回流

重绘是元素的样式发生改变，不影响它所在的文档流的位置

回流是元素的尺寸、结构或者某些属性发生改变，浏览器需要重新计算它所在的位置，然后重新渲染页面的过程

回流必定会触发重绘，但重绘不一定会引起回流



## 6. 说说 React 的渲染过程

考察点：React 渲染的理解

整体流程：

![React 渲染流程图](https://s2.loli.net/2024/06/10/H9gneBd4GrSA1mk.jpg)

 React的核心可以用`ui=fn(state)`来表示，更详细可以用

```jsx
// 模拟代码
const state = reconcile(update);
const UI = commit(state);
```

上面的fn可以分为如下一个部分：

- Scheduler（调度器）： 排序优先级，让优先级高的任务先进行reconcile
- Reconciler（协调器）： 找出哪些节点发生了改变，并打上不同的Flags（旧版本react叫Tag）
- Renderer（渲染器）： 将Reconciler中打好标签的节点渲染到视图上

这些模块是怎么配合工作的：

1. 首先 React 组件（jsx）会被 babel 转换为 React.createElement，React.createElement 函数最后会调用 ReactElement 方法返回一个包含组件数据的对象，这也被称为虚拟 dom
2. 不过在首次渲染，还是更新状态时，这些渲染的任务都会先经过 Scheduler 的调度，Scheduler 会根据任务的优先级来决定哪些任务先进入 render 阶段，比如用户触发的更新优先级非常高，如果当前正在进行一个比较耗时的任务，则这个任务就会被用户触发的更新打算，在 Scheduler 中初始化任务的时候会计算一个过期事件，不同类型的任务过期时间不同，优先级越高的任务，过期时间越短，优先级越低的任务，过期时间越长。Scheduler会分配一个时间片给需要渲染的任务，如果是一个非常耗时的任务，如果在一个时间片之内没有执行完成，则会从当前渲染到的Fiber节点暂停计算，让出执行权给浏览器，在之后浏览器空闲的时候从之前暂停的那个Fiber节点继续后面的计算，这个计算的过程就是计算Fiber的差异，并标记副作用。
3. 在 render 阶段，render阶段的主角是Reconciler，在mount阶段和update阶段，它会比较jsx和当前Fiber节点的差异（diff算法指的就是这个比较的过程），将带有副作用的Fiber节点标记出来，这些副作用有Placement（插入）、Update（更新）、Deletetion（删除）等，而这些带有副作用Fiber节点会加入一条EffectList中，在commit阶段就会遍历这条EffectList，处理相应的副作用，并且应用到真实节点上。而Scheduler和Reconciler都是在内存中工作的，所以他们不影响最后的呈现。
4. 在commit阶段：会遍历EffectList，处理相应的生命周期，将这些副作用应用到真实节点，这个过程会对应不同的渲染器，在浏览器的环境中就是react-dom，在canvas或者svg中就是reac-art等。 



## 7. 浏览器：浏览器渲染原理

浏览器渲染三个步骤，解析、渲染、绘制

解析：HTML、CSS、JavaScript 被解析，HTML 被解析为 DOM 树，CSS 被解析成 CSS 规则数，JavaScript 通过 DOM API 和 CSSOM API 来操作  DOM Tree 和 CSS Rule Tree

渲染：浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree（渲染树），这其中进行大量的 Reflow 和 Repaint

绘制：最后调用操作系统的 Native GUI 的 API 绘制画面



衍生问题：Reflow 和 Repaint 是什么



### Reflow 和 Repaint 是什么

Reflow 回流：元素的尺寸、结构或者某些属性发生改变，浏览器需要重新计算它所在的位置，然后重新绘制页面的过程

Repaint 重绘：元素的样式发生改编，不影响它所在的文档流的位置

回流必定会触发重绘，但重绘不一定会引起回流





## 7.微前端的沙箱机制是怎么实现的？ 

1. window 对象隔离
   - 微前端通过创建一个独立的 window 对象作为沙箱，将应用的代码运行在这个隔离的 window 环境中
   - 这样可以防止应用之间的全局变量冲突和资源相互影响
2. DOM 隔离
   - 微前端将每个应用的 DOM 元素都挂载到一个独立的容器中，防止 DOM 元素之间的相互影响
3. 样式隔离
4. 生命周期隔离





## 9.十万条数据如何优化

虚拟列表，10000 条数据 插入不卡的那种

- 虚拟滚动
  - 只渲染可视区域内的数据,其他数据按需加载
- 延迟渲染（懒加载）
- 时间分片
- 分页加载
- 服务端渲染
- 增强渲染
- 骨架屏
- 代码分割





## 10. 算法题：反转链表 

考察点：
