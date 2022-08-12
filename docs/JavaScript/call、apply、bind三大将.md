# call、apply、bind三大将

之前在讲 [this 关键字](../this关键字.md) 时，我们介绍过这三个 api，我们得出这样的结论：**call、apply 和 bind 都拥有"掰弯" this 指向的能力**

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

打个比喻，foo 函数就是家业，call 方法就是传承、继承，call 中的值就是被授予者，例如爸爸把家业传给了儿子











### 实现 call

咱们根据这个结论来实现一下 call

```javascript
Function.prototype.call1 = function (context = window, ...params) {
    // 判断是函数才能调用call方法
    if (typeof this !== 'function') {
        return new TypeError('类型错误');
    }
    // 将this也就是被调用的函数，通过赋值给传入的对象，来达到将被调用的函数添加到传入的对象上的目的
    context.fun = this;
    // 用传入的对象来调用需要被调用的函数，并保留返回结果
    const result = context.fun(...params);
    // 删除传入对象上被添加的函数，防止内存泄漏
    Reflect.deleteProperty(context, 'fun');
    // 返回结果
    return result;
};
```

其核心很简单，关键在一个点上，即 `context.fun = this` , 怎么理解这句话

注意，我们之前讲 this 篇章的时候，就讲过 this 亘古不变的指向原则——谁调用我，我指向谁

在例子中，foo.call(bar)，即 foo 调用了 call，call 方法中的 this 指向的就是 foo 函数，所以 this 代指被调用的函数

梳理一下：

-   将被调用的函数作为一个属性添加到传入的对象上
-   从而可以实现在传入的对象上，调用需要被调用的函数
-   其核心原理还是 this 的指向原理：**谁调用我，我指向谁**

实现 call

```javascript
Function.prototype.call2 = function(context) {
    // 首先要获取调用call2的函数，用 this 可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

var foo = {
    value: 1;
}

function bar() {
    console.log(this.value)
}
bar.call2(foo); // 1
```

最开始，我们会疑惑，context.fn 怎么来的，但是别忘记了，this 的指向为谁调用它就指向谁。

那么在 `bar.call2(foo)` 中，我们可以看出，调用 call2 函数的是 bar，所以 call2 中的 this 指向的是 bar

context.fn 的意思是

```javascript
// 伪代码
context.fn = function bar() {
    console.log(this.value);
};
```

`context.fn()` 即执行 bar

## apply

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)：apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象的形式提供的参数



使用方法：

```javascript
let bar = {
    name: 'johnny'
}
function foo() {
    console.log(this.name)
}
foo.call(bar); // johan
```

也就是说：调用 foo 函数的时候，调用使用 call()，并且传入 bar，使得 foo 函数内部的 this 指向了 bar

### 实现 apply

apply 其实和 call 差不多，只不过传递参数的方式不同

```javascript
foo.call(obj, [param1, param2,...,paramN]) // 参数为数组
foo.apply(obj, param1, param2,...,paramN) // 参数非数组，传入一串参数
```

咱们对上面的 call 稍微修改以下就是 apply 了

```javascript
Function.prototype.Apply1 = function (context = window, params = []) {
    // 判断是函数才能调用apply方法
    if (typeof this !== 'function') {
        return new TypeError('类型错误');
    }
    // 将this也就是被调用的函数，通过赋值给传入的对象，来达到将被调用的函数添加到传入的对象上的目的
    context.fun = this;
    // 用传入的对象来调用需要被调用的函数，并保留返回结果
    const result = context.fun(...params);
    // 删除传入对象上被添加的函数，防止内存泄漏
    Reflect.deleteProperty(context, 'fun');
    // 返回结果
    return result;
};
```



> 思考题：数组和类数组有什么区别？





## bind

> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用

使用方法：

```javascript
let bar = {
    name: 'johnny'
}
function foo() {
    console.log(this.name)
}
foo.call(bar); // johan
```







## 参考资料

-   [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)
-   [JavaScript 深入之 bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)
