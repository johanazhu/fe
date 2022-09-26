# ES6 完全指南

默认参数、模板字符串、解构赋值、箭头函数、Class、Modules、Symbol

## 默认参数

Old：

```javascript
function func(name, age){
    var name = name || '';
    var age = age || 0;
    ...
}
```

Now：

```javascript
function func(name = '', age = ''){
    var name = name;
    var age = age;
    ...
}
```

## 模板字符串

需要拼接字符串的时候尽量改成模板字符串：

Old：

```javascript
var introduction = 'my name is' + name + ', my age is' + age;
```

Now:

```javascript
var introduction = `my name is ${name}, my age is ${age}`;
```

## 解构赋值

Old：

```javascript
var data = axios.get('xxx').data,
    name = data.name,
    age = data.age;
```

Now：

```javascript
var { name, age } = axios.get('xxx').data;
```

**字符串解构**：`const [a, b, c, d, e] = "hello"`

**数值解构**：`const { toString: s } = 123`

**布尔解构**：`const { toString: b } = true`

**对象解构**

-   形式：`const { x, y } = { x: 1, y: 2 }`
-   默认：`const { x, y = 2 } = { x: 1 }`
-   改名：`const { x, y: z } = { x: 1, y: 2 }`

**数组解构**

-   规则：数据结构具有`Iterator接口`可采用数组形式的解构赋值
-   形式：`const [x, y] = [1, 2]`
-   默认：`const [x, y = 2] = [1]`

**函数参数解构**

-   数组解构：`function Func([x = 0, y = 1]) {}`
-   对象解构：`function Func({ x = 0, y = 1 } = {}) {}`

对象解构、数组解构

## 箭头函数

箭头函数中的 this，就是声明函数时所处上下文中的 this，它不会被其他方式所改变

Old：

```javascript
var that = this;
$('.btn').click(function () {
    that.getData();
});
```

Now：

```javascript
$('.btn').click(() => {
    this.getData();
});
```

## for of

### 1. 遍历范围

for...of 循环可以使用的范围包括：

1. 数组
2. Set
3. Map
4. 类数组对象，如 arguments 对象、DOM NodeList 对象
5. Generator 对象
6. 字符串

### 2. 优势

ES2015 引入了 for..of 循环，它结合了 forEach 的简洁性和中断循环的能力：

```javascript
// 例子 6-1

for (const v of ['a', 'b', 'c']) {
    console.log(v);
}
// a b c

for (const [i, v] of ['a', 'b', 'c'].entries()) {
    console.log(i, v);
}
// 0 "a"
// 1 "b"
// 2 "c"
复制代码;
```

### 3. 遍历 Map

```javascript
// 例子 6-2

let map = new Map(arr);

// 遍历 key 值
for (let key of map.keys()) {
    console.log(key);
}

// 遍历 value 值
for (let value of map.values()) {
    console.log(value);
}

// 遍历 key 和 value 值(一)
for (let item of map.entries()) {
    console.log(item[0], item[1]);
}

// 遍历 key 和 value 值(二)
for (let [key, value] of data) {
    console.log(key);
}
```

## 扩展运算符

对象、数组都有

```javascript
let [a, b, ...arr] = [1, 2, 3, 4, 5];

const { a, b, ...others } = { a: 1, b: 2, c: 3, d: 4, e: 5 };
```

含义：扩展运算符（spread）是三个点。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列

扩展运算符（`...`）也可以将某些数据结构转为数组

扩展运算符背后调用的是遍历器接口（`Symbol.iterator`），如果一个对象没有部署这个接口，就无法转换。

### 作用

#### 复制数组

使用扩展运算符能实现浅拷贝

```javascript
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

#### 合并数组

```javascript
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3];
// [ 'a', 'b', 'c', 'd', 'e' ]
```

#### 与解构赋值结合

```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```

#### 字符串

扩展运算符还可以将字符串转为真正的数组。

```javascript
[...'hello'];
// [ "h", "e", "l", "l", "o" ]
```

#### 实现了 Iterator 接口的对象

## Symbol

作用：**作为对象属性的唯一标识符**，防止对象属性冲突发生

-   属于 基本数据类型
-   可以作为 object 的 key
-   存在于全局作用域，可通过 Symbol.for(key)
-   JavaScript 内部使用了很多 symbol，作为特殊的键，实现一些内部功能；例如 Symbol.iterator 用于标识对象的迭代器

从 ES6 起，JavaScript 的基础数据类型变成了 6 个：string、number、boolean、null、undefined、symbol

## 数组扩展

-   **扩展运算符(...)**：转换数组为用逗号分隔的参数序列(`[...arr]`，相当于`rest/spread参数`的逆运算)
-   Array.from()：转换具有 `Iterator接口 ` 的数据结构为真正数组，返回新数组
    -   类数组对象：`包含length的对象`、`Arguments对象`、`NodeList对象`
    -   可遍历对象：`String`、`Set结构`、`Map结构`、`Generator函数`
-   **Array.of()**：转换一组值为真正数组，返回新数组
-   **copyWithin()**：把指定位置的成员复制到其他位置，返回原数组
-   **find()**：返回第一个符合条件的成员
-   **findIndex()**：返回第一个符合条件的成员索引值
-   **fill()**：根据指定值填充整个数组，返回原数组
-   **keys()**：返回以索引值为遍历器的对象
-   **values()**：返回以属性值为遍历器的对象
-   **entries()**：返回以索引值和属性值为遍历器的对象
-   **数组空位**：ES6 明确将数组空位转为`undefined`(空位处理规不一，建议避免出现)

数组拓展的方法

keys：

```javascript
var arr = ['a', , 'c'];

var sparseKeys = Object.keys(arr);
console.log(sparseKeys); // ['0', '2']

var denseKeys = [...arr.keys()];
console.log(denseKeys); // [0, 1, 2]
```

entries

```javascript
var arr = ['a', 'b', 'c'];
var iterator = arr.entries();

for (let e of iterator) {
    console.log(e);
}
```

values

```javascript
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();

for (let letter of eArr) {
    console.log(letter);
}
```

includes

```javascript
// bad
function test(fruit) {
    if (fruit == 'apple' || fruit == 'strawberry') {
        console.log('red');
    }
}

// good
function test(fruit) {
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
    if (redFruits.includes(fruit)) {
        console.log('red');
    }
}
```

find

```javascript
var inventory = [
    { name: 'apples', quantity: 2 },
    { name: 'bananas', quantity: 0 },
    { name: 'cherries', quantity: 5 },
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

## 对象扩展

-   **扩展运算符(...)**：转换对象为用逗号分隔的参数序列(`{ ...obj }`，相当于`rest/spread参数`的逆运算)

> 扩展应用

-   克隆对象：`const obj = { __proto__: Object.getPrototypeOf(obj1), ...obj1 }`
-   合并对象：`const obj = { ...obj1, ...obj2 }`
-   转换字符串为对象：`{ ..."hello" }`
-   转换数组为对象：`{ ...[1, 2] }`
-   与对象解构赋值结合：`const { x, ...rest/spread } = { x: 1, y: 2, z: 3 }`(不能复制继承自原型对象的属性)
-   修改现有对象部分属性：`const obj = { x: 1, ...{ x: 2 } }`

## 参考资料

-   [ES6 完全使用手册](https://juejin.cn/post/6844903726201700365)
-   [1.5 万字概括 ES6 全部特性(已更新 ES2020)](https://juejin.cn/post/6844903959283367950#heading-21)
-   [ES6 你可能不知道的事 - 进阶篇](https://mp.weixin.qq.com/s?__biz=MzA4ODUzNTE2Nw==&mid=2451046817&idx=1&sn=ee4af07eed742d0df9dbad676c6f9e84&chksm=87c418b1b0b391a79f27f3db6abc46c05fe8d993d98bb12e68823b96e92f34bfc84f21667e03&mpshare=1&scene=1&srcid=&sharer_sharetime=1585194801642&sharer_shareid=778ad5bf3b27e0078eb105d7277263f6#rd)
-   [JS 中使用扩展运算符的 10 种方法，好家伙，点个赞呗！](https://segmentfault.com/a/1190000038998504)
-   [简单了解 ES6/ES2015 Symbol() 方法](https://www.zhangxinxu.com/wordpress/2018/04/known-es6-symbol-function/)
-   [ES6 symbol](http://caibaojian.com/es6/symbol.html)
-   [JS 中使用扩展运算符的 10 种方法，好家伙，点个赞呗！](https://segmentfault.com/a/1190000038998504)
-   [前端开发者不得不知的 ES6 十大特性](http://www.alloyteam.com/2016/03/es6-front-end-developers-will-have-to-know-the-top-ten-properties/)
-   [老司机也会在闭包相关知识点翻车（上）](https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a9a3ccb24267c1d01960)
-   [面试官——什么时候不能使用箭头函数？](https://mp.weixin.qq.com/s/l7oio3AIRJB8pG07lig9MA)
