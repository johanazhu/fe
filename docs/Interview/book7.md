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



## 7.如何减少白屏时间

考察点：白屏

衍生：怎么提高项目的首屏加载速度



## 8.网站首页有大量的图片，加载很慢，如何优化呢？（图片懒加载）

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

