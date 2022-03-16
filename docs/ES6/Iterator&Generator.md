# 生成器与迭代器

## Iterator 迭代器

String、Array、Map、Set 等原生可迭代对象，因为他们都在原型（prototype）对象重实现了 Symbol.iterator 键对应的方法

for...of 是对象迭代器的遍历，而 for...in 是对象重可枚举值的遍历

我们使用的 `for in` 循环，是通过调用被循环对象的一个特殊函数 `Iterator` 来实现的，但是以前这个函数是隐藏的我们无法访问，从 Symbol 引入之后，我们就可以通过 `Symbol.iterator` 来直接读写这个特殊函数

```javascript
var students = {};
students[Symbol.iterator] = function () {
    let index = 1;
    return {
        next() {
            return { done: index > 100, value: index++ };
        },
    };
};

for (var i of students) {
    console.log(i);
}
```

## Generator 生成器

用法和定义一个普通的函数（function）几乎一样，只是在 function 关键字和函数名之前加入了星号\*

最大的特点是定义的函数可以被暂停执行，很类似我们打断调试代码：点击 RUN 按钮执行当前语句直到遇到下一个断点并暂停，不同的是 Generator 的这种暂停态和执行太是由代码来定义和控制的

yield 关键字用来定义代码暂停的地方，类似于给代码打断点，而 generator.next(value) 则用来控制代码的运行并出口 i 输入输出

```javascript
function* getNaturalNumber() {
    var seed = 0;
    while (true) {
        yield seed++;
    }
}

var gen = getNaturalNumber(); // 实例化一个 Generator

console.log(gen.next()); // {value: 0, done: false}
console.log(gen.next()); // {value: 1, done: false}
console.log(gen.next()); // {value: 2, donw: false}
```

如何利用 Generator 进行异步流程控制

将异步操作用 yield 关键字进行修饰，每当执行异步操作的时候，代码便在此暂停执行了。异步操作结束后，通过在回调函数里利用 next(data) 来控制 generator 的执行流程，并顺便将异步操作的结果 data 回传给 generator，执行下一步

Generator 函数是 ES6 提供的一种异步编程解决方案

Generator 是一个可以暂停和继续执行的函数。简单的用法，可以当作一个 Iterator 来用，进行一些遍历操作。复杂一些的用法，他可以在内部保存一些状态，成为一个状态机

Generator 的基本语法包含两部分

-   函数名前要加一个星号
-   函数内部用 yield 关键字返回值

可以理解为协程，就是说多个函数互相配合完成任务，类似于这样：

```javascript
function generator() {
    return {
        _value: [1, 2, 3, 4],
        next() {
            return {
                value: this._value.shift(),
                done: !this._value.length,
            };
        },
    };
}

const it = generator();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
```

## 参考资料

-   [JavaScript：生成器（Generator）](https://www.jianshu.com/p/da611c080feb)
