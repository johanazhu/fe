# 迭代器与生成器



## Iterator 迭代器

迭代器是一个对象，它提供了一种标准的方式来访问集合中的每个元素，而无需暴露集合的底层结构。迭代器对象必须实现一个 `next()` 方法，该方法返回一个具有以下两个属性的对象：

- `value`：迭代器中的下一个值。
- `done`：一个布尔值，指示迭代是否已完成。如果 `done` 为 `true`，则 `value` 是迭代器返回的值（如果有）。

String、Array、Map、Set 等原生可迭代对象，因为它们都在原型（prototype）对象中实现了 `Symbol.iterator`键对应的方法

for...of 是对象迭代器的遍历，而 for...in 是对象中可枚举值的遍历

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



### 阿里的一道笔试题

就用到了迭代器的思想

```javascript
// 假设本地机器无法做加减乘除运算，需要通过远程请求让服务端来实现。
// 以加法为例，现有远程API的模拟实现

const addRemote = async (a, b) => new Promise(resolve => {
  setTimeout(() => resolve(a + b), 1000)
});

// 请实现本地的add方法，调用addRemote，能最优的实现输入数字的加法。
async function add(...inputs) {
  // 你的实现
}

// 请用示例验证运行结果:
add(1, 2)
  .then(result => {
    console.log(result); // 3
});


add(3, 5, 2)
  .then(result => {
    console.log(result); // 10
})

```

答案：

```javascript
// 迭代器思维
async function add(...args) {
	let res = 0;
    if (args.length < 2) return res;
    
    for (const item of args) {
        res = await addRemote(res, item)
    }
    return res;
}
```

具体可看[今天聊：大厂如何用一道编程题考察候选人水平](https://juejin.cn/post/6987529814324281380)



## Generator 生成器

生成器是一种特殊的函数，它可以暂停执行并生成多个值。[4](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 生成器函数使用 `function*` 语法声明，并在函数体中使用 `yield` 关键字生成值。[4](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) 每次调用生成器函数时，它都会返回一个新的生成器对象。

Generator的缺陷

- 类似 async，Generator 也有传染性，使用了 Generator 则上下文的其他函数也需要做出改变，心智负担比较重
- Generator 执行的中间状态是上下文关联的

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
