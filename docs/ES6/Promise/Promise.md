# Promise 



## 什么是Promise

在了解Promise前，先去看看为什么会产生Promise

#### JavaScript的回调函数

```javascript
getAsync("fileA.txt", function(error, result) {
    if (error) {
        //  失败时的处理
        throw err;
    }
    // 成功后的处理
})
```

Node.Js 的规则是在 JavaScript 的回调函数的第一个参数为 `Error` 对象，这是它的一个惯例

#### 使用Promise进行异步处理

```javascript
var promise = getAsyncPromise("fileA.txt")
promise.then(function(result) {
    // 获取文件内容成功后的处理
}).catch(function(error) {
    // 获取文件内容失败后的处理
})
// 或者用另一种
promise.then(function(result) {
     // 获取文件内容成功后的处理
}, function(error) {
    // 获取文件内容失败后的处理
})
```

看到用promise和回调函数的区别没有

promise 更趋于同步的想法——我去调这个行为，等（then）它好了我再执行XX

综上所述：

promise是异步编程的一种解决方案，比传统的回调函数和事件更合理和强大

所谓 promise，简单来说就是**一个容器**，里面保存着某个未来才会结束的行为（通常是一个异步处理）。从语法上讲，promise 是一个对象，从它那可以获取异步操作的消息





## 实战Promise



### 一般用法

之前介绍过，promise像一个容器，包裹着“成功”或“失败”

```javascript
function promise() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('成功')
        }, 1000)
    })
}
promise().then(function(value) {
    console.log(value)
})
```



### then

#### 它的使用

then 方法可以接受两个回调函数作为参数，

第一个回调函数是 promise 对象的状态变为 resolved 的时候调用，

第二个回调函数是 promise 对象的状态变为 rejected 时调用

其中第二个函数时可选的，不一定需要提供

#### 它的作用

为 promise 实例添加状态改变时的回调函数

前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数（可选）

**then 方法返回的是一个新的 promise 实例**。注意，不是原来那个 promise 实例，因此可以采用链式写法，即在 then 方法后面再调用另一个 then 方法

注意：**then 方法即不会触发回调，也不会将它放到微任务，then 只负责注册回调，由 resolve 将注册的回调放入微任务队列，由事件循环将其取出并执行**



### 执行顺序

面试中常常考的问题

在说这个之前，需要先聊天事件循环的执行顺序

简单来说：XXX

回过头说promise，promise新建后就会立即执行，而then会被塞到为微任务中，当宏任务执行完后再执行微任务







promise

Promise是ES6新增的语法，解决了回调地狱的问题

可以把Promise堪称一个状态机，初始时pending状态，通过函数resolve和rejecy，将状态转变为resolved和rejected，状态一旦改变就不会再次变化









阳波 javascript核心技术开发解密

#### 1.异步与同步

​	什么是异步？什么是同步？在代码的执行过程中，经常会涉及两个不同的概念，他们就是同步和异步。

​	同步是值当发起一个请求时，如果未得到请求结果，代码将会等待，直到结果出来，才会执行后面的代码。异步是指当发起一个请求时，不会等待请求结果，而是直接继续执行后面代码。

​	我们使用 promise 模拟一个发起请求的函数，该函数执行后，会在1s之后返回数值30

```javascript
function fn() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(30)
        }, 1000);
    })
}
```

在该函数的基础上，可以使用 async/awaut 语法来模拟同步的效果

```javascript
const foo = async function() {
    const t = await fn()
    console.log(t);
    console.log('next code')
}

foo()
// 输出结果
// 1s 之后依次输出 
// 30 
// nextcode
```

而一部效果则会有不同的输出结果:

```javascript
const foo = function() {
    fn().then(function(res) {
        console.log(res)
    })
    console.log('next code')
}
// 输出结果
// 1s 之后依次输出 
// nextcode
// 30
```







then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）因此可以采用链式写法，即then方法后面再调用另一个then方法



实例化 Promise 传入的函数是同步执行的，then 方法本身其实也是**同步**执行的，但 then 中的回调会先放入微任务队列，等同步任务执行完毕后，再依次取出执行，换句话说只有回调是异步的



在new Promise 中使用resolve或者reject，相当于变更promise的状态，变化后，promise.then会执行





## 参考资料

- [面试问到 Promise，这样回答最完美了](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484500&idx=1&sn=01d5ed1a017a09a232df19721cbbc0d4&source=41#wechat_redirect)
- [JavaScript：生成器（Generator）](https://www.jianshu.com/p/da611c080feb)
- [迭代器,生成器(generator)和Promise的“微妙”关系](https://juejin.cn/post/6844903666290262024)
- [剖析Promise内部结构，一步一步实现一个完整的、能通过所有Test case的Promise类](https://github.com/xieranmaya/blog/issues/3)
- [Promise 链式调用顺序引发的思考](https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046472&idx=1&sn=308e85ae3a92dd81c1943d12f4e9d128&chksm=87c41958b0b3904e962e6df6788ee8f66947da90066f700db0e25f59b21e12bd620121714efb&mpshare=1&scene=1&srcid=&sharer_sharetime=1571791544493&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [JavaScript Promise迷你书](https://www.kancloud.cn/kancloud/promises-book/44251)
- [Promise 链式调用顺序引发的思考](https://juejin.cn/post/6844903972008886279)
- [100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651234151&idx=1&sn=6292156c16e851d8d5f1dbccdfc82a74&chksm=bd4946e38a3ecff561bef99277e0f1ad5ec7f7014437aa100cb01e872eee80985adb04734b11&mpshare=1&scene=1&srcid=&sharer_sharetime=1570493248167&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
- [从0到1实现Promise](https://segmentfault.com/a/1190000016550260)
- [要就来45道Promise面试题一次爽到底(1.1w字用心整理)](https://mp.weixin.qq.com/s?__biz=Mzg3MTU4NTI3OA==&mid=2247488564&idx=1&sn=064273a79002be92454954f0973c86ce&source=41#wechat_redirect)
- [高级异步模式 - Promise 单例](https://mp.weixin.qq.com/s?__biz=Mzk0MDMwMzQyOA==&mid=2247490644&idx=1&sn=4caa938b2f3d123fad848c3edb0a7b28&source=41#wechat_redirect)
- [Promise原理&宏微任务](https://mp.weixin.qq.com/s/BlD9HgXM9hqRGf3Ep9UYEw)
- [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
- [这次彻底搞懂 Promise](https://mp.weixin.qq.com/s/pELnbmQkpsz2LmIQBnSeQQ)

