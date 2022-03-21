# JavaScript 启示录

目录

## 第一章 JavaScript 对象

### 1.1 创建对象

​ 在 JavaScript 中，对象是“王”：JavaScript 里的几乎所有东西都是对象或者用起来像对象。理解了对象，就能理解 JavaScript。

​ 对象是一组有命名值（也成为属性）集合的容器。

​ 如果没有方法，除了用于存储静态属性意外，对象就没有其他太多用途。

像 Object，String 之类的是 JavaScript 自身内置的构造函数。当然，你也可以定义一个非原生的自定义 构造函数，用它来创建 对象。

构造函数也是函数，他相当于一个能自定义对象的模板（我的理解）

```javascript
// 定义 Person 构造函数，以便稍后创建自定义的 Person() 对象
var Person = function (living, age, gender) {
    this.living = living;
    this.age = age;
    this.gender = gender;
    this.getGender = function () {
        return this.gender;
    };
};
// 实例化 Person 对象，并将它保存到 johan 变量
var johan = new Person(true, 26, 'male');
console.log(johan);
```

### 1.3 JavaScript 原生/内置对象构造函数

JavaScript 包含 9 个原生（或内置）对象构造函数。

-   **Number（）**
-   **String（）**
-   **Boolean（）**
-   **Object（）**
-   **Array（）**
-   **Function（）**
-   **Date（）**
-   **RegExp（）**
-   **Error（）**

注意：

-   Math 对象在这里很古怪，它是一个静态对象，而不是构造函数
-   原生对象有时也被称为“全局对象”，因为他们是 JavaScript 中原生就可以使用的对象。
-   Number（）、String（）和 Boolean（）构造函数不仅能构建对象，而且能为字符串、数字和布尔值提供原始值

龙生九子，九个，还有个私生子（Math）

### 1.4 用户自定义/非原生对象构造函数

自定义构造函数，首字母大写（约定俗成）

### 1.7 原始值（或简单值）

原始值是表示 JavaScript 中可用的数据/信息的最底层形式（即最简单的形式）

就是基本类型

### 1.8 null、undefined、“string”、10、true 和 false 等原始值不是对象

```javascript
// 使用原始值的时候，不会创建对象，注意没有使用 new 关键字
var primitiveString1 = 'foo';
var primitiveString2 = String('foo');
var primitiveNumber1 = 10;
var primitiveNumber2 = Number('10');
var primitiveBoolean1 = true;
var primitiveBoolean2 = Boolean('true');
console.log(typeof primitiveString1, typeof primitiveString2); // 输出 'string, string'
console.log(typeof primitiveNumber1, typeof primitiveNumber2); // 输出 'number, number'
console.log(typeof primitiveBoolean1, typeof primitiveBoolean2); // 输出 'boolean,boolean'

// 对比创建对象的构造函数和 new 关键字用法
var myNumber = new Number(23);
var myString = new String('male');
var myBoolean = new Boolean(false);
var myObject = new Object();
var myArray = new Array('foo', 'bar');
var myFunction = new Function('x', 'y', 'return x * y');
var myDate = new Date();
var myRegExp = new RegExp('\\bt[a-z]+\\b');
var myError = new Error('Johan!');
console.log(
    typeof myNumber, // obejct
    typeof myString, // obejct
    typeof myBoolean, // obejct
    typeof myObject, // object
    typeof myArray, // object
    typeof myFunction, // function
    typeof myDate, // object
    typeof myRegExp, // function
    typeof myError, // object
);
```

总结：原始值不是对象。原始值的特殊指出在于它们是用来表示简单值的。

### 1.9 如何存储和复制原始值

```javascript
var myString = 'foo';
var myStringCopy = myString;
var myString = null;
console.log(myString, myStringCopy); // 输出 'null foo'
```

我的理解：因为是原始值是堆引用，体积小，直接堆引用。待考证

### 1.10 原始值对比采用值比较

可以通过比较原始值来确定其值在字面上是否相同。从逻辑上讲，如果将一个包括数值 10 的变量与另一个包含数值 10 的变量进行比较，JavaScript 将会认为它们是相等的，因为 10 与 10 是相同的（即 10 === 10 ）。

### 1.11 原始值（String、Number、Boolean）在被用做对象时就像对象

### 1.12 复杂值（或组合值）

原生对象构造函数 Object()、Array()、Function()、Date()、Error() 和 RegExp() 是复杂类型。因为它们包含一个或多个原始值或复杂值。

本质上，复杂值可以由很多不同类型的 JavaScript 对象组成。可以这样说，复杂对象其在内存中的大笑是未知的，因为复杂对象可以包含任何职，而不是一个特定的已知值。

```javascript
var object = {
    myString: 'string',
    myNumber: 10,
    myBoolean: false,
    myNull: null,
    myUndefined: undefined,
};
var array = ['string', 10, false, null, undefined];
// 相比简单的原始值，原始值不能表示复杂值，而复杂值可以封装任意 JavaScript 值
var myString = 'string';
var myNumber = 10;
var myBoolean = false;
var myNull = null;
var myUndefined = undefined;
```

复杂值是各种值的组合，并且在复杂性和组合方面与原始值不同。

注意：

“复杂对象” 这一术语在其他作品中也被表达为“复合对象”或“引用对象”。

原始值不是“值引用”，不能表示其他值的组合（即一个由几部分或几个元素组成的东西）。另一方面，复杂对象是“值“引用，可以包含或封装其他值。

#### 1.13 如何存储或复制复杂值

创建一个包含复杂对象的变量时，其值是内存中的一个引用地址。引用一个复杂对象时，使用它的名称（即变量或对象属性）通过内存中的引用地址获取该对象。

当修改复杂值时，所有引用对象地址的变量的值都会被改变，因为复杂值时通过引用进行存储的

深拷贝和浅拷贝

#### 1.14 复杂对象比较采用引用比较

复杂对象只有在引用想听的对象(即有相同的地址)时才相等。包括相同对象的两个变量彼此不相等，因为它们并不指向同一个对象。

```javascript
var objectFoo = { same: 'same' };
var objectBar = { same: 'same' };
// 输出 fasle， JS并不关注它们的类型是否相同
console.log(objectFoo === objectBar);

// 复杂对象如何相等，引用同一个对象
var objectA = { foo: 'bar' };
var objectB = objectA;
console.log(objectA === objectB);
```

#### 1.15 复杂对象具有动态属性

复杂对象支持动态对象属性，因为我们可以定义对象，然后创建引用，再更新对象，并且所有指向该对象的变量都会“获得”更新

#### 1.16 typeof 操作符

在 jsbasic 中说过，

需要注意的是 函数或者正则返回的 是 function

#### 1.17 动态属性支持易变对象

我们可以在原生构造函数上存储属性，并在原型对象上，向原生对象额外添加新方法

#### 1.18 构造函数实例都拥有指向其构造函数的 Constructor 属性

说白了，Contructor 属性就是说谁是你的妈，谁制造的你，谁生的你， constructor 的英文翻译就是构造函数

比如说

```javascript
var foo = {};
console.log(foo.constructor === Object); // true
console.log(foo.constructor); // 指向 Object() 构造函数

// 自定义 构造函数
function CustomConstructor() {
    return 'Wow!';
}
var instanceOfCustructor = new CustomConstructor();
console.log(instanceOfCustructor.constructor === CustomConstructor); // true
console.log(instanceOfCustructor.constructor); // function CustomConstructor() { return 'Wow!' }
```

#### 1.19 验证对象是否是特定构造函数的实例

通过使用 instanceof 操作符，可以确定（ture 或 false） 一个对象是否是特定构造函数的实例

```javascript
function CustomConstructor() {
    this.foo = 'bar';
}
var instanceOfConstructor = new CustomConstructor();
console.log(instanceOfConstructor instanceof CustomConstructor); //true
```

可以翻译为： 这个实例 属于 这个构造函数吗

当然，任何时候判断一个对象是否是 Object 的实例时，他都讲返回 true，因为所有的对象都继承自 Object() 构造函数

即使是

```javascript
console.log(new Array('foo') instance Object) // true
var func = function() {}
console.log(func instance Object) // true
```

数组，函数都是由对象构建，也是对象

#### 1.21 JavaScript 对象和 Object() 对象

不要讲一般术语“JavaScript 对象”与 Object() 对象混淆。术语“JavaScript 对象” 指的是 JavaScript 中的所有对象，因为 JavaScript 中的大部分值都可以像对象一样使用。这是由于大多数 JavaScript 值都是由能够生成特定类型对象的原生构造函数所创建。

记住：Object() 对象是一种特定类型的值，它是一个通用的空对象。

## 第二章 对象与属性

#### 2.6 使用 hasOwnProperty 验证对象属性不是来自原型链

```javascript
var myObject = { foo: 'value' };
console.log(myObject.hasOwnProperty('foo')) // 输出 true
console.log(myObject.hasOwnProperty(‘toString)) // 输出 false
```

### 第三章 Object()

#### 3.3 Object() 属性和方法

Object() 对象具有以下属性（不包括继承的属性和方法）

属性（如 Object.prototype）

-   prototype

#### 3.4 Object() 对象实例属性和方法

Object() 对象实例拥有以下属性和方法

**实例属性** （如 var myObject = {}; myObject.constructor）

-   constructor

**实例方法**（如 var myObject = {}; myObject.toString()）;

-   hasOwnProperty
-   isPrototypeOf()
-   propertyIsEnumerable()
-   toLocaleString()
-   toString()
-   valueOf()

注意： 原型链以 Object.prototype 结尾（指向 null），因此，Object() 的所有属性和方法（如上所示）被所有的 JavaScript 对象继承。

```javascript
var str1 = 'hanbo';
console.log(str1.toString());
var num1 = 11;
console.log(num1.toString());
// toString() 方法继承自Object()对象
```

#### 3.6 所有对象都继承自 Object.prototype

```javascript
Object.prototype.foo = 'foo';
var myString = 'bar';
var myNumber = 11;
console.log(myString.foo); // 输出 'foo' 通过原型链在 Object.prototype.foo 上找到
consolelog(myNumber.foo); // 同上
```

## 第四章 Function()

#### 4.3 Function() 属性和方法

**属性**（如 Function.prototype;）

-   prototype

#### 4.4 Function 对象实例属性和方法

函数对象实例拥有以下属性和方法

**实例属性**（如 var myFunction = function(x, y, z) {}; myFuntion.length;）

-   arguments
-   constructor
-   length

**实例方法** （如 var myFunction = function(x, y, z) {}; myFunction.toString()）

-   apply()
-   call()
-   toString()

#### 4.14 调用函数[函数、方法、构造函数或者 call()和 apply()]

其实不止 4 种

#### 4.15 匿名函数

匿名函数是一种没有给出标识符的函数

```javascript
function sayHi(f) {
    f();
}
sayHi(function () {
    console.log('hi');
});
```

简单来说就是没有函数名

#### 4.16 自调用的函数表达式

定义函数表达式后立即调用该函数表达式

```javascript
var sayWord = (function () {
    console.log('hello, word');
})();
```

#### 4.17 自调用的匿名函数语句

就是将以上两种结合到一起，特点是在这个空间内，你的命名不会与外界产生联系，其原理是闭包

```javascript
// 最经常使用的匿名函数
(function (msg) {
    console.log(msg);
})('Hi')
// 写法不同的匿名函数
(function (msg) {
    console.log(msg)
}('Hi'))
// 更简短的方法
!function sayHi(msg) { console.log(msg) }('Hi')
// 注意：下一代码不行！
function sayHi() {copnsole.log('hi'); }()
```

注意： 如果要立即调用函数，需要使用函数外面的圆括号（或任何将函数转换为表达式的符号）

#### 4.20 函数定义之前调用（函数提升）

在真正定义函数语句之前，可以在执行时调用该函数语句。

```javascript
var speak = (function () {
    sayYo();
    function sayYo() {
        console.log('Yo');
    }
})();

console.log(sum(2, 2));
function sum(x, y) {
    return x + y;
}
```

在运行代码之前，函数语句其实已经被编译器解释，并添加至执行堆栈/上下文

注意：被定义为“函数表达式”的函数没有被提升——只有“函数语句”被提升

## 第六章 this 关键字

#### 6.1 this 概要及 this 如何引用对象

this 对其函数的作用域时可见的，而且它是函数属性/方法所在对象的一个引用

总的来说，this 是在函数内部使用，用来引用包含函数的对象，而不是函数本身[使用 new 关键字或者 call() 和 apply() 的情况例外]

#### 6.4 充分利用作用域链研究嵌套函数问题

可以简单地在夫函数种使用作用于阿联来保留对 this 的引用，以便 this 值不丢失。

```javascript
var myObject = {
    myProperty: 'I can see the light',
    myMethod: function () {
        var that = this; // myMethod 作用域中，保存 this 引用(that 即 myObject)
        var helperFunction = (function () {
            console.log(that.myProperty); // 输出 'I can see the light'
            console.log(this); // window.object
        })();
    },
};
```

#### 6.5 使用 call() 或 apply() 控制 this 值

```javascript
var myObject = {};
var myFunction = function (param1, param2) {
    this.foo = param1;
    this.bar = param2;
    console.log(this);
};
myFuntion.call(myObject, 'foo', 'bar');
myFunction.apply(myObject, ['foo', 'bar']);
```

## 第七章 作用域和闭包

#### 7.1 JavaScript 作用域概要

在 JavaScript 种，作用域是执行代码的上下文。作用域又三种类型：全局作用域、局部作用域（有时被称为“函数作用域”）和 eval 作用域（还有块级作用域 ES6 中）

在函数内部使用 var 定义的代码，七作用域是局部的，且只对该函数的其他表达式“可见”，包括嵌套/子函数中的代码。

在全局作用域内定义的变量从任何地方都可以访问，因为它是作用域链中的最高层/最后一个

```javascript
var foo = 0; // 全局作用域
console.log(foo); // 输出 0

var myFunction = (function () {
    var foo = 1; // 局部作用域
    console.log(foo); // 输出 1
    var myNestedFunction = (function () {
        var foo = 2; // 局部作用域
        console.log(foo); // 输出2
    })();
})();
```

#### 7.2 作用域链（词法作用域）

```javascript
var sayHiText = 'howdy';
var func1 = (function () {
    var func2 = (function () {
        console.log(sayHiText); // func2 作用域，但在全局作用域中查找到了 sayHiText
    })();
})();
```

按数学的逻辑，就是集合关系，先在自己函数内找变量，如果没有，再到函数上一级找，以此类推到全局作用域

注意：仔细想一下，作用域链和原型链的区别并不大。两者都是通过为止体系和分层体系来查找值的方法

#### 7.6 函数定义时确定作用域，而非调用时确定

这个也叫词法作用域。

其实很简单，如果是按照调用的时候确认作用域，那么对 js 来说就是灾难，你在上面定位一个函数，在下面又定位一个函数，而下面那个函数调用了上面那个函数。但你在这两个函数之间调用下面函数时，你要先去找下面那个函数，下面的函数调用上面的函数，又跑到上面，如果同事写的乱一点，你将很难定位错误所在，

好在 JavaScript 的作用域是词法作用域，它根据函数定义时的位置确认

作用域链是在调用函数之前创建。正因为如此，我们可以创建闭包。例如，我们可以让函数向全局作用域返回一个嵌套函数，但该函数仍然能够通过作用域链返回其父函数的作用域。

```javascript
var parentFunction = function () {
    var foo = 'foo';
    return function () {
        // 返回匿名函数
        console.log(foo); // 输出 ‘foo'
    };
};
// nestedFunction 引用 parentFunction 函数返回的匿名函数
var nestedFunction = parentFunction();
nestedFunction(); // 输出 foo，因为返回的函数可以通过作用域链访问 foo
```

你懂我意思吗？

因为 JavaScript 的作用域是词法作用域，词法作用域的特点是：根据函数定义时的位置确认

所以当你定义好一个函数后，它的作用域就确定了

```javascript
var parentFunction = function () {
    var foo = 'foo';
    return function () {
        console.log(foo);
    };
};
```

这个函数，他的作用域已经确认了。在 parentFunction()函数中，有 属性 foo 和匿名方法。

匿名方法中的作用域包含 console.log(foo),foo 在匿名函数中找不到，往上级找，在 parentFunction 中找到，引用它。

#### 7.7 闭包是由作用域链引起的
