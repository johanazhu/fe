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





## 5.props 类型不要用 React.FC 写法

props 类型不要用 React.FC 写法，因为[早已不推荐](https://github.com/facebook/create-react-app/pull/8177)，缺点包括不能于泛型一起工作、不能与 defaultProps 一起工作等，用正常的函数参数声明即可。如果对返回值有更严格的要求，可以加 JSX.Element 或 React.ReactElement 返回值类型

```typescript
type FooProps = { bar: string };
const Foo = (props: FooProps) => <div/>
const Foo = (props: FooProps): JSX.Element => <div />;

// 不推荐
const Foo: React.FC<FooProps> = (props) => <div />
```





## 6. React 如何处理异常？

考察点：异常处理

Error Boundaries 错误边界，两个生命周期
static getDerviedStateFromError，展示错误 UI
componentDidCatch，上报错误日志

其他的异常处理
try catch：捕获预见错误，捕获不到具体的语法错误和异步错误
window.error：能捕获意料之外的语法错误，但捕获不到资源加载错误和接口异常
window.addEventListener('error')：捕获资源加载错误
window.addEvent('onhandledrejection')：捕获 promise 错误



js 代码错误。try catch 只能针对已知错误
window.addEventListener('error') 资源加载错误不可捕获，promise 错误不可捕获
window.addEventListener('handleRejection') 捕获 promise 错误
React 方面
Error Boundying 错误捕获组件
static XXX 渲染错误 UI
componentDidCatch 上报错误日志

衍生问题：Error Boundary 有什么问题

### Error Boundary 有什么问题

1.Error Boundaries 只能捕获组件层面的错误，无法捕获事件处理程序中的错误

比如说你的UI组件渲染错误，如果说这个时候点击按钮，请求数据，这时候报错了，那么它就捕获不到了

2.不能捕获异步操作中的异常，如 Promise，setTimeout 的异常无法捕获，可以用 window.addEvent('onhandledrejection')  进行捕获

3.错误信息不够详细，它会返回一个回退UI，并不会提供太多的错误信息



## 7.遇到白屏问题如何分析和解决



检测白屏：

1. 检测页面关键DOM的是否渲染

2. 通用的DOM渲染监听

3. H5截图（canvas绘图）检测

4. native截图（容器截屏）检测

5. 利用performance.getEntries("paint")获取fp/fcp来感知渲染

原因分析：

1. 网络状态
2. 脚本报错
3. js，css和浏览器或者webview兼容性问题

解决方案：

1. 骨架屏
2. 启用服务端渲染SSR
3. 首屏静态html
4. 离线包或者PWA





为了解决单页应用的白屏问题，可以采用以下优化方法：

- **代码分割**：将 JavaScript 和 CSS 分为多个较小的文件，按需加载，减少初始加载时间
- **懒加载和预加载**：对于非关键的资源，可以采用懒加载或预加载策略，确保需要的资源先加载。
- **优化请求**：通过合并请求或使用CDN加速文件传输，减少网络延迟。
- **使用骨架屏或加载指示**：在内容加载之前显示骨架屏或加载动画，以改善用户体验。
- **监测和分析**：使用工具监测应用的性能，通过分析用户反馈不断优化加载时间





衍生：如何减少白屏时间、怎么提高项目的首屏加载速度、单页面应用为什么会有白屏



### 如何减少白屏时间



### 怎么提高项目的首屏加载速度

预渲染技术、骨架屏技术



### 单页面应用为什么会有白屏

单页应用（SPA）中的白屏现象通常指的是在用户访问应用时，页面长时间显示空白而没有任何内容，这种现象会严重影响用户体验。白屏问题的原因一半包括以下几点：

1. 初始加载时间长
   - **资源未能及时加载**：单页应用通常多个资源，如 JavaScript、CSS 和其他静态文件。如果这些资源的加载时间过长，用户在应用初始化时可能会看到白屏
   - **大文件体积**：如果加载的 JavaScript 文件体积庞大，尤其是包含了大量业务逻辑，那么在下载、解析和执行过程中可能会出现明显的延迟
2. JavaScript 执行时间长
   - **主线程占用过长**：单页应用的首次加载通常需要执行大量的 JavaScript 代码。如果没有优化，执行时间过长，则会阻塞页面渲染，导致用户看到白屏现象
   - **资源请求阻塞**：当JavaScript代码在执行过程中发起额外的网络请求，如果这些请求未能及时完成，会导致页面渲染延迟
3. 依赖问题
   - **异步数据请求失败**：单页应用通常依赖于异步请求来获取数据。如果请求失败或者返回的数据不符合预期，应用可能无法渲染任何内容，从而导致白屏。
   - **库或框架加载问题**：如果使用的框架或库加载失败，例如Vue、React等的组件未能初始化成功，也会出现白屏。



## 8.虚拟列表

## 网站首页有大量的图片，加载很慢，如何优化呢？（图片懒加载）

考察点：大量图片优化
图片懒加载，显示的图片显示出来，还没出现的图片先用小图标展示
图片放在 oss 上

最开始用placeholder图或者loading图来代替，真正的图片放在data-img属性上，等到图片需要展示的时候再替换img.src

监听所有scroll，为了性能，200ms 拉动一次

循环所有的图片，判断他们的偏移高度与视窗高度+滚动高度之和，如果小于，则说明图片已经显示在视图中，那么就展示

通过 getBoundingClientRect，也是循环所有图片，但是是通过拿到该元素的getBoundingClientRect 来判断是否出现再视图中

intersectionObserver 交叉观察器，异步



## 9.Taro 的工作原理

Taro 在编译过程中，会将 React 代码解析成 AST 语法树





## 10.算法题：全排列

考察点：全排列

