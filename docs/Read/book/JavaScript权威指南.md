# JavaScript权威指南（犀牛书）



## 前五章知识点：

- 如果函数没有返回值，则返回undefined
- 原始值的比较是值的比较，引用类型的比较是引用的比较
- javascript的类型可以分为原始类型和对象类型，也可分为可以拥有方法的类型和不能拥有方法的类型，同样可分为可变（mutable）类型和不可变（immutable）类型。可变类型的值是可修改的，对象和数组属于可变类型：JavaScript 程序可以更改对象属性值和数组元素的值。数字、布尔值、null和undefined属于不可变类型——比如，修改一个数值的内容本身就说不通。

思考：js中字符串是不可变数据，所以他的方法返回的都是新字符串？即对原字符串不会产生影响吗？

答案：

所有的字符串方法有：

- 在JavaScript中字符串是固定不变的，类似的replace()和toUpperCase()的方法都返回新字符串，原字符串本身并没有发生改变

- 浏览器中的会创建一个新的全局对象，并给它一组定义的初始属性：
  - 全局属性，比如undefined、Infinity和NaN
  - 全局函数，比如isNaN()、parseInt()和eval()
  - 构造函数，比如Date()、RegExp()、String()、Object()和Array()
  - 全局对象，比如Math和JSON
  
- 当声明一个 JavaScript 全局变量时，实际上是定义了全局对象的一个属性

- 在定义一个函数时，它实际上报错一个作用域链

- 编程预约分为动态（类型）语言和静态（类型）语言，动态类型语言是指在运行期间才去做数据类型检查的语言，也就是说，在用动态类型的语言编程时，永远也不用给任何扁蕾指定数据类型，该语言会在第一次赋值给变量时，在内部将数据类型记录下来。Python、Ruby和 JavaScript就是典型的动态类型语言。静态类型语言与动态类型语言刚好相反，它的数据类型实在编译期间检查，也就是说在写程序时要生命所有变量的数据类型，C/C++是静态类型语言的典型代表，其他的静态类型语言还有C#、JAVA等

- JavaScript 是基于词法作用域的语言：通过阅读包含变量定义在内的数行源码就能知道变量的作用域

- 作用域链是一个对象列表或者链表

- instanceof运算符希望左操作数是一个对象，右操作数标识对象的类。如果左侧的对象是右侧的实例，则表达式返回true；否则返回false

- 要注意的是，所有的对象都是 Object 的实力。当通过 instance 判断一个对象是否是一个类的实例的时候，这个判断也会包含对”父类“（superclass）的检测。

- 为了理解 instanceof 运算符是如何工作的，必须首先理解”原型链“（prototype chain）。原型链作为 JavaScript 的集成机制。为了计算表达式 o instanceof f，JavaScript首先计算f.prototyoe，然后在原型链中查找 o ，如果找到，那么 o 是 f （或者f的父类）的一个实例，表达式返回true。如果 f.prototype 不在 o 的原型链中的画，那么 o 就不是 f 的实例，instanceof 返回 false

- eval() 能改变变量作用域环境

- typeof 是医院运算符，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串

- | x                      | typeof x                                                     |
  | ---------------------- | ------------------------------------------------------------ |
  | undefined              | ”undefined“                                                  |
  | null                   | "object"                                                     |
  | true 或 false          | "boolean"                                                    |
  | 任意数字或NaN          | "number"                                                     |
  | 任意字符串             | "string"                                                     |
  | 任意函数               | "function"                                                   |
  | 任意内置对象（非函数） | "object"                                                     |
  | 任意宿主对象           | 由编译器各自实现的字符串，但不是”undefined“、”boolean“、”number“或"string" |

  

## 第六章对象

对象是 JavaScript 的基本数据类型。对象是一种复合数：它将很多值（原始值或者其他对象）聚合在一起，可通过名字访问这些值。

然而对象不仅仅是字符串到值的映射，除了可以保持自有的属性， JavaScript 对象还可以从一个称为原型的对象继承属性。对象的方法通常是继承的属性

除了字符串、数字、true、false、null和undefined之外， JavaScript 中的值都是对象

（ps：还有ES6新增的Symbol）

原型（prototype）是对象的一个属性

可以通过对象直接量、关键字new和（ECMAScript5中的）Object.create()函数来创建对象



对象字面量：

```javascript
var empty = {}							// 没有任何属性的对象
var point = {x: 0, y: 0}				// 两个属性
var point = {x: point.x, y: point.y+1}	// 更复杂的值
var book = {		
    "main title": "JavaScript",			// 属性名字里有空格，必须用字符串表示
    "sub-title": "The Definitive Guide",// 属性名字里有连字符，必须用字符串表示
    "for": "all audiences",				// “for”是保留字，因此必须用引号
    author: {							// 这个属性的值是一个对象
        firstname: "johnny",			// 注意，这里的属性名都没有引号
        surname: "joestar"
    }
}
```

new运算符创建并初始化一个新对象。关键字new后跟随一个函数调用。这里的函数称做构造函数（constructor），构造函数用以初始化一个新创建的对象。JavaScript语言核心中的原始类型都包含内置构造函数

```javascript
var a = new Array(); 				// 创建一个空数组，和[]一样
var d = new Date(); 				// 创建一个表示当前时间的Date对象
var r = new RegExp("js")			// 创建一个可以进行模式匹配的RegExp对象
```

每一个JavaScript对象(null除外)都和另一个对象相关联。“另一个”对象就是我们熟知的原型，每一个对象都从原型继承属性。

所有通过对象直接量创建的对象都具有同一个原型对象，并可以通过JavaScript代码Object.prototype获得对原型对象的引用。



Object.create() 是一个静态函数，而不是提供给某个函数调用的方法

```javascript
var o1 = Object.create({x: 1, y: 2}) 			// o1继承了属性x和y
```

可以通过传入参数null来创建一个没有原型的新对象，但通过这种方式创建的对象不会继承任何东西，甚至不包括基础方法，比如toString()，也就是说，它将不能和“+”运算符一起正常工作：

```javascript
var o2 = Object.create(null)			// 思考：可以创建纯粹的对象
```

如果想创建一个普通的空对象（比如通过｛｝或者new Object() 创建的对象），需要传入Object.prototype:

```javascript
var o3 = Object.create(Object.prototype)
```

通过原型继承创建一个新对象（ECMAScript 3模拟原型继承）

```javascript
// inherit() 返回了一个继承自原型对象p的属性的新对象
// 这里使用ECMAScript 5中的Object.create()函数(如果存在的话)
// 如果不存在Object.create(),则退化使用其他方法
function inherit(p){
    if(p == null) throw TypeError();		// p是一个对象，但不能是null
    if(Object.create) 						// 如果Object.create()存在
        return Object.create(p);			// 直接使用它
	var t = typeof p;						// 否则进行进一步检测
    if(t !== "object" && t !== "function") throw TypeError();
    function f() {};						// 定义一个空构造函数
    f.prototype = p;						// 将其原型属性设置为p
    return new f();							// 使用f()创建p的继承对象
}
```

判断任何类型的方法

```javascript
function classof(o) {
	if (o ===  null) return "Null";
	if(o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}
```

所有的javascript对象都从Object.prototype继承属性



每一个对象都有与之相关的原型（prototype）、类（class）和可扩展性（extensible attribute）



## 第七章：数组

数组方法：

join()：将数组中所有元素都转化为字符串并连接在一起，返回最后生成的字符串

```javascript
var a = [1, 2, 3];
a.join() // 1,2,3
a.join(" ") // 1 2 3
a.join("") // 123
var b = new Array(10)
b.join("-") // ------------
```

reverse()：将数组中的元素颠倒顺序，返回逆序的数组

sort()：将数组中的元素排序并返回排序后的数组

concat()：**创建并返回一个新数组**，它的元素包括调用concat()的原始数组的元素和concat()的每个参数

注意：concat() 不会递归扁平化数组的数组，不会修改调用的数组

```javascript
var a = [1, 2, 3];
a.concat(4, 5) // [1, 2, 3, 4, 5]
a.concat([4, 5]) // [1, 2, 3, 4, 5]
a.concat([4, 5], [6, 7]) // [1, 2, 3, 4, 5, 6, 7]
a.concat(4, [5, [6, 7]]) // [1, 2, 3, 4, 5, [6, 7]]
```

slice()：返回指定数组的一个片段或子数组

特点：两个参数，包头不包尾，第二个参数不填，到最后，**即浅拷贝**。参数 -1 指定了最后一个元素

注意：slice()不会修改调用的数组

```javascript
var a = [1, 2, 3, 4, 5];
a.slice(0, 3) // [1, 2, 3]
a.slice(3) // [4, 5]
a.slice(1, -1) // [2, 3, 4]
a.slice(-3, -2) // [3]
var b = a.slice(0) // [1, 2, 3, 4, 5]
b[1] = 22
// a [1, 2, 3, 4, 5]
// b [1, 22, 3, 4, 5]
```

splice()：在数组中插入或删除元素的通用方法，不同于slice()和concat()，splice()会修改调用的数组

splice() 能从数组中删除元素、插入元素、替换元素

splice() 返回一个由删除元素组成的数组，或者如果没有删除元素就返回一个空数组

```javascript
var a = [1, 2, 3, 4, 5, 6, 7, 8]
a.splice(4) // 返回[5, 6, 7, 8] a [1, 2, 3, 4]
a.splice(1, 2) // 返回[2, 3] a [1, 4]
a.splice(1, 1) // 返回[4] a [1]
```

替换从第一个参数指定的位置开始插入

示例：

```javascript
var a = [1, 2, 3, 4, 5]
a.splice(2, 0, 'a', 'b') //返回[] a [1, 2, 'a', 'b', 3, 4, 5]
a.splice(2, 2, [1, 2], 3) //返回['a', 'b'] a [1, 2, [1, 2], 3, 3, 4, 5]
```

push()和pop()

unshift()和shift()

toString()和toLocaleString()



#### ES5中的数组方法



## 第八章：函数



## 第九章：类和模块



### 原型

























































