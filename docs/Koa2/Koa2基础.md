# Koa2 基础

## 知识储备

Node 基本常识

## 什么是 Koa2

由 Express 原班人马打造的新生代 Node.js Web 框架，它的代码很简单，没有像 Express 那样，提供路由、静态服务等等，它是为了解决 Node 问题（简化了 Node 中操作）并取代之，它本身是一个简单的中间件框架，需要配合各个中间件才能使用

[文档](https://koajs.com/)

[中文文档](https://koa.bootcss.com/) (野生)

Koa2 是什么？

-   用 NodeJS 写的 Web 框架
-   Koa 可被视为 nodejs 的 HTTP 模块的抽象

Koa 可被视为 nodejs 的 HTTP 模块的抽象

用法很简单：

Koa2 启动服务

```javascript
const Koa = require('koa');

const app = new Koa();

app.use((ctx) => {
    ctx.body = 'Hello World';
});

app.listen(3000, () => {
    console.log('3000端口已启动');
});
```

其中，Koa2 封装了 request 和 response，将它们放在一起，成了 ctx。

再 Koa2 中，ctx 是个很关键的值，

ctx.body ：返回值

ctx.status：返回的 code

ctx.request：请求体

ctx.response：返回体

app 实例、context、request、request 官方 API 文档

https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/index.md

https://github.com/demopark/koa-docs-Zh-CN/blob/master/api/context.md
