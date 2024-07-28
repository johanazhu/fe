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



## 5.React 中的多次渲染如何优化





## 6. useEffect、useLayoutEffect 使用场景

1. 执行时机：useEffect 在浏览器绘制后执行，而 useLayoutEffect 是在浏览器绘制前执行。这意味着 useLayoutEffect 可以同步的更新 DOM 并立即看到效果
2. 适用场景：useEffect 适用于大多数情况下的副作用操作，如网络请求、数据订阅等。而 useLayoutEffect 适用于需要同步修改 DOM 布局或样式的场景，如动画、测量元素尺寸等
3. 性能影响：useEffect 因为是异步执行，不会阻塞浏览器渲染，对性能影响较小；而 useLayoutEffect 如果执行复杂的操作，可能会阻塞浏览器绘制，对性能有一定影响



useEffect 被设计成在 dom 操作前异步调用，useLayoutEffect 是在 dom 操作后同步调用

为什么这样设计？

因为都要操作 dom 了，这时候如果来个 effect 同步执行，计算量很大，会把 fiber 架构带来的优势毁掉

所以 effect 是异步的，不会阻塞渲染

而 useLayoutEffect，顾名思义是想在这个阶段拿到一些布局信息，dom 操作后可以，而且都渲染完成了，自然可以同步调用了

layout effect 的执行就是在 layout 阶段遍历所有 fiber，取出 updateQueue 的每个 effect 执行。



**useEffect 的 hook 在 render 阶段会把 effect 放到 fiber 的 updateQueue 中，这是一个 lastEffect.next 串联的环形链表，然后 commit 阶段会异步执行所有 fiber 节点的 updateQueue 中的 effect。**

**useLayoutEffect 和 useEffect 差不多，区别只是它是在 commit 阶段的 layout 阶段同步执行所有 fiber 节点的 updateQueue 中的 effect。** 



## 7.  WebApp：适配方案

1px怎么实现



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



