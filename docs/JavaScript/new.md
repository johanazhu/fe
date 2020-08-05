# new



之前我们介绍原型的时候，我们曾经说过：

原型继承有两种形式，一种是显式原型继承，另一种是隐式原型继承。区别在于是否是开发者亲自操作

而 new 的过程，就是隐式原型继承

后来，我们通过显式原型的方法来模式原型继承。

隐式原型的特点是：

1. 自动将





```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
}
var a = new Person('johan', 26);
```

