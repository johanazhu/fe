# TypeScript 中的泛型





## 什么是泛型

泛型（Generic Types）即多种类型。允许开发者在编写函数或类时，不预先确定具体的数据类型，而是使用类型参数来表示。例如，一个简单的泛型函数可以这样定义：

```typescript
type F<A, B> = A | B
type Result = F<string, number>
// string | number
```



## 泛型的语法

```
type F<A, B> = A | B
type Result = F<string, number>
```

F：函数明

A,B：参数列表

A | B：函数体/返回值

Result：返回一个类型

F<string, number>：函数调用

## 泛型的本质

函数的本质是什么？

推后执行的、部分待定的代码

```javascript
console.log(1) // 立即执行

const f1 = () => console.log(1) // 这是定义了，还没执行，这就是推后执行

const f2 = (x) => console.log(x) // x 就是部分待定的代码，f2(1) 传入1代码执行
```

而泛型，则是**推后执行的、部分待定的类型**



## 为什么需要泛型

因为没有泛型，有点功能做不了

例如：

```typescript
function echo(whatever: number | string | boolean) {
    return whatever
}
```

参数类型和返回值类型也许不一致

我们希望传入什么类型，返回什么类型。传入 number 返回 number，传入 string 返回 string，传入 boolean 返回 boolean，但现阶段做不到这种精细化的类型区分，所以必须使用泛型

## 结论

没有泛型，有些奇怪的需求就无法实现

没有泛型的类型系统，就如同没有函数的编程语言



## 难度为一星的泛型

并集、交集、interface

代入法和默认参数

```typescript
type Union<A, B> = A | B
type Union3<A, B, C> =A | B | C

type Intersect<A, B> =A & B
type Intersect3<A, B, C> =A & B & C

interface List<A> {
	[index:number]: A
}
interface Hash<V> {
 	[key:string]: V
}
```



## 在泛型中使用 extends（难度为二星的泛型）

```typescript
type Person = { name: string }

type LikeString<T> = ???
type LikeNumber<T> = ???
type LikePerson<T> = ???

    
type R1 = LikeString<'h1'> // true
type R2 = LikeString<true> // false
type S1 = LikeNumber<666> // 1
type S2 = LikeNumber<false> // 2
type T1 = LikePerson<{ name: 'frank', xxx: 1}> // yes 
type T2 = LikePerson<{ xxx: 1}> // no
    
    
type LikeString<T> = T extends string ? true : false
type LikeNumber<T> = T extends number ? 1 : 2
type LikePerson<T> = T extends Person ? 'yes' : 'no'
```

> extends 读作 继承 或 包含于

这个叫做 Conditional Type：条件类型

规则

- 若 T 为 never，则表达式的值为 never
- 若 T 为联合类型，则分开计算









泛型约束

```typescript
type GetKeyType<T, K extends keyof T> = T[K]
```





分配率









泛型是指在定义函数、接口或类时，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

应用场景：当我们需要考虑代码的可复用性时，就需要用到泛型。让组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型。**泛型允许同一个函数接受不同类型参数**，相比于使用 Any 类型，使用泛型来创建的组件可复用和易扩展性要更好，因为泛型会保留参数类型。

泛型可用于接口、类、变量

泛型接口

```typescript
interface identityFn<T> {
	(arg: T): T;
}
```

泛型类

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add:(x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y
}
```

泛型变量

使用大写字母A-Z定义的类型变量都属于泛型，常见的泛型变量如下：

- T（Type）：表示一个 TypeScript 类型
- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型





