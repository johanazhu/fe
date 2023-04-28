# Node 导航

> 我生来就是高山而非溪流，我欲于群峰之巅俯视平庸的沟壑。
>
> 我生来就是人杰而非草芥，我站在伟人之肩藐视卑微的懦夫。

作为前端，肯定不满足于只做前端，当有了 Node 后，我们不仅限于做前端，还有后端这星辰大海。要成为 Node 后端程序员，需要掌握什么知识点呢

个人认为作为一名程序员，不要限制于我是什么端的程序员，而应是我是人杰，关于代码方面的事情我多少都懂些，可以写代码，也可以部署、运维，弄 Node.js 开发，也能写 bash 脚本跑定时任务，总之，是有什么需求，就能完成的那种

扯远了，要学习 Node.js 必须要了解 JavaScript，有关 JavaScript 基础知识点笔者就不阐述，想深入了解的不妨看看笔者之前写的 [深入理解 JavaScript 系列](https://fe.azhubaby.com/JavaScript/)

就 Node.js 工程师而言，个人认为需抓两方面，一是 Node.js 的基础（核心）部分，如异步I/O、内置模块、NPM 包、脚手架等等

二是应用开发部分，不仅仅是 Web 框架开发，还包括爬虫、微服务、数据库MySQL、缓存Redis、消息队列RabbitMQ、搜索引擎ElasticSearch 等等，当然，Web 框架开发是重点，而且框架方面笔者只讲Express、Koa2、NextJS

因为笔者的学习方法是边做边学（learn by making），所以文章中涉及的知识点会一笔带过，相关知识会另写文章超链接过去，如对数据库的介绍（Mysql、MongoDB、Mongoose）、RESTful、会话和 Cookie、JWT 等。简单来说，就是做项目为主，知识点随着项目的完善慢慢补充进去

笔者知道，这体量是很大的，笔者也只是做自己的笔记，而非以教授知识为主，这里只是记录笔记罢了



## 学习笔记目录

### Node 基础部分

- 基础架构

- EventLoop

- 包管理器

  - NPM包
  - pnpm、yarn、npm

- 命令行

  - NodeJs课程（翻译）
  - 自建脚手架（azhu-cli）

- 文件模块（https://learn.microsoft.com/zh-cn/training/modules/nodejs-files/）

  - Nodejs课程

- HTTP 模块

  - （node.js + socket.io实现一对一即时聊天）
  - 老黑：我的网页聊天室第一期，UI基于bootstrap将完成，后期数据基于mongoDB

- 操作数据流

- 流

  - Nodejs课程

- 子进程

  - Nodejs课程

- 构建工作（webpack、rollup、vite 的本质）

  

### 应用开发部分

- Express

  - 图书管理项目
  - 知乎api项目：https://gitee.com/jiuyueqi/manage/blob/master/Node%E5%90%8E%E7%AB%AF%E9%83%A8%E5%88%86.md#13%E6%B8%A9%E6%95%85%E8%80%8C%E7%9F%A5%E6%96%B0

  - 源码分析
  - 手写 express

- Koa

  - 实战：Koa2 从零到脚手架
  - 源码分析
  - 手写 Koa2

- Next.js

- 实战：TK、E大 微博爬虫

- 实战：ahr 999 结合微信公众号（消息推送+微信公众号）

- 实战：谐音成语（文案狗）项目

- 实战：realworld 项目（已经有不少项目这样做了）

- 自动化测试
  - 知识点
  - 实战教程
- 应用部署
  - PM2部署
  - docker部署
  - k8s部署





## 为什么学 Node

[Node.js 做 Web 后端优势为什么这么大？](https://www.zhihu.com/question/357717742)

[学了node. js可以做啥呢？](https://www.zhihu.com/question/532172501)





## 官方网站

Node.js 最佳实践：https://github.com/goldbergyoni/nodebestpractices/blob/master/README.chinese.md

NodeSchool：https://nodeschool.io/zh-cn/

awesome：https://github.com/sindresorhus/awesome-nodejs



## 书籍推荐



## 教程

- [MDN Express 教程](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs)：通过搭建一个图书馆应用，讲解 Express 框架各方面的知识。
- [Koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)：涵盖 Koa 2 的各方面使用，每个知识点都配有实例代码可供学习。

- [Node.js实战（第2版）](https://book.douban.com/subject/30288107/)：结合大量实例介绍如何用 JavaScript 和 Node 创建高性能的 Web 服务器，涵盖异步编程、状态管理、事件驱动编程等关键设计理念，旨在帮助读者成功晋级全栈开发。



## 牛人

[TJ](https://github.com/tj)：熟悉前端的人都知道他

- 开源狂魔：开源几百个npm包
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
