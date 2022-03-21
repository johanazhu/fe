# 核心 API

这里对重要的 API 做介绍

## 概览

### 组件

[Component](#component)

-   构建组件的基类

[PureComponent](#purecomponent)

-   与 Component 不同的点在于，它进行了浅对比，即 shouldComponentUpdate 的操作

[memo](#memo)

-   高阶组件
-   缓存操作

### Refs

[createRef](#createref)

-   创建一个能够通过 ref 属性附加到 React 元素的 ref

[forwardRef](#forwardref)

-   转发，把 ref 转发给下一个组件

### 空

[Fragment](#fragment)

-   其包裹作用，但自身不渲染到 DOM 上（不会渲染任何可见的 UI）
-   允许你将子列表分组，而无需向 DOM 添加额外节点
-   减少不必要嵌套的组件

### lazy&Suspense

[lazy](#lazy)

-   懒加载，本质是返回一个 Promise 实例

[Suspense](#suspense)

-   与 lazy 搭配，在等待加载 lazy 组件时做优雅降低（如 loading 指示器等）
-   使得组件可以“等待”某些操作结束后，再进行渲染

### 创建 React 元素

[createElement](#createelement)

-   每个 JSX 元素都是调用 React.createElement 的语法糖

[createFactory](#createfactory)

### 转换元素

[cloneElement](#cloneelement)

[isValidElement](#isvalidelement)

[React.Children](#react.children)

-   map、forEach、count、only、toArray

### 其他

[Context](#context)

-   提供一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

[Portals](#portals)

Profiler

-   测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”

StrictMode

-   严格模式。
-   有助于
    -   识别不安全的生命周期
    -   关于使用过时字符串 ref API 的警告
    -   关于使用废弃的 findDOMNode 方法的警告
    -   检测意外的副作用
    -   检测过时的 context API

---

### Component

React.Component 是使用 ES6 classes 方式定义 React 组件的基类

```jsx
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

### PureComponent

React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅对比 props 和 state 的方式实现了该函数

### memo

```jsx
const MyComponent = React.memo(function MyComponent(props) {
    /* 使用 props 渲染 */
});
```

React.memo 为高阶组件

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过**记忆组件**渲染结果的方式来提高组件的性能表现

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么需传入第二个参数

```jsx
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

```jsx
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

-   转发 refs 到 DOM 组件
-   在高阶组件中转发 refs

React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点

```jsx
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

### Fragment

React.Fragment 组件能够在不额外创建 DOM 元素的情况下，让 render() 方法返回多个元素

```jsx
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

你也可以使用其简写语法 `<></>`。React v16.2.0 以上支持

### lazy

lazy 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件

```jsx
// 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

请注意，渲染 lazy 组件依赖该组件渲染树上层的 `<React.Suspense>` 组件。这是指定加载指示器（loading indicator）的方法

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件

> 注意
>
> 使用 React.lazy 的动态引入特征需要 JS 环境支持 Promise。在 IE11 及以下版本的浏览器中需要引入 polyfill 来使用该特征

### Suspense

React.Suspense 可以指定加载指示器（loading indicator），以防其组件树种的某些子组件尚未具备渲染条件，目前，懒加载组件是 `React.Suspense` 支持的唯一用例：

```jsx
// 该组件是动态加载的
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
    return (
        // 显示 <Spinner> 组件直至 OtherComponent 加载完成
        <React.Suspense fallback={<Spinner />}>
            <div>
                <OtherComponent />
            </div>
        </React.Suspense>
    );
}
```

fallback 属性接受任何在组件加载过程中你想展示的 React 元素，你可以将 Suspense 组件置于懒加载组件之上的任何位置。你甚至可以用一个 Subspense 组件包裹多个懒加载组件

```jsx
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <section>
                    <OtherComponent />
                    <AnotherComponent />
                </section>
            </Suspense>
        </div>
    );
}
```

### createElement

我们使用的 JSX 语法，是 createElement 的语法糖

```javascript
React.createElement(type, [props], [...children]);
```

创建并返回指定类型的新 React 元素。其中类型参数既可以是标签名、字符串（如 'div' 或 ‘span'），也可以是 React 组件类型（class 组件或函数组件），亦或是 React.Frament 类型

### createFactory

```jsx
React.createFactory(type);
```

返回用于生成指定类型 React 元素的函数

现已废弃

### cloneElement

```javascript
React.cloneElement(element, [config], [...children]);
```

以 element 元素为样板克隆并返回新的 React 元素。config 中应包含新的 props，key 或 ref。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。新的子元素将取代现有的子元素，如果在 config 中未出现 key 或 ref，那么原始元素的 key 和 ref 将被保留

React.cloneElement() 几乎等同于：

```jsx
<element.type {...element.props} {...props}>
    {children}
</element.type>
```

### isValidElement

```jsx
React.isValidElement(object);
```

验证对象是否为 React 元素，返回值为 true 或 false

### Children

React.Children 提供了用于处理 this.props.children 不透明数据结构的使用方法

#### React.Children.map

```jsx
React.Children.map(children, function[(thisArg)])
```

在 children 里的每个直接子节点上调用一个函数，并将 this 设置为 thisArg。如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。如果子节点为 null 或是 undefined，则此方法将放回 null 或是 undefined，而不会返回数组

#### React.Children.forEach

```jsx
React.Children.forEach(children, function[(thisArg)])
```

与 React.Children.map() 类似，但它不会返回一个数组

#### React.Children.count

```jsx
React.Children.count(children);
```

返回 children 中的组件总数量

#### React.Children.only

```jsx
React.Children.only(children);
```

验证 children 是否只有一个子节点（一个 React 元素），如果有则返回它，否则此方法会抛出错误

#### React.Children.toArray

```jsx
React.Children.toArray(children);
```

将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。当你想要在渲染函数中操作子节点的集合时，它会非常使用

### Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件数间进行数据传递的方法

#### 使用方法

1. 先注册一个变量

```jsx
const ThemeContext = React.createContext('light');
```

2. 在要用的地方注入

```jsx
<ThemeContext.Provider value="dark">
    <Test />
</ThemeContext.Provider>
```

3. 使用

```jsx
<ThemeContext.Consumer>{(value) => <div>{value}</div>}</ThemeContext.Consumer>
```

Provider 负责提供 context，而 Consumer 用来消费 Provider 提供的 context

### Portals

Protal 提供了一种将子节点但渲染到父组件意外的 DOM 节点的方案

```jsx
React.createPortal(child, container);
```

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 Fragmen。第二个参数（container）是一个 DOM 元素

一般用在 对话框、提示框组件上

[在 CodePen 上尝试](https://codepen.io/gaearon/pen/yzMaBd)

## 参考资料

-   [React 官网](https://zh-hans.reactjs.org/docs/react-api.html#createelement)

-   [React 万字基础全面剖析](https://mp.weixin.qq.com/s/-WLQPNHF2zzPB1v1Lwkw1w)

-   [React 系统复习如何做最高效](https://mp.weixin.qq.com/s/0SBeDkpp_DYS8uAnYL3AiQ)
