# Async & Await

一句话：

一异步迭代器

async 是 generator 和 promise 的语法糖，利用迭代器的状态机和 promise 来进行自更新!

async 是 Generator 函数的语法糖，并对 Generator 函数进行了改进。

async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。可以说 async 是 Generator 函数的语法糖，并对 Generator 函数进行了改进。

async 函数对 Generator 函数的改进，体现在以下四点：

1. `内置执行器`。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。
2. `更好的语义`。async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
3. `更广的适用性`。co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
4. `返回值是 Promise`。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。

-   `await` 只能用在 `async` 关键词的函数中
-   `async` 函数返回一个 `Promise`
-   `async/await` 相当于封装了 `Promise`

## 参考资料

-   [async 原理解析](https://mp.weixin.qq.com/s?__biz=MjM5NTk4MDA1MA==&mid=2458073291&idx=2&sn=65b3daf551627d9e72b2a48d379f3c6a&chksm=b187aeb686f027a0b6243c6e3f3b6d86c0b0dea28e7040d997a975716ad1ed9a260abca05112&mpshare=1&scene=1&srcid=&sharer_sharetime=1583798306222&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [async/await 原理及执行顺序分析](https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484739&idx=1&sn=81b9231c68d6f7796688171922bda822&chksm=ea01662fdd76ef39825d1254d91943949626dce6aecd25cd1eaa47ad2c310036cd7855b2e5bb&mpshare=1&scene=1&srcid=&sharer_sharetime=1572996601651&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [面试官: 说说你对 async 的理解](https://mp.weixin.qq.com/s/pHg2CGZocb2-2djnF_pPBg)
