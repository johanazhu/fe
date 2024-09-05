# 前端十面

> 这里是「五年前端三年面试」的真题面试题，笔者收集了各式各样的前端面试题，汇聚到着十篇文章里。不为别的，只为自己被裁要做八股文准备
>
> ——2024.4.12
>
> 今天你是我的面试官，明天你要看我的面经

每文共十道题，其中会涉及CSS、手写源码、JavaScript 基础、ES6 特性、React、数据流、工程化、HTTP、微前端、算法等等方面知识，笔者希望靠这十文入职心仪公司

## 模拟题一

- CSS：BFC 是什么
- 手写源码：防抖与节流
- JavaScript 基础：闭包
- ES6特性：Promise 
- React： Fiber 是什么，为什么需要 Fiber 
- 数据流： Redux 是什么？
- 浏览器：浏览器输入 url 到页面渲染都经历了什么
- HTTP：HTTP 1、2、3 的区别
- 性能：你常用的性能优化
- 算法题：两数之和

## 模拟题二

- CSS：flex:1  表示什么
- 手写源码：深拷贝
- JavaScript 基础：原型和原型链
- ES6特性：箭头函数和普通函数的区别
- React： React Hook 实现原理
- React：函数式组件与类组件的区别
- 浏览器：什么是同源策略以及跨源资源共享（CORS）
- 工程化：如何提供 webpack 构建速度
- 应用题：promise.all 中一个接口坏了，怎么保证其他两个正常调用
- 算法题：三数之和

## 模拟题三

- CSS：如何实现垂直居中
- 手写源码：New 操作符
- JavaScript 基础：事件循环
- ES6特性：迭代器和生成器是什么
- React： 虚拟DOM 与 Diff算法
- React：说说 React 的渲染过程
- 浏览器： 浏览器渲染原理 
- 微前端：qiankun 的原理是什么？如何实现 js 沙箱和 css 隔离的
- 项目：十万条数据如何优化
- 算法题：反转链表 

## 模拟题四

- CSS：左边宽度已知，右边自适应方案
- 手写源码：Object.create
- JavaScript 基础：继承
- ES6特性：Class
- React： setState 是同步的还是异步
- 数据流：Redux 中间件机制
- 浏览器：内存泄露是什么
- 工程化：split code 代码分割的原理是什么
- 微前端：微前端是什么？有什么用
- 算法题：二叉树的前序遍历

## 模拟题五

- CSS: CSS 选择器有哪些
- 手写源码：New 操作符
- JavaScript 基础：作用域
- ES6特性：Es Module 和 CommonJs
- React： useMemo、useCallback是什么
- React：说说你做的组件
- 浏览器：html缓存了怎么更新，js和css缓存是怎么更新的
- 场景题：前端埋点 SDK 设计思路
- 计算机网络：进程和线程的区别
- 算法题：无重复字符的最长子串

## 模拟题六

- CSS: CSS 优先级是怎么计算的
- 手写源码：手写 apply、call、bind 
- JavaScript 基础：谈谈变量提升
- ES6特性：let 和 const
- React：React 中的多次渲染如何优化
- React： useLayoutEffect 和 useEffect 的区别
- HTTP：什么是单点登录（SSO ）？如何实现
- 浏览器：Cookie、localStorage、sessionStorage、IndexedDB的区别
- 工程化：webpack 怎么配置多页面
- 算法题：有效的括号

## 模拟题七

- CSS：双飞翼/圣杯布局
- 手写源码：实现 Reduce 函数
- JavaScript 基础：什么是立即执行函数
- ES6特性：Map 和 Set
- React：修改深层对象有什么解决方案
- React： useEffect 第二个参数是对象如何处理
- 浏览器：遇到白屏问题如何分析和解决
- 性能优化：网站首页有大量的图片，加载很慢，如何优化呢（图片懒加载）
- 微前端：如何防止一个应用没有被卸载掉造成内存泄露
- 算法题：全排列

## 模拟题八

- CSS：行内元素、块级元素有哪些，区别是什么
- 手写源码：实现发布订阅 
- JavaScript 基础：垃圾回收机制
- ES6特性：扩展运算符和剩余运算符
- React: react中一个父组件，两个子组件，一个传props，一个不传props，父组件重新渲染，两个子组件会不会都重新渲染
- React17、18、19 更新以及服务端组件
- TS：interface 和 type 的区别
- 浏览器：跨域
- 工程化：项目构建工具有考虑换 vite 吗？vite有什么优势？
- 算法题：最大子序和

## 模拟题九

- CSS：CSS 样式隔离手段
- 手写源码：柯里化
- JavaScript 基础：数据类型有哪些
- ES6：ES6至ES12的新特性
- React: 说说 React Router 有几种模式？实现原理？
- 数据流：Redux 和 mobx 的区别
- 设计模式：什么场景下会用策略模式
- 工程化：tree shaking 是什么
- 工程化：webpack 工作原理是什么，工作流程是怎么样的
- 算法题：爬楼梯

## 模拟题十

- CSS：重绘和回流
- 手写源码：instanceof 
- JavaScript 基础：history 和 hash 两种路由最大的区别是什么
- Git： git rebase 和 git merge 有什么区别
- React： React 合成事件是什么
- React： React中父组件如何调用子组件中的方法？
- 代码题：实现 LazyMan
- 浏览器：错误捕获
- 性能优化：当用户反馈页面加载慢，你是前端怎么排查这个问题
- 算法题：合并两个有序数组





## 备用

- 白屏时间和首屏时间的区别
  - 白屏时间：FCP（First Content Paint）
  - 首屏收件：LCP（Large Content Paint）
  - 计算：Performance
  - 用 MutationObserver（https://github.com/zxyue25/blog/issues/1）



## 其他

1. 聊聊你对业务的理解
2. 你在工作中有遇到什么难点，怎么解决的
3. 做完项目之后你觉得还有哪些可以优化的点？
4. 怎么进行新技术的学习？



## 你有什么要问我的

1. 这个岗位的职责是什么
2. 工作做的好坏的标准是什么
3. 作息时间和五险一金缴纳
4. 在面试中如何评定一个人是否是高级前端
   - 面试表现吗？
   - 社区影响力？
   - 还是说做过什么比较厉害的开源项目




## 参考资料

云谦面试提问：算法、闭包、迭代器、Promise、ES 特性、React、数据流、工程化

性能优化方面，比如长列表怎么优化，加载怎么优化，怎么提高项目的可维护性，怎么提高项目的首屏加载速度。

自我介绍（show time，3 分钟展示自己的时间，把最闪亮的你展现出来）

你知道/用过/遇到过 xx 问题么？（不仅会技术的使用，还了解技术的实现原理）

你还有什么问题么？（你对团队的了解、好奇，对未来的个人成长有什么期待？）





interface 和 type 的区别

interface 只能描述对象，type 则描述所有数据类型

type 是别名，interface 则是类型声明

type 不可重新赋值，interface 自动合并
