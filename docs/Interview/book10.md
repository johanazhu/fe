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

衍生：React17 事件委托更新、事件委托、React事件传播机制

### React17 事件委托更新

从 React 17 开始，React 的事件委托将从文档级别更改为根 DOM 容器

```
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

在**React** 16和更早的版本中，**React**将对大多数事件执行document.addEventListener（）。

 **React** 17将在后调用rootNode.addEventListener（）。



### 事件委托的优缺点

原理：事件冒泡

优点：减少DOM操作，使得内存减少

缺点：当层级过多，冒泡过程中，可能会被某层阻止掉（这个也不算缺点吧，只能说这样过就会有这个问题出现）

`e.stopPropagetion`：阻止事件冒泡

`e.preventDefault`：阻止默认行为，如提交表单、链接跳转

### React事件传播机制

在根节点绑定事件类型对应的事件回调，所有子孙节点触发该类事件最终都会委托给「根节点的事件回调」处理

寻找触发事件的 DOM 节点，找到其对应的 FiberNode

收集从当前 FiberNode 到根 FiberNode 之间所有注册的「该事件对应回调」

对于补货



## 6.React中父组件如何调用子组件中的方法？





## 7. 代码题：实现 LazyMan

实现 LazyMan，能按以下方式调用：

```markdown
LazyMan('Hank')输出:
Hi! This is Hank!

LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```



### 实现

普通函数写法

```javascript
const LazyMan = (val) => {
    const task = () => {console.log(`Hi! This is ${val}!`); next()}
    let queue = []
    queue.push(task)
    const next = () => { const first = queue.shift(); first?.() }
    
    var api = {
        // x: queue,
        eat(type) {
            const task = () => {console.log(`Eat ${type}~`); next()}
            queue.push(task)
       		return api
        },
        sleep(time) {
          	const task = () => {
                setTimeout(() => {
                    console.log(`Wake up after ${time}`)
                    next()
                }, time *1000)
            }
         	queue.push(task)
            return api
        },
    	sleepFirst(time) {
            const task = () => {
                setTimeout(() => {
                    console.log(`Wake up after ${time}`)
                    next()
                }, time *1000)
            }
         	queue.unshift(task)
            return api
        }
    }
    setTimeout(() => {
        next()
    },0)
    return api
    
}
```



Class 写法

```javascript
class _LazyMan {
    constructor (val) {
        this.queue = [] 
        const task = () => {
            console.log(`Hi This is ${val}!`)
            this.next()
        }
        this.queue.push(task)
        setTimeout(() => {
            this.next()
        }, 0)
        return this;
    }
    next() {
        const first = this.queue.shift(); 
        first?.()
    }
    eat(val) {
        const task = () => {
            console.log(`Eat ${val}~`)
            this.next()
        }
        this.queue.push(task)
        return this
    }
    sleep(time) {
       	const task = () => {
           	setTimeout(() => {
                console.log(`Wake up after ${time}`)
                this.next()
           	}, time * 1000)
       	}
       	this.queue.push(task)
        return this;
    }
  	sleepFirst(time) {
       	const task = () => {
           	setTimeout(() => {
                console.log(`Wake up after ${time}`)
                this.next()
           	}, time * 1000)
       	}
       	this.queue.unshift(task)
       	return this;
    }
}

function LazyMan(val) {
    return new _LazyMan(val)
}
```



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
