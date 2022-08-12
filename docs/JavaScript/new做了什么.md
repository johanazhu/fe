# new 做了什么

上文我们就 [Object](./Object.md) 进行分析阐述，聊到了对象的创建，其中 new 是创建对象的重要关键字，这节我们讲讲 new，聊一聊 new 是做什么用的

## 一句话解释

new 的本质是让开发者少写几行代码

## 正文

在说 new 之前，需要多多少少了解原型的知识，这里我们假设你已经知道原型继承方面的知识了（笔者会在后面 [原型](./原型.md) 对其进行详细介绍）

简单来说，new 关键字的意义是：

1. 在内存中创建一个新对象
2. 将新对象的 [[Prototype]] 被赋值为构造函数的 prototype 属性
3. 将构造函数中的 this 指向新对象
3. 执行构造函数中的代码
3. 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的新对象

这些过程即完成创建对象、原型继承和属性初始化，被称为隐式原型继承

> 除此之外，对象字面量也是隐式继承。只是对象字面量是为 Object 构造函数服务，而 new 则对任意构造函数服务

按照隐式继承的两层隐式行为来看

1. 隐式的通过 new Object()/Object.create() 来创建对象
2. 隐式的进行原型继承

不过我们本节的重点不是去追寻隐式原型继承，而是想知道 new 做了什么

首先，new 属于隐式原型继承。什么是隐式原型继承，即语言底层帮我们做了继承，开发者只用调用 new Constructor，就能让实例后的对象自动继承该 Constructor 的 prototype，底层这样做，是为了方便我们开发使用

## 实现 new

我们试着手写 new

```javascript
function new2(Constructor, ...args) {
    // (1)、创建一个新对象
    var obj = Object.create(null);
    // (2)、新对象的[[Prototype]]特性被赋值为 构造函数的 prototype 属性
    obj.__proto__ = Constructor.prototype;
    // (3)、构造函数内部的 this 被赋值为这个新对象
    // (4)、执行构造函数内部的代码
    var result = Constructor.apply(obj, args);
    // (5)、如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象
    return typeof result === 'object' ? result : obj;
}
```

此方法是基于 Object.create，而在 ES5 之前是没有此 API，那如何使用 ES3（new Object()）的方式实现 new 呢？

简单来说，就是实现 Object.create 和解构赋值之前的获取剩余参数

```javascript
function new3() {
    // 基于 new Object 创建实例
    var obj = new Object(),
    // 获取外部传入的构造器
    Constructor = Array.prototype.shift.call(arguments);
    // 手写 Object.create() 的核心
    var F = function () {}
    F.prototype = Constructor.prototype
    // 指向正确的原型
    obj = new F() 
    // 借用外部传入的构造函数给 obj 设置属性
    var result = Constructor.apply(obj, arguments)
    // 执行结果如果是非空对象，则返回该对象；否则，返回刚创建的新对象
    return typeof result === 'object' ? result : obj
}
```

测试一波

```javascript
function User(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}
const user2 = new2(User, 'johnny', 'joestar')
const user3 = new3(User, 'johnny', 'joestar')
```



## 附录：

在 JavaScript 高级程序设计第四版对 new 调用构造函数会执行的操作描述：

> （1）在内存中创建一个新对象
>
> （2）这个新对象内部的[[prototype]]特性被赋值为构造函数的 prototype 属性
>
> （3）构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
>
> （4）执行构造函数内部的代码（给新对象添加属性）
>
> （5）如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

## 参考资料

- [JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456)

- [深入理解 JavaScript 原型](https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg)

  

