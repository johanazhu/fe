# JavaScript 框架设计读书笔记



## 摘要







## 重点知识







种子模块

- 命名空间
- 对象扩展
- 数组化
- 类型判断
- domReady
- 无冲突处理

模块加载系统

- AMD规范
- 加载器所在路径的探知
- require 方法
- define 方法

语言模块

- String 的扩展与修复
- Array 的扩展与修复
- Number 的扩展与修复
- Function 的扩展与修复
- Date 的扩展与修复

浏览器嗅探与特征侦测

- 判定浏览器

- 事件的支持侦测

- 样式的支持侦测

- jQuery的一些常用特征的含义

类工厂

- JavaScript 对类的支持
- 各种类工厂的实现
  - 相当精巧的库——P.js
  - JS.Class
  - simple-inheritance
  - 体现 JavaScript 灵活性的库——def.js
- ES5 属性描述符对 OO 库的冲击

选择器引擎

- 浏览器内置的寻找元素的方法
- getElementsBySelector
- 选择器引擎涉及的知识点
- 选择器引擎设计的通用函数
  - isXML
  - contains
  - 节点排序与去重
  - 切割器
  - 属性选择器对于空白字符的匹配策略
  - 子元素过滤伪类的分解与匹配
- Sizzle 引擎

节点模块

- 节点的创建
- 节点的插入
- 节点的复制
- 节点的移除
- innerHTML、innerText 与 outerHTML 的处理
- 一些奇葩的元素节点
  - iframe 元素
  - object 元素
  - video 元素

数据缓存系统

- jQuery 的第一代缓存系统
- jQuery 的第二代缓存系统
- mass Framework 的第一代数据缓存系统
- mass Framework 的第二代数据缓存系统
- mass Framework 的第三代数据缓存系统

样式模块

- 主题结构
- 样式名的修正
- 个别样式的特殊处理
  - opacity
  - user-select
  - background-position
  - ...
- 元素的滚动条的坐标

属性模块

- 如何区分固有属性与自定义属性
- 如何判定浏览器是否区别固定属性与自定义属性
- className 的操作
- Prototype.js 的属性系统
- jQuery 的属性系统
- mass Framework 的属性系统
- value的操作

事件系统

- onXXX 绑定方法的缺陷
- attachEvent 的缺陷
- addEventListener 的缺陷
- jQuery 1.8.2的事件模块概述
- jQuery.event.add 的源码解读
- jQuery.event.remove 的源码解读
- jQuery.event.dispatch 的源码解读
- jQuery.event.trigger 的源码解读
- ...

异步处理

- setTimeout 与 setInterval
- jQuert Deferred

数据交互模块

- Ajax 概述
- 优雅获取 XMLHttpRequest 对象
- XMLHttpRequest 对象的事件绑定与状态维护
- 发送请求与数据
- 接收数据
- 上传文件
- 一个完整的 Ajax实现

动画引擎

- 动画的原理
- 缓动公式
- API的设计
- requestAnimationFrame
- CSS3 transition
- CSS3 animation

插件化

- jQuery的插件的一般写法

MVVM





## 读书笔记

- 一般创造性的活动，一开始都是临摹他人的作品。就算不“造轮子”，也要收集一大堆“轮子”，作家有他的素材集，设计师有大量icon与笔刷，普通的“码农”也有个commonjs存放着一些常用的函数
- 库是解决某个问题而拼凑出来的一大堆函数与类的集合，框架则是一个半成品的应用，直接给出一个骨架
- JavaScript框架分类，目前JavaScript框架可以划分为5类
  - 第1种出现的是以命名空间为导向的类库或框架
  - 第2种出现的是以类工厂为导向的框架，如著名的Prototype，除了最基本的命名空间，其他模块都是一个由类工厂衍生出来的类对象
  - 第3种就是以jQuery为代表的以选择器为导向的框架，整个框架或库主体是一个特殊类数组对象，方便集化操作
  - 第4种就是以加载器串联起来的框架，它们都有复数个JavaScript文件，每个JavaScript文件都以固定规则编写。其中最著名的莫过于AMD
  - 第 5 种就是具有明确分层构架的 MV*框架。首先是 JavaScript MVC（现在叫 CanJS）、backbonejs和spinejs，然后更符合前端实际的MVVM框架，如knockout、ember、angular、avalon、winjs。在MVVM框架中，原有DOM操作被声明式绑定取代了
- JQuery包含了几样了不起的东西：“无new实例化”技术，$(expr)就是返回一个实例，不需要显式地new出来；get first set all 访问规则；数据缓存系统。这样就可以复制节点的事件了。此外，IIFE （Immediately-Invoked Function Expression）也被发掘出来。
- 《Unix 编程艺术》列举的众多“金科玉律”的第一条就是模块，里面有言——“要编写复杂软件又不至于一败涂地的唯一方法，就是用定义清晰的接口把若干简单模块组合起来，如此一来，多数问题只会出现在局部，那么还有希望对局部进行改进或优化，而不至于牵动全身”
- Prototype.js等侵入式框架则在原型上添加camelize等方法。
- 类型的判定必不可少，常见形式是isXXX系列。
-  数据的缓存与处理，目前浏览器也提供data-*属性进行这面的工作，但不太好用，需要框架的进一步封装。
- 种子模块就是其中的急先锋，它里面的方法不一定要求个个神通广大，设计优良，但一定极具扩展性，常用，稳定。
- 参照许多框架与库的实现，我认为种子模块应该包含如下功能：对象扩展，数组化，类型判定，简单的事件绑定与卸载，无冲突处理，模块加载与domReady
- IIFE是现代JavaScript框架最主要的基础设施，它像细胞膜一样包裹自身，防止变量污染。
- 不过对于某些框架，它们是没有统一的命名空间，如Prototype.js , mootools。它们就是不想让你感觉到框架的存在，它的意义深透到 JavaScript、DOM、COM 等整个执行环境的每个角落，对原生对象的原型进行扩展。
