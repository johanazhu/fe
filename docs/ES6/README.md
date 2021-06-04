# ES6导航





其中大多数知识可以从 阮一峰先生的 E6 和 XXX 和 一个狠人的 和 你不知道的JAVASCRIPT 中获取知识，以下为本人的知识了解

## let和const

默认使用const，只有当确实需要改变变量的值的时候才使用let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量的修改是很多 bug 的源头

```javascript
// bad
var foo = 'bar'

// good
let foo = 'bar'

// better 
const foo = 'bar'
```

let 和 const 引起块作用域。在ES6之前，只有两种作用域（全局作用域和函数作用域，eval作用域不算）。

let 和 const 不会引起变量提升，会有**暂时性死区**

这个要说到代码执行过程，分两个阶段，

- 代码预编译阶段
- 代码执行阶段

**预编译阶段是前置阶段，这个时候由编译器将 JS 代码变异成可执行的代码**

**执行阶段主要任务是执行代码，执行上下文在这个阶段全部创建完成**。

在通过语法分析，确认语法无误之后，JS 带啊在预编译阶段对变量的内存空间进行分配，我们熟悉的变量提升过程在此阶段完成。

预编译阶段应注意三点：

- 预编译阶段进行变量声明；
- 预编译阶段变量声明进行提升，但值为 undefined；
- 预编译阶段所有非表达式的函数声明进行提升

之前说到暂时性死区和“变量提升”有关，看以下代码

```javascript
function foo(){
    console.log(bar)
    var bar = 3
}
foo()
```

会输出：`undefined` ，原因是变量 bar 在函数内进行了提升。相当于：

```javascript
function foo() {
    var bar
    console.log(bar)
    bar = 3
}
foo()
```

这里多说一句，这是在预编译阶段执行的“伪代码”，当 foo() 执行时，就是第二阶段，执行代码

但在这里使用 let 声明时：

```javascript
function foo() {
    console.log(bar)
    let bar = 3
}
foo()
```

 会报错：Uncaught ReferenceError: bar is not defined。 

我们知道使用`let` 或 `const` 声明变量，会针对这个变量形成一个封闭的块级作用域，在这个会计作用域当中，如果在声明变量钱访问该变量，就会报 `referenceError` 错误；如果在声明变量后访问，则可以正常获取变量值：

```javascript
function foo() {
    let bar = 3
    console.log(bar)
}
foo()
```

正常输出3。因此在相应花括号形成的作用域中，存在一个“死区”，起始于函数开头，终止与相关变量声明的一行。在这个范围内无法访问 let 或 const 声明的变量。这个“死区”的专业名称为：TDZ （Temporal Dead Zone） 

https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a9a3ccb24267c1d01960





## 模板字符串

需要拼接字符串的时候尽量改成模板字符串：

```javascript
// bad
const foo = 'this is a' + example

// good
const foo = `this is a ${example}`;
```



### 箭头函数

​	箭头函数中的this，就是声明函数时所处上下文中的this，它不会被其他方式所改变

### Symbol

### Set 和 Map

### 解构赋值

### 展开运算符

​	使用...来表示展开运算符，它可以展开数组/对象



ES6+ 的必考集合，你都会了吗？

https://mp.weixin.qq.com/s/yaDMqup7Ut_5ial4oAQBDA



https://juejin.im/post/5bfe05505188252098022400



前言：

1.这里的“ES6”泛指 ES5 之后的新语法





1.5万字概括 ES6 全部特性

https://juejin.im/post/5d9bf530518825427b27639d#heading-21



ES6 你可能不知道的事 - 进阶篇

https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046817&idx=1&sn=ee4af07eed742d0df9dbad676c6f9e84&chksm=87c418b1b0b391a79f27f3db6abc46c05fe8d993d98bb12e68823b96e92f34bfc84f21667e03&mpshare=1&scene=1&srcid=&sharer_sharetime=1585194801642&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd