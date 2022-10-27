# this 关键字

先说结论：**谁调用它，this 就指向谁**

## 前言

在讲 [Function](./Function.md)、[作用域](./作用域.md) 时，我们都讲到了 this，因为 JavaScript 中的作用域是词法作用域，在哪里定义，就在哪里形成作用域。而与词法作用域相对应的还有一个作用域叫动态作用域，调用时去寻找它所处的位置。那个时候笔者就说 this 机制和动态作用域很像

## 关于 this

### 为什么使用 this

我们解释一下为什么要使用 this，用一个例子

```javascript
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm" + identify.call(this);
    console.log(greeting);
}

var me = {
    name: 'johan',
};

var you = {
    name: 'elaine',
};

identify.call(me); // JOHAN
identify.call(you); // ELAINE

speak.call(me); // Hello, I'm JOHAN
speak.call(you); // Hello, I'm ELAINE
```

这段代码可以在不同的上下文对象（me 和 you）中重复使用函数 identity() 和 speak()，不用针对每个对象编写不同版本的函数

如果不适用 this，那就需要给 identify() 和 speak() 显式传入一个上下文对象

```javascript
function identify(context) {
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = "Hello, I'm" + identify(context);
    console.log(greeting);
}

identify(you); // ELAINE
speak(me); // Hello, I'm JOHAN
```

看到这里你也许明白了，this 是一种更为优雅的”传递”对象引用的方式。这个例子还过于简单，当你遇到 n 个函数（或叫方法）之间的调用时，显式传值无疑会变得混乱。除此之外，在原型中，构造函数会自动引入合适的上下文对象是极为重要的

### this 到底是什么

this 到底是一种什么样的机制

1. this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件；
2. this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式；
3. 当一个函数被调用时，JavaScript 会创建一执行上下文，携带所有的信息（包括 this、词法环境、变量环境）。this 就是执行上下文（context）中的一条信息，它代表是谁调用它

## 调用方式

正如上面所讲，this 是在运行时绑定的，它的上下文取决于函数调用时的各个条件。在 JavaScript 中函数的调用有以下几种方式：作为对象方法调用，作为函数调用，作为构造函数调用，和使用  call / apply / bind调用。下面我们按照调用方式不同，分别讨论 this 的含义

### 作为对象方法调用

在 JavaScript 中，函数也是对象，因此函数可以作为一个对象的属性，此时该函数被称为该对象的方法，在调用这种调用方式时，this 被自然绑定到该对象

```javascript
var people = {
    name: 'elaine',
    age: 28,
    sayName: function () {
        console.log(this.name);
    },
};
people.sayName(); // elaine
```

### 作为函数调用

函数也可以直接被调用，此时 this 绑定到全局对象。在浏览器中，window 就是该全局对象。比如下面的例子：函数被调用时，this 被绑定到全局对象，接下来执行赋值语句，相当于隐式的声明了一个全局变量，这显然不是调用者希望的

```javascript
function sayAge(age) {
    this.age = age;
}
sayAge(5);
// age 已经成为一个值为 5 的全局变量
```

对于内部函数，即声明在另外一个函数体内的函数，这种绑定到全局对象的方式会产生另外一个问题。我们以前文所写的 people 对象为例，这次我们希望在 sayName 方法内定义一个函数，函数打印年龄。发现people.age 没有改变，而全局多了一个 age 变量

```javascript
var people = {
    name: 'elaine',
    age: 28,
    sayName: function (age) {
        var sayAge = function (age) {
            this.age = age;
        };
        sayAge(age);
    },
};
people.sayName(5);
people.age; // 28
age; // 5
```

这属于 JavaScript 的设计缺陷，正确的设计方式是内部函数的 this 应该绑定到其外层函数对应的对象上，为了规避这一设计缺陷，我们的办法是变量代替的方式，约定俗成，该变量一般被称为 that

```javascript
var people = {
    name: 'elaine',
    age: 28,
    sayName: function (age) {
        var that = this;
        var sayAge = function (age) {
            that.age = age;
        };
        sayAge(age);
    },
};
people.sayName(5);
people.age; // 5
age; // 没有定义
```

### 作为箭头函数调用

当然，我们使用 ES6 中的箭头函数时，觉得它也能实现同样的效果

```javascript
var people = {
    name: 'elaine',
    age: 28,
    sayName: (age) => {
        console.log(this)
        var sayAge = function (age) {
            this.age = age;
        };
        sayAge(age);
    },
};
people.sayName(5);
people.age; // 28
age; // 5
```

可答案却不如人意，箭头函数不应该没有 this 吗，它的 this 不是需要在外部词法环境中找吗

其实箭头函数很简单，和我们之前说作用域时谈到的动态作用域和静态作用域（词法作用域）有关系。this 本身的机制和动态作用域很像，而箭头函数的出现，某种程度上规避了 JavaScript 的设计缺陷（理想中的设计方式应该是内部函数的 this 应该绑定到其外层函数对应的对象上）

```javascript
var people = {
    name: 'eliane',
    age: 28,
    sayName: () => console.log(this.name, this),
    sayName2: function () {
        console.log(this.name, this);
    },
};
people.sayName(); //  '', Window
people.sayName2(); // elaine, {name: 'eliane', age: 28}
```

使用箭头函数后，就不用管调用者是谁，它只关心在哪里定义

```javascript
var foo = {
    bar: {
        a: () => console.log(this),
    },
};
foo.bar.a(); // window
```

回头看这题：

```javascript
var people = {
    name: 'elaine',
    age: 28,
    sayName: (age) => {
        console.log(this)
        var sayAge = function (age) {
            this.age = age;
        };
        sayAge(age);
    },
};
```

箭头函数下，它函数下的 this 指向的是外部词法环境，与谁调用无关。而这题中 sayName 函数中的打印 this，往外找只能找到 window

如果要实现题目的功能，应该将打印放在 sayAge 中，这样，this 才会指向它的外层 sayName 函数

```javascript
var people = {
    name: 'elaine',
    age: 28,
    sayName: function(age) {
        var sayAge = (age) => {
          	console.log(this)
           	this.age = age;
        };
        sayAge(age);
    },
};
people.sayName(5);
people.age; // 5
age; // 没有定义
```

### 作为构造函数调用

JavaScript 支持面向对象编程，与主流的面向对象编程语言不同， JavaScript 并没有类（Class）的概念，而是使用基于原型（prototype-base）的继承方式。同样约定俗称，首字母大写的函数被称为构造函数，我们使用 new 调用时，this 会绑定到实例对象上

```javascript
function People(name, age) {
    this.name = name;
    this.age = age;
}
var elaine = new People('elaine', 28)
console.log(elaine) // {name: "elaine", age: 28}
```

### 使用 call / apply / bind 调用

让我们再一次重申，在 JavaScript 中函数也是对象，对象则有方法，call 、 apply 、 bind 就是函数对象的方法。这三个方法异常强大，他们允许切换函数执行的上下文环境（context），即 this 绑定的对象。很多 JavaScript 中的技巧以及类库都用到了该方法。让我们看一个具体的例子：

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function(name, age) {
        this.name = name;
        this.age = age;
    }
}
var elaine = new Person('elaine', 28);
var johan = {name: 'johan', age: 28};
elaine.sayName('elaine1', 281);
elaine.sayName.apply(johan, ['johan1', 281])
// 如果用call elaine.sayName.call(johan, 'johan1', 281)
console.log(elaine.name) // elaine1;
console.log(elaine.age) // 281
console.log(johan) // { name: "johan1", age: 281 }
```

在上面的例子中，我们使用构造函数生成了一个对象 elaine，该对象同时具有 sayName 方法；使用对象字面量创建了另一个对象 johan，我们看到使用 apply 可以将 elaine 上的方法应用到 johan 上，这时候 this 也被绑定到对象 johan 上，另一个 call 也具备相同的功能，不同的是最后的参数不是作为一个数组统一传入，而是分开传入的

回过头来看，apply 和 call 的语义就是 elaine 的方法 sayName 作用于 johan ，sayName 需要传入的参数，我从第二个参数开始传值；或者说 johan 调用 elaine 的 sayName 方法，从第二个参数开始传值

call、apply 、bind 具有掰弯 this 指向的能力。有关 call/apply/bind 更详细的介绍，笔者会在这篇文章——[call、apply、bind 三大将](./call、apply、bind三大将.md)中详细描写

## 函数的执行环境

我们之前一直在讲一件事，this 是如何被调用的，也说了 this 是什么，那么我们来看看，当一个函数被执行时会发生什么

一个函数被执行时，会创建一个执行环境（或叫执行上下文，英文名 ExecutionContext），函数所有的行为都发生在此执行环境中，构建该执行环境时，JavaScript 首先会创建 arguments 变量，其中包含调用函数时传入的参数。接下来创建作用域链。然后初始化变量，首先初始化函数的形参表，值为 arguments 变量中对应的值，如果 arguments 变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ ExecutionContext ）创建成功后，函数执行时才会执行，这点对于我们理解 JavaScript 中的变量作用域非常重要

最后是 this 变量赋值，如前所述，会根据函数调用方式的不同，赋给 this 全局对象，当前对象等。至此函数的执行环境（ ExecutionContext ）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（ ExecutionContext ）中读取。其更详细地介绍会在 [执行上下文与调用栈](./执行上下文与调用栈.md) 一文中详细介绍

## this 有什么作用

全局执行上下文中：this 指向了 `window` 对象，方便我们来调用全局 `window` 对象

函数执行上下文中：this 指向了调用该函数的对象，减少的参数的传递，原来如何需要在函数内部操作被调用对象，当然还需要将对象作为参数传递进去，而又了 `this`，就不需要了，直接拿 `this` 就可以操作该调用对象的属性

## 总结

构造函数就是个模板，this 未来会指向 new 出来的对象。创建 Person 的实例时，this.name 将引用新创建的对象，并将一个名为 name 的属性放入新对象中

this 其实很好理解，它就是一个代词，表示“这个”

生活中遇到一些事物规律，我们归纳总结，得出结论，用一个名词代替这个规律，例如马太效应，墨菲定律，我们约定俗成，这个词就是表示这些意。这样一抽象，彼此信息消耗就减少了。this 其实很好理解，this 就代指”这个“

```javascript
var foo = {
    value: 1,
};
function bar() {
    console.log(this.value);
}
bar();
```

调用函数 bar，函数中的 this 就默认代指 window。window 上没有 value，那结果就是 undefined。

```javascript
var foo = {
    value: 1,
};
function bar() {
    console.log(this.value);
}
bar.call(foo);
```

call/apply 能硬核掰弯 this 指向，将 this 指向第一个参数，所以这段代码中，this 代指 foo ， foo 上有 value，所以打印结果是 1

针对 JavaScript 中的 [this 指向问题](https://www.zhihu.com/question/412637481/answer/1539325572)，知乎上有人曾经回答过：

-   this 的灵活指向，属于 JavaScript 自己发明的语言
-   this 指向存在的问题是公认的
-   this 的这种设计既不利于代码可读性，也不利于性能优化，完全可对其世家强制性
-   this 设计问题的更远，是产品营销需求与设计师个人偏好之间的冲突

this 是万恶之源，大家都是（词法）静态作用域，就它玩动态

## 参考资料

-   [重学 this 关键字](https://mp.weixin.qq.com/s?__biz=MzUxNzk1MjQ0Ng==&mid=2247484231&idx=1&sn=36db9c6d78b541e73a40cf3e496691fe&chksm=f9910596cee68c80f6d81196644fe5e2ebf84a6e66b11df36276542aa6ab11135affcc23d662&mpshare=1&scene=1&srcid=&sharer_sharetime=1567987883759&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

-   [完整梳理 this 指向](https://mp.weixin.qq.com/s?__biz=MzA3MTI3Mjk3NA==&mid=2247483660&idx=1&sn=4cc5c66b988e79f39587af46f51b9e95&chksm=9f315e6da846d77b89863afbab30e3dc5d0396bac49aad6e7c9da72882ba378e782a8cd8f61b&mpshare=1&scene=1&srcid=&sharer_sharetime=1566956479051&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)

-   [面试三板斧——this](https://mp.weixin.qq.com/s?__biz=Mzk0OTIwOTc5Ng==&mid=2247486796&idx=1&sn=4dafaba462e11b32791a7ed629af9bfc&source=41#wechat_redirect)
