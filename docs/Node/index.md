# Node 导航

> 我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑。
>
> 我生来就是人杰而非草芥，我站在伟人之肩藐视卑微的懦夫。

一个 NodeJS 后端工程师需要掌握那些什么知识才能独胆一面呢？我的理解是能用 Node 写一段代码，运行在服务器上提供服务。要想做到这些，我们需要对 Node 有基本的认知，以及要学会基于 Node 的 Web 框架（express 或者 koa2），除此之外，我们还要知道数据库方面的知识，缓存相关的知识。有了这些我们就要部署一个项目，部署项目时，我们要知道 linux 、shell 命令、怎么做 CI/CD，怎么部署一个项目等等

Go、Python 都可以写后端，韩信点兵，多多益善。有了 Node 做基础，学 Go 很多东西一通百通

## Node 基础

[Node 基础](./Node基础)

**模块** 这里主讲两个模块

-   [Events 模块](./事件触发器events模块)
    -   Node 是事件驱动开发
-   [module 模块](./module模块)
    -   CommonJS 规范
    -   require、module 和 exports

[脚手架](./脚手架)

[包管理器](./npm)

## Web 后端开发

### Koa

-   [Koa2 导航](./Koa2/)
-   [Koa2 基础](./Koa2/Koa2基础)
-   [实战：Koa2 从零到脚手架](./Koa2/实战：Koa2从零到脚手架)
-   [Koa2 源码分析](./Koa2/源码分析)
-   [手写 Koa2](./Koa2/手写Koa2)
-   [对比 Express、Koa2、Redux](./Koa2/对比Express、Koa2、Redux)


### Express

-   [Express 介绍](./Express/)
-   [Express 源码解析](./Express/Express源码解析)
-   [手写 Express](./Express/手写Express)



## 应用部署

服务如何部署

需要掌握 linus 知识

shell

CI/CD

swagger 把你的 api 设计为这个形式展示出来

[PM2部署应用](./PM2)
