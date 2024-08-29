# 模拟题七



## 1.双飞翼/圣杯布局

考察点：双飞翼/圣杯布局

双飞翼布局：浮动+margin-left+中间部分再包裹一层

圣杯布局：浮动+margin-left+自身相对定位





## 2. 手写 reduce





## 3.什么是立即执行函数

考察点：立即执行函数

IIFE，立即执行函数，声明一个匿名函数，并马上调用这个匿名函数。只有一个作用，创建一个独立的作用域



## 4.Map 和 Set





## 5.说说你对react的理解/请说一下react的渲染过程

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

## 6. useEffect 第二个参数是对象如何处理

考察点：useEffect 的使用

**保持依赖项为数组**

```jsx
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    // 处理副作用
    console.log("状态改变了", state);
}, [state.a, state.b]);  // 依赖项数组应包含对象的具体属性
```

**使用 JSON.stringify**

```jsx
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    // 处理副作用
    console.log("状态改变了", state);
}, [JSON.stringify(state)]);  // 使用 JSON.stringify 作为依赖项
```

**使用自定义钩子**

写个类似 useSetState 这样的 hooks，判断复杂对象的变化





## 7.首页白屏如何优化



### 路由懒加载

SPA 项目，一个项目对应一个页面

```jsx
// 通过webpackChunkName设置分割后代码块的名字
const Home = () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue");
const MetricGroup = () => import(/* webpackChunkName: "metricGroup" */ "@/views/metricGroup/index.vue");
…………
const routes = [
    {
       path: "/",
       name: "home",
       component: Home
    },
    {
       path: "/metricGroup",
       name: "metricGroup",
       component: MetricGroup
    },
    …………
 ]
```

#### 路由懒加载的原理

懒加载前提的实现：ES6 的动态加载模块——`import()`



### 组件懒加载

比如当前页面不用展示的组件先不加载，如 Modal、Dialog 等模态框组件



### 合理的 Tree Shaking

作用：消除无用的 JS 代码，减少代码体积

#### Tree-Shaking 原理

依赖 ES6 的模块特性，ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析





### 使用骨架屏或加载提示





### 长列表虚拟滚动

只渲染可视区域的列表项，非可见区域的不渲染

#### 虚拟列表的原理

计算出列表总高度，并在触发滚动事件时根据 scrollTop 值不断更新 startIndex 以及 endIndex，以此来列表数据 listData 中截取对应元素



### Web Worker 优化长任务

由于浏览器 GUI 渲染线程与 JS 引擎线程是互斥关系，所以当页面中有长任务时，会造成页面 UI 阻塞，出现界面卡顿、掉帧等情况



### JS 的6钟加载方式

**正常模式**

```html
<script src="index.js"></script>
```

这种情况下 JS 会阻塞 DOM 渲染

**async 模式**

```html
<script async src="index.js"></script>
```

异步模式，JS 不会阻塞 DOM 的渲染，async 加载是无顺序的，当它加载结束，JS 会立即执行

使用场景：埋点统计、客服系统

**defer 模式**

```html
<script defer src="index.js"></script>
```

defer 模式下，JS 的加载也是异步的，但 defer 资源会在 `DOMContentLoaded` 执行之前，并且 defer 是有顺序的加载

**module 模式**

```html
<script type="module">import { a } from './a.js'</script>
```

在主流现代浏览器中，script 标签的属性可以加上 `type="module"`，浏览器会对内部的 import 引用发起 HTTP 请求，获取模块内容。这时 script 的行为会像是 defer 一样，在后台下载，并且等待 DOM 解析

Vite 就是利用浏览器支持原生的 `es module` 模块，开发时跳过打包的过程，提升编译效率

**preload** 

```html
<link rel="preload" as="script" href="index.js">
```

link 标签的 preload 属性：用于提前加载一些需要的依赖，这些资源会优先加载

preload 特点

preload 加载的资源是在浏览器渲染机制之前进行处理的，并不会阻塞 onload 事件

preload 加载的 JS 脚本其加载和执行的过程是分离的，即 preload 会预加载相应的脚本代码，待到需要时自行调用

**prefetch**

```html
<link rel="prefetch" as="script" href="index.js">
```

prefetch 是利用浏览器的空闲时间，加载页面将来可能用到的资源的一种机制；通常可以用于加载其他页面（非首页）所需要的资源，以便加快后续页面的打开速度

prefetch 特点：

prefetch 加载的资源可以获取非当前页面所需资源，并且将其放入缓存至少五分钟

当页面跳转时，未完成的 prefetch 请求不会被中断

#### 加载方式总结

async、defer 是 script 标签的专属属性，对于网页的其他资源，可以通过 link 的 preload、prefetch 属性来预加载

现代框架已经将 preload、prefetch 添加到打包流程中，通过配置可以使用

### 图片的优化

#### 图片动态裁剪

#### 图片懒加载

图片懒加载实现原理

先通过 HTML 自定义属性 data-xxx 先暂存 src 的值，然后在图片出现在屏幕可视区域时，再将 data-xxx 的值赋值到 img 的scr 属性即可

#### 使用字体图标

#### 图片转 base64 格式

#### 图片资源压缩

tinypng 图片资源压缩

#### 图片资源放到 OSS 上

#### 图片格式转换

转成 webp、AVIF格式



衍生问题：路由懒加载怎么使用，背后的原理是什么？

### 路由懒加载怎么使用，背后的原理是什么？

import 的动态引入

使用了ESModule

如果说浏览器不支持 ESModule，webpack 打包时会将其打包成什么样子？

如果兼容不支持ESModule的浏览器，webpack 会将 ESModule 转换成 CommonJS 或 UMD 格式。既可以确保在较旧的环境中运行，又能确保模块依赖的加载机制正常工作





为了解决单页应用的白屏问题，可以采用以下优化方法：

- **代码分割**：将 JavaScript 和 CSS 分为多个较小的文件，按需加载，减少初始加载时间
- **懒加载和预加载**：对于非关键的资源，可以采用懒加载或预加载策略，确保需要的资源先加载。
- **优化请求**：通过合并请求或使用CDN加速文件传输，减少网络延迟。
- **使用骨架屏或加载指示**：在内容加载之前显示骨架屏或加载动画，以改善用户体验。
- **监测和分析**：使用工具监测应用的性能，通过分析用户反馈不断优化加载时间



解决方案：

1. 骨架屏
2. 启用服务端渲染SSR
3. 首屏静态html
4. 离线包或者PWA







## 8.网站首页有大量的图片，加载很慢，如何优化呢？

考察点：大量图片优化

图片懒加载，显示的图片显示出来，还没出现的图片先用小图标展示

图片放在 oss 上

最开始用placeholder图或者loading图来代替，真正的图片放在data-img属性上，等到图片需要展示的时候再替换img.src

监听所有scroll，为了性能，200ms 拉动一次

循环所有的图片，判断他们的偏移高度与视窗高度+滚动高度之和，如果小于，则说明图片已经显示在视图中，那么就展示

通过 getBoundingClientRect，也是循环所有图片，但是是通过拿到该元素的getBoundingClientRect 来判断是否出现再视图中

intersectionObserver 交叉观察器，异步



## 9.微前端：如何防止一个应用没有被卸载掉造成内存泄露





衍生问题：CSS 可能会造成全局污染？怎么避免样式互相冲突

### CSS 可能会造成全局污染？怎么避免样式互相冲突





## 10.算法题：全排列

考察点：全排列

