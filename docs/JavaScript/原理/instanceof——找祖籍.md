# instanceof——找祖籍

### 什么是 instanceof？

[MAN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)的解释是：

> instanceof 运算符 用于检测构造函数的 `prototype` 属性是否出现在某个**实例对象**的原型链上

由此可知，instanceof 的左侧必须是对象，才能找到它的原型链

instanceof 右侧必须是函数，函数才会有 prototype 属性

例如：

```javascript
function Resume(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
}

const johan = new Resume("johan", "18", "swim");

console.log(johan instanceof Resume); // true
console.log(johan instanceof Object); // true
```

### 分析

粗暴一点讲，左边为实例，不是由右边 new 出来，就是右边的原型 new 出来（在其原型链上）

ps：如果对原型以及原型链不太了解，可以看看这篇 [原型与原型链](../原型与原型链.md)

```javascript
// 第一版
function myInstanceof(left, right) {
    if (left.__proto__ === right.prototype) {
        return true;
    } else {
        return false;
    }
}

console.log(myInstanceof(johan, Resume)); // true
console.log(myInstanceof(johan, Object)); // false
```

第一版我们实现了 left 是 谁 new 出来的，但这还不够，`myInstanceof` 还要检测 left 是否在 right 的原型链上。所以我们要递归 `left.__proto__` 。直到原型链的最深一层 null

```javascript
// 第二版
function myInstanceof(left, right) {
    if (left.__proto__ === right.prototype) {
        return true;
    } else {
        if (left === null) {
            return false;
        }
        return myInstanceof(left.__proto__, right);
    }
}
```

### 考虑它是基本类型

在一开始就说了，instanceof 的左侧必须是对象，这样才能找到它的原型链

```javascript
var num = 1;
console.log(myInstanceof(num, Number)); // true
console.log(num instanceof Number); // false
```

所以我们要增加对基本类型的判断

```javascript
function myInstanceof(left, right) {
    if (typeof left !== "object" || left === null) return false;
    if (left.__proto__ === right.prototype) {
        return true;
    } else {
        if (left === null || left.__proto__ === null) {
            return false;
        }
        return myInstanceof(left.__proto__, right);
    }
}
```

### 看看别人家的 instanceof 实现

神三元

```javascript
function myInstanceof(left, right) {
    // 基本数据类型直接返回 false
    if (typeof left !== "object" || left === null) return false;
    // getPrototype是Object对象自带的一个方法，等效于__proto__
    let proto = Object.getPrototypeOf(left);
    while (true) {
        // 循环往下寻找，知道找到相同的对象
        if (proto == null) return false;
        // 找到相同的原型对象
        if (proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

while 的用法比俺高级多了

下一章，我们讲讲 new ，其实 new 就是生儿子，与 instanceof 找祖籍有一点关联
