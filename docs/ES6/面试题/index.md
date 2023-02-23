# ES6 面试题

### Q：箭头函数和普通函数有什么区别？

-   箭头函数没有自己的 this 对象，函数体内的 this 是定义时所在的对象而不是使用时所在的对象
-   不可以当作构造函数，也就是说，不可以对箭头函数使用 new 命令，否者会抛出一个错误
-   不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替（[ES6 完全指南](../ES6完全指南.md)）
-   不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数（[迭代器与生成器](../Iterator&Generator.md)）

### Q： class B 继承 class A 翻译成 es5 应该是什么样子

```javascript
function A() {}

function B() {
    A.call(this);
}

B.prototype = Object.create(A.prototype);

B.prototype.constructor = B;
```

### Q: 为什么子类的构造函数，一定要调用`super()`？

A: 原因就在于 ES6 的继承机制，与 ES5 完全不同。ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用`super()`方法，因为这一步会生成一个继承父类的`this`对象，没有这一步就无法继承父类。

JavaScript | 你常用的 Array Methods 是我常用的嗎？

https://medium.com/starbugs/javascript-%E4%BD%A0%E5%B8%B8%E7%94%A8%E7%9A%84-array-methods-%E6%98%AF%E6%88%91%E5%B8%B8%E7%94%A8%E7%9A%84%E5%97%8E-6fe235953951

## 参考资料
