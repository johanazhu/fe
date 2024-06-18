# Refs

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建 React 元素

Ref 就是能获取到该元素的原始 dom



## 作用

- 在函数组件中，当我们希望能够记住某些状态，就可以使用 ref 来存储，典型的例子是 Hooks 的 [Capture Value](./Hooks踩坑)
- 用于访问真实 DOM 元素
- 当父组件需要获取子组件实例对象时，也可通过 `ref` 来获得



## 获取真实 DOM 的三个方法

1.推荐使用 API

- React.createRef()：类组件
- useRef：函数组件

2.ref 回调函数方法

```jsx
// 类组件
bindRef = ele => {
  this.bodyRef = ele;
};

<div ref={this.bindRef}></div>


// 函数组件
const bindRef = useCallback((ele) => {
  
}, []);
<div ref={bindRef}></div>
```

3.字符串（仅限类组件中使用），不推荐是用

```jsx
// 会自动在 this 上绑定 bodyRef, 等于当前元素
<div ref="bodyRef"></div>
```

## 获得子组件实例

1.字组件为类组件，直接绑定 ref，就能拿到整个子组件的实例对象

```jsx
class A extends Component {}

const App = () => {
  const ref = useRef()
  return (<A ref={ref}/>)
}
```

2.函数组件：forwardRef + useImperativeHandle

forwardRef：允许组件使用 ref 将 DOM 节点暴露给付组件

useImperativeHandle：暴露实例对象方法

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const A = (props, ref) => {
  useImperativeHandle(ref, () => {
    // 返回要绑定的实例对象
    return {};
  }, []);
}

const App = forwardRef(A);

```

## useRef

`useRef` 是一个 React Hook，它能帮助引用一个不需要渲染的值。

```jsx
const ref = useRef(initialValue)
```

React Hooks 的本质是闭包，闭包是存在内存中的，使用 useRef，可以不通过内存来保存数据，使得这些数据在重渲染时不会被清除

当改变 `ref.current` 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象

使用 ref 可以确保：

- 可以在重新渲染之间 **存储信息**（普通对象存储的值每次渲染都会重置，快照）
- 改变它 **不会触发重新渲染**（状态变量会触发重新渲染）
- 对于组件的每个副本而言，**这些信息都是本地的**（外部变量则是共享的）

### 何时使用

通常，当你的组件需要“跳出”React 并与外部 API 通信时，你会用到 ref —— 通常是不会影响组件外观的浏览器 API。以下是这些罕见情况中的几个：

- 存储 timeout ID
- 存储和操作 DOM 元素
- 存储不需要被用来计算 JSX 的其他对象

如果你的组件需要存储一些值，但不影响渲染逻辑，请选择 ref

## ForwardRef

`forwardRef` 允许组件使用 ref 将 DOM 节点暴露给父组件

```jsx
const SomeComponent = forwardRef(render)
```

### 用法

`render` 函数 

`forwardRef` 接受一个渲染函数作为参数。React 将会使用 `props` 和 `ref ` 调用此函数：

```jsx
const MyInput = forwardRef(function MyInput(props, ref) {
    return (
    	<label>
        	{props.label}
            <input ref={ref} />
        </label>
    )
})
```

### 参数

- `props`：父组件传递过来的 props
- `ref`：父组件传递的 `ref` 属性，`ref` 可以是一个对象或函数。如果父组件没有传递一个 ref，那么它将会是 null。你应该将接收到 `ref` 转发给另一个组件，或者将其传递给 useImperativeHanle

### 用法

#### 将 DOM节点暴露给父组件

默认情况下，每个组件的 DOM 节点都是私有的。然而，有时候将 DOM 节点公开给父组件是很有用的，比如允许对它进行聚焦。将组件定义包装在 `forwardRef()` 中便可公开 DOM 节点

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

父级的 Form 组件就能够访问 MyInut 暴露的 `<input> DOM节点`：

```jsx
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        编辑
      </button>
    </form>
  );
}
```

该 Form 组件将 ref 传递至 MyInput 组件，MyInput 组件将该 ref 转发至 `<input> ` 浏览器标签。因此，Form 组件可以访问该 `<input> ` DOM 节点并调用 `focus()` 方法 

## useImperativeHandle

`useImperativeHandle` 是 React 中的一个 Hook，它能让你自定义作为 ref 暴露出来的 方法（handle，又译句柄）

### 使用方法

默认情况下，组件不会将它们的 DOM 节点暴露给父组件。如果你想要 `MyInput` 的父组件能访问到`<input>` DOM 节点，你必须选择使用 forwardRef

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});
```

以上代码，MyInput 的 ref 会接收到 `<input>` DOM 节点。然后，你可以选择暴露某一个自定义值。为了修改暴露的方法（handle，又译句柄），在你的顶层组件调用 `useImperativeHandle`：

```jsx
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // ... 你的方法 ...
    };
  }, []);

  return <input {...props} />;
});
```

 注意上述代码，该 ref 已不在被转发到 `<input>` 中

举例来说，假设不像暴露整个 `<input>` DOM 节点，但你想要它其中两个方法：focus 和 scrollIntoView。为此，用单独额外的 ref 来指向真实的浏览器DOM.然后使用 useImperativeHandle 来暴露一个方法（句柄），它只返回你想要父组件去调用的方法：

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```



## 参考资料

-   [React 官网](https://zh-hans.react.dev/learn/referencing-values-with-refs)
-   [React ref 从原理到应用](#https://mp.weixin.qq.com/s/Y6rCRrv0H92cKnvZsn1c0g)
-   [React 进阶实践指南](https://juejin.cn/book/6945998773818490884/section/6953939191776411689)
