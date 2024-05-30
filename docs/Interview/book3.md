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



## 6. 为什么有时 react 两次 setState，只执行了一次

考察点：批处理

在 React 中，setState 方法是异步的，这意味着多次连续调用 setState 时，React 会将这些更新合并（batch）为一次，从而只触发一次重新渲染，从而提高性能

像 setTimeout、promise 之类的原生方法和浏览器原生事件，setState 是同步，这是因为这些事件发生在 React 调度流程之外，不会触发批处理更新机制

可以通过 setState 接受一个函数作为参数，在函数内取到上一次的 state，来实现同步更新

虽然说 setState 在某些情况下是异步的，但实际上它并不是真正意义上的异步，而只是批量更新的一种优化手段



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
