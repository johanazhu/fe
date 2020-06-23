# this 关键字

先说结论：**谁调用它，this就指向谁**。

前言：在讲作用域的时候，我们讲到了this，因为JavaScript中的作用域是词法作用域，在哪里定义，就在那里形成作用域。而与词法作用域相对应的还有一个作用域叫动态作用域，调用时去寻找它所处的位置。那个时候我就说道 this机制 和动态作用域很像。

## 关于this

### 1.1 为什么使用 this

我们解释一下为什么要使用this，用一个例子

```javascript
function identify() {
    return this.name.toUpperCase()
}

function speak() {
    var greeting = "Hello, I'm" + identify.call(this)
    console.log(greeting)
}

var me = {
    name: 'johan'
}

var you = {
    name: 'elaine'
}

identify.call(me) // JOHAN
identify.call(you) // ELAINE

speak.call(me) // Hello, I'm JOHAN
speak.call(you) // Hello, I'm ELAINE
```

这段代码可以在不同的上下文对象（me 和 you）中重复使用函数identity() 和 speak()，不用针对每个对象编写不同版本的函数

如果不适用 this，那就需要给identify() 和 speak() 显式传入一个上下文对象

```javascript
function identify(context) {
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = "Hello, I'm" + identify(context)
    console.log(greeting)
}

identify(you) // ELAINE
speak(me) // Hello, I'm JOHAN
```

看到这里你也许明白了，this 是一种更为优雅的”传递”对象引用的方式。这个例子还过于简单，当你遇到7.8个甚至10几个函数（或叫方法）之间的调用时，显式传值无疑会变得混乱。除此之外，在原型中，函数自动引入合适的上下文对象是极为重要的，这个我们放在原型章中在讲。

### 1.2 this到底是什么

this到底是一种什么样的机制。

1. this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。
2. this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式
3. 当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this就是这个记录的一个属性，会在函数执行的过程中用到。

## 2.调用位置

正如上面所讲，this是在运行时绑定的，它的上下文取决于函数调用时的各个条件。在JavaScript中函数的调用有以下几种方式：作为对象方法调用，作为函数调用，作为构造函数调用，和使用apply或者call调用。下面我们按照调用方式不同，分别讨论 this 的含义

#### 作为对象方法调用

在 JavaScript中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在调用这种调用方式时，this 被自然绑定到该对象

```javascript
var people = {
    name: 'elaine',
    age: 26,
    sayName: function() {
        console.log(this.name)
    }
}
people.sayName() // elaine
```

#### 作为函数调用

函数也可以直接被调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象。比如下面的例子：函数被调用时，this 被绑定到全局对象，接下来执行赋值语句，相当于隐式的声明了一个全局变量，这显然不是调用者希望的

```javascript
function sayAge(age) {
    this.age = age;
}
sayAge(5)
// age 已经成为一个值为 5 的全局变量
```

对于内部函数，即声明在另外一个函数体内的函数，这种绑定到全局对象的方式会产生另外一个问题。我们仍然以前提到的 people 对象为例，这次我们希望在 sayName 方法内定义一个函数，函数打印年龄。结果可能出乎大家意料，不仅年龄没有打印出，反而多了一个全局变量 age

```javascript
var people = {
    name: 'elaine',
    age: 26,
    sayName: function(age) {
        var sayAge = function(age) {
            this.age = age;
        }
        sayAge(age)
    }
}
people.sayName(5)
people.age // 26
age // 5
```

这属于 JavaScript 的设计缺陷，正确的设计方式是内部函数的 this 应该绑定到其外层函数对应的对象上，为了规避这一设计缺陷，聪明的 JavaScript 程序员想出了变量代替的方式，约定俗成，该变量一般被称为 that

```javascript
var people = {
	name: 'elaine',
    age: 26,
    sayName: function(age) {
        var that = this;
        var sayAge = function(age) {
            that.age = age
        }
        sayAge(age)
    }
}
people.sayName(5)
people.age // 5
age // 没有定义
```

当然，当我们使用ES6中的箭头函数时，我们会发现箭头函数也能做到相同的效果

```javascript
var people = {
    name: 'elaine',
    age: 26,
    sayName: age => {
        var sayAge = function(age) {
            this.age = age
        }
        sayAge(age)
    }
}
people.sayName(5)
people.age // 26
age // 5
```

可答案却让我匪夷所思，箭头函数难道不应该把this指向它的上一层吗？这个我们在后面会解释

#### 作为构造函数调用

JavaScript 支持面向对象式编程，与主流的面向对象式编程语言不同， JavaScript并没有类（Class）的概念，而是使用基于原型（prototype）的继承方式（ES6中的Class其实是原型继承的语法糖）。相应的，JavaScript中的构造函数也很特殊，如果不适用new调用，则和普通函数一样。作为又一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用。如果调用正确，this绑定到新创建的对象上。

```javascript
function People(name, age) {
    this.name = name;
    this.age = age;
}
```

#### 使用 apply 或 call 调用

让我们再一次重申，在 JavaScript 中函数也是对象，对象则有方法，apply 和 call 就是函数对象的方法。这两个方法异常强大，他们允许切换函数执行的上下文环境（context）,即 this 绑定的对象。很多 JavaScript 中的技巧以及类库都用到了该方法。让我们看一个具体的例子：

```javascript
function People(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function(name, age) {
        this.name = name;
        this.age = age;
    }
}
var elaine = new People('elaine', 26);
var johan = {name: 'johan', age: 26};
elaine.sayName('elaine1', 261);
elaine.sayName.apply(johan, ['johan1', 261])
console.log(elaine.name) // elaine1;
console.log(elaine.age) // 261
console.log(johan) { name: "johan1", age: 261 }
```

在上面的例子中，我们使用构造函数生成了一个对象elaine，该对象同时具有 sayName 方法；使用对象字面量创建了另一个对象 johan，我们看到使用apply 可以将 elaine 上的方法应用到 johan 上，这时候 this 也被绑定到对象 johan 上，另一个 call 也具备相同的功能，不同的是最后的参数不是作为一个数组统一传入，而是分开传入的

```javascript
elaine.sayName.call(johan, 'johan1', 261)
```

回过头来看，apply 和 call 的语义就是 elaine的方法sayName作用于johan，sayName需要传入的参数，我从第二个参数开始传值；或者说 johan调用elaine 的sayName方法，从第二个参数开始传值

#### 箭头函数

与箭头函数相关的语法和特征我们会在ES6篇中着重描述，这里，我们只讲箭头函数与 this 的关系。在“作为函数调用”小节中我们使用箭头函数，试图让它绑定，但是却感觉错了

网上对箭头函数与this 关系的解释是：箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中的this的值和外层的this是一样的。这个解释很困扰我，就好比你看高中政治课本，一谈到马克思主义思想浪潮时虽然文字都看的懂，但是连在一起却那么的神奇，让人疑惑不止。

其实箭头函数很简单，和我们之前说作用域时谈到的动态作用域和静态作用域（词法作用域）有关系。this本身的机制和动态作用域很像，而箭头函数的出现，某种程度上规避了JavaScript 的设计缺陷（正确的设计方式应该是内部函数的 this 应该绑定到其外层函数对应的对象上）

```javascript
'use strict'; // 严格模式下
var people = {
    name: 'eliane',
    age: 26,
    sayName: () => console.log(this.name, this),
    sayName2: function() {
        console.log(this.name, this)
    }
}
people.sayName() // undefined Window {...}
people.sayName2() // elaine, peole {...}
```

使用箭头函数后，就不用管调用者是谁，它只关心在哪里调用

```javascript
var foo = {
	bar: {
        a: () => console.log(this)
    }
}
foo.bar.a() // window
```

## 3.函数的执行环境

我们之前一直在讲一件事，this是如何被调用的，也说了this是什么，那么我们来看看，一个函数被执行时会发生什么？

一个函数被执行时，会创建一个执行环境（或叫活动记录，或叫执行上下文，英文名 ExecutionContext），函数所有的行为都发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 arguments 变量，其中包含调用函数时传入的参数。接下来创建作用域链。然后初始化变量，首先初始化函数的形参表，值为 arguments 变量中对应的值，如果 arguments 变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ ExecutionContext ）创建成功后，函数执行时才会执行，这点对于我们理解JavaScript中的变量作用域非常重要。

最后是 this 变量赋值，如前所述，会根据函数调用方式的不同，赋给 this 全局对象，当前对象等。至此函数的执行环境（ ExecutionContext ）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（  ExecutionContext ）中读取



## 4. 结语

结语就留给后面的自己吧



















构造函数就是个模式，this未来会指向new出来的对象。创建 Person 的实例时，this.name 将引用新创建的对象，并将一个名为 `name` 的属性放入新对象中。