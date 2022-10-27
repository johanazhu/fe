# TypeScript 学习笔记



> 这里不去记录基础知识，只记录不太熟悉以及较难的知识点

## 简单介绍

TypeScript 是什么？

JavaScript 的超集，主要提供了类型检测和对 ES6 的支持

简单来说，就是 ES6 语法+类型，因为写类型，能在写代码时检测出错误，以至于减少bug。现在前端项目越来越大、各种前端工程化、全栈化、各种前端框架等等， TypeScript 随之流行也很正常

### 基础

JavaScript 的类型分为两种：[基本类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)（也叫原始数据类型、原始值）和对象类型

原始数据类型包括：布尔值、数值、字符串、`null`、`undefined` 以及 ES6 中的新类型 [`Symbol`](http://es6.ruanyifeng.com/#docs/symbol) 和 ES10 中的新类型 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

### 教程介绍

[官网](https://www.typescriptlang.org/)

[中文官网](https://www.tslang.cn/)

[TypeScript 入门教程](https://ts.xcatliu.com/introduction/what-is-typescript.html)



## 难点

接口 interface

泛型 Generices

类 Classes

枚举类型 Enums



### 接口

接口为使用该接口的对象定义契约或结构

接口是用关键字定义的 interface，它可以包含使用函数或箭头函数的属性和方法生命

```typescript
interface IEmplyee {
    empCode: number;
    empName: string;
    getSalary: (number) => number; // 箭头函数
    getManagerName(number): string
}
```



### 泛型

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









## 面试常见问题

### interface 和 type 的区别



1基础数据类型与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组

```typescript
// primitive
type Name = string;

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement("div");
type B = typeof div;

```

2.重复定义

接口可以定义多次，会被自动合并为单个接口 。类型别名不可以重复定义

```typescript
interface Point {
  x: number;
}
interface Point {
  y: number;
}
const point: Point = { x: 1, y: 2 };
```

3.扩展 接口可以扩展类型别名，同理，类型别名页可以扩展接口。但是两者实现扩展的方式不同

接口的扩展时继承，通过 extends 实现。类型别名的扩展是交叉类型，通过 & 来实现

```typescript
// 接口扩展接口
interface PointX {
  x: number;
}

interface Point extends PointX {
  y: number;
}
// ----
// 类型别名扩展类型别名
type PointX = {
  x: number;
};

type Point = PointX & {
  y: number;
};
// ----
// 接口扩展类型别名
type PointX = {
  x: number;
};
interface Point extends PointX {
  y: number;
}
// ----
// 类型别名扩展接口
interface PointX {
  x: number;
}
type Point = PointX & {
  y: number;
};

```

4.实现 类无法实现定义了联合类型的类型别名

```typescript
type PartialPoint = { x: number } | { y: number };

// A class can only implement an object type or
// intersection of object types with statically known members.
class SomePartialPoint implements PartialPoint {
  // Error
  x = 1;
  y = 2;
}

```





### 使用 Type 还是 Interface？

有几种常用规则：

- 在定义公共 API 时(比如编辑一个库）使用 **interface**，这样可以方便使用者继承接口

- 在定义组件属性（Props）和状态（State）时，建议使用 **type**，因为 **type**的约束性更强
  - **interface** 和 **type** 在 ts 中是两个不同的概念，但在 React 大部分使用的 **case** 中，**interface** 和 **type** 可以达到相同的功能效果，**type** 和 **interface 最大的区别**是：

- **type** 类型不能二次编辑，而 **interface** 可以随时扩展

- ```typescript
  interface Animal {
    name: string
  }
  
  // 可以继续在原有属性基础上，添加新属性：color
  interface Animal {
    color: string
  }
  /********************************/
  type Animal = {
    name: string
  }
  // type类型不支持属性扩展
  // Error: Duplicate identifier 'Animal'
  type Animal = {
    color: string
  }
  ```

  









## 参考资料

-   [TypeScript 入门教程](https://ts.xcatliu.com/)
-   [使用 TypeScript 常见困惑：interface 和 type 的区别是什么？](https://blog.fundebug.com/2021/06/28/typescript-the-difference-between-interface-and-type/)
-   [图雀的 typescript 教程](https://tuture.co/tags/Typescript/)
-   [4000 字讲清 《深入理解 TypeScript》一书 【基础篇】](https://segmentfault.com/a/1190000021210413)
-   [编写高质量可维护的代码：Awesome TypeScript](https://mp.weixin.qq.com/s/gAwvcmSNYMwQKk6RY-GaEw)
-   [字节 React + TypeScript 实践总结篇](https://mp.weixin.qq.com/s/v7uZrEmEaPVfL76PHGD1oQ)
-   [最全的 TypeScript 学习指南](https://juejin.cn/post/7031787942691471396)
-   [如何优雅地在 React 中使用TypeScript，看这一篇就够了！](https://mp.weixin.qq.com/s/0aJmPyh_Npn3CiGJuyd5aw)

