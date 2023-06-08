# TypeScript 的​数据类型

之前我们在 [JavaScript 由什么组成](https://fe.azhubaby.com/JavaScript/JavaScript%E7%94%B1%E4%BB%80%E4%B9%88%E7%BB%84%E6%88%90.html) 中曾写过：

在 JavaScript 中，我们有 8 种数据类型，其中 7 种是基本类型（原始值），分别是 undefined 、null、string、number、boolean、symbol（ES6 新增）、bigint（ES10新增）。剩下的一种是引用类型  object（Array、Function、Date...）

TypeScript 在此基础上提供了更多的数据类型，并且支持静态类型检查

- any：不建议使用。任意类型，可以是任何类型的数据。使用 Any 也就等同于让 TypeScript 的类型校验机制失效
- unknown：顶层类型，表示值的类型未知，可视为更安全的 `any` 类型
- void：空类型，用于表示没有返回值的函数
- never：永远不会出现的类型，通常用于表示异常或无限循环等情况
- enum（枚举）：基于数字和字符串的一组相关值
- tuple（元组）：已知长度和数据类型的数组，支持数组内存储不同数据类型的元素

Mark Volkmann [曾总结出这些内置函数的关系](https://objectcomputing.com/resources/publications/sett/typescript-the-good-parts)，如下图所示：

![TypeScript 内置类型之间的关系](https://s2.loli.net/2023/05/23/ltDIvCa1w5fnSxi.png)

当然，以上是 TypeScript 内置的数据类型，我们还可以自定义类型，TS 同样提供了关键字

- type：定义类型别名
- interface：表示对象的结构，描述对象的属性和方法

以上就构成了 TypeScript 所有的数据类型，这一节我们就聊聊它的数据类型

在此之前我们需要定义下如何理解 TS 的数据类型，相比 JavaScript，TypeScript 的数据类型更符合“集合”概念

## 基本数据类型

先来看基本数据类型

```javascript
// javascript
let str = 'hello world'; // str 是 string 类型
let num = 123 // num 是 number 类型
let bool = true // bool 是 boolean 类型
let nul = null // null 是 null 类型
let undef= undefined // undef 是 undefined 类型
let sym = Symbol() // sym 是 symbol 类型
let big = 100n // big 是 bignit 类型
```

```typescript
// typescript
// string 类型
type stringType = "a" | "b" | "c";
const str: stringType = "a";
// number 类型
type numberType = 1 | 2 | 3;
const num: numberType = 1;
// boolean 类型
type boolType = true | false;
const bool: boolType = true;
// null 类型
type nullType = null;
const nullValue: nullType = null;
// undefined 类型
type undefinedType = undefined
const undefinedValue: undefinedType = undefined
// symbol 类型
type symbolType = symbol
const symbolValue: symbolType = Symbol("mySymbol");
// bigint 类型
type biginitType = bigint
const bitintValue1: biginitType = 100n;
const bitintValue2: biginitType = BigInt('123456789012345678901234567890');
```

如上述例子所示，JS 中用「值」来判断数据类型，在 TS 中，我们以「集合」来判断数据类型，像上诉例子中，`stringType` 表示 “a”、“b”、“c” 三个值，str 只能从这个范围中取一值，而 str 的数据类型就是 string （可通过 typeof 判断）

同理，我们再看非基本数据类型（即引用类型念），所谓非基本数据类型就是 object

> 引用类型包括：Object、Array、定型数组（typed array）、Date、RegExp、Function、基本包装类型（String、Number、Boolean）、单体内置对象（Global、Math）、ES6新增引用类型（Map、WeakMap、Set 、WeakSet）——[一切皆对象](https://fe.azhubaby.com/JavaScript/%E4%B8%80%E5%88%87%E7%9A%86%E5%AF%B9%E8%B1%A1.html)

在 TypeScript  的开发中，只允许使用小写的 number、string、boolean 以及小写的 function、array、object，为什么不是用大写的呢

因为在 JavaScript 中大写的基本类型（除 null 和 undefined 外的其余五个）有特殊的"对象包装器"，正常开发者不会使用它们，所以在 TS 中也不用。例如以下两种开发模式，你使用哪一种

```javascript
var str = "hello world"
var str1 = new String("hello string")
```

大多数人使用第一种，写第二种除了回顾命名方式的知识外没有意义。当开发使用对象字面量方式开发时，能调用 String 构造函数提供的API，JS 底层做了一些处理，使得在你访问它时，会创建一个包含基本类型字面值的特殊对象，并且具有可用的方法，并在运行玩后返回新的值，特殊对象被销毁，只留下原始值。这么说有点抽象，看例子：

```javascript
var n = 42;
console.log(n.toFixed(2)) // 42.00
```

42 赋值给 n，n 的数据类型为number，属于基本类型，从物理层面看，它是由 0 和 1 组成的二进制，怎么能调用 toFixed 方法呢？

因为 JavaScript 中有「包装对象」概念的存在，在被访问的时候，JS引擎会创建一个 Number 类型的实例，并调用toFixed方法，销毁实例并返回调用返回值，如下所示：

```javascript
let temp = new Number(42)
value = temp.toFixed(2)
temp = null // 删除 temp
return value // 返回 value
```

正因为 JavaScript 中的五种基本数据类型有包装对象的概念，开发者不使用，在 TS 中也不用

所以 object 中的包装类型我们基本不用，而 Object 类型，它则太大，像

```typescript
empty1 = {}
a1 = { 数学: 42, 英语: 99}
b1 = { 约翰: 'johan', 杰克: 'Jack'}
arr1 = [1, 2, 3]
f1 = () => 1
date1 = new Date()
r1 = new RegExp('ab+c')
...
```

等等，这些值的类型都是 Object，这个很好理解，万物皆有 Object.prototype 继承而来，所以我们在 TS 中也不用 Object 来描述对象，那用什么来描述对象呢

## 描述对象（object）

常用的方式是 type 和 interface，当然还有用 class/constructor 来描述的

> 方应杭用普通对象来表示 Object，用对象来描述 object 更有利于理解对象概念

### 普通对象

由于 Object 太不精确，所以 TS 开发者一般使用 索引签名 或 Record 泛型 来描述普通对象

#### 索引签名

```typescript
type A = {
	[k: string]: number
}
const a: A = {
    age: 18
}
```

A 表示 key 为 string，value 为 number 的所有对象，其中 k 可以换成任意单词

####  Record 泛型 

```typescript
type A2 = Record<string, number>

const a: A2 = {
    age: 18
}
```

### 数组

用 [] 和 Array 泛型来描述数组

```typescript
type A = string[]  // 等价于 type A = Array<string>
const a: A = ['johan', 'joestar']

type B = number[] // 等价于 type B = Array<number>
const b: B = [1, 2] 
```

由于 Array 太不精确了，所以 TS 开发者一般用 Array<?> 或者 string[] 或者 [string, number] 来描述数组

思考题

```typescript
type A = [1, 2 ,3]
const a:A = ????
// [1, 2, 3]
```

### 函数

```typescript
type FnA = (a: number, b: number) => number;
const fnA: FnA = (a, b) => a + b;

type FnReturnVoid = (s: string) => void;
const v: FnReturnVoid = (s) => {
  console.log(s);
};
```

由于 Function 太不精确，所以 TS 开发者不使用`Function`，一般用 `()=> ?` 来描述函数

### 描述其他对象

将 Object、Array、Function 单独拿出来讲是因为它们占据了开发中的 90%，剩余的其他对象一般直接用 class 来描述

```typescript
const d: Date = new Date();
const r: RegExp = /ab+c/;

const r2: RegExp = new RegExp("ab+c");
const m: Map<string, number> = new Map();
m.set("a", 1);
const wm: WeakMap<object, number> = new WeakMap();
console.log(wm);

const s: Set<{ name: string }> = new Set();
s.add({ name: "johan" });
const ws: WeakSet<string[]> = new WeakSet();
console.log(ws);
```

自此，我们就描述完了 JavaScript 在 TypeScript 中的所有数据类型表示



## TypeScript 自有的数据类型

### any

any 类型表示一个值可以时任何类型。如果你想禁用类型检查，就可以用 any

TS **绝大部分**规则对 any 不生效

```typescript
const f1 = (a: any) => {
    const b: never = a // 报错，any为数不多的违法的规则
}
```

那么什么等于所有类型（除了never、unknown、any、void外）的联合呢？——unknown

### unknown

unknonw 类型表示一个值可以时任何类型。通常，当应用程序需要在处理某个值的类型未知时使用

> unknown === 所有类型联合

```typescript
const f1 = (a: unknown) => {
    if (a instanceof Date) {
        // Date
    } else if (isPerson(a)) {
        // Person
    }
}
```

使用它时需要用类型收窄来确定它的类型

#### unknown  vs any

使用 unknown 类型定义的变量无法直接进行操作，需要使用**类型断言**或**类型保护**把其转换为更具体的类型之后才能对其进行操作

unknown 等于所有类型（除了never、unknown、any、void外）的联合，而 any 是跳过了 TypeScript 的类型检查。当我们遇到不确定某个值的具体类型时，使用 unknown 类型比使用 nay 更加安全，因为 TypeScript 不会自动将 unknonw 类型的值视为任意类型，需要我们在使用这个值的时候，显式地进行类型检查或类型断言，笔名因为类型不匹配而导致程序运行时错误的风险

例如以下这个例子：

```typescript
function foo(arg: unknown) {
  // 使用 any 类型，没有类型安全保障
  const a: any = arg; 
  a.sayHello(); // 不会报错，但是运行时会出现错误，因为 a 可能不含有 sayHello 方法

  // 使用 unknown 类型，会有类型安全保障
  if (typeof arg === 'object' && arg !== null && 'sayHello' in arg) {
    const b: { sayHello: () => void } = arg;
    b.sayHello(); // 不会报错，因为在进行类型检查后，b 必然含有 sayHello 方法
  }
}
```

### never

any 是全集，never 是空集，unknown 是未知集（盲盒集）



![never数据类型](https://s2.loli.net/2023/05/25/m6ue4pXsYax8oij.png)

### enum（枚举）

何时使用 enum 类型，一映射，如下例：

```typescript
enum A {
	todo = 0,
	done,
	archived,
	deleted
}

let status = 0;
status = A.todo;
status = A.done;

// A.todo 就是 0，类型擦除的时候 A.todo 会变0
```

第二：用二进制表示权限

```typescript
enum Permission {
    None = 0,
    Read = 1 << 0, // 0001
    Write = 1 << 1, // 0010
    Delete = 1 << 2, // 0100
    Manage = Read | Write | Delete, // 0111
}

const user1: { permission: Permission } = { permission: 0b0101 }
if ((user1.permission && Permission.Write) === Permission.Write) {
    console.log('有写权限')
}
if ((user1.permission && Permission.Manage) === Permission.Manage) {
    console.log('有管理权限')
}
```

何时不用 enum 类型：string enum、other enum

enum 只和 number 合适

### tuple（元组）

元组就是元素个数和类型固定的数组类型

下面是一个简单的元组的例子，表示一个人的信息：

```typescript
let person: [string, number, boolean];
person = ['Johan', 30, true];

console.log(`name: ${person[0]}, age: ${person[1]}, married: ${person[2]}`);
// 输出：name: Johan, age: 30, married: true
```

## 自定义类型

在 TypeScript 中，可以使用 `type` 或 `interface` 关键字来定义自定义类型

### type

类型别名（Type Aliases），给其他类型取个名字

值是一个具体的东西

类型是集合

type 表示类型

```typescript
type Name = string
type FalseLike = '' | 0 | false | null | undefined
type Point = {x: number; y: number}
type Points = Point[]
type Line = [Point, Point]
type Fn = (a: number, b: number) => number
```

别名是什么意思？

```typescript
type X = { x: number }
type A = X // A 的值是什么
```

答案：`A = { x: number }`

### interface

声明接口，描述对象的属性

```typescript
interface Data { [k: string]: string }
interface Point { x: number; y: number }
interface Points extends Array<Point> {}
interface Fn { (x: number, y: number): number; }
interface Date2 extends Date {}
```

**interface 是面向对象的概念**，就是将 type 能做的事情用面向对象的方式重写一遍

> 方：interface 的出现是为了获取到面向对象编程群体的认同

### type vs interface

![type vs interface](https://s2.loli.net/2023/05/24/j8OhYFArUaelRPb.png)

区别1：interface 只能描述对象，type 则描述所有数据类型

区别2：type 只是别名，interface 则是类型声明

```typescript
// 如下例子
type X = { x: number }
type A = X // type 表示别名，A = { x: number }
```

区别3：type 不可重新赋值，interface 自动合并

所以一般对外 API 尽量用 interface，方便扩展；对内 API 尽量用 type，防止代码分散

interface 自动合并：

```typescript
declare global {
  interface String {
    padZero(x: string): void;
  }
}
const s = "hello";
s.padZero("hello");
```

type 不能继承？错

**&** 解决一切

```typescript
type A = {
  name: string;
};

type B = {
  age: number;
} & A;

const b: B = {
  name: "johan",
  age: 30,
};
```

## 如何获取数据类型

通过 typeof 来获取到 user 的数据类型

```typescript
let user = {
    name: 'johan',
    age: 30,
    gender: 'male'
}

type User = typeof user;
```



## 总结

我们梳理了 TypeScript 中所有的数据类型，其中不仅包括 JavaScript 中已有的八种数据类型，还有 TypeScript 自有的数据类型类型，除此之外，我们还介绍了 TypeScript 中常见的自定义类型，在日常开发中，我们会频繁使用自定义类型，我们还对比了两种自定义类型





## 参考资料

- [编写高质量可维护的代码：Awesome TypeScript](https://mp.weixin.qq.com/s?__biz=Mzg3NTcwMTUzNA==&mid=2247486311&idx=1&sn=e673c558cde252bcd3357074fbf0a365&source=41#wechat_redirect)
