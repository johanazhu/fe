# Express

分三部分

一、基础介绍

二、[源码分析](./Express源码解析.md)

三、[手写 Express](./手写express.md)

这里介绍第一部分

## 介绍

Express 是基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架

## 官网

-   [官网](http://expressjs.com/)

-   [中文官网](https://www.expressjs.com.cn/)

-   [npmjs 库](https://www.npmjs.com/package/express)

## 安装

```bash
npm i express -S
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







Node.js 训练营：面向开发人员的 30 天挑战

第 1 天：Node.js 简介

- 阅读有关 Node.js 及其功能的信息
- 在您的计算机上安装 Node.js
- 写一个“你好，世界！” Node.js 中的程序

编码问题：编写一个 Node.js 程序，将“Welcome to Node.js”打印到控制台。

第 2 天：模块和 NPM

- 了解模块以及如何在 Node.js 中使用它们
- 安装和使用 NPM（节点包管理器）
- 安装和使用一些常用的包（例如 Express、Lodash）

编码问题：创建一个 Node.js 程序，该程序使用 Lodash 库按升序对数字数组进行排序。

第 3 天：异步编程

- 了解 Node.js 中的异步编程和事件循环
- 了解如何使用回调和承诺
- 使用回调编写一个简单的异步程序

编码问题：编写一个 Node.js 程序，异步读取文件并将其内容记录到控制台。

第 4 天：HTTP 和 Express

- 了解 HTTP 及其在 Node.js 中的工作方式
- 了解如何在 Node.js 中创建基本的 HTTP 服务器
- 安装并使用 Express 框架创建 Web 应用程序

编码问题：创建一个显示产品列表的 Express Web 应用程序。产品数据应存储在 JSON 文件中。

第 5 天：中间件和路由

- 了解如何在 Express 中使用中间件
- 了解路由在 Express 中的工作原理
- 编写一些中间件功能并在 Web 应用程序中使用它们

编码问题：编写一个 Express Web 应用程序，使用中间件将每个请求记录到控制台。

第 6 天：处理表格和输入

- 了解如何在 Express Web 应用程序中处理表单数据
- 了解如何使用 body-parser 中间件
- 编写处理表单输入的 Express Web 应用程序

编码问题：创建一个 Express Web 应用程序，允许用户提交包含他们的姓名和电子邮件地址的表单。数据应保存到 JSON 文件中。

第 7 天：模板引擎

- 了解模板引擎如何在 Express 中工作
- 了解如何使用模板引擎（例如 Handlebars）
- 编写一个使用模板引擎呈现视图的 Express Web 应用程序

编码问题：创建一个使用 Handlebars 模板引擎呈现产品列表的 Express Web 应用程序。

第 8 天：MongoDB 和 Mongoose

- 了解 NoSQL 数据库和 MongoDB
- 安装和使用 MongoDB
- 了解如何在 Express Web 应用程序中使用 Mongoose（一种 MongoDB ORM）

编码问题：编写一个连接到 MongoDB 数据库并显示产品列表的 Express Web 应用程序。产品数据应存储在 MongoDB 集合中。

第 9 天：RESTful API

- 了解什么是 RESTful API 及其工作原理
- 了解如何在 Express Web 应用程序中创建基本的 RESTful API
- 使用 Postman 测试您的 API 端点

编码问题：创建一个 Express Web 应用程序，该应用程序提供用于管理产品列表的 RESTful API。用户应该能够使用 HTTP 方法创建、读取、更新和删除产品。

第 10 天：错误处理

- 了解如何处理 Express Web 应用程序中的错误
- 了解如何使用错误处理中间件
- 编写一些错误处理中间件函数并在 Web 应用程序中使用它们

编码问题：编写一个使用错误处理中间件来捕获和记录错误的 Express Web 应用程序。

第 11 天：会话和 Cookie

- 了解什么是会话和 cookie
- 了解如何使用快速会话中间件
- 编写一个使用会话和 cookie 来管理用户身份验证的 Express Web 应用程序

编码问题：创建一个允许用户登录和注销的 Express Web 应用程序。

第 12 天：Websockets 和[Socket.io](http://socket.io/)

- 了解 Websockets 是什么以及它们是如何工作的
- 了解如何在 Express Web 应用程序中使用[Socket.io](http://socket.io/)
- 编写一个使用[Socket.io](http://socket.io/)进行实时通信的Express Web 应用程序

编码问题：创建一个使用[Socket.io](http://socket.io/)实现简单聊天室的 Express Web 应用程序。

第 13 天：身份验证和授权

- 了解身份验证和授权之间的区别
- 了解如何在 Express Web 应用程序中实施身份验证和授权
- 编写一个使用 passport.js 进行身份验证和授权的 Express Web 应用程序

编码问题：创建一个 Express Web 应用程序，允许用户使用 passport.js 进行注册、登录和注销以进行身份验证和授权。

第 14 天：部署和托管

- 了解如何部署和托管 Node.js 应用程序
- 了解如何使用基于云的平台进行部署（例如 Heroku）
- 将您的 Node.js 应用程序部署到基于云的平台

编码问题：将您的 Node.js 应用程序部署到 Heroku 并验证它是否正常运行。

第 15 天：测试

- 了解测试在软件开发中的重要性
- 了解如何使用测试框架（例如 Mocha）为 Node.js 应用程序编写单元测试
- 为您的 Node.js 应用程序编写一些单元测试

编码问题：为计算给定数字的阶乘的 Node.js 函数编写单元测试。

第 16 天：调试

- 了解如何使用 Node.js 调试器来识别和修复代码中的错误
- 了解如何使用控制台模块进行调试
- 使用 Node.js 调试器调试您的应用程序

编码问题：使用 Node.js 调试器调试 Express Web 应用程序以识别和修复错误。

第 17 天：安全

- 了解 Node.js 应用程序中的常见安全漏洞
- 了解如何在您的应用程序中实施安全最佳实践（例如输入验证、清理、加密）
- 编写安全且可抵御攻击的 Express Web 应用程序

编码问题：编写一个 Express Web 应用程序，实现输入验证、清理和加密以防止常见的安全漏洞。

第 18 天：性能优化

- 了解 Node.js 应用程序中的性能瓶颈
- 了解如何优化您的应用程序以获得更好的性能（例如缓存、分析、异步编程）
- 优化您的 Express Web 应用程序以获得更好的性能

编码问题：使用缓存和分析技术优化 Express Web 应用程序以获得更好的性能

第 19 天：扩展

- 了解扩展 Node.js 应用程序的挑战
- 了解如何水平和垂直扩展您的应用程序
- 使用 PM2 在集群中部署您的应用程序

编码问题：使用 PM2 在集群中部署一个 Express web 应用程序并验证它是否正常运行。

第 20 天：使用 GraphQL 构建 API

- 了解 GraphQL 是什么以及它是如何工作的
- 了解如何在 Express Web 应用程序中使用 GraphQL 构建 API
- 编写一个使用 GraphQL 进行 API 开发的 Express Web 应用程序

编码问题：创建一个 Express Web 应用程序，该应用程序提供用于管理产品列表的 GraphQL API。用户应该能够使用 GraphQL 查询和变更来创建、读取、更新和删除产品。

第 21 天：使用 REST 构建 API

- 了解什么是 REST 及其工作原理
- 了解如何在 Express Web 应用程序中使用 REST 构建 API
- 编写一个使用 REST 进行 API 开发的 Express Web 应用程序

编码问题：创建一个 Express Web 应用程序，该应用程序提供用于管理图书列表的 RESTful API。用户应该能够使用 HTTP 方法创建、阅读、更新和删除书籍。

第 22 天：使用 Redis 处理实时数据

- 了解什么是 Redis 及其工作原理
- 了解如何使用 Redis 缓存和实时数据
- 编写一个使用 Redis 缓存和实时数据的 Express Web 应用程序

编码问题：创建一个使用 Redis 缓存 API 响应并为项目列表提供实时更新的 Express Web 应用程序。

第 23 天：构建 CLI 应用程序

- 了解如何使用 Node.js 构建 CLI 应用程序
- 了解如何使用 Commander.js 库构建 CLI 应用程序
- 编写执行简单任务的 CLI 应用程序

编码问题：创建一个 CLI 应用程序，它将文件路径作为输入并打印出文件中的行数。

第 24 天：使用数据库

- 了解如何通过 Node.js 使用数据库
- 了解如何使用 ORM/ODM 处理数据库（例如 Sequelize、Mongoose）
- 编写一个使用 ORM/ODM 处理数据库的 Express Web 应用程序

编码问题：创建一个使用 Sequelize/Mongoose 处理数据库并提供 CRUD 操作来管理用户列表的 Express Web 应用程序。

第 25 天：编写 NPM 模块

- 了解如何使用 Node.js 编写 NPM 模块
- 了解如何将 NPM 模块发布到注册表
- 编写执行有用任务的 NPM 模块

编码问题：编写一个 NPM 模块，提供用于生成随机密码的实用函数。

第 26 天：构建微服务

- 了解微服务是什么以及它们如何工作
- 了解如何使用 Node.js 构建微服务
- 使用 Express 和 RabbitMQ 编写一个简单的微服务

编码问题：创建一个简单的微服务，从队列接收消息并执行一个简单的任务（例如，将消息打印到控制台）。





