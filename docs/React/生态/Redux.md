# Redux



JS 应用程序的可预测状态容器

​		

Redux 是什么？

有什么用？

它的写法

## 起因

我们写React，当页面逻辑不复杂时，我们可以通过state来管理数据

但是当页面逻辑复杂时，Page页面（一个Page就是一个组件）下有 Header组件、Content组件、Footer组件等，Header组件中又有Avatar组件、HeaderTitle组件、HeaderOther组件，Avatar中又有其他的组件，那么你拿到后端传来的数据时，怎么把数据传递给细分后的子孙组件呢？

![image-20210617105102880](https://i.loli.net/2021/06/17/buLJOjiKwaWk7Rg.png)

通过props让下传？

在这个例子中，Avatar需要获取 avatar的图片资源，需要通过页面请求从后端获取数据。在 Page 组件中获取到数据，存在 state 的 data 中，先把数据传递给 Header 组件，再由 Header 传递给 Avatar。Header 组件用不到 avatarImg，但为了子组件多写了一边。

如果通过 props 的方式传递数据，如果页面一复杂，写的人会写到手抖。

所以有一些大牛开始写一些库，来关联两者之间的关系，最开始是 flux，后来 redux 改进了，成了主流，但是要说明的一点是，

react是用jsx的写法来展示视图，通过state来管理状态

flux、redux、mobx等是针对状态的管理的库，不需要react也可以用，但是它们是因为react而被大众认知并且发扬光大

如果我们要手写一个redux，不需要用到react

而实际开发中，如果我们需要说的react全家桶，包括：react（描述视图的库）、redux（状态管理的库）、react-redux（将react与redux结合在一起的库）

因为这是最常见的，其实说法不准确，应该叫react-redux全家桶。因为如果你用mobx的话，就是这样：react（描述视图的库）、mobx（状态管理的库）、mobx-react（将mobx与react结合在一起的库）

说起来，我们忽略了一直有用到的库：react-dom，它的作用是将用 react 写好的虚拟dom转换成真实dom

发现了没，常规来说，像 react和react-dom是要结合在一起了。为什么要分开，因为用react写好的虚拟dom可以放在其他容器上，比如手机上（react-native）、VR上（react-vr）

像redux最初是为了解决react上的状态管理，结合了react-redux的功能，后来再把它拆开



flux 不表，单单就 redux 来说，如果把每一个状态比作一个村民，村长有一个记录了每一个村民的劳动清单，例如张三——种田，李四——种苹果，王五——种桃子，赵六——打铁，这个清单就是reducer。每次有人过来问，问村长张三是做什么的，村长查了茶名单，告诉那人，张三是种田的。过了几年，有人死了，就来村长这里登记，李四死掉了，村长更新名单。同样的，换职业、新人加入等都要去村长那里登记。这就是redux。

相当于有一个全局的store管理着状态，这里自然而然就有个问题出来，为什么要搞这么麻烦，难道不能直接搞个全局对象，但是全局对象的确定是你可以修改，我也可以修改，毕竟javascript是肉类型，你修改了store中的数据，我都不知道。

所以有人搞出一个库来





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





## 手写Redux







### middleware

它提供的是位于 action 被发起之后，到达 reducer 之前的扩展点



const next = store.dispatch;







通过 context来传递数据

与 react-router 一样



https://zhuanlan.zhihu.com/p/410648220?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128



Redux设计哲学

https://juejin.cn/post/7019185205336342542





## 参考资料

- [从零开始实现一个 Redux，知其然并知其所以然](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484475&amp;idx=1&amp;sn=27575ab8a8ad4e5e78cec8c2bcad4b0c&source=41#wechat_redirect)

- [从0实现一个tinyredux](https://github.com/ykforerlang/tinyredux)
- [Redux 设计思想与工作原理](https://mp.weixin.qq.com/s/bJizhO3eP7db22YdzF0fOQ)
- [MDN：reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

