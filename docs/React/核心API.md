# 核心 API



这里对重要的 API 做介绍

## 概览



### 组件

[Component](#Component)

- 组件，React

[PureComponent](#PureComponent)

- 与 Component 不同的点在于，它进行了浅对比
- 即 shouldComponentUpdate 的操作

[memo](#memo)



### Refs

[createRef](#createRef)

[forwardRef](#forwardRef)

- 转发，把 ref 转发给下一个组件



### Fragment

[Fragment](#Fragment)

- 其包裹作用，但自身不渲染到 DOM 上（不会渲染任何可见的UI）
- 允许你将子列表分组，而无需向 DOM 添加额外节点
- 减少不必要嵌套的组件



### lazy&Suspense

[lazy](#lazy)

- 懒加载，本质是返回一个 Promise 实例

[Suspense](#Suspense)

- 与 lazy 搭配，在等待加载 lazy 组件时做优雅降低（如 loading 指示器等）
- 使得组件可以“等待”某些操作结束后，再进行渲染



### 创建 React 元素

[createElement](#createElement)

- 每个 JSX 元素都是调用 React.createElement 的语法糖

[createFactory](#createFactory)



### 转换元素

[cloneElement](#cloneElement)

[isValidElement](#isValidElement)

[React.Children](#React.Children)

- map、forEach、count、toArray、only

  

### 其他

[Context](#Context)

- 提供一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

[Portals](#Portals)

Profiler

- 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”

StrictMode

- 严格模式。
- 有助于
  - 识别不安全的生命周期
  - 关于使用过时字符串 ref API 的警告
  - 关于使用废弃的 findDOMNode 方法的警告
  - 检测意外的副作用
  - 检测过时的 context API







***





### Component

React.Component 是使用 ES6 classes 方式定义 React 组件的基类

```react
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```



### PureComponent

React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅对比 props 和 state 的方式实现了该函数



### memo

```react
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

React.memo 为高阶组件

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过**记忆组件**渲染结果的方式来提高组件的性能表现

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么需传入第二个参数

```react
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```



> 注意
>
> 与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反





## createRef

React.createRef 创建一个能够通过 ref 属性附加到 React 元素的 ref

```react
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```



### forwardRef

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其他组件树下的另一个组件中。在如下两种场景中特别有用：

- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs

React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点

```react
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```







## Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件数间进行数据传递的方法



### 使用方法

1. 先注册一个变量

```react
const ThemeContext = React.createContext("light")
```

2. 在要用的地方注入

```react
<ThemeContext.Provider value="dark">
    <Test />
</ThemeContext.Provider>
```

3. 使用

```react
<ThemeContext.Consumer>
    {value => (
        <div>{value}</div>
    )}
</ThemeContext.Consumer>
```

Provider负责提供context，而Consumer用来消费Provider提供的context



## Portals

Protal 提供了一种将子节点但渲染到父组件意外的 DOM 节点的方案

```react
React.createPortal(child, container)
```

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 Fragmen。第二个参数（container）是一个 DOM 元素

一般用在 对话框、提示框组件上

[在 CodePen 上尝试](https://codepen.io/gaearon/pen/yzMaBd)



## lazy







## 参考资料

[React 官网](https://zh-hans.reactjs.org/docs/react-api.html#createelement)

[React万字基础全面剖析](https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w)

[React 系统复习如何做最高效](https://mp.weixin.qq.com/s/0SBeDkpp_DYS8uAnYL3AiQ)

