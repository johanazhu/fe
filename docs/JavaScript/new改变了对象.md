# new 改变了对象

上文我们就 Object 进行分析阐述，聊到了对象的创建，其中 new 创建对象的重要关键字，这节我们讲讲new

## 一句话

new 的本质是让开发者少些几行代码

## 正文

在说 new 之前，需要先去了解下 [原型](./原型.md)、[继承](./继承.md) 的前置知识，简单来说，new 关键字的隐含意义是包括三个步骤：

1. 创建空对象
2. 设置该对象的原型为另一个对象或者 null
3. 填充该对象，增加属性或者方法

这些过程即完成创建对象、原型继承和属性初始化，被称为隐式原型继承

> 除此之外，对象字面量也是隐式继承。只是对象字面量是为 Object 构造函数服务，而 new 则对任意构造函数服务

按照隐式继承的两层隐式行为来看

1. 隐式的通过 new Object()/Object.create() 来创建对象
2. 隐式的进行原型继承

## 手写 new

我们试着手写new

```javascript
function new2(Constructor, ...args) {
    // (1)、创建一个新对象
    var obj = Object.create(null);
    // (2)、新对象的[[prototype]]特性被赋值为 构造函数的 prototype 属性
    obj.__proto__ = Constructor.prototype;
    // (3)、构造函数内部的 this 被赋值为这个新对象
    // (4)、执行构造函数内部的代码
    var result = Constructor.apply(obj, args);
    // (5)、如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象
    return typeof result === 'object' ? result : obj;
}
```

此方法是基于 Object.create，而在 ES5 之前是没有此API，那如何使用ES3（new Object()）的方式实现 new 呢？

简单来说，就是实现 new Object 和解构赋值之前的获取剩余参数

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
const user2 = new2(User, 'johan', 'joestar')
const user3 = new3(User, 'johan', 'joestar')
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

-   [JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456)
-   [深入理解 JavaScript 原型](https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg)

