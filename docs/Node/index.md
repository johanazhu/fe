# Node 导航

> 我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑。
>
> 我生来就是人杰而非草芥，我站在伟人之肩藐视卑微的懦夫。

作为前端，肯定不满足于只做前端，当有了 Node 后，我们不仅限于做前端，还有后端这星辰大海。要成为 Node 后端程序员，需要掌握什么知识点呢

个人认为作为一名程序员，不要限制于我是什么端的程序员，而应是我是人杰，关于实现功能，我要做什么，我需要，写后端代码，部署、运维，也能写 bash 脚本跑定时任务， 总之，是有什么需求，就能完成的那种

扯远了，要学习 Node.js 必须要了解 JavaScript，有关 JavaScript 基础知识点笔者就不阐述，想深入了解的不妨看看笔者之前写的 [深入理解 JavaScript 系列](https://fe.azhubaby.com/JavaScript/)

就 Node.js 工程师而言，个人认为需抓两方面，一是 Node.js 的基础（核心）部分，如各种内置模块使用，理解异步I/O...

二是应用开发部分，不仅仅是 Web 框架开发，Node 还能做很多事情，例如脚手架搭建、爬虫、微服务、数据库MySQL、缓存Redis、消息队列RabbitMQ、搜索引擎ElasticSearch 等等，当然，Web 框架开发是重点，而且框架方面笔者只讲Express、Koa2、NextJS

因为笔者的学习方法是边做边学（learn by making），所以文章中涉及的知识点会一笔带过，相关知识会另写文章超链接过去，如对数据库的介绍（Mysql、MongoDB、Mongoose）、RESTful、会话和 Cookie、JWT 等。简单来说，就是做项目为主，知识点随着项目的完善慢慢补充进去

笔者知道，这体量是很大的，笔者也只是做自己的笔记，而非以教授知识为主，只是记录笔记罢了



## 学习笔记目录

### Node 基础部分

- [基础架构](./Node 走马观花.md)
  - http、fs、url
  - 操作数据流
  - 流
  - 子进程

- [包管理器](./NPM 包管理器,md)
- [命令行](./用 Node 搭建最小实现脚手架.md)
- 构建工作（webpack、rollup、vite 的本质）




### 应用开发部分

- [Express](./Express)

- Koa

  -  [Koa2 基础](./Koa2/Koa2基础.md) 
  -  [实战：Koa2 从零到脚手架](./Koa2/实战：Koa2从零到脚手架.md)
  -  [Koa2 的源码分析](./Koa2/源码分析.md)
  - [手写Koa2](./Koa2/手写Koa2.md)
  - [实战：vercel部署node服务](./Koa2/实战：vercel部署node服务.md)
  - [实战：李瓶儿博客开发](./Koa2/实战：李瓶儿博客开发.md)
  
- 实战

  - [实战：serverless-vercel](./应用开发/实战：serverless-vercel.md)（vercel）
  - [实战：如何将 Express API 部署到 Vercel](./应用开发/实战：如何将 Express API 部署到 Vercel.md)（express vercel）
  - [实战：爬虫每日日报](./应用开发/实战：爬虫每日日报.md)（爬虫、vercel serverless）
  - [实战：聊天室](./应用开发/实战：聊天室.md)（NextJS、socket.io）

  - 爬虫，TK、E大 微博爬虫（https://github.com/Python3Spiders/WeiboSuperSpider/tree/master）
  - 每日早安+微信公众号
  - ahr 999 结合微信公众号（server酱）：检测 ahr 999 数据，如果低于可定投区域，就通知
  - 谐音成语（文案狗）项目
  - realworld 项目（已经有不少项目这样做了）


- 自动化测试
  - 知识点
  - 实战教程
- 应用部署
  - PM2部署
  - docker部署
  - k8s部署





## 为什么学 Node

- [Node.js 做 Web 后端优势为什么这么大？](https://www.zhihu.com/question/357717742)

- [学了node. js可以做啥呢？](https://www.zhihu.com/question/532172501)






## 官方网站

Node.js 最佳实践：https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md

NodeSchool：https://nodeschool.io/zh-cn/

awesome：https://github.com/sindresorhus/awesome-nodejs



## 书籍推荐

Node.js实战（第2版）



## 教程

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md) - Node.js 最佳体验列表
- [七天学会 NodeJS](http://nqdeng.github.io/7-days-nodejs/) - 经典 Nodejs 教程
- [understand-nodejs](https://github.com/theanarkh/understand-nodejs) - 通过源码分析 nodejs 原理
- [Nodejs-Roadmap](https://www.nodejs.red/) - 本文档是作者 @五月君 从事 Node.js 开发以来的学习历程
- [MDN Express 教程](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs)：通过搭建一个图书馆应用，讲解 Express 框架各方面的知识
- [Koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)：涵盖 Koa 2 的各方面使用，每个知识点都配有实例代码可供学习
- [Node.js实战（第2版）](https://book.douban.com/subject/30288107/)：结合大量实例介绍如何用 JavaScript 和 Node 创建高性能的 Web 服务器，涵盖异步编程、状态管理、事件驱动编程等关键设计理念，旨在帮助读者成功晋级全栈开发。



## 牛人

[TJ](https://github.com/tj)：熟悉前端的人都知道他

- 开源狂魔：开源几百个 npm 包
- 异于常人的勤奋：曾经1年10000多commit
- express 和 koa 的作者
- 后来创建公司去搞 Go 了，不过他的传说一直留在前端界



## 如何学习

之前的学 ruby 时不能实现的一点在于，国内的ruby社区圈子太小，ruby-china、知乎、掘金、思否等找了一圈，都没看到有人有相关的技术问题，但 node 在国内都受欢迎多了，所以在学习的过程中，尽量多的关注和回答相关问题，在回答的同时就是在学习





## 我的学习路径

小项目入手，然后中项目，再搞个大项目，小项目只专注一个知识点。

- 如小项目是做个爬虫，爬下来就好

- 如小项目是学 Express 开发，跟着做完就好了

- 如小项目是部署，把项目部署上去就好

然后是中项目，中项目是从零到有的过程

如做 realworld 项目，有十几个接口，七八个页面，小细节也不少。从开始做，到部署上线，完成，说明 Node.js 入门了

接着是大项目，个人认为做个类似 bailiccangdu 的 ele 项目就算大项目吗，六十多个接口，四十五个页面，工程量之大，如果能吃下来，如果我是面试官，会觉得你有两把刷子





## 参考资料

- [Node.js 实战学习路线](https://github.com/tuture-dev/nodejs-roadmap)
