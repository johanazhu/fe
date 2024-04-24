# 模拟题一



## 1. CSS：BFC 是什么 ⭐

- BFC 是什么
- BFC 有什么用
- 触发条件
- 谈谈你对 BFC 的理解

盒模型、块级、块级格式化上下文、正常流

### BFC 是什么

BFC 全称为 block formatting context，中文为“块级格式化上下文”。相对应的还有 IFC，也就是 inline formatting context，中文为“内联格式化上下文”。它是一个只有块级盒子参与的独立快递渲染区域，它规定了内部的块级盒子如何布局，且与区域外部无关

### BFC 有什么用

- 修复浮动元素造成的高度塌陷问题
- 避免非期望的外边距折叠
- 实现灵活健壮的自适应布局

触发 BFC 的常见条件

- 根元素（html）
- 浮动元素（float 的值不为 none 的元素）
- 绝对定位元素（position 的值为 absolute 或 fixed 的元素）
- 行内块元素（display 的值为 inline-block 的元素）
- 表格单元格（display 的值为 table-cell，HTML 表格单元格默认值）
- 表格标题（display 的值为 table-caption，HTML 表格标题默认值）
- overflow 的值不为 visible 或 clip 块级元素
- 弹性元素（display 的值为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 的值为 grid 或 inline-grid 元素的直接资源是）

详见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)





考察点：BFC

什么是 BFC，块级格式化上下文。是一种布局方式？
块级格式化上下文，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域
如何形成 BFC：root 根节点、float 浮动元素（float 不会 none）、overflow 不会 visible 的块级元素、绝对定位元素（position 为 absolute 或 fixed）、display 的值为 table-cell、table-caption、flex、inline-flex、grid、inline-grid
有什么用？清除内部浮动（父元素交 overflow：hidden）、垂直 margin 合并（利用同一个 BFC 的两个相邻盒子的 margin 会发生重叠）、自适应布局





## 2. 手写源码：防抖与节流

先手写，再做到口喷

### 防抖

无论触发多少次，一定在事件触发后的 n 秒后执行，如果你在一个事件触发 n 秒内又触发了这个事件，以新的事件的时间为准，n 秒后再执行。总之，触发事件 n 秒内不再触发事件，n 秒后再执行

#### 应用场景

- 窗口大小变化调整样式
- 搜索框、输入后 1000 毫秒搜索
- 验证表单，输入 1000 毫秒后验证

```javascript
function dobounce(func, wait, flag) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        if (!timer && flag) {
            func.apply(this, args);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
```

flag 是否立即执行

### 节流

不管事件触发频率多高，只在单位时间内执行一次

#### 应用场景

- 搜索框输入时的实时联想
- 监听 scroll 事件计算位置信息

#### 实现方法

时间戳/定时器

时间戳：第一次肯定触发，最后一次不执行

定时器：第一次不执行，最后一次肯定触发

##### 时间戳

```javascript
function throttle(func, wait) {
    let pre = 0;
    return function (...args) {
        if (Date.now() - pre > wait) {
            pre = Data.now();
            func.apply(this, args);
        }
    };
}
```

##### 定时器

```javascript
function throttle(func, wait) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(this, args);
            }, wait);
        }
    };
}
```

结合版本，第一次和最后一次都会触发

```javascript
function throttle(func, wait) {
    let pre = 0,
        timer = null;
    return function (...args) {
        if (Date.now() - pre > wait) {
            clearTimeot(timer);
            timer = null;
            pre = Data.now();
            func.apply(this, args);
        } else if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        }
    };
}
```

### 衍生问题

apply、箭头函数、arguments

#### apply 手写

```javascript
function myApply(context = window, args) {
    if (this === Function.prototype) {
        return undefined;
    }
    let fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
        result = context[fn](...args);
    } else {
        result = context[fn]();
    }
    delete context[fn];
    return result;
}
```

#### 箭头函数和普通函数有什么区别

- 箭头函数没有 this 对象，函数体内的 this 是定义时所在的对象，而不是使用时的对象
- 不可以当作构造函数使用，也就是说，不可以对箭头函数使用 new 命令，否则会抛出一个错误
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
  - 衍生 generator 函数。生成器，yield，开始，中断



### arguments

#### 数组和类数组的区别

- 数组是数组，类数组是对象
- 类数组拥有 length 属性和索引属性的对象
- 区别：类数组是对象，它的原型关系和数组不同

类数组如何转换为数组

以下三种方法都可以将类数组转换为数组：

`Array.from(likeArray)`

`[...likeArray]`

`slice(likeArray, 0)`



## 3.闭包

什么是闭包？

闭包的特性，内层函数使用外层函数的变量

闭包的应用：

闭包的例子：

### 实现 add(1)(2)(3)

```javascript
function add(x, y, z) {
    return x + y + z;
}

const curried = (fn, ...args) => {
    if (args.length >= fn.length) {
        return fn(...args);
    }
    return (...args2) => curried(fn, ...args, ...arg2);
};

const curriedAdd = curried(add);

curriedAdd(1)(2)(3);
curriedAdd(1)(2, 3);
curriedAdd(1, 2)(3);
```





考察点：闭包

闭包：闭包是一个绑定了执行环境的函数，它利用了词法作用域的特性，在函数嵌套时，内层函数引用外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包
作用：对外层函数的变量起到保护作用
作用：既重用一个变量又保护变量不被污染的一种编程方式
原理：存在执行上下文栈中，没有被销毁。所以会引起内存泄漏问题





## 4.Promise 相关

then、

 setTimeout

什么是回调地狱，如何解决？引出 Promise async await

Promise 链式调用，链式调用怎么写



## 5.React Hooks 实现原理



为什么不能在循环中调用 hooks？react 中为什么不能在 for 循环、if 语句里使用 hooks，说下 react hooks 实现原理。

hooks为什么只能写在顶层，不写在顶层会报错吗





## 6. 数据流： Redux 是什么？

它的核心理念是什么

https://tech.meituan.com/2017/07/14/redux-design-code.html
考察点：状态管理，redux

redux 是状态管理库，不仅适用于 react，还可以作用于 vue

它的特点是一个 store、reducer 纯函数、通过 dispatch 一个 action 来修改 store

即用户 dispatch 一个动作，传给纯函数 reducer，reducer 接受两个参数，一个为原本的 store，另一个为动作，调用完毕后返回新的 store，用户监听 store 变化，就能实时知道 store 的变化

考察点：redux 核心原则
单一数据源、state 只读、使用 reducer 纯函数修改数据





## 7. 浏览器输入 url 到页面渲染都经历了什么

输入 url，敲击键盘，浏览器判断输入的 url 是否为网址，如果是网址，则前往该地址；如果不是网址，再通过浏览器默认搜索引擎拼接输入的值，前往搜索引擎页面。当该地址有强缓存时，直接返回资源给浏览器。如没有强缓存，再查看是否有协商缓存，如果有协商缓存，判断是否需要更新，如果不需要，则返回 304，如果需要，则继续请求。先判断 DNS 是否有缓存，有的话直接返回 ip 地址，如果没有则 DNS 解析，并缓存 DNS。获取后等待 TCP 连接，建立连接后，发起 HTTP 请求，服务器返回状态。判断是否与打开的网址是同一个站点，如果是，使用相同的渲染进程渲染页面，如果不是，浏览器渲染 HTML、CSS、JS。经历重绘与回流最终构建出渲染树，GUI 线程接管渲染页面



考察点：描述浏览器从输入网址到页面展示的整个过程

输入 url，浏览器判断是否是网址，如果是前往网址，如果不是，通过浏览器默认搜索引擎搜索输入的字符；
构建请求时判断是否有强缓存，如果有则返回强缓存资源；如果没有，判断是否有协商缓存，如果有，走协商缓存，如果没有继续请求。判断是否有 DNS 缓存，没有就 DNS 解析，缓存 DNS，获取 ip 地址，建立 TCP 连接，发送 HTTP 请求，服务器响应，断开 TCP 连接。判断是否与打开的网站是同一个站点，是，使用相同站点的渲染进程渲染页面，否，浏览器解析 HTML/CSS/JS，引起重绘回流



## 8. HTTP 1、2、3 的区别

关键字 HTTP 、HTTP 发展历程、HTTPS、HTTP 缓存、HTTP 状态码

### HTTP 的发展史

HTTP1

HTTP1.1

HTTP2

HTTP3

HTTP1 没有 keep-alive ，每次发送请求，都要连接一个 tcp

HTTP1.1 加了 connect: keep-alive，复用一个 TCP 连接

缺点是工作流程是请求-响应，请求发出去后等待响应，然后再发送请求，但对同一个服务器来说，可以建立6 个 tcp 连接。所以理论上最多可以同时请求 6 个文件

这个现象叫做：**队头阻塞**

解决方案

- 并发连接（多建立几个 TCP 连接，一个服务器最多建立 6 个 TCP 连接）

- 域名分片：一个域名最多并发六个长连接，那我多个域名

- 多路复用：HTTP2 的解决方案

HTTP2 多路复用

多路复用特点：把请求和响应当作一个流，每个流都有一个 id，每个流可以有多个帧，帧上保留数据

即相同域名多个请求，共享同一个 TCP 连接，降低了延迟

其他特点：请求优先级，二进制传输，数据流，服务器推送，头部压缩

缺点是：tcp 会丢包

HTTP3
解决 tcp 连接的问题

### HTTPS

在 HTTP 的基础上加了一层 SSL 协议，为加密协议

### HTTP 缓存

HTTP 缓存分为强缓存和协商缓存

#### 强缓存

HTTP 1 是 expires，设置过期时间来判断

HTTP 1.1 是 cache-control 设置过期时长来判断

`cache-control:max-age=1000`

同时存在时，cache-control 的优先级大于 expires

#### 协商缓存

HTTP 1.0 通过 last-modified，即最后修改时间来判断是否过期

HTTP 1.1 通过 etag，生成文件唯一标识来判断是否过期

从精准度的角度看，etag 比 last-modified 强（last-modified 的感知单位是秒）

从性能角度看，last-modified 比 etag 强

两则同时存在时，etag 的优先级大于 last-modified

#### HTTP 状态码

301 - 永久重定向

302 - 临时重定向

304 - 协商缓存重定向

401 - 未授权

403 - 服务器收到请求，但是拒绝提供服务，即资源不可用

404 - 无法找到请求资源

408 - 请求超时

414 - 请求 URI 过长

详见——> [HTTP 状态码](



## 9. 你常用的性能优化

你知道的前端性能优化有哪些

性能优化
性能指标
FP：首次渲染时间
FCP：首次渲染内容时间（包括文字、图像）
FMP：首次绘制有效内容时间
TTI：应用可交互时间

优化手段我归纳为 5 类：small（更小）、pre（更早）、delay（更晚）、concurrent（并发）、cache（缓存）

前端框架：react
列表 虚拟列表

-虚拟列表方案
按需加载，比如 React 中使用 React.lazy 和 React.Suspense
函数式组件
-memo 缓存组件
-- memo 和 shouldComponentUpdate 的区别
-- shouldComponentUpdate 默认 true，返回 false 时不会重新 render
-- memo 相反。默认 false，返回 true 时不会重新 render
-useCallback 缓存回调函数，需要与 memo 配合使用 类似于
-useMemo 缓存大量的计算
-- useCallback 和 useMemo 的区别
写组件的
类组件
-pureComponent 跳过不必要的更新
-shouldComponentUpdate 跳过不必要的更新

前端工程化：webpack
配置相关，因为我用 umi 比较多，已经封装好了，很
服务器端

利用 CDN 加速
-gzip
常用方法：防抖节流
非框架：
减少回流（重排）和重绘、事件委托、CSS 书写顺序、减少 DOM 操作
http 缓存
传统技能：
css 放头部、script 放尾部，使用 async





你知道的前端性能优化有哪些

考察点：前端性能优化手段

从工程角度，webpack 的优化，压缩 js、css、图片等静态资源，升级为 vite
从 react 角度，usememo（缓存值）、useCallback（缓存回调函数）、memo（避免重复渲染）、分页、虚拟列表、react.lazy(懒加载)、按需引入
useCallback 和 useMemo 有什么区别？

从 http 角度，开启 http2（特点：对头阻塞），采用 http 缓存策略
从服务器角度，开启 gzip 压缩，oss，cdn
从页面渲染角度，css 放头部，js 放尾部，防抖节流等



如何做性能优化，最大的性能优化就是随时升级各种库的版本

webpack 的速度不如 bun ，bun 的速度不如 vite， vite 的速度不如用 rust 打包，总之随时在变化





## 10.算法题：两数之和









