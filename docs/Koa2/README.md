# Koa2



### 什么是 Koa2

由 Express 原班人马打造的新生代 Node.js Web 框架，它的代码很简单，没有像 Express 那样，提供路由、静态服务等等，它是为了解决 Node 问题（简化了 Node 中操作）并取代之，它本身是一个简单的中间件框架，需要配合各个中间件才能使用

[文档](https://koajs.com/)

[中文文档](https://koa.bootcss.com/) (野生)



### 最简单的 Koa 服务器

```javascript
import Koa from 'koa';

const app = new Koa();

app.use((ctx) => {
    ctx.body = 'Hello World'
})

app.listen(3000,() => {
    console.log('3000端口已启动')
})
```



### 洋葱模型

![洋葱模型](https://i.loli.net/2021/08/22/HBG3YuUs6Pn48AO.png)

这是 Koa 的洋葱模型

看看 Express 的中间件是什么样的：

![Express的中间件](https://i.loli.net/2021/08/22/hMleGoU2NwQtYqO.png)

请求（Request）直接依次贯穿各个中间件，最后通过请求处理函数返回响应（Response）。再来看看 Koa 的中间件是什么样的：

![koa的中间件](https://i.loli.net/2021/08/22/clE2NI1svCihqQm.png)

可以看出，Koa 中间件不像 Express 中间件那样在请求通过了之后就完成自己的使命；相反，中间件的执行清晰地分为两个阶段。我们看看 Koa 中间件具体是什么样的

### Koa中间件的定义

Koa的中间件是这样一个函数：

```javascript
async function middleware(ctx, next) {
    // 先做什么
    await next()
    // 后做什么
}
```

第一个参数是 Koa Context，也就是上图中贯穿中间件和请求处理函数的绿色箭头所传递的内容，里面封装了请求体和响应体（实际上还有其他属性），分别可以通过 `ctx.request` 和 `ctx.response` 来获取，一下是一些常用的属性：

```javascript
ctx.url // 相当于 ctx.request.url
ctx.body // 相当于 ctx.response.boby
ctx.status // 相当于 ctx.response.status
```

> 更多 Context 属性请参考 [Context API 文档](https://github.com/koajs/koa/blob/master/docs/api/context.md)

中间件的第二个参数便是 `next` 函数：用来把控制权转交给下一个中间件。但它与 Express 的 `next` 函数本质的区别在于， **Koa 的 `next` 函数返回的是一个 Promise** ，在这个 Promise 进入完成状态（Fulfilled）后，就会去执行中间件中第二个阶段的代码。具体可以看这一篇—— [手写koa2](./手写koa2.md)

## 有哪些常见的中间件

### 路由中间件——@koa/router

#### 下载 npm 包

```javascript
npm install @koa/router
```

> 有些教程使用 `koa/router`，但由于 `koa/router` 目前处于几乎无人维护的状态，所有我们这里使用维护更积极的 Fork 版本 `@koa/router`

#### 如何使用

在 src 中 创建 controllers 目录，用来存放控制器有关的代码。首先是 AuthController，创建 src/controllers/auth.js，代码如下：

```javascript

export default class AuthController {
    public static async login(ctx) {
        ctx.body = 'Login Controller';
    }
    public static async register(ctx) {
        ctx.body = 'Register Controller'
    }
}
```

#### 实现路由

再创建 `src/routes.js`，用于把控制器挂载到对应的路由上面：

```javascript
import Router from '@koa/router';

import AuthController from './controllers/auth';

const router = new Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

export default router;
```

可以看到 `@koa/router` 的使用方式基本上与 Express Router 保持一致

#### 注册路由

最后我们需要将 router 注册为中间件，新建 `src/server.js`，编写代码如下：

```javascript
import Koa from 'koa';
import router from './routes';

// 初始化 Koa 应用实例
consr app = new Koa()

// 注册中间件
// 相应用户请求
app.use(router.routes()).use(router.allowedMethods());

// 运行服务器
app.listen(3000);
```









### 参考资料

[一杯茶的时间，上手 Koa2 + MySQL 开发](https://tuture.co/2020/05/22/fac8401/)