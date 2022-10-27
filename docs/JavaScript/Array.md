# 数组

我们在前文系列中，我们以内置构造函数 [Object](./Object.md) 开始讲起，并从中衍生出各种知识点。而后我们又讲另一个大构造函数 [Function](./Function.md)，同样引出了比肩 Object 的知识点。这两者之后，笔者认为JavaScript的大厦已经建成，只是天边还有两朵小乌云，今天我们就讲其中的一朵——数组

## 概要

数组是一组按序排列的值，创建数组的目的通常是遍历数字索引值，以零索引开始。

我们需要了解的是，数组是按照数字顺序排列的集合，相对地，对象的属性名称是无序的。

从本质上讲，数组使用数字作为查找建，而对象拥有用户自定义的属性名。

JavaScript 没有真正的关联数组，对象可用于实现关联数组的功能

如果我们想了解数组中有什么方法和属性，有个很简单的方法——通过浏览器打印 Array

```javascript
console.dir(Array);
```

![查看Array数据结构](https://s2.loli.net/2022/10/24/qYvnfziwR9Teyso.png)

除去 arguments、caller、Symbol、get Symbol 以及 [[Scopes]] 外，剩下的都是我们非常熟悉的数组拥有的静态函数，可以看出，有 length、name 等静态属性，还有 from、isArray、of 等静态方法

我们用 Class 来写一下 Array 的伪代码： 

```javascript
class MyArray {
    constructor() {
        this.name = name;
        this.length = arguments.length; // arguments 指参数中的类数组对象
        this.prototype = prototype;
    }
}
MyArray.from = function () {};
MyArray.isArray = function () {};
MyArray.of = function () {};
```

![查看Array数据结构](https://s2.loli.net/2022/10/24/KvDFQSA9TE51ZaY.png)

> ps： 这里提一句，用 	Class 模拟类(继承)，它的 constructor 函数其实也很好记，它就是用来做属性初始化的，它很特殊，写在 class 中，但不在 prototype 里
>

## 原型上的属性和方法

在上文已经展示了 Array 的静态属性和方法，但我们知道， JavaScript 是以原型作为继承的语言，也就是说在 「prototype」属性中，拥有了我们平常使用的数组方法

我们展开 prototype 能看到

![数组的prototype](https://s2.loli.net/2022/10/24/FEqk4I8SBCuc5PQ.png)

### 实例属性

- index

- length


### 实例方法

-   pop()：从数组中删除最后一个元素，并返回该原生的值。该方法更改数组的长度

-   push()：将一个或多个元素添加到数组的末尾，并返回该数组的新长度

-   reverse()：将数组中原生的位置颠倒，并返回该数组。数组的第一个元素变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组
    -   所以一般如果你要颠倒一个数组时，先深拷贝先

-   shift()：从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度

-   sort()：用原地算法对数组的元素进行排序，并返回数组。默认排序是在将元素转换为字符串，然后比较他们的 UTF-16 代码单元制序列时构建

    -   由于它取决于具体实现，因此无法保证排序的时间和空间复杂性
-   splice()：方法通过删除或代替现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组

    -   第一个参数，指定修改的开始位置（从 0 计数）
-   unshift()：将一个或多个元素添加到数组的开头，并返回该数组的新长度（该方法修改原数组）

-   concat()：方法用于合并或多个数组。此方法不会更改现有数组，而是返回一个新数

-   join()： 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不适用分隔符
-   slice()：方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的浅拷贝（包括`begin`，不包括`end`）。原始数组不会被改变

-   isArray()：用于确定传递的值是否是数组
-   from()：对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
-   forEach()：遍历数组中的每个元素
-   filter()：通过回调函数筛选元素
-   find()：返回数组中满足提供的测试函数的第一个元素的值
-   some()：测试数组中是不是至少有 1 个元素通过了被提供的函数测试
    -   它返回的是一个 Boolean 类型的值

-   reduce()：对数组中的每个元素按序执行一个由您提供的 reducer 函数
    -   每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值


## 哪些 API 是纯函数

### 哪些 API 会改变原数组

```javascript
arr.splice();
arr.sort();
arr.reverse();
arr.fill();
arr.push();
arr.pop();
arr.shift();
arr.unshift();
```

### 哪些 API 不会改变原数组

也就是纯函数

```javascript
arr.slice();
arr.concat();
arr.map();
arr.forEach();
arr.fliter();
arr.reduce();
arr.every();
arr.some();
arr.find();
arr.entries();
```





## 参考资料

-   [超级详细的 js 数组方法详解](https://juejin.cn/post/6907109642917117965)
-   [MDN](https://developer.mozilla.org/zh-CN/)
