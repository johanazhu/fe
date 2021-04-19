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

```javascript
export default function(num) {
	return {
			type: INCREMENT // 引入constants中的常量
			num
	}

}
```

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



为什么不适用一个全局变量代替redux

https://www.zhihu.com/question/428851039

因为一个全局变量在被改变之后无法驱动 react 组件重新渲染





要先有疑惑感？

什么是redux？

​	因为react的数据不好传递

​	所以引申出很多技术来解决，redux就是其中一种

- store 数据 
- view 视图
- action 动作
- reducer 纯函数，你传来什么，我根据你的指示，传回去什么



我的理解：用户触发各种事件，即 action，派发（dispatch）事件到 reducer，reducer是纯函数，你传来什么，我传回去你要的store，。。。





为什么要用redux？

​	共享数据

redux有什么用？

​	单流程

react-redux才是这个作用

​	能全局控制store（数据），数据能跨组件传递数据（交给redux

源码怎么实现？







### 笔记

### reducer

什么是 reducer

**reducer 就是一个纯函数，接受旧的 state 和 action，返回新的 state**

可以说 reducer 就是定义的规则机制

```javascript
(previousState, action) => newState
```

例如： 你去银行存钱，存10000元，银行就存10000元，去银行存钱的动作就是action，银行存取钱的规则就是reducer

之所以将这样的函数称之为 reducer，是因为这种函数与被传入`Array.prototype.reduce(reducer, ?initialValue)` 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。**永远不要**在 reducer 里做这些操作：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如`Date.now()` 或 `Math.random()`



### 什么是reduce

案例来自于 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```



```javascript
function f1(arg) {
    console.log('f1', arg)
    return arg
}
function f2(arg) {
    console.log('f2', arg)
    return arg
}
function f3(arg) {
    console.log('f3', arg)
    return arg
}
let res = f1(f2(f3("omg")))
console.log('res', res)
// f3, omg
// f2, omg
// f1, omg
// res, omg
```

但是这样嵌套写法，在实际代码书写中，会很复杂，书写不够优雅

有没有一个函数能让我这样调用，即传入函数，让它自动执行

```javascript
let res = compose(f1, f2, f3)("omg")
```

方法：

```javascript
function compose( ...funcs) {
    if (funcs.length === 0) {
        return args => args
    }
    
    if(funcs.length === 1) {
        return funcs[0]
    }
    
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```



### Redux 上手

Redux 是 JavaScript 应用的状态容器。它保证程序行为一致性且易于测试

![image-20210413210343082](C:\Users\mayn\AppData\Roaming\Typora\typora-user-images\image-20210413210343082.png)





### 手写redux

累加器例子：

1. 需要一个 store 来存储数据
2. store 里的 reducer 初始化 state 并**定义 state 修改规则**
3. 通过 dispatch 一个 action 来提交对数据的修改
4. action 提交到 reducer 函数里，根据传入的 action 的 type，返回新的 state









实现combineReducers，combineReducers就是把所有的reducer合并成一个reducer

reducer可以按页面（组件）来划分规则，然后最后合在一起

```javascript
{todoRender}
function combineReducers(reducers) {
    return function combination(state = {}, action) {
        let nextState = {};
        let hasChanged = false;
        for (let key in reducers) {
            const reducer = reducers[key];
            nextState[key] = reducer(state[key], action)
            hasChanged = hasChanged || nextState[key] !== state[key]
        }
        hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
        return hasChanged ? nextState : state
    }
}
```





