# 模拟题七



## 1.双飞翼/圣杯布局

考察点：双飞翼/圣杯布局

双飞翼布局：浮动+margin-left+中间部分再包裹一层

圣杯布局：浮动+margin-left+自身相对定位





## 2. 手写 ajax

```javascript
var xhr = new XMLHttpRequest();

xhr.open('GET', '/xxx', true)
// false 异步
// true 同步

xhr.setRequestHeader("Content-Type", "application/json")

xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200 || xhr.status === 304) {
       	console.log('响应数据:', xhr.responseText);
    } else {
        console.error('请求失败，状态码：' + xhr.status);
    }
}

 xhr.send();
```

衍生问题：如何取消请求

### 如何取消请求

```javascript
xhr.abort();
```

- 只能取消当前正在进行的请求。如果请求已经完成或已被取消，则 `abort()` 方法不会产生任何效果。
- 调用 `abort()` 方法后，将触发 `error` 回调函数。



## 3.什么是立即执行函数

IIFE，立即执行函数，声明一个匿名函数，并马上调用这个匿名函数。只有一个作用，创建一个独立的作用域

衍生问题：模块化

模块化的发展历程

IIFE ——> CommonJS ——> AMD ——> ES Modules 

## 4.Map 和 Set

Map 是字典，Set 是集合

Map 是一组键值对的结构，具有极快的查找速度。数据结构是 hash-table（哈希表）

Map 是一个带键的数据项的集合，就像一个 Object 一样，但是它们最大的差别是 Map 允许任何类型的键（key）

Set 作为最简单的集合，有着如下几个特点：

-   Set 可以存储任何类型的值，遍历顺序与 插入顺序相同
-   **Set 内无重复的值**
    -   可以做去重
    -   去重后要把 Set 转换为数组


### WeakMap

与 Map 类似，但又有点击区别：

- WeakMap 只接受对象作为 key（null除外），如果设置其他类型的数据作为 key，会报错。`Map` 的键可以是任意类型
- WeakMap 是弱引用，key 所指向的对象可以被垃圾回收；Map 的 key 实际上和内存地址绑定
- WeakMap 不能被遍历，Map 可以被遍历



衍生问题：map 和 对象的区别

### map 和 对象的区别

对象的键只能是字符串

map的键可以是任意类型

```javascript
var map = new Map();
map.set(1, 2);
map.set({ name: 'johan' }, true);
```



## 5.修改深层对象有什么解决方案

例如如下数据结构，如何修改数据，让其不要过多渲染

> 这涉及到state 的数据不可变，因为object 是引用类型，修改值会影响到之前的值

```javascript
state = {
 	user: {
        objA: {
          name: 'A',
          age: 20
        }
    }
}

```

有四种解决方案：

一：使用展开运算符（Spread Operator）

```
this.setState(prevState => ({
  user: {
    ...prevState.user,
    objA: {
      ...prevState.user.objA,
      name: '新名字',
      age: 25
    }
  }
}));
```

二：Object.assign()

```javascript
this.setState(prevState => 
  Object.assign({}, prevState, {
    user: Object.assign({}, prevState.user, {
      objA: Object.assign({}, prevState.user.objA, {
        name: '新名字',
        age: 25
      })
    })
  })
);
```

三：使用深克隆

```javascript
import _ from 'lodash';

const updatedUser = _.cloneDeep(this.state.user);
updatedUser.objA.name = '新名字';
updatedUser.objA.age = 25;

this.setState({ user: updatedUser });
```

四：使用不可变数据结构（如immer.js）

```javascript
import produce from 'immer';

this.setState(prevState => 
  produce(prevState, draft => {
    draft.user.objA.name = '新名字';
    draft.user.objA.age = 25;
  })
);
```

其实就是让赋值的对象和之前的对象的值不同，如果数据结构简单，可以用浅拷贝（扩展运算符或者Object.assign），数据结构复杂，则用深拷贝来做。但推荐的方案是用不可变数据结构，如 immer.js 库来做，保持值的唯一性

## 6. useEffect 第二个参数是对象如何处理

保持依赖项为数组

```jsx
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    // 处理副作用
    console.log("状态改变了", state);
}, [state.a, state.b]);  // 依赖项数组应包含对象的具体属性
```

使用 JSON.stringify

```jsx
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    // 处理副作用
    console.log("状态改变了", state);
}, [JSON.stringify(state)]);  // 使用 JSON.stringify 作为依赖项
```

使用不可变数据结构（如immer.js）使用自定义钩子

写个类似 useSetState 这样的 hooks，判断复杂对象的变化

使用不可变数据结构（如immer.js）

```jsx
import produce from 'immer';
const [state, setState] = useState({ a: 1, b: 2 });

useEffect(() => {
    console.log("状态改变了", state);
}, [produce(state)]); 
```



## 7.首页白屏如何优化

相关问题：前端性能优化指标、前端性能优化手段、白屏、大量图片加载优化

### 前端性能监控指标

Navigation Timing API：

- responseStart - fetchStart：收到首字节的耗时
- domContentLoadedEventEnd - fetchStart：HTML 加载完成耗时
- loadEventStart - fetchStart：页面完全加载耗时
- domainLookupEnd - domainLookupStart：DNS 解析耗时
- connectEnd - connectStart：TCP 连接耗时
- responseStart - requestStart：Time to First Byte（TTFB）
- responseEnd - responseStart：数据传输耗时
- domInteractive - responseEnd：DOM 解析耗时
- loadEventStart - domContentLoadedEventEnd：资源加载耗时（页面中同步加载的资源)

Lighthouse Performance：

- FP（First Paint）：首次绘制
- FCP（First Contentful Paint）：首次内容绘制
- FMP（First Meaningful Paint）：首次有效绘制
- LCP（Largest Contentful Paint）：最大可见元素绘制
- TTI（Time to Interactive）：可交互时间
- TTFB（Time to First Byte）：浏览器接收第一个字节的时间

除了上面之外，UC 内核也有一套性能监控指标：

- T0：Blink 收到 HTTP Head 的时间。
- T1：首屏有内容显示的时间。
- T2：首屏全部显示出来的时间。



### 什么是首屏时间

`首屏时间`：也称**用户完全可交互时间**，即整个页面首屏完全渲染出来，用户完全可以交互，一般首屏时间小于页面完全加载时间，该指标值可以衡量页面访问速度



#### 1、首屏时间 VS 白屏时间

这两个完全不同的概念，**白屏时间是小于首屏时间的**
`白屏时间`：首次渲染时间，指页面出现第一个文字或图像所花费的时间

#### 2、为什么 performance 直接拿不到首屏时间

随着 Vue 和 React 等前端框架盛行，`Performance` 已无法准确的监控到页面的首屏时间

因为 `DOMContentLoaded` 的值只能表示**空白页**（当前页面 body 标签里面没有内容）加载花费的时间

浏览器需要先加载 JS , 然后再通过 JS 来渲染页面内容，这个时候**单页面类型**首屏才算渲染完成



### 三、常见计算方式

- 用户自定义打点—最准确的方式（只有用户自己最清楚，什么样的时间才算是首屏加载完成）
  - 缺点：侵入业务，成本高
- 粗略的计算首屏时间: `loadEventEnd - fetchStart/startTime` 或者 `domInteractive - fetchStart/startTime`
- 通过计算首屏区域内的所有图片加载时间，然后取其最大值
- 利用 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 接口，监听 document 对象的节点变化





## 8.网站首页有大量的图片，加载很慢，如何优化呢？

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

