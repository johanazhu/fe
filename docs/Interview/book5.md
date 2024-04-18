# 模拟题五





## 1.CSS 选择器有哪些

考察点：CSS 选择器
id 选择器、class 选择器、标签选择器、通用选择器、属性选择器、相连选择器、子选择器、后代选择器、伪类选择器



## 2.实现一个 promise

考察点：promise 原理



## 3. 作用域

谈下你的作用域的理解

考察点：作用域
js 的作用域是词法作用域，其特点是在那里定义它就作用在那里，与定义位置有关而与调用位置无关
作用域分为全局作用域、函数作用域、块级作用域
全局作用域顾名思义，全局中只有一个
函数作用域只作用于函数中，函数内的变量函数外不能调用。
块级作用域仅在 let、const 声明时才会形成
因为函数作用域的特点使得作用域有链状，即作用域链
作用域又有闭包的产生



## 4.Es Module 和 CommonJs

类似问题：前端模块化机制有哪些

考察点：模块化历程 

顺序：commonJS-ADM/CMD-ES6

ES6 import 模块引入 ESModule

node commonJS

AMD 使用 requireJS 来编写模块化，依赖必须提前申明好；推崇返回值的方式对外输出

CMD 玉伯提出，使用 seajs 来编写模块化，支持动态引入依赖，推崇通过给 module.exports 赋值的方式对外输出

CommonJS 与 ES6 模块的区别？

CommonJS 输出的是一个值的拷贝，ES6 模块输出的是值的引用

CommonJS 模块是运行时加载，ES6 模块是编译时输出接口







## 5.useCallback和useRefs区别



## 6. React 如何处理异常？

考察点：异常处理

Error Boundaries 错误边界，两个生命周期
static getDerviedStateFromError，展示错误 UI
componentDidCatch，上报错误日志

其他的异常处理
try catch：捕获预见错误，捕获不到具体的语法错误和异步错误
window.error：能捕获意料之外的语法错误，但捕获不到资源加载错误和接口异常
window.addEventListener('error')：捕获资源加载错误
window.addEvent('onhandledrejection')：捕获 promise 错误



js 代码错误。try catch 只能针对已知错误
window.addEventListener('error') 资源加载错误不可捕获，promise 错误不可捕获
window.addEventListener('handleRejection') 捕获 promise 错误
React 方面
Error Boundying 错误捕获组件
static XXX 渲染错误 UI
componentDidCatch 上报错误日志

## 8.html缓存了怎么更新，js和css缓存是怎么更新的



## 9.进程和线程的区别

考察点：进程和线程
进程是一个应用起来的实例，线城是运行在进程中的最小单位

7. tcp 滑动窗口是什么

考察点：tcp

## 10. 算法题：无重复字符的最长子串

考察点：无重复字符的最长子串
