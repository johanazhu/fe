# TypeScript 入门省流版



## TypeScript 是什么

JavaScript 的超集，主要提供了类型检测和对 ES6 的支持

简单来说，就是 TypeScript = ES6 +类型。因为写类型，能在写代码时检测出错误，以至于减少bug。现在前端项目越来越大、各种前端工程化、全栈化、各种前端框架等等， TypeScript 随之流行也很正常

## 为什么学 Typescipt

它提供静态类型系统，增加代码的可读性以及可维护性，已经成为大型项目的标配

用了之后就不想用 Javascript 了，有代码提示，不用担心会写错误代码了

```typescript
const button = document.getElementById('XXX')


button?.addEventListener('click', function() {
    // 自动加 ? 等于 if (button) {}
    this.style.border = '1px solid red' // ok
    this.addClass() // 报错提示
})
```



## 起手式

安装 typescript 

```bash
npm i typescript -g
```

编写 ts 文件

```tsx
const hello: string = 'hello';
```

编译 ts 文件

```
tsc hello.ts
```

编译之后就生成了 `hello.js`

```javascript
var hello = "hello";
```

如此，你的第一个 ts 文件就写好了

> 这里我们用 typescript 来实现类型擦除，还可以用esbuild、swc 来实现，性能比 typescript 快很多，但是后两者不检查语法，所以快
>

## 数据类型

TS 的数据





### 类型断言 as

```typescript
let result: unknown = 10;
let data: number = result; // 报错，不能将类型“unknown”分配给类型“number”。
let data1: number = result as number; // 使用 类型断言as 将 unknown 类型转换为 number 类型
```







## 参考资料

-   [TypeScript 入门教程](https://ts.xcatliu.com/)
-   [图雀的 typescript 教程](https://segmentfault.com/a/1190000022282306)
-   [编写高质量可维护的代码：Awesome TypeScript](https://mp.weixin.qq.com/s?__biz=Mzg3NTcwMTUzNA==&mid=2247486311&idx=1&sn=e673c558cde252bcd3357074fbf0a365&source=41#wechat_redirect)
-   [字节 React + TypeScript 实践总结篇](https://mp.weixin.qq.com/s/v7uZrEmEaPVfL76PHGD1oQ)
-   [最全的 TypeScript 学习指南](https://juejin.cn/post/7031787942691471396)
-   [如何优雅地在 React 中使用TypeScript，看这一篇就够了！](https://mp.weixin.qq.com/s/0aJmPyh_Npn3CiGJuyd5aw)

