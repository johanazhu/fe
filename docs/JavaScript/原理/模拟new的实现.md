# 模拟new的实现



### 前言

new 的本质是让你少些几行代码



### 正文

之前在介绍 [原型篇](../原型.md) 时，在介绍隐式原型继承时，说想要得到一个包含数据、方法以及关联原型三个组成部分的丰满对象，包含了三个步骤：

1）创建空对象

2）设置该对象的原型为另一个对象或者 null

3）填充该对象，增加属性或者方法

这些过程即 完成创建对象、原型继承和属性初始化。

隐式继承过程中，JS 帮我们做了创建对象和原型继承。

隐式继承包括两种，一对象（数组）字面量；而 new 继承

按照隐式继承的两层隐式行为来看

1）隐式的通过 new Object() 去创建对象

2）隐式的进行原型继承



### new是什么？

**它是 JavaScript 为了让开发者开发起来方便而实现的关键字**

在 JavaScript 高级程序设计第四版对new调用构造函数会执行的操作描述：

> （1）在内存中创建一个新对象
>
> （2）**这个新对象内部的[[prototype]]特性被赋值为构造函数的 prototype 属性**
>
> （3）构造函数内部的 this 被赋值为这个新对象（即this指向新对象）
>
> （4）执行构造函数内部的代码（给新对象添加属性）
>
> （5）如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

我们可以按照以上描述来写一个new。

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
    return typeof result === 'object' ? result : obj
}
```



### 别人的new写法



THE LAST TIME 

ES3写法

```javascript
function objectFactory() {
    var obj = new Object() // 从 Object.prototype 上克隆一个对象
    Constructor = Array.prototype.shift.call(arguments); // 取得外部传入的构造器，取第一个参数
    // 以下是 Object.create() 的核心
    var F = function() {};
    F.prototype = Constructor.prototype;
    obj = new F() // 指向正确的原型
    
    var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给obj设置属性
    return typeof ret === 'object' ? ret : obj; // 确保构造器总是返回一个对象
}
```







### 参考资料

[JS 的 new 到底是干什么的？](https://zhuanlan.zhihu.com/p/23987456?utm_medium=social&utm_source=wechat_session)





```javascript
function User(firstname, lastname) {
    this.firstname = firstname;
	this.lastname = lastname;
}
const user = new User('johnny', 'joestar');
```



```javascript
const new2 = (Constructor, ...args) => {
    let instance = Object.create(Constructor.prototype);
    Constructor.call(instance, ...args);
    return instance;
}
function User(firstname, lastname) {
    this.firstname = firstname;
	this.lastname = lastname;
}

const user = new2(User, 'johnny', 'joestar')
```

