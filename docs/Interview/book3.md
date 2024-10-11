# 模拟题三



## 1. CSS：如何实现水平垂直居中？

两种情况考虑

居中元素不定宽高

- absolute + transform
- flex 属性居中
- flex + 子项 `margin:auto`
- grid 属性居中
- grid + 子项 `margin:auto`
- grid + 子项属性居中
- -webkit-box 属性居中
- table-cell + vertical-align
- line-height + text-align
- writing-mode
- table

居中元素需定宽高

- 须知宽高+absolute+负 margin


- 须知宽高+absolute+calc


- 须知宽高+absolute+margin auto


局限性较大的全局居中

- 须知宽高+fixed+transform


- 须知宽高+fixed+负 margin


- 须知宽高+fixed+calc


- 须知宽高+fixed+margin auto

相关文章：[水平垂直居中](../Basic/CSS/水平垂直居中)

## 2.手写源码：数组去重

给定一个数组 ` [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]`， 去除重复项

> PS：面试的时候一般不会允许你使用 ES6语法和 JS API 或者即使允许你也会让你写出多个方法越多越好，这里我们都写

```javascript
const arr =  [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4]

// Array.from + new Set 
const unique = function (arr) {
    // new Set 返回的是集合
    return Array.from(new Set(arr)) 
}

// 展开运算符 + new Set
const unique = function (arr) {
    // new Set 返回的是集合
    return [...new Set(arr)]
}

// Map 
const unique = function (arr) { 
	let map = new Map()
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (map.has(item)) {
            continue;
        }
        map.set(item, true)
        result.push(item)
    }
	return result
}
// PS：map 和 对象的区别在于 map 的 key 可以是任何值

// 双 for 循环
const unique = function (arr) {
     for (let i = 0; i < arr.length; i++) {
        for (let j=i+1; j <arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1)
                j--;
            }
        }
    }
    return arr
}

// indexOf
const unique = function (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        if (result.indexOf(item) < 0) {
            result.push(item)
        }
    }
    return result
}

// filter 
const unique = function (arr) {
    let res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    return res;
}

// includes
const unique = function (arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (!result.includes(item)) {
            result.push(item)
        }
    }
    return result
}

// reduce + includes
const unique = function (arr) {
    const res = arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
    return res;
}
// PS: reduce callback 中的 prev 为上一次调用callback 的结果，cur 为当前值
```

> map 和 对象的区别在于 map 的key可以是任何值

衍生问题：对象中的去重、数组中包含多层嵌套对象去重

### 数组对象去重

```javascript
const arr = [
    { id: 1, name: 'John' },
    { id: 1, name: 'elaine' },
    { id: 2, name: 'johnny' },
    { id: 3, name: 'react' },
    { id: 3, name: 'vue' },
    { id: 4, name: 'javascript' },
    { id: 5, name: 'css' },
];
      
// 双循环
const unique = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if (arr[i].id === arr[j].id) {
                arr.splice(j, 1);
                j--
            }
        }
    }
 	return arr
}


// new Set + JSON.stringyify
const unique = function (arr) {
    // 先把每一项转成字符串，再在数组中通过 Set 去重
    const set = new Set(arr.map(JSON.stringify))
    // Array.from 将 Set 后的对象转换成 Array
    const _arr = Array.from(set).map(JSON.parse)
    return _arr
}


// reduce
const unique = function (arr) {
    const result = arr.reduce((prev, cur) => {
        prev[cur.id] = cur
        return prev
    }, {})
    console.log(result)
    return Object.values(result)
}
// PS: Object.values() 对象转数组

// filter
const unique = function (arr) {
    return arr.filter((item, index, arr) => {
        return arr.findIndex(t => t.id === item.id) === index
    })
}

// Map + for 
const unique = function (arr) {
    let map = new Map();
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (map.has(item.id)) {
            continue;
        }
        map.set(item.id, true)
        result.push(item)
    }
    return result
}
```



## 3. 事件循环

整个事件循环（Event Loop）的执行顺序如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 遇到宏任务，就将它添加到宏任务的任务队列中
- 当前宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS引擎线程接续接管，开始下一个宏任务（从事件队列中获取，也就是callback queue）

衍生问题：进程和线程的关系、浏览器架构、渲染进程中的线程、宏任务和微任务

### 进程和线程的关系

进程就是应用程序创建的实例，而线程依托于进程，它是计算机最小的调度和运行单位

Chrome 浏览器是一个应用程序，它有一个主进程、多个渲染进程（一个Tab就是一个渲染进程）、如果有 chrome 插件的话，一个插件就是一个插件进程

### 浏览器架构

浏览器是多进程，包括主进程、GPU进程、多个渲染进程、多个插件进程、网络进程等等

采用多进程的好处是，当其中一个 Tab 或者某个插件崩溃时，不会影响其他页面

### 渲染进程中的线程

一个单独页面就有一个单独的渲染进程，一个渲染进程中包含了 JS 引擎线程、GUI 渲染线程、事件触发线程、定时触发线程、异步 HTTP 请求线程等等

执行过程是，JS 是单线程，只有一个调用栈（Call Stack），浏览器的渲染进程中有 DOM 事件（事件触发线程）、setTimeout （定时触发线程）、AJAX（异步 HTTP 请求线程）等，它们是有单独的线程处理。在这些异步事件结束后，JS 引擎会把他们的回调函数（callback）按顺序放到事件队列（Callback Queue）中，并依次放入调用栈（Call Stack）里执行，直到事件队列为空

### 宏任务和微任务

宏任务比如：`setInterval` 、`setTimeout` `script` `、setImmediate`、 `I/O` 、`UI rendering`

微任务比如：`promise`、`process.nextTick`、 `Object.observe` 、`MutationObserver`

MutationObserver是什么

是什么： [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 监听 document 对象的节点变化

有什么用：计算首屏时间



## 4. 迭代器和生成器是什么

### 迭代器（Iterator）

迭代器是一个对象，它定义了一个序列，并通过特定的方式返回集合中的下一个元素。迭代器遵循“迭代器协议”，这个协议要求迭代器对象必须包含一个 next() 方法，该方法返回一个对象，该对象包含两个属性：

- value：表示当前迭代的值
- done：一个布尔值，指示迭代是否完成。若已完成，done 为 true，否则为 false

在 JavaScript 中，内置的集合类型（如数组、映射和集合）都实现了自己的迭代器。通过使用 for...of 循环，可以方便地使用迭代器来遍历集合的元素

### 生成器（Generator）

生成器是一个特殊的函数，用于创建迭代器。生成器函数的定义使用 function* 语法，而在函数体内使用 yield 语句来暂停执行并返回一个值。每次调用生成器的 next() 方法时，它会恢复执行生成器函数，直到遇到下一个 yield 或函数结束

生成器可以在调用过程中“暂停”，这使得生成器能够在每一步之间保持转台

衍生问题： async/await 的原理

### async/await 的原理

async/await 是 JavaScript 中处理异步操作的语法糖，极大简化了基于 Promise 的代码结构

async函数：会返回一个 Promise 对象。如果函数内部有返回值，那么这个值会被包装成一个 resolved 的 Promise。如果抛出异常，则返回一个 rejected 的 Promise

await 表达式：必须在 async 函数内部使用，作用是等待一个 Promise 对象的完成，获取其 resolved 的结果。若 Promise 被 rejected，则会抛出异常，可以通过 try/catch 语句来捕获

在底层，async/await 是基于生成器函数（Generator Function） 和 Promise 实现的。async 函数本质上是一个 Generator 函数的语法糖，它自动处理了 Generator 函数的迭代器控制和 Promise 的状态管理，使得异步代码的编码更加直观和简洁



## 5. React：虚拟DOM 与 Diff算法

### 什么是 Virtual DOM

虚拟 DOM 就是虚拟节点。React 用 JS 对象来模拟 DOM 节点，然后将其渲染成真实 DOM 节点

### 解决了什么问题

- DOM 操作性能问题。通过虚拟 DOM 和 diff 算法减少不必要的 DOM 操作，保证性能不太差
- DOM 操作不方便问题。以前各种 DOM API 要记，现在只有 setState

### 优势（为什么需要虚拟 DOM）

1. 让 DOM 操作的整体新能更好，能（通过 diff）减少不必要的 DOM 操作
2. 为 React 带来跨平台能力，因为虚拟节点除了渲染为 DOM 节点外，还可以在其他平台上渲染
3. 简化开发，使用 setState 来操作 DOM 变化，不用记底层 DOM API

### 缺点

1. 性能要求极高的地方，还需要得用到 DOM 操作（目前还没遇到这种需求）
2. React 为虚拟 DOM 创造了合成事件，跟原生 DOM 事件不一致，需要额外操作
   - 将 React 事件都绑定到根容器（V17升级），自动实现事件委托
   - 如果混用合成事件和原生 DOM 事件，可能出现 bug

### 虚拟 DOM 的原理

JSX(TSX) 写组件 -> React.element ->  React.Fiber -> 渲染成真实节点

> JSX(TSX) 写组件 通过 jsx-runtime 转换为 React.element

```javascript
function render(vdom) {
  // 如果是字符串或者数字，创建一个文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  const { tag, props, children } = vdom
  // 创建真实DOM
  const element = document.createElement(tag)
  // 设置属性
  setProps(element, props)
  // 遍历子节点，并获取创建真实DOM，插入到当前节点
  children
    .map(render)
    .forEach(element.appendChild.bind(element))

  // 虚拟 DOM 中缓存真实 DOM 节点
  vdom.dom = element
  
  // 返回 DOM 节点
  return element
}
```

> PS：以上案例是简化了 虚拟 DOM 转换的过程，在 React16之前类似逻辑，将虚拟DOM 遍历替换，但换成 Fiber 后，就分为两个阶段，render 阶段是在虚拟 DOM 上打标记（会被打断），等 commit 阶段再一次性更新DOM

衍生问题：DOM diff 算法是怎么样的

### Diff 算法

#### 是什么

简单俩说就是对比新旧两颗虚拟 DOM 树的差异的算法。当组件变化时，会 render 出一个新的虚拟 DOM，diff 算法对比新旧虚拟 DOM 之后，得到了一个 patch，然后 React 用 patch 来更新真实 DOM

#### 怎么做

- 首先对比两棵树的根节点

  - 类型变化，那么会直接认为整个树都变了，不再对比子节点。直接标记删除对应真实 DOM 树，创建新的真实 DOM 树

  - 类型没变，看属性是否变化

    - 如果没变，就保留对应的真实节点

    - 如果变化，就只更新该节点的属性，不重新创建节点

      

React 在以下两个假设的基础上提出了一套 O(n) 的**启发式算法**

1. 两个不同类型的元素会产生不同的树
2. 对于同一层级的子节点，可以通过 key 属性进行唯一标识。通过给子节点添加唯一 key 值，React 可以快速定位到发生变化的节点，而不需要对整个子树进行 diff

### 衍生问题

重绘和回流



### 重绘和回流

重绘是元素的样式发生改变，不影响它所在的文档流的位置

回流是元素的尺寸、结构或者某些属性发生改变，浏览器需要重新计算它所在的位置，然后重新渲染页面的过程

回流必定会触发重绘，但重绘不一定会引起回流

相关文章：[Virtual DOM](../React/VirtualDOM)、[Diff 算法](../React/Diff)



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
3. 在 render 阶段，render阶段的主角是Reconciler，在mount阶段和update阶段，它会比较jsx和当前Fiber节点的差异（diff算法指的就是这个比较的过程），将带有副作用的Fiber节点标记出来，这些副作用有Placement（插入）、Update（更新）、Deletetion（删除）等，而这些带有副作用Fiber节点会加入一条EffectList中，在commit阶段就会遍历这条EffectList，处理相应的副作用，并且应用到真实节点上。而Scheduler和Reconciler都是在内存中工作的，所以他们不影响最后的呈现
4. 在commit阶段：会遍历EffectList，处理相应的生命周期，将这些副作用应用到真实节点，这个过程会对应不同的渲染器，在浏览器的环境中就是react-dom，在canvas或者svg中就是reac-art等。





首先，React 现在都用 React Fiber 架构。他实现了 React 组件的异步可中断效果

基于这个架构，我们可以把 React 渲染分为两个阶段，即 render 阶段和 commit 阶段

render 阶段就是找虚拟 DOM 中变化的部分，创建 DOM，打上增删改的标记，并把这些标记记录到 effectList 队列中

这个阶段可以被打断，由 schedule 调度，它会根据你的优先级权重值决定先执行还是后执行

等全部计算完后，就一次性更新到 DOM

渲染到 DOM 的阶段称为 commit 阶段，这个阶段即把之前记录的更新点更新到 DOM 上

它也有三个小阶段，即 before mutation、mutation 和 layout

before mutation 会异步调用 useEffect 的回调函数

mutation 阶段会遍历 effectList 更新 DOM

layout 阶段会同步调用 useLayoutEffect 的回调函数，还能拿到最新的 dom 



## 7. 浏览器：浏览器渲染原理

浏览器渲染三个步骤，解析、渲染、绘制

解析：HTML、CSS、JavaScript 被解析，HTML 被解析为 DOM 树，CSS 被解析成 CSS 规则树，JavaScript 通过 DOM API 和 CSSOM API 来操作  DOM Tree 和 CSS Rule Tree

渲染：浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree（渲染树），这其中进行大量的 Reflow 和 Repaint

绘制：最后调用操作系统的 Native GUI 的 API 绘制画面



衍生问题：Reflow 和 Repaint 是什么

### Reflow 和 Repaint 是什么

Reflow 回流：元素的尺寸、结构或者某些属性发生改变，浏览器需要重新计算它所在的位置，然后重新绘制页面的过程

Repaint 重绘：元素的样式发生改变，不影响它所在的文档流的位置

回流必定会触发重绘，但重绘不一定会引起回流



## 8.如何提高 webpack 构建速度

1.使用 DllPlugin 将不常变化的代码提前打包，并服用

2.使用 thread-loader 或者 happypack（过时）进行多线程打包

3.处于开发环境时，在 webpack config 中将 cache 设为 true，也可用 cache-loader（过时）

4.处于生产环境时，关闭不必要的环节，比如可以关闭 source map



rollup：任务型打包工具，很多三方库都是用这个进行打包，比如react。

parcel:零配置开箱即用。

vite:基于esm的新一代构建工具

其它还有esbuilder等等



衍生题：Webpack构建的原理 



## 9.十万条数据如何优化

虚拟列表，10000 条数据 插入不卡的那种

- 虚拟列表
  - 只渲染可视区域内的数据，其他数据按需加载
- 延迟渲染（懒加载）
- 时间分片
- 分页加载
- 服务端渲染
- 增强渲染
- 骨架屏
- 代码分割

### 虚拟列表的原理

计算出列表总高度，并当滚动时，根据 scrollTop 值不断更新 startIndex 以及 endIndex，以此从列表数据 listData 中截取对应元素

```javascript
const scrollTop = virtualRef.current.scrollTop;
const fixedScrollTop = scrollTop - (scrollTop % 30);
virtualContentRef.current.style.webkitTransform = `translate3d(0, ${fixedScrollTop}px, 0)`;
setStart(Math.floor(scrollTop / 30));
setVisibleData(data.slice(start, start + visibleCount));
```



### 虚拟列表的缺点

频繁的计算导致会有短暂的白屏现象，可以通过节流来限制触发频率

加上为列表管理加一些“上、下缓冲区”，即在可视区域之外预渲染一些元素





## 10. 算法题：反转链表 

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null, curr = head;
    while(curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev
};
```

