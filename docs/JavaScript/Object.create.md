# Object.create

> 2006年，Douglas Grockford 写了一篇文章：[《JavaScript 中的原型式继承》](https://www.crockford.com/javascript/prototypal.html)（”Prototypal Inheritance in JavaScript“）。这篇文章介绍了一种不涉及严格意义上构造函数的继承方法。他的出发点式即使不自定义类型也可以通过原型继承对象之间的信息共享。文章最终给出了一个函数：
>
> ```javascript
> function object(o) {
>     function F(){}
>     F.prototype = o
>     return new F()
> }
> ```

于是乎，《JavaScript 高级程序设计》中的 JavaScript 就多了一种——原型式继承

于是乎，ECMAScript 5 新增了 Object.create() 方法将原型式继承的概念规范化

## 用法

```javascript
var obj = Object.create({name: 'johan', age: 23}) // obj 继承了属性name 和 age
var obj2 = Object.create(null) // obj2 不继承任何属性和方法
var obj3 = Object.create(Object.prototype) // 与 {} 和 new Object() 一个意思
var obj4 = Object.create({}, {
    property1: {
        value: true,
        writable: true
    }
}) // 第二个参数与 Object.defineProperties() 一致
```

## 图解 Object.create 实现

```javascript
function object(proto) {
    function F(){}
    F.prototype = proto
    return new F()
}
```

第一步：` function F(){}`

即创建一个函数，因为约定首字母大写，视为构造函数，创建函数 F 时，F 和 `F.prototype` 就有了这一层的关系

![Object.create1](https://s2.loli.net/2022/07/18/Wz6IN4xcOqTAQV3.png)

第二步：`F.prototype = proto`

即将 `F.prototype` 赋值为传入的对象o，如此就打破了`F.prototype = F.prototype` 以及 `F.prototype.constructor = F` ，它们的关系为

![Object.create2](https://s2.loli.net/2022/07/18/9ySQO4bKBFoCvNm.png)

第三步：`return new F()`

第三步的解读有点费解，实例化构造函数F，而构造函数的原型对象已经因为第二步变为了 proto（形参），所以 就有了 `new F().__proto__ = proto`

![Object.create3](https://s2.loli.net/2022/07/18/1TGVAU2sxHYgeDE.png)

第三步这样看，会有点看不明白，如果配合实际例子，就一目了然了，以这个例子为例

```javascript
var obj = Object.create({name: 'johan'})
```

第三步的图解就成了这样：

![Object.create4](https://s2.loli.net/2022/07/18/oEHPTOzdK2ZCS1D.png)

这样就成了， obj 继承自`{name: johan}` 这个对象，至于`F.prototype = {name: 'johan'}`，在调用完 `Object.create` 之后，也因为没人使用 F 函数而被引擎当作垃圾回收了，遂成了`obj.__proto__ = {name: 'johan'}`

如此「原型式继承」就被传承下来了

## Object.create(null)

在阅读源码时，常会看到 `Object.create(null)` ，用此初始化一个新对象，至于为什么用这个方法而不用 new Object 或者 {}，是因为无论 new 还是字面量，都是继承自 Object 构造函数，而使用Object.create(null) ，能得到一个没有任何继承痕迹的对象

```javascript
var obj = Object.create(null)
```

不信，你可以打印 obj 试试

