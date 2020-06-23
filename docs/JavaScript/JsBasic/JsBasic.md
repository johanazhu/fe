# 基础篇

首先你要知道，js是一种语言

## 基本类型和引用类型

## 类型转换

## 强制类型转换

formData和ajax有什么区别
介绍下表单提交，和formData有什么关系

页面上有1万个button如何绑定事件

如何判断是button

页面上生成1万个button，并绑定事件，如何做（使用原生操作DOM）

浮点数0.1+0.2为什么不等于0.3

js执行过程分哪些阶段

介绍defineProperty方法，什么时候需要用到

for...in和object.keys的区别


知道axios或同级别网络请求库，知道axios的核心功能。
能口喷xhr用法，知道网络请求相关技术和技术底层，包括但不限于：content-type，不同type的作用；restful设计理念；cors处理方案，以及浏览器和服务端执行流程；口喷文件上传实现；
知道如何完成登陆模块，包括但不限于：登陆表单如何实现；cookie登录态维护方案；token base登录态方案；session概念

能说明白接口请求的前后端整体架构和流程，包括：业务代码，浏览器原理，http协议，服务端接入层，rpc服务调用，负载均衡。
知道websocket用法，包括但不限于：鉴权，房间分配，心跳机制，重连方案等。
知道pc端与移动端登录态维护方案，知道token base登录态实现细节，知道服务端session控制实现，关键字：refresh token。
知道oauth2.0轻量与完整实现原理。
知道移动端api请求与socket如何通过native发送，知道如何与native进行数据交互，知道ios与安卓jsbridge实现原理。

知道移动端webview和基础能力，包括但不限于：iOS端uiwebview与wkwebview差异；webview资源加载优化方案；webview池管理方案；native路由等。
登陆抽象层，能够给出完整的前后端对用户体系的整体技术架构设计，满足多业务形态用户体系统一。考虑跨域名、多组织架构、跨端、用户态开放等场景。
mock方案，能够设计出满足各种场景需要的mock数据方案，同时能说出对前后端分离的理解。考虑mock方案的通用性、场景覆盖度，以及代码或工程侵入程度。
埋点方案，能够说明白前端埋点方案技术底层实现，以及技术选型原理。能够设计出基于埋点的数据采集和分析方案，关键字包括：分桶策略，采样率，时序性，数据仓库，数据清洗等

目录
第一章  精华
    为什么要使用 JavaScript
    分析 JavaScript
    一个简单的试验场
第二章 语法
第三章 对象
第四章 函数
第五章 继承
第六章 数组
第七章 正则表达式
第八章 方法
第九章 代码风格
第十章 优美的特性


第一章：
JavaScript 是一门 动态编程语言

优点：函数、弱类型、动态对象和对象字面量表示法（JSON）
缺点：全局变量

JavaScript 的函数是（主要）基于词法作用域（lexical scoping）的顶级对象。 JavaScript 是第一个成为主流的 Lambda 语言

强类型和弱类型
强类型允许编译器在编译时检测错误

原型继承是 JavaScript 中一个有争议的特性。 JavaScript 有一个无类型的（class-free）对象系统，在这个系统中，对象直接从其他对象继承属性。

第二章 语法
以下的值被当做假（false）
false
null
undefined
空字符串
数字 0
数字 NaN

其他所有的值都被当做 真，包括 true、字符串“false”，以及所有的对象

return 语句会导致从函数中提前返回。它也可以指定要返回的值。如果没有指定返回表达式，那么返回值是 undefined

表达式
最简单的表达式是字面量值（比如字符串或者数字）、变量、内置的值（true、false、null、undefined、NaN和Infinity）、以 new 开头的调用表达式、以 delete 开头的属性提取表达式、包括圆括号中的表达式、以一个前置运算符作为前导的表达式，或者表达式后面跟着：

- 一个中置运算符与另一个表达式；
- 三元运算符 ？ 后面跟着另一个表达式，后面接一个 : ，再然后接着第3个表达式；
- 一个函数调用；
- 一个属性提取表达式

三元运算符 ？ 有3个运算数。如果第一个运算数值为真，产生第2个运算数的值。但如果第一个运算数值为假，则产生第3个运算数的值。

运算符优先级

| . [] ( )                | 提取属性与调用函数 |
| ----------------------- | ------------------ |
| delete new typeof + - ! | 一元运算符         |
| * / %                   | 乘法、除法、求余   |
| + -                     | 加法/连接、减法    |
| >= <= > <               | 不等式运算符       |
| === !==                 | 等式运算符         |
| &&                      | 逻辑与             |
| \|\|                    | 逻辑或             |
| ?：                     | 三元               |

typeof 运算符产生的值有‘number’、‘string’、‘boolean’、‘undefined’、‘function’和‘object’。如果运算数是一个数组或null，那么结果是'object'，这是不对的



### 第三章 对象

Javascript 的简单数据类型包括数字、字符串、布尔值（true|false）、null值、underfined值、Symbol。其他所有的值都是对象。数字、字符串和布尔值“貌似”对象，因为它们拥有方法，但他们是不可变的。

Javascript 中的对象是可变的键控集合（keyed collections）。在Javascript中，数组是对象，函数是对象，正则表达式是对象，当然，对象自然也是对象。

对象是属性的容器，其中每一个属性都拥有名字和值。属性的名字可以是包括空字符串在内的任意字符串。属性值可以使除 undefined 值之外的任何值。

Javascript 包含一种原型链的特性，允许对象继承另一个对象的属性。正确地使用它能减少对象初始化时消耗的时间和内存。

对象：对象是“名/值”对的集合并有一个连到原型对象的隐藏连接。

基本类型和引用类型

基础类型

```javascript
var a = 'hanbo'
var b = a;
a = 'fuchan'
console.log(b) // hanbo
// 
```

引用类型

```javascript
var x = stooge;
x.nickname = 'Gurly';
var nick = stooge.nickname
// 因为 x 和 stooge 是指向同一个对象的引用，所以 nick 为 'Gurly'
var a = {}, b = {}, c = {};
// a 、 b 和 c 每个都引用一个不同的空对象
a = b = c = {}
// a 、 b 和 c 都引用同一个空对象
```

本质：

设计 js 类型的时候就设置成 

**基本类型用的是栈，引用类型用的是堆**

堆**图可知



#### 原型

每个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象都可以到Object.prototype，它是 JavaScript 中的标配对象。

当你创建一个新对象时，你可以选择某个对象作为它的原型。

原型连接在更新时不起作用。当我们对某个对象作出改变时，不会改变该对象的原型。

原型连接只有在检索值的时候才用到。当我们想获取对象的某个属性值，但该对象没有此属性名，那么 JavaScript 会试着从原型对象中获取属性值。如果那个原型对象也没有该属性，那么再从它的原型中寻找，依次类推，直到该过程最后到达终点 Object.prototype。如果想要的属性完全不存在于原型链中，那么结果就是 undefined 值。这个过程称为委托。

原型关系是一种动态的关系。如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

```javascript
var friend = new Person();
Person.prototype.sayHi = function() {
    alert('hi')
}
friend.sayHi() // "hi"
```

举个例子：

构造函数模式

归纳式，也可以理解为图书馆分类式

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job
    this.sayName = function() {
        alert(this.name)
    }
}
var zhangsan = new Person('张三', 15, '屠夫')
var lisi = new Person('李四', 14, '肉贩')
```



#### 原型模式

```javascript
function Person() {}
Person.prototype.name = 'zhangsan';
Person.prototype.age = 15;
Person.prototype.job = '屠夫'
Person.prototype.sayName = function() {
    alert(this.name)
}
var person1 = new Person()
person1.sayName() // "zhangsan"
// this 指谁，谁调用它就指谁，person1调用，this就指person1，它本身没有name，就沿着原型链往上找，找到Person定义的name

```



继承有多种方式

比如说工厂模式、构造函数模式、原型模式

单单说 构造函数模式，他的缺点是，每一个基于构造函数的实例对象。都会存下一份副本。

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job
    this.sayName = function() {
        alert(this.name)
    }
}
```

人类是个集合，每个人都有自己的名字，年龄也各不相同，职业也不同，但是说名字这个方法是可以相同的，就是章口就来，名字是自己的（谁调用this指向谁）

几个还好，但是上万个上亿人用这个构造函数，性能就出问题了，每实例一次，内存开销一次，创建属性和方法，因为是各自独立的副本

而原型继承的特点可以弥补，它用来定义方法和共享的属性

```javascript
function Man(){}
Man.prototype.gender = '男人';
Man.prototype.sayGender = function(){
    alert('我是男人')
}
var xiaoming = new Man()
xiaoming.gender // '男人'
xiaoming.sayGender() //我是男人
```

在创建 Man 函数（构造函数也是函数）时，内存只开销一次，

所有一般的继承是基于 构造函数+原型链。其作用是 优化性能，减少内存开销

其本质是 数学中的归纳

详细内容见第六章“原型链的分析”



检查属性类型

typeof 操作符检查属性的类型

hasOwnProperty 如果对象拥有独有的属性，他会返回true，hasOwnProperty 犯法不会检查原型链



#### 减少全局变量污染

JavaScript 可以很随意地定义全局变量来容纳你的应用的所有资源。遗憾的是，全局变量削弱了程序的灵活性，应该避免使用。

最小化使用全局变量的方法之一是为你的应用只创建一个唯一的全局变量。

当然还有一种方法（减少全局污染）——闭包



### 第四章 函数

函数包含一组语句，他们是 JavaScript 的基础模块单元，用于代码复用、信息隐藏和组合调用。函数用于指定对象的行为。一般来说，所谓编程， 就是讲一组需求分解成一组函数与数据结构的技能。

编程 = 函数 + 数据结构



函数中就有很多东西可以引申出来。

函数是JavaScript中的第一公民啊

https://www.zhihu.com/question/67652709

我感觉可以结合知乎上的大神对 这句话的评价

用引用的方式来表示

函数就是对象的一种



#### 函数对象

JavaScript 中的函数就是对象。对象是“名/值”对的集合并游泳一个连到原型对象的隐藏连接。

对象字面量产生的对象连接到 Object.prototype 。函数对象连接到 Function.prototype（该原型对象本身连接到 Object.prototype）。每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码

```javascript
var obj = {} // 对象字面量 创建 对象
var func = function() {} // 函数字面量 创建 函数对象
```

每个函数对象在创建时也随配有一个 prototype 属性。它的值是一个拥有 constructor 属性且值极为该函数的对象。这个隐藏连接到 Function.prototype 完全不同。

因为函数是对象，所以他们可以像任何其他的值一样被使用。函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其他函数，函数也可以再返回函数。而且，因为函数是对象，所以可以拥有方法

```javascript
var str = function() {} // 保存在变量中
var obj = {
	a: function() {}
} // 保存在方法中
var array = [
    'zhangsan',
    16,
    function() {}
] // 保存到数组中
function father(callback) {
    callback()
}
function test(){
    console.log('当做参数的函数')
}
father(test) // 函数当做参数传递给其他函数
-------
function test1() {
    return function() {
        console.log('返回我')
    }
}
test1()() // 函数返回函数，调用test1() 返回function() {console.log("返回我")} 匿名函数。再调用一次，就出结果。

```



#### 函数字面量

函数对象通过函数字面量来创建

```javascript
// 创建一个名为 add 的变量，并用来把两个数字相加的函数赋值给它
var add = function (a, b) {
    return a + b
}
```

将一个函数赋值给 add（字面量）

函数字面量有四个部分：

第一部分：保留字 function

第二部分：函数名，可以省略，省略的叫匿名函数（anonymous）

第三部分：包括在圆括号中的一组参数。多个参数用逗号分隔。这些参数的名称将被定义为函数中的变量

第四部分：包括在花括号中的一组语句。这些语句是函数的主题，他们在函数被调用时执行。

函数字面量可以出现在任何允许表达式出现的地方。

函数也可以被定义在其他函数中。一个内部函数除了可以访问自己的参数和变量，同时它也能自由访问把它嵌套在其中的父函数的参数和变量。通过函数字面量创建的函数对象包含一个连到外部上下文的连接。这被称为闭包（closure）。它是JavaScript强大表现力的来源。详细请进闭包篇。



##### 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数（形参），每个函数还接受两个附加的参数：this 和 arguments。参数 this 在面向对象编程中非常重要，它的值取决于调用的模式。

在JavaScript中一共有六种调用模式。方法调用模式、函数调用模式、构造函数调用模式、apply，bind，call调用模式、箭头函数调用模式，还要一种忘记了

调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号。圆括号内可包含零个或多个用逗号隔开的表达式。每个表达式产生一个参数值。每个参数值被赋予函数声明时定义的形式参数名。当实际参数（arguments）的个数与形式参数（parameters）的个数不匹配时，不会导致运行时错误（javascript就是骚，ts会报错）。如果实际参数值过多，超出的参数值会被忽略。如果实际参数值过少，缺失的值会被替换为 undefined。对参数值不会进行类型检查：任何类型的值都可以被传递给任何参数。

回过头来说六种调用模式：

##### 方法调用模式

即当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this 被绑定到该对象。

(ps:方法即函数在对象内部中的一个属性)

```javascript
var myObject = {
	value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}
myObject.increment();
console.log(myObject.value) // 1

myObject.increment(2);
console.log(myObject.value) // 3

```

##### 函数调用模式

当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用

```javascript
function add(a, b) {
    return a + b
}
var sum = add(3, 4) // sum 的值为 7。
```

在笔者看来，函数调用模式就是放在全局中

以此模式调用函数时，this 被绑定到全局对象上。这其实是JavaScript 语言设计上的一个bug。我们首先模拟一下按照人的思维所希望的结果——当内部函数被调用时，this应该仍然绑定到外部函数的this变量。

```javascript
var myObject = {
    
}
```

```javascript

```

构造器调用模式

JavaScript 是一门基于原型继承的语言。这意味着对象可以直接从其他对象继承属性。该语言是无类型的。

new 

如果再一个函数前面带上 new 来调用，那么背地里将会创建一个连接到该函数的 prototype 成员的新对象，同时 this 会绑定到那个新对象上。

手写new

#### apply 调用

apply 方法让我们创建一个参数数组传递给调用函数。它也允许我们选择 this 的值

bind，call调用

手写

#### 参数

当函数被调用时，会得到一个"免费"配送的参数，那就是 arguments 数组。函数可以通过此参数访问所有它调用时传递给它的参数列表，包括哪些没有被分配给函数声明时定义的形式参数的多余参数。

个人感觉在 源码中比较常见

```javascript
var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i+= 1) {
    	sum += arguments[i]
    }
    return sum;
}
console.log(sum(4, 8, 15, 16, 23, 42)) // 108
```

这里要多提一句，arguments 是语言设计种的错误。它并不是一个真正的数组。它只是一个“类似数组（array-like）”的对象。arguments 拥有一个 length 属性，但它没有任何数组的方法。

数组和类数组的区别在哪里？

我的理解：数组继承自Array.prototype 它有 原型上的属性和方法。实例化后就能直接用，但是类数组只是结构上像数组，但却没有数组该有的东西。可以这么说，类数组长得和数组像，但它不是数组。



#### 返回

当一个函数被调用时，它从第一个语句开始执行，并在遇到关闭函数体的 } 时结束。然后函数把控制权交还给调用该函数的程序

return 语句可用来使函数提前返回。当 return 被执行时，函数立即返回而不再执行余下的语句

一个函数总是会返回一个值。如果没有特定的返回值，则返回 undefined

我们在chrome中调试时，常常会写这样的语句：

```javascript
function test() {
    console.log('hello, world')
}
test()
// 返回的结果往往是：
// hello,world
// undefined
```

这正是因为 没有 return，导致他默认返回 undefined



#### 作用域

作用域控制着变量与参数的可见性及生命周期。对它能减少名字冲突，并且提供自动内存管理。





静态作用域——动态作用域

重学前端中的知识。

块级作用域



#### 闭包

作用域的好处是内部函数可以访问定义他们的外部函数的参数和变量（除了this和arguments）



#### 回调



#### 模块

我们可以使用函数和闭包来构造模块。模块是一个提供接口却隐藏状态与实现的函数或对象。通过使用函数产生模块，我们可以摒弃全局变量的使用。

立即执行函数



#### 链式

有一些方法没有返回值。例如，一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。



#### 柯里化

函数也是值，从而我们可以用有趣的方式去操作函数值。柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数。

。。。

那么我有疑问了，既然讲到了 函数，就不得不提 es6 中的 class

总结函数：

说话函数的最后，你只用记住一句话：再JavaScript种函数是第一公民



### 第五章 继承

在基于类的语言中，对象是类的实例，并且类可以从另一个类继承。JavaScript 是一门基于原型的语言，这意味着对象直接从其他对象继承



#### 伪类

模拟类的形式来做继承，我没太看懂 

javascript 语言精粹第60页



#### 原型

在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承相比基于类的继承在概念上更为简单：一个新对象可以继承一个旧对象的属性。

在某种意义上，一个内部作用域会继承它的外部作用域



### 第六章 数组

#### 容易混淆的地方

JavaScript 本身对于数组和对象的区别是混乱的。 typeof 运算符报告数组的类型是 ‘object’ ，这没有任何意义

JavaScript 没有一个好的机制来区别数组和对象。我们可以通过定义自己的 is_array 函数来弥补这个缺陷：

```javascript
var is_array = function (value) {
    return value &&
        typeof value === 'object' &&
        value.constructor === 'Array'
}
```

遗憾的是，它在识别从不同的窗口（window）或帧（iframe）里构造的数组时会失败。有一个更好的方法去判断一个对象是否是数组：

```javascript
var is_array = function (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
}
```



### 第七章 正则表达式



### 第八章 方法

JavaScript 包含了一套小型的可用在标准类型上的标准方法集。

#### Array

##### array.concat(item...)

concat 方法产生一个新数组，它包含一份 array 的浅复制（shallow copy）并把一个或多个参数 item 附加在气候。如果参数 item 是一个数组，那么它的每个元素会被分别添加。与它功能类似的 array.push(item...)方法

```javascript
var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true)
// c 变成 ['a', 'b', 'c', 'x', 'y', 'z', true]
```

。

。

。

### 第十章 优美的特性

精简的 JavaScript 里都是好东西，包括以下主要内容

##### 函数是顶级对象

​	在精简 JavaScript 中，函数是有词法作用域的闭包（lambda）

##### 基于原型继承的动态对象

​	对象是无类别的。我们可以通过普通的赋值给任何对象添加一个新成员属性。一个对象可以从另一个对象继承成员属性。

##### 对象字面量和数组字面量

​	这对创建新的对象和数组来说是一个非常方便的表达法。JavaScript字面量是数据交换格式 JSON 的灵感之源。其实字面量表达也是一种语法糖



### 附录A 毒瘤

#### 全局变量

共有 3 中方法定义全局变量。第一种是在任何函数之外放置一个 var 语句：

```javascript
	var foo = value；
```

第 2 种是直接给全局对象添加一个属性。全局对象是所有全局变量的容器。在 Web 浏览器里，全局对象名为window，在Node里就是global

```javascript
window.foo = value;
global.foo = value;
```

第 3 中是直接使用未经声明的变量，这被称为隐式的全局变量；

```javascript
foo = value
```

新手比较常见，导致不容易找bug

