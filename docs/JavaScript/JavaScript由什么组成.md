# JavaScript 由什么组成

这是一个基础结构问题，一个完整的 JavaScript 包括：ECMAScript 、文档对象模型（DOM）、浏览器对象模型（BOM），本章讲解 ECMAScript 。如果对 DOM 感兴趣，请移步——[DOM](../Browser/DOM.md) 。如果对 BOM 感兴趣，请移步——[BOM](../Browser/BOM.md)。

[ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript) 规定这门语言由以下组成：

1.  语法
2.  变量和数据类型
3.  关键字和保留字
4.  操作符
5.  语句
6.  对象

也就是说，这六大模块组成了这门语言

这六大支柱中，像「语法」、「变量」和「数据类型」、「关键字」和「保留字」、「操作符」、「语句」都是极好理解的，只「对象」有点复杂，下节会对其进行说明，这里我们来看看「数据类型」

## 数据类型

JavaScript 的数据类型分为「基本类型」和 「引用类型」

基本类型在不同的书（教程中）叫法不同，它同样被叫做基本类型/值类型/原始值/原始类型。当然引用类型也有不一样的叫法，如对象类型/复杂类型

基本类型包含 undefined 、null、string、number、boolean、symbol（ES6 新增）、bigint（ES10新增）

引用类型则是 object（一组属性的集合）

> 特此说明：
>
> 在《JavaScript 高级程序设计第四版》中曾把数据类型归纳为驼峰形式的Undefined、Null、Boolean、Number、String 、 Symbol、BigInt、Object，而在网站[现代 JavaScript 教程](https://zh.javascript.info/types)、[MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)中则以小写的形式展示展示数据类型，笔者这里以网站为更大依据

## 基本类型和引用类型的区别

**基本类型储存在栈内存中**

**引用类型储存在堆内存中**

基本类型花销的内存小，所以拷贝值

引用类型花销的内存大，所以拷贝引用地址

![类型存储](https://s2.loli.net/2022/08/17/xh5w8ld4BHEWsTO.png)

```javascript
// 案例1
var string1 = 'foo';
var string2 = string1;
string1 = 'bar';
console.log(string1, string2); // 输出 bar, foo

// 案例2
var object1 = {
    name: 'johan',
    age: 23,
};
var object2 = object1;
object1.name = 'elaine';
object2.age = 22;
console.log(object1, object2);
// 输出 { name: 'elaine', age: 22 } { name: 'elaine', age: 22 }
```

因为基本类型是存放在栈内存中，string1 赋值给 string2 后，相当于开了一个独立空间给 string2，string1 和 string2 是完全独立的两个个体，再给 string1 赋值什么，都与 string2 无关

而引用类型之所以叫引用类型（或叫复杂类型/复杂值），因为对象的地址是引用的，Object 可以一直嵌套，Function 也可以嵌套很多很多层（回调函数），Array 可以变花样的做出三维数组之类，总之，对象值可以无限大。值越大，就越占内存，如果一个很大的值随意复制，那对使用者来说就是灾难（不知不觉中就占了很大的内存）。所以它不可能随意复制，而是用指针的方式来将对象指向同一个地址（这里可以衍生到[拷贝的秘密](./拷贝的秘密.md)）

当你创建一个 object1，就在堆内存中开辟一个内存。如果你赋值给 object2，其实就是把 object1 指向堆内存的地址复制给 object2，它们指向的是同一个地址。再在 object1 或者 object2 做修改的话，相当于在同一内存上做修改，无论 object1 修改还是 object2 修改都会改变

```javascript
var obj1 = {};
var obj2 = obj1;
obj1.name = 'elaine';
obj2.age = 23;
console.log(obj1); // { name: 'elaine', age: 22};
console.log(obj2); // { name: 'elaine', age: 22};
```

> 衍生思考：虽然说 JavaScript 的动态性很是方便，但是如果一些新手修改了对象类型的值而不告知，那么就成了灾难。因为动态性+全局作用域，所有变量命名就成了问题，所以一般的库都是用IIFE、闭包等方法破局，再后面就有了模块化（ES module）的概念，其本质是为了解决变量命名、语言动态性的问题

光知道 JavaScript 的数据类型不够，如何更准确的知道每个数据类型

判断数据类型的方式有四种

-   使用 typeof
-   使用 instanceof
-   使用 constructor
-   使用 Object.prototype.toString.call()

## 类型判断

### typeof 操作符

作用：返回正在使用的值的基本类型

```javascript
// 基本类型/值类型/原始值/原始类型	
var null1 = null;
var undefined1 = undefined;
var string1 = 'foo';
var number1 = Number('10');
var boolean1 = Boolean('true');
var symbol1 = Symbol('foo');
console.log(typeof null1); // object, 需要注意
console.log(typeof undefined1); // undefined
console.log(typeof string1); // string
console.log(typeof number1); // number
console.log(typeof boolean1); // boolean
console.log(typeof symbol1); // symbol

// 引用类型/复杂值
var myString = new String('male');
var myNumber = new Number(23);
var myBoolean = new Boolean(false);
var myObject = new Object();
var myArray = new Array('foo', 'bar');
var myFunction = new Function('x', 'y', 'return x * y');
var myDate = new Date();
var myRegExp = new RegExp('\\bt[a-z]+\\b');
var myError = new Error('error');

console.log(typeof myString); // 输出 object
console.log(typeof myNumber); // 输出 object
console.log(typeof myBoolean); // 输出 object
console.log(typeof myObject); // 输出 object
console.log(typeof myArray); // 输出 object
console.log(typeof myFunction); // 输出 function 需要注意
console.log(typeof myDate); // 输出 object
console.log(typeof myRegExp); // 输出 object
console.log(typeof myError); // 输出 object
```

> 提示：typeof xxx 和 typeof(xxx) 一个意思

通过 `typeof` 操作符能判断出使用的值的类型。需要注意判断引用类型时的问题

1. null 类型会返回 object
2. new Function，返回的是 function

随便一说，这也是我们看很多源码或者自己写代码时常用 typeof 来判断 function 类型

```javascript
if (typeof XXX === 'function') {
    // 如果XXX是function的话做什么操作
}
```

> PS：《JavaScript 启示录》里第一章第八节里说 RegExp() 的类型返回的是 function，但是笔者检验后发现并不是，笔者猜测因为老版本的浏览器对 RegExp 的判断为 funtion，而笔者用 Chrome 浏览器表示 RegExp 的类型为 object

### instanceof 运算符

`instanceof ` 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

```javascript
function People(name, age) {
    this.name = name;
    this.age = age;
}

const elaine = new People('elaine', 23);
console.log(elaine instanceof People);
console.log(elaine instanceof Object);
```

instanceof 运算符能让我们找到它的爸爸是谁（谁制造了它，从生理上讲应该是妈妈是谁），以及它的祖宗十八代，这也是面试中常遇到的——[instanceof 的原理是什么](./instanceof——找祖籍.md)

### constructor 构造方法

`constructor` 是一种用于创建和初始化 class 创建的对象的特殊方法。请注意，它是函数（方法）

就好比：

```javascript
function sayHello() {
    console.log('hello');
}
```

不要因为单词陌生误以为它是属性

语法：

```javascript
constructor([arguments]) { ... }
```

这里多说一句，React 类组件是这样写的：

```javascript
class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
    }
}
```

这里的意思很明白，`HelloWorld` 组件继承了 `React.Component` 组件，`constructor(props)` 意味着调用了父类的构造函数，并将 props 传递给 HelloWorld，使用 `super` 是因为在派生类中，必须调用 `super` 才能使用 `this`，当然，这部分就关系到 class 的知识，感兴趣可以移步到——[Class 类](../ES6/Class.md)

关于构造函数（constructor）需要知道的是它是 Object 原型上的方法，即 Object.prototype.constructor，所有对象都会有 constructor 属性，它指向该对象的构造函数，关于继承后续文章会讲解

说完题外话，我们继续来看 `constructor` 能否检验数据类型吗

```javascript
// 借 typeof 中的例子，直接打印看效果
// 基本类型
console.log(null1.constructor); // Cannot read properties of null (reading 'constructor')
console.log(undefined1.constructor); // Cannot read properties of null (reading 'constructor')
console.log(string1.constructor); // String() { [native code] }
console.log(number1.constructor); // Number() { [native code] }
console.log(boolean1.constructor); // Boolean() { [native code] }
console.log(symbol1.constructor); // Symbol() { [native code] }
// 引用类型
console.log(myString.constructor); // String() { [native code] }
console.log(myNumber.constructor); // Number() { [native code] }
console.log(myBoolean.constructor); // Boolean() { [native code] }
console.log(myObject.constructor); // Object() { [native code] }
console.log(myArray.constructor); // Array() { [native code] }
console.log(myFunction.constructor); // Function() { [native code] }
console.log(myDate.constructor); // Date() { [native code] }
console.log(myRegExp.constructor); // RegExp() { [native code] }
console.log(myError.constructor); // Error() { [native code] }
```

综上所述，constructor 对 underfined 和 null 无效（因为它们不是对象，不能从 Object.prototype 上继承 constructor 属性）

此外， constructor 的指针是可以改变的（因为它就是个属性，以下例子属于属性赋值）

```javascript
function Person() {}
function Student() {}
Student.prototype = new Person();
var student = new Student();
console.log(student.constructor); // Person() {}
```

具体我们在[原型](./原型.md)一文中做详细介绍

### Object.prototype.toString.call(source)

`toString()` 方法返回一个表示该对象的字符串

每个对象都有一个`toString()` 方法（继承自 Object.prototype 老祖），**用它能真正做到对类型的检测**

```javascript
// 继续引用上述例子
// 基本类型
console.log(Object.prototype.toString.call(null1)); //[object Null]
console.log(Object.prototype.toString.call(undefined1)); //[object Undefined]
console.log(Object.prototype.toString.call(string1)); //[object String]
console.log(Object.prototype.toString.call(number1)); //[object Number]
console.log(Object.prototype.toString.call(boolean1)); //[object Boolean]
console.log(Object.prototype.toString.call(symbol1)); //[object Symbol]
// 引用类型
console.log(Object.prototype.toString.call(myString)); //[object String]
console.log(Object.prototype.toString.call(myNumber)); //[object Number]
console.log(Object.prototype.toString.call(myBoolean)); //[object Boolean]
console.log(Object.prototype.toString.call(myObject)); //[object Object]
console.log(Object.prototype.toString.call(myArray)); //[object Array]
console.log(Object.prototype.toString.call(myFunction)); //[object Function]
console.log(Object.prototype.toString.call(myDate)); //[object Date]
console.log(Object.prototype.toString.call(myRegExp)); //[object RegExp]
console.log(Object.prototype.toString.call(myError)); //[object Error]
```

我们可以看到它返回 `[object NativeConstructorName]` 格式的字符串，它能清晰的判断我们所需要的原生构造函数。同样，它的缺点是不能检测非原生构造函数

在 jquery 中的$.type() 是内部的原理用的就是 Object.prototype.toString.call()，让我们手写一个类型判断的小小工具库吧

```javascript
function isType(source) {
    const target = Object.prototype.toString.call(source);
    switch(target) {
        case "[object Null]":
            return 'null';
        case "[object Undefined]":
            return 'undefined';
        case "[object String]":
            return 'string';
        case "[object Number]":
            return 'number';
        case "[object Boolean]":
            return 'boolean';
        case "[object Object]":
            return 'object';
        case "[object Array]":
            return 'array';
        case "[object Function]":
            return 'function';
        case "[object Date]":
            return 'date';
        case "[object RegExp]";
            return 'regexp';
        case "[object Error]";
            return 'error'
    }
}

function getType(target) {
    return Object.prototype.toString.call(target);
}
```

这里你或许会感到疑惑，Object.prototype 的 constructor 不能调用 null、undefined，而Object.prototype.toString 却能调用。这是为什么？

这里牵扯到隐式原型继承，即用对象字面量时，就已经实现了继承，而Object.prototype.toString 用的是原始方法，不信，你看

```javascript
console.log(null1.toString()); // Cannot read properties of null (reading 'toString')
console.log(undefined1.toString()); // Cannot read properties of undefined (reading 'toString')
```

## 总结

这一节我们讲了 JavaSript 由什么组成

从组成上分，它包括语法，变量和数据类型，关键字和保留字，操作符，语句，对象

其中数据类型包括基本类型（简单类型/值类型）和引用类型（复杂类型）。基本类型有 number、string、boolean、null、undefined 、symbol、bigInt，引用类型则是 object

那如何判断数据类型呢？笔者总结四种方法

| 名称                        | 能检测                                                       | 不能检测                                       |
| --------------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| typeof                      | string、number、boolean、undefined 以及 function             | null 以及除 function 外的对象，结果都为 object |
| instanceof                  | 能判断引用数据类型                                           | 不能判断基础数据类型                           |
| constructor                 | string、number、boolean、array、object、function 以及 构造函数 | undefined、null。不安全，因为指向可以改变      |
| Object.prototype.toString() | 内置（原生）构造函数                                         | 自定义构造函数                                 |

我们了解了基本类型、引用类型，它们的区别以及如何区分它们，但基本类型是简单的，而引用类型虽然只有 object，但它却在 JavaScript 占了大部分知识点，只有掌握 object，才算学会 JavaScript

下一节，我们讲讲 JavaScript 中的 KING—— [对象](./一切皆对象.md)
