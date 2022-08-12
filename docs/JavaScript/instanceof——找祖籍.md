# instanceof——找祖籍

我们分别在 [JavaScript由什么组成](./JavaScript由什么组成.md) 和 [JavaScript 中的始皇](./JavaScript 中的始皇.md) 两篇文章中讲到了 instanceof，这篇文章好好说说 instanceof

## 什么是 instanceof？

[MAN ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)的解释是：

> instanceof 运算符用于检测构造函数的 `prototype` 属性是否出现在某个**实例对象**的原型链上

由此可知，instanceof 的左侧必须是对象，才能找到它的原型链

而 instanceof 右侧必须是函数，函数才会有 prototype 属性

简单例子：

```javascript
function Resume(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
}

const johan = new Resume('johan', '18', 'swim');

console.log(johan instanceof Resume); // true
console.log(johan instanceof Object); // true
```

在 [JavaScript 中的始皇](./JavaScript 中的始皇.md) 中有个例子：

```javascript
Object instanceof Object
Function instanceof Function
```

我们可以这样理解，Object 的某一原型链上有一值和 Object.prototype 相等；Function 的原型链上的某一值也与 Function.prototye 一致；

`Object instanceof Object ` 可以理解为：

- `Object.__proto__ === Function.prototype`
- `Function.prototype.__proto__ === Object.prototype`
- `Object.__proto__.__proto__ === Object.prototype ` 

`Function instanceof Function` 可以理解为：

- `Function.__proto__ === Function.prototype`

其本质是因为内置函数都是由 Function 构造函数创造的，包括它自己

## 手写 instanceof

按照以上描述，即`左边的__proto__=== 右边.prototype`

### 第一版

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

第一版我们实现了 `左边的__proto__=== 右边.prototype`。但这还不够，`myInstanceof` 还要检测 left 是否在 right 的原型链上。所以我们要递归 `left.__proto__` 。直到原型链的最深一层 null

### 第二版

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

### 第三版：考虑它是基本类型

在一开始就说了，instanceof 的左侧必须是对象，这样才能找到它的原型链

但不要忘记了，除了 null、undefined 外的基本类型，都是由基本包装类型“保护”着

```javascript
var num = 1;
console.log(myInstanceof(num, Number)); // true
console.log(num instanceof Number); // false
```

所以我们要增加对基本类型的判断

```javascript
function myInstanceof(left, right) {
    if (typeof left !== 'object' || left === null) return false;
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

### 看看别人的 instanceof 实现

```javascript
function myInstanceof(left, right) {
    // 基本数据类型直接返回 false
    if (typeof left !== 'object' || left === null) return false;
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

