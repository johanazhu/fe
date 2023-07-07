# TypeScript 的类型兼容

> 人生自古谁无死，留取喷嚏照汗青
>
> 没打过喷嚏的人生是不完整的
>
> 鼻涕途径序列六：喷嚏

这一节我们讲类型兼容，在了解 TypeScript 的数据类型和类型运算符后，我们来说说 TypeScript 中的赋值——类型兼容

## 为什么要兼容？

因为实际工作中，往往无法做到类型一致，如下所示：

```typescript
interface Person {
    name: string
}
let johan: Person;
let elaine = { name: 'elaine', age: 30 }
johan = elaine;
```

例子中 johan 的类型是 Person，只有 name 一个属性，但是 当 elaine 赋值给 johan 时，却能赋值成功，明明类型数量不同，却没有报错，这是为什么？

因为 TypeScript 进行了**类型兼容**。即使类型数量不同，也能赋值

我们回到 JavaScript，如果是这样的代码：

```javascript
let johan = { name: 'johan' };
let elaine = { name: 'elaine', age: 30 }
johan = elaine
```

在 JavaScript 中，它不会报错。假设在 TypeScript 中报错，无疑在使用中提高门槛，不利于推广，为了让 JavaScript 更平滑地迁移到 TypeScript，TypeScript 适应了 JavaScript 的动态性，这特性称为类型兼容

## 兼容的本质

你有的，我都有，则我能代替你

如上例所示，johan 有的，elaine 都有，则 elaine 兼容（代替） johan 。任何用 johan  的地方都可以用 elaine 代替

那么我们来看看各种数据类型的兼容情况，分为简单类型、引用类型（object）、接口、函数、除此之外的类型进行介绍

> 注意，这里我们讲的是赋值（兼容），不是别名（type）。兼容可以用赋值来表示
>

## 简单类型的兼容

> 这里说的简单类型指 string、number、boolean 这三类纯粹的简单类型

```typescript
type A = string | number
let a: A = 'hi'
```

A 的类型是 string + number 的集合，但是 a 的值是 string 类型，范围比 string + number 小，所以 ‘hi’（string） 兼容 a

就是说 string 类型的集合在 string + number 的集合之内，它就能兼容 string + number

![简单类型的兼容](https://s2.loli.net/2023/06/01/4LIM6J5fq7Qxsiu.png)

结论：

当你需要一个父集的时候，我用一个子集代替，也就是说小的兼容大的

## 对象（引用类型）的兼容

```typescript
type Person = {
    name: string
    age: number
}
let user = {
    name: 'johan',
    age: 30,
    id: 1,
    gender: 'male'
}

let p: Person;
p = user;
```

属性多表示限制多，限制多范围集合小

![普通对象兼容](https://s2.loli.net/2023/06/01/9pIgwkLHasuVhXq.png)

以上案例表明：user（多属性） 兼容 p（少属性），p 的类型 Person 中的 name 和 age，user 都满足，把 user 赋值给 p ，不会报错

此外，user 作为参数也不报错

```typescript
const f1 = (p: Person) => {
	console.log(p)
}
f1(user)
```

结论：

小的兼容大的

属性多的兼容属性少的

## 接口的兼容

```typescript
interface Father {
    x: string
}
interface Son extends Father {
    y: string
}
let objectChild: Son = {
    x: 'yes',
    y: 'yes'
}
let objectParent: Father

objectParent = objectChild
```

![image-20230601165611538](https://s2.loli.net/2023/06/01/qK3mLs5QdtnYJbS.png)

结论：

子接口兼容父接口

属性多的兼容属性小的

## 函数的兼容

对象中的其他类型不做过多描述，其中只有函数特殊。函数的兼容情况比较复杂，函数包括**参数**和**返回值**，所以我们分两种情况分析

### 参数

#### 参数个数

参数个数不同能兼容吗？

```typescript
let oneParams = (a: number) => {
    console.log(a)
}
let twoParams = (a: number, b: string) => {
    console.log(a, b)
}
twoParams = oneParams // ok
oneParams = twoParams // 报错
```

奇怪，为什么是少参数的兼容多参数的，而不是多参数的兼容少参数的，这和对象的多参数兼容少参数相斥阿

我们回到 JavaScript 世界中，JavaScript 语言很灵活，开发者在调用函数的时候少写参数是很常见的事情：

```javascript
// 例子1
const button = document.getElementById('submit')
const fn = (e: MouseEvent) => console.log(e)

button.addEventListener('click', fn)
button.addEventListener('click', fn, false) // 默认，冒泡
button.addEventListener('click', fn, true) // 捕获
```

```javascript
// 例子2
let items = [1, 2, 3]
items.forEach((item, index, array) => console.log(item)) // index, array 不用
items.forEach((item) => console.log(item)) // 常用，不用的参数就不写
```

我们说过，TypeScript 是后起之军，为了获取更多的 JavaScript 转移阵地，它会让 JavaScript 无感使用 TypeScript。所以它的函数也被设计成：参数可以少传，甚至可以不传

所以 TypeScript 中的函数遵循着少参数兼容多参数

结论：少参数兼容多参数

#### 参数类型

参数类型不同能兼容吗？

```typescript
interface MyEvent {
    target: string;
}

interface MyMouseEvent extends MyEvent {
    x: number;
    y: number;
}

let listener = (e: MyEvent) => console.log(e.target)

let mouseListener = (e: MyMouseEvent) => console.log(e.x, e.y)

mouseListener = listener // ok
listener = mouseListener // 报错
```

同样的道理，虽然 listener 和 mouseListener 的类型不同，MyMouseEvent 继承自 MyEvent 。如果按照子接口兼容父接口的说法，那么应该是 MyMouseEvent 兼容 MyEvent，但是 listener 和 mouseListener 是函数，函数则相反

结论：对参数要求少的兼容对参数要求多的

我的理解是：基本类型、接口、引用类型（除函数外）等都是调用者，而函数不同，它是提供者。我一个参数的函数可以兼容你两个参数的，因为我第二个参数可以不传；我父接口的函数能兼容你子接口的函数，因为我供你选择的多。也就是说，因为 JavaScript 的特性，对少参数兼容多参数，对参数要求少的兼容对参数要求多的

### 实际工作中的函数

我们通过断言来实现

```typescript
interface MyEvent {
    target: string;
}

interface MyMouseEvent extends MyEvent {
    x: number;
    y: number;
}
function listenEvent(eventType: string, fn: (n: MyEvent) => void) {}

// 肯定不行
listenEvent("click", (e: MyMouseEvent) => console.log(e.x + "," + e.y));

// 可以对值进行断言
listenEvent("click", (e: MyEvent) => {
  console.log((e as MyMouseEvent).x + "," + (e as MyMouseEvent).y);
});

// 也可以对 e 进行断言
listenEvent("click", ((e: MyMouseEvent) => console.log(e.x + "," + e.y)) as (
  e: MyEvent
) => void);
```

### 返回值

#### 返回值类型

```typescript
let returnName = () => {
    return {name: 'johan'}
}
let returnNameAndAge = () => {
    return {name: 'johan', age: 30}
}
returnName = returnNameAndAge // ok
returnNameAndAge = returnName // 报错
```

结论：

返回值属性多集合小兼容返回值属性小集合大

也就是说，限制多的兼容限制少的



## 特殊类型

所谓的特殊类型，就是指 `any`、`unknown`、`object`、`void`、`undefined`、`null`、`never`

它们的兼容情况如下图所示，any、unknown 能兼容以下所有类型，而 never 则不能兼容以下所有类型。除此之外，

![image-20230601111230692](D:\Documents\PicGo Files\image-20230601111230692.png)



## 总结

这一节我们类型兼容，其中简单类型、对象、接口的兼容很简单，就是限制多的兼容限制少的。而函数的兼容则相反，它为符合 JavaScript 的多参数不传参的特性，兼容的特性符合：少参数兼容多参数，对参数要求少的兼容对参数要求多的。除此之外，我们就特殊类型进行列表展示







