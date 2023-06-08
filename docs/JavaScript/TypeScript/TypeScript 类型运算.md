# TypeScript 的类型运算

上一节我们介绍了 TypeScript 的数据类型，这一节我们讲讲 TypeScript 的类型运算。在 JavaScript 中，我们有对值进行各种运算，在 TypeScript 中，怎么对类型进行运算

## 联合类型（并集）

联合类型（Union Types）表示取值可以为多种类型中的一种

多说无益，看例子说话：

```typescript
type A1 = number;
type B1 = string;
type C1 = A1 | B1;
const c1: C1 = "hi";

type A2 = { name: string };
type B2 = { age: number };
type C2 = A2 | B2;
const c2: C2 = {
  name: "johan",
  age: 30,
};

const c3: C2 = {
  name: "elaine",
};
```

![联合类型](https://s2.loli.net/2023/05/25/mKR27zhC1N9WXyE.png)

看例子和图我们能明白，它是并集。像 c3 它只有 name 值，也属于类型 C2 的范围



## 类型收窄

联合类型是为了扩大我们的选择，而与之对应的是类型收窄。类型收窄的目的是将类型范围缩小到具体的类型，例如:

```typescript
type Fruit = "apple" | "banana" | "orange";

function getFruit(frite: Fruit): void {
      if (fruit === "apple" || fruit === "orange") {
        console.log(fruit.toUpperCase()); // fruit 的类型此时会缩小为 "apple" 或 "orange"
      } else {
        console.log(fruit.length); // fruit 的类型此时会缩小为 "banana"，因为 "banana" 是唯一剩下的类型
      }
}

getFruit("apple"); // 输出 "APPLE"
getFruit("banana"); // 输出 6
```

上面的示例中，当 fruit 的值为 apple 或者 orange 时，它的类型就会被收窄为 apple 或者 orange。我们通过 if...else 逻辑来收窄类型

同理，使用 typeof 也能区分类型，这个 JavaScript 中的类型判断一样，如果你看过笔者写的这篇文章——[JavaScript 由什么组成](https://fe.azhubaby.com/JavaScript/JavaScript%E7%94%B1%E4%BB%80%E4%B9%88%E7%BB%84%E6%88%90.html)，就能明白 typeof 的虽然能检测出 string、number、boolean、undefined 以及 function，但是不能检测 null 以及除 function 外的对象

除了 typeof 外，我们还能通过 instanceof 来判断类型，他虽然能检测出引用类型（object对象），但是它不能判断基本数据类型和 TS 独有的类型

而在 TypeScript 中，我们还可以使用 in 来收窄类型

```typescript
type Person = {
    name: sring
}

const f1 = (a: Person | Person[]) => {
    if ('name' in a) {
        a // Person
    } else {
        a // Person[]
    }
}
```

但这个方法只适用于部分对象

我们还可以通过 JavaScript 中判断类型的函数类区分类型

```typescript
const f1 = (a: string | string[]) => {
    if (Array.isArray(a)) {
        a.join('\n').toString()
        // a 的类型为 string[]
    } else if (typeof a === 'string'){
        parseFloat(a).toFixed(2)
    } else {
        throw new Error('Never do this')
    }
}
```

但它也有局限，就是不是每个类型都有判断类型的方法，像Array 有 isArray 方法，但是 Object、Function、Date、String、Number 等类型都没有响应的类型自带判断方法，所以它局限性很大

我们总结一下以上五种类型收窄

|                          | 满足                                                         | 不足                               |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------- |
| 逻辑判断（if...else...） | 只能实现简单的类型                                           | 不能判断复杂的类型                 |
| typeof                   | 能判断 string、number、boolean、undefined 以及 function 类型 | 不能判断 null 以及除 function 类型 |
| instanceof               | 能判断引用数据类型                                           | 不能判断基础数据类型               |
| in                       | 只适用部分对象                                               | 只适用部分对象                     |
| 判断类型的函数           | 只适用自带判断自身类型的类型，如Array                        | 除 Array 都不适合                  |

以上就是我们通过 JavaScript 来实现的类型收窄，但 JavaScript 的类型太垃圾了。现在看看 TypeScript 原装的类型收窄方法们

### 类型谓词（is）/类型判断

```typescript
type Rect = { height: number; width: number }
type Circle = { center: [number, number]; redius: number }
function isRect(x: Rect | Circle): x is Rect { // x is Type
    return 'height' in x && 'width' in x
}
const f1 = (a: Rect | Circle) => {
    if (isRect(a)) {
        // Rect
    } else {
        // Circle
    }
}
```

is  的优点：支持所有的 TS 类型

缺点：写起来麻烦

### 可辩别联合类型（x.kind）

如何使用联合类型？

```typescript
const f1 = (a: number | string) => {
	"既不能把 a 当作 number"
    "也不能把 a 当作 string"
    "那么，怎么使用 a 变量呢"
}
// 用 a.kind 区分 a 的类型
```



```typescript
type A = { kind: 'A'; value: number } 
type B = { kind: 'B'; value: string } 
const f1 = (a: A | B) => {
    if (a.kind === 'A') {
        // A
    } else if (a.kind === 'B') {
        // B
    } else {
        // never
    }
}

```

这就是可辨别联合类型（Discriminated Unions）

```typescript
interface Circle { kind: "circle"; radius: number; }
interface Square { kind: "square"; sideLength: number; }
type Shape = Circle | Square;

const f1 = (shape: Shape) => {
    if (shape.kind === 'circle') {
        // Circle
    } else if (shape.kind === 'square') {
        // Square
    } else {
        // never
    }
}
```

优点：

让复杂类型的收窄变成简单类型的对比

缺点：

代码看起来很傻

需要达到什么标准才能被称为：可辨别联合类型

要求：T = A | B | C | D | ...

- A、B、C、D...有相同属性kind 或其他

- kind 的类型是 简单类型
- 各类型中的 kind 可区分

一句话总结：

同名、可辩别的简单类型的key



### 类型断言（as）

```typescript
let someValue: any = 'hello world';
let strLength: number = (someValue as string).length;
```

所谓断言，就是直接明了的告诉编译器一个变量的实际类型，从而可以跳过编译器的类型检查，手动指定一个更具体的类型

## 交叉类型（交集）

itersection types

```typescript
type A = string & number // never
```



```typescript
type haveLeftHand = {
	left: string
}
type haveRightHand = {
    right: string
}

type D = haveLeftHand & haveRightHand

type d: D = {
    left: 'yes'
}
// 缺少属性 "right"
```

如下图所示：

![image-20230526145935143](https://s2.loli.net/2023/05/26/VtkvfjU5BHQceAz.png)

接口（interface）也能有交集

```typescript
interface Colorful {
	color: string
}
interface Circle {
    radius: number
}
type ColorfulCircle = Colorful & Circle
```

交叉类型常用于有交集的类型A、B，如果 A、B 无交集，可能得到 never，也可能只是属性为 never



## 总结

这一节我们介绍了 TypeScript 中的类型运算，其中包括联合类型和交叉类型

联合类型是为了扩大我们的选择，而当有众多选择时如何分辨类型，就引入了一个新词——类型收窄。我们分析 JavaScript 判断类型的方法，如逻辑判断、typeof、instanceof、in、判断类型的函数等方法，但仅仅适用 JavaScript 的类型判断不足以判断 TypeScript 的类型，于是我们沿着类型收窄的思路介绍了 类型谓词（is）、可辨别联合类型（x.kind）、类型断言等 TS 的方法

交叉类型其实也很简单，就是两个类型的交集。如果两类型无交集，可能得到 never


