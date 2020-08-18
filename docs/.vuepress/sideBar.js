function bigFrondSideBar() {
  return [
    {
      title: "WebApp",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "webApp/H5.md",
        "webApp/1px.md",
        "webApp/适配.md",
        "webApp/Rem布局.md",
        "webApp/flexible源码解析.md",
        "webApp/webview.md",
        "webApp/Hybrid.md",
        "webApp/最佳实践.md",
      ],
    },
    {
      title: "Flutter",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Flutter/flutter-teach.md"],
    },
    {
      title: "RN",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        // "Flutter/mobile.md"
      ],
    },
    {
      title: "微信公众号",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        // "Flutter/mobile.md"
      ],
    },
    {
      title: "微信小程序",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        // "Flutter/mobile.md"
      ],
    },
  ];
}

function ArmorySideBar() {
  return [
    {
      title: "算法",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Algorithm/First.md",
        "Algorithm/数组降维.md",
        "Algorithm/如何对一个数组进行去重.md",
      ],
    },
    {
      title: "数据结构",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "DataStructure/First.md",
        "DataStructure/堆.md",
        "DataStructure/栈.md",
        "DataStructure/链表.md",
        "DataStructure/hash表.md",
      ],
    },
    {
      title: "HTTP",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "HTTP/网络是怎样连接的.md",
        "HTTP/HTTP协议原理+实践 Web开发工程师必学.md",
        "HTTP/restful.md",
      ],
    },
    {
      title: "Docker",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Docker/docker-do.md",
        "Docker/docker-how.md",
        "Docker/docker-shell.md",
        "Docker/docker-teach.md",
      ],
    },
    {
      title: "Git",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Git/git-teach.md", "Git/git-shell.md"],
    },
    {
      title: "Linux",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Linux/shell.md"],
    },
    {
      title: "CSBasic",
      collapsable: false,
      sidebarDepth: 0,
      children: ["CSBasic/csbasic.md"],
    },
  ];
}

function frontEndBasicSideBar() {
  return [
    {
      title: "HTML",
      collapsable: false,
      sidebarDepth: 0,
      children: ["HTML/HTML.md"],
    },
    {
      title: "CSS",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "CSS/Flex.md",
        "CSS/双飞翼布局.md",
        "CSS/垂直居中.md",
        "CSS/BFC是什么.md",
        "CSS/动画.md",
      ],
    },
    {
      title: "Jquery",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Jquery/高效jquery.md"],
    },
  ];
}

function webpackSideBar() {
  return [
    {
      title: "webpack教程",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "webpack/webpack从零到总结.md",
        "webpack/常见面试题.md",
        "webpack/webpack持久化缓存.md",
        "webpack/webpack配置篇.md",
        "webpack/深入理解webpack文件打包机制.md",
        "webpack/loader和plugin做什么.md",
        "webpack/webpack如何做优化.md",
        "webpack/webpack深入总结.md",
        "webpack/Polyfill 方案的过去、现在和未来.md",
        "webpack/使用ProloadPrefetch优化你的应用.md",
        "webpack/实现一个简单的webpack.md",
        "webpack/为什么webpack4默认支持ES6语法的压缩.md",
        "webpack/webapck热更新解读.md",
        "webpack/webpack-dev-middleware源码解读.md",
        "webpack/happy-pack原理解析.md",
        "webpack/webpack5构建大型项目.md",
        "webpack/实战-webpack大型项目实战.md",
        "webpack/实战-动手打一个自己的脚手架.md",
      ],
    },
    {
      title: "babel",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "webpack/babel/基础知识.md",
        "webpack/babel/如何写一个babel.md",
        "webpack/babel/深入理解babel生态.md",
      ],
    },
    {
      title: "AST抽象语法树",
      collapsable: false,
      sidebarDepth: 0,
      children: ["webpack/AST.md"],
    },
  ];
}

function nodeSideBar() {
  return [
    {
      title: "node基础",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Node/Node基本面.md",
        "Node/事件触发器events模块.md",
        "Node/本地路径path模块.md",
        "Node/文件操作系统fs模块.md",
        "Node/全局对象process进程.md",
        "Node/http模块.md",
        "Node/统一资源定位符url模块.md",
        "Node/压缩zlib模块.md",
        "Node/流stream模块.md",
        "Node/逐行读取readline模块.md",
        "Node/查询字符串querystring模块.md",
        "Node/module模块.md",
        "Node/缓冲器Buffer模块.md",
        "Node/域名服务器dns模块.md",
        "Node/进程与线程.md",
        "Node/脚手架.md",
        "Node/cookie、session、token、jwt.md",
        "Node/require和import.md",
        "Node/export.md",
        "Node/Node-mysql实践.md",
      ],
    },
    {
      title: "Express",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Express/express-teach.md",
        "Express/express-mongoose实践.md",
        "Express/手写express.md",
      ],
    },
    {
      title: "Koa2",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Koa2/koa2-teach.md",
        "Koa2/源码分析.md",
        "Koa2/对比Express、Koa.md",
        "Koa2/手写koa2.md",
        "Koa2/koa2+MongoDB+JWT实战.md",
        "Koa2/Serverless+Egg.js后台管理系统实战.md",
      ],
    },
    {
      title: "PM2",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Node/PM2.md"],
    },
    {
      title: "Mongoose",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Mongoose/mongoose-teach.md"],
    },
    {
      title: "Mysql",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Mysql/mysql-teach.md"],
    },
    {
      title: "Redis",
      collapsable: false,
      sidebarDepth: 0,
      children: ["Redis/redis-teach.md"],
    },
  ];
}

function reactSideBar() {
  return [
    {
      title: "React基础",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "React/大纲.md",
        "React/常见面试题.md",
        "React/component.md",
        "React/生命周期.md",
        "React/setState.md",
        "React/VirtualDOM.md",
        "React/Hooks.md",
        "React/Refs.md",
        "React/Fiber.md",
        "React/事件机制.md",
        "React/各种不常见的特性.md",
        "React/性能优化.md",
      ],
    },
    {
      title: "React全家桶",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "React/ReactRouter.md",
        "React/Redux.md",
        "React/Mobx.md",
        "React/Redux-sage.md",
        "React/Dva.md",
        "React/各个状态管理.md",
        "React/ReactSSR.md",
      ],
    },
    {
      title: "React源码手写",
      collapsable: false,
      sidebarDepth: 0,
      children: ["React/手写React.md", "React/手写Redux.md", "React/Preact.md"],
    },
    {
      title: "React实战",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "React/应用篇React代码整洁.md",
        "React/应用篇TodoList.md",
        "React/应用篇UI组件.md",
        "React/应用篇搭建React全家桶.md",
      ],
    },
  ];
}

function jsSideBar() {
  return [
    {
      title: "JavaScript知识梳理",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "JavaScript/Foreword.md",
        "JavaScript/常见面试题.md",
        "JavaScript/JavaScript是什么.md",
        "JavaScript/JavaScript由什么组成.md",
        "JavaScript/一切皆对象.md",
        "JavaScript/Object.md",
        "JavaScript/Function.md",
        "JavaScript/作用域.md",
        "JavaScript/this关键字.md",
        "JavaScript/闭包.md",
        "JavaScript/作用域与执行上下文.md",
        "JavaScript/作用域链与原型链.md",
        "JavaScript/原型.md",
        "JavaScript/原型与原型链.md",
        "JavaScript/Array.md",
        "JavaScript/String.md",
        "JavaScript/循环都来这儿.md",
        "JavaScript/Object.create(null).md",
        "JavaScript/TypeScript.md",
      ],
    },
    {
      title: "JavaScript面向对象编程",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "JavaScript/面向对象/介绍.md",
        "JavaScript/面向对象/面向对象三大将.md",
      ],
    },
    {
      title: "JavaScript高阶",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "JavaScript/高阶/JavaScript运行原理.md",
        "JavaScript/高阶/JavaScript中的对象机制.md",
        "JavaScript/高阶/JavaScript中的函数进阶指南.md",
        "JavaScript/高阶/深入理解JSCore.md",
        "JavaScript/高阶/JavaScript引擎.md",
        "JavaScript/高阶/JavaScript工作机制.md",
      ],
    },
    {
      title: "JavaScript原理",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "JavaScript/原理/模拟apply、call的实现.md",
        "JavaScript/原理/模拟bind的实现.md",
        "JavaScript/原理/模拟new的实现.md",
        "JavaScript/原理/0.1+0.2为什么不等于0.3.md",
        "JavaScript/原理/模拟MVVM的实现.md",
        "JavaScript/原理/模拟数组方法.md",
        "JavaScript/原理/源码实现.md",
        "JavaScript/原理/手写AJAX.md",
        "JavaScript/原理/手写汇总.md",
      ],
    },
  ];
}

function ES6SideBar() {
  return [
    {
      title: "ES6",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "ES6/完全指南.md",
        "ES6/ES6.md",
        "ES6/模块化历程.md",
        "ES6/深入理解ES6模块机制.md",
        "ES6/Promise.md",
        "ES6/Async.md",
        "ES6/Class.md",
        "ES6/Proxy.md",
        "ES6/Generator.md",
        "ES6/Let&Const.md",
      ],
    },
  ];
}

function BrowserSideBar() {
  return [
    {
      title: "Browser",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Browser/browser.md",
        "Browser/localStorage.md",
        "Browser/页面构建过程.md",
        "Browser/渲染机制.md",
        "Browser/渲染树的形成原理.md",
        "Browser/回流与重绘.md",
        "Browser/跨域.md",
        "Browser/事件循环.md",
        "Browser/事件Api.md",
        "Browser/浏览器性能优化.md",
        "Browser/缓存.md",
        "Browser/浏览器原理.md",
      ],
    },
  ];
}

function PerformanceSideBar() {
  return [
    {
      title: "性能优化",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "Performance/介绍.md",
        "Performance/网络层面.md",
        "Performance/构建层面.md",
        "Performance/浏览器渲染层面.md",
        "Performance/服务端层面.md",
        "Performance/总结.md",
      ],
    },
  ];
}

function designPatternSideBar() {
  return [
    {
      title: "设计模式",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "DesignPattern/发布订阅模式.md",
        "DesignPattern/单例模式.md",
        "DesignPattern/构造器模式.md",
        "DesignPattern/建造者模式.md",
        "DesignPattern/代理模式.md",
        "DesignPattern/外观模式.md",
        "DesignPattern/观察者模式.md",
        "DesignPattern/策略模式.md",
        "DesignPattern/迭代器模式.md",
      ],
    },
  ];
}

function csBasicSideBar() {
  return [
    {
      title: "计算机基础",
      collapsable: false,
      sidebarDepth: 0,
      children: [
        "CSBasic/计算机的起源.md",
        "CSBasic/计算机的组成.md",
        "CSBasic/操作系统基础篇.md",
        "CSBasic/计算机网络传输层篇.md",
        "CSBasic/计算机网络网络层篇.md",
        "CSBasic/计算机网络应用层篇.md",
      ],
    },
  ];
}

function aboutSideBar() {
  return [
    {
      title: "关于",
      collapsable: false,
      sidebarDepth: 0,
      children: ["About/about.md", "About/book.md"],
    },
    {
      title: "关于简历",
      collapsable: false,
      sidebarDepth: 0,
      children: ["About/Resume.md", "About/TalkHr.md"],
    },
    {
      title: "留言本站",
      collapsable: false,
      sidebarDepth: 0,
      children: ["About/Question.md"],
    },
    {
      title: "markdown语法",
      collapsable: false,
      sidebarDepth: 0,
      children: ["About/markdown语法.md"],
    },
  ];
}

module.exports = {
  nodeSideBar,
  reactSideBar,
  jsSideBar,
  ES6SideBar,
  BrowserSideBar,
  PerformanceSideBar,
  webpackSideBar,
  frontEndBasicSideBar,
  ArmorySideBar,
  bigFrondSideBar,
  designPatternSideBar,
  csBasicSideBar,
  aboutSideBar,
};
