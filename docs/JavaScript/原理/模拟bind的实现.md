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































参考资料：

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)