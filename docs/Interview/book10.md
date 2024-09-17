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

考察点：前端路由实现

前端单页面路由的两种方案为 history 和 hash

hash 模式：带 # 号，通过监听 `hashChange` 来监听变化，从而展示不同的页面模块，不需要在服务器端额外配置，兼容性更好

-  `window.addEventListener("hashchange", callback)`

history 模块：没有 # 号，通过监听 HTML5 的新特性 `history.pushState` + `popState` 实现，需要在服务端额外配置 try_files，需要支持 HTML5 的现代浏览器

- `history.pushState` 、`history.replaceState`  不刷新页面但往历史栈中新增/替换一个记录
- `window.popState`：当历史记录条目被更改时触发



## 4.git rebase 和 git merge 有什么区别

git merge：将一个分支的所有变更合并到另一个分支时，git 会创建一个新的合并并提交，以包含两个分支的历史并保留他们的独立性

git rebase：是通过把一个分支的提交“移到”另一个分支的顶部来整合变更。在进行 rebase 时，git 会重写提交历史，将提交一个一个地应用到目标分支上

git merge 的优缺点：

优点：

- **保留历史完整性**: 所有的合并提交都被保留，有助于追踪变更的来源和分支的历史。
- **避免冲突**: 合并过程是一次性的处理，所有冲突会在一个合并操作中处理。

缺点：

- **复杂的提交历史**: 如果经常进行合并，提交历史可能变得复杂且不易阅读。

git rebase 的优缺点

优点：

- **更清晰的历史**: 提交历史更加线性，便于理解项目的演变过程。
- **按时间顺序整合**: 将提交一个个应用，可以使得当前分支所做的变更更易于跟踪。

缺点：

- **历史重写**: 如果已经共享的提交被重写，可能会导致其他开发者的本地仓库出现问题。
- **解决冲突一次一次**: 在 rebase 过程中，如果有多个冲突，开发者必须逐个提交解决冲突，这可能会比较耗时。

衍生题：git reset 和 git revert 区别，git stash 是什么

### git reset 和 git revert

git reset 会直接提交记录退回到指定的 commit 上

git revert 回滚某次的提交

- `git reset` 会修改历史记录，可能对团队协作造成问题。
- `git revert` 保留历史记录，适合团队使用。



`git reset --hard xxx`：回滚某次提交，git log 中找不到记录

`git revert --hard xxx`：回滚某次提交，并且会保留你之前的记录并加上一条记录

### git stash 

```bash
git stash // 所有未提交的修改（包括暂存的和非暂存的）都保存起来
git stash pop // 恢复之前缓存的工作目录
git stash list // 查看现有stash
git stash apply // 应用哪个指定的 stash
git stash drop // 移除stash
```

暂存文件

git 四大工作区域：workspace（工作区）、Stage（暂存区）、Respository（本地仓库）、Remote（远程仓库）

## 5. React 合成事件是什么

`React` 事件通过 `JSX` 方式绑定的事件, 比如 `onClick={() => this.handle()}`

原生事件使用 `addEventListener`

### 为什么需要合成事件？和原生事件相比有什么不同

目的：封装事件，实现跨平台，把差异封装在底层

将事件全部统一冒泡到 document 再进行触发

可以统一命名，这样子命名符合 react 编程习惯

抹平不同浏览器的差异、与内部优先级机制绑定、需要考虑所有浏览器事件

在 React 中，我们绑定的事件并不是原生事件，而是由原生事件合成的 React 事件，比如 click 事件合成为 onClick 事件；比如 blur、change、input 等，合成为 onChange 事件，它统一绑定在 document 上统一管理（react 17 之后就绑定在 root 根节点上，这样做的好处是利于微前端）

衍生：React17 事件委托更新、事件委托、React事件传播机制

### React17 事件委托更新

从 React 17 开始，React 不再将事件处理添加到 `document` 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中

```
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

在**React** 16和更早的版本中，**React**将对大多数事件执行document.addEventListener（）。

 **React** 17将在后调用rootNode.addEventListener（）。



### 事件委托的优缺点

原理：事件冒泡

优点：减少DOM操作，使得所用内存减少

缺点：当层级过多，冒泡过程中，可能会被某层阻止掉（这个也不算缺点吧，只能说这样过就会有这个问题出现）

`e.stopPropagetion`：阻止事件冒泡

`e.preventDefault`：阻止默认行为，如提交表单、链接跳转

### React事件传播机制

在根节点绑定事件类型对应的事件回调，所有子孙节点触发该类事件最终都会委托给「根节点的事件回调」处理

寻找触发事件的 DOM 节点，找到其对应的 FiberNode

收集从当前 FiberNode 到根 FiberNode 之间所有注册的「该事件对应回调」


## 6.React中父组件如何调用子组件中的方法？

1.使用  `React.forwardRef`  和 `useImperativeHandle` 实现在父组件中访问子组件的方法

2.使用回调函数



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



## 8.浏览器：错误捕获

考察点：错误捕获的几种方式

遇到错误捕获，首先回答的是使用 try-catch 捕获，但它只能捕获同步代码中的异常，对于异步代码（如 Promise），如果使用 try-catch ，则无法捕获其中的错误。但可以把 promise 语法写成 async/await 的形式，就可以使用 try-catch了

### 全局错误捕获

通常设置全局错误处理，可以捕获未处理的异常和错误

- window.onerror：捕获全局 JavaScript 错误
- window.addEventListener("error")：捕获资源加载错误，如 js、css、图片加载错误
- window.addEventListener(“unhandlerejection”)：捕获未处理的 Promise 错误

### 组件级错误边界

React 中实现错误边界挫力组件级别的错误，ErrorBoundary 

### 尽早捕获错误

在 API 请求或用户输入处理加上 try-catch 语句来捕获错误

### 错误日志记录

将错误记录发送到服务器以进行进一步分析，如 Sentry

### 用户友好提示

在错误出现时，给用户提示可理解的信息



## 9.当用户反馈页面加载慢，你是前端怎么排查这个问题



利用浏览器的开发者工具进行性能分析是关键步骤。具体操作包括：

- **打开开发者工具**：在浏览器中按 `F12` 或右键选择“检查”。
- **查看网络请求**：在“网络”标签中，查看各个资源的加载时间，特定的文件（如HTML、CSS、JavaScript）是否耗时过长。
- **分析加载时间**：观察“水fall图”，识别哪些请求是造成延迟的主要因素，如过多的HTTP请求会导致页面加载缓慢





## 10.算法题：合并两个有序数组

考察点：合并两个有序数组
