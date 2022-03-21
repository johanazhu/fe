# TypeScript 学习笔记

我是 typescript

ts 最佳实践
做个 todolist

## 一.简介：

### 什么是 TypeScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由微软开发，代码开源于 GitHub 上

### 为什么选择 TypeScript

#### 增强了代码的可读性和可维护性

-   类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用
-   可以在编译阶段就发现大部分错误，这总比在运行时候出错好
-   增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

#### TypeScript 拥有活跃的社区

-   大部分第三方库都有提供给 TypeScript 的类型定义文件
-   大公司的开源项目开始用 TypeScript 来写，比如 antdesign
-   拥抱 ES6 规范，也支持部分 ESNext 草案的规范

#### TypeScript 的缺点

-   有一定的学习成本，需要理解接口（Interfaces）、泛型（Generices）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
-   增加开发成本，毕竟要写类型定义
-   与一些库结合不是很完美

### 安装 TypeScript

```shell
npm install -g typescript
```

以上命令会在全局环境下安装 `tsc` 命令，安装完成之后，我们就可以在任何地方执行 `tsc` 命令了

编译一个 TypeScript 文件很简单

```shell
tsc hello.ts
```

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时， 以 `.tsx` 为后缀

### Hello TypeScript

从一个简单的例子开始，创建文件 `hello.ts`

```typescript
function sayHello(person: string) {
    return `Hello ${person}`;
}
let user = 'To,';
console.log(sayHello(user));
```

然后执行

```shell
tsc hello.ts
```

TypeScript 是 javaScript 的超集其实就是原生 ES 语法+Type 类型

切记 所有的 ts 的依赖，都必须是@types 开头的，否则用不了

-   类型定义：每一个变量都需要定义它的类型
-   引用第三方类库：第三方库如果不是 `TypeScript` 写的，没有提供声明文件，就需要去为第三方库编写声明文件
-   新概念：`TypeScript` 中引入的类型（Types）、类（Classes）、泛型（Generics）、接口（Interfaces）以及枚举（Enums）

## 参考资料

-   [TypeScript 入门教程](https://ts.xcatliu.com/)
-   [使用 TypeScript 常见困惑：interface 和 type 的区别是什么？](https://blog.fundebug.com/2021/06/28/typescript-the-difference-between-interface-and-type/)
-   [图雀的 typescript 教程](https://tuture.co/tags/Typescript/)
-   [4000 字讲清 《深入理解 TypeScript》一书 【基础篇】](https://segmentfault.com/a/1190000021210413)
-   [编写高质量可维护的代码：Awesome TypeScript](https://mp.weixin.qq.com/s/gAwvcmSNYMwQKk6RY-GaEw)
-   [又升级了！你不知道的 TypeScript 泛型（千字长文，建议收藏）](https://mp.weixin.qq.com/s/JTfzexEh0qYDWHCT4l337A)
-   [总结 TypeScript 在项目开发中的应用实践体会](https://mp.weixin.qq.com/s/fe_VqsoEErmBF6y5pph99A)
-   [30 个小知识让你更清楚 TypeScript](https://mp.weixin.qq.com/s/TzkAQrDYR2O2VeauYCSWhw)
-   [了不起的 tsconfig.json 指南](https://zhuanlan.zhihu.com/p/285270177)
-   [字节 React + TypeScript 实践总结篇](https://mp.weixin.qq.com/s/v7uZrEmEaPVfL76PHGD1oQ)
-   [最全的 TypeScript 学习指南](https://mp.weixin.qq.com/s/B7sdfzu6ZBbfwSdB34rGGA)
