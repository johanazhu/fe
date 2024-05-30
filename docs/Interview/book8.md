# 模拟题八

## 1.行内元素、块级元素有哪些，区别是什么

考察点：行内元素、块级元素



## 2. 实现一个发布订阅 

考察点：常用设计模式

观察者模式需要知道被观察者

发布订阅模式无需知道对方，通过监听数据

```javascript
class EventPubSub {
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
        this.on(tyoe, f);
    }
}
```



## 3.垃圾回收机制

考察点：v8 垃圾回收

https://febook.hzfe.org/awesome-interview/book2/browser-garbage



标记清除

引用计数



## 4.ES6特性：扩展运算符和剩余运算符

考察点：扩展运算符（...）

以不同的语法形式出现在 函数调用中，数组字面量中以及对象字面量中





## 5.react中一个父组件，两个子组件，一个传props，一个不传props，父组件重新渲染，两个子组件会不会都重新渲染



## 6.React17、18、19 更新以及什么是服务端组件

React17、18、19 更新以及服务端组件

### 新的JSX转换

#### React 16 原理

babel-loader 会预编译 JSX 为 React.createElement(...)

#### React 17 原理

React 17 中的 JSX 转换不会将 JSX 转换为 React.createElement

而是自动从 React 的 package 中引入新的入口函数并调用

另外此次升级不会改变 JSX 语法，旧的 JSX 转换也讲继续工作

### 事件代理（委托）更改

在 React 17 时，React 将不再再后台的稳当级别附加事件处理程序。它将附加到渲染的 React 数的根 DOM 容器

```jsx
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

![image-20240513105744250](D:\Documents\PicGo Files\image-20240513105744250.png)

在**React** 16和更早的版本中，**React**将对大多数事件执行document.addEventListener（）。

 **React** 17将在后调用rootNode.addEventListener（）

### 去掉事件池



### 全新的 JSX 转换器

总结下来就是两点：

- 用 `jsx()` 函数替换 `React.createElement()`
- 运行时自动引入 `jsx()` 函数，无需手写引入`react`

在v16中，我们写一个React组件，总要引入 react





### React 18 更新

#### 并发模式

v18的新特性是使用现代浏览器的特性构建的，彻底放弃对 IE 的支持。

v17 和 v18 的区别就是：从同步不可中断更新变成了异步可中断更新，v17可以通过一些试验性的API开启并发模式，而v18则全面开启并发模式

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



#### useTransition 和 useDeferredValue

- useTransition
- useDeferredValue



## 7. interface 和 type 的区别



## 8.项目构建工具有考虑换vite吗？vite有什么优势？









## 9.3 次握手过程

第一次握手客户端向服务端发送一个报文，第二次是服务端收到报文后，会应答一个报文给客户端。第三次是客户端收到报文后再给服务端发送一个报文，三次握手久成功了

考察点：tcp



## 10.算法题：最大子序和
