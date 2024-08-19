# TypeScript 最佳实践

## TS + Node 最新实战



ts-node 是否是唯一选择

```bash
npm install @types/node --save-dev
```



虽然说现代我们可以用一些成熟的库：如 next.js、remix.js 预制了环境，只用写就好，但是如果能手动写，造个轮子能加深我们对其理解



实战弄个脚手架





## TS + React 最新实战

### 如何引入 React

```tsx
import * as React from 'react'

import * as ReactDOM from 'react-dom'
```

这种引用方式 [被证明 ](https://www.reddit.com/r/reactjs/comments/iyehol/import_react_from_react_will_go_away_in_distant/)是最可靠的一种方式， **推荐使用**。

而另外一种引用方式:

```tsx
import React from 'react'

import ReactDOM from 'react-dom'
```

需要添加额外的配置："allowSyntheticDefaultImports": true



### 函数式组件的声明方式

声明的几种方式

第一种：也是比较**推荐**的一种，使用 **React.FunctionComponent**，简写形式：**React.FC:**

```
// Great
type AppProps = {
  message: string
}

const App: React.FC<AppProps> = ({ message, children }) => (
  <div>
    {message}
    {children}
  </div>
)
```

使用用 React.FC 声明函数组件和**普通声明**以及 **PropsWithChildren** 的区别是：

- React.FC 显式地定义了返回类型，其他方式是隐式推导的

- React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全
- React.FC 为 children 提供了隐式的类型（ReactElement | null），但是目前，提供的类型存在[一些 issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006)

比如以下用法 React.FC 会报类型错误：

```tsx
const App: React.FC = props => props.children
const App: React.FC = () => [1, 2, 3]
const App: React.FC = () => 'hello'
```

解决方法:

```tsx
const App: React.FC<{}> = props => props.children as any
const App: React.FC<{}> = () => [1, 2, 3] as any
const App: React.FC<{}> = () => 'hello' as any
// 或者
const App: React.FC<{}> = props => (props.children as unknown) as JSX.Element
const App: React.FC<{}> = () => ([1, 2, 3] as unknown) as JSX.Element
const App: React.FC<{}> = () => ('hello' as unknown) as JSX.Element
```

在通常情况下，使用 **React.FC** 的方式声明最简单有效，推荐使用；如果出现类型不兼容问题，建议使用**以下两种方式：**

第二种：使用 **PropsWithChildren**，这种方式可以为你省去频繁定义 children 的类型，自动设置 children 类型为 ReactNode:

```tsx
type AppProps = React.PropsWithChildren<{ message: string }>
const App = ({ message, children }: AppProps) => (
  <div>
    {message}
    {children}
  </div>
)
```

第三种：直接声明:

```tsx
type AppProps = {
  message: string
  children?: React.ReactNode
}

const App = ({ message, children }: AppProps) => (
  <div>
    {message}
    {children}
  </div>
)
```







## TS 全解

TS、JSX、React、Vue 综合篇



























## 参考资料

- [字节 React + TypeScript 实践总结篇](https://mp.weixin.qq.com/s/v7uZrEmEaPVfL76PHGD1oQ)
- [如何优雅地在 React 中使用TypeScript，看这一篇就够了！](https://mp.weixin.qq.com/s/0aJmPyh_Npn3CiGJuyd5aw)

