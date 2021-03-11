# 模拟new的实现

之前在介绍 原型 篇时，在介绍隐式原型继承时，说想要得到一个包含数据、方法以及关联原型三个组成部分的丰满对象，包含了三个步骤：

1）创建空对象

2）设置该对象的原型为另一个对象或者 null

3）填充该对象，增加属性或者方法

这些过程即 完成创建对象、原型继承和属性初始化。

隐式继承过程中，JS 帮我们做了创建对象和原型继承。

隐式继承包括两种，一对象（数组）字面量；而 new 继承

按照隐式继承的两层隐式行为来看

1）隐式的通过 new Object() 去创建对象

2）隐式的进行原型继承

那么，我们可以这样做：

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







new是什么？

由什么构成？

它的作用是什么？

原生的语法是怎么样，手动写一个该怎么写？





手写new的时候为什么要判断是否return

因为构造函数本身就是一个函数，即使我们约定 构造函数首字母大写，但还是要对其内部进行判断











JavaScript高级程序设计第四版对new调用构造函数会执行的操作描述：

（1）在内存中创建一个新对象

（2）**这个新对象内部的[[prototype]]特性被赋值为构造函数的 prototype 属性**

（3）构造函数内部的 this 被赋值为这个新对象（即this指向新对象）

（4）执行构造函数内部的代码（给新对象添加属性）

（5）如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象



阮一峰：

使用`new`命令时，它后面的函数依次执行下面的步骤。

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的`prototype`属性。
3. 将这个空对象赋值给函数内部的`this`关键字。
4. 开始执行构造函数内部的代码



new 构造函数

构造函数是函数，函数就有方法，我们只是约定说首字母大写的函数为构造函数，但这不代表首字母小写的函数不能是构造函数，而一个普通函数，如果有返回值的话，那它作为构造函数的意义就消失了。