# Promise 面试题





## 题目一

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

<details>
    <summary>答案</summary>
    1 2 6 4 3 5
</details>

分析：

首先 async1 、async2 是函数，所以它不会自己执行，只有等调用它的时候才会执行

在倒数第二行时执行 async1 ，所以执行 1 最开始打印出来

然后  `const result = await async2()`，从理解上讲，await 是返回 promise，async2 是同步执行，意思是说执行 async2，碰到 await 将其结果放到微任务队列中等待

所以2 第二个打印

接着就是 6 ，同步执行

然后同步执行完，从微任务队列中，以上代码，遇到then 就往微任务队列中塞，所以 4 是第一个入栈的，其次才是 async2 的 结果，所以是 4、3

最后微任务队列执行完毕，寻找下一个宏任务，也就是 setTimeout，打印 5

## 题目二

```javascript
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    return new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
    .then(() => {
    	console.log("内部第一个then");
    })
    .then(() => {
    	console.log("内部第二个then");
    });
  })
  .then(() => {
    console.log("外部第二个then");
  });
```

<details>
    <summary>答案</summary>
    外部promise、外部第一个then、内部promise、内部第一个then、内部第二个then、外部第二个then
</details>

分析：

关键在于一点：外部第一个 then 中 return 了一个 Promise，这个 return，意味着外部第二个 then 的执行需要等待 return 之后的结果，所以要先执行完内部两个 then 之后，再执行外部第二个 then



### 演变一

```javascript
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
```

<details>
    <summary>答案</summary>
    外部promise、外部第一个then、内部promise、内部第一个then、外部第二个then、内部第二个then
</details>

分析：

与第二题的区别在于外部第一个then中没有 **return Promise**

首先，我们知道执行 then 方法是同步的，而 then 中的回调是异步的

```javascript
new Promise((resolve, reject) => {
    resolve();
    console.log(1111);
})
.then(() => {
    consle.log(2222);
})
// 先 1111（同步），后 2222（微任务）
```

简单来说，then 的方法就是将它放入微任务队列中

当 then 中没有resolve 函数时，取而代之只要 then 中回调的代码执行完毕并**获得同步返回值**，这个 then 返回的 promise 就算被 resolve

同步返回值的意思换句话说

1. 如果 then 中的回调返回了一个 prosmie，那么 then 返回的 promise 会等待这个 promise 被 resolve 后，再往微任务队列推入一个任务，而这个任务的作用是 resolve 包裹这个回调的 then 方法返回的 promise
2. 若回调返回值非 promise，则直接 resolve ，不会有前面的额外逻辑

所以 `演变一` 是这样的一个过程：

1. 同步执行`外部promise`，
   - 发现外部 Promise 被创建并且立即执行（resolve()）
   - 这触发外部第一个 then 的回调，该回调将其加入到微任务队列中
2. 处理外部第一个then
   - 宏任务执行完毕后，开始执行微任务
   - 执行外部第一个 then，输出 "外部第一个then"
3. 创建内部 promise
   - 在外部第一个 then 的回调，创建新的 Promise
   - 立即输出"内部promise" 
   - 然后调用 `resolve()`，外部第一个then 返回的 promise 的状态由 pedding 变为 resolved
   - **同时遍历之前通过 then 给这个 promise 注册的所有回调，将它们的回调放入微任务队列中**
   - 所以内部第一个 then 的回调以及外部第二个 then 的回调都放入了微任务队列中
4. 处理内部第一个 then：
   - 内部第一个 then 的回调就近先执行，输出“内部第一个then”
   - 当内部第一个 then 的回调执行后，意味着内部第一个 then 返回的 promise 由 pending 变为 resolved
   - **同时遍历之前通过 then 给这个 promise 注册的所有回调，将它们的回调放入微任务队列中**
   - 此时微任务队列里有，外部第二个 then 的回调和内部第二个 then 的回调
5. 处理外部第二个 then：
   - 依次执行微任务队列，执行外部第二个 then，输出“外部第二个then”
   - 外部第二个 then 的回调执行后，意味着外部第二个 then 返回的 promise 由 pending 变为 resolved
   - **同时遍历之前通过 then 给这个 promise 注册的所有回调，将它们的回调放入微任务队列中**
   - 而外部第二个 then 返回的 promise 没有链式调用了，于是微任务队列中只剩下内部第二个 then 的回调
6. 处理内部第二个 then：
   - 接着从微任务队列取出内部第二个 then 的回调，执行
   - 同上文一样的逻辑，执行输出“内部第二个then”

### 演变二

```javascript
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    let p = new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
    p.then(() => {
        console.log("内部第一个then");
      })
    p.then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
```

<details>
    <summary>答案</summary>
    外部promise、外部第一个then、内部promise、内部第一个then、内部第二个then、外部第二个then
</details>

分析：

不再是链式调用，而是赋值调用

这里在执行内部的 new Promise 的 resolve 执行完成之后，new Promise 之后的两个同步 p.then 是两个执行代码语句，都是同步执行，自然会同步注册完

两种方式的区别是：

- 链式调用的注册是前后依赖的，比如上文中的外部第二个 then 的注册，是需要外部的第一个的 then 的执行
- 赋值调用，注册都是同步的，比如这里的 p.then 和 `var p = new Promise` 都是同步调用



### 演变三

```javascript
let p = new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
p.then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
p.then(() => {
    console.log("外部第二个then");
  });
```

<details>
    <summary>答案</summary>
    外部promise、外部第一个then、内部promise、外部第二个then、内部第一个then、内部第二个then
</details>

分析：

外部的注册采用了非链式调用的写法，外部代码的 p.then 是并列同步注册

所以代码在内部的 new Promise 执行完，p.then 就都同步注册完了

你可能会说内部第一个 then 不是也是同步执行吗，对它是同步执行



### 核心思想

Promise 的 then 的注册和执行是分裂的

注册：是完全遵循 JS 的代码的执行过程

执行：先同步，再微任务，再宏任务



## 题目三

```javascript
setTimeout(function () {
    console.log('外部setTimeout1');
}, 0);
new Promise(function (resolve) {
    console.log('promise1');
    setTimeout(function () {
        console.log('内部setTimeout');
        resolve();
    }, 0);
}).then(() => console.log('then'));

setTimeout(function () {
    console.log('外部setTimeout2');
}, 0);
```

<details>
    <summary>答案</summary>
    promise1、外部setTimeout1、内部setTimeout、then、外部setTimeout2
</details>

分析：

经过第二题的洗刷，第三题显得格外的可爱

首先遇到第一个定时器（setTimeout），将其塞入宏任务队列

`new Promise` 同步执行，首先打印“promose1”，又遇到一个定时器（setTimeout），将其塞入宏任务队列中

它又是链式调用了 then，那么就把它加入到第二个宏任务的微任务队列中

最后遇到了第三个定时器（setTimeout）

先执行第一个定时器，第一个执行完，执行第二个，第二个执行完后，要先看一下微任务中是否有任务，如果有则执行，如果没有，则进行下一个宏任务，发现有，那么执行输出“then”

最后执行第三个定时器回调

OVER



## 题目四

```javascript
async function async1() { 
	console.log('async1 start') 
	await async2() 
	console.log('async1 end') 
} 
async function async2() { 
	console.log('async2') 
} 
console.log('script start')
setTimeout(function () { 
	console.log('settimeout') 
}) 
async1()
new Promise(function (resolve) {
	console.log('promise1') 
    resolve()
}).then(function () { 
	console.log('promise2') 
}) 
console.log('script end')
```

<details>
    <summary>答案</summary>
    script start、async1 start、async2、promise1、script end、async1 end、promise2、settimeout
</details>

分析：

函数声明不执行代码，所以最开始打印“script start”

遇到定时器（setTimeout），将其放入宏任务队列

遇到 `async1()` 调用，执行它，打印“async1 start”

遇到 `async2()` 调用，执行它，打印“async2”

但是因为有 await，将其结果（我也不确定是不是结果）放入微任务队列

遇到 Promise 实例，同步执行，打印“promise1”，因为调用 `resolve()` ，所以将其 then 中的回调放入微任务队列中

最后遇到console，打印“script end”

接着按照事件循环机制，先检查微任务队列

执行 await 后，打印 “async1 end”

接着继续执行微任务队列中的第二个任务，即 then 的回调函数，打印 “promise2”

微任务队列为空，查看宏任务队列中是否有任务

发现有个定时器任务，执行，打印“settimeout”

## 题目五

```javascript
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then((e) => {
  console.log(e);
})
Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() => {
  console.log(6);
})
```

<details>
    <summary>答案</summary>
    0、1、2、3、4、5、6
</details>

分析：留作悬念，待有缘人作答





## 参考资料

-   [Promise 链式调用顺序引发的思考](https://juejin.cn/post/6844903972008886279)

-   [关于一道经典 Promise 面试题的思考](https://juejin.cn/post/6978001532717367304)

-   [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
