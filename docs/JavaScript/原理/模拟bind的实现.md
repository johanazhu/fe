# 模拟bind的实现



在之前的文章里，我们曾经说过，bind 能改变 this 的指向。并在 [这篇文章](../call、apply、bind的应用) 中详细介绍了 bind 的作用以及它的使用场景。这里我们来讲一下如何模拟实现 bind

先来看以下 MDN 对 bind 的介绍：

> `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

由此我们可以得出 bind 函数的两个特点：

1. 返回一个函数
2. 可以传入参数



### 返回函数的模拟实现

先从第一个特点开始，举个例子：

```javascript
var foo = {
    value: 1
}

function bar() {
    console.log(this.value)
}

// 返回一个函数
var bindFoo = bar.bind(foo)

bindFoo() // 1
```

关于指定 this 的指向，我们可以使用 call 或者 apply 实现，关于 call 或 apply 的实现，可以看[《模拟call和apply的实现》](../模拟call和apply的实现) 。我们查看第一版代码

```javascript
// 第一版
Function.prototype.mybind = function (context) {
    var self = this;
    return function () { 
        return self.apply(context)
    }
}
```

PS: 这里多说一句，其实 bind 使用的闭包

此外，之所以 `return self.apply(context)` ，是考虑到绑定函数可能有返回值，依然是这个例子：

```javascript
var foo = {
    value: 1
}

function bar() {
    return this.value
}

var bindFoo = bar.bind(foo)

console.log(bindFoo()) // 1
```



### 传参的模拟实现

我们要实现传参功能前，先看看在使用 bind 时传参会是怎么个样子

```javascript
var foo = {
    value: 1
}

function bar(name, age) {
    console.log(this.value)
    console.log(name)
    console.log(age)
}

var bindFoo = bar.bind(foo, 'elaine')

bindFoo(22)
// 1
// elaine
// 22
```

函数 bar 需要两个参数，bind 传递了 name ，在执行 bindFoo 时，在传入 age

说明 bind 能”带参入局“（带球过人）

所以我们要对 arguments 进行处理

我们的理论知识是，arguments 管理所有的参数，

```javascript
// 第二版
Function.prototype.mybind = function(context) {
    var self = this;
    // 获取 mybind 函数从第二个参数到最后一个参数
    // slice.call(arguments, 1) 这个使用太精髓了
    var args = Array.prototype.slice.call(arguments, 1)
    return function() {
        // 这里的 argments 是指 bind 返回函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(context, args.concat(bindArgs))
    }
}
```

第二版实现了 bind 函数传参的问题，精髓在于 slice 和 arguments 的配合



### 构造函数效果的模拟实现

bind还有一个特点，就是

```javascript
一个绑定函数也能使用new操作符来创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略，同时调用时的参数被提供给模拟函数
```

也就是说当 bind 返回的函数作为构造函数的时候， bind 时指定的 this 值会失效，但传入的参数依然生效。举个例子：

```javascript
var value = 2;

var foo = {
    value: 1
}

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(this.name)
    console.log(this.age)
}

bar.prototype.friend = 'johan';

var bindFoo = bar.bind(foo, 'elaine');

var obj = new bindFoo(18)
// undefined
// elaine
// 18
console.log(obj.habit) 
// shopping
console.log(obj.friend)
// johan
```

注意：尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefined，说明绑定的 this 失效了，如果大家知道 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj

所以我们可以通过修改返回的函数的原型来实现，

```javascript
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成`this instanceof fBound ? null : context`,实例只是一个空对象，将 null 改成 this，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    // 按上面的 demo 为例，this 指的是 bar(谁调用我，我指向谁)，fBound.protype=this.prototype 就是将 bar.prototype 赋值给了 fBound，供实例来继承 
    fBound.prototype = this.prototype;
    return fBound;
}
```



### 构造函数效果的优化实现

在第三版中，我们直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。看个例子

```javascript
// bind2 以 第四版 为基础
function bar() {}
var bindFoo = bar.bind2(null)
bindFoo.prototype.value = 1
console.log(bar.prototype.value) // 1
```

我们修改的是绑定函数 bindFoo 的 prototype ，却把 bar 的 prototype 也修改了。这是因为对象赋值是引用地址，所以改变 bindFoo 的 prototype 就是改变 bar 的 prototype 。这里有两个方案，一通过一个空函数来进行中转，二通过深拷贝来实现

#### 空函数进行中装

```javascript
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    
    var fNOP = function () {};
    
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

#### 深拷贝来实现

```javascript
Function.prototype.bind2 = function(context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1)
    
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    fBound.prototype = JSON.parse(JSON.stringify(this.prototype)) // 使用最简单的深拷贝
    return fBound
}
```



如果调用 bind 的不是函数咋办?

不行，我们要报错！

```javascript
if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
}
```



### 最终版本

```javascript
Function.prototype.bind2 = function(context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
    }
    
    var self = this;
    // 删除 context 后剩余的参数
    var args = Array.prototype.slice.call(arguments, 1)
    
    var fNOP = function () {}
    
    var bBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
    }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP
    return fBound
}
```

PS: 因为拷贝那个比较简单，所以我们用空函数进行中装为例



### ES6版本模拟bind

1. 处理参数，返回一个闭包

2. 判断是否为构造函数调用，如果是则使用 `new` 调用当前函数
3. 如果不是，使用 `apply` ，将 `context` 和处理好的参数传入

```javascript
Function.prototype.myBind = function (context, ...args1) {
    if (this === Function.prototype) {
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
    }
    const _this = this
    return function F() {
        // 判断是否用于构造函数
        if (this instanceof F) {
       
            return new _this(...args1, ...arguments)
        }
        return this.apply(context, args1.concat(arguments))
    }
}
```

测试用例 ：

```javascript
var foo = {
    value: 1
}

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(this.name)
    console.log(this.age)
}

bar.prototype.friend = 'johan';

var bindFoo = bar.myBind(foo, 'elaine');

var obj = new bindFoo(18)
// undefined
// elaine
// 18
console.log(obj.habit) 
// shopping
console.log(obj.friend)
// johan
```

如何理解 ` return new _this(...args1, ...args2)`

以上诉 demo 为例，`_this` 指的 是 bar，即第一次调用myBind时存在函数myBind中的变量，被闭包住了。

后面的（...args1, ...args2）就是使用扩展运算符，展开变量

 

bind的骚操作在于它可以用作构造函数，所以要判断返回的函数（闭包），是否是被实例化，如果实例化，就是基于 foo 来做实例化，参数为传来的所以参数

如果是当作一个普通函数调用，那么就用 apply 来调用







### 参考资料

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

[JavaScript深入之bind的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)