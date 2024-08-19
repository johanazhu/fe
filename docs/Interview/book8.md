# 模拟题八

## 1.行内元素、块级元素有哪些，区别是什么

考察点：行内元素、块级元素

行内元素：a、b、br、code、i、label、q、small、span、strong、sub、sup、textarea、tt

块级元素：div、h1-h6、dl、dd、dt、ul、o、li、form、p、pre、table、tbody、td、tfood、th、thead、tr



## 2. 实现发布订阅 

考察点：手写订阅发布

发布订阅模式无需知道对方，通过监听数据

```javascript
class EventEmitter {
    constructor() {
        this.event = {};
    }

    on(type, callback) {
        if (!this.event[type]) {
            this.event[type] = [callback];
        } else {
            this.event[type].push(callback);
        }
    }

    off(type, callback) {
        if (!this.event[type]) {
            return;
        }
        this.event[type] = this.event[type].filter((item) => {
            return item != callback;
        });
    }

    emit(type, ...args) {
        if (!this.event[type]) {
            return;
        }
        this.event[type].forEach((callback) => {
            callback.apply(this, args);
        });
    }

    once(type, callback) {
        function f() {
            callback();
            this.off(type, f);
        }
        this.on(type, f);
    }
}
```

使用示例：

```javascript
const eventEmitter = new EventEmitter();

// 订阅事件
eventEmitter.on("公众号", (name) => {
    console.log(`我订阅了${name}`)
})

// 发布事件
eventEmitter.emit('公众号'， '随朱波流')
```



衍生问题：你还知道哪些设计模式、Redux

### 你还知道哪些设计模式

单例模式：保证一个类只有一个实例，并提供一个全局访问点。

redux，vuex 等唯一状态数据库，JQuery 只有一个$

- 实现唯一性
- 减少内存空间

工厂模式：定义一个创建对象的类

观察者模式：就是发布订阅的代表

装饰器模式：不改变原对象的基础上，通过对其进行包装扩展，使原有对象满足用户的复杂需求

适配器模式：通过将一个类的接口换成客户端所期待的接口，可以帮我们剞劂不兼容问题



### Redux

Redux 是状态管理库，它由数据驱动，发起 action，会引发 reducer 的数据更新，从而更新到最新的  store

Redux 用到了很多设计模式，例如发布订阅模式，单例模式，装饰器模式

发布订阅模式

- 先订阅，

单例模式

- 全局只有一个 store，Redux 像一个状态机，你传入 state 和 action，返回新的 state

装饰器模式

- 它的enhancer、中间件都是装饰器模式，就在 Redux 基础上再包了一层



## 3.垃圾回收机制

考察点：v8 垃圾回收

详见原理：[垃圾回收机制](https://fe.azhubaby.com/JavaScript/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%9C%BA%E5%88%B6.html)

V8 进程的内存由以下部分组成：

- 新生代内存区
- 老生代内存区
- 其他（大对象区、代码区、map 区）

新生代存在生存时间短的对象，老生代存放生存时间久的对象

新生代通常只支持1-8M的容量，而老生代区会支持更大的容量，而针对这两块区域，V8 分别使用两个不同的垃圾回收器

- 主垃圾回收器，负责老生代的垃圾回收
- 副垃圾回收器，负责新生代的垃圾回收

新生代内存回收：Scavenge 算法

- 将空间分成两半，一半是 from 空间，一半是 to 空间，新加入的对象会放在 from 空间，当空间快满时，执行垃圾清理；再角色调换，当调换完后的 from 空间快满时，再执行垃圾清理，如此反复

老生代内存回收：标记-清除-整理（Mark - Sweep），此为两个算法，「标记-清理」算法和 「标记-整理」算法

- 标记-清理：标记用不到的变量，清理掉
- 标记-整理：整理完内存后，会产生不连续的内容空间，为节省空间，整理算法会将内容排序到一处空间，空间就变大了

引用计数：引擎中有张“引用表”，保存了内存里面的资源的引用次数，如果一个值的引用次数是0，就表示这个只不再用到，因此可以将这块内存释放

- 缺点：循环引用，从而导致内容泄露



## 4.ES6特性：扩展运算符和剩余运算符

考察点：扩展运算符（...）

以不同的语法形式出现在 函数调用中，数组字面量中以及对象字面量中





## 5.react中一个父组件，两个子组件，一个传props，一个不传props，父组件重新渲染，两个子组件会不会都重新渲染



## 6.React17、18、19 更新以及什么是服务端组件

React17、18、19 更新以及服务端组件

### React17

#### 全新的 JSX 转换

React 17之前必须引入 `import React from 'react';` ，打包工具才能正常编译

React 17 之后，React 引入了 `react/jsx-runtime`，编译工具会自动识别 React 组件并将代码编译为 React.createElement

#### 事件委托的变更

React v17 中，React 不会再将事件处理添加到 `document` 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中

```jsx
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

![image-20240513105744250](https://pub-15dc9987604d4311befe731fecc8adb9.r2.dev/1a3310a5a82e1ae46fe8d3464567234c.png)

在 React 16 和更早的版本中，React 将对大多数事件执行document.addEventListener（）。

React 17 将在后调用rootNode.addEventListener（）

### React 18 更新

#### 并发模式

v18的新特性是使用现代浏览器的特性构建的，彻底放弃对 IE 的支持。

v17 和 v18 的区别就是：从同步不可中断更新变成了异步可中断更新，v17可以通过一些试验性的API开启并发模式，而v18则全面开启并发模式

> V16就提出了Fiber架构，React 并发（concurrent）模式还在构建中（处于实验阶段），到V18才正式投入

#### 更新 render API

v18 使用 ReactDOM.createRoot() 创建一个新的根元素进行渲染，使用该 API，会自动启用并发模式。

```tsx
// v17
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))

// v18
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
```



#### 自动批处理

批处理是指 React 将多个状态更新，聚合到一次 render 中执行，以提升性能

在v17的批处理只会在事件处理函数中实现，而在Promise链、异步代码、原生事件处理函数中失效。而v18则所有的更新都会自动进行批处理。

```tsx
// v17
const handleBatching = () => {
  // re-render 一次，这就是批处理的作用
  setCount((c) => c + 1)
  setFlag((f) => !f)
}

// re-render两次
setTimeout(() => {
   setCount((c) => c + 1)
   setFlag((f) => !f)
}, 0)


// v18
const handleBatching = () => {
  // re-render 一次
  setCount((c) => c + 1)
  setFlag((f) => !f)
}
// 自动批处理：re-render 一次
setTimeout(() => {
   setCount((c) => c + 1)
   setFlag((f) => !f)
}, 0)
```

如果在某些场景不想使用批处理，可以使用 `flushSync`退出批处理，强制同步执行更新。

```tsx
// flushSync 会以函数为作用域，函数内部的多个 setState 仍然是批量更新

const handleAutoBatching = () => {
  // 退出批处理
  flushSync(() => {
    setCount((c) => c + 1)
  })
  flushSync(() => {
    setFlag((f) => !f)
  })
}
```



#### Suspense 支持 SSR

SSR 一次页面渲染的流程：

1. 服务器获取页面所需数据
2. 将组件渲染成 HTML 形式作为响应返回
3. 客户端加载资源
4. （hydrate）执行 JS，并生成页面最终内容



#### 新功能（新API）：过渡（startTransition）

#### 新增 useId、useTransition 和 useDeferredValue

- useTransition
- useDeferredValue

#### 放弃 IE

#### 服务端组件



## 7. Interface 和 Type 的区别

区别1：interface 只能描述对象，type 则描述所有数据类型

区别2：type 只是别名，interface 则是类型声明

区别3：type 不可重新赋值，interface 自动合并

所以一般对外 API 尽量用 interface，方便扩展；对内 API 尽量用 type，防止代码分散

衍生题：什么是联合类型 和 类型收窄

### 联合类型和类型收窄

联合类型表示取值可以为多种类型中的一种

类型收窄是指在代码执行过程中通过一些检查将联合类型狭窄到一个特点类型





## 8.项目构建工具有考虑换vite吗？vite有什么优势？

或者问 webpack 与 vite 的区别是什么？

1.开发环境区别

- vite 自己实现 server，不对代码打包，充分利用浏览器的`<script type="module">` 的支持
  - 假设 main.js 引入了 vue
  - 该 server 会把 `import { createApp } from 'vue'` 改成 `import {createApp} from "/node_modules/.vite/vue.js"` 这样浏览器就知道去哪里做到 vue.js
- webpack-dev-server 常使用 babel-loader 基于内存打包，比 vite 慢很多很多
  - 该 server 会把 vue.js 的代码（递归地）打包进 main.js

2.生产环境区别

- vite 使用 rollup + esbuild 来打包 JS 代码
- webpack 使用 babel 来打包 JS 代码，比 esbuild 慢很多很多
  - webpack 能使用 esbuild 吗？可以，你需要配置（很麻烦）
  - esbuild 为什么快
    - babel 用 js 写，esbuild 用 go 写的
    - webpack 和 rollup 一个层级
    - babel 和 esbuild 一个层级的
    - vite 相当于比 webpack 再封装了一层

3.文件处理时机

- vite 只会在你请求某个文件的时候处理该文件
- webpack 会提前打包好 main.js，等你请求的时候直接输出打包好的 JS 给你

目前已知 vite 的缺点有

1. 热更新常常失败，原因不清楚
2. 有些功能 rollup 不支持，需要自己写 rollup 插件
3. 不支持非现代浏览器



衍生问题：swc、esbuild 是什么？

### swc、esbuild 是什么？

swc、esbuild 对标 babel

#### swc

实现语言：Rust

功能：编译 JS/TS、打包 JS/TS

优势：比 babel 快很多（20倍以上）

能否集成进 webpack：能

使用者：NextJS、Parcel、Deno、Vercel、ByteDance、Tencent、Shopify...

做不到：

- 对 TS 代码进行类型检查（用 tsc 可以）
- 打包CSS、SVG

#### esbuild

实现语言：Go

功能：同上

优势：比 babel 快很多（10-100倍以上）

能否集成进 webpack：能

使用者：vite、vuepress、snowpack、umijs

做不到：

- 对 TS 代码进行类型检查
- 打包CSS、SVG

为什么 rust 性能比 go 好，但是 esbuild 的打包速度会比 swc 快，因为 esbuild 的开发者是个 ceo，代码能力比 swc 的开源者强





## 9. 浏览器：跨域

考察点：跨域

具体可看[跨域的十种解决方案](/Browser/跨域)

### 同源策略

一个安全策略

同源：同一协议（protocol）、域名（domain）、端口（port）

### 跨域解决方案

#### JSONP

- 最古老的彼岸者，利用 `script` 标签没有跨域限制这个特点
- 仅支持 GET 方法
- 步骤
  - 定义jsonp回调函数方法jsonpCallback 
  - script 请求接口（后端）时带上cb=jsonpCallback 参数，如 `/api?callback=jsonpCallback `
  - 后端 response 返回 jsonpCallback ({a: 'b'})，前端执行 `jsonpCallback` ，就拿到注入的数据

#### CORS（跨域资源共享）

在服务端/后端的相应头中添加`Access-Control-Allow-*` 头，告知浏览器端通过此请求只需要服务器端/后端支持即可，不涉及前端改动

#### window.postMessage

postMessage是HTML5引入的一种跨文档通信的机制。a 页面通过`iframe.contentWindow.postMessage({msg: 'hello'}, 'b.html(目标页面)')` 发送消息，b 页面通过 `window.addEventListener('message', function(e){})` 接受信息，通讯就完成了

#### WebSocket

双向数据通信，不是 http 协议，所以不受跨域限制，服务端直接传数据给前端

#### Nginx 代理

Nginx.conf 设置反向代理

#### Node 代理

本地开发时，即用 webpack 或者 vite 构建工具时，配置方向代理

#### document.domain + iframe

#### document.location.hash + iframe

#### window.name + iframe

#### 修改浏览器安全配置



## 10.算法题：最大子序和
