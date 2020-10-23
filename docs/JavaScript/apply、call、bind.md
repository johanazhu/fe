# apply、call、bind

https://github.com/mqyqingfeng/Blog/issues?page=4&q=is%3Aissue+is%3Aopen

先说结论：

apply

call

bind

这三者都能改变this 的指向。用法即 A.call(B, ...args)。将 A中的this 指针指向 B 

```javascript
function People(name) {
    this.name = name;
    this.sayName = function(){
        console.log('My name is ' + this.name)
    }
}
const elaine = new People('elaine');
console.log(elaine.sayName()) // My name is elaine
const johan = { name: "johan" }
console.log(elaine.sayName.call(johan)) // My name is johan
```

将 



### Call

> MDN：call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

举个例子：

```javascript
let bar = {
    myName: "johan"
}
function foo() {
    console.log(this.myName)
}
foo.call(bar) // johan
```

也就是说：调用foo函数的时候，调用使用call()，并且传入bar，使得foo函数内部的this指向了bar



#### 实现call

咱们根据这个结论来实现一下call

```javascript
Function.prototype.johanCall = function(context = window, ...params) {
    // 判断是函数才能调用call方法
    if (typeof this !== 'function') {
        return new TypeError("类型错误")
    }
    // 将this也就是被调用的函数，通过赋值给传入的对象，来达到将被调用的函数添加到传入的对象上的目的
    context.fun = this;
    // 用传入的对象来调用需要被调用的函数，并保留返回结果
    const result = context.fun(...params)
    // 删除传入对象上被添加的函数，防止内存泄漏
    Reflect.deleteProperty(context, 'fun')
    // 返回结果
    return result
}
```

其核心很简单，关键在一个点上，即 `context.fun = this` , 怎么理解这句话

注意，我们之前讲 this 篇章的时候，就讲过 this 亘古不变的指向原则——谁调用我，我指向谁。

在例子中，foo.call(bar)，即foo调用了call，call方法中的this指向的就是foo函数，所以this代指被调用的函数

梳理一下：

- 将被调用的函数作为一个属性添加到传入的对象上
- 从而可以实现在传入的对象上，调用需要被调用的函数
- 其核心原理还是this的指向原理：**谁调用我，我指向谁**













实现call

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

最开始，我们会疑惑，context.fn 怎么来的，但是别忘记了，this的指向为谁调用它就指向谁。

那么在 `bar.call2(foo)` 中，我们可以看出，调用 call2 函数的是 bar，所以 call2 中的 this 指向的是 bar

context.fn 的意思是

```javascript
// 伪代码
context.fn = function bar() {
    console.log(this.value)
} 
```

`context.fn()` 即执行 bar 









### 实现apply

apply其实和call差不多，只不过传递参数的方式不同

```javascript
foo.call(obj, [param1, param2,...,paramN]) // 参数为数组
foo.apply(obj, param1, param2,...,paramN) // 参数非数组，传入一串参数
```

咱们对上面的call稍微修改以下就是apply了

```javascript
Function.prototype.johanApply = function(context = window, params = []) {
    // 判断是函数才能调用apply方法
    if (typeof this !== 'function') {
        return new TypeError("类型错误")
    }
    // 将this也就是被调用的函数，通过赋值给传入的对象，来达到将被调用的函数添加到传入的对象上的目的
    context.fun = this;
    // 用传入的对象来调用需要被调用的函数，并保留返回结果
    const result = context.fun(...params)
    // 删除传入对象上被添加的函数，防止内存泄漏
    Reflect.deleteProperty(context, 'fun')
    // 返回结果
    return result
}
```

















