# 模拟题一

1. 函数式组件与类组件的区别

考察点：react

react 16.8 有了 hooks，hooks 让函数式组件可状态管理，它和类组件最大的区别在于，函数式组件可以捕获渲染时的值
怎么获取最新的值，用 ref

2. 手写防抖节流

JavaScript 手写系列，防抖节流

防抖
无论触发多少次，一定在事件触发后的 n 秒后执行，如果你在一个事件触发 n 秒内又触发了这个事件，以新的事件的事件为准，n 秒后才执行。总之，触发事件 n 秒内不再触发事件，n 秒后再执行
例如：窗口大小变化调整样式
搜索框、输入后 1000 毫秒搜索
验证表单，输入 1000 毫秒后验证

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

节流
不管事件触发频率多高，只在单位时间内执行一次
两种方法，时间戳、定时器
时间戳：第一次肯定触发，最后一次不执行
定时器：第一次不执行，最后一次肯定触发

时间戳

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

定时器

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

衍生问题
apply
箭头函数
arguments

apply 手写

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

箭头函数和普通函数有什么区别
箭头函数没有 this 对象，函数体内的 this 是定义时所在的对象，而不是使用时的对象
不可以当作构造函数使用，也就是说箭头函数不能使用 new 命令，否则会抛出一个错误
不可以使用 arguments 对象，该对象在函数体内不存在，可以用 rest 参数代替
不可以使用 yield 命令，因此箭头函数不能用作 generator 函数
返回对象时必须在对象外面加上括号

arguments 衍生 数组和类数组的区别
generator 衍生 generator 函数

数组和类数组的区别
数组是数组，类数组是对象
类数组拥有 length 属性和索引属性的对象
区别：类数组是对象，它的原型关系和数组不同

类数组如何转换为数组
Array.from(likeArray)
[...likeArray]
slice(likeArray, 0)

generator 衍生 generator 函数
生成器，yield，开始，中断

3. http1、2、3 的区别

http 方面相关，关键字 http、http 发展历程、https、http 缓存、http 状态码
http 的发展史
http1
http1.1
http2
http3

http1 没有 keep-alive ，每次发送请求，都要连接一个 tcp
HTTP1.1 加了 connectiong: keep-alive，复用一个 TCP 连接
缺点是工作流程是请求-响应，请求发出去后等待响应，然后再发送请求，但对同一个服务器来说，可以建立 6 个 tcp 连接。所以理论上最多可以同时请求 6 个文件
这个现象叫做：队头阻塞
解决方案：
并发连接（多建立几个 TCP 连接，一个服务器最多建立 6 个 TCP 连接）
域名分片：一个域名最多并发六个长连接，那我多个域名
多路复用：http2 的解决方案

http2 多路复用
多路复用特点：把请求和响应当作一个流，每个流都有一个 id，每个流可以有多个帧，帧上保留数据
即相同域名多个请求，共享同一个 TCP 连接，降低了延迟
其他特点：请求优先级，二进制传输，数据流，服务器推送，头部压缩
缺点是：tcp 会丢包

http3
解决 tcp 连接的问题

https
在 http 的基础上加了一层 ssl 协议，为加密协议

http 缓存
http 缓存分为强缓存和协商缓存
强缓存
http1 是 expires，设置过期时间来判断
http1.1 是 cache-control 设置过期时长来判断
cache-control:max-age=1000
同时存在时，cache-control 的优先级大于 expires
协商缓存
http1.0 通过 last-modified，即最后修改时间来判断是否过期
http1.1 通过 etag，生成文件唯一标识来判断是否过期
从精准度的角度看，etag 比 last-modified 强（last-modified 的感知单位是秒）
从性能角度看，last-modified 比 etag 强
两则同时存在时，etag 的优先级大于 last-modified

http 状态码
301 永久重定向
302 临时重定向
303
304 协商缓存重定向
...

4. 性能优化

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

-利⽤ CDN 加速
-gzip
常用方法：防抖节流
非框架：
减少回流（重排）和重绘、事件委托、CSS 书写顺序、减少 DOM 操作
http 缓存
传统技能：
css 放头部、script 放尾部，使用 async

5. 实现 add(1)(2)(3)

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

6. redux 是什么？它的核心理念是什么

https://tech.meituan.com/2017/07/14/redux-design-code.html
考察点：状态管理，redux

redux 是状态管理库，不仅适用于 react，还可以作用于 vue

它的特点是一个 store、reducer 纯函数、通过 dispatch 一个 action 来修改 store

即用户 dispatch 一个动作，传给纯函数 reducer，reducer 接受两个参数，一个为原本的 store，另一个为动作，调用完毕后返回新的 store，用户监听 store 变化，就能实时知道 store 的变化

7. 事件循环

浏览器的事件循环，先正常运行代码（即它身处宏任务中），遇到宏任务放入宏任务队列，遇到微任务放入微任务队列。当代码执行完毕，依次执行微任务队列中的微任务，执行完毕后再从宏任务队列队头初拿出一宏任务，再执行，以此循环往复

8. 浏览器输入 url 到页面渲染都经历了什么

输入 url，敲击键盘，浏览器判断输入的 url 是否为网址，如果是网址，则前往该地址；如果不是网址，再通过浏览器默认搜索引擎拼接输入的值，前往搜索引擎页面。当该地址有强缓存时，直接返回资源给浏览器。如没有强缓存，再查看是否有协商缓存，如果有协商缓存，判断是否需要更新，如果不需要，则返回 304，如果需要，则继续请求。先判断 DNS 是否有缓存，有的话直接返回 ip 地址，如果没有则 DNS 解析，并缓存 DNS。获取后等待 TCP 连接，建立连接后，发起 HTTP 请求，服务器返回状态。判断是否与打开的网址是同一个站点，如果是，使用相同的渲染进程渲染页面，如果不是，浏览器渲染 HTML、CSS、JS。经历重绘与回流最终构建出渲染树，GUI 线程接管渲染页面

9. 错误捕获

js 代码错误。try catch 只能针对已知错误
window.addEventListener('error') 资源加载错误不可捕获，promise 错误不可捕获
window.addEventListener('handleRejection') 捕获 promise 错误
React 方面
Error Boundying 错误捕获组件
static XXX 渲染错误 UI
componentDidCatch 上报错误日志

10. flex：1 表示什么

flex 弹性布局
flex 为缩写，flex：1 表示 1 1 0
flex 默认是 0 1 auto
flex: 1 表示剩余空间有余的时候等比扩展，剩余空间不足的时候等比收缩，所谓的剩余空间就是指父元素宽度减去所有子元素的宽度
第一个参数表示 flex-grow：扩展所侵蚀的空间是除去元素外剩余的空白间隙。默认值为 0，表示不占用剩余空间间隙扩展自己的宽度
第二个参数表示 flex-shrink：收缩的意思，当 flex 容器空间不足时，单个元素的收缩比例。默认为 1，默认所有的 flex 子项都会收缩
第三个参数表示 flex-basis，定义了分配剩余空间之前元素的大小。默认值为 auto，就是自动

11. 迭代器和生成器

迭代器是 iterator
生成器是 generator

12. 闭包
    闭包的特性，内层函数使用外层函数的变量

13. 工程化
    webpack 相关

14. Promise 相关
    then、

15. fiber 是什么

16. 水平垂直居中

17. 左边固定宽，右边自适应方案

18. BFC

19. setState 是同步的还是异步

代码是同步的，但是 setState 做批处理，当非原生事件和 setTimeout 等事件下，它的表现为异步。

20. 手写 call、apply、bind

云谦
算法、闭包、迭代器、Promise、ES 特性、React、数据流、工程化

性能优化方面，比如长列表怎么优化，加载怎么优化，怎么提高项目的可维护性，怎么提高项目的首屏加载速度。

自我介绍（show time，3 分钟展示自己的时间，把最闪亮的你展现出来）
你知道/用过/遇到过 xx 问题么？（不仅会技术的使用，还了解技术的实现原理）
你还有什么问题么？（你对团队的了解、好奇，对未来的个人成长有什么期待？）
