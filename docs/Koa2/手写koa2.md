# 一步一步来：手写Koa2



之前讲过[什么是Koa2](./Koa2基础.md)，以及[源码解读](../源码分析.md)

这篇文章讲解如何手写一个 Koa2



## Step 1：封装 HTTP 服务和创建 Koa 构造函数

之前阅读 Koa2 的源码得知， Koa 的服务应用是基于 Node 原生的 HTTP 模块，对其进行封装形成的，我们先用原生 Node 实现 HTTP 服务

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

再看看用 Koa2 实现 HTTP 服务

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

接着我们有两个方向，一是简化 `res.writeHead(200)、res.end('Hello world')` ；二是做塞入多个中间件。要想做第一个点需要先写 context，response，request 文件。做第二点其实做到后面也需要依赖 context，所以我们先做简化原生 response、request，以及将它集成到 context（ctx）对象上



## Step 2：构建 request、response、context 对象

request、response、context 对象分别对应 request.js、response.js、context.js，request.js 处理请求体，response.js 处理响应体，context 集成了 request 和 response

```javascript
// request
let url = require('url')
module.exports = {
    get query() {
         return url.parse(this.req.url, true).query;
    }
}
```

```javascript
// response
module.exporrs = {
    get body() {
        return this._body;
    },
    set body(data) {
        this._body = data;
    },
    get status() {
        return this.res.statusCode
    },
    set status(statusCode) {
        if (typeof statusCode !== 'number') {
            throw new Error('statusCode must be a number')
        }
        this.res.statusCode = statusCode
    }
}
```

这里我们在 request 中只做了 query 处理，在 response 中只做了 body、status 的处理。无论是 request 还是 response，我们都使用了 ES6 的 get、set，具体可以去[这篇文章](../ES6/)看看，简单来说，get/set 就是能对一个 key 进行取值和赋值

现在我们已经实现了 request、response，获取了 request、response 对象和它们的封装方法，接下来我们来写 context。我们在源码分析时曾经说过，context 继承了 request 和 response 对象的参数，既有请求体中的方法，又有响应体中的方法，例如既能 ctx.query 查询请求体中 url 上的参数，又能通过 ctx.body 返回数据。

```javascript
module.exports = {
    get query() {
        return this.request.query
    },
    get body() {
        return this.response.body
    },
    set body(data) {
        this.response.body = data
    },
    get status() {
        return this.response.status
    },
    set status(statusCode) {
        this.response.status = statusCode
    }
}
```

在源码中使用了 delegate，把 context 中的 context.request、context.response 上的方法代理到了 context 上，即 context.request.query === context.query; context.response.body === context.body。而context.request，context.response 则是在 application 中挂载

总结一下：request.js 负责简化请求体的代码，response.js 负责简化响应体的代码，context.js 把请求体和响应体集成在一个对象上，并且都在 application 上生成，修改 application.js 文件，添加代码如下：

```javascript
const http = require('http');
const context = require('context')
const request = require('request')
const response = require('response')
class Application {
    constructor() {
        this.callbackFunc
      	this.context = context
    	this.request = request
    	this.response = response
    }
    ...
    createConext(req, res) {
        const ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
	...
}
```

因为 context、request、response 在其他方法中要用到，所以我们在构造器中就把他们分别赋值为 this.context、this.request、this.response 。我们实现了上下文 ctx ，现在我们回到之前的问题，简写 `res.writeHead(200)、res.end('Hello world')`

我们要想把 `res.writeHead(200)、res.end('Hello world')` 简化为 `ctx.body = 'Hello world'`，改怎么做呢？

 `res.writeHead(200)、res.end('Hello world')`  是原生的， `ctx.body = 'Hello world'` 是 Koa 的使用方法，我们要对  `ctx.body = 'Hello world'` 做解析并转换为  `res.writeHead(200)、res.end('Hello world')` 。好在 ctx 已经通过 createContext 获取，那么再创建一个方法来封装 res.end，用 ctx.body 来表示

```javascript
  responseBody(ctx) {
    let context = ctx.body
    if (typeof context === 'string') {
      ctx.res.end(context)
    } else if (typeof context === 'object') {
      ctx.res.end(JSON.stringify(context))
    }
  }
```

最后我们修改 callback 方法

```javascript
//   callback() {
//     return (req, res) => this.callbackFunc(req, res)
//   }
callback() {
    return (req, res) => {
      // 把原生 req,res 封装为 ctx
      const ctx = this.createContext(req, res)
      // 执行 use 中的函数, ctx.body 赋值
      this.callbackFunc(ctx)
      // 封装 res.end，用 ctx.body 表示
      return this.responseBody(ctx)
    }
}
```

> PS：具体代码：请看仓库中的 Step 2



## Step 3：中间件机制和洋葱模型

我们知道， Koa2 中最重要的功能是中间件，它的表现形式是可以用多个 use，每一个 use 方法中的函数就是一个中间件，通过第二个参数 next 来表示传递给下一个中间间，例如

```javascript
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(6);
});

app.use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(5);
});

app.use(async (ctx, next) => {
    console.log(3);
    ctx.body = "hello world";
    console.log(4);
});
// 结果 123456
```

所以，我们的中间件是个数组，其次，通过 next ，执行和暂停执行。一 next ，就暂停本中间件的执行，去执行下一个中间件。

Koa 的洋葱模型在 Koa1 中是用 generator + co.js 实现的， Koa2 则使用了 async/await + Promise 去实现。这次我们也是用 async/await + Promise 来实现

在源码分析时，我们就说了 Koa2 的中间件合成是独立成一个库，即koa-compose，它的核心代码如下：

```javascript
function compose (middleware) {
  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

具体解读可以去[源码分析](./源码分析.md)上查看，这里我们不做探究

这里贴两种解决方案，其实都是递归它

```javascript
componse() {
    return async (ctx) => {
      function createNext(middleware, oldNext) {
        return async () => {
          await middleware(ctx, oldNext)
        }
      }
      let len = this.middlewares.length
      let next = async () => {
        return Promise.resolve()
      }
      for (let i = len - 1; i >= 0; i--) {
        let currentMiddleware = this.middlewares[i]
        next = createNext(currentMiddleware, next)
      }
      await next()
    }
}
```

还有一种就是源码，关于 compose 函数，笔者还不能很好的写出个所以然，读者们请自行理解



## Step 4：错误捕获与监听机制

中间件中的错误代码如何捕获，因为中间件返回的是 Promise 实例，所以我们只需要 catch 错误处理就好，添加onerror 方法

```javascript
onerror(err, ctx) {
    if (err.code === 'ENOENT') {
      ctx.status = 404
    } else {
      ctx.status = 500
    }
    let msg = ctx.message || 'Internal error'
    ctx.res.end(msg)
    this.emit('error', err)
}
callback() {
    return (req, res) => {
      const ctx = this.createContext(req, res)
      const respond = () => this.responseBody(ctx)
      + const onerror = (err) => this.onerror(err, ctx)
      let fn = this.componse()
      + return fn(ctx).then(respond).catch(onerror)
    }
}
```

我们现在只是对中间件部分做了错误捕获，但是如果其他地方写错了代码，怎么知道以及通知给开发者，Node 提供了一个原生模块——events，我们的 Application 类继承它就能获取到监听功能，这样，当服务器上有错误发生时就能全部捕获



## 总结

我们先读了 Koa2 的源码，知道后其数据结构及使用方式后，再渐进式手写了一个，这里特别感谢第一名小蝌蚪的 KOA2框架原理解析和实现，他的这篇文章是我写 Koa2 文章的依据。说回 Koa2，它的功能特别简单，就是对原生req，res做了处理，让开发者能更容易的写代码；除此之外，引入中间件概念，这就像插件，引入即可使用，不需要时能减少代码，轻量大概就是 Koa2 的关键字吧

GitHub地址：https://github.com/johanazhu/jo-koa2





## 参考资料

- [KOA2框架原理解析和实现](https://segmentfault.com/a/1190000018488597)

