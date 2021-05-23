# Promise 
promise

Promise是ES6新增的语法，解决了回调地狱的问题

可以把Promise堪称一个状态机，初始时pending状态，通过函数resolve和rejecy，将状态转变为resolved和rejected，状态一旦改变就不会再次变化

生成器
https://www.jianshu.com/p/da611c080feb
https://juejin.im/post/5b851e136fb9a019f47d1d4b

https://github.com/xieranmaya/blog/issues/3



https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046472&idx=1&sn=308e85ae3a92dd81c1943d12f4e9d128&chksm=87c41958b0b3904e962e6df6788ee8f66947da90066f700db0e25f59b21e12bd620121714efb&mpshare=1&scene=1&srcid=&sharer_sharetime=1571791544493&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



https://www.kancloud.cn/kancloud/promises-book/44251

https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484500&amp;idx=1&amp;sn=01d5ed1a017a09a232df19721cbbc0d4&source=41#wechat_redirect





面试问到 Promise，这样回到最完美了

https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484500&amp;idx=1&amp;sn=01d5ed1a017a09a232df19721cbbc0d4&source=41#wechat_redirect



JavaScript Promise 迷你书

https://www.kancloud.cn/kancloud/promises-book/44251



Promise 链式调用顺序引发的思考

https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046472&idx=1&sn=308e85ae3a92dd81c1943d12f4e9d128&chksm=87c41958b0b3904e962e6df6788ee8f66947da90066f700db0e25f59b21e12bd620121714efb&mpshare=1&scene=1&srcid=&sharer_sharetime=1571791544493&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



剖析Promise内部结构，一步一步实现一个完整的、能通过所有 Test case 的Promise 类

https://github.com/xieranmaya/blog/issues/3



100行代码实现 Promises/A+ 规范

https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651234151&idx=1&sn=6292156c16e851d8d5f1dbccdfc82a74&chksm=bd4946e38a3ecff561bef99277e0f1ad5ec7f7014437aa100cb01e872eee80985adb04734b11&mpshare=1&scene=1&srcid=&sharer_sharetime=1570493248167&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd



从0到1实现Promise

https://segmentfault.com/a/1190000016550260









要就来45道promise 面试题一次爽到底

https://mp.weixin.qq.com/s?__biz=Mzg3MTU4NTI3OA==&mid=2247488564&idx=1&sn=064273a79002be92454954f0973c86ce&source=41#wechat_redirect











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



高级异步模式 - Promise 单例

https://mp.weixin.qq.com/s/DQeJ-H4va0zTlSAoNsgF1Q



Promise 原理及宏微任务

https://mp.weixin.qq.com/s/BlD9HgXM9hqRGf3Ep9UYEw





从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节

https://mp.weixin.qq.com/s/r4hG9Fh4nMjdAzPWjcAP7g





这次彻底搞懂 promise

https://mp.weixin.qq.com/s/pELnbmQkpsz2LmIQBnSeQQ



