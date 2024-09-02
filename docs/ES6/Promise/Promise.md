# Promise



## 目录

Promise 发展史

Promise 的三个状态

Promise.prototype.then

Promise.prototype.catch

Promise.prototype.finally

Promise.all

Promise.race





## Promise 的发展史

要说 Promise，先去了解回调地狱（callback hell），要聊回调地狱就要说到异步

简单来说，因为 JavaScript 在浏览器中执行，不能有假死状态，所以就自然有了异步解决方案

对异步的解释，简单来说就是执行一个函数，却不等待函数返回结果

因为异步，所以我们需要回调函数来接受有结果后该怎么操作

我们在开发中也常遇到回调的方法，如下所示：

```javascript
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    success: () => {
		...
    }
})
```

但如果说，一个接口（或者说方法）依赖于另一个接口的返回值，那么就成嵌套了

```javascript
// 以下为伪代码
axios({
    method: 'GET',
    url: 'http://localhost:3000/posts',
    success: (result) => {
		axios({
            method: 'GET',
            url: `http://localhost:3000/posts?id=${result.id}`,
            success: () => {
                ...
            }
        })
    }
})
```

如果有三个四个这样的嵌套，从代码层面上看，会形成回调地狱问题

但其实也不是什么大问题，一般开发中也不会嵌套太多层

2011年，社区开始讨论到这个问题，并于 2012年，Promise被提出作为规范：Promise/A+

在成为 ES6 标准之前，社区里也出现了许多符合 Promise 标准的库，如bluebird、q、when等等。

后来于 2015年正式由 ESMAScript 纳入到 ES6 中，成了前端开发的重要知识点

## Promise 的三个状态

Promise 对象的构造器（constructor）语法如下：

```javascript
const promise = new Promise(function(resolve, reject) {
    if(success) {
        resolve(value)
    } else {
        reject(error)
    }
})
```

Promise有三个状态

- pending（等待）
- fulfilled（成功）
- rejected（失败）

Promise 的状态只能从 pending 转变为 fulfilled 或 rejected，且一旦状态确定就不会再改变

当状态流转成resolved时，需要选择一个值作为当前 Promise 的 value：

- new Promise时，则是通过resolve(val)
- promise.then时，则是通过return（需要注意的是，没有显式return时是默认return undefined

## Promise.prototype.then

then 方法可以接受两个回调函数作为参数，

第一个回调函数是 promise 对象的状态变为 resolved 的时候调用，

第二个回调函数是 promise 对象的状态变为 rejected 时调用

其中第二个函数时可选的，不一定需要提供

```javascript
promise.then(onFulfilled, onRejected)
```

#### 它的作用

为 promise 实例添加状态改变时的回调函数

前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数（可选）

**then 方法返回的是一个新的 promise 实例**。注意，不是原来那个 promise 实例，因此可以采用链式写法，即在 then 方法后面再调用另一个 then 方法

> 注意：then 方法即不会触发回调，也不会将它放到微任务，then 只负责注册回调，由 resolve 将注册的回调放入微任务队列，由事件循环将其取出并执行

promise 就像一个容器，包裹着“成功”或“失败”

```javascript
function promise() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('成功');
        }, 1000);
    });
}
promise().then(function (value) {
    console.log(value);
});
```

## Promise.prototype.catch

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数

如果你在 then 中已经对 reject 做过处理，不会再进入 catch

```javascript
getJSON('/post/1.json').then(function(posts) {
    //...
}).catch(function() {
    console.log('发生错误', error)
})
```

上面代码中，getJSON方法返回一个Promise对象，如果该对象状态变为resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为rejected，就会调用catch方法指定的回调函数。另外，then方法指定的回调函数，如果运行抛出错误，也会被catch方法捕获。

```javascript
p.then(val => console.log('fulfilled:', val))
 .catch(err => console.log('rejected', err))

//等同于
p.then(val => console.log('fulfilled:', val))
 .then(null, err => {console.log('rejected:', err)})
```

如果Promise状态以及变成resolved，再抛出错误是无效的。因为Promise的状态一旦改变，就永久保持该状态，不会再变了。

Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止，也就是说错误总会被下一个catch语句捕获

## Promise.prototype.finally

finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。

## Promise.all 

> 面试手撕常见题

这个方法有几个特点如下

- 该方法接受一个数组，数组每一个元素都是一个 promise 对象
- 只有所有 promise 都是 onFulfilled 的时候才会执行 then 回调，并且结果顺序和数组的一致
- 如果其中一个 promise 发生了 reject 那么就会返回这个值，且失败原因是第一个失败 promise 的结果

```javascript
let t1 = new Promise((resolve,reject)=>{
    resolve("t1-success")
})
let t2 = new Promise((resolve,reject)=>{
    resolve("t2-success")
})
let t3 =Promise.reject("t3-error");
let t4 =Promise.reject("t4-error");
Promise.all([t1,t2,t3,t4]).then(res=>{
    console.log('res', res)
}).catch(error=>{
    console.log('error', error)
})
//error t3-error
```

Promse.all在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个ajax的数据回来以后才正常显示，在此之前只显示loading图标。

```javascript
let request = (time,id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`第${id}个请求${time / 1000}秒`)
      }, time)
    })
}
  
let p1 = request(3000,1)
let p2 = request(2000,2)
  
Promise.all([p1, p2]).then((result) => {
    console.log(result)       // [ '第1个请求3秒', '第2个请求2秒' ]
}).catch((error) => {
    console.log(error)
})
```

Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题。

### Promise.allSettle

Promise.all 和 Promise.allSettled 最大的不同：Promise.allSettled 永远不会被 reject



## Promise.race

Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

这个方法也有以下几个特点

- 这个方法也是接受数组，数组的元素是 promise
- 他只返回最快的那一个 promise 的值
- 就算有错误也会返回最快那一个 promise 的值，且失败原因是第一个失败 promise 的结果

```javascript
let f1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    },1000)
})
  
let f2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('failed')
    }, 500)
})
  
Promise.race([f1, f2]).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)  // 打开的是 'failed'
})
```



## 与回调函数相比，Promise的优势

首先，什么是回调地狱:

1. 多层嵌套的问题。
2. 每种任务的处理结果存在两种可能性（成功或失败），那么需要在每种任务执行结束后分别处理这两种可能性。

这两种问题在回调函数时代尤为突出。Promise 的诞生就是为了解决这两个问题。

### 解决方法

Promise 利用了三大技术手段来解决`回调地狱`:

- **回调函数延迟绑定**。
- **返回值穿透**。
- **错误冒泡**。

举个例子：

```javascript
let readFilePromise = (filename) => {
  fs.readFile(filename, (err, data) => {
    if(err) {
      reject(err);
    }else {
      resolve(data);
    }
  })
}
readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')
});
```

回调函数不是直接声明的，而是在通过后面的 then 方法传入的，即延迟传入。这就是`回调函数延迟绑定`。

然后我们做以下微调:

```javascript
let x = readFilePromise('1.json').then(data => {
  return readFilePromise('2.json')//这是返回的Promise
});
x.then(/* 内部逻辑省略 */)
```

我们会根据 then 中回调函数的传入值创建不同类型的Promise, 然后把返回的 Promise 穿透到外层, 以供后续的调用。这里的 x 指的就是内部返回的 Promise，然后在 x 后面可以依次完成链式调用。

这便是`返回值穿透`的效果。

这两种技术一起作用便可以将深层的嵌套回调写成下面的形式:

```js
js 代码解读复制代码readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
});
```

这样就显得清爽了许多，更重要的是，它更符合人的线性思维模式，开发体验也更好。

两种技术结合产生了`链式调用`的效果。

这解决的是多层嵌套的问题，那另一个问题，即每次任务执行结束后`分别处理成功和失败`的情况怎么解决的呢？

Promise 采用了`错误冒泡`的方式。其实很简单理解，我们来看看效果:

```js
js 代码解读复制代码readFilePromise('1.json').then(data => {
    return readFilePromise('2.json');
}).then(data => {
    return readFilePromise('3.json');
}).then(data => {
    return readFilePromise('4.json');
}).catch(err => {
  // xxx
})
```

这样前面产生的错误会一直向后传递，被 catch 接收到，就不用频繁地检查错误了。

### 解决效果

- 实现链式调用，解决多层嵌套问题

- 实现错误冒泡后一站式处理，解决每次任务中判断错误、增加代码混乱度的问题



## 参考资料

- [面试问到 Promise，这样回答最完美了](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484500&idx=1&sn=01d5ed1a017a09a232df19721cbbc0d4&source=41#wechat_redirect)

- [Promise 链式调用顺序引发的思考](https://juejin.im/post/5dabf847e51d4524d674881c)

- [要就来 45 道 Promise 面试题一次爽到底(1.1w 字用心整理)](https://mp.weixin.qq.com/s?__biz=Mzg3MTU4NTI3OA==&mid=2247488564&idx=1&sn=064273a79002be92454954f0973c86ce&source=41#wechat_redirect)

- [Promise 原理&宏微任务](https://juejin.cn/post/6918583585138016270)

- [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)

  
