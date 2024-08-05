# 模拟题九



## 1.CSS 样式隔离手段

考察点：CSS 样式隔离手段



## 2. 手写 柯里化

考察点：柯里化

衍生：实现 add(1)(2)(3)



## 3.JavaScript 基础：数据类型有哪些



## 4. ES6至ES12的新特性

展开语法和解构语法



## 5.说说React Router有几种模式？实现原理？

共三种。

- HashRouter
- HistoryRouter
- MemoryRouter
  - 适用于测试以及非浏览器环境（如React Native）

React Router实现原理：

- 监听记录路由变化
  - 通过 `history` 库来屏蔽不同模式下载监听实现上的差异，并将路由信息以 `context` 的形式，传入给被`<Router>` 包裹的组件
- 匹配路由变化并渲染内容
  - 通过 `path-to-regexp` 来实现匹配和渲染，`<Route>` 作为高阶组件包裹业务组件，通过比较当前路由和传入的 path，以不同的优先级来渲染对应组件

其中被问的最多的是如何监听路由变化，在此之前要普及一个知识点，就是在单页面应用中，项目只有一个 HTML，其页面路由由前端实现，即我们需要监听路由并展示不同的页面模块，而要实现改变 url 且不刷新的方法有1.ajax；2.hash；3.history。其中 ajax 实现起来比较麻烦，所以在应用中使用最多的是 hash 和 history 方案

其两种方案对比

hash 模式

- 通过监听 hashchange 事件，匹配 hash 值并渲染页面模块

history 模式

- 利用 `history.pushState` + `popState` 实现
- `history.pushState` 能实现不刷新页面，但往历史栈中新增一个记录
- `popState` 则会在历史记录条目被更改时，触发
- `pushState` 只会改变历史栈，修改它没有什么API可以监听，所以要与 `popState`配合

衍生问题：手写订阅发布、使用 history 模式服务器需要做什么



### 手写订阅发布

```javascript
class eventEmitter {
    constructor() {
        this.event = {}
    }
    
    on(type, callback) {
        if (!this.event[type]) {
            this.event[type] = [callback]
        } else {
            this.event[type].push(callback)
        }
    }
    
    off(type, callback) {
        if (!this.event[type]) {
            return
        }
        this.event[type] = this.event[type].filter((item) => {
            return item !== callback
        })
    }
    
    emit(type, ...args) {
        if (!this.event[type]) {
            return
        }
        this.event[type].forEach((callback) => {
            callback.apply(this, args)
        })
    }
    
    once(type, callback) {
        function f() {
            callback()
            this.off(type, f)
        }
        this.on(type, f)
    }
}
```

示例：

```javascript
const eventEmitter = new EventEmitter();

// 订阅事件
eventEmitter.on("公众号", (name) => {
    console.log(`我订阅了${name}`)
})

// 发布事件
eventEmitter.emit('公众号'， '随朱波流')
```

### 使用 history 模式服务器需要做什么

nginx 需要配合，遇到任何 404 页面，都重定向首页，相当于把路由权限给前端做判断。必须依赖服务器让 url 都映射到 index.html 

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```



## 6.数据流：Redux 和 mobx 的区别



## 7.什么场景下会用策略模式

考察点： 常用设计模式







## 8.tree shaking 是什么

考察点：tree shaking

有什么作用，原理是什么



## 9.webpack 工作原理是什么，工作流程是怎么样的





## 10.算法题：爬楼梯
