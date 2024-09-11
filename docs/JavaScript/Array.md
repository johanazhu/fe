# 数组

我们在前文系列中，我们以内置构造函数 [Object](./Object.md) 开始讲起，并从中衍生出各种知识点。而后我们又讲另一个大构造函数 [Function](./Function.md)，同样引出了比肩 Object 的知识点。这两者之后，笔者认为 「JavaScript 大厦」已经建成，只是天边还有两朵小乌云，今天我们就讲其中的一朵——数组

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

除去 arguments、caller、Symbol、get Symbol 以及 [[Scopes]] 外，剩下的都是我们非常熟悉的数组拥有的静态函数，可以看出，有 length、name 等静态属性，还有 `Array.from`、`Array.isArray`、`Array.of` 等静态方法

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

> 这里提一句，用 Class 模拟类(继承)，它的 constructor 函数其实也很好记，它就是用来做属性初始化的，它很特殊，写在 class 中，但不在 prototype 里
>

## 原型上的属性和方法

在上文已经展示了 Array 的静态属性和方法，但我们知道， JavaScript 是以原型作为继承的语言，也就是说在 「prototype」属性中，拥有了我们平常使用的数组方法

我们展开 prototype 能看到

![数组的prototype](https://s2.loli.net/2022/10/24/FEqk4I8SBCuc5PQ.png)

### 实例属性

- index

- length

实例方法倒是有很多，这里我们按照功能分类，也就是传说中的**增删改查**记忆法

> 本人想到这个方法时，一查果然已经有人总结出这种记忆法了

### 添加/移除数组元素

#### push

将指定的元素添加到数组的末尾，并返回新的数组长度

```javascript
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// 输出: 4
console.log(animals);
// 输出: Array ["pigs", "goats", "sheep", "cows"]
```

#### pop

从数组中删除最后一个元素，并返回该元素的值

```javascript
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// 输出: "tomato"

console.log(plants);
// 输出: Array ["broccoli", "cauliflower", "cabbage", "kale"]
```

#### shift

从数组中删除第一个元素，并返回该元素的值

```javascript
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// 输出: Array [2, 3]

console.log(firstElement);
// 输出: 1
```



#### unshift

将指定元素添加到数组的开头，并返回新的数组长度

```javascript
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// 输出: 5

console.log(array1);
// 输出: Array [4, 5, 1, 2, 3]
```

除此之外，还有其他几种方法 

#### splice(start[, deleteCount, elem1, ..., elemN])

意思：移除或替换已存在的元素和/或添加新的元素

从索引 `start` 开始修改 `arr`，删除 `deleteCount` 个元素并在当前位置插入`elem1, ..., elemN`。最后返回被删除的元素所组成的数组

```javascript
// 添加
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); // 从索引 1 开始，删除 0 个元素，并从这里插入 'Feb'
console.log(months);
// 输出: Array ["Jan", "Feb", "March", "April", "June"]

// 删除
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 1); // 从索引 1 开始，删除 1 个元素
console.log(months);
// 输出: Array ["Jan",  "April", "June"]

// 修改
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 1, 'Feb', "Happy"); // 从索引 1 开始，删除 1 个元素，并从这里插入“Feb”,"Happy"
console.log(months);
// 输出: Array ["Jan", "Feb", "Happy", "April", "June"]
```

splice 能添加，删除和插入元素，堪称处理数组的瑞士军刀

以上五种方法都会修改原数组

#### slice([start], [end])

返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的**浅拷贝**（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// 输出: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// 输出: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// 输出: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// 输出: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// 输出: Array ["camel", "duck"]

console.log(animals.slice());
// 输出: Array ["ant", "bison", "camel", "duck", "elephant"]

```

#### concat

用于合并两个或多个数组。此方法不会改变现有数组，而是返回一个新数组

也可用于浅拷贝

```javascript
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// 输出: Array ["a", "b", "c", "d", "e", "f"]
```

### 从数组中搜索查看

#### indexOf

判断数组中是否存在某个值，如果存在，则返回数组元素的下标，否则返回 -1

```javascript
var arr = [1,2,3,4];
var index = arr.indexOf(3);
console.log(index);
```

#### includes(searchElement[, fromIndex])

判断数组中是否存在某个只，如果存在返回 true，否则返回false

```javascript
var arr = [1,2,3,4];
if(arr.includes(3))
    console.log("存在");
else
    console.log("不存在");
```

#### find(callback[, thisArg])

返回数组中满足条件的**第一个元素的值**，如果没有，返回 undefined

```javascript
var arr = [1,2,3,4];
var result = arr.find(item =>{
    return item > 2
});
console.log(result); // 3
```

#### findeIndex(callback[,thisArg])

返回数组中满足条件的第一个元素的下标，如果没有找到，返回`-1`]

```javascript
var arr = [1,2,3,4];
var result = arr.findIndex(item =>{
    return item > 2
});
console.log(result); // 2
```

#### filter

创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素

```javascript
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
// 输出: Array ["exuberant", "destruction", "present"]
```

除此之外，还有排序方法、转换方法、迭代方法

### 排序方法

reverse()：将数组中原生的位置颠倒，并返回该数组。数组的第一个元素变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组

-   所以一般如果你要颠倒一个数组时，先深拷贝先

sort()：用原地算法对数组的元素进行排序，并返回数组。默认排序是在将元素转换为字符串，然后比较他们的 UTF-16 代码单元制序列时构建

-   由于它取决于具体实现，因此无法保证排序的时间和空间复杂性

### 遍历方法

some()：测试数组中是不是至少有 1 个元素通过了被提供的函数测试

-   它返回的是一个 Boolean 类型的值

every()：测试数组中所有元素通过了被提供的函数测试

-   它返回的是一个 Boolean 类型的值

forEach()：遍历数组中的每个元素

filter()：通过回调函数筛选元素

map()：根据对每个元素调用 `func` 的结果创建一个新数组。

#### reduce

对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值

语法：

```javascript
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

- accumulator：上一个函数调用的结果，第一次等于 initial（如果提供了 initial 的话）
- item：当前的数组元素
- index：当前索引
- arr：数组本身

```javascript
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// 输出: 10
```



### 其他

join()： 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不适用分隔符

isArray()：用于确定传递的值是否是数组

from()：对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例





## 哪些 API 是纯函数

这里肯定不全，就当当说这些也不一定满足面试官的胃口，但说比没有好

### 哪些 API 会改变原数组

简单来说，就是数组的添加/移除数组元素方法

```javascript
arr.push();
arr.pop();
arr.shift();
arr.unshift();
arr.splice();
arr.sort();
arr.reverse();
...
```

### 哪些 API 不会改变原数组

也就是纯函数，不会改变原数组，而是返回新的数组

```javascript
arr.slice();
arr.concat();
arr.map();
arr.forEach();
arr.filter();
arr.reduce();
arr.every();
arr.some();
arr.find();
```



## 判断是否是数组的方法

Array.isArray

```javascript
var arr = []
Array.isArray(arr)
```

instanceof

```javascript
var arr = []
arr instanceof Array
```

constructor

```javascript
var arr = []
arr.constructor === Array
```

Object.prototype.toString.call()

```javascript
var arr = []
Object.prototype.toString.call(arr) === '[object Array]'
```



## 参考资料

-   [超级详细的 js 数组方法详解](https://juejin.cn/post/6907109642917117965)
-   [MDN](https://developer.mozilla.org/zh-CN/)
