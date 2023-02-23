# call、apply、bind三大将

之前在讲 [this 关键字](./this关键字.md) 时，我们介绍过这三个 api，我们得出这样的结论：**call、apply 和 bind 都拥有"掰弯" this 指向的能力**

介于当时的重点是 this，对这三个 api 没有详细介绍，本文，我们来了解一下函数中所谓不多的原型方法——call、apply、bind

## Call

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)：call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

使用方法：

```javascript
let bar = {
    name: 'johnny'
}
function foo() {
    console.log(this.name)
}
foo.call(bar); // johnny
```

首先 call 是个原型方法，所以一个函数能很自然的使用此方法，即 foo 的 call 方法继承自 Function.prototype.call。其次，call 方法中传入的值会成为 foo 函数的 this 未来指向的对象

其本质是改变 this 指向，将 this 指向了（call 的）传入值

### 实现 call

我们根据之前的描述来实现 call

```javascript
Function.prototype.mycall = function(context = window, ...args) {
    if (this === Function.prototype) {
        return undefined // 防止 Function.prototype.mycall 直接调用
    }
    const fn = Symbol()
    context[fn] = this;
    const result = context[fn](...args)
    delete context[fn]
    return result
}
```

我们一步步分析，首先不支持`Function.prototype.mycall` 直接调用，

```javascript
Function.prototype.call(bar) // undefined
```

这个很好理解，Function.prototype 中本来就没有 this，调用了也XXX

```javascript
let context = context || window
```

因为要考虑如果 context 传入的是 null 呢

```javascript
foo.call(null);
```

如果是 null 的话，context 就指向 window，这个很好理解，防御性代码

```javascript
const fn = Symbol()
context[fn] = this;
const result = context[fn](...args)
```

在传入的 context 中设置一个属性，将 this 赋值给它，接着执行它

这是 call 函数的关键所在，我们在前文讲 call 示例时，就说到 call 会改变 this 指向，讲 this 指向传入的 context，所以我们在模式实现 call 时，就可以先将 this 存在 context 上的一个属性上，再执行它，this 的规则是谁调用它，它指向谁。这样 this 就指向了 context

```javascript
delete context[fn]
return result
```

删除 context 属性，释放内存，并返回结果值 result

call 实现就是如此，测试一波

```javascript
let bar = {
    name: 'johnny'
}
function foo() {
    console.log(this.name)
}
foo.mycall(bar);
```

## apply

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)：apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象的形式提供的参数

使用方法：

```javascript
let bar = {
    name: 'johnny'
}
function foo(age, hobby) {
    console.log(this.name, age, hobby)
}
foo.apply(bar, [28, 'sleep']); // johnny 28 sleep
// call 使用方法
// foo.call(bar, 28, 'sleep');
```

apply 和 call 使用上差不太多，只是传参方式不同

```javascript
foo.call(obj, param1, param2,...,paramN) // 传入一串参数
foo.apply(obj, [param1, param2,...,paramN]) // 第二参数为类数组
```

所以实现上 和 call 大差不差

### 实现 apply

```javascript
Function.prototype.myapply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined
    }
    const fn = Symbol()
    context[fn] = this
    
    let result;
    if (!Array.isArray(args)) {
        result = context[fn]()
    } else {
        result = context[fn](...args)
    }
   
    delete context[fn]
    return result
}
```

测试一波 myapply

```javascript
let bar = {
    name: 'johnny'
}
function foo(age, hobby) {
    console.log(this.name, age, hobby)
}
foo.myapply(bar, [28, 'sleep']); // johnny 28 sleep
```

## bind

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

使用方法：

```javascript
let bar = {
    name: 'johnny'
}
function foo(age) {
    console.log(this.name, age)
}
// 返回一个函数
let bindBar = foo.bind(bar)

bindBar(28) // johnny 28
```

与 call、apply 一样，它是函数的原型方法，不过与它们不同的是，它是 ES5 新增的方法，它返回的是一个函数（并且它还支持传参）

看到返回的是一个函数，就说明 bind 方法是一个闭包

### 实现 bind

```javascript
Function.prototype.mybind = function (context, ...args1) {
    if (this === Function.prototype) {
        throw new TypeError('Error')
    }
   	const _this = this
    return function F(...args2) {
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}
```

我们分析如何实现 bind

首先 bind 不能原型方法调用，如果使用就提示报错

其次我们根据 bind 的一个特性，对其的使用分为两种

> 一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当作构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数

也就是说，我们要判断它是否为构造函数调用，如果是则用 new 调用当前函数；如果不是，则使用 apply 来出现 context 

```javascript
// 判断是否是构造函数
if (this instanceof F) {
    // 如果是构造函数，则以 foo（即_this）为构造器调用函数
    return new _this(...args1, ...args2)
}
// 如果非构造函数，则用 apply 指向代码
return _this.apply(context, args1.concat(args2))
```

测试一波

```javascript
// 测试非构造函数使用
let bar = {
    name: 'johnny'
}
function foo(age, hobby) {
    console.log(this.name, age, hobby)
}
// 返回一个函数
let bindBar = foo.mybind(bar, 28)

bindBar('sleep') // johnny 28 sleep
```

```javascript
// 测试构造函数时使用
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function() {
    console.log('my name is ' + this.name)
}
let emptyObj = {}
var FakerPerson = Person.mybind(emptyObj)

var johnny = new FakerPerson('johnny', 28)
johnny.sayName() // my name is johnny
```



## 总结

call、apply、bind 三者都能修改 this 指向，其中 call、apply 在 ECMAScript 3 时定义，它们满足开发者的大部分需求，即改变 this 的指向，其原理是在将 this 赋值给 context（传入的值）的一个属性，并执行它（谁调用 this，this 指向谁）

而这两者的区别就是调用方法不同，call 自第二个参数开始传入一连串参数，apply 的第二个参数是一个数组，接受所有参数

它们也是实现 [继承](./继承.md) 的一种方法——借用构造函数 

而 bind 则是在 ECMAScript 5 出现，是对修改 this 指向的一种补充，它以闭包的形式存在，它有三个特点

- 返回的是一个函数
- 可以传入参数（使用bind和经bind生成的函数都可以传参）
- 使用 bind 生成的函数作为构造函数时，bind 时的指定 this 会失效，但传入的参数依然生效



## 衍生

> 思考题：数组和类数组有什么区别？

1. 类数组是拥有 length 属性和索引属性的对象
2. 不具有数组所具有的方法

类数组是个普通对象，而真实的数组是 Array 类型，所以类数组的原型关系和数组不同

常见的类数组有：arguments、DOM 对象列表（document.querySelectorAll）

类数组转换为数组

- Array.prototype.slice.call(arrayLike, 0)
- [...arrayLike]（扩展运算符）
- Array.from(arrayLike)



## 参考资料

-   [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)
-   [JavaScript 深入之 bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)
