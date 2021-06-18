# React的导航 



# 大纲

讲到React 你会想到什么？

MVC框架？

虚拟DOM？

hooks？

还是那些名字让你长到念出来舌头都打结的生命周期？

我在整理这一章节时，参考了网络上常见的 React 面试题

这些面试题有难有易，它是个筛子，把懂的人晒出来（不乏一些面霸）

常见的面试题如：

1. this.setState() 是同步还是异步？为什么做成异步的？

2. 为什么 constructor 里要调用 super 和传递 props？
3. Redux 的原理是什么？你能手写一个 Redux 吗？
4. 你对Hooks了解吗？Hooks的本质是什么？为什么？
5. ... (有了再补充)

以上这类问题，都是我们踏入高阶前端的垫脚石，只要跨过他们，我相信，那个时候的我应对面试会从容很多

我列出了一大堆未来要做的东西，我只希望自己能踏踏实实的完成一个又一个指标，不留遗憾的完成它。

### 一、组件

​	什么是组件

​	对组件的理解？

​	组件的封装：封装视图、数据、变化逻辑

​	组件的复用...

### 二、生命周期

​	有多少种生命周期

​	一个组件渲染时，生命周期的顺序是怎么样的

​	如何做优化？

​	案例 Todolist

### 三、setState

​	为什么要用setState，而不是直接 this.statet.xx == oo?

​	setState 异步的原理，为什么出现

​	表现出异步后如何拿到更新后的state

### 四、虚拟DOM（Virtual DOM）

​	虚拟dom是什么？

​	它的作用？

​	diff？ 是什么？在其中起到什么作用

​	它的本质？抽象语法树（AST）

### 五、单页面路由的本质

​	本质是什么？ 单页面应用 hash 跳转 后来H5 出了 history Api，就可以直接用 history Api中的某个值。有两种，一种hash跳转，一种history跳转

​	手写一个 react-router （ReactRouter名字）

### 六、Redux

​	它是什么？	单向数据流

​	有什么用？

​	它与其他“状态管理”库的对比

#### 		mobx 

​				mobx 是什么？

​				原理

​				实现todolist

​				手写一个mobx

#### 		flux 

​		各个库的对比

​	react-redux 是什么？怎么实现

​	redux-sage 是什么？

​	redux-sage 的源码？

​	Dva？

​	分别用redux、dva实现一个todolist

​	...

### 七、Hooks

​	hook是什么？

​	有什么用？

​	它的本质是什么？

​	hooks的各种用法？

### 八、Refs

​	ref 是什么？

​	它有什么用？

​	不同阶段 ref 的用法

### 九、各种不常见的特性？

​	portal 传送门是什么

​	context 是什么？

​	cloneElement 是什么...



### 十、事件机制

​	React中的大多数原来都是用来写兼容各种事件机制，了解了React的事件机制，有助于我们对react有个全面的认识



### 九、自己手写React系列	

​	手写React

​	手写Redux

​	别人写的Preact		



### 十、UI 搭建

todolist

​	各种版本的

UI组件

​	开源的

React 全家桶





 immutable 风格



React 哲学：

单向数据流。顺着组件层级从上往下传递



万字基础全面剖析

https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w





什么是状态管理

react中有几个核心的概念

第一个虚拟dom

第二个状态管理

组件是有周期

componentWillMount 当要挂载

componentDidMouunt 挂载上时

componentWillUnmount 摧毁时

componentWillReceiveProps 当传来的props变化时

shouldComponentUpdate 返回boolean 

componentWillUpdate 当组件要更新前

componentDidUpdate 当组件更新完


能设计出或具体说明白团队研发基础设施。具体包括但不限于：
项目脚手架搭建，及如何以工具形态共享。
团队eslint规范如何设计，及如何统一更新。
工具化打包发布流程，包括本地调试、云构建、线上发布体系、一键部署能力。同时，方案不仅限于前端工程部分，包含相关服务端基础设施，比如cdn服务搭建，接入层缓存方案设计，域名管控等。
客户端缓存及预加载方案。
能说明白为什么要实现fiber，以及可能带来的坑。
能说明白为什么要实现hook。
能说明白为什么要用immutable，以及用或者不用的考虑。
知道react不常用的特性，比如context，portal。
能用自己的理解说明白react like框架的本质，能说明白如何让这些框架共存。
能设计出框架无关的技术架构。包括但不限于：
说明如何解决可能存在的冲突问题，需要结合实际案例。
能说明架构分层逻辑、各层的核心模块，以及核心模块要解决的问题。能结合实际场景例举一些坑或者优雅的处理方案则更佳。

知道react-router，redux，redux-thunk，react-redux，immutable，antd或同级别社区组件库。
知道vue和angular对应全家桶分别有哪些。
知道浏览器react相关插件有什么，怎么用。
知道react-router v3/v4的差异。
知道antd组件化设计思路。
知道thunk干嘛用的，怎么实现的
看过全家桶源码，不要求每行都看，但是知道核心实现原理和底层依赖。能口喷几行关键代码把对应类库实现即达标。
能从数据驱动角度透彻的说明白redux，能够口喷原生js和redux结合要怎么做。
能结合redux，vuex，mobx等数据流谈谈自己对vue和react的异同。
有基于全家桶构建复杂应用的经验，比如最近很火的微前端和这些类库结合的时候要注意什么，会有什么坑，怎么解决



react status 中文周刊

https://mp.weixin.qq.com/s/Keq88pAyVA_Xwvg1V2Tu1A



### Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件数间进行数据传递的方法



先注册一个变量

const ThemeContext = React.createContext("light")



然后在要用的地方注入

```react
<ThemeContext.Provider value="dark">
    <Test />
</ThemeContext.Provider>
```

使用不知道那个地方使用的

```react
<ThemeContext.Consumer>
    {value => (
        <div>{value}</div>
    )}
</ThemeContext.Consumer>
```

Provider负责提供context，而Consumer用来消费Provider提供的context

React.context应用了 render props 模式，什么是 render props 。传入的props是一个render组件



context 的问题，如何管理context对象