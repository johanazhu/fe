# 手写 Promise

### 前言

> 莫要一口吃成大胖子，在这个物欲横流的社会，少反而是多

### 基本写法

```javascript
const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 500);
});
```

### 最小实现

Promise 中最重要的是 resolve 和 then

#### 构造函数

```javascript
function Promise(fn) {
    this.callbacks = [];
    // 模拟成功
    const resolve = (value) => {
        setTimeout(() => {
            this.data = value;
            // 执行回调函数数组中的所有函数
            this.callbacks.forEach((cb) => cb(value));
        });
    };
    // 当实例化时，直接执行传入的fn函数，并将resolve函数传入
    fn(resolve);
}
```

回头看案例

```javascript
const fn = (resolve) => {
    console.log('fn');
    setTimeout(() => {
        resolve(1);
    }, 500);
};

new Promise(fn);
```

> 注意：无论是 fn 还是 resolve 都是函数，因为在 JS 中函数也是对象，可以当作值来传递，所以这样的写法不奇怪

我们的手写源码中有 `fn(resolve)` ，当 `new Promise(fn)` 时，我们就已经调用了 `fn` ，并把 Promise 构造函数中的 resolve 传入。这里的例子中，执行顺序是：

-   new Promise(fn)
-   执行 fn 函数，打印 fn
-   500 毫秒后，执行 resolve(1)
-   this.data 赋值为 1，并执行 this.callbacks

#### then

```javascript
Promise.prototype.then = function (onResolved) {
    return new Promise((resolve) => {
        this.callbacks.push(() => {
            const res = onResolved(this.data);
            if (res instanceof Promise) {
                res.then(resolve);
            } else {
                resolve(res);
            }
        });
    });
};
```

回到案例

```javascript
const fn = (resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 500);
};

const promise1 = new Promise(fn);

promise1.then((res) => {
    console.log(res);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, 500);
    });
});
```

源码和案例对比着看，可以看出

-   onResolved 是 then 方法中的回调函数

-   源码第一行 `return new Promise` ，返回一个新的 Promise 实例，为什么要返回一个新的呢，因为规定说 then 要链式调用，而且 then 中的如果没有实例，就继承用上一个 Promise 实例，也就是说规则如此，所以我们必须 返回一个新的 Promise 实例

-   `return new Promise((resolve) => {...})` 其实就和上文说的 fn 是一个味道，即执行 fn 函数，这个 fn 函数中，向 this.callbacks 数组 push 匿名函数() => {const res = ...}

-   当 resolve(2)时，执行 this.callbacks 函数组成的数组。

-   如果 promise1.then() 执行后的值返回的是 promise，那么就让新的 Promise 实例再 then

-   如果是个普通值，那就执行 resolve(res)，依次执行 callbacks 里的函数

## 参考资料

-   [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
-   [【第 1738 期】100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651234151&idx=1&sn=6292156c16e851d8d5f1dbccdfc82a74&chksm=bd4946e38a3ecff561bef99277e0f1ad5ec7f7014437aa100cb01e872eee80985adb04734b11&mpshare=1&scene=1&srcid=&sharer_sharetime=1570493248167&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [最简实现 Promise，支持异步链式调用（20 行）](https://juejin.cn/post/6844904094079926286)
