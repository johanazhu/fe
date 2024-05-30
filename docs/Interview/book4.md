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

代码是同步的，但是 setState 做批处理，当非原生事件和 setTimeout 等事件下，它的表现为异步。

什么事件可以触发异步，什么会触发同步

React17 更新

React18 更新



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
