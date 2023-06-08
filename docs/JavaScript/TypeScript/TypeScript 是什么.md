# TypeScript 是什么

在说 TypeScript 是什么之前，先问问自己为什么要去学 TypeScript。淦，JavaScript 不是蛮好的吗，想怎么写就怎么写，报错了再说一句：别人笑我太疯癫，我笑别人看不穿。当小白请教如何解决报错时，左手一个 sentry 查找错误，右边 source map 跟踪源代码报错位置，小组长位置稳稳把控

但这是自私的行为，笔者这里有三点理由解释前端开发者必须学习 TypeScript

- 因为 JavaScript 是几天时间开发出来的，后端们看不起前端，觉得 js 是门玩具语言，随便写写，怎么能与我大 Java 相提并论，何况它起 JavaScript 直译就是"Java 脚本"，蹭我热度。而如果是 TypeScript ，加上类型检测，它就能让前端更加复杂话。后端想学，成本就没那么低了...
- 大公司或者大型项目中的协同开发，如果遇到不靠谱的代码片段，会让你的应用出现bug，从而网站崩溃，所以我们需要 TypeScript 在写代码时知道代码是对是错...
- 说到底还是卷，TypeScript 拥有你 JavaScript 所有的优点以及你没有的类型系统，优秀的人会去学，从而开发项目时使用它，你不去学，就看不懂。企业招聘时，想招优秀的人，你不学就进不去好公司...

以上就是学习 TypeScript 的必要理由，现在回到我们要有 TypeScript 这个话题

## 为什么会有 TypeScript ？

因为 JavaScript 是动态语言，动态语言不适合大型应用的开发。 微软的 Anders Hejlsberg 写了个语言，将 JavaScript 添加上类型，就成了 TypeScript。它是静态语言，可以在编辑时检查写的代码是否有问题。所以现在大型项目都用 TypeScript 来开发

## TypeScript 是什么

简单来说，TypeScript =  JavaScript + Type

TypeScript 是 JavaScript 的超集，也就是说，它包含了 JavaScript 的所有的语法和功能，并在此基础上增加了静态类型系统、接口、枚举类型等特性，使得开发者能够更好地编写和维护代码

其中，类型系统上 TypeScript 最大的亮点，它可以让开发者在编写代码时自动检测类型错误，减少因为类型错误导致的运行时错误，增加代码的可读性和可维护性



## TypeScript VS JavaScript 

|          | TypeScript                             | JavaScript                       |
| -------- | -------------------------------------- | -------------------------------- |
| 类型     | 静态类型                               | 动态类型                         |
| 编译时   | 在编译时检查类型，提示不安全的类型错误 | 编译时没有类型信息，不做类型检查 |
| 运行时   | 运行时类型安全                         | 运行时类型检查，类型不安全报错   |
| 其他优点 | 在写代码时提示                         | 没有                             |





## 开发技巧

这里笔者收集了在开发中常见的开发技巧，其实如果你熟练 ES6 的开发，对其中的新特性有所了解，也应该有所了解

### 空值处理

联合判断是否为空值，可以用 `??` 来判断

```typescript
let temp = (val !== null && val !== void 0 ? val : '1'); // JS
let temp = val ?? '1'; // TS
```

### 可选链

需要连续判断某个对象里面是否存在某个深层次的属性，可以使用 `?.`

```typescript
if(result && result.data && result.data.list) // JS
if(result?.data?.list) // TS
```

> PS：空值处理和可选链是 ES11 新增特性 

