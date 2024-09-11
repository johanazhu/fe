# 模拟题九



## 1.CSS 样式隔离手段

考察点：CSS 样式隔离手段

BEM

- BEM 命名法，不用的项目加上前缀，通过命名规则避免冲突

[CSS Modules](https://github.com/css-modules/css-modules)

- 通过编译生成不冲突的选择器类名
- `import styles from "./styles.css"; <h1 class="${styles.title}"></h1>`

CSS in JS

- CSS 写进 JS 中
- [styled-components](https://link.juejin.cn/?target=https%3A%2F%2Fstyled-components.com%2F) 

预处理器

- 同 BEM，人为规范，第三方库不受影响

Shadow DOM（影子DOM）

- CSS 沙箱，原声支持

Scroped 

- scroped css
- 对所有样式加了一层 data-xxx=“应用名” 的选择器来隔离



衍生问题：qiankun 微前端的CSS隔离

### qiankun 微前端的CSS隔离

qiankun 主要用 shadow DOM 和 scoped css 实现样式隔离

- shadow dom 自带样式隔离，但是 shadow dom 内的样式和外界不影响，导致挂在弹窗的样式会加不上。父应用也没法设置子应用的样式
- scoped 的方案是给选择器加上一个 data-qiankun ='应用名' 的选择器，这样父应用能设置子应用样式，也能隔离样式，但是同样有挂在 body 的弹窗样式设置不上的问题，因为 qiankun 的 scoped 不支持全局样式

## 2. 手写 柯里化

考察点：柯里化

```javascript
function curry(fn) 
```

衍生：实现 add(1)(2)(3)

### 实现 add(1)(2)(3)

```

```



## 3.JavaScript 基础：数据类型有哪些

基本类型和引用类型

基本类型：string、number、boolean、undefined、null、symbol、bigint

应用类型：object

衍生问题：基本类型和引用类型的区别、判断数据类型的方法



### 基本类型和引用类型的区别

基本类型存在栈内存中

引用类型存在堆内存中

### 判断数据类型的方法

- typeof
- instanceof
- constructor
- Object.prototype.toString.call()

| 名称                        | 能检测                                                       | 不能检测                                       |
| :-------------------------- | :----------------------------------------------------------- | :--------------------------------------------- |
| typeof                      | string、number、boolean、undefined 以及 function             | null 以及除 function 外的对象，结果都为 object |
| instanceof                  | 能判断引用数据类型                                           | 不能判断基础数据类型                           |
| constructor                 | string、number、boolean、array、object、function 以及 构造函数 | undefined、null。不安全，因为指向可以改变      |
| Object.prototype.toString() | 内置（原生）构造函数                                         | 自定义构造函数                                 |

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



## 6.React：如何实现 react 的 keep-alive



## 7.前端安全：XSS攻击是什么

考察点： 前端安全

XSS 攻击，即跨站脚本攻击（Cross-Site Scripting），是一种网络安全漏洞

前端最熟悉的攻击方式

攻击方式：在页面展示内容中掺杂 JS 代码，以获得页面信息

- url参数注入
- 输入框注入
  - 例如，在评论区插入恶意 JS 代码，当其他用户查看这些评论时，代码就会在他们的浏览器中执行

预防措施

- 对输入进行格式校验
- 过滤 `<script>, <iframe>` 等特殊标签，过滤 onclick，onerror，onfocus 等 js 事件属性
- 对要渲染的内容做编码转译
- 限制输入长度，cookie 设置成 http only

攻击危害：窃取 cookie、劫持流量、插入广告、植入木马、获取用户信息





衍生问题：crsf 是什么

### crsf 是什么

Crsf 攻击，即跨站请求伪造（Cross-Site request forgery），攻击者利用用户身份，在用户不知情的情况下，诱导浏览器向受信任的网站发送未授权的请求

防御措施

为了防止CSRF攻击，开发者可以采取以下措施：

- **使用CSRF Token**：在表单提交时生成一个唯一的token，并在服务端进行验证，确保请求的合法性。
- **设置HTTP Referer检查**：验证请求的来源，确保请求是来自信任的域名。
- **使用双重确认操作**：在进行关键操作时要求用户进行额外的确认，以确保是用户的真实意图。



### xss 和 crsf 的区别

XSS 侧重于脚本，千方百计的注入并执行恶意脚本

CSRF 不注入恶意脚本，侧重于请求伪造，在用户不知情的情况下，借用户的名义干坏事



## 8.tree shaking 是什么

考察点：tree shaking

Tree shaking字面意就是“摇树”，将没有使用到的代码全部抖落下来，删除没有使用的代码，从而减少代码体积

如何开启

- 配置 `optimization.usedExports` 为 `true`，启动标记功能

### 原理是什么

依赖 ES6 的模块特性，ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析

简单来说，根据 ES Modules 的静态分析

在ES Module中，我们可以将模块的加载分为两个阶段：**静态分析**和**编译执行**；



## 9.webpack 工作原理是什么，工作流程是怎么样的





## 10.算法题：爬楼梯
