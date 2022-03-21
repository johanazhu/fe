# Promise 面试题

### 题目一

```javascript
async function async1() {
    console.log(1);
    const result = await async2();
    console.log(3);
}

async function async2() {
    console.log(2);
}

Promise.resolve().then(() => {
    console.log(4);
});

setTimeout(() => {
    console.log(5);
});

async1();
console.log(6);
```

### 题目二

```javascript
new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
})
    .then(() => {
        console.log('then11');
        new Promise((resolve, reject) => {
            console.log('promise2');
            resolve();
        })
            .then(() => {
                console.log('then21');
            })
            .then(() => {
                console.log('then23');
            });
    })
    .then(() => {
        console.log('then12');
    });
```

<details>
    <summary>答案</summary>
    promise1、then11、promise2、then21、then12
</details>

### 分析：

promise 能够链式调用的原理，即

promise 的 then/catch 方法执行后也会返回一个 promise

> 当一个 promise 被 resolve 时，会遍历之前通过 then 给这个 promise 注册的所有回调，将它们一次放入微任务队列中

如何理解：

```javascript
let p = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
});
p.then(() => {
    console.log('log: 外部第一个then');
});
p.then(() => {
    console.log('log: 外部第二个then');
});
p.then(() => {
    console.log('log: 外部第三个then');
});
```

按顺序执行，先看到 new Prmose 中的 setTimeout，把它放入宏任务中，往下执行，看到 then，脑子里想到的是是否被 resolve/reject 了，因为只有被执行成功/失败了，才会执行 then 中的回调函数。

题目中 1 秒后变量 p 才会被 resolve，但是在 resolve 前通过 then 方法给它注册了 3 个回调，此时这 3 个回调不会被执行，也不会被放入微任务队列中，它们会被 p 内部存储起来（再手写 promise 时，这些回调会放在 promise 内部保存的数组中），等到 p 被 resolve 后，依次将 3 个回调推入微任务队列， 此时如果没有同步任务就会逐个取出再执行

**then 方法即不会触发回调，也不会将它放到微任务，then 只负责注册回调，由 resolve 将注册的回到放入微任务队列，由事件循环将其取出并执行**

### 面试题

```javascript
new Promise((resolve, reject) => {
    console.log('log: 外部promise');
    resolve();
})
    .then(() => {
        console.log('log: 外部第一个then');
        new Promise((resolve, reject) => {
            console.log('log: 内部promise');
            resolve();
        })
            .then(() => {
                console.log('log: 内部第一个then');
            })
            .then(() => {
                console.log('log: 内部第二个then');
            });
    })
    .then(() => {
        console.log('log: 外部第二个then');
    });
```

#### 结论一

当执行 then 方法时，如果前面的 promise 已经是 resolved 状态，则直接将回调放入微任务队列中

### 面试 3

```javascript
const myPromise = (val) => Promise.resolve(val);
const delay = (duration) => {
    /**/
};
myPromise(`hello`)
    .then(delay(1000))
    .then((val) => console.log(val));
// 写出 delay 函数
```

```javascript
const delay = (duration) => {
    return (val) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(val);
            }, duration);
        });
};
```

### 题目 4

```md
想做到的是，每过一秒，分别打印:
this is 0
this is 1
this is 2
~
this is 8

下面的代码结果是过一秒后全部执行。

是不是哪里写的不对呢，多谢指教

var jobs = [];

for(let i = 0; i < 8; i++) {
jobs.push(async function(){
setTimeout(function(){
console.log("this is " + i)
},1000)
});
}

(async function () {
for (const job of jobs) {
await job()
}

})();
```

promise 题目我不会做

https://www.v2ex.com/t/810025#reply13

## 参考资料

-   [Promise 链式调用顺序引发的思考](https://juejin.cn/post/6844903972008886279)

-   [关于一道经典 Promise 面试题的思考](https://juejin.cn/post/6978001532717367304)
