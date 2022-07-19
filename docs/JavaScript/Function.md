# 函数是一等公民

## 前言

函数是一等公民，在 JavaScript 中，它就是皇

函数中牵扯的内容太多，比如 this、（词法）作用域、作用域链、原型、原型链、闭包、立即执行函数。柯里化...

函数的概念：执行一个明确的动作并提供一个返回值的独立代码块。函数可以接受作为值传递给它的**参数（arguments）**，函数可以被用来提供**返回值（return value）**，也可以通过**调用（invoking）**被多次执行

函数是代码语句的容器，可以使用圆括号操作符`()`来调用。调用函数时，参数可以在圆括号内传递，以便函数中的语句可以访问这些特定值

有两种创建函数的写法

```javascript
// new 写法
var funcA = new Function('num1', 'num2', 'return num1 + num2');
// 字面量写法，更常用
var funcB = function (num1, num2) {
    return num1 + num2;
};
// 无论哪一种，都实例化了函数
// 函数在对象中的别名叫方法
```

函数可用于返回值、构建对象，或者作为一种机制简单运行代码。JavaScript 的函数有很多种用途，但从最基本的形式来说，函数只是可执行语句的唯一作用域

### 属性和方法

函数对象具有以下属性（不包括继承的属性和方法）

**属性**（如 Function.prototypes）

-   prototype

## 对象实例属性和方法

函数对象实例拥有以下属性和方法

**实例属性**

-   arguments
-   constructor
-   length

**实例方法**

-   apply()
-   call()
-   toString()

## 函数是“一等公民”（不仅语法，还有值）

在 JavaScript 中，函数是对象。这意味着函数可以存储在一个变量、数组或对象中。同时，函数可以传递给函数，并由函数返回。函数拥有属性，因为它是一个对象。所有这些因素使函数在 JavaScript 中成为 “一等公民”。补充一点，**因为函数的本质作用是执行代码，它创造了函数作用域。**

```javascript
// 1. 函数可以保存在变量(funcA)、数组(funcB)和对象中(funcC)
var funcA = function () {}; // 调用方法: funcA()
var funcB = [function () {}]; // 调用方法: funcB[0]()
var funcC = { method: function () {} }; // funcC.method()

///2. 函数可以作为参数传递，也可以作为返回值返回
var funcD = function (func) {
    return func;
};
var runFuncPassedToFuncD = funcD(function () {
    console.log('转');
});

runFuncPassedToFuncD(); // 转

///3. 函数是对象，也就意味着函数也拥有属性
var funcE = function () {};
funcE.answer = 'bingo'; // 实例化属性
console.log(funcE.answer); // bingo

// 4. 函数作用域
var str = 'elaine';
function funcF() {
    var funcStr = 'johan';
    console.log(str); // elaine
}
console.log(funcStr); // funcStr is not defined
// 作用域：函数内能访问函数外变量，函数外不能调用函数内的变量
```

## this 和 arguments 适用于所有函数

在所有函数的作用域/函数体内，`this` 和 `arguments` 值都是可用的

`arguments` 是类数组对象，它包含所有传递给函数的参数。

```javascript
var add = function () {
    return arguments[0] + arguments[1];
};
console.log(add(1, 1)); // 2
```

传递给所有函数的 this 关键字都是对包含函数的对象的引用。换句话说，**谁引用它，this 就指向谁。**

当函数在全局作用域中定义时， this 值就是全局对象。具体讲 `this` 的内容我们下一节再讲

```javascript
var myObj = {
    name: 'elaine',
    method: function () {
        console.log(this);
    },
};
myObj.method(); // myObj 谁调用它，this指向谁。myObj调用它，this指向它

var myObj2 = function () {
    console.log(this);
};
myObj2(); // window
```

## 定义函数

函数的定义由三种不同的方式： 函数构造函数、函数语句和函数表达式

```javascript
// 函数构造函数：最后一个参数为函数逻辑，之前的都时参数
var add = new Function('x', 'y', 'return x + y');

// 函数声明
function add2(x, y) {
    return x + y;
}
// 函数表达式
var add3 = function (x, y) {
    return x + y;
};
```

## 调用函数

使用 6 种不同的场景调用函数

-   作为函数
-   作为方法
-   作为构造函数
-   使用 apply() 或者 call()
-   自调用

```javascript
// 函数模式
var myFuntion = function () {
    return 'foo';
};
console.log(myFunction1); // foo

// 方法模式
var myObject = {
    myFunction: function () {
        return 'bar';
    },
};
console.log(myObject.myFunction()); // bar

// 构造函数模式
function Cody() {
    this.living = true;
    this.age = 26;
    this.gender = 'female';
    this.getGender = function () {
        return this.gender;
    };
}
var cody = new Cody(); // 调用构造函数
console.log(cody);

// apply() 和 call() 模式
// 随便一说： apply() 方法接受 一个包含多个参数的数组
// call() 方法接受 一个参数列表
var myObj = {
    sayHello: function () {
        console.log(this.name, arguments[0], arguments[1]);
    },
};
var johan = { name: 'johan' };
var elaine = { name: 'elaine' };

// 在 johan 对象上调用 sayHello
myObj.sayHello.call(johan, 'foo', 'bar'); // johan, foo, bar

myObj.sayHello.apply(elaine, ['foo', 'bar']); // elaine, foo, bar

// 无论用call() 还是apply(), 意思都是在说this指向我或者说我来调用
// johan 调用 myObj.sayHello 方法，
// elaine 调用 myObj.sayHello 方法
```

看出来为什么说 `Fucntion` 是 JavaScript 的”皇“了吧，关用它就有 6 种方法，便利即王道

## 匿名函数

匿名函数是一种没有给出标识符的函数。

匿名函数主要用于将函数作为参数传递给另一个函数

```javascript
// 创建一个函数来执行匿名函数
var sayHi = function (f) {
    // 函数表达式
    f(); // 调用匿名函数
};
// 将匿名函数作为参数传递
sayHi(function () {
    console.log('hi');
}); // hi
```

## 自调用的函数表达式

通过圆括号操作符，可以在定义函数表达式后立即执行该函数表达式（除了由 Function()构造函数创建的函数）

```javascript
var sayHello = (function () {
    console.log('hello,world');
})(); // hello, world
```

这里要多说一句

```javascript
var myFunction = function () {
    console.log('hello,world');
};
// myFunction 是函数表达式
// 让函数表达式执行代码，只需要 myFunction()
myFunction();
// 结合到一起就是
var myFunction = (function () {
    console.log('hello,world');
})();
// 这就是自调用的函数表达式
```

## 自调用的匿名函数语句

```javascript
// 最经常使用的匿名函数
(function (msg) {
    console.loh(msg);
})('Hi')(
    // 看起啦有点不一样，但效果一样
    (function (msg) {
        console.log(msg);
    })('Hi'),
);

// 更简短的方式
!(function sayHi(msg) {
    console.log(msg);
})('Hi');
```

如果要立即调用函数，需要使用函数外面的圆括号（或任何将函数转换为表达式的符号）

我们从 Function() 是什么，介绍到它能做什么？解释了它为什么是 JavaScript 中的皇，并且我们知道了各个特征。但是这还不够，我们没有对 this 关键字，作用域，原型以及闭包等一些难点做分析，接下来让我们走进 `this` 关键字的时候，来看一看让人头疼的 this

## 衍生阅读

-   [JAVASCRIPT FUNCTIONS](https://www.zoo.team/article/javascript-functions)
