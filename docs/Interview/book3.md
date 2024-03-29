# 模拟题三

1. react 合成事件是什么？和原生事件相比有什么不同

考察点：合成事件

目的：封装事件，实现跨平台，把差异封装在底层
将事件全部统一冒泡到 document 再进行触发
可以统一命名，这样子命名符合 react 编程习惯

抹平不同浏览器的差异、与内部优先级机制绑定、需要考虑所有浏览器事件

在 react 中，我们绑定的事件并不是原生事件，而是由原生事件合成的 react 事件，比如 click 事件合成为 onClick 事件；比如 blur、change、input 等，合成为 onChange 事件，它统一绑定在 document 上统一管理（react 17 之后就绑定在 root 根节点上，这样做的好处是利于微前端）

衍生：事件冒泡

2. react 如何处理异常？

考察点：异常处理

Error Boundaries 错误边界，两个生命周期
static getDerviedStateFromError，展示错误 UI
componentDidCatch，上报错误日志

其他的异常处理
try catch：捕获预见错误，捕获不到具体的语法错误和异步错误
window.error：能捕获意料之外的语法错误，但捕获不到资源加载错误和接口异常
window.addEventListener('error')：捕获资源加载错误
window.addEvent('onhandledrejection')：捕获 promise 错误

3. 闭包的作用和原理

考察点：闭包

闭包：闭包是一个绑定了执行环境的函数，它利用了词法作用域的特性，在函数嵌套时，内层函数引用外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包
作用：对外层函数的变量起到保护作用
作用：既重用一个变量又保护变量不被污染的一种编程方式
原理：存在执行上下文栈中，没有被销毁。所以会引起内存泄漏问题

4. 0.1 + 0.2 为什么不等于 0.3

考察点：浮点数

因为 JS 采用的是 IEEE754 标准的双精准度（64 位），一个浮点数既要包含整数部分又要包含小数部分，
0.1 和 0.2 先转成二进制，在转换为同一维度计算，得到二进制后，再转换为十进制后

5. 什么是 BFC，BFC 有什么用，如何形成 BFC

考察点：BFC

什么是 BFC，块级格式化上下文。是一种布局方式？
块级格式化上下文，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域
如何形成 BFC：root 根节点、float 浮动元素（float 不会 none）、overflow 不会 visible 的块级元素、绝对定位元素（position 为 absolute 或 fixed）、display 的值为 table-cell、table-caption、flex、inline-flex、grid、inline-grid
有什么用？清除内部浮动（父元素交 overflow：hidden）、垂直 margin 合并（利用同一个 BFC 的两个相邻盒子的 margin 会发生重叠）、自适应布局

6. 浏览器缓存策略是怎么样的

考察点：缓存策略

先强缓存再协商缓存，强缓存中又分为 HTTP1.1 的 Expires 和 HTTP1.0 的 Cache-Control，两者同时存在时，Expires（过期时长）的优先级大于 Cache-Control（过期时间）；协商缓存同理，HTTP1.1 的 Etag 优先级大于 HTTP1.0 的 Last-modified

7. 你知道的前端性能优化有哪些

考察点：前端性能优化手段

从工程角度，webpack 的优化，压缩 js、css、图片等静态资源，升级为 vite
从 react 角度，usememo（缓存值）、useCallback（缓存回调函数）、memo（避免重复渲染）、分页、虚拟列表、react.lazy(懒加载)、按需引入
useCallback 和 useMemo 有什么区别？

从 http 角度，开启 http2（特点：对头阻塞），采用 http 缓存策略
从服务器角度，开启 gzip 压缩，oss，cdn
从页面渲染角度，css 放头部，js 放尾部，防抖节流等

8. 前端模块化机制有哪些

考察点：模块化机制
顺序：commonJS-ADM/CMD-ES6
ES6 import 模块引入 ESModule
node commonJS
AMD 使用 requireJS 来编写模块化，依赖必须提前申明好；推崇返回值的方式对外输出
CMD 玉伯提出，使用 seajs 来编写模块化，支持动态引入依赖，推崇通过给 module.exports 赋值的方式对外输出

CommonJS 与 ES6 模块的区别？
CommonJS 输出的是一个值的拷贝，ES6 模块输出的是值的引用
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

9. http2.0 做了哪些改进

考察点：http2
多路复用：相同域名下多个接口，共享同一个 TCP 连接，降低延迟
服务器推送、二进制传输、数据流、头部压缩、请求优先级

10. 求解平方根

考察点：二分查找：求解平
