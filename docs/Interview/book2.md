# 模拟题二



## 1. flex:1  表示什么

考察点： flex 布局

flex 为缩写，flex：1 表示 1 1 0

flex 默认是 0 1 auto

扩展时剩余部分等比，收缩时，剩余部分等比

1. flex-grow: 1：用来控制 flex 项目在主轴方向上的放大比例。当容器中有剩余空间时，该属性决定了该项目相对于其他 flex 项目是否方法以及放大比例是多少
2. flex-shrink: 1：用来控制 flex 项目在主轴方向上的缩小比例。当容器中空间不足时，该属性决定了该项目相当于其他 flex 项目是否缩小以及缩小比例是多少
3. flex-basis: 0：用来设置 flex 项目在主轴方向上的初始大小。如果 flex-basis 设置为0，则 flex 项目的大小完全由 flex-grow 和 flex-shrink 决定

flex: 1 表示剩余空间有余的时候等比扩展，剩余空间不足的时候等比收缩，所谓的剩余空间就是指父元素宽度减去所有子元素的宽度

第一个参数表示 flex-grow：扩展所侵蚀的空间是除去元素外剩余的空白间隙。默认值为 0，表示不占用剩余空间间隙扩展自己的宽度

第二个参数表示 flex-shrink：收缩的意思，当 flex 容器空间不足时，单个元素的收缩比例。默认为 1，默认所有的 flex 子项都会收缩

第三个参数表示 flex-basis，定义了分配剩余空间之前元素的大小。默认值为 auto，就是自动


衍生问题：flex:2 表示什么意思

### flex:2 表示什么意思

flex:2 实力等同于  flex: 2 1 0,

flex-grow:2 ,相对于其他 flex 项目，它的放大比例为2倍

flex-shrink:1，缩小比例为1



## 2. 手写源码：深拷贝

考察点：深拷贝的原理以及最新的解决方案

```javascript
function deepClone(source, storage = new WeakMap()) {
    if (typeof source !== 'object' || source === null) {
        return source
    }
    
    if (source.constructor === Date) {
        return new Date(source)
    }
    
    if (source.constructor === RegExp) {
        return new RegExp(source)
    }
    
    let target = source instanceof  Array ? [] : {}
    
    if (storage.has(source)) return storage.get(source)
    
    storage.set(source, target)
    
    let isSymbol = Object.getOwnPropertuSymbols(source)
    
    if (isSymbol.length) {
        isSymbol.forEach((item) => {
            if (typeof source[item] === 'object') {
                target[item] = deepClone(source[item], storage)
                return
            }
            target[item] = source[item]
        })
    }
    
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = typeof source[key] === 'object' ? deepClone(source[key], storage) : source[key] 
        }
    }
    return target;
}
```

或者用 `structuredClone()`

衍生问题：有哪些浅拷贝

### 浅拷贝

Object.assign、扩展运算符、slice（数组方法）、concat（数组方法）



## 3. 原型和原型链

考察点：原型和原型链

1. 原型（Prototype）
   - 每个 JavaScript 对象都有一个关联的原型对象
   - 原型对象也是一个普通的 JavaScript 对象，它也有自己的原型对象
   - 对象的属性和方法，首先在对象自身中查找，如果找不到就会沿着原型链向上查找
2. 原型链
   - 原型链是由一系列原型对象组成的链条
   - 当查找一个对象的属性或者方法时，会沿着原型链向上查找，直到找到目标或原型链末端（通常为 Object.prototype）
   - 原型链可以解释 JavaScript 的继承机制，对象可以访问原型链上所有对象的属性和方法





## 4.ES6特性：箭头函数和普通函数的区别

考察点：箭头函数

主要区别：

1. this 指向不同
   - 普通函数中的 this 指向调用它的对象
   - 箭头函数中的 this 指向定义时它所在的上下文
2. 构造函数不能使用箭头函数
   - 普通函数可以作为构造函数使用，创建对象实例
   - 箭头函数没有自己的 this 值，无法作为构造函数使用
3. 函数声明方式不同
   - 普通函数有 function 关键字声明
   - 箭头函数使用 “=>” 语法声明
4. 返回值的区别
   - 普通函数需要使用 return 关键字返回
   - 箭头函数如果函数体只有一行，可以省略 return 关键字
5. 参数个数的区别
   - 普通函数参数可以是 0 个到多个
   - 箭头函数参数可以是 0 个、1 个或多个

总的来说，箭头函数和普通函数在 this 指向、构造函数使用、函数声明、返回值以及参数个数等方面存在一些差异



## 5. Fiber 是什么，为什么需要 Fiber

考察点：Fiber 

### 什么是 React Fiber

- Fiber 是 React 内部的一种新的协调算法，用于对 React 组件树进行调度和渲染
- 它使用了一种基于 Fiber 的数据结构来表诉组件树，这个数据结构允许 React 执行更加颗粒的控制和分段计算

### 为什么需要 React Fiber

- 在 React 16 之前面临的主要性能问题是：当组件很庞大时，更新状态可能造成页面卡顿，根本原因在于更新流程是同步、不可中断的。React 16 重写了代码，提出 Fiber 架构，它是可异步中断的
- 传统的 React Reconciler 算法存在一些问题，例如无法暂停、恢复或者放弃正在执行的工作，这会导致高优先级的任务被阻塞
- React Fiber 通过将组件树的递归更新拆分为多个子任务，使 React 可以对任务进行暂停、恢复和放弃等操作，从而提高用户交互的响应性
- Fiber 还支持增量渲染，可以将渲染工作分批完成，而不是一次性完成，从而使得 React 应用在执行大量计算时也能保持流畅的用户体验

### Fiber 的工作原理

- Fiber 中使用了一种基于链表的数据结构来表示组件树，称为 Fiber 树
- Fiber 树中的每个节点就是一个 Fiber 对象，包含了组件的状态信息和更新操作
- React 在更新组件时，会根据新旧 Fiber 树之间的差异计算出需要更新的部分，并将更新任务拆分称多个子任务





## 6.函数式组件与类组件的区别

考察点：函数式组件与类组件的区别

1. 定义方式不同
2. 状态管理不同
3. 生命周期不同
4. this 指向不同
5. 代码复用不同

Capture Value 不是它的区别，它是 React Hooks 的一个特征

衍生：Capture Value

Capture Value 是指 React Hooks 在使用必报时会自动捕获当前组件渲染时的值，而不是 Hooks 调用时捕获的值。这也可以确保 Hooks 内部使用的值总是最新的

具体来说：

- 在类组件中，由于 this 的特殊性，开发者需要手动绑定方法，并需要小心处理 this 的指向问题
- 而在函数式组件中，由于没有 this，开发者可以直接使用闭包来捕获外部变量。但如果不小心,可能会产生一些"陈旧"的值被捕获的问题。
- Capture Value 机制就是为了解决这个问题，确保 Hook 内部使用的值总是最新的，不会因为闭包的特性而产生 bug。



参考问题：[How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)

## 7.浏览器：什么是同源策略以及跨源资源共享（CORS）？

1. 同源策略
   - 浏览器的安全机制，它限制了来自不同源的脚本对当前文档的访问权限
   - 所谓同源，指的是协议、域名和端口号完全相同
   - 同源策略可以繁殖跨站脚本（XSS）攻击等安全问题
2. 跨源资源共享（CORS）
   - CORS是一种跨源资源共享机制,它允许Web应用程序访问不同源上的资源。
   - CORS机制在客户端(如浏览器)和服务端都需要进行相应的设置。
   - 服务端需要在响应头中设置相应的CORS策略,客户端需要遵循CORS协议进行跨源请求。
   - CORS有"简单请求"和"预检请求"两种模式,用于处理不同类型的跨源请求。



## 8.Webpack构建的原理 

资源分析

依赖图构建

资源打包

输出构建





## 9.OSI七层模型 



## 10. 算法题：三数之和
