# 模拟题三



## 1. CSS：如何实现垂直居中？

考察点：div 居中

分三种情况，水平居中，垂直居中，水平垂直居中

单水平居中而言，居中元素不定宽高
absolute+transform
flex 属性居中
flex + 子项 margin auto
grid 属性居中
grid 子项 margin auto
grid 子项属性居中
-webkit-box 属性居中
table-cell + text-align
line-height + text-align
writeing-mode
table
居中元素需定宽高
须知宽高+absolute+负 margin
须知宽高+absolute+calc
须知宽高+absolute+margin auto
局限性较大的全局居中
须知宽高+fixed+transform
须知宽高+fixed+负 margin
须知宽高+fixed+calc
须知宽高+fixed+margin auto





## 2. 手写 New 操作符

new 操作符具体做了什么

考察点：new 操作符

在内存中创建一个新对象
这个新对象的[[prototype]] 指向被赋值为构造函数的 prototype 属性
构造函数内部的 this 被赋值为这个新对象
执行构造函数内部的代码
如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象



## 3. 事件循环

浏览器的事件循环，先正常运行代码（即它身处宏任务中），遇到宏任务放入宏任务队列，遇到微任务放入微任务队列。当代码执行完毕，依次执行微任务队列中的微任务，执行完毕后再从宏任务队列队头初拿出一宏任务，再执行，以此循环往复

考察点：事件模型
事件流：
IE：目标-冒泡
Netscape 早期：捕获-目标
DOM：捕获-目标-冒泡



考察点：事件循环机制

正常执行代码，遇到宏任务塞入宏任务队列， 遇到微任务，塞入微任务队列。正常代码执行完毕，先执行全部的微任务，再去从宏任务队列中拿出一个执行它，如遇到微任务再塞入微任务队列，遇到宏任务再塞入宏任务队列，执行完毕再从宏任务队列中获取，以此往复







## 4.迭代器和生成器

考察点： generator 原理

迭代器是 iterator
生成器是 generator

生成器
yield 生成一个断点
next 继续执行

## 5. Diff算法





## 6. 为什么有时 react 两次 setState，只执行了一次

考察点：批处理



## 7. 错误捕获

js 代码异常

try catch

window.error

资源加载错误

window.addEventListen("error", callback)

Promise 错误

window.addEventListen("unhandlerejectedtion")

React 错误

错误捕获

static getDerviedStateFromProps componentDidCatch



## 7.微前端的沙箱机制是怎么实现的？ 







## 9.十万条数据如何优化

虚拟列表，10000 条数据 插入不卡的那种

解决方案





## 10. 算法题：反转链表 ⭐

考察点：
