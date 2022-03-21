# let 和 const

## let 和 const

默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，而预料之外的变量的修改是很多 bug 的源头

```javascript
// bad
var foo = 'bar';

// good
let foo = 'bar';

// better
const foo = 'bar';
```

let 和 const 引起块作用域。在 ES6 之前，只有两种作用域（全局作用域和函数作用域，eval 作用域不算）。

let 和 const 不会引起变量提升，会有**暂时性死区**

这个要说到代码执行过程，分两个阶段，

-   代码预编译阶段
-   代码执行阶段

**预编译阶段是前置阶段，这个时候由编译器将 JS 代码变异成可执行的代码**

**执行阶段主要任务是执行代码，执行上下文在这个阶段全部创建完成**。

在通过语法分析，确认语法无误之后，JS 带啊在预编译阶段对变量的内存空间进行分配，我们熟悉的变量提升过程在此阶段完成。

预编译阶段应注意三点：

-   预编译阶段进行变量声明；
-   预编译阶段变量声明进行提升，但值为 undefined；
-   预编译阶段所有非表达式的函数声明进行提升

之前说到暂时性死区和“变量提升”有关，看以下代码

```javascript
function foo() {
    console.log(bar);
    var bar = 3;
}
foo();
```

会输出：`undefined` ，原因是变量 bar 在函数内进行了提升。相当于：

```javascript
function foo() {
    var bar;
    console.log(bar);
    bar = 3;
}
foo();
```

这里多说一句，这是在预编译阶段执行的“伪代码”，当 foo() 执行时，就是第二阶段，执行代码

但在这里使用 let 声明时：

```javascript
function foo() {
    console.log(bar);
    let bar = 3;
}
foo();
```

会报错：Uncaught ReferenceError: bar is not defined。

我们知道使用`let` 或 `const` 声明变量，会针对这个变量形成一个封闭的块级作用域，在这个会计作用域当中，如果在声明变量钱访问该变量，就会报 `referenceError` 错误；如果在声明变量后访问，则可以正常获取变量值：

```javascript
function foo() {
    let bar = 3;
    console.log(bar);
}
foo();
```

正常输出 3。因此在相应花括号形成的作用域中，存在一个“死区”，起始于函数开头，终止与相关变量声明的一行。在这个范围内无法访问 let 或 const 声明的变量。这个“死区”的专业名称为：TDZ （Temporal Dead Zone）

块级作用域和暂时性死区。

之前的 var 变量，会有变量提升的概念。即你在任何处用 var 定义变量，一开始 js 引擎会将其变量置位顶部（以 `undefined` 的形式，再执行到赋值时，再赋值）

但是用 let、const 声明的变量，则不会有变量提升的概念，在定义 let 之前，不能调用 let 声明的变量，不然会报错，在块级作用域的开始到 let 声明的前一行，这块区域被称为`暂时性死区`

变量提升和暂时性死区

var 会变量提升

function 会函数提升

函数提升的优先级大于变量提升

let、const 会引起暂时性死区

为什么？

因为

变量提升和暂时性死区算 feature(特性)还是 bug

ES6 规定，let/const 命令会使区块形成封闭的作用域。如在声明之前使用变量，就会报错。

总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。

这在语法上，称为“**暂时性死区**”（temporal dead zone，简称 TDZ）

也就是说由 let、const 声明的变量，在使用之前，这些变量都是不可用的

var 声明的会在预编译阶段进行变量提升，并且赋值 undefined

非表达式的函数也会进行函数声明，它的优先级大于 var

阮一峰：

> ES6 规定暂时性死区和`let`、`const`语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

作用域

​

代码提升是在预编译阶段进行，而代码执行阶段

预编译阶段会做三件事

​ 变量声明

​ 变量声明并进行提升，但是值为 undefined

​ 所有非表达式的函数声明进行提升（函数声明）

![image-20210604173150466](https://i.loli.net/2021/06/04/9uaTpg7C3l8XxNb.png)

1. 当脚本开始运行，词法环境预先填充了所有的变量
    - 最初，它们处于“未初始化（Uninitiallized）”状态。这是一种特殊的内部状态，这意味着引擎知道变量，但是在用 `let` 声明前，不能引用它。几乎就像变量不存在一样。
2. 然后 `let phrase` 定义出现了。它尚未被赋值，因此它的值为 `undefined` 。从这一刻起，我们就可以使用变量了。

第一个阶段，就是暂时性死区

## 参考资料

-   [闭包](https://zh.javascript.info/closure)
-   [ES6 之 let（理解闭包）和 const 命令](https://www.cnblogs.com/zhuzhenwei918/p/6131345.html)
-   [我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)
