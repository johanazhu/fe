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



## 3.什么是立即执行函数

考察点：立即执行函数

IIFE，立即执行函数，声明一个匿名函数，并马上调用这个匿名函数。只有一个作用，创建一个独立的作用域

衍生题：模块化

## 4.Map 和 Set

Map 是一组键值对的结构，具有极快的查找速度。数据结构是 hash-table（哈希表）

Map 是一个带键的数据项的集合，就像一个 Object 一样，但是它们最大的差别是 Map 允许任何类型的键（key）

Set 作为最简单的集合，有着如下几个特点：

-   Set 可以存储任何类型的值，遍历顺序与 插入顺序相同
-   **Set 内无重复的值**

### WeakMap

与 Map 类似，但又有点击区别：

- WeakMap 只接受对象作为 key（null除外），如果设置其他类型的数据作为 key，会报错。`Map` 的键可以是任意类型
- WeakMap 是弱引用，key 所指向的对象可以被垃圾回收；Map 的 key 实际上和内存地址绑定
- WeakMap 不能被遍历，Map 可以被遍历



衍生题：map 和 对象的区别

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

解决方案一：使用展开运算符（Spread Operator）

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

解决方案二：Object.assign()

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

解决方案三：使用深克隆

```javascript
import _ from 'lodash';

const updatedUser = _.cloneDeep(this.state.user);
updatedUser.objA.name = '新名字';
updatedUser.objA.age = 25;

this.setState({ user: updatedUser });
```

解决方案四：使用不可变数据结构（如immer.js）

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

相关问题：前端性能优化指标、前端性能优化手段、白屏、大量图片加载优化

### 前端性能指标

- 白屏时间 FP
- 首次内容绘制时间 FCP
- 最大内容绘制时间 LCP
- 累积布局偏移值  CLS
- 首字节时间 TTFB
- 首次输入延迟时间 FID
- 可交互时间 TTI
- 总阻塞时间 TBT



### 前端性能优化

#### 1.路由懒加载

单页面应用，一个路由对应一个页面 

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

#### 路由懒加载的原理

懒加载前提的实现：ES6 的动态加载模块——`import()`，它返回的是一个 promise

当 webpack 解析到 import 语法时，会自动进行代码分割



#### 2.合理的 Tree Shaking

作用：消除无用的 JS 代码，减少代码体积

##### Tree-Shaking 原理

依赖 ES6 的模块特性，ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析

简单来说，根据 ES Modules 的静态分析

#### 3.组件方面

##### 组件懒渲染

当组件进入或即将进入可视区域时才渲染组件。常见的组件 Modal/Drawer 等，当 visible 属性为 true 时才渲染组件内容，也可以认为是懒渲染的一种实现

##### React.memo 减少React子组件渲染

配合 React.useCallback 和 React.useMemo

#### 4.使用骨架屏或加载提示

在项目打包时将骨架屏的内容直接放在 HTML 文件的根节点上

#### 5.长列表虚拟滚动

只渲染可视区域的列表项，非可见区域的不渲染

##### 虚拟列表的原理

计算出列表总高度，并在触发滚动事件时根据 scrollTop 值不断更新 startIndex 以及 endIndex，以此从列表数据 listData 中截取对应元素

虚拟滚动的缺点：

频繁的计算导致会有短暂的白屏现象，可以通过节流来限制触发频率

加上为列表管理加一些“上、下缓冲区”，即在可视区域之外预渲染一些元素



#### 6.Web Worker 优化长任务

由于浏览器 GUI 渲染线程与 JS 引擎线程是互斥关系，所以当页面中有长任务时，会造成页面 UI 阻塞，出现界面卡顿、掉帧等情况



#### 7.JS 的六种加载方式

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

#### 8.图片的优化

##### 图片动态裁剪

##### 图片懒加载

图片懒加载实现原理

先通过 HTML 自定义属性 data-xxx 先暂存 src 的值，然后在图片出现在屏幕可视区域时，再将 data-xxx 的值赋值到 img 的scr 属性即可

##### 使用字体图标

##### 图片转 base64 格式

##### 图片资源压缩

tinypng 图片资源压缩

##### 图片资源放到 OSS 上

##### 图片格式转换

转成 webp、AVIF格式



#### 9.启用服务端渲染SSR

SSR 渲染，把客户端渲染改成服务端渲染，也利于SEO

#### 10.首屏静态html

既然要加快，那就做到极致，首屏是个静态页

#### 11.缓存

资源文件和接口加上HTTP缓存，加快请求速度

强缓存（Cache-Control）和协商缓存（Etag）

与强缓存的时候走强缓存，当强缓存失效后走协商缓存

将`Cache-Control:no-cache`、`Cache-Control:max-age=0`、`pragma: no-cache` 时，即告诉浏览器不走强缓存

当强缓存失效后，浏览器需要发送一个带有 `If` 开头的条件请求字段，专门用来验证资源是否过期，

请求时带上 `If-None-Match:上次一的Etag`，如果资源没有变化，则返回 304 状态，使用本地缓存

如果资源变化，则发情 HTTP 请求，并记录相应头中的 ETag，HTTP状态返回 200





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

