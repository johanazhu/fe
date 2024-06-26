# 模拟题十



## 1.重绘和回流

考察点：重绘、回流

重绘是指当页面中元素的样式发生改变（如颜色、阴影、边框等）而不影响它在文档流中的位置时，浏览器会对这些元素进行重新绘制，这个过程称为重绘

回流是指页面中元素的尺寸、结构或某些属性发生改变时，浏览器需要重新计算元素的大小和位置，然后再重新渲染页面的过程

回流必定会触发重绘，但重绘不一定会引起回流

触发回流的常见情况包括：

- 添加或者删除可见的 DOM 元素
- 元素位置/尺寸/内容发声改变
- 浏览器窗口大小发生变化
- 应用 CSS 样式的改变

引起回流的样式改变：

- 改变元素的尺寸（width、height、padding、margin等）
- 改变元素位置（top、left、right、bottom等）
- 改变元素显示（display:none）
- 添加或删除可见的 DOM 元素
- 改变元素字体
- 改变浏览器窗口大小

引起重绘的样式改变：

- 改变元素颜色
- 改变元素背景颜色
- 改变元素阴影
- 改变元素边框

所以在页面优化优性能时，我们应该尽量减少触发回流的操作，一些常见的优化手段：

- 批量修改DOM（Render 的批处理也会如此考虑的）
- 使用 transform 代替 top/left
- 使用 visibility 代替 display:none
- 尽量减少不必要的样式改变
- 将颜色、背景颜色、边框等发生重绘的样式写在 CSS 样式的前头





## 2. 手写 instanceof 

考察点：instanceof 原理

相关文章：[instanceof——找祖籍](../JavaScript/instanceof——找祖籍)

```javascript
function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false;
    let proto = Object.getPrototypeOf(left);
    while(true) {
        if (proto === null) return false;
        
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}
```

### 衍生问题

原型与原型链



## 3.history 和 hash 两种路由最大的区别是什么

考察点：history 和 hash 两种路由最大的区别是什么



## 4.ES6：展开运算符的作用

还能展开哪些数据类型



## 5. React 合成事件是什么

考察点：合成事件

为什么需要合成事件？和原生事件相比有什么不同

目的：封装事件，实现跨平台，把差异封装在底层

将事件全部统一冒泡到 document 再进行触发

可以统一命名，这样子命名符合 react 编程习惯

抹平不同浏览器的差异、与内部优先级机制绑定、需要考虑所有浏览器事件

在 react 中，我们绑定的事件并不是原生事件，而是由原生事件合成的 react 事件，比如 click 事件合成为 onClick 事件；比如 blur、change、input 等，合成为 onChange 事件，它统一绑定在 document 上统一管理（react 17 之后就绑定在 root 根节点上，这样做的好处是利于微前端）

衍生：事件冒泡



从 React 17 开始，React 的事件代理将从文档级别更改为根 DOM 容器

```
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

在**React** 16和更早的版本中，**React**将对大多数事件执行document.addEventListener（）。

 **React** 17将在后调用rootNode.addEventListener（）。



React 17 去掉事件池

事件池：合成事件对象会被放入池中统一管理。这意味着合成事件对象可以被复用，当所有事件处理函数被调用之后，其所有属性都会被回收释放置空

事件池的好处是在较旧浏览器中重用了不同事件的事件对象以提高性能，但它对现代浏览器的性能优化微乎其微，反而给开发者带来困惑，因此去除了事件池，因此也没有了事件复用机制。





## 6.React的作用

React 这个库的革命性在于，之前的网页应用都直接构建在 DOM 之上，开发者必须自己处理 DOM 的状态，自己保证各个节点之间的同步。

React 改变了一切，使得应用程序脱离了 DOM。你不必再管 DOM 的状态，只需要管理自己应用的状态。这消除了复杂 Web 应用中繁琐且容易出错的许多工作量。

https://news.ycombinator.com/item?id=39310142



## 7. 0.1 + 0.2 为什么不等于 0.3

考察点：浮点数

因为 JS 采用的是 IEEE754 标准的双精准度（64 位），一个浮点数既要包含整数部分又要包含小数部分，
0.1 和 0.2 先转成二进制，在转换为同一维度计算，得到二进制后，再转换为十进制后



计算机的底层都是由二进制来表示的，对于 0.1和 0.2 这种数字在用二进制储存的时候会有精度误差



## 8.浏览器：Web 安全 + 错误捕获



> 这个问题正好是复习过了，所以答得很全面，主要从`浏览器同源策略`、`CSP`、`XSS`、`CSRF`以及`SQL注入`等方面分别做了介绍。

> 浏览器同源策略：
>
> 1. 现代浏览器以及`HTTPS`会对非同源的请求进行拦截以保证安全
> 2. 若请求链接中的协议、主机名、端口、方法等任何一个不一样，都是不同源请求

> CSP：
>
> 1. 内容安全策略，可以在HTML中的`meta`标签或者服务端返回的`Content-Secrity-Policy`头中进行设置
> 2. 可以指定资源的请求域、资源的加载方式等

> XSS：
>
> 1. `跨站脚本攻击`，分为了持久型XSS、反射型XSS和DOM型XSS
> 2. 持久型XSS是最常见的XSS攻击，主要通过输入框、富文本等组件输入一些恶意的脚本代码，存储到服务端之后，当其他用户打开页面加载该脚本时便出现攻击行为
> 3. 反射型XSS是需要用户点击黑客提供的恶意链接，该恶意链接会在跳转到正常页面的同时执行黑客脚本
> 4. DOM型XSS存在于一些第三方插件中，如浏览器插件去恶意修改页面DOM等方式
> 5. 对于XSS的防范主要是防范持久型XSS，在页面的输入框和富文本提交时对字符串做过滤处理，同时在页面中只对可信的HTML文本做解析

> CSRF：
>
> 1. `跨站请求伪造`，当用户在正常的网站登录之后，由于同源请求会默认携带Cookie，因此黑客可以在自己的网站中向正常网站发送伪造请求来冒充用户自己的操作
> 2. 攻击方式主要包含通过标签的src属性、href属性以及form的action属性等，通常是伪造`GET`请求
> 3. 防范方式包含使用`POST`请求处理资源、服务端验证请求的`Referer`、禁止第三方网站请求携带Cookie以及最后在请求时增加`csrftoken`字段做校验





js 代码异常

try catch

window.error

资源加载错误

window.addEventListen("error", callback)

Promise 错误

window.addEventListen("unhandlerejectedtion")

React 错误

错误捕获

static getDerviedStateFromProps componentDidCatch



## 9.当用户反馈页面加载慢，你是前端怎么排查这个问题









## 10.算法题：合并两个有序数组

考察点：合并两个有序数组
