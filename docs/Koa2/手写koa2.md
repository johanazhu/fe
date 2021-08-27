# 一步一步来：手写Koa2









之前讲过[什么是Koa2](./Koa2基础.md)，以及[源码解读](../源码分析.md)

这篇文章讲解如何手写



## Step 1：如何用 Node 起一个HTTP

原生 node 实现 HTTP 服务

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello world')
})

server.listen(3000, () => {
  console.log('监听3000端口')
})

```

使用 Koa2 实现 HTTP 服务

```javascript
const Koa = require('Koa')
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('3000请求成功')
})
```

实现 Koa 的第一步，就是对 原生 HTTP 服务进行封装，我们按照 Koa 源码的结构，新建 `lib/application.js` 文件，代码如下：

```javascript
const http = require('http')

class Application {
  constructor() {
    this.callbackFunc
  }
  listen(port) {
    const server = http.createServer(this.callback())
    server.listen(port)
  }
  use(fn) {
    this.callbackFunc = fn
  }
  callback() {
    return (req, res) => this.callbackFunc(req, res)
  }
}

module.exports = Application
```

我们引入手写的 Koa，并写个demo

```javascript
const Koa = require('./lib/application')

const app = new Koa()

app.use((req, res) => {
  res.writeHead(200)
  res.end('hello world')
})

app.listen(3000, () => {
  console.log('3000请求成功')
})

```

启动服务后，在浏览器中输入 `http://localhost:3000`，内容显示”Hello，World“

接着我们有两个方向，一是简化 `res.writeHead(200)、res.end('Hello world')` ；二是做塞入多个中间件。要想做第一个点需要先做 context，response，request 文件。做第二个点其实做到后面也需要依赖 context，所以我们先做简化原生response、request，以及将它集成到 context（ctx）对象上



## Step 2：构建 request、response、context 对象

request、response、context 对象分别对应 request.js、response.js、context.js，request.js 处理请求体，response.js 处理响应体，context 集成了 request 和 response

```javascript
let url = require('url')
module.exports = {
    get query() {
         return url.parse(this.req.url, true).query;
    }
}
```























```javascript

function app() { }
app.middlewares = []
app.use = function (cb) {
  app.middlewares.push(cb)
}
app.use((ctx, next) => {
  console.log('mid 1-1');
  next()
  console.log('mid 1-2');
})
app.use((ctx, next) => {
  console.log('mid 2-1');
  next()
  console.log('mid 2-2');
})
app.use((ctx, next) => {
  console.log('mid 3-1');
  next()
  console.log('mid 3-2');
})

function dispatch(index) {
  if (index === app.middlewares.length) return
  let mid = app.middlewares[index]
  mid({}, () => dispatch(index + 1)) // 执行 (ctx, next) => { ... }
}

dispatch(0)
```

