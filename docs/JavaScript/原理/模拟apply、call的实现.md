# 模拟apply、call的实现



为什么









### call、apply、bind的硬核指向以及模式实现

我们都知道this是根据谁调用它它就执行谁，而调用方式有这几种方式：函数调用，原型调用，主动硬核绑定，
这一节我们讲讲 使用 call、apply、bind 的硬核掰弯this性取向
一句话介绍call：   

> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法

举个例子：

```javascript
var foo = {
    value: 1
};

function bar() {
    console.log(this.value)
}

bar.call(foo) // 1
// 这个表达式的意思是：将 this 指向 foo ，并执行bar
```

注意两点：

```
1. call 改变了 this 的指向，指向到 foo
```

2. bar 函数执行了