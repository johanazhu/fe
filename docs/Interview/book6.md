# 模拟题六



## 1. CSS 优先级是怎么计算的

考察点：CSS 优先级

!important > 内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

CSS 相关性能优化



## 2. 手写 apply、call、bind 

考察点：主动修改 this 的指向

相关文章：[call、apply、bind三大将](../JavaScript/call、apply、bind三大将)

### apply

```javascript
Function.prototype.myapply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol()
    context[fn] = this
    
    let result;
    if (!Array.isArray(args)) {
        result = context[fn]()
    } else {
        result = context[fn](...args)
    }
    
    delete context[fn]
    return result
}
```



### call

```javascript
Function.prototype.mycall = function (context = window, ...args) {
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol();
    context[fn]= this;
    const result = context[fn](...args)
    delete context[fn]
    return result
}
```



### bind

```javascript
Function.prototype.mybind = function (context, ...args1) {
    if (this === Function.prototype) {
        return new TypeError('Error')
    }
    const _this = this;
    return function F(...args2) {
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}
```

> 一个绑定函数也能使用 new 操作符创建对象，就像把原函数当做构造器。



### 衍生问题

Symbol、数据类型、instanceof、new



#### Symbol

唯一值，ES6新增



#### 数据类型

分为基本类型和引用类型

基本类型包含：undefined、null、string、number、boolean、symbol（ES6 新增）、bigint（ES10 新增）

引用类型：object

基本类型存在栈内存中，引用类型存在堆内存中

判断数据类型的方式有四种： typeof、instanceof、constructor、Object.prototype.toString.call()



#### 手写 instanceof

```javascript
function myInstanceof (left, right) {
    if (typeof left !== 'object' || typeof left === null) return false;
    
   	let proto = Object.getPrototypeOf(left);
    while(true) {
        if (proto === null) return false
        
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
```



#### 手写 new

```javascript
function new2(Constructor, ...args) {
    if(typeof Fn != 'function'){
        throw new TypeError(Fn + 'is not a constructor')
    }
    let obj = Object.create(null);
    obj.__proto__ = Constructor.prototype;
    const result = Constructor.apply(obj, args)
    return typeof result === 'object' ? result : obj
}
```



## 3. 谈谈变量提升

考察点：变量提升

变量是会提升的。var 申明的变量会提升至顶部，然后赋值时在执行

函数提升的权重大于变量提升



## 4. let 和 const

类似问题：let、var、const的区别

var 会有变量提升

let、const 则不会



## 5.React 中的多次渲染如何优化

使用 React.memo + React.useCallback 和 React.useMemo 来做优化



## 6. useLayoutEffect 和 useEffect 的区别

useLayoutEffect 和 useEffect 的区别在于执行时机：

- useEffect 是在浏览器页面渲染后**异步**执行、，它不会阻塞浏览器的渲染过程
  - commit 阶段的 before mutation 阶段调用
  - 但是会在 layout 完成后才异步执行
- useLayoutEffect 是在浏览器完成 DOM 更新后但浏览器进行下一次绘制之前同步执行，它会阻塞浏览器的渲染过程
  - commit 阶段 的 layout 阶段同步执行
  - 等价于类组件中的 componentDidMount

衍生问题：React 的执行时机

### React 的执行时机

React 分为 render 和 commit 阶段

render 阶段找虚拟 DOM 中变化的部分，并打上增删改的标记（effectTag），将这些节点收集到一个队列中（effectList）

在 commit 阶段遍历 effectList，根据 effectTag 来增删改 DOM，commit 阶段分为 3 个小阶段

before mutation

- 异步调用 useEffect 的回调函数
- 异步调用，等 layout 阶段执行完后再执行异步的回调函数

mutation

- 遍历 effectList 更新  DOM

layout

- 同步调用 useLayout 的回调函数
- 能拿到新的 dom
- 还会更新 ref



## 7. 什么是单点登录（SSO ）？如何实现

单点登录（SSO，Single Sign-On）是一种身份验证解决方案

SSO 的定义是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统

SSO 一般都需要一个独立的认证中心（passport），子系统的登录均得通过 passport，子系统本身将不参与登录操作

这种方式简化了用户身份验证过程，提高了用户体验，减少了用户需要记住和输入多个用户名和密码的麻烦。



衍生题：与 OAuth2.0 有什么关系

OAuth2.0：联合登录，一处登录，多处使用

SSO 单点登录，一处登录，多处同时登录



## 8. 浏览器：Cookie、localStorage、sessionStorage、IndexedDB的区别





## 9. webpack 怎么配置多页面？

对应的 webpack config：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: "./src/app.js",
        admin: "./src/admin.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            chunks: ['admin']
        })
    ]
}
```

但是，这样配置会有一个「重复打包」的问题：假设 app.js 和 adminjs 都引入了 vue.js，那么 vue.js的代码既会打包进 app.js，也会打包进 admin.js。我们需要使用 `optimization.splitchunks` 将共同依赖单独打包成 common.js（HtmlWebpackPlugin 会自动引入 commonjs）。

如何支持无限多页面呢？

写遍历文件就实现了

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const path = require('path')

const filenames = fs.readdirSync('./src/pages')
	.filter(file => file.endsWith('.js'))
	.map(file => path.basename(file, '.js'))

const entries = filesnames.reduce((result, name) => (
{...result, [name]: `./src/pages/${name}.js`}
), {})

const plugins = filenames.map((name) => 
    new HtmlWebpackPlugin({
    	filename: name + '.html',
    	chunks: [name]
	})                     
)

module.exports = {
    entry: {
       ...entries
    },
    plugins: [
       ...plugins
    ]
}
```



## 10.算法题：有效的括号

```javascript
function isValid(s) {
    const n = s.length;
    
    if (n % 2 === 1) {
        return false
    }
    
    const pairs = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ])
    
    const stk = [];
    for (let ch of s) {
        if (pairs.has(ch)) {
            if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
                return false
            }
            stk.pop()
        } else {
            stk.push(ch)
        }
    }
    return !stk.length
}
```

