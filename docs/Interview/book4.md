# 模拟题四

## 1. 左边宽度已知，右边自适应方案

具体可以看[左边固定，右边自适应](https://demo.azhubaby.com/左边固定，右边自适应.html)，代码也已经部署到 [github](https://github.com/johanazhu/demo) 上

一共六种方法：

- flex 布局
- grid 布局
- 双子元素+ absolute
  - 左元素 absolute
  - 右元素 absolute + left 200px + width: calc(100% - 200px)
- 左元素 absolute + 右元素 margin-left
  - 左元素 absolute
  - 右元素 margin-left: 200px + width: calc(100% - 200px)
- 无父元素 + 左元素浮动，右元素不动
  - 左元素 float:left
  - 右元素和之前一样设置高度即可，其他不用写
- 无父元素+左元素左浮动，右元素右浮动
  - 左元素 float:left
  - 右元素float:right + calc(100% - 200px)

 

## 2. 手写 New 操作符

new 操作符具体做了什么

> 1.在内存中创建一个新对象
>
> 2.这个新对象的[[prototype]] 指向被赋值为构造函数的 prototype 属性
>
> 3.构造函数内部的 this 被赋值为这个新对象
>
> 4.执行构造函数内部的代码
>
> 5.如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

手写代码

```javascript
function new2(Constructor, ...args) {
    let obj = Object.create(null);
    obj.__proto__ = Constructor.prototype;
   	const result = Constructor.apply(obj, args)
    return typeof result === 'object' ? result : obj
}
```

衍生问题：Object.create、apply

### 手写Object.create

```javascript
function create(proto){
    function F() {}
    F.prototype = proto
    return new F()
}
```

### 手写 apply

```javascript
function myApply(context === window, args) {
    if (this === Fcuntion.prototype) {
        return undefined
    }
    let fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
        result = context[fn](...args)
    } else {
        result = context[fn]()
    }
    delete context[fn];
    return result
}
```

相关文章：[new 做了什么](../JavaScript/new做了什么)



## 3. 继承

原型链继承、借用构造函数继承、组合继承、原型式继承（Object.create）、寄生式继承、寄生组合式继承



## 4. Class

Class 继承



## 5.setState 是同步的还是异步

考察点：批处理

类似问题：为什么有时 react 两次 setState，只执行了一次

React18之后都为异步

React18之前：

代码是同步的，执行是异步的。setState 做批处理，当多次连续调用 setState 时，React 会将这些更新合并（batch）为一次，从而只触发一次重新渲染，从而提高性能

像 setTimeout、promise 之类的原生方法和浏览器原生事件，setState 是同步，这是因为这些事件发生在 React 调度流程之外，不会触发批处理更新机制

可以通过 setState 接受一个函数作为参数，在函数内取到上一次的 state，来实现同步更新

虽然说 setState 在某些情况下是异步的，但实际上它并不是真正意义上的异步，而只是批量更新的一种优化手段



## 6.Redux 中间件机制

增强器、applyMiddleware 函数，装饰器模式



## 7.浏览器：内存泄露是什么

新生代内存回收：Scavenge 算法

- 将空间分成两半，一半是 from 空间，一半是 to 空间，新加入的对象会放在 from 空间，当空间快满时，执行垃圾清理；在角色调换，当调换完后的 from 空间快满时，再执行垃圾清理，如何反复

老生代内存回收：标记-清除-整理（Mark - Sweep），此为两个算法，「标记-清理」算法和 「标记-整理」算法

- 标记-清理：标记用不到的变量，清理掉
- 标记-整理：整理完内存后，会产生不连续的内容空间，为节省空间，整理算法会将内容排序到一处空间，空间就变大了

引用计数：引擎中有张“引用表”，保存了内存里面的资源的引用次数，如果一个值的引用次数是0，就表示这个只不再用到，因此可以将这块内存释放

缺点：循环引用，从而导致内容泄露

衍生问题：如何定位内存泄露

### 如何定位内存泄露

#### 内存泄露有哪些情况

最常见的情况就是异步任务的回调未清除或者定时器任务没有清楚，其他的还有DOM引用未清除等。

#### 如何排查内存泄露

通过开发者工具中的 Performance 模块，可以对页面加载和执行流程进行录制，之后在录制快照里查看内存的使用情况。如果发现有内存异常，则可以进一步缩小排查范围，最终找到引发内存泄露的代码。



## 8.工程化：split code 代码分割的原理是什么

目的是优化初始加载时间

- 减少初始包体积
- 按需加载
- 提高并行加载效率

代码分割通常通过构建工具实现

- 使用 import() 语法：这是动态导入的方式
- 界面路由：在单页应用中，使用前端路由库来实现路由级别的代码分割
- webpack配置：使用 `optimization.splitChunks` 来定义分割逻辑
- 魔术注释：Webpack支持在使用 `import()` 语法时添加注释，指定文件名称或者 chunks 名称，在打包时能够更好地控制生成文件的名称和位置



## 9.微前端是什么？有什么用

考察点：微前端

微前端可以在一个页面上跑多个 react、vue 甚至原生项目，他们之间的 JS、CSS 相互隔离运行，不会相互影响，也有通信机制可以通信

### 怎么实现的？（技术原理）

当路由切换时，下载对应引用的代码，然后跑到容器中

比如 single-spa（qiankun就是基于此框架改造），它做的就是监听路由变化，路由切换的时候加载，卸载注册应用的代码

只不过 single-spa 的入口是一个 js 文件，需要代码手动指定要加载啥 js、css等，不方便维护

qiankun 是对 single-spa 的升级

它做了什么改造，一改为 html 为入口，解析 html，从中分析 js、css，再加载，这个是 import-html-entry 这个包实现的

二把 js 代码包裹了一层 function，然后再把内部的 window 用 Proxy 包一层，这样内部的代码就完全被隔离了，就实现了一个 js 沙箱

这是 js 隔离

还有样式隔离

qiankun 做了样式隔离，有 shadow dom 和 scoped 两种方案，但都有问题：

- shadow dom 自带样式隔离，但是 shadow dom 内的样式和外界互不影响，导致挂在弹窗的样式会加不上。父应用也没法设置子应用的样式。
- scoped 的方案是给选择器加了一个 data-qiankun='应用名' 的选择器，这样父应用能设置子应用样式，这样能隔离样式，但是同样有挂在 body 的弹窗样式设置不上的问题，因为 qiankun 的 scoped 不支持全局样式



衍生问题：为什么不用 iframe、父子应用如何通讯、什么是 postmessage、其他微前端方案

### 为什么不用 iframe

隔离性无法被突破，导致应用间上下文无法被共享

1. url 不同步。浏览器刷新 iframe url 状态会丢失、后退前进按钮无法使用
2. UI 不同步，DOM 结构不共享。iframe 中弹出一个弹框，但不会出现在浏览器居中
3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名在不同的子应用中实现免登效果
   - 同域情况下，cookie 可以通过 nginx 配置到同域名下的子路由转发到子引用服务端口
4. 慢。每次子引用进入都是一次浏览器上下文重建、资源重新加载的过程

源自：[Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)

其实问题1、2、3都可以通过 postmessage 来解决，4就是体验问题，一般后台管理系统可以忽略

个人感觉是解决方案，qiankun 背靠阿里，有问题可以在 github 上找，而且 umijs 集成了qiankun，开发效率能提升

iframe的缺点：

- 路由状态丢失，刷新一下，iframe 的 url 状态就丢失了

- dom 割裂严重，弹窗只能在 iframe 内部展示，无法覆盖全局
- web 应用之间通信困难
- 每次打开白屏时间太长，对于 SPA 应用来说无法接受



qiankun 父子应用如何通讯

1.全局状态管理（initGlobalState）

2.props 传递

- 父组件在加载子应用时传递 props
- 字组件通过 this.props 访问这些数据

3.url参数传递

4.事件机制（自己做一个发布订阅模式）

5.第三方库（Redux）

6.localStorage/sessionStorage

### postmessage 

postMessage是HTML5引入的一种跨文档通信的机制，可以在不同的窗口或框架之间传递数据，即使这些窗口或框架不属于同一个源。

postmenssage 是 HTML 引入的一种跨窗口通信机制，解决了以下爱问题：

- 页面和其打开的新窗口之前的数据传递
- 页面与嵌套的 iframe 之间的消息传递
- 多窗口之间的跨域数据传递

### 其他微前端方案

京东：**[micro-app](https://github.com/micro-zoe/micro-app)**

- 基于类WebComponent \+ HTML Entry
- **WebComponent**：web原生组件，它有两个核心组成部分：CustomElement和ShadowDom。CustomElement用于创建自定义标签，ShadowDom用于创建阴影DOM，阴影DOM具有天然的样式隔离和元素隔离属性。由于WebComponent是原生组件，它可以在任何框架中使用，理论上是实现微前端最优的方案。但WebComponent有一个无法解决的问题 - ShadowDom的兼容性非常不好，一些前端框架在ShadowDom环境下无法正常运行，尤其是react框架。
- **类WebComponent**：就是使用CustomElement结合自定义的ShadowDom实现WebComponent基本一致的功能。
- 数据通讯：基于发布订阅+CustomEvent

![micro-app vs qiankun](https://pub-15dc9987604d4311befe731fecc8adb9.r2.dev/074dbf280018e0db9efb41d6cc28d0e3.png)

无界：

- 基于 WebComponent 容器 + iframe

## 10. 算法题：二叉树的前序遍历

```javascript
var preorderTraversal = function(root) {
    let ret = [];
    const preorder = (root) => {
        if (!root) return;
        ret.push(root.val)
        preorder(root.left)
        preorder(root.right)
    }
    preorder(root)
    return ret;
};
```



