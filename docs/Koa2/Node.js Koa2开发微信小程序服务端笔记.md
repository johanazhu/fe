## 纯正商业级应用－Node.js Koa2开发微信小程序服务端



Node.js的能力与应用

1.脱离浏览器运行JS

2.NodeJS Stream（前端工程化基础）

3.服务端Api

4.作为中间层



后端：读写数据库 API

KOA 特点：

洋葱圈模型	精简

定制化能力越强



洋葱模型



async await

async await 必须在一起

await 可以当做求值关键字

await 求值关键字	表达式 仅仅Promise

会阻塞当前线程

带有async的函数返回的都是promise



调用中间件的的时候（即next()）前加await

洋葱模型就是一层包裹着一层，

```javascript
app.use((ctx. next)=>{
	console.log(1)
    next()
    console.log(2)
})
app.use((ctx, next)=> {
    console.log(3)
    next()
    console.log(4)
})
// 1342
```

1——进入next，先把下一个next中的事情做完，再去做第一个中间件中的事情

koa内部机制next返回的是promise对象，所以一般用async await来表达，不然会出现执行顺序的不一致



#### REST是什么？

- 万维网软件架构风格
- 来用创建网路服务

#### 为何叫 REST？

- Representational State Transfer
- Representational: 数据的表现形式（JSON、XML......）
- State：当前状态或者数据
- Transfer：数据传输



#### Restful 请求设计规范

- URI 使用名词，尽量用复数，如 /users
- URI 使用嵌套表示关联关系，如 /users/12/repos/5
- 使用正确的 HTTP 方法，如 GET/POST/PUT/DELETE
- 不符合 CRUD 的情况： POST/action/子资源
- 



#### HTTP options 方法的作用是什么

- 检测服务器所支持的请求方法
- CORS 中的预检方法

##### allowedMethods 的作用

- 相应options 方法，告诉它所支持的请求方法
- 相对地返回 405 （不允许）和 501（没实现）



错误处理包 koa-json-error



#### NoSQL 简介

#### 什么是 NoSQL?





