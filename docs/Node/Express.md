# Express

> 放仓库里半天，也没有动静，对于这个库，笔者只能说它是基础层，我们可以在其基础上创建出更多的价值。学 NextJS 吧，不要把时间浪费在这里

分三部分

一、基础介绍

二、源码分析

三、手写 Express

四、[如何将 Express API 部署到 Vercel](./如何将 Express API 部署到 Vercel.md)



## 介绍

Express 是基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架

## 官网

-   [官网](http://expressjs.com/)

-   [中文官网](https://www.expressjs.com.cn/)

-   [npmjs 库](https://www.npmjs.com/package/express)

## 安装

```bash
npm i express
```

## 一个简单的 demo

```javascript
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);
```



## 源码分析

[渐进式Express源码学习](https://github.com/sunkuo/grow-to-express)





## 手写 Express

[使用 Node.js 实现一个 express 框架](https://segmentfault.com/a/1190000023498413)

