# Express

分三部分

一、基础介绍

二、[源码分析](./Express源码解析.md)

三、[手写Express](./手写Express.md)



这里介绍第一部分

## 介绍

Express 是基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架



## 官网

- [官网](http://expressjs.com/)

- [中文官网](https://www.expressjs.com.cn/)

- [npmjs库](https://www.npmjs.com/package/express)



## 安装

```shell
npm i express -S
```



## 一个简单的 demo

```javascript
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```



