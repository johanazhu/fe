# new



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











