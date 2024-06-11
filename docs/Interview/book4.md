# 模拟题四



## 1. 左边宽度已知，右边自适应方案



## 2. 手写 Object.create

考察点：new 操作符

相关文章：[Object.create](../JavaScript/Object.create)



```javascript
function create(proto) {
    function F() {}
    F.prototype = proto
    return new F()
}
```



### 衍生问题

原型与原型链





## 3. 继承

考察点：继承
原型链继承、借用构造函数继承、组合继承、原型式继承（Object.create）、寄生式继承、寄生组合式继承



## 4. Class

Class 继承



## 5.setState 是同步的还是异步

考察点：批处理

类似问题：为什么有时 react 两次 setState，只执行了一次

React18之后都为异步

React18之前：

代码是同步的，执行是异步的。setState 做批处理，当多次连续调用 setState 时，React 会将这些更新合并（batch）为一次，从而只触发一次重新渲染，从而提高性能

像 setTimeout、promise 之类的原生方法和浏览器原生事件，setState 是同步，这是因为这些事件发生在 React 调度流程之外，不会触发批处理更新机制

可以通过 setState 接受一个函数作为参数，在函数内取到上一次的 state，来实现同步更新

虽然说 setState 在某些情况下是异步的，但实际上它并不是真正意义上的异步，而只是批量更新的一种优化手段



## 6.Redux 中间件机制

考察点：redux 核心逻辑

增强器
applyMiddleware 函数，装饰器模式



## 7.浏览器：如何定位内存泄露

https://febook.hzfe.org/awesome-interview/book3/browser-memory-leaks

### 内存泄露有哪些情况

> 最常见的情况就是异步任务的回调未清除或者定时器任务没有清楚，其他的还有DOM引用未清除等。

### 如何排查内存泄露

> 通过开发者工具中的`Performance`模块，可以对页面加载和执行流程进行录制，之后在录制快照里查看内存的使用情况。如果发现有内存异常，则可以进一步缩小排查范围，最终找到引发内存泄露的代码。



## 8.工程化：split code 代码分割的原理是什么





## 9.微前端有什么用

- 应用解耦和独立部署
- 技术栈灵活选择
- 按需加载
- 版本独立
- 团队自治



## 10. 算法题：二叉树的前序遍历 ⭐

二叉树的前序、中序、后序遍历
