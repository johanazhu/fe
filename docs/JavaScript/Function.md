# Function（函数）

在 [JavaScript 中的始皇](./JavaScript中的始皇.md) 一文中，笔者有个观点：

> Object.prototype 是真正的始皇，任何原型都源自它；而 Function.prototype 是仅次于 Object.prototype 的存在，它是内置构造函数的创建者，任何构造函数都源自它

所以 Function 的原型有一定的重要性，Function（构造函数） 与 Function.prototype（原型）又是相生相伴的关系，从构造函数层面，它已经比 Array、String、Number 等重要了，虽然比不上 Object，但也是仅次于它的存在

不仅如此，函数还能做很多事情。首先，它是个对象，这一知识点我们在 [一切皆对象](./一切皆对象.md) 中解释过，所以它和对象一样，也有属性，也可以赋值给变量。除此之外，函数可以自身当作参数传递，也具有返回值的特性

总之，对象能做的它都能做，它还有自身的特性，能做更多的事情（例如：能作为参数传递，有返回值）

在解释函数的特性之前，先了解下它的属性和方法

## 属性和方法

看例子说话

```javascript
function func() {}
console.dir(func)
```

![Function的属性与方法](https://s2.loli.net/2022/08/01/Gf4w6npJvcdZbYQ.png)

我们用函数声明的形式创建了一个普通函数 func，打印它。虽然我们没有对其进行任何的赋值操作，但它自身自带了各种属性，很显然，Function 是没有静态方法的，它只有实例属性和实例方法，都继承自 Function.prototype。我们看到函数 func 上有 `arguments`、`caller`、`length`、`name` ，这些都是继承自 Function.prototype，在 `func.__proto__` 中你能找到同样的属性，这其中的秘密是`Function.__proto__ === Function.prototype`，具体可看 [JavaScript 中的始皇](./JavaScript中的始皇.md) 了解

### 实例属性

-   `Function.prototype.arguments`：对应传递给函数的参数数组
-   `Function.prototype.constructor`：指向构造函数
-   `Function.prototype.length`：参数数量

### 实例方法

-   `Function.prototype.apply(thisArg [, argsArray])`：调用一个函数并将其 `this` 值设置为提供的传参，第二个参数以数组对象传入
-   `Function.prototype.call(thisArg [, arg1, arg2, ...argN])`：调用一个函数并将其 `this` 值设置为提供的传参，也可以选择传输新参数
-   `Function.prototype.bind(thisArg[, arg1[, arg2[, ...argN]])`：创建一个新函数，该函数在调用时，会将 this 设置为提供的`thisArg`。在调用新绑定的函数时，可选的参数序列（`[, arg1[, arg2[, ...argN]]]`）会被提前添加到参数序列中
-   `Function.prototype.toString()`：返回表示函数源码的字符串。覆盖了 `Object.prototype.toString` 方法

更多信息可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

了解 Function 的实例属性和方法后，我们去看看如何创建函数

## 创建函数

创建函数有四种方法：函数构建函数、函数声明、函数表达式、箭头函数

```javascript
// 函数构造函数：最后一个参数为函数逻辑，之前的都是参数
var add = new Function('x', 'y', 'return x + y');

// 函数声明
function add2(x, y) {
    return x + y;
}
// 函数表达式
var add3 = function (x, y) {
    return x + y;
};
// 箭头函数
var add4 = (x, y) => x + y
```

这里需要说明的是，在正常开发中，函数构造函数基本用不到。开发中用的比较多的是函数声明、函数表达式、箭头函数，那么三者有什么区别呢？

先对比函数声明和函数表达式

- 函数声明会引起函数提升（且优先级比变量提升高）

再对比箭头函数与普通函数

- 没有 this，函数体内的 this 需在外部词法环境中查找
- 没有 arguments
- 不可以当作构造函数。也就是说，箭头函数不能使用 new 命令，否则会抛出一个错误
- 没有 super
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数
- 返回对象时必须在对象外面加上括号

创建函数就是如此，创建了如何调用函数呢？

## 调用函数

在不同的场景下，调用函数各显不同，以下几种为调用函数的方式

-   作为函数
-   作为方法
-   作为构造函数
-   使用  call/apply/bind
-   自调用函数

```javascript
// 作为函数
var func1 = function () {
    return 'foo';
};
console.log(func1); // foo

// 作为方法，即对象中的函数被称为方法
var obj1 = {
    func2: function () {
        return 'bar';
    },
};
console.log(obj1.func2()); // bar

// 作为构造函数
function Person() {
    this.name = 'johnny'
    this.age = 28;
    this.gender = 'female';
    this.getName = function () {
        return this.name;
    };
}
var cody = new Cody(); // 调用构造函数
console.log(cody);

// 使用 call/apply 调用
var obj2 = {
    sayHello: function () {
        console.log(this.name, arguments[0], arguments[1]);
    },
};
var johan = { name: 'johan' };
var elaine = { name: 'elaine' };

// 在 johan 对象上调用 sayHello
obj2.sayHello.call(johan, 'foo', 'bar'); // johan, foo, bar

obj2.sayHello.apply(elaine, ['foo', 'bar']); // elaine, foo, bar

// 自调用
(function() {
    console.log('自调用函数');
})();
```

无论是创建函数，还是调用函数，能有什么用，能证明函数是一等公民吗？

## 函数为什么是一等公民

接下来，我们来解释为什么说函数是一等公民？

首先，函数是对象，这意味着函数可以存储在一个变量、数组或对象中。其次，因为是对象，所以它也拥有对象的特性，即它拥有属性。除了对象的特征外，作为函数本身，它可以作为参数传递，也可以作为返回值返回。如此，这些因素就构成了函数成为 JavaScript 中的”一等公民“

```javascript
// 作为变量保存变量、数组、对象
var funcA = function () {} // 作为变量
var funcB = [function(){}] // 作为数组变量
var funcC = { method: function() {} } // 作为对象方法

// 函数也是对象，意味着可以拥有属性
var funcD = function () {}
funcD.name = 'funcD' // 赋值name

console.log(funcD.name) // funcD

// 作为参数
var funcE = function(func) {
    func()
}
funcE(function () {
    console.log('函数作为参数传递')
})

// 作为函数返回值
var funcF = function (x, y) {
    return x + y // 函数特性，有返回值
}
console.log(funF(1,2)) // 3
```

> PS：所谓的一等公民，即 first-class function，也被称为头等函数，[维基百科](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)上对其的介绍是：
>
> 函数可以作为别的函数的参数、函数的返回值，赋值给变量或存储在数据结构中
>
> 同理，[MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/First-class_Function)也是同样介绍 

其中函数作为参数传递和有返回值的特性，使其成为函数式编程的基础

因为函数不仅有对象的能力，而且还有参数传递和有返回值的独有特性，所以使得它成为一等公民。不仅如此，函数还有其他的特性

## 函数的其他特性

函数作用域：JavaScript 中的作用域分为全局作用域、函数作用域和块级作用域，块级作用域是 ES6 之后出现的解决变量提升存在变量覆盖、变量污染等设计缺陷而出的特性。在此之前，只有全局作用域和函数作用域，全局只有一个作用域好理解。函数作用域是认识 JavaScript 重要知识点——闭包的基础，有关作用域的知识点，可以看这篇文章——[作用域](./作用域.md)

this：this 是什么，在写原型、构造函数时，我们曾经在构造函数中使用过 this，并在 new 实例化它时，说 new 关键字会将构造函数中的 this 指向新对象并执行构造函数中的代码，那么 this 和什么有关呢？

它和作用域有点像，但不完全一致，它是与执行上下文绑定的，我们会先聊 [this关键字](./this关键字.md) ，在此基础上会衍生出[call、apply、bind 三大将](./call、apply、bind三大将.md) 。再回头看 执行上下文，不过再聊它之前，先把 [词法环境](./词法环境.md) 讲清楚，之后再说 [执行上下文与调用栈](./执行上下文与调用栈.md) 

讲了作用域、就会衍生出作用域链。讲了this关键字，就会引出执行上下文，两者一结合，就解释了[闭包](./闭包.md)，闭包是 JavaScript 中的难点。如果说原型是”少女杀手“，那么闭包就是”师母杀手“

函数有多种形式，如IIFE，即 [立即执行函数](./立即执行函数（IIFE）.md)，为什么它这么做，这么做为了避免变量被污染。而后的 AMD/CMD，ES中的模块化，都是为了让代码能独立不被别的文件影响

总之，函数有很多特性，因为这些特性，函数才能成为在 JavaScript 中叱诧风云的”人物“

## 总结

我们就函数的属性、方法说起，介绍了 Function 内置的属性和方法，这样是为了方便开发者调用。接着我们介绍如何创建函数，介绍了四种方法，创建了函数就调用函数，分五种情况介绍。最后我们介绍了函数为什么成为一等公民。成为一等公民，首先是因为它是对象，拥有对象的”能力“，其次，它自身有一些特性让其变得独一无二，例如能作为参数传递，有返回值，这两者是函数式编程的基础

你以为函数就这么简单？那你小瞧函数了

函数的特性还有函数作用域，相对全局作用域，块级作用域，函数作用域的实际用处高达90%；还有this，Function 的原型方法中的 call/apply/bind 就是为了修改 this 而存在的，说明修改 this 指向是个高频操作，this 的解释会引出执行上下文，与作用域中的作用域链结合，就能解释闭包行为。闭包又能衍生出词法环境、执行上下文与调用栈、以及闭包的应用防抖与节流、柯里化。垃圾回收机制等等

总之，函数在 JavaScript 的地位是很高的



## 参考资料

- [如何理解在 JavaScript 中 "函数是第一等公民" 这句话?](https://www.zhihu.com/question/67652709)
