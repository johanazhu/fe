# 手写React



### 手写系列-实现一个铂金段位的 React

https://mp.weixin.qq.com/s/C4pjEzYPZocRnJOaF1q0Jg



### 实现一个小型react思路

我们写的 `jsx ` 代码，都会被转换成`React.createElement`这种形式

先把虚拟`dom`对象-`js`对象（虚拟dom）变成真实`dom`对象，然后插入到根标签内

render方法，接受虚拟dom对象，返回真实dom对象



https://github.com/BetaSu/just-react



90行写好一个react

看完了，写的蛮好的。作者实现了JSX、函数组件、类组件和生命周期钩子函数

虚拟DOM 借用 `snabdom` ，vue用的就是这个库

https://www.html.cn/web/javascript/19259.html



simple-react

https://github.com/hujiulong/simple-react





从零开始的React再造之旅

https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247485323&idx=1&sn=e60644bc3d940cf3ed960133cd75a358&chksm=ce6ec327f9194a31b31d6b5f9ec61ec2b3979fd335e2810f0acd49d8a02c923ab0ca3536a09e&mpshare=1&scene=1&srcid=&sharer_sharetime=1582163598178&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



React 源码分析

https://zhuanlan.zhihu.com/p/28697362



从零实现react系列： React 的架构设计（系列文章可以都找来）

https://mp.weixin.qq.com/s/of1ulUPtz7c8Evc9A8cYdw





https://github.com/AttackXiaoJinJin/reactExplain





從零開始的 React 再造之路

https://segmentfault.com/a/1190000021689852





React 技术揭秘

https://react.iamkasong.com/hooks/prepare.html



老外的做一个react

https://pomb.us/build-your-own-react/



# 手写源码



参考https://github.com/hujiulong/simple-react

实现JSX，组件，声明周期，diff，setState等核心功能

## 前言

巴拉巴拉，如何下手

jsx会被转译成用 `React.createElement` 方法包裹的代码。所以第一步，我们来实现这个`React.createElement` 方法

从 jsx 转译结果来看，createElement 方法的参数是这样：

```javascript
createElement(tag, attrs, child1, child2, child3)
```



## JSX和虚拟DOM





## 组件和生命周期



## diff算法



节点之间的对比



## 异步的setState





tinyreact

https://github.com/ykforerlang/tinyreact