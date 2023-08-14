# Object（对象）

先回顾下之前一节所讲知识

- 引用类型指的是 object
- object 包括内置对象、宿主对象、自定义对象
- 内置对象中有 Object、Function、Array、String、Number、Boolean 等原生对象构造函数
- 在 JavaScript 中，一切皆对象（除 undefined、null 外）

无论是内置对象，还是自定义对象，都是基于 Object 来创建，其中的原理是原型继承，所以笔者喜欢称 Object.prototype 为“始祖巨人”，一切力量源于尤弥尔

我们看看 Object 是什么，它能做什么，并将其扩展，连接 Object 相关的各个知识点。知识列表如下：

- 属性与方法

* 如何创建对象

- 如何拷贝对象

* 对象继承的秘密——原型

- 继承的九种方法

## 属性与方法

> JavaScript 对象可以从一个称为原型的对象里继承属性。对象的方法通常是继承的属性。这种”原型式继承“（prototypal inheritance）是 JavaScript 的核心特征

可以看下这个例子

```javascript
var johan = { name: 'johan' };
console.dir(johan);
```

![Object的属性与方法](https://s2.loli.net/2022/07/16/imQTkLKrvhHlgUB.png)

能看出，我们使用对象字面量的方法创建了一个对象实例 johan，并赋予了一个属性 name，值为 johan，当打印日志时，发现多了一个对象`[[Prototype]]`，并且这个对象中有很多对象

这是因为「对象字面量」创建的实例，在底层已经做了「隐式继承」的操作，它和 `new Object('johan')` 是一个意思，除此之外，如果使用 new ，会进行原型继承，`[[prototype]]` 正是继承 Object 的原型（即 Object.prototype）

这里，不妨多说一句，实例是继承 Object.prototype，而不是 Object，原型才会被继承，构造函数是个空壳，不信，你打印 Object 和 Object.prototype，看看内容

`console.dir(Object)`如下图所示：

![console.dir(Object)](https://s2.loli.net/2022/07/16/IoMXpZcviF2J5We.png)

`console.dir(Object.prototype)`如下图所示

![console.dir(Object.prototype)](https://s2.loli.net/2022/07/16/HPsW8NSKZmBEQVx.png)

johan 的 `[[prototype]]` 和 Object 的 prototype 的内容一致

关于原型和继承的内容后文会详细说明，这里埋个伏笔

看以上例子，你能发现 Object 的属性和方法不少，而且它的实例也有属性和方法，这里对其进行说明注解

### 静态方法

- `Object.assign()`：通过复制一个或多个对象来创建一个新的对象
- `Object.create()`：使用指定的原型对象和属性创建一个新对象
- `Object.defineProperty()`：给对象添加一个属性并指定该属性的配置
- `Object.defineProperties()`：给对象添加多个属性并分别指定它们的配置
- `Object.entries()`：返回给定对象自身可枚举属性的 `[key, value]` 数组
- `Object.keys()`：返回一个包含所有给定对象自身可枚举属性名称的数组
- `Object.values()`：返回给定对象自身可枚举值的数组

### 实例属性

- `Object.prototype.constructor`：一个引用值，指向 Object 构造函数
- `Object.prototype.__proto__`：指向一个对象，当一个 object 实例化时，使用该对象作为实例化对象的原型

### 实例方法

- `Object.prototype.hasOwnProperty()`：返回一个布尔值，用于表示一个对象自身是否包含指定的属性，该方法并不会查找原型链上继承来的属性
  - 用 `hasOwnProperty` 就能检测出，它能区别自身属性与继承属性
- `Object.prototype.isPrototypeOf()`：返回一个布尔值，用于表示该方法所调用的对象是否在指定对象的原型链中
- `Object.prototype.toString()`：返回一个代表该对象的字符串。
- `Object.prototype.valueOf()`：返回指定对象的原始值

更多信息可以查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

了解 Object 的属性、方法，以及基于它创建的实例属性和方法后，我们去看看如何创建对象

## 创建对象

有三种方法。对象直接量、关键字 new、 Object.create 函数来创建对象

### 对象直接量

创建一个新对象的最简单的方法，就是用对象直接量，就如使用以下语句：

```javascript
var obj = {};
```

`{}` 表示的 `new Object()`

### 关键字 new

使用 new 创建新对象，一般要跟随一个函数调用。这里的函数称为构造函数（constructor），构造函数用以初始化一个新创建的对象。例如：

```javascript
var obj = new Object(); // 效果如同 var obj = {}
```

更多内容，可查看这篇 [new 做了什么](./new做了什么.md)

### Object.create

此方法是 ECMAScript 5 定义了，它牵扯到原型、继承等方面的知识。简单来说，它创造了一个新对象，其中第一个参数就是这个对象的原型。而第二个可选参数，是对其属性的更多描述。例如：

```javascript
var obj = Object.create({ name: 'johan', age: 23 }); // obj 继承了属性name 和 age
var obj2 = Object.create(null); // obj2 不继承任何属性和方法
var obj3 = Object.create(Object.prototype); // 与 {} 和 new Object() 一个意思
```

更多内容，可查看这篇 [Object.create](./Object.create.md)

之所以将 new 和 Object.create 单独拿出来说，是因为两则都是比较重要的知识点，非一两句就能说明白

了解 Object 是如何创造的之后，我们看看如何赋值

## 如何拷贝对象

赋值是简单的，但赋值后的再赋值，就会引起源对象被修改

```javascript
var o1 = { name: 'johan' };
var o2 = o1;
o2.name = 'elaine';
console.log(o1); // {name: 'elaine'}
console.log(o2); // {name: 'elaine'}
```

之前文章也说过，因为 Object 是引用类型，引用类型的拷贝拷贝的是引用地址，所以当 o2 被修改时，o1 也随之被修改

针对如何拷贝对象，这篇文章 [拷贝的秘密](./拷贝的秘密.md) 会对其进行说明

## 对象继承的秘密——原型

要想解释 JavaScript 中为什么大多数元素都是对象，就必须先知道原型。JavaScript 是一门基于原型的语言——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层，以此类推。这种关系常被称为原型链

有关原型和原型链的知识，会归纳总结为一篇——[原型](./原型.md)

## 继承的九种方法

原型是实现继承的方法之一，当然 JavaScript 还有其他的方法，总共九种

- 原型链继承
- 盗用构造函数
- 组合继承（原型链+盗用构造函数）
- 原型式继承
  - Object.create
  - Object.setPrototypeOf

- 寄生式继承
- 寄生式组合继承
  - Object.create + 盗用构造函数
  - Object.setPrototypeOf + 盗用构造函数

- 类继承

具体的文章会在 [继承 ](./继承.md)说明

## 总结

这一节，我们就 Object 进行展开，详细说明了 Object 及其实例的属性与方法。并对如何创建对象、如何拷贝对象、原型、继承等进行说明分析，因篇幅以及知识点聚焦问题，本节不做过多说明，下一节，我们从如何创建对象之 [new](./new做了什么.md) 说起
