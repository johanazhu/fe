# 模拟 call 和 apply 的实现

## Call 实现

我们在 apply、call、bind 中曾经介绍过这三个 api 的作用，硬核掰弯 this 指向。这一节我们模拟实现 apply 和 call ，下一节我们介绍模拟实现 bind

我们先看一个例子：

```javascript
var foo = {
    value: 1,
};

function bar() {
    console.log(this.value);
}

bar.call(foo); //1
```

注意两点：

1. call 改变了 this 的指向，指向到 foo
2. bar 函数执行了

### 模拟实现第一步

那么如何模拟这两个效果呢？

试想当调用 call 的时候，把 foo 对象改造成如下：

```javascript
var foo = {
    value: 1,
    bar: function () {
        console.log(this.value);
    },
};

foo.bar(); // 1
```

这个时候 this 就指向了 foo，是不是很简单？

但这又给 foo 对象本身添加了一个属性，这可不行

不过也不用担心，我们用 delete 再删除它不就好了

模拟步骤如下：

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

以上个例子为例，就是

```javascript
// 第一步
foo.fn = bar;
// 第二步
foo.fn();
// 第三步
delete foo.fn;
```

fn 是对象的属性名，反正最后也要删除它，所以起成什么都无所谓

根据这个思路，我们尝试着写第一版的 mycall 函数：

```javascript
Function.prototype.mycall = function (context) {
    context.fn = this; // 谁调用this，this指向谁
    context.fn();
    delete context.fn;
};

// 测试一番
var foo = {
    value: 2,
};

function bar() {
    console.log(this.value);
}

bar.mycall(foo); // 2
```

打印出 2，是不是很开心 (～￣ ▽ ￣)～

### 模拟实现第二步

call 函数还能传参数执行函数。举个例子：

```javascript
var foo = {
    value: 1,
};

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.call(foo, 'johan', 22);
// johan
// 22
// 1
```

注意：传入的参数并不确定，这可咋办？

不急，我们可以从 arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组中

比如这样：

```javascript
// 以上个例子为例，此时的 arguments 为
// arguments = {
// 		0: foo,
// 		1: 'johan',
// 		2: 22,
// 		length: 3
// }
// 因为 arguments 是类数组对象，所以可以用 for 循环
var args = [];
for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}
// 执行后 args 为 ["arguments[1]", "arguments[2]", "arguments[3]"]
```

不定长的参数问题解决了，我们接着要把这个参数数组放到要执行的函数的参数里面去

```javascript
// 将数组里的元素作为多个参数放进函数的形参里
context.fn(args.join(','));
// 但这个方法肯定不行
```

也许有人想到用 ES6 的方法，不过 call 是 ES3 的方法，我们要为了模拟实现 ES3 的方法，要用到 ES6 的方法，好像......，可以是可以，但这次我们用 eval 方法拼成一个函数，类似于这样：

```javascript
eval('context.fn(' + args + ')');
```

这里的 args 会自动调用 Array.toString() 方法

所以我们的第二版克服了两大问题，代码如下

```javascript
Function.prototype.mycall2 = function (context) {
    context.fn = this;
    var args = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args + ')');
    delete context.fn;
};

// 测试一番
var foo = {
    value: 2,
};

function bar(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar.mycall2(foo, 'elaine', 22);
// elaine
// 22
// 2
```

成功~~

### 模拟实现第三步

模拟代码已经完成 80%，还有两个小点要注意：

1. this 参数可以传 null ， 当为 null 的时候，视为指向 window

举个例子：

```javascript
var value = 1;

function bar() {
    console.log(this.value);
}

bar.call(null); // 1
```

虽然这个例子本身不适用 call， 结果依然一样

2. 函数是可以有返回值的

举个例子：

```javascript
var foo = {
    value: 1,
};

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age,
    };
}

console.log(bar.call(foo, 'johan', 22));
// {
//		value: 1,
// 		name: 'johan',
// 		age: 22
// }
```

不过都很好解决，让我们直接看第三版也就是最后一版的代码：

```javascript
Function.prototype.mycall3 = function (context) {
    context = context || window;
    context.fn = this;

    var args = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args + ')'); // eval 不能用双引号

    delete context.fn;
    return result;
};
// 测试一番
var value = 3;

var foo = {
    value: 3,
};

function bar(name, age) {
    return {
        value: this.value,
        name: name,
        age: age,
    };
}
bar.mycall3(null);
console.log(bar.mycall3(foo, 'johan', 22));
// {
//		value: 3,
// 		name: 'johan',
// 		age: 22
// }
```

### 使用 ES6 来实现 call

道理如上所讲，这里只写代码：

```javascript
Function.prototype.mycall = function(context, ...args) {
    if (this === Function.prototype) {
        return undefined // 防止 Function.prototype.mycall() 直接调用
    }
    let context = context || window;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](..args) // 调用除context外的arguments参数
    delete context[fn];
    return result;
}
```

## apply 实现

apply 的实现跟 call 类似，这里直接给代码，代码来自于这知乎 郑航的实现：

```javascript
Function.prototype.myApply = function (context, arr) {
    context = context || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn;
    return result;
};
```

### ES6 模拟实现 apply

```javascript
Function.prototype.myapply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined;
    }
    const fn = Symbol();
    context[fn] = this;
    let result;
    if (!Array.isArray(args)) {
        result = context[fn]();
    } else {
        result = context[fn](...args);
    }

    delete context[fn];
    return result;
};
```

无论是 call 还是 apply，难点是 context.fn = this
