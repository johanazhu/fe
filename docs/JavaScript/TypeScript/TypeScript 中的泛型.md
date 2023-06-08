# TypeScript 中的泛型





如果你看懂 JS 的函数，那么你就看得懂 TS 的泛型

```typescript
type F<A, B> = A | B
type Result = F<string, number>
```



泛型是一种类型，泛型是接受其他类型的类型。就好比函数是接受其他代码的代码



函数的本质是什么？

推后执行的、部分待定的代码

![image-20230603084249221](D:\Documents\PicGo Files\image-20230603084249221.png)



泛型的本质

推后执行的、部分待定的类型



为什么需要泛型

泛型是类型系统发展到一定程度后必然发展的产物

```typescript
function whatever() {

}
```

没有泛型

有些奇怪的需求就无法满足

没有泛型的类型系统，就如同没有函数的编程语言



### 难度为一星的泛型

并集、交集、interface

代入法和默认参数



### 难度为二星的泛型

extends：继承/包含于

条件类型

规则：

分配率











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





# 泛型全面解析笔记

