# 模拟题五



## 1.CSS 选择器有哪些

考察点：CSS 选择器
id 选择器、class 选择器、标签选择器、通用选择器、属性选择器、相连选择器、子选择器、后代选择器、伪类选择器

## 2. 手写 Object.create

```javascript
function create(proto) {
    function F() {}
    F.prototype = proto
    return new F()
}
```

相关文章：[Object.create](../JavaScript/Object.create)



## 3. 作用域

考察点：作用域

JavaScript 的作用域是词法作用域，其特点是在那里定义它就作用在那里，与定义位置有关而与调用位置无关

作用域分为全局作用域、函数作用域、块级作用域

全局作用域顾名思义，全局中只有一个

函数作用域只作用于函数中，函数内的变量函数外不能调用。

块级作用域仅在 let、const 声明时才会形成

因为函数作用域的特点使得作用域有链状，即作用域链



## 4.ES Module 和 CommonJs

类似问题：前端模块化机制有哪些

考察点：模块化历程 

顺序：commonJS-ADM/CMD-ES6

ES6 import 模块引入 ESModule

node commonJS

AMD 使用 requireJS 来编写模块化，依赖必须提前申明好；推崇返回值的方式对外输出

CMD 玉伯提出，使用 seajs 来编写模块化，支持动态引入依赖，推崇通过给 module.exports 赋值的方式对外输出

CommonJS 与 ES6 模块的区别？

CommonJS 输出的是一个值的拷贝，ES6 模块输出的是值的引用

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口



## 5.React： useMemo、useCallback是什么

考察点：useCallback、useMemo

useCallback：缓存函数，结合 memo 能让子组件不重复渲染

- useCallback(() => {}, [desp])

useMemo：缓存值，结合 memo 能让子组件不重复渲染

- useMemo(() => value, [desp])

衍生问题：除了useCallback和 useMemo，React 还有那些性能优化的点



### 除了useCallback和 useMemo，React 还有那些性能优化的点

React Fiber 的工作流简单来说分为两个阶段：render 和 commit

render 阶段会进行多次调用（会被打断）

commit 阶段是将虚拟 DOM 渲染到真实DOM上

所以优化可以分为三类

- render阶段优化。即跳过不必要的组件的渲染更新

- commit 阶段优化。即减少 commit 阶段耗时
- 非渲染方面的优化

#### render阶段优化

React.memo

useMemo、useCallback 实现未定的 props 值

列表项使用 key 属性

#### commit 阶段优化

避免在 didMount、didUpdate 中更新组件 State

也就是说无不必要不要使用 useLayoutEffect，它和 didMount 一样，会阻塞页面渲染

#### 非渲染方面的优化

组件按需挂载

懒加载：webpack 的动态导入+ React.lazy

懒渲染：即当组件进入或即将进入可视区域时才渲染组件，如Modal、Drawer

虚拟列表：懒渲染中的一种特殊场景，不渲染所有数据，只渲染可视区域中的数据。当用户滑动时，通过监听 scroll 来判断是上滑还是下拉，从而更新数据。同理 IntersectionObserver（交叉观察者）和 getBoundingClientRect 也能实现



## 6. React：说说你做的组件

口述表达题



## 7.html缓存了怎么更新，js和css缓存是怎么更新的

考察点：HTTP缓存

一般来说，html 不缓存，js、css 缓存，html 中会加载 js 和 css，后两者会以哈希名的方式引入到 html 中

html 被缓存了就是要让缓存失效，一般有两种解法，一如果资源都在 OSS 或者 CDN 上，那么在 OSS 或者 CDN 上设置过期时间；二在 nginx 中设置过期时间

衍生问题：HTTP强缓存和协商缓存

### HTTP强缓存和协商缓存

HTTP先走强缓存，Cache-Control失效，走协商缓存ETag，ETag未变，返回 304，变化返回新资源并打上 ETag 标签



## 8.埋点 SDK 设计思路

考察点：对 埋点SDK 的理解

设计到日制和埋点

- 自动化上报页面PV、UV，记录用户点击路径行为
- 自动上报页面异常
- 发送埋点信息时，不影响性能，不阻碍页面主流程加载和请求发送

#### 数据上报

使用 `navigator.sendBeacon` ，它的优势在于它能异步操作，即使在页面卸载后，该方法也可以继续发送数据，并且这个方法可以实现跨域发送数据

还有以下几种上报

- ajax、fetch 上报
- image 上报
- jsonp 上报

#### 上报时机

上报时机有三种：

- requestIdleCallback/setTimeout 延时上报
- beforeUnload 回调函数里上报
- 缓存上报数据，达到一定数量后再上报

先缓存上报数据，缓存到一定数量后，利用 `requestIdleCallback/setTimeout` 延时上报，在页面离开时统一将未上报数据进行上报

#### 性能监控

- FP、FCP、LCP、onload、DOMContentLoaded
- 资源加载时间
- 接口请求耗时

#### 错误监控

- 资源加载错误：`addEventListener('error')`
- JS 错误：`window.onerror` 或者 `window.addEventListener('error', callback)`
  - `window.onerror` 无法捕获资源加载错误

- Promise 错误 error 无法捕获， `window.addEventListener('unhandledrejection', callback)`

```
window.addEventListener('error', event => {
  this.error(error);
})
window.addEventListener('unhandledrejection', event => {
  	this.error(new Error(event.reason), { type: 'unhandledrejection' })
})
```

#### 行为监控

- UV、PV
- 页面停留时长
- 用户点击



## 9.进程和线程的区别

考察点：进程和线程

进程是一个应用起来的实例，线程是运行在进程中的最小单位

浏览器是是多进程架构，其中有一个浏览器主进程，多个渲染进程（一个 Tab 就是一个进程）

渲染进程中包括多个线程：GUI 渲染线程、JS 引擎线程、事件触发线程、异步线程、定时器线程

GUI 渲染线程和 JS 引擎线程是互斥的。GUI 负责渲染页面，JS引擎负责执行 JS 脚本，但是 JS 能操作 DOM，所以两者不能同时进行



## 10. 算法题：无重复字符的最长子串

考察点：无重复字符的最长子串
