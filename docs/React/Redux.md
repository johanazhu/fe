# redux

### 其言

为什么会有redux
历史
flux

flux 

实现方式： eventEmitter 事件消息模式

监听发布，消息比较乱

reflux

redux 映射表

mobx是一种监听

observable

注入，被观察

### 单向数据流和双向数据流
单向数据流和双向数据绑定

表单的双向绑定，说到底不过是value的单向绑定 + onChange事件监听

React本身并不存在所谓的单向数据流，这完全是Flux引入的概念

#### redux笔记

reducer 就是为了创建store，翻译：还原剂

createStore // 创建store

comose // 合并store

applyMiddleware // 中间件 redux-thunk 异步

dispatch ：调度，派发



store.dispatch({

​	type: 'INCREMENT',

​	num: 10

})



先用reducer创建store，reducer是个纯函数，由值（state）和动作指示（action）组成，

store会dispatch发出动作名字和传入的值

action是个返回对象的函数

export default function(num) {

​	return {

​			type: INCREMENT // 引入constants中的常量

​			num

​	}

}

constants 常量集合

counter 返回的是state

全局一个store





把某一个reducer注册成一个方法，通过action改变方法名的值，最后返回回来又给state，state又通过react的组件props向下传递数据，一层层往下传，哪里用到的话，就用connect插件（装饰器）引用一下就行了

store注册到顶部的props，传递数据





从零实现一个redux

状态管理

https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484475&amp;idx=1&amp;sn=27575ab8a8ad4e5e78cec8c2bcad4b0c&source=41#wechat_redirect



# React-redux



从零实现 react-redux

https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247485220&idx=2&sn=74811cf3a61baf1a883fe1c7a76b88fa&chksm=c06686b2f7110fa4211871572ae52b08b0cc045741540e28e7c026f441b7c7f26e454aecd1b0&mpshare=1&scene=1&srcid=&sharer_sharetime=1585194811446&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd

