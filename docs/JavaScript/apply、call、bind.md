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

第一版

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