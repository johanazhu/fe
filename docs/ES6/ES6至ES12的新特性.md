# ES6至ES12的新特性

## 我最常用的

ES6 的特性是使用最多的，包括类、模块化、箭头函数、函数参数默认值、模板字符串、解构赋值、延展操作符、Promise、let 与 const 等等，这部分已经是开发必备了，没什么好说的

另外还有：

-   ES7 的 `Array.prototype.includes()`
-   ES8 的 async/await 、String padding: `padStart()`和`padEnd()` 、 `Object.values()`
-   ES9 的 Rest/Spread 属性、for await of、 `Promise.finally()`
-   ES10 的 `Array.prototype.flat()` 、 `Array.prototype.flatMap()` 、String 的 `trimStart()` `trimEnd()`
-   ES11 的 `Promise.allSettled` 、空值处理及可选链
-   ES12 的逻辑赋值操作符、数字分隔符、 `Promise.any()`

## 最有用的

ES6 的特性都很有用，ES7-ES11 中，我比较感兴趣的是：

-   ES8 的 async/await
-   ES9 的 for await of
-   ES11 的 `Promise.allSettled` 、ES9 的 `Promise.finally()` 、ES12 的 `Promise.any()`
-   还有常用的逻辑操作：逻辑赋值操作符、数字分隔符、空值处理及可选链等都很大的简洁优化了我们的代码

其中，async/await 异步终极解决方案，`for await of` 异步串行，`Promise.allSettled` 解决了 `Promise.all` 的只要一个请求失败了就会抛出错误的问题，当我们一次发起多个请求时，所有结果都能返回，无论成功或失败，等等等，不了解的可以往下查找



## 空值合并运算符（??）

**空值合并运算符**（**`??`**）是一个逻辑运算符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。



## 可选链运算符（?.）

**可选链运算符**（**`?.`**）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效



## 参考资料

-   [从 ES6 到 ES10 的新特性万字大总结](https://zhuanlan.zhihu.com/p/342882092?utm_source=wechat_session&utm_medium=social&utm_oi=56197411504128)
-   [JS 之 ES7 详解](https://mp.weixin.qq.com/s/H6jUAGlkREM5SJgXc1Mjvw)
-   [盘点 ES12 中的一些新特性！](https://segmentfault.com/a/1190000041293383)
