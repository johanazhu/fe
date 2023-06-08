# TypeScript 的运行与调试



首先心中要有这个公式：TypeScript =  ES6 + Type

所以如果要让 TypeScript 代码在浏览器上运行，就需要擦除它的类型，让其成为 JavaScript。这就要聊到 TypeScript 与 ES6、ES5的关系

- TypeScript 经过类型擦除转变成 ES6，它能在 Node.js 12+、Chrome 100 上运行
- ES6 经过转译成 ES5，能在 Node.js 10-、ES11-上运行
- ES5 在打包成单文件，浏览器访问速度加快

其中类型擦除工具的工具有：esbuild、swc、typescript、babel

转译（ES6-ES5）工具：babel

打包压缩编译工具：esbuild、vite、webpack、rollup 等

> ES6 兼容表：[es6 compatibility table](https://kangax.github.io/compat-table/es6/)



## 类型擦除

以上我们聊到了类型擦除，其中以下四种最为知名

```bash
npm i -g esbuild
npm i -g @swc/cli @swc/core

npm i -g typescript
npm i @babel/core @babel/cli @babel/preset-typescript # 不用全局安装
```

esbuild、swc 快（不检查 TS 语法）

typescript、babel 慢、老牌（检查语法）

性能速度对比：https://esbuild.github.io/



## 如何运行 Typescript

### 官方演练场

[typescript playground](https://www.typescriptlang.org/play)

### 在线编辑器

[playcode.io](https://playcode.io)：最快的前端在线编辑器，虽然快，但是收费

[stackblitz.com](https://stackblitz.com/)

[codesandbox.io](https://codesandbox.io/)

### 本地编辑 + 浏览器

一般我们开发前端项目，如果是 TS 项目，推荐使用 [vite](https://vitejs.dev/)，而不是 webpack，原因很简单， vite 快，起手式也用 vite，而不是 create-react-app，原因也很简单，create-react-app 不怎么更新了，没钱让它继续维持

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vanilla-ts

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vanilla-ts

# yarn
yarn create vite my-vue-app --template vanilla-ts

# pnpm
pnpm create vite my-vue-app --template vanilla-ts
```

> PS：vanilla 的意思是香草

### 本地编辑 + Node

如果要在服务端（Node）中使用 Node，有以下四种选择

- [ts-node](https://typestrong.org/ts-node/)：老牌，最有名

- [swc-node](https://github.com/swc-project/swc-node)：性能好

- [@esbuild-kit/esm-loader](https://github.com/esbuild-kit/esm-loader)

- [esno](https://github.com/esbuild-kit/esno)



## 如何调试 Typescript

鼠标放上去，如果报错，会提示

