# TypeScript 中的对象与函数

### 前言

先记住公式：TypeScript = JavaScript + 类型。所以我们只要学会了类型，就掌握了 TypeScript。这一节我们



## 对象语法

```typescript
type Person {
	name: string	
}
// 或
interface Person {
    name: string;
}
```



### 索引签名（Index Signature）

```typescript
type Hash = {
    [k: string]: unknown
    length: number
}

type List = {
	[k: number]: unknown
    length: number
}
```





### 映射类型（Mapped Type）

> 多用于泛型

```typescript
type Hash = {
	[k in string]: unknown
}

type List = {
	[k in number]: unknown
}
```

不能加 length，原因呢



### 问号表示可有可无

```typescript
type InputProps = {
	defaultValue?: string;
    value?: boolean;
    onChange?: () => void;
}
// 或者
interface InputProps {
    defaultValue?: string;
    value?: boolean;
    onChange?: () => void;
}
```



### readonly 表示只读，不能写

```typescript
interface User {
    readonly id: number
    readonly name: string
    readonly scores: number[]
    age?: number
}
const johan: User = {
    id: 1,
    name: 'johan',
    scores: [99, 69]
}
johan.id = 2 // 报错, 无法为“id”赋值，因为它是只读属性。
johan.scores[0] = 100 // 不报错
```

描述 TS 的对象类型，须知

- type 或 interface 来表示
- 索引签名和映射类型
- 问号表示可选
- readonly 表示只读



## 函数语法

对象的语法全部适用于函数

声明函数及其类型的方式

```typescript
// 先写类型再赋值,优雅
type F1 = (a: number, b: number) => number
const f1: F1 = (a,b)=>a + b
// 先实现箭头函数，再获取类型
const f2 = (a: number, b: number): number => {
    return a + b
}
// type F2 = typeof f2
// 先实现普通函数，再获取类型
function f3(this: unknown, a: number,b: number):number {
    return a + b
}
type F3 = typeof f3
// 先实现匿名函数，再获取类型
const f4 = function (this: unknown, a: number, b: number):number {
    return a + b
}
type F4 = typeof f4
// 通过构造函数 Function 来实现，但没人写
const f5 = new Function('a', 'b', 'return a + b')
type F5 = typeof f5
```

当然，还有生成器（Generator）和异步函数，这里不做讨论



两种特殊的函数：构造函数和类型谓词



### 函数类型的其他特征

#### 可选参数



#### 参数默认值



#### 参数也是函数



#### 返回值也是函数



#### 重载

在 Java 中有重载，但是在 JavaScript 中没有

早期 JavaScript 为了抱 Java 大腿，语法特性上都往 Java 上靠，在 Java 中有重载概念，

重载的概念是同名函数，参数类型不同，参数个数不同，都不同

