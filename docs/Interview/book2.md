# 模拟题二



## 1. flex:1  表示什么

考察点： flex 布局

flex 为缩写，flex：1 表示 1 1 0

flex 默认是 0 1 auto

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

flex-grow:2 ，相对于其他 flex 项目，它的放大比例为2倍

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

衍生问题：什么是深拷贝、什么是浅拷贝、两者有什么区别、json.stringify 的缺点，怎么解决

### 什么是深拷贝

**深拷贝**是对一个对象的拷贝，其属性不与原始对象共享相同的引用，修改原始对象或修改拷贝对象互不影响

深拷贝原生方法有：`JSON.stringify()` + `JSON.parse()`、`structuredClone()`

### 什么是浅拷贝

浅拷贝是指拷贝的对象属性与原始对象共享相同的引用，因此更改嵌套属性可能会导致另一个对象发生变化

扩展运算符、`Object.assign()`、`Array.prototype.slice()`、`Array.from()`、`Array.prototype.concat()`

### 两者有什么区别

深拷贝：拷贝对象与原始对象不是同一个对象，新旧对象不共享内存。深拷贝可以确保修改新对象不会影响到原对象

浅拷贝：拷贝对象与原始对象不是同一个对象，只拷贝顶层属性，而不是嵌套对象的值。修改新对象中嵌套对象的值会影响原对象

### json.stringify 的缺点

缺点：

- 无法拷贝函数、正则
- 会抛出对象的 constructor，所有的构造函数会指向 Object
- 对象有循环引用，会报错

如何解决循环引用问题？

使用 WeakMap 来解决循环引用，为什么它能解决

要想解决循环引用，可以额外开辟一块存储空间，来存储当前对象和拷贝对象的对应关系，当拷贝时，先从空间中找，找到直接返回，没有的话正常拷贝

这种数据结构可以用 Map 和 WeakMap，最大的区别在于 WeakMap 是弱引用

WeakMap 中的键是“弱引用”，在没有其它引用存在时，垃圾回收能直接进行，避免内存泄露

讲讲垃圾回收

新生代内存回收：Scavenge 算法

- 将空间分成两半，一半是 from 空间，一半是 to 空间，新加入的对象会放在 from 空间，当空间快满时，执行垃圾清理；再角色调换，当调换完后的 from 空间快满时，再执行垃圾清理，如此反复

老生代内存回收：标记-清除-整理（Mark - Sweep），此为两个算法，「标记-清理」算法和 「标记-整理」算法

- 标记-清理：标记用不到的变量，清理掉
- 标记-整理：整理完内存后，会产生不连续的内容空间，为节省空间，整理算法会将内容排序到一处空间，空间就变大了

引用计数：引擎中有张“引用表”，保存了内存里面的资源的引用次数，如果一个值的引用次数是0，就表示这个只不再用到，因此可以将这块内存释放

- 缺点：循环引用，从而导致内容泄露


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



## 5.React Hooks 实现原理

考察点：React Hooks 是什么、怎么实现的，使用时需要注意什么

### React Hooks 是什么

Hooks 是 React 16.8 新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他 React 特性



### React Hooks 实现原理

- Hooks 数据存储在组件对应的 Fiber 节点上。每个 Fiber 节点都有之关联的 Hooks 链表，Hooks 通过链表的形式进行串联存储
- 利用闭包保存 Hooks 状态。每次组件重新渲染时，Hooks 的状态通过闭包机制得到保留
- 利用链表结构维护 Hooks 的状态。Hooks 以链表的形式进行存储，便于在组件更新时快速定位和更新对应的  Hooks 状态
- UseState 和 useEffect 等 Hooks API 的实现原理。这些 API 的内部实现利用了闭包和链表结构来保存和管理状态
- Hooks 机制让 React 函数也能实现和 Class 组件类似的状态管理和副作用处理功能

总的来说，React Hooks 的实现借助了 Fiber 架构、闭包和链表等技术手段，使得函数组件也能拥有状态管理和生命周期的能力，极大地简化了 React 组件的开发



衍生问题：

为什么不能在循环中调用 Hooks？

Hooks为什么只能写在顶层，不写在顶层会报错吗



### 为什么不能在循环中调用 Hooks？

Hooks 的原理是基于 Fiber 树结构和链表维护 Hooks 状态。如果在循环或条件语句中调用 Hooks，会破坏这种固定的调用顺序，导致 Hooks 状态混乱



### Hooks为什么只能写在顶层，不写在顶层会报错吗

Hooks 的实现机制依赖于 Fiber 树结构，以及 Hooks 在 Fiber 节点上的链表存储。在顶层调用 Hooks，可以确保 Hooks 能够正确地与 Fiber 树建立关联





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

### 同源策略

- 浏览器的安全机制，它限制了来自不同源的脚本对当前文档的访问权限
- 所谓同源，指的是**协议（Protocol）**、**主机（Host）**和**端口（Port）**完全相同
- 同源策略可以防止跨站脚本（XSS）攻击等安全问题

### 跨源资源共享（CORS）

服务端/后端在相应头中添加`Access-Control-Allow-*` 头，告知浏览器端通过此请求

只需要服务端/后端支持即可，不涉及前端改动

### 具体实现方法

CORS 将请求分为简单请求（Simple Requests）和需预检请求（Preflighted requests），不同场景有不同行为：

#### 简单请求

不会触发预检请求的称为简单请求。当请求满足以下条件时就是一个简单请求

- 请求方式：HEAD、GET、POST
- 请求头：Accept、Accept-Language、Content-Language、Content-Type
  - Content-Type 仅支持：`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`。

#### 需预检请求

当一个请求不满足以上简单请求的条件时，浏览器会自动向服务器发送一个 OPTIONS 请求，通过服务端返回的 `Access-Control-Allow-*` 判定请求是否被允许。

CORS 引入了以下几个以 `Access-Control-Allow-*` 开头：

- `Access-Control-Allow-Origin` 表示允许的来源
- `Access-Control-Allow-Methods` 表示允许的请求方法
- `Access-Control-Allow-Headers` 表示允许的请求头
- `Access-Control-Allow-Credentials` 表示允许携带认证信息

当请求符合响应头的这些条件时，浏览器才会发送并响应正式的请求。

衍生问题：跨域的其他解决方案

反向代理、JSONP、postMessage、window.name、document.domain，详见 [跨域解决方案](/Browser/跨域)



## 8.Webpack构建的原理 

资源分析

依赖图构建

资源打包

输出构建





webpack性能优化分为生产环境调优和开发环境调优。
1.生产环境调优主要是通过利用缓存、减少代码体积、分包等方式提升页面响应速度。对于spa单页的话通常需要通过优化减少首屏渲染时间。
2.开发环境调优的目的是提升webpack构建速度。如开启热更新和热模块（HMR）替换、缩小代码编译范围、多线程打包等

现在也有很多出圈的构建工具
rollup：任务型打包工具，很多三方库都是用这个进行打包，比如react。
parcel:零配置开箱即用。
vite:基于esm的新一代构建工具
其它还有esbuilder等等





## 9.OSI七层模型 



## 10. 算法题：三数之和
